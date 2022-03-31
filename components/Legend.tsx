import { Measurement, MetricName } from "../lib/api/types";
import { Time, TimeSeries, timeSeries } from "pondjs";
import { useMemo } from "react";
import { MetricIcon } from "./MetricIcon";
import { metricLabel, metricTextColor } from "../lib/metrics";

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
        <MetricLegend
          series={series}
          metric="reactorHotspotTemperatureC"
          label={metricLabel("reactorHotspotTemperatureC")}
        />
        <MetricLegend
          series={series}
          metric="reactorOutletTemperatureC"
          label={metricLabel("reactorOutletTemperatureC")}
        />
      </div>
    </div>
  );
};

type MetricLabelProps = {
  label: string;
  metric: MetricName;
  series: TimeSeries<Time>;
};

const MetricLegend: React.FC<MetricLabelProps> = ({
  label,
  metric,
  series,
}) => {
  return (
    <div className="flex flex-col text-sm text-right">
      <div
        className={`flex flex-row items-baseline ${metricTextColor(metric)}`}
      >
        <MetricIcon metric={metric} />
        {label}
      </div>
      <CommonAggregates series={series} metric={metric} />
    </div>
  );
};

type CommonAggregatesProps = {
  series: TimeSeries<Time>;
  metric: MetricName;
  fractionDigits?: number;
};

const CommonAggregates: React.FC<CommonAggregatesProps> = ({
  series,
  metric,
  fractionDigits,
}) => {
  return (
    <div className="text-left text-gray-400">
      <Aggregate name="min" value={series.min(metric)} />
      <Aggregate name="average" value={series.avg(metric)} />
      <Aggregate name="max" value={series.max(metric)} />
    </div>
  );
};

type AggregateProps = {
  name: string;
  value: number;
};

const Aggregate: React.FC<AggregateProps> = ({ name, value }) => {
  return (
    <div className="flex flex-row">
      <div className="flex-grow font-light">{name}</div>
      <div>{value.toFixed()}</div>
    </div>
  );
};
