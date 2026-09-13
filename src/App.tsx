import { useState } from 'react';
import { LangProvider, useLang } from './lib/lang';
import { useSmoothScroll } from './lib/scroll';

import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Values } from './components/Values';
import { Services } from './components/Services';
import { FuelCard } from './components/FuelCard';
import { QHSE } from './components/QHSE';
import { Stations } from './components/Stations';
import { Fleet } from './components/Fleet';
import { WhyUs } from './components/WhyUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Marquee } from './components/ui/Marquee';
import { Cursor } from './components/ui/Cursor';
import { QuickDock } from './components/ui/QuickDock';

function MarqueeBand() {
  const { t } = useLang();
  return (
    <div className="border-y border-gold-300/10 bg-ink-950 py-5">
      <Marquee items={t.marquee} />
    </div>
  );
}

/** Keyboard users land here first; it is the only reason it is focusable. */
function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[120] focus:rounded-full focus:bg-gold-gradient focus:px-5 focus:py-2.5 focus:text-[0.85rem] focus:font-medium focus:text-ink-950 ltr:focus:left-4 rtl:focus:right-4"
    >
      {t.ui.skipToContent}
    </a>
  );
}

function Site() {
  const [ready, setReady] = useState(false);
  useSmoothScroll(ready);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <SkipLink />
      <Cursor />
      <Header />

      <main id="main">
        <Hero />
        <MarqueeBand />
        <About />
        <Values />
        <Services />
        <FuelCard />
        <QHSE />
        <Stations />
        <Fleet />
        <WhyUs />
        <Contact />
      </main>

      <Footer />

      <QuickDock />
    </>
  );
}

export function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}
