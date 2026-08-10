# JKESS Website AI Handoff

> Current operational handoff for another AI or engineer.
> Last audited: 2026-08-10.
> Read this file and `AGENTS.md` before changing the site.

## 1. Production Snapshot

| Item | Current value |
| --- | --- |
| Live site | https://www.jkesstech.com/ |
| GitHub | https://github.com/bigelephant-code/jkess-website.git |
| Production branch | `main` |
| Hosting | Vercel; a push to `main` starts production deployment |
| Current production commit | `06fc0f7 Enable PayPal Complete Payments checkout` |
| Framework | Next.js 16.2.9 App Router, React 19.2.4, TypeScript |
| Styling and motion | Tailwind CSS 4, Framer Motion, Lucide icons |
| Languages | 26 locales; English is the default |
| Commerce | PayPal Complete Payments, server-created and server-captured orders |
| Persistence | Upstash Redis or Vercel KV-compatible REST variables |
| Transactional email | Resend |
| Analytics | Google Analytics; default public ID is `G-EKD19QGSMC` |
| Search | Google Search Console, Bing Webmaster Tools, sitemap, IndexNow |
| Sales email | `zhou@jkess.com` |
| Phone / WhatsApp | `+86 131 6282 8868` |

Company and brand:

- Website brand: JKESS.
- Operating company: JKBMS Electronic Technology Co.,Ltd.
- Public product scope: battery enclosure kits, high-voltage BMS control hardware,
  and configured commercial and industrial energy storage cabinets.

## 2. Local Workspace Warning

There are two relevant local folders on this computer.

### Current clean production-aligned worktree

```text
D:\CodexWorkspace\jkess-paypal-update
```

- This worktree was aligned with `origin/main` at audit time.
- Its local branch is `codex/paypal-complete-payments` and it points at the same
  commit as production `main` before this handoff update.
- When publishing from this worktree, use `git push origin HEAD:main` after all
  checks and after confirming that `origin/main` has not advanced.

### Older dirty local repository

```text
D:\CodexWorkspace\jkess-website
```

At audit time this folder was four commits behind `origin/main` and contained
tracked modifications plus untracked image-SEO and maintenance files. It is not a
safe production source until those local changes are reviewed and reconciled.

Do not run `git reset --hard`, overwrite this folder with GitHub, delete its
untracked files, or pull over the dirty tree. Those files may contain unpublished
work from an earlier AI.

For a new takeover, either use the clean worktree above or create a fresh clone on
the D drive. Treat `origin/main` as the production source of truth.

## 3. First Actions For A New AI

```powershell
Set-Location 'D:\CodexWorkspace\jkess-paypal-update'
Get-Content -Raw '.\WEBSITE-AI-HANDOFF.md'
Get-Content -Raw '.\AGENTS.md'
git fetch origin
git status --short --branch
git rev-list --left-right --count HEAD...origin/main
git log -8 --oneline --decorate
```

Operating rules:

1. Inspect before editing and preserve all work not created for the current task.
2. Never expose `.env.local`, passwords, API keys, PayPal secrets, Redis tokens,
   email credentials, or verification secrets in chat, logs, screenshots, or Git.
3. Stage only task files. Do not use a blind `git add .` in a dirty tree.
4. Run `npm run lint`, `npm run build`, and `git diff --check` before publishing.
5. Fetch immediately before pushing and do not force-push shared history.
6. After deployment, verify the live page and the relevant API or feed.

## 4. Repository Map

```text
src/app/[lang]/                 Localized App Router pages
src/app/[lang]/[...seoPath]/    Programmatic SEO landing pages
src/app/api/                    PayPal, email, inventory, quote, IndexNow APIs
src/components/                 Shared UI and animated sections
src/context/CartContext.tsx     Cart and inventory client state
src/i18n/                       Locale definitions, provider, overrides
src/lib/                        Products, SEO, commerce, policies, integrations
src/sanity/                     Sanity schemas and unused query scaffolding
messages/*.json                 Flat translation files for all 26 locales
public/images/                  Website and product images
public/downloads/               Manuals, specifications, and downloads
documents/                      Search-platform instructions and source documents
next.config.ts                  Image settings and security/cache headers
```

Main commands:

```powershell
npm ci
npm run dev
npm run lint
npm run build
npm start
```

## 5. Real Sources Of Truth

### Products, prices, variants, and image arrays

```text
src/lib/products.ts
```

This file controls product names, slugs, descriptions, specifications, included and
excluded scope, gallery images, detail images, direct-sale versus inquiry mode,
variants, prices, and product display order.

Related files:

| Purpose | File |
| --- | --- |
| Localized product copy | `src/lib/product-localizations.ts` |
| Commerce helpers | `src/lib/commerce.ts` |
| Initial managed inventory | `src/lib/inventory-catalog.ts` |
| Runtime order and stock persistence | `src/lib/order-store.ts` |
| Shipping countries and rates | `src/lib/shipping-zones.ts` |
| Product list UI | `src/app/[lang]/products/` |
| Product detail UI | `src/app/[lang]/products/[slug]/` |
| Product structured data | `src/lib/structured-data.ts` |
| Google Merchant feed | `src/app/merchant-feed.xml/route.ts` |

### Company facts

```text
src/lib/company-profile.ts
```

Current shared facts include team start in 2017, company establishment in 2023,
JKESS launch in 2024, a 70,000 square-meter factory, 700+ employees, 100+ R&D
professionals, 2.1 GWh annual capacity, 200+ countries and regions served, and
three overseas warehouses.

### Contact information

The shared profile contains the sales email, but several components, policies,
email modules, and structured-data objects still contain literal contact values.
Before changing contact information, run:

```powershell
rg -n 'zhou@jkess\.com|131 6282 8868|jkesstech\.com' src messages
```

Public contact assets:

```text
public/images/whatsapp-qr.png
public/images/wechat-qr.png
```

### Home page

| Section | Main file |
| --- | --- |
| Composition and metadata | `src/app/[lang]/page.tsx` |
| Hero | `src/components/HeroSection.tsx` |
| Statistics | `src/components/StatsSection.tsx` |
| Development History | `src/components/Timeline.tsx` |
| Solutions and Scenarios | `src/components/SolutionsShowcase.tsx` |
| Products | `src/components/ProductSection.tsx` |
| Contact | `src/components/ContactSection.tsx` |

### About page

```text
src/app/[lang]/about/page.tsx
src/app/[lang]/about/client.tsx
src/components/DynamicGlobe.tsx
src/components/GlobalDealerRecruitment.tsx
```

The globe contains China hubs for Chengdu, Shandong, and Shenzhen, plus overseas
warehouse hubs. Global distributor recruitment is on the About page.

### Navigation and footer

```text
src/components/Navbar.tsx
src/components/NavbarMegaMenuV2.tsx
src/lib/navigation-menu.ts
src/lib/localized-ui.ts
src/components/Footer.tsx
src/app/navbar-right-balance.css
messages/*.json
```

Navigation text is split across translation JSON and code helpers. Test desktop,
mobile, submenu labels, language selector, cart, quote button, and macOS Safari.

### Downloads, news, SEO pages, and policies

| Area | Source |
| --- | --- |
| Downloads | `src/lib/downloads.ts`, `src/app/[lang]/downloads/`, `public/downloads/` |
| News | `src/lib/news.ts`, `src/app/[lang]/news/`, `src/components/NewsOwnedInsights.tsx` |
| Technical guides | `src/lib/technical-guides.ts`, `src/components/TechnicalGuideArticle.tsx` |
| SEO landing pages | `src/lib/non-brand-pages.ts`, `src/app/[lang]/[...seoPath]/page.tsx` |
| Specification pages | `src/lib/specification-pages.ts`, `src/components/SpecificationLandingPage.tsx` |
| Policies | `src/lib/policies.ts`, `src/components/PolicyPage.tsx` |

## 6. Current Product Catalog

Display order is controlled in `src/lib/products.ts`.

| Product | Slug | Mode | Current options |
| --- | --- | --- | --- |
| Battery Kit (With Caster) | `battery-kit` | Direct purchase | Enclosure + LCD + BMS: $400; Enclosure Only: $300 |
| 6U Battery Kit | `6u-battery-kit` | Direct purchase | Enclosure + LCD + BMS: $380; Enclosure Only: $280 |
| High Voltage Kit | `high-voltage-kit` | Direct purchase | 100A master: $1,020; 100A slave: $390; 200A master: $1,180; 200A slave: $420 |
| C&I High Voltage ESS Cabinet | `tness-ci-ess-cabinet` | Inquiry only | Final scope and price come from a written quotation |

Important product boundaries:

- Battery cells are not included with either battery enclosure kit.
- A High Voltage Kit option is one selected master or slave control box, not a
  complete battery pack or complete high-voltage system.
- The C&I cabinet is configured to order and must not expose a fixed purchase price,
  checkout button, or customer-review claim that implies standard retail supply.

After a product change, verify the product page, cart, checkout, Product structured
data, Merchant feed, translations, images, and sitemap.

## 7. Multilingual System

Supported locale codes:

```text
en de fr es it nl pt sv da fi pl cs sk hu ro bg el hr sl lt lv et ru uk fa tr
```

English is unprefixed. Other languages use a locale prefix such as `/de/about`.
Persian (`fa`) is RTL.

Translation sources:

```text
messages/*.json
src/i18n/config.ts
src/i18n/message-overrides.ts
src/lib/localized-ui.ts
src/lib/product-localizations.ts
```

Translation workflow:

1. Add or revise the English key.
2. Translate that key in every supported locale.
3. Check code-based localized helpers and product localizations.
4. Test English, German, French, Polish or another Slavic language, and Persian RTL.
5. Search visible English strings in non-English pages before publishing.

`node scripts/sync-messages.mjs` synchronizes key structure only. It can copy English
fallback text into other locale files; it does not create genuine translations.

All published locales are generally indexable. The authorized-distributor page is
currently limited to English and German in `src/lib/seo.ts`.

## 8. Sanity CMS Status

Sanity configuration and schemas exist:

```text
sanity.config.ts
src/sanity/schemaTypes.ts
src/sanity/schemas/
src/sanity/lib/client.ts
src/sanity/lib/queries.ts
```

Schemas include hero, product, about, site statistics, and footer. However, the
current storefront pages do not execute the Sanity queries, and the App Router does
not currently contain a complete Studio page implementation. Editing Sanity content
does not reliably change the live website.

Treat code as the active content source unless a future task explicitly reconnects
Sanity and verifies Studio routing, preview, fallback, cache behavior, and deployment.

## 9. Checkout, PayPal, Shipping, Orders, And Stock

### Checkout flow

```text
src/app/[lang]/checkout/client.tsx
src/lib/paypal-checkout.ts
src/lib/paypal-server.ts
src/app/api/paypal/orders/route.ts
src/app/api/paypal/orders/[orderId]/capture/route.ts
src/app/api/paypal/webhook/route.ts
```

The current integration uses PayPal Complete Payments. The browser loads PayPal's
hosted buttons and asks PayPal to display eligible PayPal, debit/credit card, Pay
Later, Venmo, and local methods. Eligibility depends on buyer country, currency,
device, account, and PayPal approval. Apple Pay and Google Pay require separate
wallet and domain onboarding and are not part of the current integration.

Security behavior:

- The server rebuilds prices from `src/lib/products.ts`.
- The server calculates shipping from `src/lib/shipping-zones.ts`.
- PayPal orders are created and captured on the server.
- Order reference, amount, currency, item SKUs, quantities, unit prices, and shipping
  country are checked before capture.
- Do not move order creation or capture back into browser-only code.

### Shipping rules

- EU delivery countries: free standard shipping in direct checkout.
- Listed United States, Southeast Asia, Japan, South Korea, and Middle East
  destinations: a flat $150 per order.
- All other destinations: written shipping quotation required; direct checkout off.

Change shipping only in `src/lib/shipping-zones.ts`, then verify checkout copy,
policies, structured data, quote forms, and translations.

### Orders, inventory, and emails

```text
src/lib/order-store.ts
src/lib/inventory-catalog.ts
src/app/api/inventory/route.ts
src/app/api/order-email/route.ts
src/components/PaidOrderEmailBridge.tsx
```

Runtime order records and managed inventory use Redis. Values in
`src/lib/inventory-catalog.ts` are initialization/fallback values, not proof of current
physical stock. Payment webhooks use idempotency locks and decrement managed stock
after verified payment.

Production PayPal webhook:

```text
https://www.jkesstech.com/api/paypal/webhook
```

Never run an accidental live payment test. Use PayPal sandbox credentials and a
sandbox buyer for end-to-end tests. Confirm real fulfillment from the PayPal merchant
record and the stored order, not only from a browser success screen.

## 10. Quote And Email System

Website email paths:

1. `mailto:` links open the visitor's own email application.
2. Quote requests are sent through Resend.
3. Verified paid orders send an internal notification and customer confirmation.

Files:

```text
src/app/api/quote-request/route.ts
src/lib/quote-request-email.ts
src/app/api/order-email/route.ts
src/app/api/order-email/test/route.ts
src/lib/order-email-delivery.ts
src/lib/paid-order-email.ts
src/lib/customer-order-email.ts
```

The website does not provide inbox access to `zhou@jkess.com`. Mailbox login,
reading, replies, aliases, forwarding, and provider settings are separate from this
repository and require the actual email-provider account.

The order-email test endpoint sends a real test email and requires
`ORDER_TEST_SECRET`. Do not call it casually or expose that secret.

## 11. Search, Analytics, And Consent

Main SEO files:

```text
src/lib/seo.ts
src/lib/structured-data.ts
src/app/sitemap.ts
src/app/robots.ts
src/app/merchant-feed.xml/route.ts
src/lib/non-brand-pages.ts
src/lib/specification-pages.ts
src/lib/technical-guides.ts
documents/search-console-bing-webmaster.md
```

Public endpoints:

```text
https://www.jkesstech.com/sitemap.xml
https://www.jkesstech.com/robots.txt
https://www.jkesstech.com/merchant-feed.xml
https://www.jkesstech.com/indexnow-key.txt
```

The current production branch does not contain the unpublished local
`image-sitemap.xml` work found in the older dirty repository. Do not claim that an
image sitemap is live until that work is reviewed, committed, deployed, and tested.

Country-focused European SEO pages exist for Germany, France, Italy, the Netherlands,
Poland, Spain, Austria, Belgium, Sweden, Denmark, and Portugal, alongside Europe,
product-selection, application, specification, and technical-guide clusters.

### Google Search Console API automation

Search Console API access is already configured in a separate local automation
workspace. It is not part of the Next.js website and must not be deployed to Vercel.

```text
Automation workspace: D:\CodexWorkspace\jkess-search-console-api
Instructions:         D:\CodexWorkspace\jkess-search-console-api\README.md
Configuration:        D:\CodexWorkspace\jkess-search-console-api\config.json
Generated reports:    D:\CodexWorkspace\jkess-search-console-api\reports
Credential key:       D:\CodexWorkspace\keys\jkess-search-console-service-account.json
```

Configured identity and scope:

```text
Google Cloud project: jkbms-seo
Service account:      jkess-search-console-api@jkbms-seo.iam.gserviceaccount.com
Search property:      sc-domain:jkesstech.com
Permission:           siteFullUser (Full permission)
Enabled API:          searchconsole.googleapis.com
OAuth scope:          https://www.googleapis.com/auth/webmasters
```

The credential file is a service-account JSON key and contains a private key. Its
path and service-account email are safe operational metadata; the JSON contents,
`private_key`, `private_key_id`, access tokens, and any copied key material are
secret. Never print, paste, upload, commit, or send that file through chat. If access
must move to another machine, transfer it through an approved secret channel or
create and authorize a replacement key, then revoke the old key when appropriate.

The automation folder is not currently a Git repository. Its `.gitignore` excludes
`config.json`, generated reports, credential JSON, and token files. Preserve this
separation from the public website repository.

Verified read commands:

```powershell
Set-Location 'D:\CodexWorkspace\jkess-search-console-api'
npm run access:test
npm run sitemaps:list
npm run inspect -- --url=https://www.jkesstech.com/
npm run report -- --start=2026-07-01 --end=2026-07-31
npm run report -- --start=2026-07-01 --end=2026-08-06 --fresh
```

Guarded sitemap commands:

```powershell
npm run sitemap:submit -- --url=https://www.jkesstech.com/sitemap.xml --apply --confirm=JKESS
npm run sitemap:delete -- --url=https://www.jkesstech.com/sitemap.xml --apply --confirm=JKESS
```

Sitemap writes require both `--apply` and `--confirm=JKESS` and are restricted to
the URLs allowed by `config.json`. Do not delete a sitemap merely to refresh it;
resubmit it. Although the local allowlist also contains `/image-sitemap.xml`, that
endpoint is not live in the current production branch, so do not submit it until the
unpublished image-sitemap work is reviewed, deployed, and verified.

Live verification on 2026-08-10 confirmed `siteFullUser` access. The API listed
`https://www.jkesstech.com/sitemap.xml` with zero warnings and zero errors. The API
can read Search Analytics, site permissions, URL Inspection results, and sitemaps;
it cannot change rankings, clicks, impressions, CTR, or Google's indexing decisions.
The Google Indexing API is intentionally not used for ordinary JKESS product and
content pages because those page types are not eligible.

Cookie and analytics control:

```text
src/components/CookieConsent.tsx
src/lib/analytics.ts
src/components/EcommerceAnalyticsTracker.tsx
```

Analytics should load only after consent. After any consent change, test accept and
decline on iPhone/Safari and Android/Chrome, including navigation between pages.

Search Console does not require manual indexing requests for every normal edit.
Request indexing for high-priority new or materially changed URLs; use the sitemap
and IndexNow for broader discovery.

## 12. Environment Variables

Real values belong in local `.env.local` and Vercel Project Settings. Never commit
them. The tracked `.env.example` contains placeholders only.

### Public site variables

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_PAYPAL_CLIENT_ID
```

### Search verification and IndexNow

```text
GOOGLE_SITE_VERIFICATION
BING_SITE_VERIFICATION
INDEXNOW_KEY
INDEXNOW_KEY_LOCATION
INDEXNOW_SUBMIT_SECRET
INDEXNOW_ENDPOINT
```

The root layout also accepts `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and
`NEXT_PUBLIC_BING_SITE_VERIFICATION` as fallbacks, but server-only verification
variables are preferred.

### PayPal

```text
PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET
PAYPAL_ENVIRONMENT
PAYPAL_WEBHOOK_ID
```

`PAYPAL_ENVIRONMENT=sandbox` selects sandbox. Other values default to live. The code
also accepts legacy `PAYPAL_ENV` as an environment-name fallback.

### Resend email

```text
RESEND_API_KEY
ORDER_EMAIL_FROM
ORDER_NOTIFICATION_EMAIL
ORDER_TEST_SECRET
```

`ORDER_EMAIL_FROM` must use a Resend-verified sender or domain.

### Redis / KV

Preferred:

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

Fallback:

```text
KV_REST_API_URL
KV_REST_API_TOKEN
```

When changing Vercel variables, set the correct Production, Preview, and Development
scope, redeploy, and verify the relevant integration without printing secret values.

## 13. Deployment Workflow

Normal scoped workflow from a clean production-aligned checkout:

```powershell
git fetch origin
git status --short --branch
git rev-list --left-right --count HEAD...origin/main
npm ci
npm run lint
npm run build
git diff --check
git add <only-task-files>
git diff --cached
git commit -m "Describe the exact website change"
git fetch origin
git push origin HEAD:main
```

Vercel deploys `main` automatically. After pushing:

1. Confirm the remote main commit.
2. Wait for Vercel production deployment.
3. Verify the exact live page in a private browser window.
4. Check mobile and desktop where layout changed.
5. Verify the relevant API, sitemap, feed, structured data, analytics, or payment flow.

Use `git revert <commit>` for a production rollback. Never force-push or rewrite
shared production history.

## 14. High-Risk Verification Checklist

Run focused checks after changes to these areas:

- Navigation: desktop, mobile, Mac Safari, language menu, submenus, cart, quote button.
- Localization: all visible strings, long German/French/Polish text, Persian RTL.
- Products: price, selected option, included scope, images, cart, structured data, feed.
- Checkout: country, shipping amount, server price, PayPal sandbox, capture, webhook.
- Orders: Redis record, inventory decrement, internal email, customer confirmation.
- Cookie consent: first visit, accept, decline, refresh, route change, mobile tapping.
- SEO: canonical, hreflang, robots, sitemap, structured data, Merchant feed.
- Images: dimensions, responsive loading, alt text, file references, no broken assets.

## 15. External Account Access Needed

The repository does not contain platform passwords. A full maintainer may need access
through the platform account or a password manager to:

- GitHub repository and push permissions.
- Vercel deployments, domains, logs, and environment variables.
- PayPal merchant and developer applications.
- Resend and its verified sending domain.
- Upstash Redis or compatible Vercel KV store.
- Google Analytics and Google Search Console.
- The local Search Console service-account key and its Google Cloud IAM controls.
- Bing Webmaster Tools and IndexNow settings.
- The real `zhou@jkess.com` mailbox provider.
- Sanity only if the dormant CMS integration is reactivated.

Do not paste account credentials into an AI conversation or this file.

## 16. Recent Important Commits

```text
06fc0f7 Enable PayPal Complete Payments checkout
f40b6f4 Strengthen JKESS brand identity and distributor signals
b472d7a Report real revision dates in sitemap for changed pages
c72e1e5 Add application SEO pages and merchant feed details
7fee5f2 Reduce gap between Company nav and language icon
```

There is also a remote experimental SEO branch named
`seo/gsc-title-and-faq-optimization`. Do not merge it into `main` without reviewing
its diff against current production.

## 17. Ready-To-Paste Takeover Prompt

```text
Take over maintenance of the JKESS website. The production repository is
https://github.com/bigelephant-code/jkess-website.git and production deploys from
main through Vercel. On this computer, read
D:\CodexWorkspace\jkess-paypal-update\WEBSITE-AI-HANDOFF.md and AGENTS.md first.
Before editing, fetch origin, inspect git status, and compare HEAD with origin/main.
Do not reset or overwrite D:\CodexWorkspace\jkess-website because it contains older
unpublished local changes. Treat src/lib/products.ts as the active storefront source,
not Sanity. Keep all secrets out of chat and Git. For each task, inspect the existing
implementation, make a scoped change, run npm run lint and npm run build, review the
diff, fetch again, and push HEAD to origin/main only after confirming publication is
intended. Verify the Vercel deployment and the exact live behavior afterward.
For Search Console API work, read
D:\CodexWorkspace\jkess-search-console-api\README.md, use the existing guarded CLI,
and never display or copy the service-account JSON key contents.
```
