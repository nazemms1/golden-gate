import { motion } from 'motion/react';

/**
 * Decorative motif abstracted from the company mark: two nested crescents
 * with a gap on the leading edge. Used as a watermark behind section titles
 * and as the loading indicator.
 */
export function ArcMotif({
  className,
  strokeWidth = 2,
  animate = false,
}: {
  className?: string;
  strokeWidth?: number;
  animate?: boolean;
}) {
  const rings = [
    { r: 46, dash: 289, gap: 0.3, delay: 0 },
    { r: 32, dash: 201, gap: 0.34, delay: 0.12 },
    { r: 18, dash: 113, gap: 0.42, delay: 0.24 },
  ];

  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="arc-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a7122" />
          <stop offset="35%" stopColor="#e3cd7c" />
          <stop offset="65%" stopColor="#f7edc6" />
          <stop offset="100%" stopColor="#bd8f2c" />
        </linearGradient>
      </defs>
      {rings.map((ring, i) =>
        animate ? (
          <motion.circle
            key={i}
            cx="50"
            cy="50"
            r={ring.r}
            stroke="url(#arc-gold)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${ring.dash * (1 - ring.gap)} ${ring.dash * ring.gap}`}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: [-90, 270], opacity: 1 }}
            transition={{
              rotate: { duration: 3.2 + i * 0.9, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.6, delay: ring.delay },
            }}
            style={{ transformOrigin: '50% 50%' }}
          />
        ) : (
          <circle
            key={i}
            cx="50"
            cy="50"
            r={ring.r}
            stroke="url(#arc-gold)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${ring.dash * (1 - ring.gap)} ${ring.dash * ring.gap}`}
            transform={`rotate(${-90 + i * 22} 50 50)`}
          />
        ),
      )}
    </svg>
  );
}
