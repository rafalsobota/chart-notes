import { XIcon, ExclamationIcon } from "@heroicons/react/outline";
import { useCallback } from "react";
import { useDeleteNoteMutation } from "../lib/api";
import { Note } from "../lib/api/types";
import { MetricIcon } from "./MetricIcon";

export type NoteCardProps = {
  note: Note;
};

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const deleteNoteMutation = useDeleteNoteMutation();

  const onDelete = useCallback(() => {
    deleteNoteMutation.mutate(note.id);
  }, [note.id]);

  const className =
    note.type === "comment"
      ? "text-gray-600"
      : "text-gray-600 border-l-2 border-l-red-500";
  return (
    <div
      className={
        `text-left py-3 px-2 rounded-md text-xs break-all relative group-card flex-row flex space-x-2 bg-white ` +
        className
      }
    >
      <div
        className="absolute top-0 right-0 invisible p-1 -mt-2 -mr-2 text-gray-700 bg-white border border-gray-200 rounded-full cursor-pointer group-card-hover:visible active:bg-gray-100"
        onClick={onDelete}
      >
        <XIcon className="inline-block w-3 h-3 text-red-500" />
      </div>
      <div>
        {note.type === "comment" ? (
          <div className="w-5" />
        ) : (
          <ExclamationIcon className="w-4 text-red-500" />
        )}
      </div>
      <div className="flex-grow">{note.note}</div>
      <div>
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
