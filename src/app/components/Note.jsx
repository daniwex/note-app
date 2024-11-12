import React from "react";

export default function Note({ note, onNoteClick }) {
  if (!note.title) {
    return (
      <div
        onClick={(e) => onNoteClick(note)}
        className={`p-1 hover:cursor-pointer text-sm ${
          note.active ? "bg-[#E0E4EA] rounded-md" : ""
        }`}
      >
        <span>Unititled Note</span>
      </div>
    );
  }
  return (
    <div onClick={(e) => onNoteClick(note)} className="border-b">
      <span>{note.title}</span>
      <div></div>
    </div>
  );
}
