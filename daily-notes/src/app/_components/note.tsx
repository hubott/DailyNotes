"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function Note() {
  const [noteContent, setNoteContent] = useState("");
  const createNote = api.note.create.useMutation({
    onSuccess: async () => {
      setNoteContent("");
    },
  });

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNote.mutate({ name: noteContent });
        }}
        className="flex flex-col gap-2"
      >
        <textarea
          placeholder="Write your note here..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full rounded-lg bg-white/10 px-4 py-2 text-white"
          rows={5}
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createNote.isPending}
        >
          {createNote.isPending ? "Saving..." : "Save Note"}
        </button>
      </form>
    </div>
  );
}