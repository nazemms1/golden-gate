import { motion } from 'motion/react';
import { useLang } from '@/lib/lang';
import { scrollToId } from '@/lib/scroll';
import { SectionHeading } from './ui/SectionHeading';
import { ArrowIcon, BuildingIcon, CardIcon, FuelIcon } from './ui/Icons';

const MEDIA = [
  { img: './img/fleet-1.jpg', Icon: BuildingIcon, target: 'contact' },
  { img: './img/hero-station.jpg', Icon: FuelIcon, target: 'stations' },
  { img: './img/card.jpg', Icon: CardIcon, target: 'card' },
];

export function Services() {
  const { t, isRTL } = useLang();

  return (
    <section id="services" className="relative overflow-hidden bg-sand-50 py-24 lg:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          kicker={t.services.kicker}
          title={t.services.title}
          lead={t.services.lead}
          tone="light"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const media = MEDIA[i];
            return (
              <motion.button
                key={item.title}
                onClick={() => scrollToId(media.target)}
                className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-ink-900/8 bg-white text-start transition-all duration-600 hover:-translate-y-1.5 hover:border-gold-400/40 hover:shadow-[0_40px_80px_-46px_rgba(3,15,30,0.6)]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.85, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* media */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={media.img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full scale-105 object-cover transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"
                    style={{ filter: 'saturate(0.75)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/20 to-transparent" />

                  {/* index + icon */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/12 text-sand-50 backdrop-blur-md transition-colors duration-500 group-hover:border-gold-300/50 group-hover:bg-gold-gradient group-hover:text-ink-950">
                      <media.Icon className="h-5 w-5" />
                    </span>
                    <span
                      className="font-display text-[2.6rem] leading-none font-semibold text-white/18 tabular-nums transition-colors duration-500 group-hover:text-gold-200/45"
                      dir="ltr"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <span className="absolute top-5 inline-flex rounded-full border border-white/20 bg-ink-950/45 px-3 py-1 text-[0.66rem] tracking-[0.16em] text-sand-50/90 uppercase backdrop-blur-md ltr:left-5 rtl:right-5 rtl:tracking-normal">
                    {item.tag}
                  </span>
                </div>

                {/* copy */}
                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <h3 className="text-[1.06rem] leading-[1.5] font-semibold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-3.5 flex-1 text-[0.87rem] leading-[1.85] text-ink-900/62">
                    {item.text}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-[0.8rem] font-medium text-gold-700">
                    <span className="relative">
                      {t.actions.explore}
                      <span className="absolute -bottom-0.5 inset-x-0 h-px origin-[inline-start] scale-x-0 bg-gold-600 transition-transform duration-500 group-hover:scale-x-100" />
                    </span>
                    <ArrowIcon
                      className={`h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 ${
                        isRTL ? '' : ''
                      }`}
                    />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
