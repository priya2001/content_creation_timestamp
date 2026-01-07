import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/models/Note";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: Request, { params }: Params) {
  await connectDB();

  const { id } = await params; // ✅ yahin main fix hai
  const { title, content } = await req.json();

  const note = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );

  return NextResponse.json(note);
}

export async function DELETE(req: Request, { params }: Params) {
  await connectDB();

  const { id } = await params; // ✅ yahin main fix hai
  await Note.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}

