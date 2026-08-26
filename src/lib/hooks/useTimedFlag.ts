'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A boolean that flips true, then back to false after `ms`, used for
 * transient "added!" confirmation states on buttons. Re-triggering while
 * already true resets the timer instead of stacking a second one, and the
 * pending timeout is cleared on unmount so it never fires a state update
 * on an unmounted component.
 */
export function useTimedFlag(ms: number): [boolean, () => void] {
  const [flag, setFlag] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const trigger = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setFlag(true);
    timeoutRef.current = setTimeout(() => setFlag(false), ms);
  }, [ms]);

  return [flag, trigger];
}
