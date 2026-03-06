import type { Note } from "../../types/note";
import css from './NoteList.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from "next/link";

interface NoteListProps {
  notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer} suppressHydrationWarning>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>View Details</Link>
            <button
              className={css.button}
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={deleteMutation.isPending && deleteMutation.variables === note.id}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
