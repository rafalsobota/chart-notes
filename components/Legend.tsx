import { Measurement, MetricName } from "../lib/api/types";
import { Time, TimeSeries, timeSeries } from "pondjs";
import { useMemo } from "react";
import { SensorIcon } from "./SensorIcon";

export type LegendProps = {
  data: Measurement[];
};
export const Legend: React.FC<LegendProps> = ({ data }) => {
  const series = useMemo(() => {
    const series = timeSeries({
      name: "measurements",
      columns: [
        "time",
        "reactorOutletTemperatureC",
        "reactorHotspotTemperatureC",
      ],
      points: data.map((measurement) => {
        return [
          measurement.date,
          measurement.reactorOutletTemperatureC,
          measurement.reactorHotspotTemperatureC,
        ];
      }),
    });
    return series;
  }, [data]);

  return (
    <div>
      <div className="flex flex-row items-baseline p-5 mx-auto space-x-5 w-fit">
        {[
          {
            name: "Hotspot",
            color: "text-sensor-1",
            sensor: "reactorHotspotTemperatureC",
          },
          {
            name: "Outlet",
            color: "text-sensor-2",
            sensor: "reactorOutletTemperatureC",
          },
        ].map(({ name, color, sensor }) => (
          <div className="flex flex-col text-sm text-right" key={name}>
            <div className={`flex flex-row items-baseline ${color}`}>
              <SensorIcon metric={sensor as MetricName} />
              °C on {name}
            </div>
            <div className="font-light text-gray-400">
              <CommonAggregates series={series} sensor={sensor} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type CommonAggregatesProps = {
  series: TimeSeries<Time>;
  sensor: string;
  fractionDigits?: number;
};

const CommonAggregates: React.FC<CommonAggregatesProps> = ({
  series,
  sensor,
  fractionDigits,
}) => {
  return (
    <div>
      <div>max: {series.max(sensor).toFixed(fractionDigits)}</div>
      <div>average: {series.avg(sensor).toFixed(fractionDigits)}</div>
      <div>min: {series.min(sensor).toFixed(fractionDigits)}</div>
    </div>
  );
};
