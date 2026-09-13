import { motion } from 'motion/react';
import { useLang } from '@/lib/lang';
import { scrollToId } from '@/lib/scroll';
import { Kicker } from './ui/SectionHeading';
import { SplitText } from './ui/SplitText';
import { Button } from './ui/Button';
import { ArrowIcon, CheckIcon } from './ui/Icons';

export function WhyUs() {
  const { t, isRTL } = useLang();

  return (
    <section className="relative overflow-hidden bg-sand-50 py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(3,15,30,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(3,15,30,0.045) 1px, transparent 1px)',
          backgroundSize: '92px 92px',
        }}
      />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Kicker tone="light">{t.why.kicker}</Kicker>
            <SplitText
              as="h2"
              text={t.why.title}
              className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] font-semibold text-ink-900"
            />

            <motion.div
              className="mt-9"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <Button variant="light" size="lg" onClick={() => scrollToId('contact')}>
                {t.contact.title}
                <ArrowIcon className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </motion.div>
          </div>

          <div className="grid gap-x-6 sm:grid-cols-2">
            {t.why.items.map((item, i) => (
              <motion.div
                key={item}
                className="group flex items-start gap-4 border-b border-ink-900/8 py-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.06 }}
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold-500/30 text-gold-700 transition-all duration-500 group-hover:border-transparent group-hover:bg-gold-gradient group-hover:text-ink-950">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="flex-1 text-[0.92rem] leading-[1.75] text-ink-900/72 transition-colors duration-400 group-hover:text-ink-900">
                  {item}
                </span>
                <span className="font-display text-[0.66rem] text-ink-900/20 tabular-nums transition-colors duration-400 group-hover:text-gold-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
