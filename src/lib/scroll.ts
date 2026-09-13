import Lenis from 'lenis';
import { useEffect, useRef, useState } from 'react';

let lenisInstance: Lenis | null = null;

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
}

export function scrollToId(id: string, offset = -72) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset, duration: 1.25 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function lockScroll(locked: boolean) {
  if (locked) {
    lenisInstance?.stop();
    document.body.style.overflow = 'hidden';
  } else {
    lenisInstance?.start();
    document.body.style.overflow = '';
  }
}

/** Tracks which section id is currently in view, for nav highlighting. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>('');
  const ratios = useRef(new Map<string, number>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = '';
        let bestRatio = 0.001;
        for (const [id, r] of ratios.current) {
          if (r > bestRatio) {
            best = id;
            bestRatio = r;
          }
        }
        setActive(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85], rootMargin: '-15% 0px -35% 0px' },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
