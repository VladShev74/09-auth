'use client';

import { useState } from 'react';
import css from '@/app/notes/Notes.module.css'
import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import NoteList from "@/components/NoteList/NoteList";
import Link from 'next/link';
// import Modal from '@/components/Modal/Modal'
import Loader from '@/components/Loader/Loader'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import EmptyState from '@/components/EmptyState/EmptyState'
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from 'use-debounce';

type NotesClientProps = {
  tag?: string;
}

function NotesClient({ tag }: NotesClientProps) {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const debouncedSetSearchTerm = useDebouncedCallback(
    (value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
    },
    400
  );

  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["notes", searchTerm, currentPage, tag],
    queryFn: () => fetchNotes(searchTerm, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <div className={css.app} suppressHydrationWarning>
        <header className={css.toolbar}>
          <SearchBox onSearch={debouncedSetSearchTerm}/>
          {totalPages > 1 && <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />}
          <Link className={css.button} href='/notes/action/create'>
          Create note +
          </Link>
        </header>
        
        {isLoading && <Loader message="Loading notes..." />}
        
        {isError && (
          <ErrorMessage 
            message={error?.message || "Failed to load notes"} 
            onRetry={() => refetch()} 
          />
        )}
        
        {isSuccess && notes.length === 0 && (
          <EmptyState 
            title={searchTerm ? "No notes found" : "No notes yet"}
            description={searchTerm ? "Try a different search term" : "Create your first note to get started"}
            // action={!searchTerm ? {
            //   label: "Create Note",
            //   onClick: () => setIsModalOpen(true)
            // } : undefined}
          />
        )}
        
        {isSuccess && notes.length > 0 && (
          <NoteList notes={notes} />
        )}
        
        {/* {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )} */}
      </div>
    </>
  );
}

export default NotesClient;
