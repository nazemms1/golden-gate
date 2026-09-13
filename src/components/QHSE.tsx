import { motion } from 'motion/react';
import { useLang } from '@/lib/lang';
import { SectionHeading, Kicker } from './ui/SectionHeading';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';
import { ArcMotif } from './ui/ArcMotif';
import { AlertIcon, GaugeIcon, LeafIcon, ShieldIcon, UsersIcon } from './ui/Icons';

const ISO_ICONS = [GaugeIcon, LeafIcon, ShieldIcon];
const PILLAR_ICONS = [AlertIcon, ShieldIcon, UsersIcon, GaugeIcon];

export function QHSE() {
  const { t } = useLang();

  return (
    <section id="qhse" className="relative overflow-hidden bg-sand-100 py-24 lg:py-32">
      <ArcMotif className="pointer-events-none absolute -top-28 start-[-8rem] h-[30rem] w-[30rem] opacity-[0.07]" />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          kicker={t.qhse.kicker}
          title={t.qhse.title}
          lead={t.qhse.lead}
          tone="light"
          titleClassName="text-[clamp(1.8rem,3.8vw,2.9rem)]"
        />

        {/* ── ISO seals ─────────────────────────────────────────────────── */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {t.qhse.iso.map((cert, i) => {
            const Icon = ISO_ICONS[i] ?? ShieldIcon;
            return (
              <motion.div
                key={cert.code}
                className="group relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/45 hover:shadow-[0_34px_70px_-40px_rgba(3,15,30,0.55)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArcMotif className="pointer-events-none absolute -end-8 -top-8 h-32 w-32 opacity-[0.12] transition-transform duration-1000 group-hover:rotate-45" />

                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-ink-950 shadow-gold">
                  <Icon className="h-6 w-6" />
                </span>

                <div
                  className="mt-6 font-display text-[1.2rem] font-semibold tracking-tight text-ink-900"
                  dir="ltr"
                >
                  {cert.code}
                </div>
                <div className="mt-1.5 text-[0.84rem] text-ink-900/60">{cert.label}</div>

                <span className="mt-5 block h-px w-full origin-[inline-start] scale-x-0 bg-gold-gradient transition-transform duration-700 group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </div>

        {/* ── policy panel ──────────────────────────────────────────────── */}
        <Reveal className="mt-6" y={34}>
          <div className="noise relative overflow-hidden rounded-[1.75rem] bg-ink-950 p-8 sm:p-12 lg:p-14">
            <div className="pointer-events-none absolute end-[-6rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-gold-600/12 blur-[110px]" />

            <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
              <div>
                <Kicker>{t.qhse.policyTitle}</Kicker>
                <p className="mt-6 text-[0.95rem] leading-[1.95] text-sand-50/68">
                  {t.qhse.policyText}
                </p>

                {/* safety pillars */}
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {t.qhse.pillars.map((p, i) => {
                    const Icon = PILLAR_ICONS[i] ?? ShieldIcon;
                    return (
                      <Reveal
                        key={p.title}
                        delay={i * 0.08}
                        className="rounded-xl border border-gold-300/12 bg-white/[0.03] p-4 transition-colors duration-500 hover:border-gold-300/35 hover:bg-white/[0.055]"
                      >
                        <span className="flex items-center gap-2.5 text-gold-200">
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="text-[0.82rem] font-medium text-sand-50">{p.title}</span>
                        </span>
                        <p className="mt-2.5 text-[0.76rem] leading-[1.75] text-sand-50/48">
                          {p.text}
                        </p>
                      </Reveal>
                    );
                  })}
                </div>
              </div>

              {/* commitments */}
              <div>
                <h3 className="text-[1.05rem] font-medium text-gold-100">{t.qhse.commitTitle}</h3>

                <Stagger className="mt-7 border-t border-gold-300/12">
                  {t.qhse.commitments.map((c, i) => (
                    <StaggerItem
                      key={i}
                      className="group flex gap-4 border-b border-gold-300/12 py-4 transition-colors duration-400 hover:bg-white/[0.025]"
                    >
                      <span className="font-display text-[0.68rem] text-gold-400/70 tabular-nums transition-colors duration-400 group-hover:text-gold-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.85rem] leading-[1.8] text-sand-50/62 transition-colors duration-400 group-hover:text-sand-50/85">
                        {c}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
