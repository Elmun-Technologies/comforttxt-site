'use client';

import { useEffect } from 'react';

/**
 * Shared behaviour for full-screen overlays (drawers, modals, search):
 * locks background scroll while open and closes on Escape. Centralised so
 * every overlay in the app behaves the same way instead of each one
 * reimplementing (or forgetting) it.
 */
export function useOverlay(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
}
