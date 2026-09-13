import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import type { ReactNode, MouseEvent } from 'react';

type Variant = 'gold' | 'outline' | 'light' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium whitespace-nowrap transition-colors duration-300 select-none';

const variants: Record<Variant, string> = {
  gold: 'bg-gold-gradient text-ink-950 shadow-[0_12px_36px_-14px_rgba(207,166,60,0.75)] hover:shadow-[0_16px_46px_-12px_rgba(207,166,60,0.9)]',
  outline:
    'border border-gold-300/35 text-sand-50 hover:border-gold-300/70 hover:bg-gold-300/8 backdrop-blur-sm',
  light:
    'border border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/30 shadow-[0_10px_30px_-18px_rgba(3,15,30,0.5)]',
  ghost: 'text-sand-50/75 hover:text-sand-50',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8rem]',
  md: 'h-11 px-6 text-[0.86rem]',
  lg: 'h-[3.25rem] px-8 text-[0.92rem]',
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  external?: boolean;
  magnetic?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
};

export function Button({
  children,
  variant = 'gold',
  size = 'md',
  href,
  onClick,
  className = '',
  external,
  magnetic = true,
  type = 'button',
  disabled,
  ...rest
}: Props) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetic || reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 14);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const content = (
    <>
      {/* gold sheen sweep on hover */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-100 group-hover:[animation:gg-sheen_0.9s_ease-out]" />
      </span>
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </>
  );

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${
    disabled ? 'pointer-events-none opacity-50' : ''
  } ${className}`;

  const motionProps = {
    style: { x, y },
    onMouseMove: handleMove,
    onMouseLeave: reset,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...motionProps}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} className={cls} onClick={onClick} disabled={disabled} {...motionProps} {...rest}>
      {content}
    </motion.button>
  );
}
