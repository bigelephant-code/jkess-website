# JKESS Google Search Ads Launch Pack

Prepared on 2026-09-21 for the low-voltage enclosure kits and the High Voltage Kit.
This pack prepares the website and campaign structure. It does not create or spend
from a Google Ads account.

## Approved test budget

- Test period: 30 consecutive days.
- Maximum planned media spend: CNY 3,000 for the complete 30-day test.
- Preferred setup: use fixed campaign total budgets of CNY 1,800 for low-voltage
  kits and CNY 1,200 for high-voltage BMS hardware.
- Fallback only when campaign total budgets are unavailable: set combined average
  daily budgets no higher than CNY 98.68. Use CNY 59.21/day for low voltage and
  CNY 39.47/day for high voltage so the 30.4-day monthly charging limits remain
  below CNY 3,000.
- Campaigns must remain paused until the owner confirms the displayed product
  prices and explicitly approves activation.

## Recommended EU-wide launch

- Run two separate Search campaigns: low-voltage kits and high-voltage BMS.
- Target all 27 European Union member states listed in `eu27-targets.csv`. Do not
  include the United Kingdom, Switzerland, Norway, Iceland, Liechtenstein, Serbia,
  or other non-EU European markets in this launch.
- Start with exact and phrase match. Add broad match only after the account has a
  stable qualified-lead conversion history.
- Turn off the Display Network and Search Partners during the initial test.
- Use location targeting based on physical presence, not people merely interested
  in the target countries.
- Cover all EU countries from launch in the two product-line campaigns. With the
  approved CNY 3,000 total budget, do not split the market tiers into separate
  micro-campaigns. Use the tiers for reporting and later reallocation while every
  EU country remains eligible.
- Match each ad to the corresponding localized website route. From September 2026,
  Google Search increasingly prioritizes the language of the ad and landing page
  against the query language, so English-only EU coverage is no longer the preferred
  structure. Ireland and Malta can use English; multilingual countries should have
  separate language ad groups where volume permits.

## Campaign structure

| Campaign | Ad groups | Primary action |
| --- | --- | --- |
| EU Search - Low Voltage Kits - EN | Caster Battery Enclosure, 6U Rack Battery Enclosure, 48V LiFePO4 Enclosure | Purchase or successful quote form |
| EU Search - High Voltage BMS - EN | High Voltage BMS, BCU and BMU, 100A and 200A BMS | Purchase or successful quote form |

These two English campaigns are the fallback layer. Duplicate their validated
structure into localized ad groups using the locale mapping in `eu27-targets.csv`.
The detailed keyword, negative-keyword, and responsive-ad drafts are in the CSV
files in this directory.

## Measurement setup

Create two Google Ads website conversion actions:

1. `JKESS - Qualified Quote Request`: trigger only after `/api/quote-request`
   returns success. Mark this as a primary conversion.
2. `JKESS - Paid Order`: trigger after PayPal capture succeeds. Mark this as a
   primary conversion and use the order value and transaction ID.

Add these Vercel environment variables after Google Ads supplies the IDs:

```text
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL=XXXXXXXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_CONVERSION_LABEL=XXXXXXXXXXXXXXX
```

The site now supports these variables and Consent Mode v2. With the variables
unset, no Google Ads tag is loaded.

Do not mark both a direct Google Ads conversion and the same imported GA4 event
as primary. Use one as primary and the duplicate as secondary for diagnostics.

Enable Google Ads auto-tagging. Use this final URL suffix at account or campaign
level for readable Analytics reports:

```text
utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}&utm_adgroup={adgroupid}&device={device}
```

## Landing-page mapping

| Search intent | Final URL |
| --- | --- |
| Caster / floor-standing battery enclosure | `https://www.jkesstech.com/products/battery-kit` |
| 6U / 19-inch rack enclosure | `https://www.jkesstech.com/products/6u-battery-kit` |
| Generic 48V or LiFePO4 enclosure | `https://www.jkesstech.com/battery-enclosures` |
| High-voltage BMS product purchase | `https://www.jkesstech.com/products/high-voltage-kit` |
| BCU / BMU technical intent | `https://www.jkesstech.com/high-voltage-bms-for-ess` |
| 100A comparison | `https://www.jkesstech.com/high-voltage-bms/100a` |
| 200A comparison | `https://www.jkesstech.com/high-voltage-bms/200a` |

## Launch controls

- EU-27 targeting and the CNY 3,000 total budget are confirmed.
- Use a 60% low-voltage and 40% high-voltage total-budget split for the first
  test, then reallocate only after reviewing qualified lead cost.
- Do not fragment this budget into country-specific campaigns. Compare the three
  market tiers in location reports and prioritize winners in the next test cycle.
- Review search terms at least twice a week during the first month.
- Judge performance by qualified inquiries, purchases, and gross margin rather
  than clicks alone.
- After 15-30 qualified conversions in a recent 30-day window, test Maximize
  Conversions and then a target CPA. Keep the phrase/exact campaign as a control.
- Never advertise the enclosure products as complete batteries. Battery cells are
  explicitly excluded from all low-voltage kit offers.
- Never advertise the High Voltage Kit as a complete ESS. Listed prices apply to
  one selected BCU master or BMU slave control box.

## Search Console evidence used

The 2026-06-20 to 2026-09-18 report showed relevant visibility for `bmu battery`,
`bcu battery`, `jkess battery box`, `high voltage control box`, and LiFePO4
enclosure searches. Poland, Germany, Spain, Romania, and the Netherlands already
showed useful organic signals. Search Console is directional evidence; Google Ads
Keyword Planner should still be used for current paid-search volume and CPC before
budget approval.
