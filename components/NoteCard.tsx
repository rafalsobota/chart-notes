import {
  XIcon,
  ExclamationIcon,
  AnnotationIcon,
  TagIcon,
} from "@heroicons/react/outline";
// import { TagIcon } from "@heroicons/react/solid";
import { useCallback } from "react";
import { useDeleteNoteMutation } from "../lib/api";
import { Note } from "../lib/api/types";

export type NoteCardProps = {
  note: Note;
};

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const deleteNoteMutation = useDeleteNoteMutation();

  const onDelete = useCallback(() => {
    deleteNoteMutation.mutate(note.id);
  }, [note.id]);

  const className = note.type === "comment" ? "text-gray-600" : "text-red-500";
  return (
    <div
      className={
        `text-left p-3 rounded-md text-xs break-all relative group-card border-0 flex-row flex space-x-2 bg-white border-gray-200 ` +
        className
      }
    >
      <div
        className="absolute top-0 right-0 invisible p-1 -mt-2 -mr-2 text-gray-700 bg-white border border-gray-200 rounded-full cursor-pointer group-card-hover:visible active:bg-gray-100"
        onClick={onDelete}
      >
        <XIcon className="w-3 h-3 text-red-500" />
      </div>
      <div>
        {note.type === "comment" ? (
          <AnnotationIcon className="inline-block h-4 text-gray-500" />
        ) : (
          <ExclamationIcon className="h-4 text-red-500" />
        )}
      </div>
      <div className="flex-grow">{note.note}</div>
      <div>
        {note.metrics.includes("reactorHotspotTemperatureC") ? (
          <TagIcon className="inline-block h-4 text-sensor-1" />
        ) : null}
        {note.metrics.includes("reactorOutletTemperatureC") ? (
          <TagIcon className="inline-block h-4 text-sensor-2" />
        ) : null}
      </div>
    </div>
  );
};
