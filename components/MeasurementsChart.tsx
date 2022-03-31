import { useCallback, useMemo } from "react";
import {
  CartesianGrid,
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
import { Measurement, Timestamp } from "../lib/api/types";
import { formatDate } from "../lib/time";
import { Legend } from "./Legend";
import { MeasurementChartTooltip } from "./MeasurementChartTooltip";

const tickFormatter = (date: Timestamp) => {
  if (typeof date !== "number") {
    console.error("tickFormatter: date is not a number", date);
  }
  return formatDate(date);
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

  const redDots = useMemo(() => {
    return data.flatMap((measurement) => {
      return (measurement.notes || [])
        .filter((note) => note.type === "alert")
        .flatMap((note) => {
          return note.metrics.map((metric) => {
            return {
              x: measurement.date,
              y: measurement[metric],
              id: note.id,
            };
          });
        });
    });
  }, [data]);

  const grayLines = useMemo(() => {
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
          <XAxis dataKey="date" tickFormatter={tickFormatter} opacity="0.5" />
          <YAxis yAxisId="left" opacity="0.5" />
          <Tooltip content={MeasurementChartTooltip as any} />
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
            // activeDot={{ r: 8 }}
            name="Outlet °C"
          />
          {selectedDate ? (
            <ReferenceLine
              xAxisId={0}
              yAxisId="left"
              x={selectedDate}
              stroke="var(--color-primary-500)"
              strokeWidth={2}
              opacity={1}
            />
          ) : null}
          {grayLines.map((date) => {
            return (
              <ReferenceLine
                key={date}
                xAxisId={0}
                yAxisId="left"
                x={date}
                stroke={"gray"}
                opacity={0.5}
                strokeWidth={1}
              />
            );
          })}
          {redDots.map((dot) => {
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
      <Legend data={data} />
    </div>
  );
};
