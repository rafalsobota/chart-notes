import { MetricName } from "..";

export const metricBgColor = (metric: MetricName): string => {
  return metric === "reactorHotspotTemperatureC"
    ? "bg-sensor-1"
    : "bg-sensor-2";
};

export const metricTextColor = (metric: MetricName): string => {
  return metric === "reactorHotspotTemperatureC"
    ? "text-sensor-1"
    : "text-sensor-2";
};

export const metricVarColor = (metric: MetricName): string => {
  return metric === "reactorHotspotTemperatureC"
    ? "var(--color-sensor-1)"
    : "var(--color-sensor-2)";
};

export const metricLabel = (metric: MetricName): string => {
  return metric == "reactorHotspotTemperatureC"
    ? "°C on Hotspot" : "°C on Reactor";
};

export const fiendlyMetricName = (metric: MetricName): string => {
  switch (metric) {
    case "reactorOutletTemperatureC":
      return "Reactor Outlet Temperature";
    case "reactorHotspotTemperatureC":
      return "Reactor Hotspot Temperature";
  }
};
