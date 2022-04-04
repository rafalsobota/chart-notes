import { NoteType } from "..";

export const fiendlyNoteTypeName = (type: NoteType): string => {
  switch (type) {
    case "alert":
      return "Alert";
    case "comment":
      return "Comment";
  }
};
