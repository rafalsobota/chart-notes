import { Measurement, MetricName, Timestamp } from "../lib/api/types";
import { formatDate } from "../lib/time";
import { useCallback } from "react";
import { NoteCreator } from "./NoteCreator";
import { NoteCard } from "./NoteCard";
import { metricLabel, metricTextColor } from "../lib/metrics";

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
      <div className="space-y-2">
        <div className="flex flex-row text-center text-black text-opacity-40 text-md">
          <div onClick={select} className="p-2 mx-auto -m-2 cursor-pointer">
            {formatDate(measurement.date, true)}
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-5">
          <MetricValueLabel
            value={measurement.reactorHotspotTemperatureC}
            metric={"reactorHotspotTemperatureC"}
          />
          <MetricValueLabel
            value={measurement.reactorOutletTemperatureC}
            metric={"reactorOutletTemperatureC"}
          />
        </div>
      </div>
      <div className="space-y-2">
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

type MetricValueLabelProps = {
  value: number;
  metric: MetricName;
};

const MetricValueLabel: React.FC<MetricValueLabelProps> = ({
  value,
  metric,
}) => {
  return (
    <div className={`${metricTextColor(metric)}`}>
      <div className="text-4xl">{value}</div>
      <div className="text-sm">{metricLabel(metric)}</div>
    </div>
  );
};
