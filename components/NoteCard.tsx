"use client";
import { Pencil, Trash2 } from "lucide-react";

export default function NoteCard({ note, onEdit, onDelete }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between">
      <div>
        <h2 className="font-semibold text-lg">{note.title}</h2>
        <p className="text-gray-600">{note.content}</p>
        <p className="text-sm text-gray-400 mt-2">
          {new Date(note.createdAt).toDateString()}
        </p>
      </div>

      <div className="flex gap-3">
        <button onClick={() => onEdit(note)}>
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(note._id)}>
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}
