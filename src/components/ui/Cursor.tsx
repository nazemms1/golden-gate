import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { usePointerFine } from '@/lib/media';

/**
 * Brand cursor: a precise gold dot plus a ring that trails it on a spring.
 * The ring opens up over anything clickable and can carry a short label, which
 * is what turns the map pins and gallery frames into obvious invitations.
 *
 * Mounted only for a real mouse (`hover: hover and pointer: fine`) and skipped
 * entirely under reduced motion — touch devices keep the platform behaviour.
 */

type Mode = 'default' | 'hover' | 'label';

/** Elements opt into the label mode with `data-cursor="…"`. */
const INTERACTIVE = 'a,button,input,textarea,select,[role="button"],[data-cursor]';

export function Cursor() {
  const fine = usePointerFine();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState('');

  // The dot is unsprung so it lands exactly under the pointer; the ring is
  // sprung, and the gap between the two is what reads as weight.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 340, damping: 30, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 340, damping: 30, mass: 0.55 });

  useEffect(() => {
    if (!fine) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('gg-cursor-on');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE) as HTMLElement | null;
      if (!target) {
        setMode('default');
        setLabel('');
        return;
      }
      const text = target.dataset.cursor;
      if (text) {
        setMode('label');
        setLabel(text);
      } else {
        setMode('hover');
        setLabel('');
      }
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setMode((m) => (m === 'label' ? m : 'hover'));

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    window.addEventListener('pointerdown', onDown);

    return () => {
      document.documentElement.classList.remove('gg-cursor-on');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const ringSize = mode === 'label' ? 74 : mode === 'hover' ? 48 : 30;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden lg:block" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 grid place-items-center rounded-full border border-gold-300/70"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          backgroundColor:
            mode === 'default' ? 'rgba(227,205,124,0)' : 'rgba(227,205,124,0.12)',
          borderColor: mode === 'default' ? 'rgba(227,205,124,0.55)' : 'rgba(227,205,124,0.95)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.5 }}
      >
        <AnimatePresence>
          {mode === 'label' && label && (
            <motion.span
              className="px-2 text-center text-[0.58rem] leading-tight font-medium text-gold-100"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-gold-200"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && mode !== 'label' ? 1 : 0, scale: mode === 'hover' ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
