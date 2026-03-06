'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import css from '@/components/NotePreview/NotePreview.module.css';

type NotePreviewProps = {
  noteId: string;
};

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();
  
  const { data: note, error, isLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading note...</p>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Failed to load note details.</p>
      </Modal>
    );
  }

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={() => router.back()}>
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
    </Modal>
  );
}
