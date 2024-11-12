import React from "react";

export default function Note({ note, onNoteClick }) {
  if (!note.title) {
    return (
      <div
        onClick={(e) => onNoteClick(note)}
        className={`p-2 hover:cursor-pointer text-sm ${
          note.active ? "bg-[#E0E4EA] rounded-md" : ""
        }`}
      >
        <span>Unititled Note</span>
      </div>
    );
  }
  return (
    <div
      onClick={(e) => onNoteClick(note)}
      className={`p-2 hover:cursor-pointer ${
        note.active ? "bg-[#d1dcec76] rounded-md" : ""
      }`}
    >
      <span className="font-bold">{note.title}</span>
      <div className="mt-1 flex gap-x-2">
        {note.tags.length > 0 ? (
          note.tags.map((el, index) => <span className="text-xs bg-[#E0E4EA] p-1 rounded-md" key={index}>{el}</span>)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
