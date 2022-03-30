export type NoteType = "alert" | "comment";
export const noteTypes: NoteType[] = ["alert", "comment"];

export type Timestamp = number;

export type MetricName = 'reactorOutletTemperatureC' | 'reactorHotspotTemperatureC';
export const metricNames: MetricName[] = ['reactorOutletTemperatureC', 'reactorHotspotTemperatureC'];

export type Measurement = {
  date: Timestamp,
  reactorOutletTemperatureC: number,
  reactorHotspotTemperatureC: number,
  notes?: Note[]
}

export type Note = {
  id: number;
  date: Timestamp;
  note: string;
  type: NoteType;
  metrics: MetricName[];
}

export type NewNote = { date: number, note: string, type: NoteType, metrics: MetricName[] };

export type ErrorResponse = {
  errors: { [fieldName: string]: string }
}