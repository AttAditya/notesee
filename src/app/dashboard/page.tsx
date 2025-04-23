"use client";

import { useContext } from "react";

import { Note } from "@/components/Note"
import { AppSidebar } from "@/components/AppSidebar"
import { NotesContext } from "@/providers/notes"
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboard() {
  const { activeNote, updateNote } = useContext(NotesContext);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar />
          {activeNote && (
            <Note
              key={activeNote.id}
              note={activeNote}
              updateNote={updateNote}
            />
          )}
        </SidebarProvider>
      </div>
    </div>
  )
}
