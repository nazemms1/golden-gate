import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import type { MouseEvent } from 'react';
import { useLang } from '@/lib/lang';
import { LINKS } from '@/data/content';
import { TAIBA_STATIONS } from '@/data/stations';
import { Kicker } from './ui/SectionHeading';
import { SplitText } from './ui/SplitText';
import { Stagger, StaggerItem } from './ui/Reveal';
import { Button } from './ui/Button';
import { CheckIcon, DownloadIcon, ExternalIcon } from './ui/Icons';

/** The physical card, rebuilt in CSS so it stays crisp and can be tilted. */
function CardVisual() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const springCfg = { stiffness: 180, damping: 20, mass: 0.5 };
  const rotateX = useSpring(rx, springCfg);
  const rotateY = useSpring(ry, springCfg);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.42), transparent 55%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 22);
    rx.set(-(py - 0.5) * 16);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <div className="relative [perspective:1400px]" onMouseMove={onMove} onMouseLeave={reset}>
      {/* glow pad */}
      <div className="absolute inset-x-6 bottom-2 h-24 rounded-[50%] bg-gold-500/25 blur-[60px]" />

      <motion.div
        className="relative aspect-[1.586/1] w-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 40, rotateZ: -4 }}
        whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.85)]">
          {/* brushed navy body */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#04182e_0%,#072b4c_38%,#003262_58%,#04182e_100%)]" />
          {/* gold arc echo of the mark */}
          <svg
            viewBox="0 0 400 252"
            className="absolute inset-0 h-full w-full opacity-[0.5]"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="card-arc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9a7122" stopOpacity="0.1" />
                <stop offset="55%" stopColor="#e3cd7c" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#9a7122" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <circle cx="330" cy="130" r="118" fill="none" stroke="url(#card-arc)" strokeWidth="1.2" />
            <circle cx="330" cy="130" r="86" fill="none" stroke="url(#card-arc)" strokeWidth="1.2" />
            <circle cx="330" cy="130" r="54" fill="none" stroke="url(#card-arc)" strokeWidth="1.2" />
          </svg>
          {/* moving glare */}
          <motion.div
            className="absolute inset-0 mix-blend-overlay"
            style={{ backgroundImage: glare }}
          />

          {/* content */}
          <div className="relative flex h-full flex-col justify-between p-[6%]" dir="ltr">
            <div className="flex items-start justify-between">
              <img src="./brand/mark.png" alt="" className="h-[22%] max-h-12 w-auto object-contain" />
              <span className="text-[0.6rem] font-medium tracking-[0.3em] text-sand-50/55 uppercase">
                Fuel Card
              </span>
            </div>

            {/* chip */}
            <div className="mt-auto flex items-end justify-between">
              <div>
                <div className="h-8 w-11 rounded-[5px] bg-[linear-gradient(135deg,#e3cd7c,#bd8f2c_45%,#f7edc6_70%,#9a7122)] shadow-inner">
                  <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-px p-1 opacity-45">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} className="rounded-[1px] bg-ink-900/35" />
                    ))}
                  </div>
                </div>
                <div className="mt-3 font-display text-[clamp(0.8rem,2.1vw,1.05rem)] tracking-[0.16em] text-sand-50/92 tabular-nums">
                  •••• •••• •••• 8515
                </div>
                <div className="mt-2 text-[0.6rem] tracking-[0.26em] text-gold-200/75 uppercase">
                  Golden Gate
                </div>
              </div>

              <div className="pb-1 text-end">
                <div className="text-[0.52rem] tracking-[0.2em] text-sand-50/40 uppercase">
                  Valid thru
                </div>
                <div className="font-display text-[0.78rem] text-sand-50/80 tabular-nums">
                  ●● / ●●
                </div>
              </div>
            </div>
          </div>

          {/* edge highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] ring-1 ring-gold-200/18 ring-inset" />
        </div>
      </motion.div>
    </div>
  );
}

export function FuelCard() {
  const { t } = useLang();

  return (
    <section id="card" className="noise relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <div className="pointer-events-none absolute start-1/4 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-gold-600/9 blur-[150px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(227,205,124,0.11) 1px, transparent 0)',
          backgroundSize: '46px 46px',
        }}
      />

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* copy */}
        <div>
          <Kicker>{t.card.kicker}</Kicker>
          <SplitText
            as="h2"
            text={t.card.title}
            className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] font-semibold text-sand-50"
          />
          <motion.p
            className="mt-6 max-w-lg text-[1rem] leading-[1.85] text-sand-50/60"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.card.lead}
          </motion.p>

          <Stagger className="mt-9 space-y-3.5">
            {t.card.features.map((f) => (
              <StaggerItem key={f} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold-300/30 bg-gold-300/8 text-gold-200">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[0.92rem] leading-[1.7] text-sand-50/72">{f}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button href={LINKS.portal} external size="lg">
              {t.card.cta}
              <ExternalIcon className="h-4 w-4" />
            </Button>
            <Button href={LINKS.apk} variant="outline" size="lg">
              <DownloadIcon className="h-4 w-4" />
              {t.card.ctaAlt}
            </Button>
          </motion.div>
        </div>

        {/* card + acceptance note */}
        <div className="lg:ps-6">
          <div className="mx-auto max-w-[30rem]">
            <CardVisual />

            <motion.div
              className="mt-10 rounded-2xl border border-gold-300/14 bg-ink-900/45 p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.85, delay: 0.25 }}
            >
              <div className="flex items-center gap-3">
                <img
                  src="./brand/taiba.png"
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-lg bg-white/92 object-contain p-1"
                />
                <div>
                  <div className="text-[0.88rem] font-medium text-sand-50">{t.card.network}</div>
                  <div className="mt-0.5 text-[0.7rem] text-gold-300/75">
                    {t.stations.count(TAIBA_STATIONS.length)}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[0.83rem] leading-[1.8] text-sand-50/55">
                {t.card.networkText}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
