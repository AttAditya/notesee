import supabase from "@/lib/supabase";

export const summarizeQuery = async (text: string) => {
  const { data, error } = await supabase.functions.invoke(
    'Notes-Summarizer', {
      body: { text },
    }
  );

  if (error) throw new Error(error.message);
  return data;
};
