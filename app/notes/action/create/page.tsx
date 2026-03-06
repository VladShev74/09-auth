import React from 'react';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';
import css from './CreateNote.module.css'

export const metadata: Metadata = {
  title: "NoteHub - Create Note",
  description: "Create new note",
  openGraph: {
    title: "NoteHub - Create Note",
    description: "Create new note",
    url: 'https://notehub.app/notes/action/create',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub'
      },
    ],
    type: 'website',
  }
};

export default function page() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  )
}
