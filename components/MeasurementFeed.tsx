import { XIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useRef } from "react";
import { Measurement, Timestamp } from "../lib/api";
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
      selectedCardRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectedDate]);

  return (
    <div className="md:px-14 bg-slate-50 py-5 pb-10">
      <div className="max-w-4xl mx-auto space-y-10">
        {measurements
          .filter(
            (m) => (m.notes && m.notes.length > 0) || m.date === selectedDate
          )
          .map((measurement) => (
            <div
              key={measurement.date}
              ref={
                selectedDate === measurement.date ? selectedCardRef : undefined
              }
              className={`md:rounded-xl p-5 scroll-mt-16 ${
                selectedDate === measurement.date
                  ? "ring-blue-500 ring-4 ring-opacity-50 bg-white relative"
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
