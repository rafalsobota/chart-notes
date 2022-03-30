import { Measurement } from "../lib/api/types";
import { formatDate } from "../lib/time";

export const MeasurementTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: { name: string; value: number; payload: Measurement }[];
}) => {
  if (active && payload && payload.length > 0) {
    const measurement = payload[0].payload;
    return (
      <div className="space-y-1">
        <div className="font-semibold text-gray-500">
          {formatDate(measurement.date, true)}
        </div>
        <div className="flex flex-row items-baseline align-bottom text-sensor-1">
          <div className="text-xl font-semibold">
            {measurement.reactorHotspotTemperatureC}
          </div>
          <div className="pl-1 text-xs">°C on Hotspot</div>
        </div>
        <div className="flex flex-row items-baseline text-sensor-2">
          <div className="text-xl font-semibold">
            {measurement.reactorOutletTemperatureC}
          </div>
          <div className="pl-1 text-xs">°C on Outlet</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
