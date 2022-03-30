import { MetricName } from "../lib/api";

type SensorIconProps = {
  metric: MetricName;
};

export const SensorIcon: React.FC<SensorIconProps> = ({ metric }) => {
  return (
    <div
      className={`inline-block mr-1 w-2 h-2 border border-white rounded-full ${
        metric === "reactorHotspotTemperatureC" ? "bg-sensor-1" : "bg-sensor-2"
      }`}
    />
  );
};
