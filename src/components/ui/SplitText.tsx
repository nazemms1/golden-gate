import { motion, useReducedMotion } from 'motion/react';
import type { ElementType } from 'react';

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** Set false to replay every time the element re-enters the viewport. */
  once?: boolean;
};

/**
 * Word-by-word mask reveal. Each word sits inside an overflow-hidden span and
 * slides up from below the baseline — the effect editorial sites use for
 * display headings. Words keep their natural spacing so Arabic shaping and
 * bidi ordering are untouched.
 */
export function SplitText({
  text,
  as = 'span',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  const Tag = as as ElementType;
  const words = text.split(' ');

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            initial={{ y: '108%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once, amount: 0.6 }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
