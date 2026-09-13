import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { CONTENT, type Lang } from '@/data/content';

const STORAGE_KEY = 'gg-lang';

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'ar';
  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  if (fromQuery === 'ar' || fromQuery === 'en') return fromQuery;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'ar' || stored === 'en') return stored;
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'ar';
}

type Ctx = {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  t: (typeof CONTENT)['ar'];
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const root = document.documentElement;
    const dir = CONTENT[lang].dir;
    root.lang = lang;
    root.dir = dir;
    document.title =
      lang === 'ar'
        ? 'البوابة الذهبية للنقل والخدمات النفطية | Golden Gate'
        : 'Golden Gate | Transport & Petroleum Services';

    const url = new URL(window.location.href);
    if (url.searchParams.get('lang') !== lang) {
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url);
    }
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'ar' ? 'en' : 'ar')), []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir: CONTENT[lang].dir,
      isRTL: lang === 'ar',
      t: CONTENT[lang],
      setLang,
      toggle,
    }),
    [lang, setLang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
