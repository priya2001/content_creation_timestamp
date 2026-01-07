"use client";
import { useEffect, useState } from "react";

type Note = {
  _id?: string;
  title: string;
  content: string;
};

export default function NoteForm({
  onSave,
  selectedNote,
  onCancel,
}: {
  onSave: () => void;
  selectedNote?: Note | null;
  onCancel?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Edit mode: form me data fill
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (selectedNote?._id) {
      // UPDATE
      await fetch(`/api/notes/${selectedNote._id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });
    } else {
      // CREATE
      await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });
    }

    setTitle("");
    setContent("");
    onSave();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <div className="flex gap-2">
        <button className="bg-black text-white px-4 py-2">
          {selectedNote ? "Update Note" : "Add Note"}
        </button>

        {selectedNote && (
          <button
            type="button"
            onClick={onCancel}
            className="border px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

