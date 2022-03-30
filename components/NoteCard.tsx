import {
  XIcon,
  ExclamationIcon,
  AnnotationIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
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

  const className = note.type === "comment" ? "text-gray-500" : "text-red-500";
  return (
    <div
      className={
        `text-left p-3 rounded-md text-xs break-all relative group-card border border-transparent flex-row flex space-x-2 bg-white ` +
        className
      }
    >
      <div
        className="absolute top-0 right-0 -mt-2 -mr-2 border border-gray-200 rounded-full p-1 invisible group-card-hover:visible cursor-pointer active:bg-gray-100 text-gray-700 bg-white"
        onClick={onDelete}
      >
        <XIcon className="h-3 w-3 text-red-500" />
      </div>
      <div>
        {note.type === "comment" ? (
          <AnnotationIcon className="text-gray-400 h-4" />
        ) : (
          <ExclamationIcon className="text-red-500 h-4" />
        )}
      </div>
      <div className="flex-grow">{note.note}</div>
      {note.metrics.includes("reactorHotspotTemperatureC") ? (
        <div>
          <BookmarkIcon className="h-4 text-green-500" />
        </div>
      ) : null}
      {note.metrics.includes("reactorOutletTemperatureC") ? (
        <div>
          <BookmarkIcon className="h-4 text-blue-500" />
        </div>
      ) : null}
    </div>
  );
};
