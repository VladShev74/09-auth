'use client';

import { createPortal } from 'react-dom';
import css from './Modal.module.css'
import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  children: ReactNode,
  onClose: () => void,
}

export default function Modal({ children, onClose }: ModalProps) {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    document.body.style.overflow = 'hidden';

    function handleKeydown (e: KeyboardEvent) {
    if (e.key === 'Escape'){
      onClose()
    }
  }

    window.addEventListener('keydown', handleKeydown)
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeydown)
      mounted.current = false;
    }
  }, [onClose])

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.getElementById('modal-root')!
  );
}