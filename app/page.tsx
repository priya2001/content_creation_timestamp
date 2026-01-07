"use client";

import { useEffect, useState } from "react";
import NoteList from "@/components/NoteList";
import NoteForm from "@/components/NoteForm";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // 🔹 Fetch notes
  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔹 Handle save note (create or update)
  const handleSave = async () => {
    setSelectedNote(null);
    fetchNotes();
  };

  // 🔹 Delete note
  const deleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notes App</h1>

      {/* FORM */}
      <div className="mb-10 bg-white p-6 rounded-xl shadow-md">
        <NoteForm 
          onSave={handleSave} 
          selectedNote={selectedNote} 
          onCancel={() => setSelectedNote(null)} 
        />
      </div>

      {/* NOTES LIST */}
      <NoteList 
        notes={notes} 
        onDelete={deleteNote} 
        onEdit={setSelectedNote} 
      />
    </div>
  );
}
