export type NoteType = "alert" | "comment";
export const noteTypes: NoteType[] = ["alert", "comment"];

export type Timestamp = number;

export type MetricName = 'reactorHotspotTemperatureC' | 'reactorOutletTemperatureC';
export const metricNames: MetricName[] = ['reactorHotspotTemperatureC', 'reactorOutletTemperatureC'];

export type Measurement = {
  date: Timestamp,
  reactorOutletTemperatureC: number,
  reactorHotspotTemperatureC: number,
  notes?: Note[]
};

export type Note = {
  id: number;
  date: Timestamp;
  note: string;
  type: NoteType;
  metrics: MetricName[];
};

export type NewNote = { date: number, note: string, type: NoteType, metrics: MetricName[] };

export type ErrorResponse = {
  errors: { [fieldName: string]: string }
};
