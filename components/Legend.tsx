import { MinusIcon } from "@heroicons/react/outline";
import { Measurement } from "../lib/api/types";
import { Time, TimeSeries, timeSeries } from "pondjs";
import { useMemo } from "react";

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
      <div className="p-5 mx-auto w-fit flex flex-row space-x-5 items-baseline text-gray-400">
        {[
          {
            name: "Hotspot",
            color: "text-green-500",
            sensor: "reactorHotspotTemperatureC",
          },
          {
            name: "Outlet",
            color: "text-blue-500",
            sensor: "reactorOutletTemperatureC",
          },
        ].map(({ name, color, sensor }) => (
          <div className="text-sm flex flex-col text-right" key={name}>
            <div className={`flex flex-row items-baseline ${color}`}>
              <MinusIcon className="h-3 mx-1" />
              °C on {name}
            </div>
            <CommonAggregates series={series} sensor={sensor} />
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
