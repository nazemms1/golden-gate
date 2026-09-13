import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ElementType, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Distance travelled on the y axis, in px. */
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

/** Fade + rise on scroll into view. The workhorse reveal used across the page. */
export function Reveal({
  children,
  as = 'div',
  className,
  delay = 0,
  y = 26,
  duration = 0.85,
  once = true,
  amount = 0.25,
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion(as as ElementType);

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggers direct children of a container when it enters the viewport. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export function Stagger({
  children,
  className,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const MotionTag = motion(as as ElementType);
  return (
    <MotionTag className={className} variants={staggerChild}>
      {children}
    </MotionTag>
  );
}
