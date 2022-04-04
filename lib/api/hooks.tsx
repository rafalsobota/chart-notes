import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";
import { deleteNote, fetchMeasurements, postNewNote } from "./queries";
import { Measurement, NewNote, Note, Timestamp } from "./types";

export const queryClient = new QueryClient();

export const ApiProvider: React.FC<{}> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const makeMeasurementsCacheKey = (year: number) => {
  return ["measurements", year];
};

export const useMeasurements = (year: number) => {
  return useQuery<Measurement[]>(makeMeasurementsCacheKey(year), () =>
    fetchMeasurements(year)
  );
};

const getYear = (date: Timestamp): number => {
  return new Date(date).getFullYear();
};

export const useAddNoteMutation = () => {
  return useMutation<
    Note,
    unknown,
    NewNote,
    { previousState?: Measurement[]; temporaryId?: number }
  >(
    (newNote: NewNote) => {
      return postNewNote(newNote);
    },
    {
      onMutate: async (newNote) => {
        const CACHE_KEY = makeMeasurementsCacheKey(getYear(newNote.date));

        await queryClient.cancelQueries(CACHE_KEY);

        const previousState =
          queryClient.getQueryData<Measurement[]>(CACHE_KEY);

        const temporaryId = Math.random() * -1000000 - 1; // random id in range (-1000001, -1>

        const note: Note = {
          ...newNote,
          id: temporaryId,
        };

        queryClient.setQueryData<Measurement[]>(CACHE_KEY, (old) => {
          if (!old) return [];
          return old.map((m) => {
            if (m.date === newNote.date) {
              return {
                ...m,
                notes: [...(m.notes || []), note],
              };
            } else {
              return m;
            }
          });
        });

        return { previousState, temporaryId };
      },
      onError: (err, newNote, context) => {
        const CACHE_KEY = makeMeasurementsCacheKey(getYear(newNote.date));
        queryClient.setQueryData(CACHE_KEY, context?.previousState);
      },
      onSettled: (data, err, { date }) => {
        const CACHE_KEY = makeMeasurementsCacheKey(getYear(date));
        queryClient.invalidateQueries([CACHE_KEY]);
      },
      onSuccess: (note, newNote, context) => {
        const CACHE_KEY = makeMeasurementsCacheKey(getYear(newNote.date));
        queryClient.setQueryData<Measurement[]>(CACHE_KEY, (old) => {
          if (!old) return [];
          return old.map((m) => {
            if (m.date === note.date) {
              return {
                ...m,
                notes: (m.notes || []).map((n) => {
                  if (n.id === context.temporaryId) {
                    return note;
                  } else {
                    return n;
                  }
                }),
              };
            } else {
              return m;
            }
          });
        });
      },
    }
  );
};

export const useDeleteNoteMutation = () => {
  return useMutation<
    unknown,
    unknown,
    { id: number; date: number },
    { previousState?: Measurement[] }
  >(
    ({ id, date }) => {
      return deleteNote(id);
    },
    {
      onMutate: async ({ id, date }) => {
        const CACHE_KEY = makeMeasurementsCacheKey(getYear(date));
        await queryClient.cancelQueries(CACHE_KEY);

        const previousState =
          queryClient.getQueryData<Measurement[]>(CACHE_KEY);

        queryClient.setQueryData<Measurement[]>(CACHE_KEY, (old) => {
          if (!old) return [];
          return old.map((measurement) => {
            return {
              ...measurement,
              notes: measurement.notes?.filter((m) => m.id !== id),
            };
          });
        });
        return { previousState };
      },
      onError: (err, { date }, context) => {
        const CACHE_KEY = makeMeasurementsCacheKey(getYear(date));
        queryClient.setQueryData(CACHE_KEY, context?.previousState);
      },
      onSettled: (data, error, { date }) => {
        const CACHE_KEY = makeMeasurementsCacheKey(getYear(date));
        queryClient.invalidateQueries([CACHE_KEY]);
      },
    }
  );
};
