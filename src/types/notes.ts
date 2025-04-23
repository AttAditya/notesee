export interface NoteType {
  id: string;
  title: string;
  content: string;
  summary: string;
};

export interface NotesContextType {
  notes: NoteType[];
  activeNote?: NoteType;
  openNote: OpenNoteType;
  updateNote: UpdateNoteType;
  createNewNote: CreateNewNoteType;
};

export type OpenNoteType = (noteId: string) => void;

export type UpdateNoteType = (
  noteId: string | undefined,
  updateFn: (note: NoteType) => NoteType,
) => void;

export type CreateNewNoteType = () => void;
