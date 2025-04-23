import { useCallback, useEffect, useState } from "react";
import { CircleX, LoaderCircle, Save, Zap } from "lucide-react";

import { NoteType, UpdateNoteType } from "@/types/notes";

import { SidebarTrigger } from "./ui/sidebar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Menubar } from "./ui/menubar";
import { useQuery } from "@tanstack/react-query";
import { upsertNoteQuery } from "@/api/notes";
import { summarizeQuery } from "@/api/deepseek";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type InputChange = (e: InputChangeEvent) => void;

type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;
type TextChange = (e: TextareaChangeEvent) => void;

export function Note({
  note,
  updateNote
}: {
  note: NoteType,
  updateNote: UpdateNoteType,
}) {
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);
  const [summary, setSummary] = useState<string>(note.summary);

  const {
    fetchStatus: saveStatus,
    refetch: refetchSave,
  } = useQuery({
    queryKey: ["updateNote", note.id],
    queryFn: async () => {
      await upsertNoteQuery({
        id: note.id,
        title: title,
        content: content,
        summary: summary,
      });
      return true;
    },
    enabled: false,
  });

  const {
    fetchStatus: summarizeStatus,
    refetch: refetchSummarize,
  } = useQuery({
    queryKey: ["summarize", note.id],
    queryFn: async () => {
      const generatedSummary = await summarizeQuery(content);
      setSummary(generatedSummary);
      return generatedSummary;
    },
    enabled: false,
  });

  const handleTitleChange: InputChange = useCallback<InputChange>((e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  }, []);

  const handleContentChange: TextChange = useCallback<TextChange>((e) => {
    const newContent = e.target.value;
    setContent(newContent);
  }, []);

  const handleSummaryChange: TextChange = useCallback<TextChange>((e) => {
    const newSummary = e.target.value;
    setSummary(newSummary);
  }, []);

  const handleCancel = useCallback(() => {
    setTitle(note.title);
    setContent(note.content);
    setSummary(note.summary);
  }, [note]);

  const handleSave = useCallback(() => {
    updateNote(note.id, (prevNote) => ({
      ...prevNote,
      title: title,
      content: content,
      summary: summary,
    }));
    
    refetchSave();
  }, [
    updateNote,
    note.id,
    title,
    content,
    summary,
    refetchSave,
  ]);

  const handelGenerateSummary = useCallback(() => {
    if (content) refetchSummarize();
  }, [content, refetchSummarize]);

  useEffect(() => {
    handleSave();
  }, [summarizeStatus, handleSave]);

  return (
    <div className="flex p-4 w-full">
      <Card className="w-full rounded-3xl">
        <CardHeader className="flex items-center">
          <SidebarTrigger className="cursor-pointer" />
          <Input
            type="text"
            placeholder={note.title}
            value={title}
            onChange={handleTitleChange}
          />
          <Menubar>
            <Button
              variant="ghost"
              className="size-7 cursor-pointer"
              onClick={handelGenerateSummary}
              disabled={saveStatus === "fetching"}
            >
              {summarizeStatus === "fetching"
                ? <LoaderCircle className="animate-spin" />
                : <Zap />
              }
            </Button>
            <Button
              variant="ghost"
              className="size-7 cursor-pointer"
              onClick={handleCancel}
            >
              <CircleX />
            </Button>
            <Button
              variant="ghost"
              className="size-7 cursor-pointer"
              onClick={handleSave}
              disabled={saveStatus === "fetching"}
            >
              {saveStatus === "fetching"
                ? <LoaderCircle className="animate-spin" />
                : <Save />
              }
            </Button>
          </Menubar>
        </CardHeader>
        <CardContent className="h-full flex flex-col gap-4 md:flex-row">
          <Textarea
            className="w-full h-full resize-none"
            placeholder={note.content}
            value={content}
            onChange={handleContentChange}
          />

          <Textarea
            className="w-full h-full resize-none"
            placeholder={
              summarizeStatus === "fetching"
                ? 'Generating summary...'
                : note.summary
              }
            value={summarizeStatus === "fetching" ? '' : summary}
            onChange={handleSummaryChange}
            disabled={summarizeStatus === "fetching"}
          />
        </CardContent>
      </Card>
    </div>
  )
}
