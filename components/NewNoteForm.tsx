import { useForm } from "react-hook-form";
import {
  MetricName,
  metricNames,
  NoteType,
  noteTypes,
  useAddNoteMutation,
} from "../lib/api";
import { Button } from "./Button";
import {
  FormActions,
  FormCard,
  FormContent,
  FormHeader,
  FormOptionsGroup,
  FormSection,
} from "./FormCard";

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
    <FormCard className="shadow-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-left text-gray-500"
      >
        <FormHeader>
          <div className="font-semibold">New Note</div>
        </FormHeader>
        <FormContent>
          <FormSection>
            <div className="text-gray-500">Note</div>
            <textarea
              {...register("note", { required: true })}
              className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-primary-500"
              placeholder="What happened?"
              autoFocus
            />
            {errors.note && (
              <span className="text-red-500">This field is required</span>
            )}
          </FormSection>
          <FormSection>
            <div>Type</div>
            <FormOptionsGroup>
              {noteTypes.map((type) => {
                const id = type + "Radio" + date;
                return (
                  <div key={id} className="flex items-center">
                    <input
                      className="float-left w-4 h-4 mr-2 transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-full appearance-none cursor-pointer checked:bg-primary-500 checked:border-primary-500 focus:z-10 focus:ring-2 focus:ring-primary-500"
                      type="radio"
                      id={id}
                      radioGroup="noteType"
                      value={type}
                      {...register("type", { required: true })}
                    />
                    <label
                      className="inline-block text-gray-800 cursor-pointer form-check-label"
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
            <div>Related Metrics</div>

            <FormOptionsGroup>
              {metricNames.map((metric) => {
                const id = metric + "Checkbox" + date;
                return (
                  <div key={id} className="flex items-center">
                    <input
                      className="float-left w-4 h-4 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 appearance-none cursor-pointer form-check-input checked:bg-primary-500 checked:border-primary-500 focus:z-10 focus:ring-2 focus:ring-primary-500"
                      type="checkbox"
                      value={metric}
                      id={id}
                      {...register("metrics", { required: true })}
                    />
                    <label
                      className="inline-block text-gray-800 cursor-pointer form-check-label"
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
        </FormContent>
        <FormActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={disabled}>
            Save
          </Button>
        </FormActions>
      </form>
    </FormCard>
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
