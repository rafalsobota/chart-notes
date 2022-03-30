import { Measurement, Timestamp } from "../lib/api/types";
import { formatDate } from "../lib/time";
import { useCallback } from "react";
import { NoteCreator } from "./NoteCreator";
import { NoteCard } from "./NoteCard";

type MeasurementDetailsProps = {
  measurement: Measurement;
  onDateSelected: (date?: Timestamp) => void;
};

export const MeasurementDetails = ({
  measurement,
  onDateSelected,
}: MeasurementDetailsProps) => {
  const select = useCallback(() => {
    onDateSelected(measurement.date);
  }, []);

  return (
    <div className="flex flex-col space-y-5 group">
      <div className="text-gray-400 text-md text-center flex flex-row">
        <div onClick={select} className="mx-auto cursor-pointer p-2 ">
          {formatDate(measurement.date, true)}
        </div>
      </div>
      <div className="flex flex-row  justify-evenly space-x-5">
        <div className="flex-1 text-right">
          <div className="flex-col flex pb-2">
            <div className="text-4xl text-green-500">
              {measurement.reactorHotspotTemperatureC}
            </div>
            <div className="text-sm text-green-500">°C on Hotspot</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex-col flex pb-2">
            <div className="text-4xl text-blue-500">
              {measurement.reactorOutletTemperatureC}
            </div>
            <div className="text-sm text-blue-500">°C on Outlet</div>
          </div>
        </div>
      </div>
      <div className="md:px-32 space-y-5">
        {(measurement.notes || []).map((n) => (
          <NoteCard note={n} key={n.id} />
        ))}
        <div className="flex-row text-center">
          <NoteCreator date={measurement.date} />
        </div>
      </div>
    </div>
  );
};
