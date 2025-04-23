"use client";

import { useContext } from "react";

import { Note } from "@/components/Note"
import { AppSidebar } from "@/components/AppSidebar"
import { NotesContext } from "@/providers/notes"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Dashboard() {
  const { activeNote, updateNote } = useContext(NotesContext);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar />
          {!activeNote && (
            <div className="h-full w-full p-4 flex">
              <div className="flex gap-2 h-min items-center">
                <SidebarTrigger className="cursor-pointer" />
                Open/Create a note from Sidebar to get started!
              </div>
            </div>
          )}
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
