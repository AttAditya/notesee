import supabase from "@/lib/supabase";
import { NoteType } from "@/types/notes";

export const getNotesQuery = async () => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const createNewNoteQuery = async () => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  const { data, error } = await supabase
    .from("notes")
    .insert({
      title: "Untitled Note",
      content: "",
      summary: "",
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const upsertNoteQuery = async (
  note: NoteType,
) => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  const { data, error } = await supabase
    .from("notes")
    .upsert({
      ...note,
      user_id: userId,
    }).select();

  if (error) throw new Error(error.message);
  return data;
};
