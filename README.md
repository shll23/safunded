# SAFunded — Landing Page

A production-ready Next.js (App Router) + Tailwind landing page for an Instant
Funded simulated-trading product, with Stripe Checkout wired up and ready for
your real keys.

---

## 1. Project structure

```
safunded/
├── app/
│   ├── layout.tsx                         # Fonts, metadata, <body>
│   ├── globals.css                        # Tailwind layers + glass/grid utilities
│   ├── page.tsx                           # Landing page (assembles all sections)
│   ├── success/page.tsx                   # Shown after a completed payment
│   ├── cancel/page.tsx                    # Shown when checkout is abandoned
│   └── api/create-checkout-session/route.ts  # Stripe Checkout Session endpoint
├── components/
│   ├── Header.tsx          # Sticky glassmorphism nav + Logo
│   ├── Hero.tsx            # Headline, CTAs, trust badges, balance mockup
│   ├── TrustBar.tsx        # Honest trust elements (NO fake testimonials)
│   ├── HowItWorks.tsx      # 4 steps + shared SectionHeading
│   ├── Pricing.tsx         # 3 plan cards (driven by lib/plans.ts)
│   ├── Rules.tsx           # Transparent rules table
│   ├── Payouts.tsx         # Rewards info (cautious wording)
│   ├── DashboardPreview.tsx# Visual trading-terminal mockup
│   ├── Comparison.tsx      # "Why SAFunded"
│   ├── FAQ.tsx             # Accordion (driven by lib/plans.ts)
│   ├── CTA.tsx             # Closing call-to-action band
│   ├── Disclaimer.tsx      # Legal/risk disclaimer box
│   ├── Footer.tsx          # Links + copyright
│   └── CheckoutButton.tsx  # Client button: loading/disabled/error states
├── lib/
│   ├── plans.ts            # ⭐ SINGLE SOURCE OF TRUTH: plans, rules, FAQs, copy
│   └── stripe.ts           # Server-side Stripe client
├── .env.example            # Copy to .env.local and fill in
├── package.json
├── tailwind.config.ts      # Design tokens (palette, fonts, shadows)
├── postcss.config.js
├── next.config.js
└── tsconfig.json
```

## 2. Setup

```bash
npm install
cp .env.example .env.local   # then fill in your real values
npm run dev                  # http://localhost:3000
```

## 3. Stripe — where to put your keys

1. In the **Stripe Dashboard**, create three Products, each with a one-time
   **Price** (25K / 50K / 100K). Copy each Price ID (`price_...`).
2. In `.env.local`, set:
   - `STRIPE_SECRET_KEY` — your secret key (`sk_test_...` / `sk_live_...`)
   - `STRIPE_25K_PRICE_ID`, `STRIPE_50K_PRICE_ID`, `STRIPE_100K_PRICE_ID`
   - `NEXT_PUBLIC_APP_URL` — your site's base URL
3. That's it. The flow is already wired:
   - User clicks a plan button → `POST /api/create-checkout-session { planId }`
   - The route validates the plan, resolves the matching Price ID, creates a
     Checkout Session, and returns `session.url`.
   - The button redirects the browser to Stripe.
   - Stripe returns the user to `/success` or `/cancel`.

**Recommended next step (not included):** add a Stripe **webhook** to fulfil
the order server-side (e.g. create the account / send onboarding email) on
`checkout.session.completed`, rather than trusting the redirect alone.

## 4. Branding concept (quick reference)

- **Logo:** placeholder "SA" mark in `Header.tsx` (`Logo`). Swap for your final SVG.
- **Palette** (`tailwind.config.ts`): `base` deep navy `#070B16`, `surface`
  `#0E1424`, `accent` emerald `#2DD4A7`, `gold` `#CBA35C`, plus muted/faint greys.
- **Typography:** Space Grotesk (display), Inter (body), JetBrains Mono
  (financial figures). Monospace numerals are the recurring "terminal" signature.
- **Buttons:** primary = solid emerald with soft glow; ghost = bordered glass.
- **Cards:** subtle white-on-dark glass surfaces, rounded-2xl, hairline borders.
- **Trust elements:** transparent rules, Stripe security, honest risk language.
- **Tone:** calm, precise, FinTech — no hype, no get-rich-quick language.

---

## 5. ⚠️ Replace before launch — placeholder checklist

### Prices, rules & payout values — `lib/plans.ts`
Search the file for `EDIT-ME` and `placeholder`:
- [ ] `plans[].price` / `priceValue` — display prices (real charge = Stripe Price ID)
- [ ] `plans[].profitSplit` — confirm the split you actually offer
- [ ] `plans[].maxDailyLoss`, `maxOverallLoss`, `minTradingDays`, `payoutCycle`
- [ ] `rules[]` — every `value: "placeholder"` and policy `detail`
- [ ] `payoutInfo` — `payoutCycle`, `reviewProcess`, `firstPayoutWindow`
- [ ] `faqs[]` — answers marked `(EDIT-ME)` (EA / news / weekend / delivery / upgrades)

### Legal text (have a lawyer review) — marked `LEGAL`
- [ ] `components/Disclaimer.tsx` — risk disclaimer wording
- [ ] FAQ answers about simulated capital, profit split, breaches
- [ ] `components/Footer.tsx` — link **Terms & Conditions**, **Privacy Policy**,
      **Risk Disclosure**, **Contact** to your real documents (currently `#`)

### Branding & metadata
- [ ] `components/Header.tsx` → `Logo` — real logo
- [ ] `app/layout.tsx` — SEO title/description
- [ ] `app/success/page.tsx` — real onboarding steps + dashboard URL
- [ ] Favicon / social share image (add as needed)

### Trust / social proof
- [ ] `components/TrustBar.tsx` — the dashed "Testimonial placeholder" block:
      replace with **verified** trader feedback, or remove it. Do not add
      fabricated reviews.

### Stripe
- [ ] All values in `.env.local` (see section 3) — never commit real keys.

---

### Notes on responsible copy (kept throughout)
The copy deliberately uses: *simulated capital*, *performance-based rewards*,
*may become eligible*, *subject to Terms & Conditions*, *trading involves risk*.
It avoids: *guaranteed payouts/profit*, *risk-free*, *get rich*, and similar.
Keep it that way as you edit.
