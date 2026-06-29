import { FLAT_RATE_SHIPPING_USD } from '@/lib/shipping-zones'

export type PolicySection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type PolicyPage = {
  slug: PolicySlug
  title: string
  summary: string
  sections: PolicySection[]
}

export type PolicySlug =
  | 'shipping-policy'
  | 'returns-refunds'
  | 'warranty'
  | 'terms-of-sale'
  | 'safety'
  | 'privacy-policy'

export const policyLastUpdated = 'June 29, 2026'

export const policyPages: Record<PolicySlug, PolicyPage> = {
  'shipping-policy': {
    slug: 'shipping-policy',
    title: 'Shipping Policy',
    summary:
      'How JKESS processes, dispatches, and delivers orders, including EU free standard shipping, selected-region flat-rate shipping, quote-only destinations, customs, and shipment issues.',
    sections: [
      {
        heading: 'Order processing',
        paragraphs: [
          'Standard paid orders are normally prepared for dispatch within 3 business days after payment has cleared and all required shipping information has been received.',
          'Custom, configured, project-based, bulk, or made-to-order products may require a longer lead time. Any lead time stated in a written quotation, pro forma invoice, order confirmation, or project agreement takes priority over the standard processing period.',
        ],
      },
      {
        heading: 'Direct checkout destinations',
        paragraphs: [
          'JKESS currently supports direct online checkout only for destinations where the website can apply the shipping rule at checkout and the order can be reviewed under the current transport, import, product, and carrier constraints.',
        ],
        bullets: [
          'European Union delivery addresses: free standard shipping at checkout.',
          `United States, supported Southeast Asia, Japan, South Korea, and listed Middle East destinations: a flat $${FLAT_RATE_SHIPPING_USD} shipping charge per order at checkout. This is charged per order, not per item.`,
        ],
      },
      {
        heading: 'Quote-only destinations',
        paragraphs: [
          'Countries and regions outside the current direct-checkout lists cannot complete online payment immediately. Customers are directed to Request a Quote so JKESS can review local transport policy, carrier limitations, import requirements, product regulations, and destination-specific conditions before confirming a delivery option.',
          'A quote-only destination does not mean JKESS refuses the country permanently; it means the order requires manual review before payment and fulfillment terms are confirmed.',
        ],
      },
      {
        heading: 'Shipping charges, duties, and taxes',
        paragraphs: [
          'Checkout separates the product subtotal, shipping, and order total. EU direct-checkout orders show free standard shipping. Supported non-EU direct-checkout orders show the flat shipping charge as shipping, not as a product price increase.',
          'Import duties, taxes, customs clearance fees, brokerage charges, and destination-country compliance costs are not included unless expressly stated in the checkout terms, written quotation, pro forma invoice, or order confirmation. Customers should confirm local import requirements before ordering.',
        ],
      },
      {
        heading: 'Delivery estimates',
        paragraphs: [
          'Transit times are estimates, not guaranteed delivery dates. Customs inspections, carrier capacity, weather, holidays, remote-area service, export controls, and other events outside JKESS control may cause delays.',
          'A shipment is considered dispatched when it has been handed to the carrier or logistics provider and a shipping record has been created.',
        ],
      },
      {
        heading: 'Shipping address and contact details',
        paragraphs: [
          'Customers must provide a complete and accurate recipient name, address, postal code, telephone number, email address, and any information required for customs clearance.',
          'Contact zhou@jkess.com as soon as possible if an address needs correction. JKESS cannot guarantee changes after an order has entered packing or carrier processing, and additional carrier costs caused by incorrect or incomplete information may be charged to the customer where permitted by law.',
        ],
      },
      {
        heading: 'Lost, damaged, or incomplete shipments',
        paragraphs: [
          'Inspect the package and products promptly after delivery. Keep the outer carton, labels, packing materials, and photographs if an item appears damaged, incomplete, or incorrect.',
          'Report shipment issues to zhou@jkess.com with the JKESS order number, carrier tracking details, photographs, and a description of the issue. JKESS will coordinate with the carrier and provide the appropriate replacement, repair, return, or claim process based on the circumstances and applicable law.',
        ],
      },
      {
        heading: 'Mandatory local rights',
        paragraphs: [
          'Nothing in this Shipping Policy limits rights that cannot lawfully be excluded or reduced under the laws that apply to the customer.',
        ],
      },
    ],
  },

  'returns-refunds': {
    slug: 'returns-refunds',
    title: 'Returns & Refunds Policy',
    summary:
      'Eligibility, timing, condition requirements, shipping responsibility, and refund handling for standard and customized JKESS orders.',
    sections: [
      {
        heading: 'Return request period',
        paragraphs: [
          'For standard, non-customized products, customers may request a return within 7 calendar days after documented delivery.',
          'Where mandatory consumer law provides a longer cancellation or return period, the legally required period applies instead of the 7-day period.',
        ],
      },
      {
        heading: 'Return authorization',
        paragraphs: [
          'Before sending any item back, email zhou@jkess.com with the JKESS order number, product name, quantity, reason for return, photographs where relevant, and the requested resolution.',
          'Do not return products without written return instructions. Unauthorized returns may be delayed, refused by the receiving warehouse, or returned to the sender.',
        ],
      },
      {
        heading: 'Condition of returned products',
        bullets: [
          'The product must be unused, uninstalled, unmodified, and in resalable condition unless the return concerns a verified quality defect.',
          'All supplied accessories, cables, displays, control units, manuals, packaging, and protective materials must be included.',
          'Serial numbers, labels, seals, and identification markings must remain intact.',
          'The customer must pack the product safely for the return journey and follow any dangerous-goods or carrier instructions provided by JKESS.',
        ],
      },
      {
        heading: 'Customized and made-to-order products',
        paragraphs: [
          'Customized, branded, specially configured, project-engineered, made-to-order, or otherwise personalized products cannot be cancelled, returned, or refunded after production or procurement has begun, except where the product is defective or mandatory law requires otherwise.',
          'A quotation, drawing approval, specification confirmation, or pro forma invoice may identify an order as customized or made to order.',
        ],
      },
      {
        heading: 'Return shipping costs',
        paragraphs: [
          'When JKESS confirms a product quality problem, JKESS will bear the reasonable approved return shipping cost or provide another agreed remedy.',
          'For non-quality returns, including preference changes, ordering mistakes, incompatibility not caused by incorrect JKESS information, or other customer-initiated returns, the customer is responsible for return shipping and related costs.',
        ],
      },
      {
        heading: 'Inspection and refunds',
        paragraphs: [
          'Returned products are inspected after receipt. Approved refunds are issued to the original payment method where practicable, subject to payment-provider processing times.',
          'JKESS may deduct documented loss in value, missing parts, repair costs, or damage caused by use, installation, modification, inadequate packaging, or improper return handling where permitted by law. Any proposed deduction will be explained to the customer.',
        ],
      },
      {
        heading: 'Items that are not eligible for a non-quality return',
        bullets: [
          'Customized or made-to-order products.',
          'Products that have been installed, energized, assembled with cells, programmed, modified, damaged, or used.',
          'Products missing supplied parts, packaging, labels, serial numbers, or accessories.',
          'Products returned after the applicable return period without written approval.',
        ],
      },
      {
        heading: 'Mandatory local rights',
        paragraphs: [
          'This policy does not exclude statutory remedies for defective goods or other rights that cannot lawfully be waived. Local mandatory consumer law takes priority where it provides greater protection.',
        ],
      },
    ],
  },

  warranty: {
    slug: 'warranty',
    title: 'Warranty Policy',
    summary:
      'One-year limited warranty terms for JKESS battery enclosures, BMS products, and commercial and industrial energy storage systems.',
    sections: [
      {
        heading: 'Warranty period',
        paragraphs: [
          'JKESS battery enclosures, BMS products, and commercial and industrial energy storage systems are covered by a one-year limited warranty from the documented delivery date, unless a written quotation, contract, or product-specific warranty states a different period.',
        ],
      },
      {
        heading: 'What the warranty covers',
        paragraphs: [
          'The limited warranty covers verified defects in materials or workmanship that arise under normal use, correct installation, and operation within the published specifications and written JKESS instructions.',
        ],
      },
      {
        heading: 'What the warranty does not cover',
        bullets: [
          'Incorrect installation, wiring, commissioning, configuration, cell selection, voltage, current, polarity, grounding, or communication setup.',
          'Use outside stated electrical, mechanical, environmental, temperature, humidity, ingress-protection, or load limits.',
          'Accident, impact, fire, flooding, lightning, corrosion, contamination, pests, transport damage after delivery, or other external causes.',
          'Unauthorized repair, opening, alteration, firmware modification, reverse engineering, or use of incompatible third-party parts.',
          'Normal wear, cosmetic changes, consumable items, or deterioration caused by inadequate maintenance or storage.',
          'Battery cells, battery modules, or other items not expressly included in the purchased product or written supply scope.',
        ],
      },
      {
        heading: 'How to make a warranty claim',
        paragraphs: [
          'Email zhou@jkess.com with the JKESS order number, product model, serial number where available, installation date, system configuration, fault description, photographs, videos, wiring information, logs, and test results reasonably needed to diagnose the issue.',
          'Do not dismantle or return a product until JKESS provides written instructions. Remote troubleshooting may be required before return authorization.',
        ],
      },
      {
        heading: 'Warranty remedy',
        paragraphs: [
          'After verification, JKESS may repair the product, provide replacement parts, replace the product, or provide another appropriate remedy. The selected remedy will depend on the defect, product type, location, parts availability, safety considerations, and mandatory law.',
          'For a confirmed quality defect, JKESS will bear reasonable approved return shipping costs or arrange an alternative service solution. Unauthorized expenses are not reimbursable unless agreed in writing in advance.',
        ],
      },
      {
        heading: 'Professional installation and records',
        paragraphs: [
          'Energy storage equipment must be installed and commissioned by qualified personnel. Keep invoices, serial numbers, wiring diagrams, commissioning records, settings, maintenance records, and photographs, as these may be required to assess a claim.',
        ],
      },
      {
        heading: 'Mandatory legal warranties',
        paragraphs: [
          'This limited warranty is in addition to any non-excludable statutory warranty or consumer remedy. Nothing in this policy limits rights that cannot lawfully be limited.',
        ],
      },
    ],
  },

  'terms-of-sale': {
    slug: 'terms-of-sale',
    title: 'Terms of Sale',
    summary:
      'Commercial terms governing JKESS website orders, quotations, payments, specifications, customized products, delivery, installation, and liability.',
    sections: [
      {
        heading: 'Seller and scope',
        paragraphs: [
          'These Terms of Sale apply to purchases from JKESS, a brand of JKBMS Electronic Technology Co.,Ltd, through jkesstech.com or through a JKESS quotation, pro forma invoice, or written order confirmation.',
          'A product-specific quotation, signed agreement, approved drawing, specification sheet, or written order confirmation takes priority if it expressly differs from these general terms.',
        ],
      },
      {
        heading: 'Orders and acceptance',
        paragraphs: [
          'Submitting payment or an order request does not require JKESS to accept an order that cannot legally, safely, or practically be fulfilled. An order is accepted when JKESS confirms it, begins fulfillment, or dispatches the goods.',
          'JKESS may contact the customer to verify identity, payment, product compatibility, shipping details, import information, or suspected errors before acceptance or dispatch.',
        ],
      },
      {
        heading: 'Prices and payment',
        paragraphs: [
          'Website prices are shown in United States dollars unless stated otherwise. The final payable amount, included items, shipping, taxes, and delivery terms are those displayed at checkout or stated in the applicable quotation or invoice.',
          'Obvious pricing, description, availability, or calculation errors may be corrected before order acceptance. If payment has already been made, JKESS will offer the customer the corrected order or a refund where the order cannot be accepted as submitted.',
        ],
      },
      {
        heading: 'Product scope and compatibility',
        paragraphs: [
          'The customer is responsible for reviewing the product description, selected option, included and excluded items, electrical ratings, dimensions, communication requirements, and intended application before ordering.',
          'Battery cells are not included with battery enclosure kits unless the written product page or quotation expressly states otherwise. High-voltage BMS control hardware does not include battery cells, modules, racks, PCS, EMS, or a complete battery pack unless expressly listed in the supply scope.',
        ],
      },
      {
        heading: 'Customized orders',
        paragraphs: [
          'Customized, branded, configured, project-engineered, made-to-order, or specially procured products become non-cancellable and non-returnable after production or procurement begins, except for verified defects or where mandatory law requires otherwise.',
          'The customer is responsible for checking and approving drawings, specifications, labels, logos, interfaces, quantities, and other customization details before production.',
        ],
      },
      {
        heading: 'Delivery and risk',
        paragraphs: [
          'Processing, shipment, delivery estimates, customs, and shipment issues are governed by the Shipping Policy and any written delivery term in the order confirmation or quotation.',
          'Ownership, risk of loss, insurance responsibility, and delivery obligations follow the written checkout, quotation, carrier, or agreed trade terms applicable to the order.',
        ],
      },
      {
        heading: 'Installation and use',
        paragraphs: [
          'Products must be installed, configured, commissioned, operated, and maintained by qualified personnel in accordance with applicable electrical codes, safety requirements, product specifications, and JKESS instructions.',
          'The customer is responsible for system design, compatibility verification, permits, site conditions, protection devices, and integration with cells, inverters, PCS, EMS, communications, and third-party equipment unless JKESS expressly accepts those responsibilities in writing.',
        ],
      },
      {
        heading: 'Returns, warranty, and safety',
        paragraphs: [
          'Returns and refunds are governed by the Returns & Refunds Policy. Product warranty is governed by the Warranty Policy. All customers and installers must follow the Safety Notice.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the maximum extent permitted by applicable law, JKESS is not liable for indirect, incidental, special, punitive, or consequential loss, including lost profit, lost production, lost data, or business interruption, arising from installation, integration, misuse, or delay.',
          'Nothing in these terms excludes liability or remedies that cannot lawfully be excluded, including mandatory consumer rights where applicable.',
        ],
      },
      {
        heading: 'Disputes and contact',
        paragraphs: [
          'Customers should first contact zhou@jkess.com with the order number and a clear description of the issue so the parties can attempt a practical resolution.',
          'Any governing-law, jurisdiction, arbitration, or dispute clause expressly stated in a signed agreement or written quotation applies to that transaction. Mandatory local rights remain unaffected.',
        ],
      },
    ],
  },

  safety: {
    slug: 'safety',
    title: 'Safety Notice',
    summary:
      'Essential precautions for selecting, installing, commissioning, operating, transporting, and maintaining JKESS battery and energy storage products.',
    sections: [
      {
        heading: 'Qualified personnel only',
        paragraphs: [
          'Battery management systems, battery enclosure kits, high-voltage control equipment, and commercial energy storage systems can expose people and property to electric shock, arc flash, fire, explosion, chemical, thermal, mechanical, and stored-energy hazards.',
          'Installation, wiring, configuration, commissioning, inspection, repair, and maintenance must be carried out by trained and qualified personnel using appropriate tools, test equipment, personal protective equipment, and safe work procedures.',
        ],
      },
      {
        heading: 'Follow applicable requirements',
        bullets: [
          'Follow all applicable electrical, building, fire, grid-connection, transport, environmental, and occupational safety rules.',
          'Follow the product manual, wiring diagram, specification sheet, labels, warnings, and written JKESS instructions.',
          'Use correctly rated fuses, breakers, disconnects, contactors, insulation monitoring, grounding, enclosures, ventilation, fire protection, and emergency isolation devices.',
          'Confirm that the product is approved and suitable for the intended country, site, environment, and application before installation.',
        ],
      },
      {
        heading: 'Battery cells and system compatibility',
        paragraphs: [
          'Battery cells are not included with JKESS battery enclosure kits unless expressly stated. The installer is responsible for selecting compatible cells and verifying chemistry, voltage, capacity, dimensions, compression, insulation, busbars, current limits, temperature sensing, and BMS settings.',
          'Never mix incompatible cell types, chemistries, capacities, states of charge, ages, or conditions. Do not energize a system until polarity, torque, insulation, clearances, communications, protection settings, and emergency controls have been verified.',
        ],
      },
      {
        heading: 'High-voltage precautions',
        bullets: [
          'Treat all conductors and components as energized until a qualified person has isolated, locked out, tested, and verified a safe state.',
          'Observe required discharge times and verify residual voltage before touching or servicing equipment.',
          'Use insulated tools and correctly rated meters and protective equipment.',
          'Do not bypass interlocks, contactors, fuses, insulation monitoring, alarms, or protective functions.',
        ],
      },
      {
        heading: 'Operating environment',
        paragraphs: [
          'Do not operate products outside their specified temperature, humidity, altitude, ingress-protection, ventilation, current, voltage, and mechanical limits. Keep products away from water, conductive dust, corrosive substances, heat sources, ignition sources, unauthorized persons, and physical damage unless the product is expressly rated for those conditions.',
        ],
      },
      {
        heading: 'Abnormal conditions and emergencies',
        paragraphs: [
          'Stop operation and isolate the system if there is smoke, fire, unusual heat, swelling, odor, leakage, abnormal noise, insulation alarm, repeated protection trip, damaged wiring, water ingress, impact, or unexplained voltage or temperature behavior.',
          'Follow the site emergency plan and contact qualified emergency responders where required. Do not touch, move, recharge, reuse, or transport damaged battery equipment without professional assessment.',
        ],
      },
      {
        heading: 'Transport, storage, and disposal',
        paragraphs: [
          'Use compliant packaging, labels, documentation, terminals protection, state-of-charge controls, and authorized carriers where transport rules apply. Store equipment in the specified environment and protect it against short circuit, impact, moisture, and unauthorized access.',
          'Dispose of batteries, electronics, and packaging through authorized recycling or waste channels. Do not place battery cells or energized equipment in general household waste.',
        ],
      },
      {
        heading: 'Responsibility',
        paragraphs: [
          'JKESS product information does not replace professional engineering, site-specific risk assessment, applicable codes, or installer responsibilities. Contact zhou@jkess.com before use if any specification, compatibility, or safety requirement is unclear.',
        ],
      },
    ],
  },

  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    summary:
      'How JKESS collects, uses, shares, stores, and protects personal information submitted through the website, checkout, support, and analytics services.',
    sections: [
      {
        heading: 'Who is responsible for the website',
        paragraphs: [
          'jkesstech.com is operated for JKESS by JKBMS Electronic Technology Co.,Ltd. Privacy questions and requests may be sent to zhou@jkess.com.',
        ],
      },
      {
        heading: 'Information we collect',
        bullets: [
          'Contact and business details, such as name, email address, telephone number, company name, and messages.',
          'Order and delivery details, such as shipping address, purchased products, quantities, selected options, order notes, JKESS order number, PayPal order references, payment status, and fulfillment records.',
          'Technical and usage information, such as device, browser, approximate location, IP address, pages viewed, referral source, and interactions measured through website hosting, security, logs, and analytics tools.',
          'Information provided during product inquiries, warranty claims, returns, technical support, project design, or customer service.',
        ],
      },
      {
        heading: 'Payment information',
        paragraphs: [
          'Website payments are processed by PayPal. JKESS receives order and payment confirmation information needed to verify and fulfill the transaction but does not receive or store the customer full payment-card number through the JKESS website.',
        ],
      },
      {
        heading: 'How we use information',
        bullets: [
          'To provide quotations, process payments, verify orders, arrange delivery, send order confirmations, and provide customer support.',
          'To assess product compatibility, returns, refunds, warranty claims, safety issues, and technical requests.',
          'To operate, secure, troubleshoot, analyze, and improve the website and purchasing process.',
          'To prevent fraud, abuse, duplicate transactions, unauthorized access, and security incidents.',
          'To comply with accounting, tax, customs, export, import, warranty, product safety, legal, and regulatory obligations.',
          'To establish, exercise, or defend legal claims and enforce agreements.',
        ],
      },
      {
        heading: 'Service providers and disclosures',
        paragraphs: [
          'JKESS may share information with service providers that support the transaction and website, including PayPal for payments, Vercel for hosting, Upstash for order records, Resend for transactional email, Google Analytics for website measurement, carriers and logistics providers for delivery, and professional advisers or authorities where legally required.',
          'Service providers receive information only for the relevant service and are expected to protect it under their own contractual and legal obligations.',
        ],
      },
      {
        heading: 'International processing',
        paragraphs: [
          'Because JKESS serves customers worldwide and uses international service providers, personal information may be processed in countries other than the customer country. JKESS uses reasonable contractual, organizational, and technical measures appropriate to the information and processing involved.',
        ],
      },
      {
        heading: 'Cookies and analytics',
        paragraphs: [
          'The website may use essential browser storage, security technologies, and analytics tools to operate the cart, maintain website functions, understand visits, and measure checkout events. Browser settings and privacy tools may allow customers to restrict certain cookies or analytics, although some website functions may then be unavailable.',
        ],
      },
      {
        heading: 'Retention',
        paragraphs: [
          'JKESS keeps personal information for as long as reasonably needed to fulfill orders, provide support and warranty service, maintain transaction records, resolve disputes, protect security, and meet legal, accounting, tax, customs, product safety, and compliance obligations. Retention periods vary according to the type of record and applicable requirements.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'JKESS uses reasonable administrative, technical, and organizational safeguards designed to protect personal information. No internet transmission or storage system can be guaranteed completely secure, so customers should avoid sending unnecessary sensitive information by email or order notes.',
        ],
      },
      {
        heading: 'Privacy rights',
        paragraphs: [
          'Depending on the customer location and applicable law, a person may have rights to request access, correction, deletion, restriction, objection, portability, or information about the use and disclosure of personal information.',
          'JKESS does not sell personal information for money. Requests may be sent to zhou@jkess.com. JKESS may need to verify identity and retain information where required for transactions, safety, fraud prevention, legal compliance, or legal claims.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'The website and products are intended for business customers and adults. JKESS does not knowingly seek personal information from children. A parent or guardian who believes a child has submitted information should contact zhou@jkess.com.',
        ],
      },
      {
        heading: 'Policy changes',
        paragraphs: [
          'JKESS may update this Privacy Policy when website practices, services, or legal requirements change. The current version and effective date will be posted on this page.',
        ],
      },
    ],
  },
}

export const policyNavigation = Object.values(policyPages).map(({ slug, title }) => ({
  slug,
  title,
}))

export function getPolicy(slug: PolicySlug) {
  return policyPages[slug]
}
