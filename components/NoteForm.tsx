"use client";
import { useEffect, useState } from "react";

type Note = {
  _id?: string;
  title: string;
  content: string;
};

interface NoteFormProps {
  onSave: () => void;
  selectedNote?: Note | null;
  onCancel?: () => void;
}

export default function NoteForm({
  onSave,
  selectedNote,
  onCancel,
}: NoteFormProps) {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    } else {
      // CREATE
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    }

    setTitle("");
    setContent("");
    onSave();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <textarea
          className="border p-3 w-full rounded-lg min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-3">
        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {selectedNote ? "Update Note" : "Add Note"}
        </button>

        {selectedNote && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

