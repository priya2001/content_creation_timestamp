"use client";

export default function NoteList({
  notes,
  onDelete,
  onEdit,
}: {
  notes: any[];
  onDelete: (id: string) => void;
  onEdit: (note: any) => void;
}) {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note._id} className="border p-4">
          <h2 className="font-bold">{note.title}</h2>
          <p>{note.content}</p>

          <div className="flex gap-3 mt-2">
            <button
              className="text-blue-600"
              onClick={() => onEdit(note)}
            >
              Edit
            </button>

            <button
              className="text-red-500"
              onClick={() => onDelete(note._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
