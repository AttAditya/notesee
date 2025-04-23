'use client';

import supabase from "@/lib/supabase";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export function SupabaseProvider({
  children
}: { children: React.ReactNode }) {
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={null}
    >
      {children}
    </SessionContextProvider>
  );
};
