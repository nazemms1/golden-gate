import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { SplitText } from './SplitText';

export function Kicker({
  children,
  tone = 'dark',
  className = '',
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const dot = tone === 'dark' ? 'bg-gold-400' : 'bg-gold-600';
  const text = tone === 'dark' ? 'text-gold-300/85' : 'text-gold-700';
  const line = tone === 'dark' ? 'bg-gold-400/35' : 'bg-gold-600/35';

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className={`absolute inset-0 rounded-full ${dot}`} />
        <span
          className={`absolute inset-0 rounded-full ${dot}`}
          style={{ animation: 'gg-pulse-ring 2.8s var(--ease-brand) infinite' }}
        />
      </span>
      {/* `gg-eyebrow` carries its own per-direction sizing — see index.css */}
      <span className={`gg-eyebrow ${text}`}>{children}</span>
      <motion.span
        className={`h-px flex-1 origin-[inline-start] ${line} max-w-[7rem]`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  tone = 'dark',
  align = 'start',
  className = '',
  titleClassName = '',
  children,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  tone?: 'dark' | 'light';
  align?: 'start' | 'center';
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}) {
  const titleColor = tone === 'dark' ? 'text-sand-50' : 'text-ink-900';
  const leadColor = tone === 'dark' ? 'text-sand-50/62' : 'text-ink-900/62';

  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {kicker ? (
        <Kicker tone={tone} className={align === 'center' ? 'justify-center' : ''}>
          {kicker}
        </Kicker>
      ) : null}

      <SplitText
        as="h2"
        text={title}
        className={`mt-5 text-[clamp(2rem,4.6vw,3.6rem)] font-semibold ${titleColor} ${titleClassName}`}
      />

      {lead ? (
        <motion.p
          className={`mt-6 max-w-2xl text-[0.98rem] leading-[1.85] ${leadColor} ${
            align === 'center' ? 'mx-auto' : ''
          }`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {lead}
        </motion.p>
      ) : null}

      {children}
    </div>
  );
}
