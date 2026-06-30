export interface PageFaq {
  question: string
  answer: string
}

export const pageFaqs: Record<'about' | 'products' | 'contact' | 'downloads' | 'shippingQuote', PageFaq[]> = {
  about: [
    {
      question: 'When were the JKESS team, JKBMS company, and JKESS brand established?',
      answer:
        'The team began working in the new energy sector in 2017. JKBMS Electronic Technology Co.,Ltd was formally established in 2023, and the JKESS energy storage brand was launched in 2024.',
    },
    {
      question: 'What is the current JKESS manufacturing and team scale?',
      answer:
        'JKESS operates a 70,000-square-meter manufacturing facility on a 120-mu site, with more than 700 full-time employees, including over 100 R&D professionals. Current annual production capacity reaches 2.1 GWh.',
    },
    {
      question: 'What does JKESS manufacture?',
      answer:
        'JKESS supplies BMS control hardware, LiFePO4 battery enclosure kits, high-voltage battery management systems, and configured commercial and industrial ESS cabinet solutions.',
    },
    {
      question: 'Where are JKESS offices and manufacturing resources located?',
      answer:
        'JKESS operates across strategic locations in Shenzhen, Hangzhou, and Shandong. The office and factory addresses shown on the website are official public business locations.',
    },
    {
      question: 'Can JKESS support international energy storage projects?',
      answer:
        'Yes. JKESS products and solutions are supplied across more than 200 countries and regions, with technical documentation, product configuration support, and international logistics coverage for residential, commercial, and industrial projects.',
    },
  ],
  products: [
    {
      question: 'How do I choose the right JKESS product?',
      answer:
        'Choose low-voltage battery enclosure kits for residential and rack assembly projects, high-voltage BMS kits for battery rack control, and configured C&I ESS cabinets for larger commercial storage projects.',
    },
    {
      question: 'Can JKESS help confirm inverter or PCS compatibility?',
      answer:
        'Yes. Share your inverter, PCS, or EMS model together with voltage, capacity, and communication requirements so JKESS can review compatibility.',
    },
    {
      question: 'Which products can be ordered directly?',
      answer:
        'Battery Kit, 6U Battery Kit, and High Voltage Kit hardware options can be selected directly, while the C&I ESS Cabinet is quoted according to the final project configuration.',
    },
  ],
  contact: [
    {
      question: 'What information should I include when requesting a quote?',
      answer:
        'Include the product model, target voltage and capacity, quantity, destination country, communication requirements, and project timeline.',
    },
    {
      question: 'What is the fastest way to contact JKESS?',
      answer:
        'WhatsApp is the fastest contact channel for quick project confirmation, while email is recommended for drawings, documents, and detailed specifications.',
    },
    {
      question: 'Can JKESS review a custom energy storage project?',
      answer:
        'Yes. JKESS can review project requirements for battery enclosure kits, high-voltage BMS control systems, and commercial energy storage cabinet configurations.',
    },
  ],
  downloads: [
    {
      question: 'What documents are available in the JKESS technical library?',
      answer:
        'The library includes datasheets, manuals, product specifications, and technical documents for JKESS battery kits, BMS products, accessories, and high-voltage systems.',
    },
    {
      question: 'Can I request a missing datasheet or manual?',
      answer:
        'Yes. Contact JKESS with the product name and required document type, and the team can help provide the correct technical file.',
    },
    {
      question: 'Are documents suitable for project planning?',
      answer:
        'Yes. Datasheets and manuals can support early project planning, but final compatibility should be confirmed with JKESS before purchase or installation.',
    },
  ],
  shippingQuote: [
    {
      question: 'When should I use the JKESS shipping quote form instead of direct checkout?',
      answer:
        'Use the quote form when your destination is outside the current direct-checkout countries, when you need several products in one shipment, or when the order requires project, freight, or customs review before payment.',
    },
    {
      question: 'What information helps JKESS prepare a faster quotation?',
      answer:
        'Include the product names, quantities, model or option requirements, destination country, city, postal code, expected arrival timing, and any project-specific technical or documentation needs.',
    },
    {
      question: 'Can JKESS review bulk purchase pricing?',
      answer:
        'Yes. Bulk pricing depends on product mix, quantity, configuration, production planning, destination, and company approval. The final written quotation controls the confirmed price and terms.',
    },
    {
      question: 'Can one request include multiple products?',
      answer:
        'Yes. The quote form is designed for multi-product requests, so you can include battery kits, high-voltage kit hardware, BMS items, and project-related products in one inquiry.',
    },
  ],
}

export function faqJsonLd(faqs: PageFaq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
