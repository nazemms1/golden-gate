import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/lang';
import { Kicker } from './ui/SectionHeading';
import { SplitText } from './ui/SplitText';
import { Reveal } from './ui/Reveal';
import { TruckIcon } from './ui/Icons';

const IMAGES = ['./img/fleet-1.jpg', './img/fleet-2.jpg', './img/fleet-3.jpg'];
const DURATION = 5200;

export function Fleet() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % IMAGES.length), DURATION);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce]);

  return (
    <section id="fleet" className="noise relative overflow-hidden bg-ink-900 py-24 lg:py-32">
      <div className="pointer-events-none absolute start-[-10%] top-0 h-[30rem] w-[30rem] rounded-full bg-gold-600/8 blur-[140px]" />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-16">
          {/* ── copy + types ───────────────────────────────────────────── */}
          <div>
            <Kicker>{t.fleet.kicker}</Kicker>
            <SplitText
              as="h2"
              text={t.fleet.title}
              className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] font-semibold text-sand-50"
            />
            <motion.p
              className="mt-6 max-w-md text-[0.97rem] leading-[1.9] text-sand-50/58"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.fleet.lead}
            </motion.p>

            <div className="mt-9 border-t border-gold-300/12">
              {t.fleet.items.map((item, i) => (
                <motion.div
                  key={item}
                  className="group flex items-center gap-4 border-b border-gold-300/12 py-3.5 transition-colors duration-400 hover:bg-white/[0.03]"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-display text-[0.66rem] text-gold-400/60 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <TruckIcon className="h-4 w-4 shrink-0 text-sand-50/35 transition-colors duration-400 group-hover:text-gold-300" />
                  <span className="text-[0.9rem] text-sand-50/78 transition-colors duration-400 group-hover:text-sand-50">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-7">
              <p className="max-w-md text-[0.83rem] leading-[1.8] text-sand-50/45">
                {t.fleet.note}
              </p>
            </Reveal>
          </div>

          {/* ── gallery ────────────────────────────────────────────────── */}
          <motion.div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-gold-300/12 shadow-lift sm:aspect-[16/11]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={IMAGES[index]}
                  src={IMAGES[index]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1 },
                    scale: { duration: 7, ease: 'linear' },
                  }}
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-ink-950/15" />

              {/* progress bars */}
              <div className="absolute inset-x-5 bottom-5 flex gap-2">
                {IMAGES.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIndex(i)}
                    className="group h-1 flex-1 overflow-hidden rounded-full bg-white/20"
                    aria-label={`${i + 1}`}
                  >
                    <motion.span
                      className="block h-full bg-gold-gradient"
                      initial={{ width: '0%' }}
                      animate={{ width: i === index ? '100%' : i < index ? '100%' : '0%' }}
                      transition={{
                        duration: i === index && !paused && !reduce ? DURATION / 1000 : 0.3,
                        ease: 'linear',
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* floating badge */}
            <motion.div
              className="absolute -bottom-6 flex items-center gap-3 rounded-2xl border border-gold-300/18 bg-ink-950/88 px-5 py-4 shadow-lift backdrop-blur-md ltr:-left-4 rtl:-right-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-gradient text-ink-950">
                <TruckIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-[1.4rem] leading-none font-semibold text-sand-50 tabular-nums">
                  {t.fleet.items.length}
                </span>
                <span className="mt-1 block text-[0.68rem] text-sand-50/45">{t.fleet.kicker}</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
