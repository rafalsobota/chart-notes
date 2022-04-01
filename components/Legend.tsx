import { Measurement, MetricName, metricNames } from "../lib/api/types";
import { Time, TimeSeries } from "pondjs";
import { MetricIcon } from "./MetricIcon";
import { metricLabel, metricTextColor } from "../lib/api/models/metrics";

export type LegendProps = {
  data: Measurement[];
  series: TimeSeries<Time>;
};
export const Legend: React.FC<LegendProps> = ({ data, series }) => {
  return (
    <div>
      <div className="flex flex-row items-baseline p-5 mx-auto space-x-5 w-fit">
        {metricNames.map((metric) => {
          return (
            <MetricLegend
              series={series}
              metric={metric}
              label={metricLabel(metric)}
            />
          );
        })}
      </div>
    </div>
  );
};

type MetricLegendProps = {
  label: string;
  metric: MetricName;
  series: TimeSeries<Time>;
  key?: string;
};

const MetricLegend: React.FC<MetricLegendProps> = ({
  label,
  metric,
  series,
  key,
}) => {
  return (
    <div className="flex flex-col text-sm text-right" key={key}>
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
};

const CommonAggregates: React.FC<CommonAggregatesProps> = ({
  series,
  metric,
}) => {
  return (
    <div className="text-left text-gray-400">
      <Aggregate name="max" value={series.max(metric)} />
      <Aggregate name="average" value={series.avg(metric)} />
      <Aggregate name="min" value={series.min(metric)} />
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
