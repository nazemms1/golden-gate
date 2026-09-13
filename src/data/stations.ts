import type { Lang } from './content';
import { STATION_POINTS } from './syria-map';

export type Network = 'gg' | 'taiba';

export type Station = {
  id: string;
  network: Network;
  image: string;
  coords: string;
  code?: string;
  phone?: string;
  x: number;
  y: number;
  fuels: Record<Lang, string[]>;
  ar: { name: string; city: string; info: string };
  en: { name: string; city: string; info: string };
};

const at = (id: string) => STATION_POINTS[id] ?? { x: 0, y: 0 };

const raw: Omit<Station, 'x' | 'y'>[] = [
  /* ── Golden Gate owned network ───────────────────────────────────────────── */
  {
    id: 'aleppo',
    network: 'gg',
    image: './img/stations/sheikh-najjar.webp',
    coords: '36.272924,37.2400115',
    code: 'GoldenGate ALP 001',
    fuels: { ar: ['بنزين 90', 'ديزل'], en: ['Gasoline 90', 'Diesel'] },
    ar: { name: 'الشيخ نجار – حلب', city: 'حلب', info: 'محطة في المنطقة الصناعية بالشيخ نجار.' },
    en: {
      name: 'Sheikh Najjar – Aleppo',
      city: 'Aleppo',
      info: 'Station in the Sheikh Najjar industrial zone.',
    },
  },
  {
    id: 'aleppo2',
    network: 'gg',
    image: './img/stations/generic.webp',
    coords: '36.1896514,37.1042937',
    code: 'GoldenGate ALP 002',
    fuels: { ar: ['بنزين 95'], en: ['Gasoline 95'] },
    ar: {
      name: 'دوار القلعة – حلب',
      city: 'حلب',
      info: 'محطة ثانية تخدم مدينة حلب والمناطق المحيطة.',
    },
    en: {
      name: 'Al-Qalaa Roundabout – Aleppo',
      city: 'Aleppo',
      info: 'A second station serving Aleppo and the surrounding area.',
    },
  },
  {
    id: 'tartus1',
    network: 'gg',
    image: './img/stations/tartus1.webp',
    coords: '34.8080105,35.9460993',
    code: 'GoldenGate TRS 001',
    fuels: {
      ar: ['بنزين 90', 'بنزين 95', 'ديزل'],
      en: ['Gasoline 90', 'Gasoline 95', 'Diesel'],
    },
    ar: { name: 'طرطوس 1 – طرطوس', city: 'طرطوس', info: 'محطة ساحلية على الطريق الرئيسي.' },
    en: { name: 'Tartus 1 – Tartus', city: 'Tartus', info: 'Coastal station on the main road.' },
  },
  {
    id: 'tartus2',
    network: 'gg',
    image: './img/stations/tartus2.webp',
    coords: '34.8116477,35.9454689',
    code: 'GoldenGate TRS 002',
    fuels: {
      ar: ['بنزين 90', 'بنزين 95', 'ديزل'],
      en: ['Gasoline 90', 'Gasoline 95', 'Diesel'],
    },
    ar: { name: 'طرطوس 2 – طرطوس', city: 'طرطوس', info: 'محطة ساحلية ثانية لخدمة المنطقة.' },
    en: {
      name: 'Tartus 2 – Tartus',
      city: 'Tartus',
      info: 'A second coastal station serving the region.',
    },
  },
  {
    id: 'homs',
    network: 'gg',
    image: './img/stations/generic.webp',
    coords: '34.3494666,36.7713178',
    code: 'GoldenGate HMS 001',
    fuels: {
      ar: ['بنزين 90', 'بنزين 95', 'ديزل'],
      en: ['Gasoline 90', 'Gasoline 95', 'Diesel'],
    },
    ar: { name: 'حسياء – حمص', city: 'حمص', info: 'محطة حسياء في محافظة حمص.' },
    en: { name: 'Hassia – Homs', city: 'Homs', info: 'Hassia station in Homs Governorate.' },
  },
  {
    id: 'damascus',
    network: 'gg',
    image: './img/stations/marota.webp',
    coords: '33.4932607,36.2623043',
    code: 'GoldenGate DAM 001',
    fuels: {
      ar: ['بنزين 90', 'بنزين 95', 'ديزل'],
      en: ['Gasoline 90', 'Gasoline 95', 'Diesel'],
    },
    ar: { name: 'ماروتا سيتي – دمشق', city: 'دمشق', info: 'محطة حديثة في مشروع ماروتا سيتي.' },
    en: {
      name: 'Marota City – Damascus',
      city: 'Damascus',
      info: 'A modern station in the Marota City project.',
    },
  },
  {
    id: 'uptown',
    network: 'gg',
    image: './img/stations/generic.webp',
    coords: '33.5263875,36.2274531',
    code: 'GoldenGate DAM 002',
    fuels: {
      ar: ['بنزين 90', 'بنزين 95', 'ديزل'],
      en: ['Gasoline 90', 'Gasoline 95', 'Diesel'],
    },
    ar: { name: 'Uptown Station – دمشق', city: 'دمشق', info: 'Uptown Station في دمشق.' },
    en: { name: 'Uptown Station – Damascus', city: 'Damascus', info: 'Uptown Station in Damascus.' },
  },
  {
    id: 'mobile',
    network: 'gg',
    image: './img/stations/mobile.webp',
    coords: '33.495359,36.251609',
    code: 'GoldenGate Mobile',
    fuels: { ar: ['بنزين 90', 'بنزين 95'], en: ['Gasoline 90', 'Gasoline 95'] },
    ar: { name: 'وحدة وقود متنقلة – دمشق', city: 'دمشق', info: 'وحدة تعبئة متنقلة تخدم مواقع متعددة.' },
    en: {
      name: 'Mobile Fuel Unit – Damascus',
      city: 'Damascus',
      info: 'A mobile refuelling unit serving multiple sites.',
    },
  },

  /* ── Taiba partner network (accepts the Golden Gate card) ────────────────── */
  {
    id: 'taiba-sham-new',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '33.585707,36.388291',
    phone: '0989002413',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'الشام الجديدة – دمشق', city: 'دمشق', info: 'أوتستراد حرستا بعد جسر الضاحية.' },
    en: {
      name: 'New Damascus – Damascus',
      city: 'Damascus',
      info: 'Harasta Highway, after Al-Dahiya Bridge.',
    },
  },
  {
    id: 'taiba-kisweh-military',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '33.366891,36.249483',
    phone: '0989022558',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'الكسوة العسكرية – ريف دمشق', city: 'ريف دمشق', info: 'مدخل مدينة الكسوة، ريف دمشق.' },
    en: {
      name: 'Al-Kiswah Military – Rural Damascus',
      city: 'Rural Damascus',
      info: 'At the entrance to Al-Kiswah, Rural Damascus.',
    },
  },
  {
    id: 'taiba-shahrour',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '35.562432,35.784771',
    phone: '0994290161',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'الشحرور – اللاذقية', city: 'اللاذقية', info: 'طريق M1، مدخل اللاذقية الجنوبي.' },
    en: {
      name: 'Al-Shahrour – Latakia',
      city: 'Latakia',
      info: 'M1 road, southern entrance to Latakia.',
    },
  },
  {
    id: 'taiba-rahman',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '35.510562,35.857915',
    phone: '0989002372',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'الرحمن – اللاذقية', city: 'اللاذقية', info: 'طريق 1، مدخل اللاذقية الشمالي.' },
    en: {
      name: 'Al-Rahman – Latakia',
      city: 'Latakia',
      info: 'Road 1, northern entrance to Latakia.',
    },
  },
  {
    id: 'taiba-iman',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '32.771856,36.203320',
    phone: '0987720698',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: {
      name: 'الإيمان – درعا',
      city: 'درعا',
      info: 'أوتستراد درعا الدولي، نامر، ناحية خربة غزالة.',
    },
    en: {
      name: 'Al-Iman – Daraa',
      city: 'Daraa',
      info: 'Daraa International Highway, Namer, Khirbet Ghazaleh area.',
    },
  },
  {
    id: 'taiba-khatib',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '34.575944,38.308466',
    phone: '0989002437',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'الخطيب – حمص', city: 'حمص', info: 'أوتستراد تدمر – دير الزور.' },
    en: { name: 'Al-Khatib – Homs', city: 'Homs', info: 'Palmyra–Deir ez-Zor Highway.' },
  },
  {
    id: 'taiba-raseef',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '34.703640,36.630726',
    phone: '0989002389',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'الرصيف – حمص', city: 'حمص', info: 'غرب الساتكوب.' },
    en: { name: 'Al-Raseef – Homs', city: 'Homs', info: 'West of Satcop.' },
  },
  {
    id: 'taiba-zain-al-abidin',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '35.146447,36.785670',
    phone: '098002383',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'زين العابدين – حماة', city: 'حماة', info: 'طريق دمشق – حلب الدولي.' },
    en: {
      name: 'Zain Al-Abidin – Hama',
      city: 'Hama',
      info: 'Damascus–Aleppo International Highway.',
    },
  },
  {
    id: 'taiba-dallah',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '35.332054,40.123109',
    phone: '0989022482',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'الدلة – دير الزور', city: 'دير الزور', info: 'يمين دوار الدلة في المدينة.' },
    en: {
      name: 'Al-Dallah – Deir ez-Zor',
      city: 'Deir ez-Zor',
      info: 'Right of Al-Dallah Roundabout in the city.',
    },
  },
  {
    id: 'taiba-47',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '36.081776,40.657692',
    phone: '0956743045',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'الـ47 – دير الزور', city: 'دير الزور', info: 'أوتستراد الحسكة، بعد دوار الـ47 يميناً.' },
    en: {
      name: '47 – Deir ez-Zor',
      city: 'Deir ez-Zor',
      info: 'Al-Hasakah Highway, right after 47 Roundabout.',
    },
  },
  {
    id: 'taiba-ariha',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '35.808446,36.594742',
    phone: '0989002361',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'أريحا – إدلب', city: 'إدلب', info: 'أريحا، طريق اللاذقية.' },
    en: { name: 'Ariha – Idlib', city: 'Idlib', info: 'Ariha, Latakia road.' },
  },
  {
    id: 'taiba-madina',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '35.929116,36.656323',
    phone: '+963989002356',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'المدينة – إدلب', city: 'إدلب', info: 'أوتستراد إدلب – سرمين، جنوب الطريق.' },
    en: {
      name: 'Al-Madina – Idlib',
      city: 'Idlib',
      info: 'Idlib–Sarmine Highway, south side of the road.',
    },
  },
  {
    id: 'taiba-maqass',
    network: 'taiba',
    image: './brand/taiba.png',
    coords: '35.903410,38.978922',
    phone: '0989022504',
    fuels: { ar: ['مازوت أول', 'بنزين أوكتان 90'], en: ['Diesel', 'Gasoline 90'] },
    ar: { name: 'المقص – الرقة', city: 'الرقة', info: 'طريق رقم 4، مقابل ثانوية رطلة الزراعية.' },
    en: {
      name: 'Al-Maqass – Raqqa',
      city: 'Raqqa',
      info: 'Road 4, opposite Ratla Agricultural Secondary School.',
    },
  },
];

export const STATIONS: Station[] = raw.map((s) => ({ ...s, ...at(s.id) }));

export const GG_STATIONS = STATIONS.filter((s) => s.network === 'gg');
export const TAIBA_STATIONS = STATIONS.filter((s) => s.network === 'taiba');
