import api from './api';
import type { Note } from '../../types/note';
import type { User } from '../../types/user';

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface AuthCredentials {
  email: string;
  password: string;
}

export async function fetchNotes(search?: string, page?: number, tag?: string, perPage: number = 12): Promise<NotesHttpResponse> {
  const params: Record<string, string | number> = {};

  if (search) params.search = search;
  if (page && page > 1) params.page = page;
  if (tag && tag !== 'all') params.tag = tag;
  params.perPage = perPage;

  const response = await api.get<NotesHttpResponse>('/notes', { params });
  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function createNote(newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
  const response = await api.post<Note>('/notes', newNote);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function register(credentials: AuthCredentials): Promise<User> {
  const response = await api.post<User>('/auth/register', credentials);
  return response.data;
}

export async function login(credentials: AuthCredentials): Promise<User> {
  const response = await api.post<User>('/auth/login', credentials);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<boolean> {
  const response = await api.get<{ success: boolean }>('/auth/session');
  return response.data.success;
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>('/users/me');
  return response.data;
}

export async function updateMe(data: Partial<Pick<User, 'username'>>): Promise<User> {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
}