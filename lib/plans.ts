/**
 * ============================================================================
 *  SAFunded — CENTRAL CONFIG
 * ============================================================================
 *  Single source of truth for plans, rules, payouts and the marketing copy
 *  that changes most often. Edit values here and the whole site updates.
 *
 *  Account prices are quoted in USD. `price`/`priceValue` are the regular list
 *  price; `launchPrice`/`launchPriceValue` are the discounted launch price
 *  (35% off via code LAUNCH35). The amount actually charged is controlled by
 *  the Stripe Price ID (see .env) and the promotion code redeemed at checkout —
 *  the values here are for display only.
 * ============================================================================
 */

export type PlanId = "25k" | "50k" | "100k";

export interface Plan {
  id: PlanId;
  name: string;
  simulatedCapital: string;
  capitalValue: number;
  accountType: string;
  price: string;
  priceValue: number; // regular USD list price (display only)
  launchPrice: string; // discounted launch price, USD (display only)
  launchPriceValue: number;
  priceEnvKey: string; // name of the env var holding the Stripe Price ID
  cta: string;
  mostPopular?: boolean;
  highlights: string[];
}

/**
 * Launch promotion: 35% off the regular price with code LAUNCH35.
 * Launch prices below are the regular price × 0.65.
 */
export const plans: Plan[] = [
  {
    id: "25k",
    name: "Instant Funded 25K",
    simulatedCapital: "$25,000",
    capitalValue: 25000,
    accountType: "Instant Funded",
    price: "$249",
    priceValue: 249,
    launchPrice: "$161.85",
    launchPriceValue: 161.85,
    priceEnvKey: "STRIPE_25K_PRICE_ID",
    cta: "Start 25K Account",
    highlights: [
      "Instant simulated funding",
      "Clear, fixed risk rules",
      "Performance-based reward eligibility",
    ],
  },
  {
    id: "50k",
    name: "Instant Funded 50K",
    simulatedCapital: "$50,000",
    capitalValue: 50000,
    accountType: "Instant Funded",
    price: "$399",
    priceValue: 399,
    launchPrice: "$259.35",
    launchPriceValue: 259.35,
    priceEnvKey: "STRIPE_50K_PRICE_ID",
    cta: "Start 50K Account",
    mostPopular: true,
    highlights: [
      "Instant simulated funding",
      "Clear, fixed risk rules",
      "Performance-based reward eligibility",
    ],
  },
  {
    id: "100k",
    name: "Instant Funded 100K",
    simulatedCapital: "$100,000",
    capitalValue: 100000,
    accountType: "Instant Funded",
    price: "$699",
    priceValue: 699,
    launchPrice: "$454.35",
    launchPriceValue: 454.35,
    priceEnvKey: "STRIPE_100K_PRICE_ID",
    cta: "Start 100K Account",
    highlights: [
      "Instant simulated funding",
      "Clear, fixed risk rules",
      "Performance-based reward eligibility",
    ],
  },
];

export const getPlan = (id: string): Plan | undefined =>
  plans.find((p) => p.id === id);

/**
 * Trading rules shown on the marketing site. The full, binding rules live in
 * the Trading Rules, Prohibited Trading Practices and Terms & Conditions.
 */
export interface RuleItem {
  label: string;
  value: string;
  detail: string;
}

export const rules: RuleItem[] = [
  {
    label: "Max Daily Loss",
    value: "5%",
    detail:
      "The maximum simulated loss permitted within a single trading day, measured against the defined balance/equity reference.",
  },
  {
    label: "Max Overall Loss",
    value: "10%",
    detail:
      "The maximum total simulated drawdown permitted on the account over its lifetime.",
  },
  {
    label: "Minimum Trading Days",
    value: "3 days",
    detail:
      "The minimum number of active trading days required before a reward request may be reviewed.",
  },
  {
    label: "Prohibited Practices",
    value: "Not permitted",
    detail:
      "Practices such as latency/arbitrage abuse, exploiting simulated feed errors, hedging and the artificial creation of profitable days are not permitted. Copy Trading is allowed as long as it is transparent, rule-compliant and not used to bypass SAFunded rules. The complete and binding definitions are set out in the Trading Rules, Prohibited Trading Practices and Terms & Conditions.",
  },
  {
    label: "News Trading Policy",
    value: "Not permitted",
    detail:
      "Opening, closing or managing positions within a 5-minute window around high-impact news events is not permitted.",
  },
  {
    label: "Weekend Holding Policy",
    value: "Allowed",
    detail:
      "Positions may be held over the weekend market closure.",
  },
  {
    label: "Expert Advisors (EA) Policy",
    value: "On approval",
    detail:
      "Automated strategies / Expert Advisors are permitted once approved by the SAFunded team.",
  },
  {
    label: "Consistency Rule",
    value: "None",
    detail:
      "SAFunded applies no consistency rule. Your performance is not capped by single-day or single-trade limits.",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What is an Instant Funded Account?",
    a: "After purchase, a simulated MT5 account with a defined account reference value (25K, 50K or 100K) is provided to you immediately — with no separate multi-step evaluation. You trade within clearly defined risk rules from day one.",
  },
  {
    q: "Is the capital real or simulated?",
    a: "All trading takes place in a simulated environment. No real capital is deposited, held or traded; displayed balances are notional reference values used to measure performance. SAFunded does not provide investment or financial advice and does not offer brokerage services.",
  },
  {
    q: "Which instruments can I trade, and what leverage applies?",
    a: "You can trade Forex, precious metals (in particular gold), indices and other CFDs available via MT5 and approved by SAFunded. Single stocks are not tradable. The standard leverage is 1:100; SAFunded may adjust leverage depending on the instrument, account model or market conditions.",
  },
  {
    q: "How do I purchase and pay for an account?",
    a: "Choose an account size in the Accounts section and complete a secure checkout. Payment is processed via Stripe (card) or Confirmo (crypto); SAFunded does not store your card details. Payments must come from the legitimate card or account holder — third-party payments may be declined.",
  },
  {
    q: "When do I receive my account access?",
    a: "Account access is provided after successful payment — generally immediately or shortly thereafter. Onboarding details are sent to the email address associated with your purchase.",
  },
  {
    q: "What are the risk rules?",
    a: "A maximum daily loss of 5% and a maximum overall loss of 10% of the respective account reference value apply. Open positions count, and even a temporary breach of a limit is treated as a violation. The daily reset time is UTC+2 (Berlin-Prague time).",
  },
  {
    q: "Can I hold trades overnight or over the weekend?",
    a: "Yes. Overnight holding and weekend trading are permitted. The trader bears the risk from gaps, slippage, spread widening and swaps, and such positions are fully included in the drawdown monitoring.",
  },
  {
    q: "Can I trade news?",
    a: "Within a window of 5 minutes before and 5 minutes after relevant high-impact news, positions may not be opened, closed or modified. Outside this window, news trading is allowed. SAFunded determines relevant news using recognised economic calendars and internal risk assessment.",
  },
  {
    q: "Can I use Expert Advisors (EAs) or bots?",
    a: "Automated systems, EAs, bots and scripts are only permitted after prior approval. SAFunded may review the strategy, functionality and risk logic, and may withdraw approval for previously approved systems.",
  },
  {
    q: "Which trading practices are prohibited?",
    a: "Prohibited practices include scalping, martingale, grid, hedging, latency and tick arbitrage, exploiting platform or price errors, unapproved bots, multi-account abuse and the artificial creation of profitable days. Copy trading is allowed as long as it is transparent, rule-compliant and not used to circumvent the rules.",
  },
  {
    q: "Is there a consistency rule?",
    a: "No. SAFunded applies no consistency rule — your performance is not capped by single-day or single-trade limits.",
  },
  {
    q: "What are the requirements for a payout?",
    a: "The following are required cumulatively: compliance with all rules, a minimum duration of 14 calendar days, at least 3 profitable trading days with ≥ 1% profit of the account reference value each, and a successful KYC, AML and anti-fraud review. After a successful review, payouts are processed within 24 hours; SAFunded charges no additional payout fees.",
  },
  {
    q: "How does the profit split work — and are payouts guaranteed?",
    a: "The recognised profit share is split 80% (trader) / 20% (SAFunded). However, a payout is not an automatic or guaranteed entitlement: in the event of a rule violation, manipulation or false information, there is no payout entitlement. Trading involves risk.",
  },
  {
    q: "What happens if I breach a rule?",
    a: "A rule violation may lead to disqualification, refusal of a payout and the blocking, closure or termination of the account. In these cases there is no entitlement to a payout.",
  },
  {
    q: "Can I withdraw from the contract or get a refund?",
    a: "Consumers generally have a 14-day right of withdrawal from the conclusion of the contract. For digital services it expires early if, during the order process, you expressly consent to performance beginning immediately and confirm that you thereby lose your right of withdrawal. A refund may be considered in particular if the service is not provided or a fault attributable to SAFunded occurs; in the event of a rule violation, fraud or chargeback abuse there is no refund entitlement.",
  },
  {
    q: "Who can open an account?",
    a: "Opening an account requires that you are of legal age (at least 18) and have full legal capacity. Users from or residing in Ukraine, Iran, Israel and Afghanistan may not open or use accounts; SAFunded may extend this list for legal or regulatory reasons.",
  },
  {
    q: "Who operates SAFunded, and where can I read the terms and rules?",
    a: "The operator is AB Digital Management, Hauptstraße 6, 72622 Nürtingen, Germany. The full Terms & Conditions, Trading Rules, Instant Funded Account Rules, Payout Policy, Privacy Policy, Risk Disclosure and Right of Withdrawal are linked in the footer.",
  },
];

export const comparisonPoints: string[] = [
  "Instant account access — no multi-step gatekeeping to begin",
  "Simple, fixed account structure",
  "Transparent, published trading rules",
  "Secure checkout via Stripe",
  "Built for disciplined, serious traders",
  "Scalable account sizes (25K / 50K / 100K)",
];

/**
 * Customer testimonials shown in the reviews section.
 */
export interface Testimonial {
  name: string;
  role: string;
  rating: number; // 1–5 stars
  quote: string;
}

export const testimonials: Testimonial[] = [
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
];

