import { motion } from 'motion/react';
import { useState } from 'react';
import { useLang } from '@/lib/lang';
import { Kicker } from './ui/SectionHeading';
import { SplitText } from './ui/SplitText';
import { ArcMotif } from './ui/ArcMotif';
import {
  HandshakeIcon,
  LeafIcon,
  SparkIcon,
  ShieldIcon,
  GaugeIcon,
  UsersIcon,
  CheckIcon,
} from './ui/Icons';

const ICONS = [ShieldIcon, GaugeIcon, CheckIcon, UsersIcon, HandshakeIcon, SparkIcon, LeafIcon];

export function Values() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="noise relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <ArcMotif className="pointer-events-none absolute -bottom-40 start-[-8rem] h-[34rem] w-[34rem] opacity-[0.06]" />
      <div className="pointer-events-none absolute end-0 top-0 h-[28rem] w-[28rem] rounded-full bg-ink-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-20">
          {/* sticky heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Kicker>{t.values.kicker}</Kicker>
            <SplitText
              as="h2"
              text={t.values.title}
              className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] font-semibold text-sand-50"
            />
            <motion.p
              className="mt-6 max-w-sm text-[0.95rem] leading-[1.9] text-sand-50/55"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.values.lead}
            </motion.p>
          </div>

          {/* spec-sheet list */}
          <div
            className="border-t border-gold-300/12"
            onMouseLeave={() => setHovered(null)}
          >
            {t.values.items.map((item, i) => {
              const Icon = ICONS[i] ?? ShieldIcon;
              const isOn = hovered === i;
              return (
                <motion.div
                  key={item.title}
                  onMouseEnter={() => setHovered(i)}
                  className="group relative border-b border-gold-300/12"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* hover wash */}
                  <motion.span
                    className="pointer-events-none absolute inset-x-[-1.25rem] inset-y-0 rounded-lg bg-gradient-to-r from-gold-300/7 to-transparent rtl:from-transparent rtl:to-gold-300/7"
                    initial={false}
                    animate={{ opacity: isOn ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                  />

                  <div className="relative grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 py-6 sm:grid-cols-[3.2rem_minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-x-7 sm:py-7">
                    <span
                      className={`font-display text-[0.72rem] tabular-nums transition-colors duration-400 ${
                        isOn ? 'text-gold-300' : 'text-sand-50/28'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="flex items-center gap-3">
                      <motion.span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors duration-400 ${
                          isOn
                            ? 'border-gold-300/50 bg-gold-300/12 text-gold-200'
                            : 'border-sand-50/10 text-sand-50/45'
                        }`}
                        animate={{ rotate: isOn ? -6 : 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.span>
                      <motion.h3
                        className={`text-[1.02rem] font-medium transition-colors duration-400 ${
                          isOn ? 'text-gold-100' : 'text-sand-50'
                        }`}
                        animate={{ x: isOn ? 3 : 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {item.title}
                      </motion.h3>
                    </div>

                    <p className="col-start-2 text-[0.86rem] leading-[1.8] text-sand-50/50 sm:col-start-3">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
