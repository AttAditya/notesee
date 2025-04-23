import type { Metadata } from "next";
import { SupabaseProvider } from "@/providers/supabase";

import "./globals.css";

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
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
