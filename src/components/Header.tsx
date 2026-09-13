import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { NAV_IDS, LINKS, type NavId } from '@/data/content';
import { useLang } from '@/lib/lang';
import { lockScroll, scrollToId, useActiveSection } from '@/lib/scroll';
import { Button } from './ui/Button';
import { CloseIcon, DownloadIcon, ExternalIcon, MenuIcon } from './ui/Icons';

export function Header() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(useScroll().scrollY, 'change', (v) => setScrolled(v > 24));

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (id: NavId) => {
    setOpen(false);
    // let the overlay finish closing before the scroll starts
    window.setTimeout(() => scrollToId(id), open ? 240 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* scroll progress hairline */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[2px] origin-[inline-start] bg-gold-gradient"
          style={{ scaleX: scrollYProgress }}
        />

        {/* top scrim so the logo stays legible over the hero */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink-950/80 to-transparent transition-opacity duration-500 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
        />

        <div
          className={`relative transition-all duration-500 ${
            scrolled
              ? 'glass border-b border-gold-300/10 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.9)]'
              : 'border-b border-transparent'
          }`}
        >
          <div className="mx-auto flex h-[4.6rem] max-w-[88rem] items-center gap-6 px-5 sm:px-8 lg:h-20">
            {/* ── brand ─────────────────────────────────────────────── */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex shrink-0 items-center gap-3"
              aria-label={t.brand.legal}
            >
              <span className="relative grid h-10 w-10 place-items-center">
                <span className="absolute inset-0 rounded-full bg-gold-400/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                <img
                  src="./brand/mark.png"
                  alt=""
                  className="relative h-9 w-9 object-contain transition-transform duration-700 group-hover:rotate-[-8deg]"
                />
              </span>
              <span className="hidden flex-col items-start leading-none sm:flex">
                <span className="text-gold-gradient text-[0.92rem] font-semibold tracking-wide rtl:tracking-normal">
                  {t.brand.name}
                </span>
                <span className="mt-1 text-[0.56rem] tracking-[0.24em] text-sand-50/40 uppercase rtl:tracking-[0.06em]">
                  {t.brand.tagline}
                </span>
              </span>
            </button>

            {/* ── desktop nav ───────────────────────────────────────── */}
            <nav className="mx-auto hidden items-center gap-1 lg:flex">
              {NAV_IDS.map((id) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => go(id)}
                    className={`relative rounded-full px-4 py-2 text-[0.83rem] whitespace-nowrap transition-colors duration-300 ${
                      isActive ? 'text-gold-200' : 'text-sand-50/70 hover:text-sand-50'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-gold-300/20 bg-gold-300/8"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t.nav[id]}</span>
                  </button>
                );
              })}
            </nav>

            {/* ── actions ───────────────────────────────────────────── */}
            <div className="ms-auto flex items-center gap-2 lg:ms-0">
              <button
                onClick={toggle}
                className="hidden h-9 w-11 items-center justify-center rounded-full border border-gold-300/20 text-[0.75rem] font-medium text-sand-50/80 transition-colors duration-300 hover:border-gold-300/50 hover:text-gold-200 sm:flex"
                aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                {t.langSwitch}
              </button>

              <span className="hidden xl:block">
                <Button href={LINKS.apk} size="sm" variant="outline" magnetic={false}>
                  <DownloadIcon className="h-3.5 w-3.5" />
                  {t.actions.app}
                </Button>
              </span>

              <span className="hidden sm:block">
                <Button href={LINKS.portal} size="sm" external>
                  {t.actions.portal}
                  <ExternalIcon className="h-3.5 w-3.5" />
                </Button>
              </span>

              <button
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold-300/20 text-sand-50 transition-colors hover:border-gold-300/50 lg:hidden"
                aria-label={t.nav.menu}
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── mobile overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <motion.div
              className="absolute inset-0 bg-ink-950"
              variants={{
                hidden: { clipPath: 'inset(0 0 100% 0)' },
                show: { clipPath: 'inset(0 0 0% 0)' },
              }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />

            <div className="relative flex h-full flex-col">
              <div className="flex h-[4.6rem] items-center justify-between px-5 sm:px-8">
                <img src="./brand/mark.png" alt="" className="h-9 w-9 object-contain" />
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold-300/20 text-sand-50"
                  aria-label={t.nav.close}
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1 px-6 sm:px-10">
                {NAV_IDS.map((id, i) => (
                  <div key={id} className="overflow-hidden">
                    <motion.button
                      onClick={() => go(id)}
                      className="flex w-full items-baseline gap-4 py-3 text-start"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '110%' }}
                      transition={{
                        duration: 0.65,
                        delay: 0.22 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="font-display text-[0.66rem] text-gold-500/70 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-[1.75rem] font-semibold ${
                          active === id ? 'text-gold-200' : 'text-sand-50'
                        }`}
                      >
                        {t.nav[id]}
                      </span>
                    </motion.button>
                  </div>
                ))}
              </nav>

              <motion.div
                className="space-y-3 border-t border-gold-300/10 px-6 py-7 sm:px-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex gap-3">
                  <Button href={LINKS.portal} external size="md" className="flex-1">
                    {t.actions.portal}
                  </Button>
                  <button
                    onClick={toggle}
                    className="h-11 w-14 shrink-0 rounded-full border border-gold-300/25 text-[0.8rem] text-sand-50/80"
                  >
                    {t.langSwitch}
                  </button>
                </div>
                <Button href={LINKS.apk} variant="outline" size="md" className="w-full">
                  <DownloadIcon className="h-4 w-4" />
                  {t.actions.app}
                </Button>
                <a
                  href={`tel:${LINKS.phone}`}
                  className="block pt-2 text-center font-display text-[0.85rem] text-sand-50/50"
                  dir="ltr"
                >
                  {LINKS.phoneLabel}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
