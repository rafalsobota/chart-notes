import { useState } from "react";
import { Timestamp } from "../lib/api";
import { Button } from "./Button";
import { NewNoteForm } from "./NewNoteForm";

export type AddNoteButtonProps = {
  date: Timestamp;
};

export const AddNoteButton = ({ date }: AddNoteButtonProps) => {
  const [inCreationMode, setCreationMode] = useState(false);

  const openEditMode = () => {
    setCreationMode(true);
  };

  const closeEditMode = () => {
    setCreationMode(false);
  };

  if (!inCreationMode) {
    return <Button onClick={openEditMode}>Add Note</Button>;
  } else {
    return <NewNoteForm date={date} onClose={closeEditMode} />;
  }
};
