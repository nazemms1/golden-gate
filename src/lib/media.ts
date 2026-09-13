import { useEffect, useState } from 'react';

/**
 * Subscribes to a media query. Returns `false` during SSR and on the first
 * paint, then settles — every caller here degrades gracefully to "off", which
 * is the conservative branch (no custom cursor, no hover-only affordance).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/**
 * True only for a real mouse/trackpad. Hover-only affordances and the custom
 * cursor key off this rather than screen width: a tablet in landscape is wide
 * and still has no pointer to follow.
 */
export function usePointerFine(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

/** Desktop breakpoint, matching Tailwind's `lg`. */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

/** Locks focus inside `node` while `active` — used by the lightbox and dialogs. */
export function useFocusTrap(node: HTMLElement | null, active: boolean) {
  useEffect(() => {
    if (!active || !node) return;

    const previous = document.activeElement as HTMLElement | null;
    const selector =
      'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])';

    const focusables = () => Array.from(node.querySelectorAll<HTMLElement>(selector));
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener('keydown', onKey);
    return () => {
      node.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [node, active]);
}
