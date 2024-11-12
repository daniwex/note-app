import React from "react";
import Note from "./Note";

export default function Notes({ notes, onNoteClick }) {
  return (
    <div className="mt-4 grid gap-y-1">
      {notes.map((el, index) => (
        <Note onNoteClick={onNoteClick} key={index} note={el} index={index}/>
      ))}
    </div>
  );
}
