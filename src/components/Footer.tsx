import { motion } from 'motion/react';
import { useLang } from '@/lib/lang';
import { LINKS, NAV_IDS } from '@/data/content';
import { scrollToId } from '@/lib/scroll';
import { ArcMotif } from './ui/ArcMotif';
import { FacebookIcon, InstagramIcon, TelegramIcon, ArrowIcon } from './ui/Icons';

export function Footer() {
  const { t, isRTL } = useLang();
  const year = new Date().getFullYear();

  const socials = [
    { href: LINKS.facebook, Icon: FacebookIcon, label: 'Facebook' },
    { href: LINKS.instagram, Icon: InstagramIcon, label: 'Instagram' },
    { href: LINKS.telegram, Icon: TelegramIcon, label: 'Telegram' },
  ];

  return (
    <footer className="noise relative overflow-hidden border-t border-gold-300/10 bg-ink-950">
      <ArcMotif className="pointer-events-none absolute -bottom-40 end-[-6rem] h-[32rem] w-[32rem] opacity-[0.06]" />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        {/* ── top ─────────────────────────────────────────────────────── */}
        <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] lg:py-20">
          <div>
            <motion.img
              src="./brand/logo-full-light.png"
              alt={t.brand.legal}
              className="h-14 w-auto max-w-[19rem] object-contain object-[left_center] rtl:object-[right_center]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <p className="mt-6 max-w-sm text-[0.87rem] leading-[1.85] text-sand-50/48">
              {t.brand.legal}
            </p>
            <p className="mt-2 text-[0.75rem] text-sand-50/30">{t.footer.built}</p>

            <div className="mt-7 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold-300/16 text-sand-50/60 transition-all duration-400 hover:-translate-y-0.5 hover:border-transparent hover:bg-gold-gradient hover:text-ink-950"
                >
                  <s.Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav>
            <h3 className="text-[0.64rem] tracking-[0.24em] text-gold-300/70 uppercase rtl:tracking-[0.08em]">
              {t.footer.links}
            </h3>
            <ul className="mt-6 space-y-1">
              {NAV_IDS.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToId(id)}
                    className="group flex items-center gap-2 py-1.5 text-[0.88rem] text-sand-50/58 transition-colors duration-300 hover:text-gold-200"
                  >
                    <span className="h-px w-0 bg-gold-300 transition-all duration-400 group-hover:w-4" />
                    {t.nav[id]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.64rem] tracking-[0.24em] text-gold-300/70 uppercase rtl:tracking-[0.08em]">
              {t.footer.contact}
            </h3>
            <ul className="mt-6 space-y-3.5 text-[0.88rem]">
              <li>
                <a
                  href={`tel:${LINKS.phone}`}
                  className="text-sand-50/58 transition-colors hover:text-gold-200"
                  dir="ltr"
                >
                  {LINKS.phoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${LINKS.email}`}
                  className="text-sand-50/58 transition-colors hover:text-gold-200"
                  dir="ltr"
                >
                  {LINKS.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${LINKS.fuelEmail}`}
                  className="text-sand-50/58 transition-colors hover:text-gold-200"
                  dir="ltr"
                >
                  {LINKS.fuelEmail}
                </a>
              </li>
              <li className="text-sand-50/58">{t.contact.addressValue}</li>
              <li className="pt-2">
                <a
                  href={LINKS.portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-gold-200/85 transition-colors hover:text-gold-100"
                >
                  {t.actions.portal}
                  <ArrowIcon
                    className={`h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1 ${
                      isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
                    }`}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── bottom ──────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gold-300/10 py-6 text-[0.75rem] text-sand-50/32 sm:flex-row">
          <p>
            © {year} {t.brand.legal}. {t.footer.rights}.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 transition-colors hover:text-gold-200"
          >
            {t.brand.name}
            <span className="grid h-6 w-6 place-items-center rounded-full border border-gold-300/20 transition-colors group-hover:border-gold-300/60">
              <ArrowIcon className="h-3 w-3 -rotate-90" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
