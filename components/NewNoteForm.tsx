import { useForm } from "react-hook-form";
import {
  MetricName,
  metricNames,
  NoteType,
  noteTypes,
  useAddNoteMutation,
} from "../lib/api";
import { Button } from "./Button";

export type NewNoteFormProps = {
  onClose: () => void;
  date: number;
};

export const NewNoteForm: React.FC<NewNoteFormProps> = ({ onClose, date }) => {
  const addNoteMutation = useAddNoteMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
    reset,
  } = useForm();

  const disabled = isSubmitSuccessful && isSubmitted;

  const onSubmit = (data: any) => {
    addNoteMutation.mutate(
      {
        date,
        metrics: data.metrics,
        note: data.note,
        type: data.type,
      },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
      }
    );
  };

  return (
    <div className="p-5 bg-slate-50 rounded-md shadow-lg border border-slate-200 text-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 text-left text-slate-500"
      >
        <div className="font-semibold">New Note</div>
        <hr />
        <FormSection>
          <div className="text-slate-500">Note:</div>
          <textarea
            {...register("note", { required: true })}
            className="border border-slate-300 p-3 rounded-md text-sm w-full"
            placeholder="What happened?"
            autoFocus
          />
          {errors.note && (
            <span className="text-red-500">This field is required</span>
          )}
        </FormSection>
        <FormSection>
          <div>Type:</div>
          <FormOptionsGroup>
            {noteTypes.map((type) => {
              const id = type + "Radio" + date;
              return (
                <div key={id}>
                  <input
                    className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    id={id}
                    radioGroup="noteType"
                    value={type}
                    {...register("type", { required: true })}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor={id}
                  >
                    {fiendlyNoteTypeName(type)}
                  </label>
                </div>
              );
            })}
          </FormOptionsGroup>
          {errors.type && (
            <div className="text-red-500">This field is required</div>
          )}
        </FormSection>
        <FormSection>
          <div>Assigned Metrics:</div>

          <FormOptionsGroup>
            {metricNames.map((metric) => {
              const id = metric + "Checkbox" + date;
              return (
                <div key={id}>
                  <input
                    className="form-check-input form-check-input appearance-none h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    value={metric}
                    id={id}
                    {...register("metrics", { required: true })}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor={id}
                  >
                    {fiendlyNoteMetricName(metric)}
                  </label>
                </div>
              );
            })}
          </FormOptionsGroup>
          {errors.metrics && (
            <div className="text-red-500">At least one value is required</div>
          )}
        </FormSection>
        <hr />
        <FormActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={disabled}>
            Save
          </Button>
        </FormActions>
      </form>
    </div>
  );
};

const fiendlyNoteMetricName = (metric: MetricName): string => {
  switch (metric) {
    case "reactorOutletTemperatureC":
      return "Reactor Outlet Temperature";
    case "reactorHotspotTemperatureC":
      return "Reactor Hotspot Temperature";
  }
};

const fiendlyNoteTypeName = (type: NoteType): string => {
  switch (type) {
    case "alert":
      return "Alert";
    case "comment":
      return "Comment";
  }
};

const FormSection: React.FC<{}> = ({ children }) => {
  return <div className="space-y-2">{children}</div>;
};

const FormActions: React.FC<{}> = ({ children }) => {
  return <div className="flex flex-row space-x-2 justify-end">{children}</div>;
};

const FormOptionsGroup: React.FC<{}> = ({ children }) => {
  return (
    <div className="flex justify-start space-y-2 md:space-x-5 md:space-y-0 flex-col md:flex-row">
      {children}
    </div>
  );
};
