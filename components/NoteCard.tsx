"use client";
import { Pencil, Trash2, Calendar } from "lucide-react";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  // Truncate content if it's too long
  const truncatedContent = note.content.length > 100 
    ? note.content.substring(0, 100) + '...' 
    : note.content;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="flex-1">
        <h2 className="font-bold text-lg text-gray-800 mb-2">{note.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{truncatedContent}</p>
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
        <div className="flex items-center text-gray-500 text-xs">
          <Calendar size={14} className="mr-1" />
          <span>
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            {" "}
            {new Date(note.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(note)}
            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
          >
            <Pencil size={16} />
          </button>
          <button 
            onClick={() => onDelete(note._id)}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
