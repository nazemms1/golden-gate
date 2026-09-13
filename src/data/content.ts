export type Lang = 'ar' | 'en';

export const LINKS = {
  portal: 'http://portal.goldengate.sy/login',
  // The APK itself is not part of this repo. Points at the file already hosted
  // on the live domain; swap to './assets/app-release.apk' once the build is
  // deployed to goldengate.sy with the APK sitting beside it.
  apk: 'https://goldengate.sy/assets/app-release.apk',
  phone: '+963118070',
  phoneLabel: '+963 11 8070',
  email: 'info@goldengate.sy',
  fuelEmail: 'fuel@goldengate.sy',
  facebook: 'https://www.facebook.com/Golden1Gate',
  instagram: 'https://www.instagram.com/golden1gate',
  telegram: 'https://t.me/goldeenget',
  maps: 'https://www.google.com/maps/dir/?api=1&destination=',
} as const;

export const NAV_IDS = [
  'about',
  'services',
  'card',
  'qhse',
  'stations',
  'fleet',
  'contact',
] as const;

export type NavId = (typeof NAV_IDS)[number];

type Dict = {
  dir: 'rtl' | 'ltr';
  langSwitch: string;
  brand: { name: string; tagline: string; legal: string };
  nav: Record<NavId, string> & { menu: string; close: string };
  actions: { portal: string; app: string; explore: string; stations: string; back: string };
  hero: {
    badge: string;
    line1: string;
    line2: string;
    line3: string;
    lead: string;
    slides: string[];
    stats: { value: string; label: string; sub: string }[];
  };
  marquee: string[];
  about: {
    kicker: string;
    title: string;
    body: string[];
    vision: { title: string; text: string };
    mission: { title: string; text: string };
    pillLabel: string;
  };
  values: { kicker: string; title: string; lead: string; items: { title: string; text: string }[] };
  services: {
    kicker: string;
    title: string;
    lead: string;
    items: { title: string; text: string; tag: string }[];
  };
  card: {
    kicker: string;
    title: string;
    lead: string;
    features: string[];
    cta: string;
    ctaAlt: string;
    network: string;
    networkText: string;
  };
  qhse: {
    kicker: string;
    title: string;
    lead: string;
    policyTitle: string;
    policyText: string;
    iso: { code: string; label: string }[];
    commitTitle: string;
    commitments: string[];
    pillarsTitle: string;
    pillars: { title: string; text: string }[];
  };
  stations: {
    kicker: string;
    title: string;
    lead: string;
    hint: string;
    ownNetwork: string;
    partnerNetwork: string;
    partnerNote: string;
    all: string;
    fuels: string;
    code: string;
    directions: string;
    phone: string;
    count: (n: number) => string;
  };
  fleet: {
    kicker: string;
    title: string;
    lead: string;
    items: string[];
    note: string;
  };
  why: { kicker: string; title: string; items: string[] };
  contact: {
    kicker: string;
    title: string;
    lead: string;
    phone: string;
    email: string;
    address: string;
    addressValue: string;
    supply: string;
    follow: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      required: string;
      invalidEmail: string;
    };
  };
  footer: { rights: string; links: string; contact: string; built: string };
};

export const CONTENT: Record<Lang, Dict> = {
  /* ───────────────────────────────── ARABIC ───────────────────────────────── */
  ar: {
    dir: 'rtl',
    langSwitch: 'EN',
    brand: {
      name: 'البوابة الذهبية',
      tagline: 'للنقل والخدمات النفطية',
      legal: 'شركة البوابة الذهبية للنقل والخدمات النفطية',
    },
    nav: {
      about: 'من نحن',
      services: 'خدماتنا',
      card: 'البطاقة',
      qhse: 'الجودة والسلامة',
      stations: 'المحطات',
      fleet: 'الأسطول',
      contact: 'تواصل معنا',
      menu: 'القائمة',
      close: 'إغلاق',
    },
    actions: {
      portal: 'بوابة الزبائن',
      app: 'تحميل التطبيق',
      explore: 'اكتشف خدماتنا',
      stations: 'شبكة المحطات',
      back: 'عودة',
    },
    hero: {
      badge: 'شريك موثوق للقطاعين العام والخاص',
      line1: 'البوابة الذهبية',
      line2: 'للنقل والخدمات',
      line3: 'النفطية',
      lead: 'حلول متكاملة في النقل والخدمات النفطية واللوجستية، بأعلى معايير الجودة والسلامة، في كل محافظة سورية.',
      slides: [
        'محطات الوقود',
        'أسطول الصهاريج',
        'التزويد في محطاتنا',
        'النقل والتوزيع',
        'آليات متخصصة',
      ],
      stats: [
        { value: '8', label: 'محطات ووحدات وقود', sub: 'في مواقع استراتيجية' },
        { value: '13', label: 'محطة شريكة', sub: 'تقبل بطاقة البوابة الذهبية' },
        { value: '3', label: 'شهادات آيزو', sub: 'جودة · بيئة · سلامة' },
        { value: '6', label: 'فئات أسطول', sub: 'صهاريج وآليات متخصصة' },
      ],
    },
    marquee: [
      'نقل المشتقات النفطية',
      'محطات وقود',
      'بطاقة وقود مسبقة الدفع',
      'خدمات لوجستية',
      'إدارة أساطيل',
      'تزويد المنشآت الحيوية',
      'سلامة مهنية',
    ],
    about: {
      kicker: 'الملف التعريفي للشركة',
      title: 'من نحن',
      body: [
        'شركة البوابة الذهبية للنقل والخدمات النفطية هي شركة سورية متخصصة في تقديم حلول النقل والخدمات النفطية واللوجستية المتكاملة، وتسعى إلى أن تكون الشريك الموثوق للقطاعين العام والخاص في تأمين احتياجاتهما من المشتقات النفطية والخدمات المرتبطة بها.',
        'منذ انطلاق أعمالها، وضعت الشركة الجودة والسلامة والالتزام في مقدمة أولوياتها، واستثمرت في بناء أسطول حديث ومتكامل من الصهاريج والآليات المتخصصة، إضافة إلى شبكة من محطات الوقود التي تخدم مختلف القطاعات الاقتصادية.',
        'تعمل الشركة وفق أفضل الممارسات العالمية وأنظمة الإدارة الحديثة، بما يضمن تقديم خدمات آمنة وسريعة وفعالة تلبي تطلعات العملاء وتدعم التنمية الاقتصادية في الجمهورية العربية السورية.',
      ],
      vision: {
        title: 'رؤيتنا',
        text: 'أن نكون الشركة الرائدة في النقل والخدمات النفطية واللوجستية في سورية، وأن نساهم في دعم الاقتصاد الوطني من خلال تقديم خدمات عالية الجودة وفق أفضل المعايير العالمية.',
      },
      mission: {
        title: 'رسالتنا',
        text: 'نسعى إلى تقديم حلول متكاملة في النقل والخدمات النفطية تعتمد على الجودة والابتكار والكفاءة التشغيلية، مع الالتزام بأعلى معايير السلامة وحماية البيئة، بما يحقق رضا عملائنا ويعزز التنمية المستدامة.',
      },
      pillLabel: 'دمشق · ماروتا سيتي',
    },
    values: {
      kicker: 'المبادئ التي نعمل بها',
      title: 'قيمنا',
      lead: 'سبعة مبادئ توجّه كل قرار وكل رحلة وكل لتر نسلّمه.',
      items: [
        {
          title: 'السلامة أولاً',
          text: 'نضع سلامة الأفراد والممتلكات والبيئة في مقدمة أولوياتنا، ونلتزم بتطبيق أعلى معايير الصحة والسلامة في جميع عملياتنا.',
        },
        {
          title: 'الجودة والإتقان',
          text: 'نحرص على تقديم خدمات عالية الجودة وفق أفضل الممارسات، مع الالتزام بالدقة والكفاءة والتحسين المستمر.',
        },
        {
          title: 'النزاهة والشفافية',
          text: 'نعتمد الصدق والوضوح في جميع تعاملاتنا، ونلتزم بأعلى المعايير الأخلاقية والمهنية في أداء أعمالنا.',
        },
        {
          title: 'العمل بروح الفريق',
          text: 'نؤمن بأن النجاح يتحقق من خلال التعاون وتكامل الجهود، ونعزز ثقافة العمل الجماعي لتحقيق أهداف الشركة.',
        },
        {
          title: 'الشراكة طويلة الأمد',
          text: 'نبني علاقات استراتيجية ومستدامة مع عملائنا وشركائنا، قائمة على الثقة والالتزام وتحقيق النجاح المتبادل.',
        },
        {
          title: 'الابتكار والتحسين المستمر',
          text: 'نسعى إلى تطوير خدماتنا وعملياتنا باستمرار، وتبني الحلول المبتكرة التي تعزز الكفاءة وترتقي بجودة الأداء.',
        },
        {
          title: 'المسؤولية المجتمعية',
          text: 'نلتزم بدعم المجتمع والمساهمة في التنمية المستدامة، مع المحافظة على البيئة وتعزيز أثرنا الإيجابي في جميع أعمالنا.',
        },
      ],
    },
    services: {
      kicker: 'مجموعة متكاملة من الخدمات',
      title: 'خدماتنا',
      lead: 'من تزويد المنشآت الكبرى إلى تعبئة سيارة واحدة — منظومة واحدة تحت سقف واحد.',
      items: [
        {
          tag: 'قطاع الأعمال',
          title: 'تزويد المنشآت الحيوية والفعاليات الاقتصادية بالمشتقات النفطية',
          text: 'تأمين احتياجات المنشآت الحيوية والفعاليات الاقتصادية من المشتقات النفطية بكفاءة وموثوقية، مع جدولة تسليم دقيقة وأسطول مخصص.',
        },
        {
          tag: 'الأفراد',
          title: 'تزويد الأفراد بالمشتقات النفطية عبر محطاتنا',
          text: 'تلبية احتياجات الأفراد من المشتقات النفطية عبر شبكة محطاتنا المنتشرة في المحافظات السورية، بخدمة سريعة ومعايير سلامة صارمة.',
        },
        {
          tag: 'الدفع الذكي',
          title: 'بطاقة البوابة الذهبية',
          text: 'بطاقة وقود مسبقة الدفع توفر تعبئة سريعة، ومتابعة شفافة للاستهلاك، وتحكماً أفضل بالمصروفات للأفراد والشركات.',
        },
      ],
    },
    card: {
      kicker: 'الدفع الذكي للوقود',
      title: 'بطاقة البوابة الذهبية',
      lead: 'بطاقة وقود مسبقة الدفع تمنحك تحكماً كاملاً وسهولة في كل تعبئة.',
      features: [
        'إيداع رصيد مسبق وإعادة شحنه في أي وقت.',
        'سرعة وسهولة في تعبئة الوقود دون الحاجة إلى الدفع النقدي.',
        'متابعة الرصيد والاستهلاك بكل شفافية.',
        'مناسبة للأفراد والشركات وإدارة أساطيل المركبات.',
        'تعزيز التحكم في المصروفات وتبسيط عمليات الدفع.',
      ],
      cta: 'بوابة الزبائن',
      ctaAlt: 'تحميل التطبيق',
      network: 'شبكة قبول موسّعة',
      networkText:
        'إلى جانب محطات البوابة الذهبية، تُقبل البطاقة في شبكة محطات شريكة موزّعة على المحافظات السورية.',
    },
    qhse: {
      kicker: 'التزام بالمعايير العالمية',
      title: 'الجودة والبيئة والصحة والسلامة المهنية',
      lead: 'تسعى شركة البوابة الذهبية للحفاظ على مكانتها في المرتبة الأولى على المستوى المحلي من خلال التزامها بتطبيق المواصفات العالية للجودة والبيئة والصحة والسلامة المهنية، بهدف تقديم أعلى مستوى من الخدمة وبأسرع وقت وأفضل سعر، بما يضمن الرضا التام لعملائها.',
      policyTitle: 'سياسة الجودة والبيئة والصحة والسلامة المهنية',
      policyText:
        'تلتزم شركة البوابة الذهبية بتقديم خدمات عالية الجودة وفق أفضل الممارسات العالمية، وتعزيز ثقافة التميز والاستدامة عبر نظام إدارة متكامل يتوافق مع المواصفات الدولية والالتزام بجميع المتطلبات القانونية والتنظيمية ذات العلاقة، بما يضمن التحسين المستمر ورفع كفاءة الأداء وتحقيق رضا جميع الأطراف.',
      iso: [
        { code: 'ISO 9001:2015', label: 'إدارة الجودة' },
        { code: 'ISO 14001:2015', label: 'الإدارة البيئية' },
        { code: 'ISO 45001:2018', label: 'الصحة والسلامة المهنية' },
      ],
      commitTitle: 'وانطلاقاً من هذا الالتزام، تعمل الشركة على:',
      commitments: [
        'تقديم خدمات ذات جودة عالية تلبي احتياجات العملاء وتتجاوز توقعاتهم، مع التركيز على أعلى مستويات رضا العملاء.',
        'توفير بيئة عمل آمنة وصحية لجميع العاملين والمتعاملين والزوار عبر تحديد المخاطر وتقييمها والسيطرة عليها.',
        'حماية البيئة والحد من الآثار البيئية، ومنع التلوث، وترشيد استهلاك الموارد الطبيعية والطاقة.',
        'الالتزام بالامتثال لجميع التشريعات والأنظمة والمتطلبات القانونية والتنظيمية ذات الصلة.',
        'تطوير كفاءة العاملين وتعزيز وعيهم عبر برامج تدريب وتأهيل مستمرة.',
        'إشراك جميع العاملين في تطبيق نظام الإدارة المتكامل وتشجيعهم على المشاركة الفاعلة.',
        'تحديد أهداف ومؤشرات أداء قابلة للقياس ومراجعتها دورياً لضمان التحسين المستمر.',
        'تعزيز ثقافة التحسين المستمر والابتكار عبر مراجعة العمليات وتبني أفضل الممارسات العالمية.',
      ],
      pillarsTitle: 'السلامة أولاً',
      pillars: [
        {
          title: 'تحديد المخاطر والسيطرة عليها',
          text: 'تقييم منهجي للمخاطر في كل موقع عمل واتخاذ إجراءات وقائية استباقية.',
        },
        {
          title: 'الوقاية من الإصابات',
          text: 'بيئة عمل آمنة وصحية للعاملين والمتعاملين والزوار، والوقاية من الأمراض المهنية.',
        },
        {
          title: 'ثقافة السلامة',
          text: 'برامج تدريب وتأهيل مستمرة لترسيخ وعي السلامة لدى جميع العاملين.',
        },
        {
          title: 'الاستجابة للطوارئ',
          text: 'خطط وإجراءات جاهزة للتعامل السريع والفعّال مع الحوادث والطوارئ.',
        },
      ],
    },
    stations: {
      kicker: 'شبكة استراتيجية في سورية',
      title: 'محطات الوقود',
      lead: 'تدير الشركة حالياً ثماني محطات ووحدات وقود موزعة في مواقع استراتيجية، إضافة إلى شبكة شريكة تقبل بطاقة البوابة الذهبية.',
      hint: 'اختر نقطة على الخريطة لعرض تفاصيل المحطة',
      ownNetwork: 'محطات البوابة الذهبية',
      partnerNetwork: 'شبكة طيبة الشريكة',
      partnerNote: 'محطات شريكة تقبل بطاقة البوابة الذهبية',
      all: 'الشبكة كاملة',
      fuels: 'المشتقات المتوفرة',
      code: 'رمز المحطة',
      directions: 'الاتجاهات على الخريطة',
      phone: 'الهاتف',
      count: (n: number) => `${n} موقع`,
    },
    fleet: {
      kicker: 'أسطول حديث ومتكامل',
      title: 'أسطول الشركة',
      lead: 'آليات متخصصة لنقل المشتقات النفطية بجميع أنواعها، بإدارة تشغيلية دقيقة.',
      items: [
        'شاحنات مزودة بصهاريج',
        'رؤوس قاطرة',
        'مقاطر لنقل المشتقات البيضاء',
        'مقاطر لنقل الفيول',
        'سيارات توزيع المازوت',
        'سيارات توزيع المشتقات البيضاء',
      ],
      note: 'يخضع الأسطول لبرامج صيانة دورية لضمان أعلى مستويات الكفاءة والسلامة.',
    },
    why: {
      kicker: 'أسباب تجعلنا خيارك الأول',
      title: 'لماذا البوابة الذهبية؟',
      items: [
        'خبرة متخصصة في قطاع الخدمات النفطية.',
        'أسطول نقل حديث.',
        'التزام صارم بمعايير الجودة والسلامة.',
        'شريك موثوق للقطاعين العام والخاص.',
        'حلول متكاملة تحت سقف واحد.',
        'شبكة محطات وقود استراتيجية.',
        'سرعة الاستجابة والالتزام بالمواعيد.',
        'خدمة عملاء احترافية.',
      ],
    },
    contact: {
      kicker: 'لنبدأ شراكة ناجحة',
      title: 'تواصل معنا',
      lead: 'هل لديك استفسار أو مشروع؟ نسعد بالتواصل معك.',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      address: 'العنوان',
      addressValue: 'دمشق — ماروتا سيتي',
      supply: 'لتقديم طلب تزوّد بالمادة للمنشآت والفعاليات',
      follow: 'تابعنا',
      form: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'رسالتك',
        send: 'إرسال الرسالة',
        sending: 'جارٍ الإرسال…',
        success: 'شكراً لك! تم استلام رسالتك وسنعاود التواصل معك قريباً.',
        required: 'هذا الحقل مطلوب',
        invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
      },
    },
    footer: {
      rights: 'جميع الحقوق محفوظة',
      links: 'روابط',
      contact: 'تواصل',
      built: 'دمشق · الجمهورية العربية السورية',
    },
  },

  /* ───────────────────────────────── ENGLISH ──────────────────────────────── */
  en: {
    dir: 'ltr',
    langSwitch: 'ع',
    brand: {
      name: 'Golden Gate',
      tagline: 'For Transport & Oil Services',
      legal: 'Golden Gate for Transport & Oil Services',
    },
    nav: {
      about: 'About',
      services: 'Services',
      card: 'Fuel Card',
      qhse: 'Quality',
      stations: 'Stations',
      fleet: 'Fleet',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
    },
    actions: {
      portal: 'Customer Portal',
      app: 'Download App',
      explore: 'Explore Services',
      stations: 'Station Network',
      back: 'Back',
    },
    hero: {
      badge: 'A trusted partner for the public and private sectors',
      line1: 'Golden Gate',
      line2: 'Transport &',
      line3: 'Petroleum Services',
      lead: 'Integrated transport, petroleum and logistics solutions — delivered to the highest standards of quality and safety, across every Syrian governorate.',
      slides: [
        'Fuel stations',
        'Tanker fleet',
        'Refuelling at our stations',
        'Transport & distribution',
        'Specialised vehicles',
      ],
      stats: [
        { value: '8', label: 'Stations & fuel units', sub: 'In strategic locations' },
        { value: '13', label: 'Partner stations', sub: 'Accepting the Golden Gate card' },
        { value: '3', label: 'ISO certifications', sub: 'Quality · Environment · Safety' },
        { value: '6', label: 'Fleet classes', sub: 'Tankers & specialised vehicles' },
      ],
    },
    marquee: [
      'Petroleum transport',
      'Fuel stations',
      'Prepaid fuel card',
      'Logistics services',
      'Fleet management',
      'Supplying vital facilities',
      'Occupational safety',
    ],
    about: {
      kicker: 'Company profile',
      title: 'About Us',
      body: [
        'Golden Gate for Transport & Petroleum Services is a specialized Syrian company delivering integrated transport, petroleum and logistics solutions, striving to be the trusted partner of the public and private sectors for their petroleum products and related services.',
        'Since inception, the company has placed quality, safety and commitment at the forefront of its priorities, investing in a modern, integrated fleet of tankers and specialized vehicles, alongside a network of fuel stations serving diverse economic sectors.',
        'We operate according to global best practices and modern management systems, ensuring safe, fast and efficient services that meet customer aspirations and support economic development in the Syrian Arab Republic.',
      ],
      vision: {
        title: 'Our Vision',
        text: 'To be the leading company in transport, petroleum and logistics services in Syria, and to contribute to the national economy through high-quality services aligned with the finest global standards.',
      },
      mission: {
        title: 'Our Mission',
        text: 'To deliver integrated transport and petroleum solutions built on quality, innovation and operational efficiency — committed to the highest standards of safety and environmental protection — achieving customer satisfaction and sustainable development.',
      },
      pillLabel: 'Damascus · Marota City',
    },
    values: {
      kicker: 'The principles we operate by',
      title: 'Our Values',
      lead: 'Seven principles that guide every decision, every journey and every litre we deliver.',
      items: [
        {
          title: 'Safety First',
          text: 'We place the safety of people, property and the environment at the forefront, applying the highest health and safety standards across all operations.',
        },
        {
          title: 'Quality & Mastery',
          text: 'We deliver high-quality services following best practices, committed to precision, efficiency and continuous improvement.',
        },
        {
          title: 'Integrity & Transparency',
          text: 'We adopt honesty and clarity in all dealings, upholding the highest ethical and professional standards in our work.',
        },
        {
          title: 'Teamwork',
          text: 'We believe success is achieved through collaboration and integrated effort, nurturing a culture of teamwork to reach our goals.',
        },
        {
          title: 'Long-Term Partnership',
          text: 'We build strategic, sustainable relationships with our clients and partners based on trust, commitment and mutual success.',
        },
        {
          title: 'Innovation & Improvement',
          text: 'We continuously develop our services and operations, adopting innovative solutions that boost efficiency and elevate performance.',
        },
        {
          title: 'Social Responsibility',
          text: 'We are committed to supporting the community and sustainable development, protecting the environment and amplifying our positive impact.',
        },
      ],
    },
    services: {
      kicker: 'An integrated suite of services',
      title: 'Our Services',
      lead: 'From supplying major facilities to filling a single tank — one system, under one roof.',
      items: [
        {
          tag: 'Business',
          title: 'Supplying vital facilities and economic activities with petroleum products',
          text: 'Reliably and efficiently meeting the petroleum-product needs of vital facilities and economic activities, with precise delivery scheduling and a dedicated fleet.',
        },
        {
          tag: 'Individuals',
          title: 'Supplying individuals through our stations across Syria',
          text: "Meeting individual petroleum-product needs through our network of stations across Syria's governorates, with fast service and strict safety standards.",
        },
        {
          tag: 'Smart payments',
          title: 'The Golden Gate Card',
          text: 'A prepaid fuel card providing faster refuelling, transparent consumption tracking and better expense control for individuals and companies alike.',
        },
      ],
    },
    card: {
      kicker: 'Smart fuel payments',
      title: 'The Golden Gate Card',
      lead: 'A prepaid fuel card giving you full control and effortless refuelling every time.',
      features: [
        'Deposit a prepaid balance and top up anytime.',
        'Fast, easy refuelling with no need for cash.',
        'Track balance and consumption with full transparency.',
        'Ideal for individuals, companies and fleet management.',
        'Better expense control and simplified payments.',
      ],
      cta: 'Customer Portal',
      ctaAlt: 'Download App',
      network: 'An extended acceptance network',
      networkText:
        'Beyond Golden Gate stations, the card is accepted across a partner network of stations spread over Syria’s governorates.',
    },
    qhse: {
      kicker: 'Committed to global standards',
      title: 'Quality, Environment, Occupational Health & Safety',
      lead: 'Golden Gate strives to maintain its leading position locally through its commitment to high standards of quality, environment, occupational health and safety, delivering the highest level of service in the shortest time and at the best price to ensure complete customer satisfaction.',
      policyTitle: 'Quality, Environment, Occupational Health & Safety Policy',
      policyText:
        'Golden Gate is committed to delivering high-quality services in accordance with global best practices and fostering excellence and sustainability through an integrated management system aligned with international standards and all relevant legal and regulatory requirements, ensuring continuous improvement, stronger performance and the satisfaction of all stakeholders.',
      iso: [
        { code: 'ISO 9001:2015', label: 'Quality Management' },
        { code: 'ISO 14001:2015', label: 'Environmental Management' },
        { code: 'ISO 45001:2018', label: 'Occupational Health & Safety' },
      ],
      commitTitle: 'Driven by this commitment, the company works to:',
      commitments: [
        'Provide high-quality services that meet and exceed customer needs, focused on the highest satisfaction levels.',
        'Provide a safe, healthy work environment for all employees, clients and visitors by identifying, assessing and controlling risks.',
        'Protect the environment, reduce impacts, prevent pollution and conserve natural resources and energy.',
        'Comply with all relevant legislation, regulations and legal requirements.',
        'Develop employee competence and awareness through continuous training and qualification programs.',
        'Engage all employees in the integrated management system and encourage active participation.',
        'Set measurable objectives and performance indicators, reviewed periodically for continuous improvement.',
        'Foster a culture of continuous improvement and innovation by reviewing processes and adopting global best practices.',
      ],
      pillarsTitle: 'Safety First',
      pillars: [
        {
          title: 'Hazard identification & control',
          text: 'Systematic risk assessment at every work site, with proactive preventive measures.',
        },
        {
          title: 'Injury prevention',
          text: 'A safe, healthy environment for employees, clients and visitors, preventing occupational illness.',
        },
        {
          title: 'Safety culture',
          text: 'Continuous training and qualification programs that embed safety awareness across the workforce.',
        },
        {
          title: 'Emergency response',
          text: 'Ready plans and procedures for fast, effective handling of incidents and emergencies.',
        },
      ],
    },
    stations: {
      kicker: 'A strategic network across Syria',
      title: 'Fuel Stations',
      lead: 'The company currently operates eight fuel stations and units in strategic locations, alongside a partner network that accepts the Golden Gate card.',
      hint: 'Select a point on the map to view station details',
      ownNetwork: 'Golden Gate stations',
      partnerNetwork: 'Taiba partner network',
      partnerNote: 'Partner stations accepting the Golden Gate card',
      all: 'Full network',
      fuels: 'Available fuels',
      code: 'Station code',
      directions: 'Get directions',
      phone: 'Phone',
      count: (n: number) => `${n} location${n === 1 ? '' : 's'}`,
    },
    fleet: {
      kicker: 'A modern, integrated fleet',
      title: 'Our Fleet',
      lead: 'Specialised vehicles for transporting every class of petroleum product, under precise operational management.',
      items: [
        'Tanker trucks',
        'Tractor units',
        'Trailers for white products',
        'Trailers for fuel oil',
        'Diesel distribution vehicles',
        'White-products distribution vehicles',
      ],
      note: 'The fleet undergoes periodic maintenance programs to ensure the highest levels of efficiency and safety.',
    },
    why: {
      kicker: 'Reasons we are your first choice',
      title: 'Why Golden Gate?',
      items: [
        'Specialized expertise in the petroleum sector.',
        'A modern transport fleet.',
        'Strict commitment to quality and safety standards.',
        'A trusted partner for public and private sectors.',
        'Integrated solutions under one roof.',
        'A strategic fuel-station network.',
        'Fast response and on-time commitment.',
        'Professional customer service.',
      ],
    },
    contact: {
      kicker: "Let's start a successful partnership",
      title: 'Contact Us',
      lead: "Have a question or a project? We'd love to hear from you.",
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      addressValue: 'Damascus — Marota City',
      supply: 'To submit a petroleum supply request for facilities and activities',
      follow: 'Follow us',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Your message',
        send: 'Send Message',
        sending: 'Sending…',
        success: "Thank you! Your message has been received. We'll get back to you soon.",
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email address',
      },
    },
    footer: {
      rights: 'All rights reserved',
      links: 'Links',
      contact: 'Contact',
      built: 'Damascus · Syrian Arab Republic',
    },
  },
};
