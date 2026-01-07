"use client";

import { useEffect, useState } from "react";
import NoteList from "@/components/NoteList";
import NoteForm from "@/components/NoteForm";
import ThemeToggle from "@/components/ThemeToggle";

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
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Notes App</h1>
        <ThemeToggle />
      </div>

      {/* FORM */}
      <div className="mb-10 bg-white p-6 rounded-xl shadow-md dark:bg-gray-800 dark:shadow-gray-800/30">
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
