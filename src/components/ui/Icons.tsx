type P = { className?: string };

const S = ({ children, className }: P & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const ArrowIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </S>
);

export const ChevronDown = ({ className }: P) => (
  <S className={className}>
    <path d="m6 9 6 6 6-6" />
  </S>
);

export const PhoneIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </S>
);

export const MailIcon = ({ className }: P) => (
  <S className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2.5 6 8.6 6a2 2 0 0 0 2.3 0L22 6" />
  </S>
);

export const PinIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M20 10c0 5.4-6.6 11.3-7.5 12a1 1 0 0 1-1.2 0C10.5 21.3 4 15.4 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.8" />
  </S>
);

export const ShieldIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M12 2.5 4.5 5.7v5.6c0 4.6 3.1 8.9 7.5 10.2 4.4-1.3 7.5-5.6 7.5-10.2V5.7Z" />
    <path d="m9 12 2.2 2.2L15.4 10" />
  </S>
);

export const LeafIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6" />
  </S>
);

export const GaugeIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M13.4 10.6 19 5" />
    <path d="M20.7 17a9 9 0 1 0-17.4 0" />
  </S>
);

export const AlertIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4.5" />
    <path d="M12 17.2h.01" />
  </S>
);

export const UsersIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </S>
);

export const HandshakeIcon = ({ className }: P) => (
  <S className={className}>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a2 2 0 0 1 0-2.8l.4-.4a2.4 2.4 0 0 0-3.4 0L10 8h-.9a2 2 0 0 0-1.4.6L5 11" />
    <path d="m18 15-1.5-1.5" />
    <path d="M2 11.5 5 8.5" />
  </S>
);

export const SparkIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5-2-6.5L3.5 11 10 9Z" />
  </S>
);

export const GlobeIcon = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M2.5 12h19" />
    <path d="M12 2.5a15 15 0 0 1 0 19 15 15 0 0 1 0-19Z" />
  </S>
);

export const TruckIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M14 17V6.5a1 1 0 0 0-1-1H2.8a1 1 0 0 0-1 1V17h2" />
    <path d="M14 9h3.7a2 2 0 0 1 1.7 1l2.4 4a2 2 0 0 1 .2.9V17h-2" />
    <circle cx="6.5" cy="17.5" r="2.2" />
    <circle cx="18" cy="17.5" r="2.2" />
    <path d="M8.7 17.5h7.1" />
  </S>
);

export const FuelIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M3.5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
    <path d="M2 21h13" />
    <path d="M5.5 8.5h6" />
    <path d="M17 21v-6.5h1.5a2 2 0 0 0 2-2V8.2l-2.3-2.3" />
    <path d="M13.5 14.5H17" />
  </S>
);

export const CardIcon = ({ className }: P) => (
  <S className={className}>
    <rect x="2" y="5" width="20" height="14" rx="2.5" />
    <path d="M2 10h20" />
    <path d="M6 15h3.5" />
  </S>
);

export const BuildingIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M3 21h18" />
    <path d="M5 21V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16" />
    <path d="M14 10h3a2 2 0 0 1 2 2v9" />
    <path d="M8.5 7h2M8.5 11h2M8.5 15h2" />
  </S>
);

export const DownloadIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M12 3v12" />
    <path d="m7.5 11 4.5 4.5 4.5-4.5" />
    <path d="M20 17.5v1.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5" />
  </S>
);

export const ExternalIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M14 4h6v6" />
    <path d="m20 4-8.5 8.5" />
    <path d="M18 14.5V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H10" />
  </S>
);

export const CheckIcon = ({ className }: P) => (
  <S className={className}>
    <path d="m4.5 12.5 5 5 10-11" />
  </S>
);

export const MenuIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M3.5 7h17" />
    <path d="M3.5 12h17" />
    <path d="M3.5 17h17" />
  </S>
);

export const CloseIcon = ({ className }: P) => (
  <S className={className}>
    <path d="m5.5 5.5 13 13" />
    <path d="m18.5 5.5-13 13" />
  </S>
);

export const FacebookIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
  </svg>
);

export const InstagramIcon = ({ className }: P) => (
  <S className={className}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
  </S>
);

export const TelegramIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21.9 4.3 18.6 20a1.2 1.2 0 0 1-1.9.7l-4.6-3.4-2.3 2.2a.9.9 0 0 1-1.5-.4l-1.7-5.6-4.4-1.4a.9.9 0 0 1 0-1.7l18-6.9a.9.9 0 0 1 1.2 1Zm-3.7 2.4L8.5 12.6l.9 3 .4-2.4 7.9-6.3a.3.3 0 0 0-.3-.5l-.2.3Z" />
  </svg>
);

/* ── controls ─────────────────────────────────────────────────────────────── */

export const SearchIcon = ({ className }: P) => (
  <S className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </S>
);

export const CopyIcon = ({ className }: P) => (
  <S className={className}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H6.5A3.5 3.5 0 0 0 3 6.5v6A2.5 2.5 0 0 0 5.5 15" />
  </S>
);

export const PlusIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M12 5v14M5 12h14" />
  </S>
);

export const MinusIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M5 12h14" />
  </S>
);

export const TargetIcon = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="7.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" />
  </S>
);

export const PlayIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M8 5.6c0-.8.9-1.3 1.6-.9l9 6.4c.6.4.6 1.4 0 1.8l-9 6.4c-.7.4-1.6 0-1.6-.9V5.6Z" />
  </svg>
);

export const PauseIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <rect x="6.5" y="5" width="3.8" height="14" rx="1.3" />
    <rect x="13.7" y="5" width="3.8" height="14" rx="1.3" />
  </svg>
);

export const ChevronLeft = ({ className }: P) => (
  <S className={className}>
    <path d="m14.5 6-6 6 6 6" />
  </S>
);

export const ChevronRight = ({ className }: P) => (
  <S className={className}>
    <path d="m9.5 6 6 6-6 6" />
  </S>
);

export const ExpandIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M9 3.5H3.5V9M15 3.5h5.5V9M9 20.5H3.5V15M15 20.5h5.5V15" />
  </S>
);

export const ChatIcon = ({ className }: P) => (
  <S className={className}>
    <path d="M20.5 11.8a7.9 7.9 0 0 1-8.5 7.9 9 9 0 0 1-2.6-.4L4 21l1.4-4.2a7.6 7.6 0 0 1-1.9-5 7.9 7.9 0 0 1 8.5-7.7 8 8 0 0 1 8.5 7.7Z" />
  </S>
);
