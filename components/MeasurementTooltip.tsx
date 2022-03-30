import { useMemo } from "react";
import { Measurement, Note } from "../lib/api/types";
import { formatDate } from "../lib/time";
import { ExclamationIcon, AnnotationIcon } from "@heroicons/react/solid";

export const MeasurementTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: { name: string; value: number; payload: Measurement }[];
}) => {
  const recentNotes = useMemo(() => {
    if (payload && payload.length > 0) {
      const measurement = payload[0].payload;
      if (!measurement.notes) return;
      const notesReversed = measurement.notes.reverse();
      return {
        all: notesReversed.find(
          (n) => n.type === "alert" && n.metrics.length > 1
        ),
        outlet: notesReversed.find(
          (n) =>
            n.type === "alert" &&
            n.metrics.length == 1 &&
            n.metrics[0] === "reactorOutletTemperatureC"
        ),
        hotspot: notesReversed.find(
          (n) =>
            n.type === "alert" &&
            n.metrics.length == 1 &&
            n.metrics[0] === "reactorHotspotTemperatureC"
        ),
      };
    }
  }, [payload]);

  if (active && payload && payload.length > 0) {
    const measurement = payload[0].payload;
    return (
      <div className="flex flex-col items-start space-y-1">
        <div className="font-semibold text-gray-500 bg-white">
          {formatDate(measurement.date, true)}
        </div>
        {recentNotes?.all && <NoteTooltip note={recentNotes.all} />}
        <div className="flex flex-row items-baseline align-bottom bg-white text-sensor-1">
          <div className="text-xl font-semibold">
            {measurement.reactorHotspotTemperatureC}
          </div>
          <div className="pl-1 text-xs">°C on Hotspot</div>
        </div>
        {recentNotes?.hotspot && <NoteTooltip note={recentNotes.hotspot} />}
        <div className="flex flex-row items-baseline bg-white text-sensor-2">
          <div className="text-xl font-semibold">
            {measurement.reactorOutletTemperatureC}
          </div>
          <div className="pl-1 text-xs">°C on Outlet</div>
        </div>
        {recentNotes?.outlet && <NoteTooltip note={recentNotes.outlet} />}
        {measurement.notes && <div></div>}
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
    <div className={`max-w-sm p-2 text-xs  truncate  rounded-md ${className}`}>
      {note.type === "alert" ? (
        <ExclamationIcon className="inline-block h-3 pr-1" />
      ) : (
        <AnnotationIcon className="inline-block h-3 pr-1" />
      )}
      {note.note}
    </div>
  );
};
