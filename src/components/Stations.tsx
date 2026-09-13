import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { useLang } from '@/lib/lang';
import { LINKS } from '@/data/content';
import { STATIONS, type Network, type Station } from '@/data/stations';
import { MAP_VIEWBOX, SYRIA_PATH } from '@/data/syria-map';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/Button';
import { ArrowIcon, FuelIcon, PhoneIcon, PinIcon } from './ui/Icons';

type Filter = 'all' | Network;

export function Stations() {
  const { t, lang, isRTL } = useLang();
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string>('damascus');
  const [hoverId, setHoverId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? STATIONS : STATIONS.filter((s) => s.network === filter)),
    [filter],
  );

  const selected: Station =
    visible.find((s) => s.id === selectedId) ?? visible[0] ?? STATIONS[0];

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: t.stations.all, count: STATIONS.length },
    {
      id: 'gg',
      label: t.stations.ownNetwork,
      count: STATIONS.filter((s) => s.network === 'gg').length,
    },
    {
      id: 'taiba',
      label: t.stations.partnerNetwork,
      count: STATIONS.filter((s) => s.network === 'taiba').length,
    },
  ];

  const pick = (id: string) => setSelectedId(id);

  return (
    <section id="stations" className="noise relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <div className="pointer-events-none absolute end-1/4 top-1/3 h-[30rem] w-[30rem] rounded-full bg-ink-600/12 blur-[140px]" />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker={t.stations.kicker}
            title={t.stations.title}
            lead={t.stations.lead}
            className="lg:max-w-2xl"
          />

          {/* filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`relative overflow-hidden rounded-full border px-4 py-2.5 text-[0.78rem] transition-colors duration-400 ${
                    on
                      ? 'border-gold-300/55 text-ink-950'
                      : 'border-gold-300/18 text-sand-50/65 hover:border-gold-300/40 hover:text-sand-50'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="station-filter"
                      className="absolute inset-0 bg-gold-gradient"
                      transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {f.label}
                    <span
                      className={`font-display text-[0.66rem] tabular-nums ${
                        on ? 'text-ink-950/60' : 'text-gold-300/60'
                      }`}
                    >
                      {f.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── map + detail ───────────────────────────────────────────────── */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* map */}
          <div className="relative overflow-hidden rounded-[1.5rem] border border-gold-300/12 bg-gradient-to-b from-ink-900/70 to-ink-950/60 p-4 sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(227,205,124,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(227,205,124,0.05) 1px, transparent 1px)',
                backgroundSize: '54px 54px',
              }}
            />

            <svg
              viewBox={MAP_VIEWBOX}
              className="relative mx-auto h-auto max-h-[34rem] w-full"
              fill="none"
              aria-label={t.stations.title}
            >
              <defs>
                <linearGradient id="map-fill" x1="0.2" y1="0" x2="0.8" y2="1">
                  <stop offset="0%" stopColor="#0a4278" stopOpacity="0.42" />
                  <stop offset="100%" stopColor="#04182e" stopOpacity="0.22" />
                </linearGradient>
                <filter id="pin-glow" x="-120%" y="-120%" width="340%" height="340%">
                  <feGaussianBlur stdDeviation="7" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.path
                d={SYRIA_PATH}
                fill="url(#map-fill)"
                stroke="#cfa63c"
                strokeOpacity="0.45"
                strokeWidth="1.6"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  pathLength: { duration: 2.4, ease: 'easeInOut' },
                  opacity: { duration: 0.6 },
                }}
              />

              {/* pins */}
              {visible.map((s, i) => {
                const isSel = s.id === selected?.id;
                const isHot = hoverId === s.id || isSel;
                const r = s.network === 'gg' ? 9 : 6.5;
                return (
                  <motion.g
                    key={s.id}
                    onClick={() => pick(s.id)}
                    onMouseEnter={() => setHoverId(s.id)}
                    onMouseLeave={() => setHoverId(null)}
                    className="cursor-pointer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.55 + i * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                  >
                    {/* generous invisible hit area */}
                    <circle cx={s.x} cy={s.y} r={22} fill="transparent" />

                    {isSel && (
                      <circle
                        cx={s.x}
                        cy={s.y}
                        r={r}
                        fill="none"
                        stroke="#e3cd7c"
                        strokeWidth="2"
                        opacity="0.8"
                        style={{
                          transformOrigin: `${s.x}px ${s.y}px`,
                          animation: 'gg-pulse-ring 2.4s var(--ease-brand) infinite',
                        }}
                      />
                    )}

                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={isHot ? r * 1.35 : r}
                      fill={s.network === 'gg' ? '#e3cd7c' : '#0a4278'}
                      stroke={s.network === 'gg' ? '#fdf8e9' : '#cfa63c'}
                      strokeWidth={s.network === 'gg' ? 2 : 1.8}
                      filter={isHot ? 'url(#pin-glow)' : undefined}
                      className="transition-all duration-300"
                    />
                  </motion.g>
                );
              })}

              {/* hover label */}
              {hoverId &&
                (() => {
                  const s = visible.find((v) => v.id === hoverId);
                  if (!s) return null;
                  const label = s[lang].name;
                  const w = label.length * 11 + 28;
                  const flip = s.x + w + 24 > 1000;
                  return (
                    <g pointerEvents="none">
                      <rect
                        x={flip ? s.x - w - 16 : s.x + 16}
                        y={s.y - 17}
                        width={w}
                        height={34}
                        rx={17}
                        fill="#04182e"
                        stroke="#cfa63c"
                        strokeOpacity="0.5"
                      />
                      <text
                        x={flip ? s.x - w / 2 - 16 : s.x + w / 2 + 16}
                        y={s.y + 6}
                        textAnchor="middle"
                        fill="#f7edc6"
                        fontSize="17"
                        fontFamily="inherit"
                      >
                        {label}
                      </text>
                    </g>
                  );
                })()}
            </svg>

            <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gold-300/10 pt-4">
              <span className="text-[0.72rem] text-sand-50/40">{t.stations.hint}</span>
              <div className="flex items-center gap-4 text-[0.68rem] text-sand-50/50">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-sand-50 bg-gold-300" />
                  {t.stations.ownNetwork}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-gold-400 bg-ink-600" />
                  {t.stations.partnerNetwork}
                </span>
              </div>
            </div>
          </div>

          {/* detail + list */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {selected && (
                <motion.article
                  key={selected.id}
                  className="overflow-hidden rounded-[1.5rem] border border-gold-300/14 bg-ink-900/60 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
                    <img
                      src={selected.image}
                      alt={selected[lang].name}
                      loading="lazy"
                      className={`h-full w-full ${
                        selected.network === 'taiba'
                          ? 'scale-[0.45] object-contain'
                          : 'object-cover'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

                    <span className="absolute top-4 inline-flex items-center gap-1.5 rounded-full border border-gold-300/25 bg-ink-950/70 px-3 py-1 text-[0.64rem] text-gold-200 backdrop-blur ltr:left-4 rtl:right-4">
                      <PinIcon className="h-3 w-3" />
                      {selected[lang].city}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-[1.12rem] font-semibold text-sand-50">
                      {selected[lang].name}
                    </h3>
                    <p className="mt-2.5 text-[0.85rem] leading-[1.75] text-sand-50/55">
                      {selected[lang].info}
                    </p>

                    <div className="mt-5">
                      <div className="flex items-center gap-2 text-[0.66rem] tracking-[0.16em] text-sand-50/35 uppercase rtl:tracking-normal">
                        <FuelIcon className="h-3.5 w-3.5" />
                        {t.stations.fuels}
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {selected.fuels[lang].map((f) => (
                          <span
                            key={f}
                            className="rounded-full border border-gold-300/20 bg-gold-300/6 px-3 py-1 text-[0.74rem] text-gold-100/85"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-gold-300/10 pt-4">
                      {selected.code && (
                        <div>
                          <div className="text-[0.62rem] tracking-[0.14em] text-sand-50/32 uppercase rtl:tracking-normal">
                            {t.stations.code}
                          </div>
                          <div className="mt-0.5 font-display text-[0.78rem] text-sand-50/75" dir="ltr">
                            {selected.code}
                          </div>
                        </div>
                      )}
                      {selected.phone && (
                        <div>
                          <div className="text-[0.62rem] tracking-[0.14em] text-sand-50/32 uppercase rtl:tracking-normal">
                            {t.stations.phone}
                          </div>
                          <a
                            href={`tel:${selected.phone}`}
                            className="mt-0.5 flex items-center gap-1.5 font-display text-[0.78rem] text-sand-50/75 transition-colors hover:text-gold-200"
                            dir="ltr"
                          >
                            <PhoneIcon className="h-3 w-3" />
                            {selected.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    <Button
                      href={`${LINKS.maps}${selected.coords}`}
                      external
                      size="sm"
                      variant="outline"
                      className="mt-5 w-full"
                      magnetic={false}
                    >
                      {t.stations.directions}
                      <ArrowIcon className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>

            {/* scrollable list */}
            <div className="max-h-[18rem] overflow-y-auto rounded-[1.25rem] border border-gold-300/12 bg-ink-900/35 p-2">
              {visible.map((s) => {
                const on = s.id === selected?.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => pick(s.id)}
                    onMouseEnter={() => setHoverId(s.id)}
                    onMouseLeave={() => setHoverId(null)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-start transition-colors duration-300 ${
                      on ? 'bg-gold-300/10 text-gold-100' : 'text-sand-50/65 hover:bg-white/[0.035]'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        s.network === 'gg' ? 'bg-gold-300' : 'border border-gold-400/70 bg-ink-600'
                      }`}
                    />
                    <span className="flex-1 truncate text-[0.82rem]">{s[lang].name}</span>
                    {on && <ArrowIcon className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
