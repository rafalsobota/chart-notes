import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";
import { deleteNote, fetchMeasurements, postNewNote } from "./queries";
import { Measurement, NewNote } from "./types";

export const queryClient = new QueryClient();

export const ApiProvider: React.FC<{}> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const useMeasurements = (year: number) => {
  return useQuery<Measurement[]>(["measurements", year], () =>
    fetchMeasurements(year)
  );
};

export const useAddNoteMutation = () => {
  return useMutation(
    (note: NewNote) => {
      return postNewNote(note);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["measurements"]); // TODO optimistic update
      },
    }
  );
};

export const useDeleteNoteMutation = () => {
  return useMutation(
    (id: number) => {
      return deleteNote(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["measurements"]); // TODO optimistic update
      },
    }
  );
};
