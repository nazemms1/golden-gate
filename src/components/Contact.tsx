import { AnimatePresence, motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { useLang } from '@/lib/lang';
import { LINKS } from '@/data/content';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';
import {
  ArrowIcon,
  CheckIcon,
  FacebookIcon,
  FuelIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TelegramIcon,
} from './ui/Icons';

type Fields = { name: string; email: string; subject: string; message: string };
const EMPTY: Fields = { name: '', email: '', subject: '', message: '' };

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  textarea,
}: {
  id: keyof Fields;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    'peer w-full rounded-xl border bg-white/[0.03] px-4 pt-6 pb-2 text-[0.9rem] text-sand-50 outline-none transition-colors duration-300 placeholder-transparent';
  const border = error
    ? 'border-red-400/55 focus:border-red-400'
    : 'border-gold-300/15 hover:border-gold-300/30 focus:border-gold-300/70';

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          placeholder={label}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${border} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={label}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${border}`}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2 text-[0.66rem] text-sand-50/45 transition-all duration-300 peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-[0.9rem] peer-focus:top-2 peer-focus:text-[0.66rem] peer-focus:text-gold-300 ltr:left-4 rtl:right-4"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-[0.72rem] text-red-300/90">{error}</p>}
    </div>
  );
}

export function Contact() {
  const { t, isRTL } = useLang();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Fields> = {};
    if (!values.name.trim()) next.name = t.contact.form.required;
    if (!values.email.trim()) next.email = t.contact.form.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
      next.email = t.contact.form.invalidEmail;
    if (!values.message.trim()) next.message = t.contact.form.required;

    setErrors(next);
    if (Object.keys(next).length) return;

    // No mail backend on the static host — hand the message to the visitor's
    // mail client, pre-addressed and pre-filled.
    const subject = values.subject.trim() || `${t.contact.title} — ${values.name}`;
    const body = `${values.message}\n\n---\n${values.name}\n${values.email}`;
    window.location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    setValues(EMPTY);
    window.setTimeout(() => setSent(false), 7000);
  };

  const socials = [
    { href: LINKS.facebook, Icon: FacebookIcon, label: 'Facebook' },
    { href: LINKS.instagram, Icon: InstagramIcon, label: 'Instagram' },
    { href: LINKS.telegram, Icon: TelegramIcon, label: 'Telegram' },
  ];

  const infos = [
    {
      Icon: PhoneIcon,
      label: t.contact.phone,
      value: LINKS.phoneLabel,
      href: `tel:${LINKS.phone}`,
      ltr: true,
    },
    {
      Icon: MailIcon,
      label: t.contact.email,
      value: LINKS.email,
      href: `mailto:${LINKS.email}`,
      ltr: true,
    },
    { Icon: PinIcon, label: t.contact.address, value: t.contact.addressValue, ltr: false },
  ];

  return (
    <section id="contact" className="noise relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <div className="pointer-events-none absolute end-[-8%] top-[-6%] h-[34rem] w-[34rem] rounded-full bg-gold-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
          {/* ── info column ────────────────────────────────────────────── */}
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {infos.map((info, i) => {
                const inner = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold-300/22 bg-gold-300/6 text-gold-200 transition-colors duration-500 group-hover:border-transparent group-hover:bg-gold-gradient group-hover:text-ink-950">
                      <info.Icon className="h-[1.1rem] w-[1.1rem]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.64rem] tracking-[0.16em] text-sand-50/35 uppercase rtl:tracking-normal">
                        {info.label}
                      </span>
                      <span
                        className="mt-1 block truncate text-[0.92rem] text-sand-50/88"
                        dir={info.ltr ? 'ltr' : undefined}
                      >
                        {info.value}
                      </span>
                    </span>
                  </>
                );

                const cls =
                  'group flex items-center gap-4 rounded-2xl border border-gold-300/12 bg-ink-900/40 p-5 transition-all duration-500 hover:border-gold-300/35 hover:bg-ink-900/65';

                return (
                  <Reveal key={info.label} delay={i * 0.08}>
                    {info.href ? (
                      <a href={info.href} className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>

            {/* supply request */}
            <Reveal delay={0.24}>
              <a
                href={`mailto:${LINKS.fuelEmail}?subject=${encodeURIComponent(t.contact.supply)}`}
                className="group flex items-center gap-4 rounded-2xl border border-gold-300/25 bg-gradient-to-br from-gold-500/12 to-transparent p-5 transition-all duration-500 hover:border-gold-300/55"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-gradient text-ink-950">
                  <FuelIcon className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.8rem] leading-[1.6] text-sand-50/70">
                    {t.contact.supply}
                  </span>
                  <span className="mt-1 block font-display text-[0.9rem] text-gold-200" dir="ltr">
                    {LINKS.fuelEmail}
                  </span>
                </span>
                <ArrowIcon
                  className={`h-4 w-4 shrink-0 text-gold-300 transition-transform duration-500 group-hover:translate-x-1 ${
                    isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
                  }`}
                />
              </a>
            </Reveal>

            {/* socials */}
            <Reveal delay={0.3}>
              <div className="flex items-center gap-3 rounded-2xl border border-gold-300/12 bg-ink-900/40 p-5">
                <span className="text-[0.64rem] tracking-[0.16em] text-sand-50/35 uppercase rtl:tracking-normal">
                  {t.contact.follow}
                </span>
                <span className="h-px flex-1 bg-gold-300/12" />
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-gold-300/18 text-sand-50/65 transition-all duration-400 hover:-translate-y-0.5 hover:border-transparent hover:bg-gold-gradient hover:text-ink-950"
                    >
                      <s.Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── form ───────────────────────────────────────────────────── */}
          <Reveal y={34}>
            <form
              onSubmit={submit}
              noValidate
              className="relative overflow-hidden rounded-[1.5rem] border border-gold-300/14 bg-ink-900/50 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/45 to-transparent" />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="name"
                  label={t.contact.form.name}
                  value={values.name}
                  onChange={set('name')}
                  error={errors.name}
                />
                <Field
                  id="email"
                  type="email"
                  label={t.contact.form.email}
                  value={values.email}
                  onChange={set('email')}
                  error={errors.email}
                />
              </div>

              <div className="mt-4">
                <Field
                  id="subject"
                  label={t.contact.form.subject}
                  value={values.subject}
                  onChange={set('subject')}
                />
              </div>

              <div className="mt-4">
                <Field
                  id="message"
                  textarea
                  label={t.contact.form.message}
                  value={values.message}
                  onChange={set('message')}
                  error={errors.message}
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg">
                  {t.contact.form.send}
                  <ArrowIcon className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>

                <AnimatePresence>
                  {sent && (
                    <motion.span
                      className="flex items-center gap-2 text-[0.8rem] text-gold-200"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <CheckIcon className="h-4 w-4" />
                      {t.contact.form.success}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
