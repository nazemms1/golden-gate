import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { useLang } from '@/lib/lang';
import { lockScroll } from '@/lib/scroll';
import { useFocusTrap } from '@/lib/media';
import { ChevronLeft, ChevronRight, CloseIcon } from './Icons';

export type LightboxItem = { src: string; caption?: string };

/**
 * Full-screen image viewer. Arrow keys and Escape work, the backdrop closes,
 * and a horizontal drag advances on touch — the three gestures people try
 * first. Navigation is always laid out left-to-right regardless of page
 * direction, because it maps to the physical order of the images.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  /** `null` closes the viewer. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const { t } = useLang();
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const open = index !== null;

  useFocusTrap(node, open);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    lockScroll(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [open, onClose, go]);

  const current = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          ref={setNode}
          role="dialog"
          aria-modal="true"
          aria-label={t.ui.gallery}
          className="fixed inset-0 z-[90] flex flex-col bg-ink-950/94 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ── bar ─────────────────────────────────────────────────────── */}
          <div className="relative z-10 flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <span className="font-display text-[0.72rem] text-sand-50/50 tabular-nums" dir="ltr">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              onClick={onClose}
              aria-label={t.ui.close}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold-300/20 text-sand-50 transition-colors duration-300 hover:border-gold-300/60 hover:text-gold-200"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* ── stage ───────────────────────────────────────────────────── */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
            {/* backdrop click target, behind the image */}
            <button
              className="absolute inset-0 cursor-default"
              aria-label={t.ui.close}
              tabIndex={-1}
              onClick={onClose}
            />

            <AnimatePresence mode="wait">
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.caption ?? ''}
                className="relative max-h-full max-w-full rounded-xl object-contain shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label={t.ui.prev}
                  className="absolute left-2 grid h-11 w-11 place-items-center rounded-full border border-gold-300/20 bg-ink-950/70 text-sand-50 backdrop-blur-md transition-colors duration-300 hover:border-gold-300/60 hover:text-gold-200 sm:left-5"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label={t.ui.next}
                  className="absolute right-2 grid h-11 w-11 place-items-center rounded-full border border-gold-300/20 bg-ink-950/70 text-sand-50 backdrop-blur-md transition-colors duration-300 hover:border-gold-300/60 hover:text-gold-200 sm:right-5"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* ── caption + thumbnails ────────────────────────────────────── */}
          <div className="relative z-10 px-5 py-5 sm:px-8">
            {current.caption && (
              <p className="mb-4 text-center text-[0.85rem] text-sand-50/70">{current.caption}</p>
            )}
            {items.length > 1 && (
              <div className="mx-auto flex max-w-full justify-center gap-2 overflow-x-auto pb-1">
                {items.map((item, i) => (
                  <button
                    key={item.src + i}
                    onClick={() => onIndexChange(i)}
                    aria-label={item.caption ?? `${i + 1}`}
                    aria-current={i === index}
                    className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 sm:h-14 sm:w-20 ${
                      i === index
                        ? 'border-gold-300/70 opacity-100'
                        : 'border-transparent opacity-45 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
