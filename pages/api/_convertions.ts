import { Measurement, Note } from '@prisma/client';
import * as client from '../../lib/api/types';

export const makeClientMeasurements = (measurements: Pick<Measurement, 'date' | 'reactorOutletTemperatureC' | 'reactorHotspotTemperatureC'>[], notes: Note[]): client.Measurement[] => {
  const clientNotes: client.Note[] = notes.map(makeClientNote);

  return measurements.map((m) => {
    const date = m.date.getTime();
    return {
      date: date,
      reactorOutletTemperatureC: m.reactorOutletTemperatureC,
      reactorHotspotTemperatureC: m.reactorHotspotTemperatureC,
      notes: clientNotes.filter((n) => n.date === date),
    } as client.Measurement;
  });
}

export const makeClientNote = (note: Note): client.Note => {
  return {
    id: note.id,
    note: note.note,
    type: note.type as client.NoteType,
    date: note.date.getTime(),
    metrics: note.metrics.split(",") as client.MetricName[],
  }
}

export const makeServerNewNote = (newNote: client.NewNote): Omit<Note, 'id'> => {
  return {
    date: new Date(newNote.date),
    note: newNote.note,
    type: newNote.type,
    metrics: newNote.metrics.join(","),
  }
}