import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useLang } from '@/lib/lang';
import { Kicker } from './ui/SectionHeading';
import { SplitText } from './ui/SplitText';
import { Reveal } from './ui/Reveal';
import { ArcMotif } from './ui/ArcMotif';
import { GlobeIcon, PinIcon, SparkIcon } from './ui/Icons';

export function About() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const frontY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const backY = useTransform(scrollYProgress, [0, 1], ['-6%', '10%']);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-sand-50 py-24 lg:py-36">
      {/* hairline grid + arc watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(3,15,30,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(3,15,30,0.045) 1px, transparent 1px)',
          backgroundSize: '92px 92px',
        }}
      />
      <ArcMotif className="pointer-events-none absolute -top-24 end-[-6rem] h-[26rem] w-[26rem] opacity-[0.07]" />

      <div className="relative mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-20">
        {/* ── image stack ─────────────────────────────────────────────── */}
        <div className="relative order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem] lg:max-w-none">
            <motion.div
              className="absolute end-0 top-0 h-[62%] w-[72%] overflow-hidden rounded-[1.25rem] shadow-lift"
              style={{ y: reduce ? 0 : backY }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="./img/hero-station.jpg"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink-950/10" />
            </motion.div>

            <motion.div
              className="absolute start-0 bottom-0 h-[66%] w-[66%] overflow-hidden rounded-[1.25rem] border-4 border-sand-50 shadow-lift"
              style={{ y: reduce ? 0 : frontY }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="./img/fleet-2.jpg"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* location pill */}
            <Reveal
              delay={0.4}
              className="absolute end-[4%] bottom-[6%] flex items-center gap-2.5 rounded-full border border-ink-900/8 bg-white/95 py-2.5 ps-3 pe-5 shadow-[0_18px_40px_-24px_rgba(3,15,30,0.6)] backdrop-blur"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-gradient">
                <PinIcon className="h-3.5 w-3.5 text-ink-950" />
              </span>
              <span className="text-[0.74rem] font-medium whitespace-nowrap text-ink-900">
                {t.about.pillLabel}
              </span>
            </Reveal>
          </div>
        </div>

        {/* ── copy ────────────────────────────────────────────────────── */}
        <div className="order-1 lg:order-2">
          <Kicker tone="light">{t.about.kicker}</Kicker>

          <SplitText
            as="h2"
            text={t.about.title}
            className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] font-semibold text-ink-900"
          />

          <div className="mt-8 space-y-5">
            {t.about.body.map((para, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="text-[0.97rem] leading-[1.95] text-ink-900/68">{para}</p>
              </Reveal>
            ))}
          </div>

          {/* vision + mission */}
          <div className="mt-11 grid gap-4 sm:grid-cols-2">
            {[
              { ...t.about.vision, Icon: GlobeIcon },
              { ...t.about.mission, Icon: SparkIcon },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.1 + i * 0.12}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/45 hover:shadow-[0_28px_60px_-34px_rgba(3,15,30,0.55)]">
                  <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gold-gradient transition-transform duration-600 group-hover:scale-x-100" />
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold-400/30 bg-gold-50 text-gold-700 transition-colors duration-500 group-hover:bg-gold-gradient group-hover:text-ink-950">
                    <item.Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[1.05rem] font-semibold text-ink-900">{item.title}</h3>
                  <p className="mt-3 text-[0.87rem] leading-[1.85] text-ink-900/62">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
