/**
 * Infinite horizontal ticker. The track holds two identical halves and shifts
 * by exactly -50%, so the loop is seamless regardless of content width.
 */
export function Marquee({
  items,
  className = '',
  speed = 42,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  const half = (key: string) => (
    <div className="flex shrink-0 items-center" aria-hidden={key === 'b'}>
      {items.map((item, i) => (
        <div key={`${key}-${i}`} className="flex shrink-0 items-center">
          <span className="px-8 text-[0.8rem] font-medium tracking-[0.22em] whitespace-nowrap text-sand-50/45 uppercase rtl:tracking-[0.08em]">
            {item}
          </span>
          <svg viewBox="0 0 12 12" className="h-2 w-2 shrink-0 text-gold-500" aria-hidden="true">
            <path d="M6 0 7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4Z" fill="currentColor" />
          </svg>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`mask-fade-x relative overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex w-max"
        style={{ animationDuration: `${speed}s` }}
        dir="ltr"
      >
        {half('a')}
        {half('b')}
      </div>
    </div>
  );
}
