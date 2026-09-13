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

function MarqueeBand() {
  const { t } = useLang();
  return (
    <div className="border-y border-gold-300/10 bg-ink-950 py-5">
      <Marquee items={t.marquee} />
    </div>
  );
}

function Site() {
  const [ready, setReady] = useState(false);
  useSmoothScroll(ready);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Header />

      <main>
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
