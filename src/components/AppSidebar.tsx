import { useContext, useEffect, useState } from "react";

import { ChevronDown, NotebookIcon, Plus } from "lucide-react";

import { NotesContext } from "@/providers/notes";
import { CreateNewNoteType, NotesContextType, NoteType, OpenNoteType } from "@/types/notes";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { getUser, signOut } from "@/utils/auth";

function NoteButton({
  note,
  openNote,
}: {
  note: NoteType;
  openNote: OpenNoteType;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a
          onClick={() => openNote(note.id)}
          className="cursor-pointer"
        >
          <NotebookIcon />
          <span>
            {note.title}
          </span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const {
    notes,
    openNote,
    createNewNote,
  }: {
    notes: NoteType[];
    openNote: OpenNoteType;
    createNewNote: CreateNewNoteType;
  } = useContext<NotesContextType>(NotesContext);
  const [userEmail, setUserEmail] = useState<string>("Loading...");

  const handleSignOut = (() => {
    signOut();
  });

  useEffect(() => {
    setUserEmail(getUser()?.email);
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="cursor-pointer"
                >
                  <span className="w-full overflow-hidden text-ellipsis">
                    {userEmail}
                  </span>
                  <ChevronDown />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  className="cursor-pointer w-full"
                  onClick={handleSignOut}
                >
                  <span className="w-full">
                    Sign Out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Notesee
          </SidebarGroupLabel>
          <SidebarGroupAction
            title="New Note"
            className="cursor-pointer"
            onClick={createNewNote}
          >
            <Plus />
            <span className="sr-only">
              Create new note
            </span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {notes.map((note) => <NoteButton
                key={note.id}
                note={note}
                openNote={openNote}
              />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
