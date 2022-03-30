import { Measurement, NewNote, Note } from "./types";

export const fetchMeasurements = async (year: number): Promise<Measurement[]> => {
  const response = await fetch(`/api/measurements?year=${year}`);
  return response.json();
}

export const postNewNote = async (newNote: NewNote): Promise<Note> => {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
  return response.json();
}

export const deleteNote = async (id: number): Promise<void> => {
  await fetch(`/api/notes/${id}`, {
    method: "DELETE",
  });
}
