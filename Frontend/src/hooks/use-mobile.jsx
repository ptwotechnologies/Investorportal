import { useState, useEffect } from 'react';

/**
 * Hook: useIsMobile
 * Returns true when the viewport width is below the given breakpoint (in px).
 * Default breakpoint is 1024 (tailwind's lg), but you can pass a custom one.
 */
export function useIsMobile(breakpoint = 1024) {
  const getInitial = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  };

  const [isMobile, setIsMobile] = useState(getInitial);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = (e) => setIsMobile(e.matches);

    // Set initial value
    setIsMobile(mql.matches);

    // Prefer modern addEventListener when available
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
    } else {
      // Safari and older browsers
      mql.addListener(onChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange);
      } else {
        mql.removeListener(onChange);
      }
    };
  }, [breakpoint]);

  return isMobile;
}
