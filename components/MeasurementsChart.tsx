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
import {
  Measurement,
  MetricName,
  metricNames,
  Timestamp,
} from "../lib/api/types";
import { formatDate } from "../lib/time";
import { Legend } from "./Legend";
import { MeasurementChartTooltip } from "./MeasurementChartTooltip";

const xAxisTickFormatter = (date: Timestamp) => {
  return formatDate(date);
};

type AggregateLineProps = {
  label: string;
  y: number;
  color: string;
  variant?: "solid" | "dashed";
};

const halfDay = 1000 * 60 * 60 * 12;

const AggregateLine: React.FC<AggregateLineProps> = ({
  label,
  y,
  color,
  variant,
}) => {
  return (
    <ReferenceLine
      xAxisId={0}
      yAxisId="left"
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

  const yMin =
    Math.min(series.min(metricNames[0]), series.min(metricNames[1])) - 5;
  const yMax =
    Math.max(series.max(metricNames[0]), series.max(metricNames[1])) + 5;

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
              x: measurement.date + halfDay,
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
        return measurement.date;
      });
    });
    return Array.from(new Set(positions));
  }, [data]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            right: 50,
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
            scale="linear"
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 14, fill: "var(--color-gray-400)" }}
            axisLine={{ stroke: "var(--color-gray-400)" }}
            domain={[yMin, yMax]}
          />
          <Tooltip content={MeasurementChartTooltip as any} />
          {AggregateLine({
            label: "avg",
            y: series.avg(metricNames[0]),
            color: "var(--color-sensor-1)",
          })}
          {AggregateLine({
            label: "min",
            y: series.min(metricNames[0]),
            color: "var(--color-sensor-1)",
            variant: "dashed",
          })}
          {AggregateLine({
            label: "max",
            y: series.max(metricNames[0]),
            color: "var(--color-sensor-1)",
            variant: "dashed",
          })}
          {AggregateLine({
            label: "avg",
            y: series.avg(metricNames[1]),
            color: "var(--color-sensor-2)",
          })}
          {AggregateLine({
            label: "min",
            y: series.min(metricNames[1]),
            color: "var(--color-sensor-2)",
            variant: "dashed",
          })}
          {AggregateLine({
            label: "max",
            y: series.max(metricNames[1]),
            color: "var(--color-sensor-2)",
            variant: "dashed",
          })}
          <Line
            dot={false}
            yAxisId="left"
            type="monotone"
            dataKey="reactorHotspotTemperatureC"
            stroke="var(--color-sensor-1)"
            name="Hotspot °C"
          />
          <Line
            dot={false}
            yAxisId="left"
            type="monotone"
            dataKey="reactorOutletTemperatureC"
            stroke="var(--color-sensor-2)"
            name="Outlet °C"
          />
          {selectedDate ? (
            <ReferenceLine
              xAxisId={0}
              yAxisId="left"
              x={selectedDate + halfDay}
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
                yAxisId="left"
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
                yAxisId="left"
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
