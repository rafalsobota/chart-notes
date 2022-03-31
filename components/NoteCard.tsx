import { XIcon } from "@heroicons/react/outline";
import { ExclamationIcon } from "@heroicons/react/solid";
import { useCallback } from "react";
import { useDeleteNoteMutation } from "../lib/api";
import { Note } from "../lib/api/types";
import { classes } from "./FormCard";
import { MetricIcon } from "./MetricIcon";

export type NoteCardProps = {
  note: Note;
  variant?: "small" | "medium";
};

export const NoteCard: React.FC<NoteCardProps> = ({ note, variant }) => {
  const deleteNoteMutation = useDeleteNoteMutation();

  const isSmall = variant === "small";
  const isComment = note.type === "comment";
  const isAlert = !isComment;

  const onDelete = useCallback(() => {
    deleteNoteMutation.mutate({ id: note.id, date: note.date });
  }, [note.id]);

  return (
    <div
      className={classes(
        `rounded-md text-xs group-card flex-row flex space-x-2 relative min-w-0`, // min-w-0 -> https://stackoverflow.com/questions/39838908/text-overflow-ellipsis-not-working-in-nested-flexbox
        isComment
          ? "bg-white text-gray-600"
          : "text-gray-600 border-l-2 border-l-red-500 bg-white",
        isSmall ? "py-2 shadow-lg border border-gray-200" : "py-3",
        isSmall && isAlert && "pl-2"
      )}
    >
      {!isSmall && (
        <div
          className="absolute top-0 right-0 invisible p-1 -mt-2 -mr-2 text-gray-600 bg-white border border-gray-200 rounded-full cursor-pointer group-card-hover:visible active:bg-gray-100"
          onClick={onDelete}
        >
          <XIcon className="inline-block w-3 h-3 text-red-500" />
        </div>
      )}

      <div>
        {isComment ? (
          !isSmall && <div className="w-5" />
        ) : (
          <ExclamationIcon className="w-4 text-red-500" />
        )}
      </div>
      <div className={classes(`flex-grow`, isSmall && "truncate")}>
        {note.note}
      </div>
      <div className="pr-1">
        {note.metrics.includes("reactorHotspotTemperatureC") ? (
          <MetricIcon metric={"reactorHotspotTemperatureC"} />
        ) : null}
        {note.metrics.includes("reactorOutletTemperatureC") ? (
          <MetricIcon metric={"reactorOutletTemperatureC"} />
        ) : null}
      </div>
    </div>
  );
};
