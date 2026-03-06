import { 
  dehydrate, 
  HydrationBoundary, 
  QueryClient 
} from '@tanstack/react-query';
import { fetchNoteById } from "@/lib/api";
import { Metadata } from 'next';
import NoteDetails from './NoteDetails.client';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { id } = await params
  const note = await fetchNoteById(id)

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 30),
      url: `/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub'
        },
      ],
    }
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
