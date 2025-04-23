"use client";

import { useEffect } from "react";

import { NotesProvider } from "@/providers/notes";
import { QueryProvider } from "@/providers/queries";
import { userLoggedIn } from "@/utils/auth";

export default function DashboardLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (!userLoggedIn()) window.location.href = "/auth/login";
  }, []);

  return (
    <QueryProvider>
      <NotesProvider>
        {children}
      </NotesProvider>
    </QueryProvider>
  );
}
