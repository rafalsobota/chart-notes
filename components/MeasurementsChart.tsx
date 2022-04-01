import { Time, TimeSeries, timeSeries } from "pondjs";
import { useCallback, useMemo } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";
import { metricVarColor } from "../lib/api/models/metrics";
import {
  Measurement,
  MetricName,
  metricNames,
  Timestamp,
} from "../lib/api/types";
import { formatDate } from "../lib/time";
import { Legend } from "./Legend";
import { MeasurementChartTooltip } from "./MeasurementChartTooltip";

const halfADay = 1000 * 60 * 60 * 12;

export type MeasurementsChartProps = {
  data: Measurement[];
  onDateSelected: (date: Timestamp) => void;
  selectedDate?: Timestamp;
};

export const MeasurementsChart = ({
  data,
  onDateSelected,
  selectedDate,
}: MeasurementsChartProps) => {
  const series = useMemo(() => {
    const series = timeSeries({
      name: "measurements",
      columns: ["time", ...metricNames],
      points: data.map((measurement) => {
        return [
          measurement.date,
          ...metricNames.map((name) => measurement[name]),
        ];
      }),
    });
    return series;
  }, [data]);

  const onClick = useCallback(
    (e: CategoricalChartState) => {
      if (e && e.activePayload && e.activePayload.length > 0) {
        const date = e.activePayload[0].payload?.date;
        if (date) {
          onDateSelected(date);
        }
      }
    },
    [onDateSelected]
  );

  const alertDots = useMemo(() => {
    return data.flatMap((measurement) => {
      return (measurement.notes || [])
        .filter((note) => note.type === "alert")
        .flatMap((note) => {
          return note.metrics.map((metric) => {
            return {
              x: measurement.date + halfADay,
              y: measurement[metric],
              id: note.id,
            };
          });
        });
    });
  }, [data]);

  const noteLines = useMemo(() => {
    const positions = data.flatMap((measurement) => {
      return (measurement.notes || []).map((note) => {
        return measurement.date + halfADay;
      });
    });
    return Array.from(new Set(positions));
  }, [data]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            right: 30,
            left: 0,
          }}
          onClick={onClick}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={xAxisTickFormatter}
            tick={{ fontSize: 14, fill: "var(--color-gray-400)" }}
            axisLine={{ stroke: "var(--color-gray-400)" }}
            scale="time"
          />
          <Tooltip content={MeasurementChartTooltip as any} />
          {metricNames.map((metric) => MetricLine({ metric, series }))}
          {selectedDate ? (
            <ReferenceLine
              xAxisId={0}
              yAxisId={metricNames[0]}
              x={selectedDate + halfADay}
              stroke="var(--color-primary-500)"
              strokeWidth={2}
              opacity={1}
            />
          ) : null}
          {noteLines.map((date) => {
            return (
              <ReferenceLine
                key={date}
                xAxisId={0}
                yAxisId={metricNames[0]}
                x={date}
                stroke={"gray"}
                opacity={0.5}
                strokeWidth={1}
                cursor="pointer"
              />
            );
          })}
          {alertDots.map((dot) => {
            return (
              <ReferenceDot
                key={dot.id + "-" + dot.y}
                x={dot.x}
                y={dot.y}
                xAxisId={0}
                yAxisId={metricNames[0]}
                fill={"red"}
                stroke={"red"}
                r={3}
                cursor="pointer"
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
      <Legend data={data} series={series} />
    </div>
  );
};

const xAxisTickFormatter = (date: Timestamp) => {
  return formatDate(date);
};

type AggregateLineProps = {
  label: string;
  y: number;
  color: string;
  variant?: "solid" | "dashed";
  key?: string;
  yAxisId: string;
};

const AggregateLine: React.FC<AggregateLineProps> = ({
  label,
  y,
  color,
  variant,
  key,
  yAxisId,
}) => {
  return (
    <ReferenceLine
      key={key}
      xAxisId={0}
      yAxisId={yAxisId}
      y={y}
      stroke={color}
      strokeWidth={1}
      strokeDasharray={variant === "dashed" ? "3 3" : undefined}
      opacity={0.5}
    >
      <Label fontSize={10} color={color} position="right" fill={color}>
        {label}
      </Label>
    </ReferenceLine>
  );
};

type AggregateLinesProps = {
  series: TimeSeries<Time>;
  metric: MetricName;
};

const AggregateLines = ({ series, metric }: AggregateLinesProps) => {
  return [
    AggregateLine({
      key: `${metric}-max-label`,
      label: "max",
      y: series.max(metric),
      color: metricVarColor(metric),
      variant: "dashed",
      yAxisId: metric,
    }),
    AggregateLine({
      key: `${metric}-avg-label`,
      label: "avg",
      y: series.avg(metric),
      color: metricVarColor(metric),
      yAxisId: metric,
    }),
    AggregateLine({
      key: `${metric}-min-label`,
      label: "min",
      y: series.min(metric),
      color: metricVarColor(metric),
      variant: "dashed",
      yAxisId: metric,
    }),
  ];
};

const MetricLine = ({ series, metric }: AggregateLinesProps) => {
  return [
    <YAxis
      yAxisId={metric}
      id={metric}
      tick={{ fontSize: 14, fill: "var(--color-gray-400)" }}
      axisLine={{ stroke: metricVarColor(metric) }}
      domain={[series.min(metric) - 10, series.max(metric) + 10]}
      width={40}
    />,
    AggregateLines({ series, metric }),
    <Line
      dot={false}
      yAxisId={metric}
      type="monotone"
      dataKey={metric}
      stroke={metricVarColor(metric)}
    />,
  ];
};
