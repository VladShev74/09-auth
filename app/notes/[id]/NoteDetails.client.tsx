'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import css from './NoteDetails.module.css';

export default function NoteDetails() {
  const params = useParams();
  const noteId = params.id as string;
  
  const { data: note, error, isLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container} suppressHydrationWarning>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
          <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date} suppressHydrationWarning>
          {formattedDate}
        </p>
      </div>
    </div>
  );
}
