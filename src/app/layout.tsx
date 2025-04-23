import type { Metadata } from "next";
import { SupabaseProvider } from "@/providers/supabase";

import "./globals.css";
import { QueryProvider } from "@/providers/queries";

export const metadata: Metadata = {
  title: "Notesee",
  description: "AI powered note taking app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <SupabaseProvider>
            {children}
          </SupabaseProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
