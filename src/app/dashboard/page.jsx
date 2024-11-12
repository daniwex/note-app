"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import OneNote from "../components/OneNote";
import Notes from "../components/Notes";
import {getCurrentDateFormatted} from "../lib/utility"

export default function Page() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  async function getNotes() {
    try {
      const req = await fetch("/api/notes");
      if (req.ok) {
        const notes = await req.json();
        setNotes(notes.notes);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  const handleCreateNewNote = () => {
    const newNote = {
      id: new Date(), 
      title: "",
      tags: [],
      createdAt: getCurrentDateFormatted(),
      active: false,
      body: "",
    };
    setNotes([newNote, ...notes]);
  };

  const handleNoteClick = useCallback((noteId) => {
    setCurrentNoteId(noteId);
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, active: true } : { ...note, active: false }
      )
    );
  }, [notes]);

  const handleChangeNote = useCallback(
    (noteId, changes) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, ...changes } : note
        )
      );
    },
    []
  );

  const currentNote = notes.find(note => note.id === currentNoteId);

  return (
    <div className="overflow-y-hidden">
      <div className="block sm:flex justify-between w-full sm:border-b items-center h-[60px] sm:px-4 mb-5 sm:mb-0">
        <div className="sm:hidden flex items-center bg-[#EBF1FF] mb-3 h-full px-4">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width="80"
            height="80"
          />
        </div>
        <span className="px-4 sm:px-0 font-bold">All Notes</span>
        <div className="hidden sm:flex w-1/2 justify-end">
          <div className="relative flex items-center w-1/2">
            <Image
              src="/assets/images/icon-search.svg"
              alt="search"
              width="20"
              height="20"
              className="absolute mx-2"
            />
            <input
              type="search"
              placeholder="Search by title, content, or tags..."
              className="placeholder:text-xs py-2 pr-2 border rounded-md pl-8 text-xs w-3/4 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="sm:flex h-full" style={{ height: "calc(100vh - 60px)" }}>
        <div className="w-full sm:block sm:basis-1/5 sm:border-r h-full">
          <div className="sm:flex flex-col p-4">
            <button
              className="text-xs rounded-full absolute bottom-14 right-5 
                right h-10 w-10 sm:w-full sm:static flex place-content-center place-items-center text-white bg-[#335CFF] sm:h-8 sm:rounded-md"
              onClick={handleCreateNewNote}
            >
              <Image
                src="/assets/images/icon-plus.svg"
                alt="create new note"
                width="15"
                height="15"
                className=" stroke-white"
              />
              <span className="hidden sm:block">Create New Note</span>
            </button>
            {notes.length > 0 ? (
              <div>
                <Notes
                  notes={notes}
                  onNoteClick={(note) => handleNoteClick(note.id)}
                />
              </div>
            ) : (
              <div className="sm:mt-3 p-2 bg-[#CACFD8]">
                <p className="text-xs leading-normal">
                  You do not have any notes yet. Start a new note to capture
                  your thoughts and ideas.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-full">
          {currentNote ? (
            <OneNote
              noteTitle={currentNote.title}
              onChangeTitle={(newTitle) =>
                handleChangeNote(currentNote.id, { title: newTitle })
              }
              noteTags={currentNote.tags}
              onChangeTag={(newTags) =>
                handleChangeNote(currentNote.id, { tags: newTags.split(",") })
              }
              noteModified={currentNote.createdAt}
              onChangeDate={(newDate) =>
                handleChangeNote(currentNote.id, { createdAt: newDate })
              }
              noteBody={currentNote.body}
              onChangeBody={(newBody) =>
                handleChangeNote(currentNote.id, { body: newBody })
              }
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
