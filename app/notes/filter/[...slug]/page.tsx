import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = slug[0];
  const actualTag = tag === 'all' ? undefined : tag;
  const label = actualTag ?? 'All';

  return {
    title: `NoteHub - ${label}`,
    description: `Browse notes filtered by: ${label}`,
    openGraph: {
      title: `NoteHub - ${label}`,
      description: `Browse notes filtered by: ${label}`,
      url: `/notes/filter/${tag}`,
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

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0];
  const actualTag = tag === 'all' ? undefined : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, actualTag],
    queryFn: () => fetchNotes("", 1, actualTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={actualTag} />
    </HydrationBoundary>
  );
}
