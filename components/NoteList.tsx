"use client";
import NoteCard from "./NoteCard";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function NoteList({
  notes,
  onDelete,
  onEdit,
}: NoteListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <div key={note._id} className="h-full">
          <NoteCard 
            note={note} 
            onDelete={onDelete} 
            onEdit={onEdit} 
          />
        </div>
      ))}
    </div>
  );
}
