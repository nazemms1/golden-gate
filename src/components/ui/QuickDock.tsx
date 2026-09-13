import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { LINKS } from '@/data/content';
import { useLang } from '@/lib/lang';
import { ChatIcon, CloseIcon, ExternalIcon, MailIcon, PhoneIcon, TelegramIcon } from './Icons';

/**
 * Floating contact dock: one gold button that opens the routes a prospect
 * actually wants — phone, Telegram, email, the customer portal.
 *
 * It appears only once the hero is behind the fold, where its corner is free.
 */
export function QuickDock() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => setShown(v > 0.06));

  useEffect(() => {
    if (!shown) setOpen(false);
  }, [shown]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const actions = [
    { href: `tel:${LINKS.phone}`, Icon: PhoneIcon, label: t.contact.phone, value: LINKS.phoneLabel },
    { href: LINKS.telegram, Icon: TelegramIcon, label: 'Telegram', value: '@goldeenget', ext: true },
    { href: `mailto:${LINKS.email}`, Icon: MailIcon, label: t.contact.email, value: LINKS.email },
    {
      href: LINKS.portal,
      Icon: ExternalIcon,
      label: t.actions.portal,
      value: 'portal.goldengate.sy',
      ext: true,
    },
  ];

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          className="fixed bottom-5 z-[55] flex flex-col items-center gap-3 ltr:right-5 rtl:left-5 sm:bottom-7 sm:ltr:right-7 sm:rtl:left-7"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── expanded contact routes ─────────────────────────────────── */}
          <AnimatePresence>
            {open && (
              <motion.ul
                className="flex flex-col items-stretch gap-2"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                  show: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {actions.map((a) => (
                  <motion.li
                    key={a.label}
                    variants={{
                      hidden: { opacity: 0, y: 14, scale: 0.9 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={a.href}
                      {...(a.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 rounded-full border border-gold-300/18 bg-ink-950/88 py-2 ps-2 pe-4 shadow-lift backdrop-blur-md transition-colors duration-300 hover:border-gold-300/55"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-300/20 text-gold-200 transition-colors duration-400 group-hover:border-transparent group-hover:bg-gold-gradient group-hover:text-ink-950">
                        <a.Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 text-start">
                        <span className="block text-[0.74rem] font-medium text-sand-50">
                          {a.label}
                        </span>
                        <span
                          className="block truncate text-[0.64rem] text-sand-50/45"
                          dir="ltr"
                        >
                          {a.value}
                        </span>
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* ── contact toggle ──────────────────────────────────────────── */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={t.ui.quickActions}
            className="relative grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-ink-950 shadow-[0_18px_44px_-14px_rgba(207,166,60,0.75)] transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {/* attention ping, once the dock first appears */}
            {!open && (
              <span
                className="pointer-events-none absolute inset-0 rounded-full border border-gold-300"
                style={{ animation: 'gg-pulse-ring 3.2s var(--ease-brand) infinite' }}
              />
            )}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'chat'}
                initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                transition={{ duration: 0.22 }}
              >
                {open ? <CloseIcon className="h-5 w-5" /> : <ChatIcon className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
