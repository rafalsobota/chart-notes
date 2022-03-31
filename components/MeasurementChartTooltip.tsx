import { Measurement, Note } from "../lib/api/types";
import { formatDate } from "../lib/time";
import { ExclamationIcon, AnnotationIcon } from "@heroicons/react/solid";
import { metricLabel } from "../lib/metrics";
import { NoteCard } from "./NoteCard";

type NotesSummary = {
  recentNote?: Note;
  notesCount: number;
};

const makeNotesSummary = (notes?: Note[]): NotesSummary => {
  if (!notes) {
    return { notesCount: 0 };
  }
  const recentNote = notes[notes.length - 1];
  return {
    notesCount: notes.length,
    recentNote,
  };
};

type MeasurementChartTooltipProps = {
  active?: boolean;
  payload: { name: string; value: number; payload: Measurement }[];
};

export const MeasurementChartTooltip: React.FC<
  MeasurementChartTooltipProps
> = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const measurement = payload[0].payload;
    const notesSummary = makeNotesSummary(measurement.notes);
    return (
      <div className="flex flex-col items-start space-y-1">
        <div className="font-semibold text-gray-500 bg-white">
          {formatDate(measurement.date, true)}
        </div>
        <div className="flex flex-row items-baseline align-bottom bg-white text-sensor-1">
          <div className="text-xl font-semibold">
            {measurement.reactorHotspotTemperatureC}
          </div>
          <div className="pl-1 text-xs">
            {metricLabel("reactorHotspotTemperatureC")}
          </div>
        </div>
        <div className="flex flex-row items-baseline bg-white text-sensor-2">
          <div className="text-xl font-semibold">
            {measurement.reactorOutletTemperatureC}
          </div>
          <div className="pl-1 text-xs">
            {metricLabel("reactorOutletTemperatureC")}
          </div>
        </div>
        {notesSummary.recentNote && (
          <div className="flex flex-row items-center max-w-xs md:max-w-sm">
            <NoteCard note={notesSummary.recentNote} variant="small" />
            {notesSummary.notesCount > 1 && (
              <div className="flex-grow-0 px-1 text-xs bg-white min-w-fit">
                + {notesSummary.notesCount - 1}
              </div>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

type NoteTooltipProps = {
  note: Note;
};
const NoteTooltip: React.FC<NoteTooltipProps> = ({ note }) => {
  const className =
    note.type === "alert" ? "bg-red-500 text-white" : "bg-gray-500 text-white";
  return (
    <div
      className={`max-w-xs md:max-w-sm p-2 text-xs truncate rounded-md ${className}`}
    >
      {note.type === "alert" ? (
        <ExclamationIcon className="inline-block h-3 pr-1" />
      ) : (
        <AnnotationIcon className="inline-block h-3 pr-1" />
      )}
      {note.note}
    </div>
  );
};
