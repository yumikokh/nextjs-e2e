"use client";
import { useState, useEffect } from "react";
import type { Note } from "@prisma/client";

export default function fetchCcPage() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch(`/api/notes/`);
      if (res.status === 200) {
        setNotes(await res.json());
      }
    };
    fetchNotes();
  }, []);
  return (
    <main className="flex flex-col items-center">
      <h1 className="mt-10 font-bold">Notes page by CC</h1>
      <ul className="m-3">
        {notes?.map((note) => (
          <li key={note.id}>
            <p> {note.title}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
