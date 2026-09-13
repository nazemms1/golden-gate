import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArcMotif } from './ui/ArcMotif';
import { useLang } from '@/lib/lang';

/**
 * Brief brand curtain. Holds for a beat while fonts settle, then splits
 * horizontally like a gate opening onto the hero.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      onDone();
      return;
    }
    const total = 1500;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setVisible(false);
        onDone();
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone, reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          exit={{ opacity: 0, transition: { duration: 0.45, delay: 0.55 } }}
        >
          {/* two panels that part like a gate */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink-950"
            exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-950"
            exit={{ y: '100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.35 } }}
          >
            <div className="relative h-28 w-28">
              <ArcMotif className="absolute inset-0 h-full w-full" animate strokeWidth={1.6} />
              <motion.img
                src="./brand/mark.png"
                alt=""
                className="absolute inset-0 m-auto h-9 w-9 object-contain"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <motion.div
              className="mt-7 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="text-gold-gradient text-[0.95rem] font-semibold tracking-[0.18em] rtl:tracking-normal">
                {t.brand.name}
              </div>
              <div className="mt-1.5 text-[0.62rem] tracking-[0.3em] text-sand-50/35 uppercase rtl:tracking-[0.1em]">
                {t.brand.tagline}
              </div>
            </motion.div>

            <div className="mt-8 h-px w-40 overflow-hidden bg-sand-50/10">
              <motion.div
                className="h-full bg-gold-gradient"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div
              className="mt-3 font-display text-[0.6rem] tracking-[0.25em] text-sand-50/25 tabular-nums"
              dir="ltr"
            >
              {String(progress).padStart(3, '0')}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
