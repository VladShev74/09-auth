import axios from 'axios';
import type { Note }  from '../types/note';

interface NotesHttpResponse {
  notes: Note[],
  totalPages: number,
}

export async function fetchNotes(search?: string, page?: number, tag?: string, perPage: number = 12): Promise<NotesHttpResponse> {
  const params: Record<string, string | number> = {};
  
  if (search) params.search = search;
  if (page && page > 1) params.page = page;
  if (tag && tag !== 'all') params.tag = tag;
  params.perPage = perPage;
  
  const response = await axios.get<NotesHttpResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  // console.log('API Response:', response.data);
  // console.log('API Response keys:', Object.keys(response.data));
  // console.log('Total pages value:', response.data.totalPages);
  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function createNote(newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    newNote,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}