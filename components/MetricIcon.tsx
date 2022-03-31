import { MetricName } from "../lib/api";
import { metricBgColor } from "../lib/metrics";

type SensorIconProps = {
  metric: MetricName;
};

export const MetricIcon: React.FC<SensorIconProps> = ({ metric }) => {
  return (
    <div
      className={`inline-block mr-1 w-2 h-2 border border-white rounded-full ${metricBgColor(
        metric
      )}`}
    />
  );
};
