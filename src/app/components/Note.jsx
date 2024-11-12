import React from "react";

export default function Note({ note, onNoteClick, index }) {
  const { title, tags, active, createdAt } = note;

  return (
    <div
      onClick={() => onNoteClick(note)}
      className={`p-2 hover:cursor-pointer note-item ${active ? "bg-[#E1E5EE]  rounded-md" : ""} `}
    >
      <span className="font-bold">{title || "Untitled Note"}</span>
      {tags.length > 0 ? (
        <div className="my-1 flex gap-x-2">
          {tags.map((tag, index) => (
            <span className="text-xs bg-[#E0E4EA] rounded-md" key={index}>
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
      <span className="text-[10px] block">{createdAt}</span>
    </div>
  );
}
