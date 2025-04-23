"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  CreateNewNoteType,
  NotesContextType,
  NoteType,
  OpenNoteType,
  UpdateNoteType,
} from "@/types/notes";
import { getNotesQuery } from "@/api/notes";

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  openNote: (() => {}),
  updateNote: (() => {}),
  createNewNote: (() => {}),
});

export const NotesProvider = ({
  children
}: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [activeNote, setActiveNote] = useState<NoteType | undefined>();

  const openNote = useCallback<OpenNoteType>((noteId) => {
    const note = notes.find((note) => note.id === noteId);
    if (note) setActiveNote(note);
  }, [notes]);

  const updateNote = useCallback<UpdateNoteType>((noteId, updateFn) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id !== noteId) return note;
        return updateFn(note);
      });
    });
  }, []);

  const createNewNote = useCallback<CreateNewNoteType>(() => {
    const newNote: NoteType = {
      id: crypto.randomUUID(),
      title: "Untitled Note",
      content: "",
      summary: "",
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setActiveNote(newNote);
  }, []);

  const contextValues: NotesContextType = {
    notes,
    activeNote,
    openNote,
    updateNote,
    createNewNote,
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotesQuery();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (activeNote) openNote(activeNote?.id);
  }, [activeNote, openNote]);

  return (
    <NotesContext.Provider value={contextValues}>
      {children}
    </NotesContext.Provider>
  );
};
