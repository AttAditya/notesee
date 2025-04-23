"use client";

import { useEffect } from "react";

import { NotesProvider } from "@/providers/notes";
import { userLoggedIn } from "@/utils/auth";

export default function DashboardLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (!userLoggedIn()) window.location.href = "/auth/login";
  }, []);

  return (
    <NotesProvider>
      {children}
    </NotesProvider>
  );
}
