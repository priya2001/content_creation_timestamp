"use client";
import { useEffect, useState } from "react";
import NoteForm from "@/components/NoteForm";
import NoteList from "@/components/NoteList";

export default function Home() {
  const [notes, setNotes] = useState<any[]>([]);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);

  async function fetchNotes() {
    const res = await fetch("/api/notes");
    setNotes(await res.json());
  }

  async function deleteNote(id: string) {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  }

  function editNote(note: any) {
    setSelectedNote(note);
  }

  function clearEdit() {
    setSelectedNote(null);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Notes App</h1>

      <NoteForm
        onSave={() => {
          fetchNotes();
          clearEdit();
        }}
        selectedNote={selectedNote}
        onCancel={clearEdit}
      />

      <NoteList
        notes={notes}
        onDelete={deleteNote}
        onEdit={editNote}
      />
    </main>
  );
}
