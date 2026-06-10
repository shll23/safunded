/**
 * ============================================================================
 *  SAFunded — UI TRANSLATIONS (English / German)
 * ============================================================================
 *  Single source of truth for every piece of visible copy on the site, in
 *  both English ("en") and German ("de"). Components read the active language
 *  slice via the `useT()` hook from `@/lib/i18n`.
 *
 *  Language-neutral values (prices, simulated capital amounts, Stripe env
 *  keys, etc.) stay in `@/lib/plans.ts`. Only human-readable copy lives here.
 *
 *  Array-based sections (plans, rules, faqs, comparison points, steps, …) are
 *  kept in the SAME ORDER as their counterparts in `@/lib/plans.ts` so the two
 *  line up by index.
 * ============================================================================
 */

export type Language = "en" | "de";

export interface Dictionary {
  /** Language switcher control */
  langToggle: {
    label: string;
    ariaLabel: string;
  };
  header: {
    nav: { howItWorks: string; accounts: string; rules: string; payouts: string; reviews: string; faq: string };
    cta: string;
    menu: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    desc: string;
    ctaStart: string;
    viewOptions: string;
    trustBadges: string[];
    mock: {
      accountLabel: string;
      accountName: string;
      active: string;
      balance: string;
      equity: string;
      dailyLossLimit: string;
      overallLossLimit: string;
      profitSplit: string;
      profitSplitValue: string;
      rewardNote: string;
    };
  };
  trust: {
    eyebrow: string;
    items: { title: string; desc: string }[];
    testimonialPlaceholder: string;
  };
  how: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: { title: string; desc: string }[];
    note: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    sub: string;
    mostPopular: string;
    simulatedCapital: string;
    rows: {
      profitSplit: string;
      maxDailyLoss: string;
      maxOverallLoss: string;
      minTradingDays: string;
      payoutCycle: string;
    };
    /** Localized display values for the rows above (shared across plans) */
    values: {
      profitSplit: string;
      maxDailyLoss: string;
      maxOverallLoss: string;
      minTradingDays: string;
      payoutCycle: string;
    };
    oneTimeFee: string;
    exclTaxes: string;
    note: string;
    /** Per-plan name + CTA, keyed by plan id */
    plans: Record<string, { name: string; cta: string }>;
  };
  rules: {
    eyebrow: string;
    title: string;
    sub: string;
    note: string;
    /** Same order as `rules` in plans.ts */
    items: { label: string; value: string; detail: string }[];
  };
  payouts: {
    eyebrow: string;
    title: string;
    sub: string;
    cards: { title: string; desc: string }[];
    /** Localized headline value for each card, same order as `cards` */
    values: {
      profitSplit: string;
      payoutCycle: string;
      reviewProcess: string;
      firstPayoutWindow: string;
    };
    disclaimer: string;
  };
  dashboard: {
    eyebrow: string;
    title: string;
    sub: string;
    accountLabel: string;
    active: string;
    metrics: {
      balance: string;
      equity: string;
      openPl: string;
      dailyLossLimit: string;
      overallLossLimit: string;
      rewardTarget: string;
    };
    /** Localized demo value for the reward-target metric */
    rewardTargetValue: string;
    equityCurve: string;
    recentTrades: string;
    recentTradesNote: string;
    sides: { long: string; short: string };
  };
  comparison: {
    eyebrow: string;
    title: string;
    sub: string;
    points: string[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    riskNote: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    title: string;
    desc: string;
    start: string;
    compare: string;
    note: string;
  };
  disclaimer: {
    eyebrow: string;
    body: string;
  };
  footer: {
    desc: string;
    legalHeading: string;
    links: { terms: string; privacy: string; risk: string; contact: string; faq: string };
    copyright: string;
    simulatedNote: string;
  };
  checkout: {
    starting: string;
    genericError: string;
    couldNotStart: string;
  };
  success: {
    title: string;
    desc: string;
    whatNext: string;
    steps: string[];
    backHome: string;
    goDashboard: string;
    note: string;
  };
  cancel: {
    title: string;
    desc: string;
    viewAccounts: string;
    note: string;
  };
}

export const translations: Record<Language, Dictionary> = {
  en: {
    langToggle: { label: "DE", ariaLabel: "Auf Deutsch umschalten" },
    header: {
      nav: {
        howItWorks: "How It Works",
        accounts: "Accounts",
        rules: "Rules",
        payouts: "Payouts",
        reviews: "Reviews",
        faq: "FAQ",
      },
      cta: "Get Funded",
      menu: "Toggle menu",
    },
    hero: {
      badge: "Instant Funded Accounts — now available",
      titleLead: "Get instant access to ",
      titleAccent: "simulated trading capital",
      titleTail: ".",
      desc: "SAFunded lets disciplined traders start with an Instant Funded Account straight away — clear risk rules from day one, and eligibility for performance-based rewards when you trade within them.",
      ctaStart: "Start with 25K",
      viewOptions: "View Account Options",
      trustBadges: [
        "Instant Funded Accounts",
        "Clear Trading Rules",
        "Fast Stripe Checkout",
        "Performance-Based Rewards",
      ],
      mock: {
        accountLabel: "Account · Instant Funded",
        accountName: "50K Simulated",
        active: "Active",
        balance: "Balance",
        equity: "Equity",
        dailyLossLimit: "Daily Loss Limit",
        overallLossLimit: "Overall Loss Limit",
        profitSplit: "Profit split",
        profitSplitValue: "up to 80%",
        rewardNote: "Reward eligibility subject to rules & T&Cs.",
      },
    },
    trust: {
      eyebrow: "What SAFunded stands for",
      items: [
        { title: "Transparent rules", desc: "Every limit is published up front. No surprises, no hidden conditions." },
        { title: "Secure payments via Stripe", desc: "Card details are handled by Stripe. SAFunded never stores them." },
        { title: "Built for disciplined traders", desc: "A structure that rewards consistency and risk management." },
        { title: "Simple account structure", desc: "Three clear sizes — 25K, 50K, 100K. No hidden account types." },
        { title: "Clear payout process", desc: "Reward eligibility and review steps are documented and consistent." },
        { title: "Risk disclosed honestly", desc: "Simulated capital, performance-based rewards — stated plainly." },
      ],
      testimonialPlaceholder:
        "Testimonial placeholder — replace with verified trader feedback once available. Do not add fabricated reviews.",
    },
    how: {
      eyebrow: "How it works",
      title: "From checkout to your first trade",
      sub: "Four straightforward steps. No multi-stage evaluation to begin.",
      steps: [
        { title: "Choose your account size", desc: "Pick a 25K, 50K or 100K Instant Funded Account based on the amount of simulated capital you want to trade." },
        { title: "Complete secure checkout", desc: "Pay securely through Stripe Checkout. Your card details are handled by Stripe, not by SAFunded." },
        { title: "Receive account access", desc: "After a successful payment, your onboarding details are sent to your email so you can get started." },
        { title: "Trade within the rules", desc: "Trade inside the defined risk rules. With positive performance and full rule compliance, you may become eligible for performance-based rewards according to the payout policy." },
      ],
      note: "Payouts are not guaranteed. Reward eligibility is subject to rule compliance and the applicable Terms & Conditions.",
    },
    pricing: {
      eyebrow: "Accounts",
      title: "Choose your Instant Funded Account",
      sub: "Three sizes of simulated capital. The same transparent rules apply to all.",
      mostPopular: "Most Popular",
      simulatedCapital: "Simulated capital",
      rows: {
        profitSplit: "Profit split",
        maxDailyLoss: "Max daily loss",
        maxOverallLoss: "Max overall loss",
        minTradingDays: "Min. trading days",
        payoutCycle: "Payout cycle",
      },
      values: {
        profitSplit: "up to 80%",
        maxDailyLoss: "5%",
        maxOverallLoss: "10%",
        minTradingDays: "3 days",
        payoutCycle: "2 weeks",
      },
      oneTimeFee: "One-time fee",
      exclTaxes: "excl. taxes",
      note: "All accounts operate in a simulated trading environment unless explicitly stated otherwise. Prices, splits and risk limits shown are placeholders — confirm final values before launch. Payouts are not guaranteed and are subject to the Terms & Conditions.",
      plans: {
        "25k": { name: "Instant Funded 25K", cta: "Start 25K Account" },
        "50k": { name: "Instant Funded 50K", cta: "Start 50K Account" },
        "100k": { name: "Instant Funded 100K", cta: "Start 100K Account" },
      },
    },
    rules: {
      eyebrow: "Trading rules",
      title: "Clear rules, published up front",
      sub: "SAFunded is built for disciplined traders. Clear rules protect both the trader and the platform.",
      note: "These are SAFunded’s current trading rules. The full, binding rules live in the Terms & Conditions.",
      items: [
        { label: "Max Daily Loss", value: "5%", detail: "The maximum simulated loss permitted within a single trading day, measured against the defined balance/equity reference." },
        { label: "Max Overall Loss", value: "10%", detail: "The maximum total simulated drawdown permitted on the account over its lifetime." },
        { label: "Minimum Trading Days", value: "3 days", detail: "The minimum number of active trading days required before a reward request may be reviewed." },
        { label: "Prohibited Practices", value: "Not permitted", detail: "Practices such as latency/arbitrage abuse, copy-trading across accounts, or exploiting simulated feed errors are not permitted. (LEGAL: define exhaustively in T&Cs.)" },
        { label: "News Trading Policy", value: "Not permitted", detail: "Opening, closing or managing positions within a 5-minute window around high-impact news events is not permitted." },
        { label: "Weekend Holding Policy", value: "Allowed", detail: "Positions may be held over the weekend market closure." },
        { label: "Expert Advisors (EA) Policy", value: "On approval", detail: "Automated strategies / Expert Advisors are permitted once approved by the SAFunded team." },
        { label: "Consistency Rule", value: "None", detail: "SAFunded applies no consistency rule — your performance is not capped by single-day or single-trade limits." },
      ],
    },
    payouts: {
      eyebrow: "Payouts & rewards",
      title: "Rewards for consistent, rule-compliant performance",
      sub: "Trade within the rules, perform positively, and you may become eligible for performance-based rewards.",
      cards: [
        { title: "Profit split", desc: "The share of eligible simulated performance that may be paid as a reward. Exact terms are defined in the payout policy." },
        { title: "Payout cycle", desc: "How often eligible reward requests are processed once requirements are met." },
        { title: "Review process", desc: "Each request goes through a compliance review against the trading rules before approval." },
        { title: "First reward window", desc: "The earliest point at which an account may request its first reward." },
      ],
      values: {
        profitSplit: "up to 80%",
        payoutCycle: "2 weeks",
        reviewProcess: "24h",
        firstPayoutWindow: "14 days after first trade",
      },
      disclaimer:
        "Payout eligibility is subject to compliance with SAFunded’s trading rules and the applicable Terms & Conditions. Payouts are not guaranteed, there is no guaranteed income, and all rewards are subject to eligibility requirements. Trading involves risk.",
    },
    dashboard: {
      eyebrow: "Platform preview",
      title: "A clear view of your account",
      sub: "Track balance, equity, risk limits and reward eligibility at a glance. (Visual preview — figures are illustrative.)",
      accountLabel: "Instant Funded · 100K",
      active: "Active",
      metrics: {
        balance: "Balance",
        equity: "Equity",
        openPl: "Open P/L",
        dailyLossLimit: "Daily loss limit",
        overallLossLimit: "Overall loss limit",
        rewardTarget: "Reward target",
      },
      rewardTargetValue: "3 days × 1%",
      equityCurve: "Equity curve (illustrative)",
      recentTrades: "Recent trades",
      recentTradesNote: "Recent trades placeholder.",
      sides: { long: "Long", short: "Short" },
    },
    comparison: {
      eyebrow: "Why SAFunded",
      title: "A streamlined path to simulated funding",
      sub: "Unlike complex multi-step evaluation models, SAFunded focuses on a streamlined instant funding experience.",
      points: [
        "Instant account access — no multi-step gatekeeping to begin",
        "Simple, fixed account structure",
        "Transparent, published trading rules",
        "Secure checkout via Stripe",
        "Built for disciplined, serious traders",
        "Scalable account sizes (25K / 50K / 100K)",
      ],
    },
    reviews: {
      eyebrow: "What traders say",
      title: "Feedback from the SAFunded community",
      riskNote:
        "Trading involves risk. Individual results are not typical and are not a promise of future performance. Payouts are not guaranteed.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions, answered plainly",
      items: [
        { q: "What is an Instant Funded Account?", a: "An Instant Funded Account gives you access to a simulated trading environment with a defined amount of simulated capital, without a separate multi-step evaluation. You trade within clearly defined risk rules from day one." },
        { q: "Is the capital real or simulated?", a: "All trading takes place in a simulated environment using simulated capital, unless explicitly stated otherwise. You are not trading live client funds and SAFunded does not provide brokerage services. (LEGAL: confirm wording matches your operating model.)" },
        { q: "How do I purchase an account?", a: "Choose an account size in the Accounts section and complete a secure checkout. Payment is processed by Stripe; SAFunded does not store your card details." },
        { q: "How does Stripe Checkout work?", a: "When you select an account, you are redirected to Stripe's hosted checkout page to complete payment securely. After payment, you are returned to SAFunded." },
        { q: "When do I receive my account access?", a: "After a successful payment, onboarding details are sent to the email associated with your purchase. (EDIT-ME: state your real delivery timeframe.)" },
        { q: "What are the risk rules?", a: "Each account has a maximum daily loss, a maximum overall loss, and other defined parameters. The full, current rules are listed in the Rules section and the Terms & Conditions." },
        { q: "How does the profit split work?", a: "Eligible performance-based rewards may be shared according to the stated profit split (e.g. up to 80%). The exact split and conditions are defined in the payout policy and Terms & Conditions. (LEGAL.)" },
        { q: "Are payouts guaranteed?", a: "No. Payouts are not guaranteed. Any performance-based reward is subject to rule compliance, eligibility requirements, and the applicable Terms & Conditions. Trading involves risk." },
        { q: "Can I use Expert Advisors?", a: "This is governed by the Expert Advisors policy. (EDIT-ME: state your policy.)" },
        { q: "Can I trade news?", a: "This is governed by the News Trading policy. (EDIT-ME: state your policy.)" },
        { q: "Can I hold trades overnight or over the weekend?", a: "This is governed by the Weekend Holding policy. (EDIT-ME: state your policy.)" },
        { q: "What happens if I breach a rule?", a: "A breach of a risk rule may result in the account becoming ineligible for rewards or being closed, as defined in the Terms & Conditions. (LEGAL: state your exact consequence policy.)" },
        { q: "Can I upgrade from 25K to 50K or 100K?", a: "Account sizes are purchased individually. (EDIT-ME: describe any upgrade or scaling path you offer, if applicable.)" },
        { q: "Where can I read the Terms & Conditions?", a: "The full Terms & Conditions, Privacy Policy and Risk Disclosure are linked in the footer. (EDIT-ME: link these to your real documents before launch.)" },
      ],
    },
    cta: {
      title: "Ready to start with simulated capital?",
      desc: "Pick an account size, complete a secure Stripe checkout, and trade within clear, published rules.",
      start: "Start with 50K",
      compare: "Compare accounts",
      note: "Payouts are not guaranteed. Trading involves risk.",
    },
    disclaimer: {
      eyebrow: "Risk disclaimer",
      body: "SAFunded does not provide financial advice, investment services, brokerage services or access to live client funds. All trading accounts are simulated unless explicitly stated otherwise. Any performance-based rewards are subject to the applicable Terms & Conditions, risk rules and eligibility requirements. Trading financial markets involves risk and past performance is not indicative of future results.",
    },
    footer: {
      desc: "SAFunded offers Instant Funded simulated trading accounts for disciplined traders, with transparent rules and performance-based reward eligibility.",
      legalHeading: "Legal",
      links: {
        terms: "Terms & Conditions",
        privacy: "Privacy Policy",
        risk: "Risk Disclosure",
        contact: "Contact",
        faq: "FAQ",
      },
      copyright: "© 2026 SAFunded. All rights reserved.",
      simulatedNote: "All trading accounts are simulated unless explicitly stated.",
    },
    checkout: {
      starting: "Starting checkout…",
      genericError: "Something went wrong.",
      couldNotStart: "Could not start checkout.",
    },
    success: {
      title: "Payment successful",
      desc: "Thank you for purchasing your SAFunded account. Your onboarding details will be sent to your email shortly.",
      whatNext: "What happens next",
      steps: [
        "Check your inbox for the onboarding email.",
        "Review your account’s risk rules before trading.",
        "Log in and start trading within the rules.",
      ],
      backHome: "Back to Home",
      goDashboard: "Go to Dashboard",
      note: "Rewards are subject to rule compliance and Terms & Conditions. Trading involves risk.",
    },
    cancel: {
      title: "Checkout cancelled",
      desc: "Your payment was not completed. You can return to the account selection and try again whenever you’re ready.",
      viewAccounts: "View Accounts",
      note: "No charge was made. Trading involves risk.",
    },
  },

  de: {
    langToggle: { label: "EN", ariaLabel: "Switch to English" },
    header: {
      nav: {
        howItWorks: "So funktioniert’s",
        accounts: "Konten",
        rules: "Regeln",
        payouts: "Auszahlungen",
        reviews: "Bewertungen",
        faq: "FAQ",
      },
      cta: "Konto erhalten",
      menu: "Menü umschalten",
    },
    hero: {
      badge: "Instant-Funded-Konten — jetzt verfügbar",
      titleLead: "Erhalte sofortigen Zugang zu ",
      titleAccent: "simuliertem Trading-Kapital",
      titleTail: ".",
      desc: "SAFunded ermöglicht es disziplinierten Tradern, sofort mit einem Instant-Funded-Konto zu starten — klare Risikoregeln ab dem ersten Tag und die Berechtigung für leistungsbasierte Belohnungen, wenn du innerhalb dieser Regeln handelst.",
      ctaStart: "Mit 25K starten",
      viewOptions: "Kontooptionen ansehen",
      trustBadges: [
        "Instant-Funded-Konten",
        "Klare Trading-Regeln",
        "Schneller Stripe-Checkout",
        "Leistungsbasierte Belohnungen",
      ],
      mock: {
        accountLabel: "Konto · Instant Funded",
        accountName: "50K simuliert",
        active: "Aktiv",
        balance: "Kontostand",
        equity: "Eigenkapital",
        dailyLossLimit: "Tägliches Verlustlimit",
        overallLossLimit: "Gesamtverlustlimit",
        profitSplit: "Gewinnbeteiligung",
        profitSplitValue: "bis zu 80 %",
        rewardNote: "Belohnungsberechtigung vorbehaltlich der Regeln & AGB.",
      },
    },
    trust: {
      eyebrow: "Wofür SAFunded steht",
      items: [
        { title: "Transparente Regeln", desc: "Jedes Limit wird offen kommuniziert. Keine Überraschungen, keine versteckten Bedingungen." },
        { title: "Sichere Zahlungen über Stripe", desc: "Kartendaten werden von Stripe verarbeitet. SAFunded speichert sie nie." },
        { title: "Für disziplinierte Trader gemacht", desc: "Eine Struktur, die Konstanz und Risikomanagement belohnt." },
        { title: "Einfache Kontostruktur", desc: "Drei klare Größen — 25K, 50K, 100K. Keine versteckten Kontotypen." },
        { title: "Klarer Auszahlungsprozess", desc: "Belohnungsberechtigung und Prüfschritte sind dokumentiert und konsistent." },
        { title: "Risiken ehrlich offengelegt", desc: "Simuliertes Kapital, leistungsbasierte Belohnungen — klar benannt." },
      ],
      testimonialPlaceholder:
        "Platzhalter für Kundenstimmen — durch verifiziertes Trader-Feedback ersetzen, sobald verfügbar. Keine erfundenen Bewertungen hinzufügen.",
    },
    how: {
      eyebrow: "So funktioniert’s",
      title: "Vom Checkout zu deinem ersten Trade",
      sub: "Vier unkomplizierte Schritte. Kein mehrstufiges Evaluierungsverfahren zu Beginn.",
      steps: [
        { title: "Wähle deine Kontogröße", desc: "Wähle ein Instant-Funded-Konto mit 25K, 50K oder 100K — je nach Höhe des simulierten Kapitals, mit dem du handeln möchtest." },
        { title: "Sicheren Checkout abschließen", desc: "Bezahle sicher über Stripe Checkout. Deine Kartendaten werden von Stripe verarbeitet, nicht von SAFunded." },
        { title: "Kontozugang erhalten", desc: "Nach erfolgreicher Zahlung werden deine Onboarding-Details an deine E-Mail-Adresse gesendet, damit du loslegen kannst." },
        { title: "Innerhalb der Regeln handeln", desc: "Handle innerhalb der definierten Risikoregeln. Bei positiver Performance und vollständiger Regeleinhaltung kannst du gemäß der Auszahlungsrichtlinie für leistungsbasierte Belohnungen berechtigt werden." },
      ],
      note: "Auszahlungen sind nicht garantiert. Die Belohnungsberechtigung unterliegt der Regeleinhaltung und den geltenden AGB.",
    },
    pricing: {
      eyebrow: "Konten",
      title: "Wähle dein Instant-Funded-Konto",
      sub: "Drei Größen an simuliertem Kapital. Für alle gelten dieselben transparenten Regeln.",
      mostPopular: "Am beliebtesten",
      simulatedCapital: "Simuliertes Kapital",
      rows: {
        profitSplit: "Gewinnbeteiligung",
        maxDailyLoss: "Max. Tagesverlust",
        maxOverallLoss: "Max. Gesamtverlust",
        minTradingDays: "Min. Trading-Tage",
        payoutCycle: "Auszahlungszyklus",
      },
      values: {
        profitSplit: "bis zu 80 %",
        maxDailyLoss: "5 %",
        maxOverallLoss: "10 %",
        minTradingDays: "3 Tage",
        payoutCycle: "2 Wochen",
      },
      oneTimeFee: "Einmalige Gebühr",
      exclTaxes: "zzgl. Steuern",
      note: "Alle Konten arbeiten in einer simulierten Trading-Umgebung, sofern nicht ausdrücklich anders angegeben. Angezeigte Preise, Beteiligungen und Risikolimits sind Platzhalter — endgültige Werte vor dem Launch bestätigen. Auszahlungen sind nicht garantiert und unterliegen den AGB.",
      plans: {
        "25k": { name: "Instant Funded 25K", cta: "25K-Konto starten" },
        "50k": { name: "Instant Funded 50K", cta: "50K-Konto starten" },
        "100k": { name: "Instant Funded 100K", cta: "100K-Konto starten" },
      },
    },
    rules: {
      eyebrow: "Trading-Regeln",
      title: "Klare Regeln, offen kommuniziert",
      sub: "SAFunded ist für disziplinierte Trader gemacht. Klare Regeln schützen sowohl den Trader als auch die Plattform.",
      note: "Dies sind die aktuellen Trading-Regeln von SAFunded. Die vollständigen, verbindlichen Regeln stehen in den AGB.",
      items: [
        { label: "Max. Tagesverlust", value: "5 %", detail: "Der maximal zulässige simulierte Verlust innerhalb eines einzelnen Trading-Tages, gemessen am definierten Kontostand-/Eigenkapital-Referenzwert." },
        { label: "Max. Gesamtverlust", value: "10 %", detail: "Der maximal zulässige simulierte Gesamtverlust (Drawdown) des Kontos über seine gesamte Laufzeit." },
        { label: "Mindestanzahl Trading-Tage", value: "3 Tage", detail: "Die Mindestanzahl aktiver Trading-Tage, die erforderlich ist, bevor ein Belohnungsantrag geprüft werden kann." },
        { label: "Verbotene Praktiken", value: "Nicht erlaubt", detail: "Praktiken wie Latenz-/Arbitrage-Missbrauch, Copy-Trading über mehrere Konten hinweg oder das Ausnutzen von Fehlern im simulierten Datenfeed sind nicht erlaubt. (LEGAL: in den AGB abschließend definieren.)" },
        { label: "Richtlinie für News-Trading", value: "Nicht erlaubt", detail: "Das Eröffnen, Schließen oder Verwalten von Positionen innerhalb eines 5-Minuten-Fensters rund um Nachrichtenereignisse mit hoher Auswirkung ist nicht erlaubt." },
        { label: "Richtlinie für Wochenend-Positionen", value: "Erlaubt", detail: "Positionen dürfen über die Marktschließung am Wochenende gehalten werden." },
        { label: "Richtlinie für Expert Advisors (EA)", value: "Nach Freigabe", detail: "Automatisierte Strategien / Expert Advisors sind erlaubt, sobald sie vom SAFunded-Team freigegeben wurden." },
        { label: "Konsistenzregel", value: "Keine", detail: "SAFunded wendet keine Konsistenzregel an — deine Performance wird nicht durch Tages- oder Einzeltrade-Limits begrenzt." },
      ],
    },
    payouts: {
      eyebrow: "Auszahlungen & Belohnungen",
      title: "Belohnungen für konstante, regelkonforme Performance",
      sub: "Handle innerhalb der Regeln, erziele positive Ergebnisse und du kannst für leistungsbasierte Belohnungen berechtigt werden.",
      cards: [
        { title: "Gewinnbeteiligung", desc: "Der Anteil der berechtigten simulierten Performance, der als Belohnung ausgezahlt werden kann. Die genauen Bedingungen sind in der Auszahlungsrichtlinie definiert." },
        { title: "Auszahlungszyklus", desc: "Wie oft berechtigte Belohnungsanträge bearbeitet werden, sobald die Anforderungen erfüllt sind." },
        { title: "Prüfprozess", desc: "Jeder Antrag durchläuft vor der Genehmigung eine Compliance-Prüfung anhand der Trading-Regeln." },
        { title: "Erstes Belohnungsfenster", desc: "Der früheste Zeitpunkt, zu dem ein Konto seine erste Belohnung beantragen kann." },
      ],
      values: {
        profitSplit: "bis zu 80 %",
        payoutCycle: "2 Wochen",
        reviewProcess: "24 Std.",
        firstPayoutWindow: "14 Tage nach dem ersten Trade",
      },
      disclaimer:
        "Die Auszahlungsberechtigung unterliegt der Einhaltung der Trading-Regeln von SAFunded und den geltenden AGB. Auszahlungen sind nicht garantiert, es gibt kein garantiertes Einkommen und alle Belohnungen unterliegen Berechtigungsvoraussetzungen. Trading ist mit Risiken verbunden.",
    },
    dashboard: {
      eyebrow: "Plattform-Vorschau",
      title: "Ein klarer Blick auf dein Konto",
      sub: "Behalte Kontostand, Eigenkapital, Risikolimits und Belohnungsberechtigung auf einen Blick im Auge. (Visuelle Vorschau — Zahlen sind beispielhaft.)",
      accountLabel: "Instant Funded · 100K",
      active: "Aktiv",
      metrics: {
        balance: "Kontostand",
        equity: "Eigenkapital",
        openPl: "Offenes G/V",
        dailyLossLimit: "Tägliches Verlustlimit",
        overallLossLimit: "Gesamtverlustlimit",
        rewardTarget: "Belohnungsziel",
      },
      rewardTargetValue: "3 Tage × 1 %",
      equityCurve: "Eigenkapitalkurve (beispielhaft)",
      recentTrades: "Letzte Trades",
      recentTradesNote: "Platzhalter für letzte Trades.",
      sides: { long: "Long", short: "Short" },
    },
    comparison: {
      eyebrow: "Warum SAFunded",
      title: "Ein schlanker Weg zu simuliertem Funding",
      sub: "Anders als komplexe mehrstufige Evaluierungsmodelle konzentriert sich SAFunded auf ein schlankes Instant-Funding-Erlebnis.",
      points: [
        "Sofortiger Kontozugang — kein mehrstufiges Auswahlverfahren zu Beginn",
        "Einfache, feste Kontostruktur",
        "Transparente, offen kommunizierte Trading-Regeln",
        "Sicherer Checkout über Stripe",
        "Für disziplinierte, ernsthafte Trader gemacht",
        "Skalierbare Kontogrößen (25K / 50K / 100K)",
      ],
    },
    reviews: {
      eyebrow: "Was Trader sagen",
      title: "Feedback aus der SAFunded-Community",
      riskNote:
        "Trading ist mit Risiken verbunden. Individuelle Ergebnisse sind nicht typisch und kein Versprechen für zukünftige Leistungen. Auszahlungen sind nicht garantiert.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Fragen, klar beantwortet",
      items: [
        { q: "Was ist ein Instant-Funded-Konto?", a: "Ein Instant-Funded-Konto gibt dir Zugang zu einer simulierten Trading-Umgebung mit einem definierten Betrag an simuliertem Kapital, ohne separate mehrstufige Evaluierung. Du handelst ab dem ersten Tag innerhalb klar definierter Risikoregeln." },
        { q: "Ist das Kapital echt oder simuliert?", a: "Das gesamte Trading findet in einer simulierten Umgebung mit simuliertem Kapital statt, sofern nicht ausdrücklich anders angegeben. Du handelst nicht mit echten Kundengeldern und SAFunded bietet keine Brokerage-Dienstleistungen an. (LEGAL: Wortlaut an dein Geschäftsmodell anpassen.)" },
        { q: "Wie kaufe ich ein Konto?", a: "Wähle im Bereich „Konten“ eine Kontogröße und schließe einen sicheren Checkout ab. Die Zahlung wird über Stripe abgewickelt; SAFunded speichert deine Kartendaten nicht." },
        { q: "Wie funktioniert Stripe Checkout?", a: "Wenn du ein Konto auswählst, wirst du zur gehosteten Checkout-Seite von Stripe weitergeleitet, um die Zahlung sicher abzuschließen. Nach der Zahlung gelangst du zurück zu SAFunded." },
        { q: "Wann erhalte ich meinen Kontozugang?", a: "Nach erfolgreicher Zahlung werden die Onboarding-Details an die mit deinem Kauf verknüpfte E-Mail-Adresse gesendet. (EDIT-ME: gib deinen tatsächlichen Bereitstellungszeitraum an.)" },
        { q: "Welche Risikoregeln gibt es?", a: "Jedes Konto hat einen maximalen Tagesverlust, einen maximalen Gesamtverlust und weitere definierte Parameter. Die vollständigen, aktuellen Regeln stehen im Bereich „Regeln“ und in den AGB." },
        { q: "Wie funktioniert die Gewinnbeteiligung?", a: "Berechtigte leistungsbasierte Belohnungen können gemäß der angegebenen Gewinnbeteiligung (z. B. bis zu 80 %) geteilt werden. Die genaue Beteiligung und die Bedingungen sind in der Auszahlungsrichtlinie und den AGB definiert. (LEGAL.)" },
        { q: "Sind Auszahlungen garantiert?", a: "Nein. Auszahlungen sind nicht garantiert. Jede leistungsbasierte Belohnung unterliegt der Regeleinhaltung, den Berechtigungsvoraussetzungen und den geltenden AGB. Trading ist mit Risiken verbunden." },
        { q: "Kann ich Expert Advisors verwenden?", a: "Dies wird durch die Richtlinie für Expert Advisors geregelt. (EDIT-ME: gib deine Richtlinie an.)" },
        { q: "Darf ich News traden?", a: "Dies wird durch die Richtlinie für News-Trading geregelt. (EDIT-ME: gib deine Richtlinie an.)" },
        { q: "Darf ich Trades über Nacht oder über das Wochenende halten?", a: "Dies wird durch die Richtlinie für Wochenend-Positionen geregelt. (EDIT-ME: gib deine Richtlinie an.)" },
        { q: "Was passiert, wenn ich gegen eine Regel verstoße?", a: "Ein Verstoß gegen eine Risikoregel kann dazu führen, dass das Konto nicht mehr für Belohnungen berechtigt ist oder geschlossen wird, wie in den AGB definiert. (LEGAL: gib deine genaue Konsequenzrichtlinie an.)" },
        { q: "Kann ich von 25K auf 50K oder 100K upgraden?", a: "Kontogrößen werden einzeln erworben. (EDIT-ME: beschreibe einen etwaigen Upgrade- oder Skalierungspfad, falls zutreffend.)" },
        { q: "Wo kann ich die AGB lesen?", a: "Die vollständigen AGB, die Datenschutzerklärung und die Risikohinweise sind im Footer verlinkt. (EDIT-ME: vor dem Launch mit deinen echten Dokumenten verlinken.)" },
      ],
    },
    cta: {
      title: "Bereit, mit simuliertem Kapital zu starten?",
      desc: "Wähle eine Kontogröße, schließe einen sicheren Stripe-Checkout ab und handle innerhalb klarer, offen kommunizierter Regeln.",
      start: "Mit 50K starten",
      compare: "Konten vergleichen",
      note: "Auszahlungen sind nicht garantiert. Trading ist mit Risiken verbunden.",
    },
    disclaimer: {
      eyebrow: "Risikohinweis",
      body: "SAFunded bietet keine Finanzberatung, keine Anlagedienstleistungen, keine Brokerage-Dienstleistungen und keinen Zugang zu echten Kundengeldern. Alle Trading-Konten sind simuliert, sofern nicht ausdrücklich anders angegeben. Etwaige leistungsbasierte Belohnungen unterliegen den geltenden AGB, den Risikoregeln und den Berechtigungsvoraussetzungen. Der Handel an den Finanzmärkten ist mit Risiken verbunden und vergangene Wertentwicklungen sind kein Indikator für zukünftige Ergebnisse.",
    },
    footer: {
      desc: "SAFunded bietet disziplinierten Tradern Instant-Funded-Konten für simuliertes Trading — mit transparenten Regeln und Berechtigung für leistungsbasierte Belohnungen.",
      legalHeading: "Rechtliches",
      links: {
        terms: "AGB",
        privacy: "Datenschutzerklärung",
        risk: "Risikohinweise",
        contact: "Kontakt",
        faq: "FAQ",
      },
      copyright: "© 2026 SAFunded. Alle Rechte vorbehalten.",
      simulatedNote: "Alle Trading-Konten sind simuliert, sofern nicht ausdrücklich anders angegeben.",
    },
    checkout: {
      starting: "Checkout wird gestartet …",
      genericError: "Etwas ist schiefgelaufen.",
      couldNotStart: "Checkout konnte nicht gestartet werden.",
    },
    success: {
      title: "Zahlung erfolgreich",
      desc: "Vielen Dank für den Kauf deines SAFunded-Kontos. Deine Onboarding-Details werden in Kürze an deine E-Mail-Adresse gesendet.",
      whatNext: "Wie es weitergeht",
      steps: [
        "Sieh in deinem Posteingang nach der Onboarding-E-Mail.",
        "Prüfe die Risikoregeln deines Kontos, bevor du handelst.",
        "Melde dich an und handle innerhalb der Regeln.",
      ],
      backHome: "Zurück zur Startseite",
      goDashboard: "Zum Dashboard",
      note: "Belohnungen unterliegen der Regeleinhaltung und den AGB. Trading ist mit Risiken verbunden.",
    },
    cancel: {
      title: "Checkout abgebrochen",
      desc: "Deine Zahlung wurde nicht abgeschlossen. Du kannst jederzeit zur Kontoauswahl zurückkehren und es erneut versuchen, wenn du bereit bist.",
      viewAccounts: "Konten ansehen",
      note: "Es wurde keine Zahlung vorgenommen. Trading ist mit Risiken verbunden.",
    },
  },
};
