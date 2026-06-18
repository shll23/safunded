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
  /** Small shared UI strings reused across sections (accordion toggles, …). */
  common: {
    showMore: string;
    showLess: string;
  };
  header: {
    nav: { howItWorks: string; accounts: string; rules: string; payouts: string; reviews: string; faq: string; about: string };
    cta: string;
    login: string;
    menu: string;
  };
  /** Slim launch-sale strip pinned above the header. */
  announcement: {
    badge: string;
    text: string;
    cta: string;
    dismiss: string;
  };
  /** Promo / discount-code banner shown above the pricing grid. */
  promo: {
    badge: string;
    headline: string;
    codeLabel: string;
    code: string;
    copy: string;
    copied: string;
  };
  /** Compact Trustpilot rating badge (social proof). */
  trustpilot: {
    rated: string;
    score: string;
    outOf: string;
    brand: string;
    count: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    desc: string;
    offerLine: string;
    priceLine: string;
    riskNote: string;
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
    statement: string;
    items: { title: string; desc: string }[];
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
    launchPriceLabel: string;
    regularPriceLabel: string;
    withCode: string;
    note: string;
    /** Per-plan name + CTA, keyed by plan id */
    plans: Record<string, { name: string; cta: string }>;
    /** "Rules summary" modal opened from each account card. */
    rulesModal: {
      trigger: string;
      title: string;
      subtitle: string;
      close: string;
      accountSize: string;
      rows: {
        maxDailyLoss: string;
        maxOverallLoss: string;
        profitSplit: string;
        minTradingDays: string;
      };
      payoutHeading: string;
      payoutReq: string;
      prohibitedHeading: string;
      prohibited: string;
      simulatedNote: string;
      fullRules: string;
    };
  };
  /** Compact trust band shown directly below the pricing grid. */
  trustHighlights: {
    eyebrow: string;
    title: string;
    items: { icon: "flag" | "shield" | "check" | "sim"; title: string; desc: string }[];
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
    footnote: string;
    viewAll: string;
  };
  /** Dedicated /payouts page. */
  payoutsPage: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      eyebrow: string;
      title: string;
      sub: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    stats: {
      totalPaid: string;
      totalPaidValue: string;
      payoutsCount: string;
      payoutsCountValue: string;
      medianTime: string;
      avgPayout: string;
      note: string;
    };
    certificates: {
      eyebrow: string;
      title: string;
      sub: string;
      certLabel: string;
      footnote: string;
    };
    activity: {
      eyebrow: string;
      title: string;
      sub: string;
      columns: {
        date: string;
        country: string;
        method: string;
        account: string;
        amount: string;
      };
    };
    methods: { bank: string; crypto: string };
    countries: {
      de: string;
      at: string;
      ch: string;
      nl: string;
      es: string;
      it: string;
    };
    largest: {
      eyebrow: string;
      title: string;
      sub: string;
      payoutLabel: string;
      accountLabel: string;
      processingLabel: string;
      hoursSuffix: string;
    };
    flow: {
      eyebrow: string;
      title: string;
      steps: { title: string; desc: string }[];
    };
    conditions: {
      eyebrow: string;
      title: string;
      sub: string;
      rows: { label: string; value: string }[];
      cta: string;
    };
    disclaimer: string;
    finalCta: { title: string; desc: string; primary: string; secondary: string };
    months: string[];
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
    safundedLabel: string;
    traditionalLabel: string;
    rows: { point: string; safunded: string; traditional: string }[];
    footnote: string;
  };
  /** Standalone launch-offer section. */
  launch: {
    badge: string;
    title: string;
    sub: string;
    bullets: string[];
    cta: string;
  };
  /** SEO / plain-language explainer section. */
  seo: {
    eyebrow: string;
    title: string;
    body: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    riskNote: string;
    items: { name: string; role: string; rating: number; quote: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    /** Grouped FAQ categories — each is its own accordion of Q&A entries. */
    categories: { title: string; items: { q: string; a: string }[] }[];
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
    links: { terms: string; privacy: string; risk: string; contact: string; faq: string; payouts: string };
    copyright: string;
    simulatedNote: string;
  };
  checkout: {
    starting: string;
    genericError: string;
    couldNotStart: string;
    title: string;
    subtitle: string;
    noPlan: { title: string; desc: string; cta: string };
    oneTimeFee: string;
    payStripe: string;
    payStripeLoading: string;
    payValidopay: string;
    payValidopayLoading: string;
    /** Discount code field — applies to both the Stripe and the crypto path. */
    coupon: {
      label: string;
      placeholder: string;
      checking: string;
      /**
       * Shown on a valid coupon when the percentage is known. "{pct}" is the
       * discount percent, "{amt}" the discount amount in USD (e.g. "$87.15").
       */
      applied: string;
      /**
       * Shown on a valid coupon when only the USD amount is known. "{amt}" is
       * the discount amount in USD. The amount is NEVER rendered as a percent.
       */
      appliedAmount: string;
      invalid: string;
      error: string;
    };
    acceptHint: string;
    footnote: string;
    /** Mandatory consent #1 — acceptance of all binding legal documents. */
    consentTerms: {
      pre: string;
      links: { label: string; slug: string }[];
      conjunction: string;
      post: string;
    };
    /** Mandatory consent #2 — immediate provision / loss of withdrawal right. */
    consentImmediate: { pre: string; withdrawal: string; post: string };
    /** Mandatory consent #3 — risk acknowledgement. */
    consentRisk: string;
    /**
     * Mandatory consent #4 — confirmation that the buyer is not resident in or
     * a national of an excluded country (links to AGB section 45).
     */
    consentGeo: { pre: string; section: string; post: string };
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
    common: { showMore: "Show more", showLess: "Show less" },
    header: {
      nav: {
        howItWorks: "How It Works",
        accounts: "Accounts",
        rules: "Rules",
        payouts: "Payouts",
        reviews: "Reviews",
        faq: "FAQ",
        about: "About",
      },
      cta: "Get Funded",
      login: "Login",
      menu: "Toggle menu",
    },
    announcement: {
      badge: "Limited time",
      text: "Launch Sale — 35% off all programs + new Instant Funding launch",
      cta: "Start now",
      dismiss: "Dismiss announcement",
    },
    promo: {
      badge: "Limited time",
      headline: "35% off all accounts",
      codeLabel: "Code",
      code: "LAUNCH35",
      copy: "Copy code",
      copied: "Copied!",
    },
    trustpilot: {
      rated: "Excellent",
      score: "4.8",
      outOf: "out of 5",
      brand: "Trustpilot",
      count: "127 traders",
    },
    hero: {
      badge: "Instant Funded Accounts — now available",
      titleLead: "Instant Funded Trading Accounts ",
      titleAccent: "without a Challenge Phase",
      titleTail: "",
      desc: "Start with a simulated MT5 account, trade within clear rules, and become eligible for performance-based rewards after review.",
      offerLine: "Launch offer: 35% off with code LAUNCH35 — limited time only.",
      priceLine: "Starting from $161.85 for 25K simulated capital.",
      riskNote: "All accounts are simulated. Rewards are subject to rules, review and eligibility requirements.",
      ctaStart: "View Accounts",
      viewOptions: "How It Works",
      trustBadges: [
        "Instant Funded Accounts",
        "Clear Trading Rules",
        "Stripe & Confirmo Checkout",
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
        rewardNote: "Payout eligibility subject to rules & T&Cs.",
      },
    },
    trust: {
      eyebrow: "What SAFunded stands for",
      statement: "Built for disciplined traders who want clear rules, instant simulated access and transparent reward eligibility.",
      items: [
        { title: "Transparent rules", desc: "Every limit is published up front — no surprises, no hidden conditions." },
        { title: "Secure payments", desc: "Card and crypto payments are handled by Stripe and Confirmo. We never store your card details." },
        { title: "Simulated trading", desc: "All accounts are simulated. No real client capital is deposited, held or traded." },
        { title: "Clear payout review", desc: "Reward eligibility and review steps are documented, consistent and disclosed plainly." },
      ],
    },
    how: {
      eyebrow: "How it works",
      title: "From checkout to your first trade",
      sub: "Four straightforward steps. No multi-stage evaluation to begin.",
      steps: [
        { title: "Choose your account size", desc: "Pick a 25K, 50K or 100K Instant Funded Account based on the amount of simulated capital you want to trade." },
        { title: "Complete secure checkout", desc: "Pay securely via Stripe (card) or Confirmo (crypto). Your card details are handled by Stripe and Confirmo, not by SAFunded." },
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
      exclTaxes: "incl. taxes",
      launchPriceLabel: "Launch price",
      regularPriceLabel: "Regular",
      withCode: "incl. 35% launch discount with code LAUNCH35",
      note: "All accounts operate in a simulated trading environment unless explicitly stated otherwise. Payouts are not guaranteed and are subject to the Terms & Conditions. Prices are shown in USD.",
      plans: {
        "25k": { name: "Instant Funded 25K", cta: "Start 25K Account" },
        "50k": { name: "Instant Funded 50K", cta: "Start 50K Account" },
        "100k": { name: "Instant Funded 100K", cta: "Start 100K Account" },
      },
      rulesModal: {
        trigger: "View rules summary",
        title: "Rules summary",
        subtitle: "The key rules for this account at a glance.",
        close: "Close",
        accountSize: "Account size",
        rows: {
          maxDailyLoss: "Max daily loss",
          maxOverallLoss: "Max overall loss",
          profitSplit: "Profit split",
          minTradingDays: "Min. trading days",
        },
        payoutHeading: "Payout requirements",
        payoutReq:
          "Cumulatively: full rule compliance, a minimum duration of 14 calendar days, at least 3 profitable trading days (≥ 1% each) and a successful KYC, AML and anti-fraud review.",
        prohibitedHeading: "Prohibited trading practices",
        prohibited:
          "Practices such as latency/arbitrage abuse, exploiting simulated feed errors, unapproved bots and the artificial creation of profitable days are not permitted. See the Trading Rules for the full list.",
        simulatedNote:
          "All accounts are simulated trading accounts. No real capital is provided.",
        fullRules: "Read the full Instant Funded Account Rules",
      },
    },
    trustHighlights: {
      eyebrow: "Why traders trust SAFunded",
      title: "Serious, transparent and secure by design",
      items: [
        { icon: "flag", title: "Operated from Germany", desc: "SAFunded is operated by a German company with a clear legal notice, transparent provider information and direct communication." },
        { icon: "shield", title: "Secure payment", desc: "Payments are handled by secure providers such as Stripe and Confirmo. SAFunded never stores your sensitive payment details." },
        { icon: "check", title: "Clear payout review", desc: "Rewards are processed after a transparent review of the trading rules, identity (KYC) and prohibited trading practices." },
        { icon: "sim", title: "Simulated trading", desc: "All accounts are simulated trading accounts. No real client capital is deposited, held or traded — risk is disclosed plainly." },
      ],
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
        { label: "Prohibited Practices", value: "Not permitted", detail: "Practices such as latency/arbitrage abuse, exploiting simulated feed errors, hedging and the artificial creation of profitable days are not permitted. Copy Trading is allowed as long as it is transparent, rule-compliant and not used to bypass SAFunded rules. The complete and binding definitions are set out in the Trading Rules, Prohibited Trading Practices and Terms & Conditions." },
        { label: "News Trading Policy", value: "Not permitted", detail: "Opening, closing or managing positions within a 5-minute window around high-impact news events is not permitted." },
        { label: "Weekend Holding Policy", value: "Allowed", detail: "Positions may be held over the weekend market closure." },
        { label: "Expert Advisors (EA) Policy", value: "On approval", detail: "Automated strategies / Expert Advisors are permitted once approved by the SAFunded team." },
        { label: "Consistency Rule", value: "None", detail: "SAFunded applies no consistency rule — your performance is not capped by single-day or single-trade limits." },
      ],
    },
    payouts: {
      eyebrow: "Payouts",
      title: "Payouts for consistent, rule-compliant performance",
      sub: "Trade within the rules, perform positively, and you may become eligible for a performance-based payout.",
      cards: [
        { title: "Profit split", desc: "The share of eligible simulated performance that may be paid out. Exact terms are defined in the payout policy." },
        { title: "Payout cycle", desc: "How often eligible payout requests are processed once requirements are met." },
        { title: "Payout processing", desc: "Payouts are processed within 24h after a successful review, KYC/AML checks and full rule compliance." },
        { title: "First payout window", desc: "The earliest point at which an account may request its first payout." },
      ],
      values: {
        profitSplit: "up to 80%",
        payoutCycle: "2 weeks",
        reviewProcess: "24h*",
        firstPayoutWindow: "14 days after first trade",
      },
      disclaimer:
        "Payout eligibility is subject to compliance with SAFunded’s trading rules and the applicable Terms & Conditions. Payouts are not guaranteed, there is no guaranteed income, and all payouts are subject to eligibility requirements. Trading involves risk.",
      footnote: "*After successful review, KYC/AML checks and full rule compliance.",
      viewAll: "See all payouts",
    },
    payoutsPage: {
      metaTitle: "Payouts — SAFunded",
      metaDescription:
        "See how SAFunded rewards work: an 80% profit split, a two-week payout cycle and processing within 24h after a successful review. Anonymized examples of rewards paid to SAFunded traders.",
      hero: {
        eyebrow: "Payouts & rewards",
        title: "Payouts you can trust",
        sub: "Trade simulated capital. Get real rewards paid out. Fast, secure payouts to SAFunded traders.",
        ctaPrimary: "View accounts",
        ctaSecondary: "Read the payout policy",
      },
      stats: {
        totalPaid: "Rewards in these examples",
        totalPaidValue: "$243,493",
        payoutsCount: "Documented payouts",
        payoutsCountValue: "1,437",
        medianTime: "Median processing time",
        avgPayout: "Average payout",
        note: "Figures summarize the anonymized examples shown below. They are illustrative, relate to simulated performance and are not a promise of future results.",
      },
      certificates: {
        eyebrow: "Payout certificates",
        title: "Documented SAFunded payouts",
        sub: "These anonymized confirmations document payouts processed through the SAFunded trader system.",
        certLabel: "Payout certificate",
        footnote: "The payout examples shown correspond to real payouts to SAFunded traders.",
      },
      activity: {
        eyebrow: "Verified payout activity",
        title: "Recent trader payouts",
        sub: "A selection of recent rewards processed for SAFunded traders.",
        columns: {
          date: "Date",
          country: "Country",
          method: "Method",
          account: "Account",
          amount: "Amount",
        },
      },
      methods: { bank: "Bank transfer", crypto: "Crypto · USDC" },
      countries: {
        de: "Germany",
        at: "Austria",
        ch: "Switzerland",
        nl: "Netherlands",
        es: "Spain",
        it: "Italy",
      },
      largest: {
        eyebrow: "Largest payouts",
        title: "Examples across account sizes",
        sub: "Anonymized examples of rewards paid to SAFunded traders on different account sizes.",
        payoutLabel: "Payout",
        accountLabel: "Account size",
        processingLabel: "Processing",
        hoursSuffix: "h",
      },
      flow: {
        eyebrow: "How payouts work",
        title: "From request to release",
        steps: [
          {
            title: "Request your payout",
            desc: "Submit a reward request once you have met the minimum trading days and all rule conditions.",
          },
          {
            title: "Account review",
            desc: "Your account is reviewed for full rule compliance, together with KYC and AML/anti-fraud checks.",
          },
          {
            title: "Payout released",
            desc: "After a successful review the reward is processed within 24h via your chosen method — bank transfer or crypto.",
          },
        ],
      },
      conditions: {
        eyebrow: "Fair payout rules",
        title: "Clear payout conditions",
        sub: "SAFunded works with clearly defined payout conditions — no hidden deductions and no surprises. Traders who follow the rules and meet the conditions can request their rewards on schedule.",
        rows: [
          { label: "Reward request", value: "Every 2 weeks" },
          { label: "Processing time", value: "Within 24h*" },
          { label: "First reward window", value: "14 days after first trade" },
          { label: "Profit split", value: "Up to 80%" },
          { label: "Hidden fees", value: "None" },
        ],
        cta: "View all trading rules",
      },
      disclaimer:
        "The payout examples shown reflect anonymized rewards processed for SAFunded traders and are provided for illustration only. All trading takes place in a simulated environment; displayed balances are notional reference values. Payout eligibility is subject to full rule compliance, a minimum duration, the required profitable trading days and a successful KYC/AML and anti-fraud review. Payouts are not guaranteed, there is no guaranteed income, and individual results are not typical. Trading involves risk.",
      finalCta: {
        title: "Ready to trade for a payout?",
        desc: "Start an instant funded account, trade within clear rules and request your reward once you qualify.",
        primary: "Start an account",
        secondary: "View the rules",
      },
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    dashboard: {
      eyebrow: "Platform preview",
      title: "A clear view of your account",
      sub: "Track balance, equity, risk limits and payout eligibility at a glance.",
      accountLabel: "Instant Funded · 100K",
      active: "Active",
      metrics: {
        balance: "Balance",
        equity: "Equity",
        openPl: "Open P/L",
        dailyLossLimit: "Daily loss limit",
        overallLossLimit: "Overall loss limit",
        rewardTarget: "Payout target",
      },
      rewardTargetValue: "3 days × 1%",
      equityCurve: "Equity curve (illustrative)",
      recentTrades: "Recent trades",
      recentTradesNote: "Example visuals only. Not typical or expected performance.",
      sides: { long: "Long", short: "Short" },
    },
    comparison: {
      eyebrow: "Why SAFunded",
      title: "Why SAFunded instead of a traditional challenge?",
      sub: "Skip the multi-step evaluation model. SAFunded gives disciplined traders instant access to a simulated funded account with clear rules and performance-based rewards.",
      safundedLabel: "SAFunded Instant",
      traditionalLabel: "Traditional Challenge",
      rows: [
        { point: "Start", safunded: "Instantly with a simulated account", traditional: "Pass a challenge first" },
        { point: "Profit split", safunded: "Up to 80% payout", traditional: "Often only after 2 phases" },
        { point: "Time pressure", safunded: "No unnecessary evaluation stress", traditional: "Often tight rules & phases" },
        { point: "Capital", safunded: "Simulated MT5 account", traditional: "Simulated challenge account" },
        { point: "Payout", safunded: "Possible after a rule review", traditional: "Only after passing & review" },
      ],
      footnote: "All accounts are simulated trading accounts — no real capital is provided. Payouts are subject to a successful review, KYC/AML checks and full rule compliance.",
    },
    launch: {
      badge: "Launch offer",
      title: "35% off all accounts",
      sub: "Use code LAUNCH35 at checkout. Start with a 25K simulated account from $161.85.",
      bullets: [
        "No challenge phase",
        "Instant funded MT5 accounts",
        "80% profit split",
        "5% max daily loss",
        "10% max overall loss",
        "Payouts processed within 24h after successful review",
      ],
      cta: "Claim Launch Offer",
    },
    seo: {
      eyebrow: "About SAFunded",
      title: "Instant Funded Trading Accounts without a Challenge Phase",
      body: "SAFunded offers instant funded MT5 accounts with simulated trading capital for disciplined traders. Instead of completing a multi-step challenge, traders can access a simulated funded account from day one, follow clear drawdown rules and become eligible for performance-based rewards after meeting the payout requirements. Choose a 25K, 50K or 100K funded account with no consistency rule, an 80% profit split and payout processing within 24h after a successful review.",
    },
    reviews: {
      eyebrow: "What traders say",
      title: "Feedback from the SAFunded community",
      riskNote:
        "Trading involves risk. Individual results are not typical and are not a promise of future performance. Payouts are not guaranteed.",
      items: [
        {
          name: "Daniel R.",
          role: "Swing trader",
          rating: 5,
          quote:
            "Best instant-funded experience I've had. Every rule is published up front and the split was exactly as advertised — no surprises.",
        },
        {
          name: "Mei L.",
          role: "Day trader",
          rating: 5,
          quote:
            "Reward request was reviewed within a day and processed on the next cycle. The whole process felt transparent and fair.",
        },
        {
          name: "Tomás G.",
          role: "Futures trader",
          rating: 5,
          quote:
            "No consistency rule choking my edge — that alone sets SAFunded apart. I scaled up once I'd proven I could trade within the limits.",
        },
        {
          name: "Aisha K.",
          role: "Algo trader",
          rating: 5,
          quote:
            "Clean dashboard, clear risk limits, and EA approval from the team was painless. Exactly the structure a systematic trader wants.",
        },
        {
          name: "Sofia M.",
          role: "Forex trader",
          rating: 3,
          quote:
            "I hit my max daily loss and lost my challenge — gutted, honestly. But the rules were fair and clearly explained, so I'm giving it another shot.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions, answered plainly",
      categories: [
        {
          title: "Accounts & Start",
          items: [
            { q: "What is an Instant Funded Account?", a: "After purchase, a simulated MT5 account with a defined account reference value (25K, 50K or 100K) is provided to you immediately — with no separate multi-step evaluation. You trade within clearly defined risk rules from day one." },
            { q: "Is the capital real or simulated?", a: "All trading takes place in a simulated environment. No real capital is deposited, held or traded; displayed balances are notional reference values used to measure performance. SAFunded does not provide investment or financial advice and does not offer brokerage services." },
            { q: "Which platform is used, and which instruments can I trade?", a: "Trading takes place on MetaTrader 5 (MT5). You can trade Forex, precious metals (in particular gold), indices and other CFDs available via MT5 and approved by SAFunded. Single stocks are not tradable. The standard leverage is 1:100; SAFunded may adjust leverage depending on the instrument, account model or market conditions." },
            { q: "When do I receive my account access?", a: "Account access is provided after successful payment — generally immediately or shortly thereafter. Onboarding details are sent to the email address associated with your purchase." },
            { q: "Who can open an account?", a: "Opening an account requires that you are of legal age (at least 18) and have full legal capacity. Users from or residing in Ukraine, Iran, Israel and Afghanistan may not open or use accounts; SAFunded may extend this list for legal or regulatory reasons." },
            { q: "Who operates SAFunded, and where can I read the terms and rules?", a: "The operator is AB Digital Management, Hauptstraße 6, 72622 Nürtingen, Germany. The full Terms & Conditions, Trading Rules, Instant Funded Account Rules, Payout Policy, Privacy Policy, Risk Disclosure and Right of Withdrawal are linked in the footer." },
          ],
        },
        {
          title: "Trading Rules",
          items: [
            { q: "Which rules do I have to follow?", a: "A maximum daily loss of 5% and a maximum overall loss of 10% of the respective account reference value apply. Open positions count, and even a temporary breach of a limit is treated as a violation. The daily reset time is UTC+2 (Berlin-Prague time)." },
            { q: "What happens if I breach a rule?", a: "A rule violation may lead to disqualification, refusal of a payout and the blocking, closure or termination of the account. In these cases there is no entitlement to a payout." },
            { q: "Which trading practices are prohibited?", a: "Prohibited practices include scalping, martingale, grid, hedging, latency and tick arbitrage, exploiting platform or price errors, unapproved bots, multi-account abuse and the artificial creation of profitable days. Copy trading is allowed as long as it is transparent, rule-compliant and not used to circumvent the rules." },
            { q: "Can I hold trades overnight or over the weekend?", a: "Yes. Overnight holding and weekend trading are permitted. The trader bears the risk from gaps, slippage, spread widening and swaps, and such positions are fully included in the drawdown monitoring." },
            { q: "Can I trade news?", a: "Within a window of 5 minutes before and 5 minutes after relevant high-impact news, positions may not be opened, closed or modified. Outside this window, news trading is allowed. SAFunded determines relevant news using recognised economic calendars and internal risk assessment." },
            { q: "Can I use Expert Advisors (EAs) or bots?", a: "Automated systems, EAs, bots and scripts are only permitted after prior approval. SAFunded may review the strategy, functionality and risk logic, and may withdraw approval for previously approved systems." },
            { q: "Is there a consistency rule?", a: "No. SAFunded applies no consistency rule — your performance is not capped by single-day or single-trade limits." },
          ],
        },
        {
          title: "Payouts",
          items: [
            { q: "When can I receive a payout?", a: "The following are required cumulatively: compliance with all rules, a minimum duration of 14 calendar days, at least 3 profitable trading days with ≥ 1% profit of the account reference value each, and a successful KYC, AML and anti-fraud review. After a successful review, payouts are processed within 24 hours; SAFunded charges no additional payout fees." },
            { q: "How does the profit split work — and are payouts guaranteed?", a: "The recognised profit share is split 80% (trader) / 20% (SAFunded). However, a payout is not an automatic or guaranteed entitlement: in the event of a rule violation, manipulation or false information, there is no payout entitlement. Trading involves risk." },
          ],
        },
        {
          title: "Verification & KYC",
          items: [
            { q: "Why is KYC necessary?", a: "Before a payout is made, SAFunded verifies your identity (KYC) together with AML and anti-fraud checks. This protects payouts against fraud, ensures payouts reach the legitimate account holder and keeps the platform compliant. KYC is required before your first payout." },
          ],
        },
        {
          title: "Payments & Refunds",
          items: [
            { q: "How do I purchase and pay for an account?", a: "Choose an account size in the Accounts section and complete a secure checkout. Payment is processed via Stripe (card) or Confirmo (crypto); SAFunded does not store your card details. Payments must come from the legitimate card or account holder — third-party payments may be declined." },
            { q: "Is there a refund?", a: "Consumers generally have a 14-day right of withdrawal from the conclusion of the contract. For digital services it expires early if, during the order process, you expressly consent to performance beginning immediately and confirm that you thereby lose your right of withdrawal. A refund may be considered in particular if the service is not provided or a fault attributable to SAFunded occurs; in the event of a rule violation, fraud or chargeback abuse there is no refund entitlement." },
          ],
        },
      ],
    },
    cta: {
      title: "Ready to start with simulated capital?",
      desc: "Pick an account size, complete a secure checkout via Stripe or Confirmo, and trade within clear, published rules.",
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
        payouts: "Payouts",
      },
      copyright: "© 2026 SAFunded. All rights reserved.",
      simulatedNote: "All trading accounts are simulated unless explicitly stated.",
    },
    checkout: {
      starting: "Starting checkout…",
      genericError: "Something went wrong.",
      couldNotStart: "Could not start checkout.",
      title: "Checkout",
      subtitle:
        "Complete your purchase. This is a digital service involving simulated trading.",
      noPlan: {
        title: "No account selected",
        desc: "Please select an account size first to continue with the checkout.",
        cta: "View accounts",
      },
      oneTimeFee: "One-time fee",
      payStripe: "Pay by card (Stripe)",
      payStripeLoading: "Redirecting to Stripe …",
      payValidopay: "Pay with crypto (Validopay)",
      payValidopayLoading: "Redirecting to Validopay …",
      coupon: {
        label: "Discount code",
        placeholder: "Discount code",
        checking: "Checking code …",
        applied: "Discount: –{pct}% (–{amt})",
        appliedAmount: "Discount applied: –{amt}",
        invalid: "Code invalid",
        error: "Could not check the code. Please try again.",
      },
      acceptHint: "Please confirm all four items to unlock payment.",
      footnote:
        "Secure payments via Stripe and Validopay. SAFunded does not store your card details. Trading involves risk.",
      consentTerms: {
        pre: "I accept the ",
        links: [
          { label: "Terms & Conditions", slug: "agb" },
          { label: "Trading Rules", slug: "trading-rules" },
          { label: "Payout Policy", slug: "payout-policy" },
          { label: "Refund Policy", slug: "refund-policy" },
          { label: "Risk Disclosure", slug: "risikohinweise" },
          { label: "KYC Policy", slug: "kyc" },
          { label: "AML & Anti-Fraud Policy", slug: "aml" },
        ],
        conjunction: " and ",
        post: ".",
      },
      consentImmediate: {
        pre: "I expressly agree that SAFunded begins providing the digital service immediately before the withdrawal period expires. I understand that my ",
        withdrawal: "right of withdrawal",
        post: " may expire once the digital service has been fully provided.",
      },
      consentRisk:
        "I understand that SAFunded provides simulated trading accounts, that trading involves risk and that rewards are conditional, performance-based and not guaranteed.",
      consentGeo: {
        pre: "I confirm that I am not resident in or a national of an excluded country (see ",
        section: "Terms § 45",
        post: ").",
      },
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
    common: { showMore: "Mehr anzeigen", showLess: "Weniger anzeigen" },
    header: {
      nav: {
        howItWorks: "So funktioniert’s",
        accounts: "Konten",
        rules: "Regeln",
        payouts: "Auszahlungen",
        reviews: "Bewertungen",
        faq: "FAQ",
        about: "Über uns",
      },
      cta: "Konto erhalten",
      login: "Anmelden",
      menu: "Menü umschalten",
    },
    announcement: {
      badge: "Zeitlich begrenzt",
      text: "Launch Sale — 35 % Rabatt auf alle Programme + neuer Instant-Funding-Launch",
      cta: "Jetzt starten",
      dismiss: "Hinweis schließen",
    },
    promo: {
      badge: "Zeitlich begrenzt",
      headline: "35 % Rabatt auf alle Accounts",
      codeLabel: "Code",
      code: "LAUNCH35",
      copy: "Code kopieren",
      copied: "Kopiert!",
    },
    trustpilot: {
      rated: "Hervorragend",
      score: "4,8",
      outOf: "von 5",
      brand: "Trustpilot",
      count: "127 Trader",
    },
    hero: {
      badge: "Instant-Funded-Konten — jetzt verfügbar",
      titleLead: "Instant Funded Trading-Konten ",
      titleAccent: "ohne Challenge-Phase",
      titleTail: "",
      desc: "Starte mit einem simulierten MT5-Konto, handle innerhalb klarer Regeln und werde nach einer Prüfung für leistungsbasierte Rewards berechtigt.",
      offerLine: "Launch-Angebot: 35% Rabatt mit Code LAUNCH35 — nur für kurze Zeit.",
      priceLine: "Ab $161.85 für 25K simuliertes Kapital.",
      riskNote: "Alle Konten sind simuliert. Rewards unterliegen den Regeln, einer Prüfung und Eignungsvoraussetzungen.",
      ctaStart: "Konten ansehen",
      viewOptions: "So funktioniert’s",
      trustBadges: [
        "Instant-Funded-Konten",
        "Klare Trading-Regeln",
        "Stripe- & Confirmo-Checkout",
        "Leistungsbasierte Rewards",
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
        rewardNote: "Auszahlungsberechtigung vorbehaltlich der Regeln & AGB.",
      },
    },
    trust: {
      eyebrow: "Wofür SAFunded steht",
      statement: "Gemacht für disziplinierte Trader, die klare Regeln, sofortigen simulierten Zugang und transparente Reward-Berechtigung wollen.",
      items: [
        { title: "Transparente Regeln", desc: "Jedes Limit wird offen kommuniziert — keine Überraschungen, keine versteckten Bedingungen." },
        { title: "Sichere Zahlungen", desc: "Karten- und Krypto-Zahlungen laufen über Stripe und Confirmo. Wir speichern keine Kartendaten." },
        { title: "Simuliertes Trading", desc: "Alle Konten sind simuliert. Es wird kein echtes Kundenkapital eingezahlt, gehalten oder gehandelt." },
        { title: "Klare Auszahlungsprüfung", desc: "Reward-Berechtigung und Prüfschritte sind dokumentiert, konsistent und klar offengelegt." },
      ],
    },
    how: {
      eyebrow: "So funktioniert’s",
      title: "Vom Checkout zu deinem ersten Trade",
      sub: "Vier unkomplizierte Schritte. Kein mehrstufiges Evaluierungsverfahren zu Beginn.",
      steps: [
        { title: "Wähle deine Kontogröße", desc: "Wähle ein Instant-Funded-Konto mit 25K, 50K oder 100K — je nach Höhe des simulierten Kapitals, mit dem du handeln möchtest." },
        { title: "Sicheren Checkout abschließen", desc: "Bezahle sicher über Stripe (Karte) oder Confirmo (Krypto). Deine Kartendaten werden über Stripe und Confirmo verarbeitet, nicht von SAFunded." },
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
      exclTaxes: "inkl. Steuern",
      launchPriceLabel: "Launch-Preis",
      regularPriceLabel: "Regulär",
      withCode: "inkl. 35% Launch-Rabatt mit Code LAUNCH35",
      note: "Alle Konten arbeiten in einer simulierten Trading-Umgebung, sofern nicht ausdrücklich anders angegeben. Auszahlungen sind nicht garantiert und unterliegen den AGB. Alle Preise verstehen sich in USD.",
      plans: {
        "25k": { name: "Instant Funded 25K", cta: "25K-Konto starten" },
        "50k": { name: "Instant Funded 50K", cta: "50K-Konto starten" },
        "100k": { name: "Instant Funded 100K", cta: "100K-Konto starten" },
      },
      rulesModal: {
        trigger: "Regeln anzeigen",
        title: "Rules Summary",
        subtitle: "Die wichtigsten Regeln dieses Kontos auf einen Blick.",
        close: "Schließen",
        accountSize: "Account-Größe",
        rows: {
          maxDailyLoss: "Max. Tagesverlust",
          maxOverallLoss: "Max. Gesamtverlust",
          profitSplit: "Profit Split",
          minTradingDays: "Min. Trading-Tage",
        },
        payoutHeading: "Payout-Voraussetzungen",
        payoutReq:
          "Kumulativ: vollständige Regeleinhaltung, eine Mindestlaufzeit von 14 Kalendertagen, mindestens 3 profitable Trading-Tage (je ≥ 1 %) sowie eine erfolgreiche KYC-, AML- und Anti-Fraud-Prüfung.",
        prohibitedHeading: "Verbotene Trading-Praktiken",
        prohibited:
          "Praktiken wie Latenz-/Arbitrage-Missbrauch, das Ausnutzen von Fehlern im simulierten Feed, nicht genehmigte Bots und die künstliche Erzeugung profitabler Tage sind nicht erlaubt. Die vollständige Liste steht in den Trading Rules.",
        simulatedNote:
          "Alle Accounts sind simulierte Trading-Accounts. Es wird kein echtes Kapital bereitgestellt.",
        fullRules: "Vollständige Instant Funded Account Rules lesen",
      },
    },
    trustHighlights: {
      eyebrow: "Warum Trader SAFunded vertrauen",
      title: "Seriös, transparent und sicher aufgebaut",
      items: [
        { icon: "flag", title: "Betreiber aus Deutschland", desc: "SAFunded wird von einem deutschen Unternehmen betrieben. Klare Anbieterinformationen, Impressum und transparente Kommunikation." },
        { icon: "shield", title: "Sichere Zahlung", desc: "Zahlungen erfolgen über sichere Zahlungsanbieter wie Stripe und/oder Confirmo. Keine Speicherung sensibler Zahlungsdaten durch SAFunded." },
        { icon: "check", title: "Klare Payout-Prüfung", desc: "Rewards werden nach einer transparenten Prüfung der Trading-Regeln, der Identität (KYC) und verbotener Trading-Praktiken bearbeitet." },
        { icon: "sim", title: "Simuliertes Trading", desc: "Alle Accounts sind simulierte Trading-Accounts. Es wird kein echtes Kundengeld eingezahlt, gehalten oder gehandelt — Risiken werden klar benannt." },
      ],
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
        { label: "Verbotene Praktiken", value: "Nicht erlaubt", detail: "Praktiken wie Latenz-/Arbitrage-Missbrauch, das Ausnutzen von Fehlern im simulierten Datenfeed, Hedging und die künstliche Erzeugung profitabler Tage sind nicht erlaubt. Copy Trading ist erlaubt, solange es transparent, regelkonform und nicht zur Umgehung der SAFunded-Regeln genutzt wird. Die vollständigen und verbindlichen Definitionen sind in den Trading Rules, den Prohibited Trading Practices und den AGB festgelegt." },
        { label: "Richtlinie für News-Trading", value: "Nicht erlaubt", detail: "Das Eröffnen, Schließen oder Verwalten von Positionen innerhalb eines 5-Minuten-Fensters rund um Nachrichtenereignisse mit hoher Auswirkung ist nicht erlaubt." },
        { label: "Richtlinie für Wochenend-Positionen", value: "Erlaubt", detail: "Positionen dürfen über die Marktschließung am Wochenende gehalten werden." },
        { label: "Richtlinie für Expert Advisors (EA)", value: "Nach Freigabe", detail: "Automatisierte Strategien / Expert Advisors sind erlaubt, sobald sie vom SAFunded-Team freigegeben wurden." },
        { label: "Konsistenzregel", value: "Keine", detail: "SAFunded wendet keine Konsistenzregel an — deine Performance wird nicht durch Tages- oder Einzeltrade-Limits begrenzt." },
      ],
    },
    payouts: {
      eyebrow: "Payouts",
      title: "Auszahlungen für konstante, regelkonforme Performance",
      sub: "Handle innerhalb der Regeln, erziele positive Ergebnisse und du kannst für eine leistungsbasierte Auszahlung berechtigt werden.",
      cards: [
        { title: "Gewinnbeteiligung", desc: "Der Anteil der berechtigten simulierten Performance, der ausgezahlt werden kann. Die genauen Bedingungen sind in der Payout Policy definiert." },
        { title: "Auszahlungszyklus", desc: "Wie oft berechtigte Auszahlungsanträge bearbeitet werden, sobald die Anforderungen erfüllt sind." },
        { title: "Auszahlungsbearbeitung", desc: "Auszahlungen werden nach erfolgreicher Prüfung, KYC/AML-Prüfung und vollständiger Regeleinhaltung innerhalb von 24h bearbeitet." },
        { title: "Erstes Auszahlungsfenster", desc: "Der früheste Zeitpunkt, zu dem ein Konto seine erste Auszahlung beantragen kann." },
      ],
      values: {
        profitSplit: "bis zu 80 %",
        payoutCycle: "2 Wochen",
        reviewProcess: "24 Std.*",
        firstPayoutWindow: "14 Tage nach dem ersten Trade",
      },
      disclaimer:
        "Die Auszahlungsberechtigung unterliegt der Einhaltung der Trading-Regeln von SAFunded und den geltenden AGB. Auszahlungen sind nicht garantiert, es gibt kein garantiertes Einkommen und alle Auszahlungen unterliegen Berechtigungsvoraussetzungen. Trading ist mit Risiken verbunden.",
      footnote: "*Nach erfolgreicher Prüfung, KYC/AML-Prüfung und vollständiger Regeleinhaltung.",
      viewAll: "Alle Auszahlungen ansehen",
    },
    payoutsPage: {
      metaTitle: "Auszahlungen — SAFunded",
      metaDescription:
        "So funktionieren Rewards bei SAFunded: 80 % Gewinnbeteiligung, ein zweiwöchiger Auszahlungszyklus und Bearbeitung innerhalb von 24 Std. nach erfolgreicher Prüfung. Anonymisierte Beispiele für Auszahlungen an SAFunded-Trader.",
      hero: {
        eyebrow: "Auszahlungen & Belohnungen",
        title: "Auszahlungen, denen du vertrauen kannst",
        sub: "Trade simuliertes Kapital. Lass dir echte Rewards auszahlen. Schnelle, sichere Auszahlungen an SAFunded Trader",
        ctaPrimary: "Konten ansehen",
        ctaSecondary: "Payout Policy lesen",
      },
      stats: {
        totalPaid: "Rewards in diesen Beispielen",
        totalPaidValue: "243.493 $",
        payoutsCount: "Dokumentierte Auszahlungen",
        payoutsCountValue: "1.437",
        medianTime: "Median Bearbeitungszeit",
        avgPayout: "Durchschnittliche Auszahlung",
        note: "Die Werte fassen die unten gezeigten anonymisierten Beispiele zusammen. Sie sind illustrativ, beziehen sich auf simulierte Performance und sind kein Versprechen für zukünftige Ergebnisse.",
      },
      certificates: {
        eyebrow: "Auszahlungs-Zertifikate",
        title: "Dokumentierte SAFunded Auszahlungen",
        sub: "Diese anonymisierten Bestätigungen belegen abgeschlossene Auszahlungen, die über das SAFunded Trader-System abgewickelt wurden.",
        certLabel: "Auszahlungs-Zertifikat",
        footnote: "Die gezeigten Auszahlungs-Beispiele entsprechen echten Auszahlungen an SAFunded Trader.",
      },
      activity: {
        eyebrow: "Verifizierte Auszahlungs-Aktivität",
        title: "Aktuelle Trader-Auszahlungen",
        sub: "Ein Auszug der jüngsten Rewards, die für SAFunded-Trader bearbeitet wurden.",
        columns: {
          date: "Datum",
          country: "Land",
          method: "Methode",
          account: "Konto",
          amount: "Betrag",
        },
      },
      methods: { bank: "Banküberweisung", crypto: "Crypto · USDC" },
      countries: {
        de: "Deutschland",
        at: "Österreich",
        ch: "Schweiz",
        nl: "Niederlande",
        es: "Spanien",
        it: "Italien",
      },
      largest: {
        eyebrow: "Grösste Auszahlungen",
        title: "Beispiele über alle Kontogrössen",
        sub: "Anonymisierte Beispiele für Rewards, die an SAFunded-Trader auf verschiedenen Kontogrössen ausgezahlt wurden.",
        payoutLabel: "Auszahlung",
        accountLabel: "Kontogrösse",
        processingLabel: "Bearbeitung",
        hoursSuffix: " Std.",
      },
      flow: {
        eyebrow: "So funktionieren Auszahlungen",
        title: "Vom Antrag bis zur Freigabe",
        steps: [
          {
            title: "Auszahlung beantragen",
            desc: "Stelle deinen Reward-Antrag, sobald du die Mindesthandelstage und alle Regel-Konditionen erfüllt hast.",
          },
          {
            title: "Konto-Prüfung",
            desc: "Dein Konto wird auf vollständige Regeleinhaltung geprüft – gemeinsam mit KYC- und AML-/Anti-Fraud-Prüfungen.",
          },
          {
            title: "Auszahlung freigegeben",
            desc: "Nach erfolgreicher Prüfung wird der Reward innerhalb von 24 Std. über deine gewählte Methode versendet – Banküberweisung oder Crypto.",
          },
        ],
      },
      conditions: {
        eyebrow: "Faire Auszahlungs-Regeln",
        title: "Klare Auszahlungs-Konditionen",
        sub: "SAFunded arbeitet mit klar definierten Auszahlungs-Konditionen – keine versteckten Abzüge und keine Überraschungen. Trader, die sich an die Regeln halten und die Bedingungen erfüllen, können ihre Rewards planmässig beantragen.",
        rows: [
          { label: "Reward-Antrag", value: "Alle 2 Wochen" },
          { label: "Bearbeitungszeit", value: "Innerhalb von 24 Std.*" },
          { label: "Erstes Reward-Fenster", value: "14 Tage nach dem ersten Trade" },
          { label: "Gewinnbeteiligung", value: "Bis zu 80 %" },
          { label: "Versteckte Gebühren", value: "Keine" },
        ],
        cta: "Alle Trading-Regeln ansehen",
      },
      disclaimer:
        "Die gezeigten Auszahlungs-Beispiele entsprechen anonymisierten Rewards, die für SAFunded-Trader bearbeitet wurden, und dienen ausschliesslich der Veranschaulichung. Sämtliches Trading findet in einer simulierten Umgebung statt; angezeigte Kontostände sind fiktive Referenzwerte. Die Auszahlungsberechtigung setzt vollständige Regeleinhaltung, eine Mindestlaufzeit, die erforderlichen profitablen Handelstage sowie eine erfolgreiche KYC-/AML- und Anti-Fraud-Prüfung voraus. Auszahlungen sind nicht garantiert, es gibt kein garantiertes Einkommen und individuelle Ergebnisse sind nicht typisch. Trading ist mit Risiken verbunden.",
      finalCta: {
        title: "Bereit, für eine Auszahlung zu traden?",
        desc: "Starte ein Instant-Funded-Konto, handle innerhalb klarer Regeln und beantrage deinen Reward, sobald du dich qualifizierst.",
        primary: "Konto starten",
        secondary: "Regeln ansehen",
      },
      months: [
        "Jan.",
        "Feb.",
        "März",
        "Apr.",
        "Mai",
        "Juni",
        "Juli",
        "Aug.",
        "Sep.",
        "Okt.",
        "Nov.",
        "Dez.",
      ],
    },
    dashboard: {
      eyebrow: "Plattform-Vorschau",
      title: "Ein klarer Blick auf dein Konto",
      sub: "Behalte Kontostand, Eigenkapital, Risikolimits und Auszahlungsberechtigung auf einen Blick im Auge.",
      accountLabel: "Instant Funded · 100K",
      active: "Aktiv",
      metrics: {
        balance: "Kontostand",
        equity: "Eigenkapital",
        openPl: "Offenes G/V",
        dailyLossLimit: "Tägliches Verlustlimit",
        overallLossLimit: "Gesamtverlustlimit",
        rewardTarget: "Auszahlungsziel",
      },
      rewardTargetValue: "3 Tage × 1 %",
      equityCurve: "Eigenkapitalkurve (beispielhaft)",
      recentTrades: "Letzte Trades",
      recentTradesNote: "Nur beispielhafte Darstellung. Keine typische oder erwartbare Performance.",
      sides: { long: "Long", short: "Short" },
    },
    comparison: {
      eyebrow: "Warum SAFunded",
      title: "Warum SAFunded statt klassischer Challenge?",
      sub: "Überspringe das mehrstufige Evaluationsmodell. SAFunded bietet disziplinierten Tradern sofortigen Zugang zu einem simulierten funded Account mit klaren Regeln und leistungsbasierten Rewards.",
      safundedLabel: "SAFunded Instant",
      traditionalLabel: "Klassische Challenge",
      rows: [
        { point: "Start", safunded: "Sofort mit simuliertem Account", traditional: "Erst Challenge bestehen" },
        { point: "Profit Split", safunded: "Bis zu 80 % Auszahlung", traditional: "Meist erst nach 2 Phasen" },
        { point: "Zeitdruck", safunded: "Kein unnötiger Prüfungsstress", traditional: "Oft enge Regeln & Phasen" },
        { point: "Kapital", safunded: "Simulierter MT5-Account", traditional: "Simulierter Challenge-Account" },
        { point: "Auszahlung", safunded: "Nach Regelprüfung möglich", traditional: "Erst nach Bestehen & Prüfung" },
      ],
      footnote: "Alle Accounts sind simulierte Trading-Accounts — es wird kein echtes Kapital bereitgestellt. Auszahlungen setzen eine erfolgreiche Prüfung, KYC/AML-Checks und vollständige Regeleinhaltung voraus.",
    },
    launch: {
      badge: "Launch-Angebot",
      title: "35% Rabatt auf alle Konten",
      sub: "Nutze beim Checkout den Code LAUNCH35. Starte mit einem 25K simulierten Konto ab $161.85.",
      bullets: [
        "Keine Challenge-Phase",
        "Instant funded MT5-Konten",
        "80% Profit Split",
        "5% Max Daily Loss",
        "10% Max Overall Loss",
        "Auszahlungen werden nach erfolgreicher Prüfung innerhalb von 24h bearbeitet",
      ],
      cta: "Launch-Angebot sichern",
    },
    seo: {
      eyebrow: "Über SAFunded",
      title: "Instant Funded Trading Accounts ohne Challenge-Phase",
      body: "SAFunded bietet Instant funded MT5-Konten mit simuliertem Trading-Kapital für disziplinierte Trader. Statt eine mehrstufige Challenge zu absolvieren, erhalten Trader ab Tag eins Zugang zu einem simulierten funded Account, handeln nach klaren Drawdown-Regeln und können nach Erfüllung der Payout-Voraussetzungen leistungsbasierte Rewards erhalten. Wähle einen 25K, 50K oder 100K funded Account ohne Consistency Rule, mit 80% Profit Split und Auszahlungsbearbeitung innerhalb von 24h nach erfolgreicher Prüfung.",
    },
    reviews: {
      eyebrow: "Was Trader sagen",
      title: "Feedback aus der SAFunded-Community",
      riskNote:
        "Trading ist mit Risiken verbunden. Individuelle Ergebnisse sind nicht typisch und kein Versprechen für zukünftige Leistungen. Auszahlungen sind nicht garantiert.",
      items: [
        {
          name: "Daniel R.",
          role: "Swing-Trader",
          rating: 5,
          quote:
            "Die beste Instant-Funding-Erfahrung, die ich bisher hatte. Jede Regel ist vorab veröffentlicht und der Split war genau wie angekündigt – keine Überraschungen.",
        },
        {
          name: "Mei L.",
          role: "Daytraderin",
          rating: 5,
          quote:
            "Mein Reward-Antrag wurde innerhalb eines Tages geprüft und im nächsten Zyklus ausgezahlt. Der gesamte Ablauf war transparent und fair.",
        },
        {
          name: "Tomás G.",
          role: "Futures-Trader",
          rating: 5,
          quote:
            "Keine Consistency-Regel, die meinen Edge erstickt – das allein hebt SAFunded ab. Ich habe skaliert, sobald ich bewiesen hatte, dass ich innerhalb der Limits handeln kann.",
        },
        {
          name: "Aisha K.",
          role: "Algo-Traderin",
          rating: 5,
          quote:
            "Übersichtliches Dashboard, klare Risikolimits und die EA-Freigabe durch das Team verlief problemlos. Genau die Struktur, die ein systematischer Trader will.",
        },
        {
          name: "Sofia M.",
          role: "Forex-Traderin",
          rating: 3,
          quote:
            "Ich habe meinen maximalen Tagesverlust erreicht und meine Challenge verloren – ehrlich gesagt ärgerlich. Aber die Regeln waren fair und klar erklärt, also versuche ich es erneut.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Fragen, klar beantwortet",
      categories: [
        {
          title: "Konten & Start",
          items: [
            { q: "Was ist ein Instant-Funded-Konto?", a: "Nach dem Kauf wird dir unmittelbar ein simulierter MT5-Account mit einem definierten Account-Referenzwert (25K, 50K oder 100K) bereitgestellt – ohne separate mehrstufige Evaluierung. Du handelst ab dem ersten Tag innerhalb klar definierter Risikoregeln." },
            { q: "Ist das echtes Kapital?", a: "Sämtliches Trading findet in einer simulierten Umgebung statt. Es wird kein echtes Kapital eingezahlt, gehalten oder gehandelt; angezeigte Kontostände sind fiktive Referenzwerte zur Leistungsmessung. SAFunded erbringt keine Anlage- oder Finanzberatung und bietet keine Brokerage-Dienstleistungen an." },
            { q: "Welche Plattform wird genutzt?", a: "Gehandelt wird auf MetaTrader 5 (MT5). Handelbar sind Forex, Edelmetalle (insbesondere Gold), Indizes sowie weitere über MT5 verfügbare und von SAFunded freigegebene CFDs. Einzelaktien sind nicht handelbar. Der Standard-Hebel beträgt 1:100; SAFunded kann den Hebel je nach Instrument, Modell oder Marktbedingungen anpassen." },
            { q: "Wann erhalte ich meinen Kontozugang?", a: "Der Account-Zugang wird nach erfolgreichem Zahlungseingang bereitgestellt – in der Regel unmittelbar bzw. zeitnah. Die Onboarding-Details werden an die mit deinem Kauf verknüpfte E-Mail-Adresse gesendet." },
            { q: "Wer darf ein Konto eröffnen?", a: "Voraussetzung sind Volljährigkeit (mindestens 18 Jahre) und unbeschränkte Geschäftsfähigkeit. Nutzer aus bzw. mit Aufenthalt in der Ukraine, im Iran, in Israel und in Afghanistan dürfen keine Accounts eröffnen oder nutzen; SAFunded kann diese Liste aus rechtlichen oder regulatorischen Gründen erweitern." },
            { q: "Wer betreibt SAFunded und wo finde ich AGB und Regeln?", a: "Betreiber ist AB Digital Management, Hauptstraße 6, 72622 Nürtingen, Deutschland. Die vollständigen AGB, Trading Rules, Instant Funded Account Rules, die Payout Policy, die Datenschutzerklärung, die Risikohinweise und die Widerrufsbelehrung sind im Footer verlinkt." },
          ],
        },
        {
          title: "Trading-Regeln",
          items: [
            { q: "Welche Regeln muss ich einhalten?", a: "Es gelten ein maximaler Tagesverlust von 5 % und ein maximaler Gesamtverlust von 10 % des jeweiligen Account-Referenzwertes. Offene Positionen zählen mit; bereits eine temporäre Überschreitung gilt als Verstoß. Die tägliche Reset-Zeit ist UTC+2 (Berlin-Prag-Zeit)." },
            { q: "Was passiert bei einem Regelverstoß?", a: "Ein Regelverstoß kann zur Disqualifikation, zur Ablehnung einer Auszahlung sowie zur Sperrung, Schließung oder Beendigung des Accounts führen. In diesen Fällen besteht kein Anspruch auf einen Payout." },
            { q: "Welche Trading-Praktiken sind verboten?", a: "Verboten sind u. a. Scalping, Martingale, Grid, Hedging, Latenz- und Tick-Arbitrage, das Ausnutzen von Plattform- oder Preisfehlern, nicht genehmigte Bots, Multi-Account-Abuse sowie die künstliche Erzeugung profitabler Tage. Copy Trading ist erlaubt, solange es transparent und regelkonform ist und nicht der Regelumgehung dient." },
            { q: "Darf ich Trades über Nacht oder über das Wochenende halten?", a: "Ja. Overnight Holding und Weekend Trading sind erlaubt. Das Risiko aus Gaps, Slippage, Spread-Ausweitungen und Swaps trägt der Trader, und solche Positionen werden vollständig in die Drawdown-Überwachung einbezogen." },
            { q: "Darf ich News traden?", a: "Innerhalb eines Fensters von 5 Minuten vor und 5 Minuten nach relevanten High-Impact-News dürfen Positionen weder eröffnet noch geschlossen noch verändert werden. Außerhalb dieses Fensters ist News-Trading zulässig. SAFunded bestimmt relevante News anhand anerkannter Wirtschaftskalender und interner Risikobewertung." },
            { q: "Kann ich Expert Advisors (EAs) oder Bots verwenden?", a: "Automatisierte Systeme, EAs, Bots und Skripte sind nur nach vorheriger Genehmigung erlaubt. SAFunded kann Strategie, Funktionsweise und Risikologik prüfen und bereits genehmigte Systeme nachträglich untersagen." },
            { q: "Gibt es eine Consistency Rule?", a: "Nein. SAFunded wendet keine Consistency Rule an – deine Performance wird nicht durch Einzeltag- oder Einzeltrade-Grenzen gedeckelt." },
          ],
        },
        {
          title: "Auszahlungen",
          items: [
            { q: "Wann kann ich eine Auszahlung erhalten?", a: "Kumulativ erforderlich sind: Einhaltung aller Regeln, eine Mindestlaufzeit von 14 Kalendertagen, mindestens 3 profitable Handelstage mit jeweils ≥ 1 % Gewinn des Account-Referenzwertes sowie eine erfolgreiche KYC-, AML- und Anti-Fraud-Prüfung. Nach erfolgreicher Prüfung werden Payouts innerhalb von 24 Stunden bearbeitet; SAFunded erhebt keine zusätzlichen Payout-Gebühren." },
            { q: "Wie funktioniert die Gewinnbeteiligung – und sind Auszahlungen garantiert?", a: "Der anerkannte Gewinnanteil wird im Verhältnis 80 % (Trader) / 20 % (SAFunded) aufgeteilt. Ein Payout ist jedoch kein automatischer oder garantierter Anspruch: Bei Regelverstoß, Manipulation oder falschen Angaben besteht kein Auszahlungsanspruch. Trading ist mit Risiken verbunden." },
          ],
        },
        {
          title: "Verifizierung & KYC",
          items: [
            { q: "Warum ist KYC notwendig?", a: "Vor einer Auszahlung verifiziert SAFunded deine Identität (KYC) zusammen mit AML- und Anti-Fraud-Prüfungen. Das schützt Auszahlungen vor Betrug, stellt sicher, dass Auszahlungen an den rechtmäßigen Kontoinhaber gehen, und hält die Plattform regelkonform. KYC ist vor deiner ersten Auszahlung erforderlich." },
          ],
        },
        {
          title: "Zahlungen & Rückerstattungen",
          items: [
            { q: "Wie kaufe und bezahle ich ein Konto?", a: "Wähle im Bereich „Konten“ eine Kontogröße und schließe einen sicheren Checkout ab. Die Zahlung erfolgt über Stripe (Karte) oder Confirmo (Krypto); SAFunded speichert keine Kartendaten. Zahlungen müssen vom rechtmäßigen Karten- bzw. Kontoinhaber stammen – Drittzahlungen können abgelehnt werden." },
            { q: "Gibt es eine Rückerstattung?", a: "Verbrauchern steht grundsätzlich ein 14-tägiges Widerrufsrecht ab Vertragsabschluss zu. Bei digitalen Leistungen erlischt es vorzeitig, wenn du im Bestellvorgang ausdrücklich zustimmst, dass die Ausführung sofort beginnt, und bestätigst, dass du dadurch dein Widerrufsrecht verlierst. Eine Rückerstattung kommt insbesondere bei Nichtbereitstellung oder einem von SAFunded zu vertretenden Fehler in Betracht; bei Regelverstoß, Betrug oder Chargeback-Missbrauch besteht kein Erstattungsanspruch." },
          ],
        },
      ],
    },
    cta: {
      title: "Bereit, mit simuliertem Kapital zu starten?",
      desc: "Wähle eine Kontogröße, schließe einen sicheren Checkout über Stripe oder Confirmo ab und handle innerhalb klarer, offen kommunizierter Regeln.",
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
        payouts: "Auszahlungen",
      },
      copyright: "© 2026 SAFunded. Alle Rechte vorbehalten.",
      simulatedNote: "Alle Trading-Konten sind simuliert, sofern nicht ausdrücklich anders angegeben.",
    },
    checkout: {
      starting: "Checkout wird gestartet …",
      genericError: "Etwas ist schiefgelaufen.",
      couldNotStart: "Checkout konnte nicht gestartet werden.",
      title: "Checkout",
      subtitle:
        "Schließe deinen Kauf ab. Es handelt sich um eine digitale Dienstleistung mit simuliertem Trading.",
      noPlan: {
        title: "Kein Konto ausgewählt",
        desc: "Bitte wähle zuerst eine Kontogröße aus, um mit dem Checkout fortzufahren.",
        cta: "Konten ansehen",
      },
      oneTimeFee: "Einmalige Gebühr",
      payStripe: "Mit Karte bezahlen (Stripe)",
      payStripeLoading: "Weiterleitung zu Stripe …",
      payValidopay: "Mit Krypto bezahlen (Validopay)",
      payValidopayLoading: "Weiterleitung zu Validopay …",
      coupon: {
        label: "Rabattcode",
        placeholder: "Rabattcode",
        checking: "Code wird geprüft …",
        applied: "Rabatt: –{pct}% (–{amt})",
        appliedAmount: "Rabatt angewendet: –{amt}",
        invalid: "Code ungültig",
        error: "Code konnte nicht geprüft werden. Bitte erneut versuchen.",
      },
      acceptHint: "Bitte bestätige alle vier Punkte, um die Zahlung freizuschalten.",
      footnote:
        "Sichere Zahlungen über Stripe und Validopay. SAFunded speichert keine Kartendaten. Trading ist mit Risiken verbunden.",
      consentTerms: {
        pre: "Ich akzeptiere die ",
        links: [
          { label: "AGB", slug: "agb" },
          { label: "Trading Rules", slug: "trading-rules" },
          { label: "Payout Policy", slug: "payout-policy" },
          { label: "Refund Policy", slug: "refund-policy" },
          { label: "Risk Disclosure", slug: "risikohinweise" },
          { label: "KYC Policy", slug: "kyc" },
          { label: "AML & Anti-Fraud Policy", slug: "aml" },
        ],
        conjunction: " und ",
        post: ".",
      },
      consentImmediate: {
        pre: "Ich stimme ausdrücklich zu, dass SAFunded vor Ablauf der Widerrufsfrist mit der Bereitstellung der digitalen Leistung beginnt. Mir ist bekannt, dass mein ",
        withdrawal: "Widerrufsrecht",
        post: " erlöschen kann, sobald die digitale Leistung vollständig erbracht wurde.",
      },
      consentRisk:
        "Ich verstehe, dass SAFunded simulierte Trading-Konten bereitstellt, dass Trading Risiken beinhaltet und dass Rewards bedingt, leistungsbasiert und nicht garantiert sind.",
      consentGeo: {
        pre: "Ich bestätige, dass ich nicht in einem ausgeschlossenen Land ansässig oder Staatsangehöriger eines solchen bin (siehe ",
        section: "AGB § 45",
        post: ").",
      },
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
