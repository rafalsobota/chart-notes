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
        <div className="text-gray-500 font-semibold">
          {formatDate(measurement.date, true)}
        </div>
        <div className="flex flex-row align-bottom text-green-500 items-baseline">
          <div className="font-semibold text-xl">
            {measurement.reactorHotspotTemperatureC}
          </div>
          <div className="text-xs pl-1">°C on Hotspot</div>
        </div>
        <div className="flex flex-row items-baseline text-blue-500">
          <div className="font-semibold text-xl">
            {measurement.reactorOutletTemperatureC}
          </div>
          <div className="text-xs pl-1">°C on Outlet</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
