import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/lang';
import { scrollToId } from '@/lib/scroll';
import { MAP_VIEWBOX, SYRIA_PATH } from '@/data/syria-map';
import { GG_STATIONS, TAIBA_STATIONS } from '@/data/stations';
import { Button } from './ui/Button';
import { Counter } from './ui/Counter';
import { ArrowIcon, PinIcon } from './ui/Icons';

/**
 * Hero slideshow. Each frame drifts and zooms out (Ken Burns) for its whole
 * turn, so the backdrop is always moving rather than sitting still between
 * cuts. `from` is the starting transform of that drift.
 */
const SLIDES = [
  { src: './img/hero-station.jpg', from: { scale: 1.18, x: '-2%', y: '-1%' } },
  { src: './img/fleet-3.jpg', from: { scale: 1.16, x: '2.5%', y: '1%' } },
  { src: './img/fleet-1.jpg', from: { scale: 1.2, x: '0%', y: '2%' } },
  { src: './img/hero-fleet.jpg', from: { scale: 1.15, x: '-2.5%', y: '1%' } },
  { src: './img/fleet-2.jpg', from: { scale: 1.18, x: '2%', y: '-2%' } },
];

const SLIDE_MS = 5600;
const FADE_S = 1.4;

/** Faint constellation of the real station network, drawn beside the headline. */
function NetworkBackdrop() {
  const all = [...GG_STATIONS, ...TAIBA_STATIONS];
  // Damascus HQ is the hub every supply route radiates from
  const hub = GG_STATIONS.find((s) => s.id === 'damascus') ?? all[0];

  return (
    <svg
      viewBox={MAP_VIEWBOX}
      className="h-full w-full"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-map-fill" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#17578f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#04182e" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="hero-route" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cfa63c" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#e3cd7c" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#cfa63c" stopOpacity="0.1" />
        </linearGradient>
        <filter id="hero-pin-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={SYRIA_PATH}
        fill="url(#hero-map-fill)"
        stroke="#e3cd7c"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { duration: 2.6, ease: 'easeInOut' }, opacity: { duration: 0.8 } }}
      />

      {/*
        Routes are static geometry revealed with a staggered fade. Three other
        approaches were tried here and all broke — worth not repeating:
          - motion `pathLength` + a CSS dash animation both write
            stroke-dashoffset, and the lines visibly stutter;
          - motion does not animate the `x2`/`y2` attributes, which collapses
            every line to zero length;
          - putting strokeDashoffset in motion's `animate` alongside opacity
            drops the opacity animation, leaving the lines invisible.
        CSS animations do not run inside this SVG subtree either, so the
        movement in the hero comes from the slideshow and the pins instead.
      */}
      {all
        .filter((s) => s.id !== hub.id)
        .map((s, i) => (
          <motion.line
            key={`r-${s.id}`}
            x1={hub.x}
            y1={hub.y}
            x2={s.x}
            y2={s.y}
            stroke="url(#hero-route)"
            strokeWidth="1.6"
            strokeDasharray="8 12"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1.1, delay: 0.7 + i * 0.055, ease: 'easeOut' }}
          />
        ))}

      {all.map((s, i) => (
        <motion.circle
          key={`p-${s.id}`}
          cx={s.x}
          cy={s.y}
          r={s.network === 'gg' ? 9 : 5.5}
          fill={s.network === 'gg' ? '#f7edc6' : '#cfa63c'}
          filter={s.network === 'gg' ? 'url(#hero-pin-glow)' : undefined}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: s.network === 'gg' ? 1 : 0.7 }}
          transition={{ duration: 0.5, delay: 1.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${s.x}px ${s.y}px` }}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  const { t, isRTL } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mapY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);

  // Auto-advance; restarts whenever the slide changes, so manual picks
  // get a full turn rather than the remainder of the previous one.
  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [slide, reduce]);

  const preload = useCallback(() => {
    SLIDES.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  useEffect(preload, [preload]);

  const lines = [t.hero.line1, t.hero.line2, t.hero.line3];
  const current = SLIDES[slide];

  return (
    <section ref={ref} className="noise relative min-h-[100svh] overflow-hidden bg-ink-950">
      {/* ── slideshow layer ───────────────────────────────────────────── */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: reduce ? 0 : imgY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_S, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${current.src})` }}
              initial={reduce ? false : current.from}
              animate={{ scale: 1, x: '0%', y: '0%' }}
              transition={{ duration: SLIDE_MS / 1000 + FADE_S, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* base wash, then a directional gradient that keeps the copy side darkest */}
        <div className="absolute inset-0 bg-ink-950/68" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/30 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/55 to-ink-950/45 rtl:bg-gradient-to-l" />
      </motion.div>

      {/* soft gold bloom behind the headline */}
      <div className="pointer-events-none absolute start-[-12%] top-1/4 h-[34rem] w-[34rem] rounded-full bg-gold-500/10 blur-[150px]" />

      {/* ── content ───────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[88rem] items-center px-5 pt-28 pb-[8.5rem] sm:px-8 lg:pb-32"
        style={{ opacity: reduce ? 1 : contentOpacity }}
      >
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-12">
          {/* copy column */}
          <motion.div className="min-w-0" style={{ y: reduce ? 0 : contentY }}>
            <motion.div
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-gold-300/22 bg-ink-900/45 py-2 ps-3 pe-4 backdrop-blur-md"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <PinIcon className="h-3.5 w-3.5 shrink-0 text-gold-300" />
              <span className="text-[0.72rem] tracking-wide text-sand-50/78">{t.hero.badge}</span>
            </motion.div>

            <h1 className="mt-6 text-[clamp(2.4rem,5.6vw,4.9rem)] leading-[1.05] font-semibold text-sand-50 rtl:leading-[1.28]">
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`block ${i === 2 ? 'text-gold-gradient' : ''}`}
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.05, delay: 0.5 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-xl text-[0.98rem] leading-[1.85] text-sand-50/65"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.hero.lead}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button size="lg" onClick={() => scrollToId('services')}>
                {t.actions.explore}
                <ArrowIcon className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToId('stations')}>
                {t.actions.stations}
              </Button>
            </motion.div>
          </motion.div>

          {/* map column */}
          <motion.div
            className="pointer-events-none relative hidden lg:block"
            style={{ y: reduce ? 0 : mapY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto aspect-[1000/898] w-full max-w-[30rem]">
              <NetworkBackdrop />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── slideshow controls ────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-[7.5rem] z-20 hidden items-center gap-4 ltr:right-8 rtl:left-8 md:flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={slide}
            className="text-[0.72rem] whitespace-nowrap text-sand-50/60"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {t.hero.slides[slide]}
          </motion.span>
        </AnimatePresence>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setSlide(i)}
              className="group py-2"
              aria-label={t.hero.slides[i]}
              aria-current={i === slide}
            >
              <span
                className={`block h-[3px] overflow-hidden rounded-full transition-all duration-500 ${
                  i === slide
                    ? 'w-10 bg-sand-50/20'
                    : 'w-4 bg-sand-50/25 group-hover:w-6 group-hover:bg-sand-50/45'
                }`}
              >
                {i === slide && (
                  <motion.span
                    className="block h-full bg-gold-gradient"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: reduce ? 0.3 : SLIDE_MS / 1000, ease: 'linear' }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        <span className="font-display text-[0.68rem] text-sand-50/35 tabular-nums" dir="ltr">
          {String(slide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </motion.div>

      {/* ── stats rail ────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 border-t border-gold-300/12 bg-ink-950/72 backdrop-blur-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto grid max-w-[88rem] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {t.hero.stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-baseline gap-2.5 border-s border-gold-300/10 px-3 py-3 odd:border-s-0 sm:gap-3 sm:px-4 lg:border-s lg:px-6 lg:py-5 lg:odd:border-s lg:first:border-s-0 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0"
            >
              <span className="font-display text-[1.45rem] leading-none font-semibold text-gold-gradient tabular-nums sm:text-[1.75rem] lg:text-[2.25rem]">
                <Counter value={Number(stat.value)} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.76rem] font-medium text-sand-50/88">
                  {stat.label}
                </span>
                <span className="mt-0.5 block truncate text-[0.66rem] text-sand-50/42">
                  {stat.sub}
                </span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
