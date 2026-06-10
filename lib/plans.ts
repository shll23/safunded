/**
 * ============================================================================
 *  SAFunded — CENTRAL CONFIG
 * ============================================================================
 *  This is the single source of truth for plans, rules, payouts and copy that
 *  you are likely to change often. Edit values here and the whole site updates.
 *
 *  >>> EDIT-ME markers below flag every value you should review before launch.
 *  >>> LEGAL markers flag wording that should be checked by your lawyer.
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
  priceValue: number; // used for display only; real charge comes from Stripe Price ID
  priceEnvKey: string; // name of the env var holding the Stripe Price ID
  cta: string;
  mostPopular?: boolean;
  highlights: string[];
}

/**
 * EDIT-ME: All prices, splits and risk limits below are PLACEHOLDERS.
 * Replace them with your finalised, lawyer-approved figures before launch.
 * The actual amount charged is controlled by the Stripe Price ID (see .env),
 * NOT by `price`/`priceValue` here — those are display only.
 */
export const plans: Plan[] = [
  {
    id: "25k",
    name: "Instant Funded 25K",
    simulatedCapital: "$25,000",
    capitalValue: 25000,
    accountType: "Instant Funded",
    price: "$249", // EDIT-ME display price
    priceValue: 249,
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
    price: "$399", // EDIT-ME
    priceValue: 399,
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
    price: "$699", // EDIT-ME
    priceValue: 699,
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
 * EDIT-ME / LEGAL: Trading rules. These are PLACEHOLDERS.
 * Replace `value` with your finalised limits and `detail` with policy text.
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
      "Practices such as latency/arbitrage abuse, copy-trading across accounts, or exploiting simulated feed errors are not permitted. (LEGAL: define exhaustively in T&Cs.)",
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
    a: "An Instant Funded Account gives you access to a simulated trading environment with a defined amount of simulated capital, without a separate multi-step evaluation. You trade within clearly defined risk rules from day one.",
  },
  {
    q: "Is the capital real or simulated?",
    a: "All trading takes place in a simulated environment using simulated capital, unless explicitly stated otherwise. You are not trading live client funds and SAFunded does not provide brokerage services. (LEGAL: confirm wording matches your operating model.)",
  },
  {
    q: "How do I purchase an account?",
    a: "Choose an account size in the Accounts section and complete a secure checkout. Payment is processed by Stripe; SAFunded does not store your card details.",
  },
  {
    q: "How does Stripe Checkout work?",
    a: "When you select an account, you are redirected to Stripe's hosted checkout page to complete payment securely. After payment, you are returned to SAFunded.",
  },
  {
    q: "When do I receive my account access?",
    a: "After a successful payment, onboarding details are sent to the email associated with your purchase. (EDIT-ME: state your real delivery timeframe.)",
  },
  {
    q: "What are the risk rules?",
    a: "Each account has a maximum daily loss, a maximum overall loss, and other defined parameters. The full, current rules are listed in the Rules section and the Terms & Conditions.",
  },
  {
    q: "How does the profit split work?",
    a: "Eligible performance-based rewards may be shared according to the stated profit split (e.g. up to 80%). The exact split and conditions are defined in the payout policy and Terms & Conditions. (LEGAL.)",
  },
  {
    q: "Are payouts guaranteed?",
    a: "No. Payouts are not guaranteed. Any performance-based reward is subject to rule compliance, eligibility requirements, and the applicable Terms & Conditions. Trading involves risk.",
  },
  {
    q: "Can I use Expert Advisors?",
    a: "This is governed by the Expert Advisors policy. (EDIT-ME: state your policy.)",
  },
  {
    q: "Can I trade news?",
    a: "This is governed by the News Trading policy. (EDIT-ME: state your policy.)",
  },
  {
    q: "Can I hold trades overnight or over the weekend?",
    a: "This is governed by the Weekend Holding policy. (EDIT-ME: state your policy.)",
  },
  {
    q: "What happens if I breach a rule?",
    a: "A breach of a risk rule may result in the account becoming ineligible for rewards or being closed, as defined in the Terms & Conditions. (LEGAL: state your exact consequence policy.)",
  },
  {
    q: "Can I upgrade from 25K to 50K or 100K?",
    a: "Account sizes are purchased individually. (EDIT-ME: describe any upgrade or scaling path you offer, if applicable.)",
  },
  {
    q: "Where can I read the Terms & Conditions?",
    a: "The full Terms & Conditions, Privacy Policy and Risk Disclosure are linked in the footer. (EDIT-ME: link these to your real documents before launch.)",
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
 * ⚠️ PLACEHOLDER / SAMPLE CONTENT — NOT REAL CUSTOMER REVIEWS.
 *
 * These entries exist only to demonstrate the testimonials layout. They are
 * NOT verified trader feedback. Before launch you MUST replace them with real,
 * consented, verifiable reviews — publishing fabricated testimonials for a
 * financial product is a legal and regulatory risk (e.g. FTC endorsement
 * rules). Until then the section renders with a visible "sample" disclaimer.
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

