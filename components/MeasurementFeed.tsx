import { XIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Measurement, Timestamp } from "../lib/api";
import { scrollIntoView } from "../lib/viewport";
import { MeasurementDetails } from "./MeasurementDetails";

export type MeasurementsFeedProps = {
  measurements: Measurement[];
  selectedDate?: Timestamp;
  onDateSelected: (date?: Timestamp) => void;
};

export const MeasurementsFeed: React.FC<MeasurementsFeedProps> = ({
  measurements,
  selectedDate,
  onDateSelected,
}) => {
  const unselectDate = useCallback(() => {
    onDateSelected(undefined);
  }, [onDateSelected]);

  const selectedCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate && selectedCardRef.current) {
      scrollIntoView(selectedCardRef.current);
    }
  }, [selectedDate]);

  const visibbleMeasurements = useMemo(() => {
    return measurements
      .filter((m) => (m.notes && m.notes.length > 0) || m.date === selectedDate)
      .reverse();
  }, [measurements, selectedDate]);

  if (visibbleMeasurements.length < 1) {
    return null;
  }

  return (
    <div className="py-5 pb-10 md:px-14 bg-slate-50">
      <div className="max-w-2xl mx-auto space-y-10">
        {visibbleMeasurements.map((measurement) => (
          <div
            key={measurement.date}
            ref={
              selectedDate === measurement.date ? selectedCardRef : undefined
            }
            className={`md:rounded-2xl p-5 scroll-my-16 ${
              selectedDate === measurement.date
                ? "ring-blue-500 ring-4 ring-opacity-50 relative bg-white bg-opacity-50"
                : ""
            }`}
          >
            {selectedDate === measurement.date ? (
              <div
                className="absolute top-0 right-0 p-3 text-blue-500 cursor-pointer"
                onClick={unselectDate}
              >
                <XIcon className="h-5" />
              </div>
            ) : null}
            <MeasurementDetails
              measurement={measurement}
              key={measurement.date}
              onDateSelected={onDateSelected}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
