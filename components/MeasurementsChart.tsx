import { useCallback } from "react";
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
import { MeasurementTooltip } from "./MeasurementTooltip";

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
          <Tooltip content={MeasurementTooltip as any} />
          <Line
            dot={false}
            yAxisId="left"
            type="monotone"
            dataKey="reactorHotspotTemperatureC"
            stroke="#22c55e"
            name="Hotspot °C"
          />
          <Line
            dot={false}
            yAxisId="left"
            type="monotone"
            dataKey="reactorOutletTemperatureC"
            stroke="#3b82f6"
            // activeDot={{ r: 8 }}
            name="Outlet °C"
          />

          {selectedDate ? (
            <ReferenceLine
              xAxisId={0}
              yAxisId="left"
              x={selectedDate}
              stroke="#3b82f6"
              strokeWidth={4}
              opacity={0.5}
            />
          ) : null}
          {data
            .flatMap((measurement) =>
              (measurement.notes || []).map((note) => ({ note, measurement }))
            )
            .map(({ note, measurement }) => {
              if (note.metrics.length === 2) {
                return (
                  <ReferenceLine
                    key={note.id}
                    xAxisId={0}
                    yAxisId="left"
                    x={note.date}
                    stroke={note.type === "alert" ? "red" : "gray"}
                    opacity={0.5}
                    strokeWidth={1}
                  />
                );
              } else if (note.metrics.length === 1) {
                return (
                  <ReferenceDot
                    key={note.id}
                    x={note.date}
                    y={
                      note.metrics[0] === "reactorHotspotTemperatureC"
                        ? measurement.reactorHotspotTemperatureC
                        : measurement.reactorOutletTemperatureC
                    }
                    xAxisId={0}
                    yAxisId="left"
                    fill={note.type === "alert" ? "red" : "gray"}
                    stroke="white"
                    opacity={note.type === "alert" ? 1 : 0.5}
                    r={3}
                  />
                );
              } else {
                return <></>;
              }
            })}
        </LineChart>
      </ResponsiveContainer>
      <Legend data={data} />
    </div>
  );
};
