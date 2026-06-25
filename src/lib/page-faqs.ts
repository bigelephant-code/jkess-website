export interface PageFaq {
  question: string
  answer: string
}

export const pageFaqs: Record<'about' | 'products' | 'contact' | 'downloads', PageFaq[]> = {
  about: [
    {
      question: 'What does JKESS manufacture?',
      answer:
        'JKESS manufactures BMS solutions, LiFePO4 battery kits, high voltage energy storage kits, and commercial and industrial ESS cabinet systems.',
    },
    {
      question: 'Where are JKESS offices and manufacturing resources located?',
      answer:
        'JKESS operates across strategic locations in Shenzhen, Hangzhou, and Shandong, with warehouse and logistics coverage across China and overseas markets.',
    },
    {
      question: 'Can JKESS support international energy storage projects?',
      answer:
        'Yes. JKESS supports international customers with technical documents, product configuration support, and logistics coverage for residential, commercial, and industrial energy storage projects.',
    },
  ],
  products: [
    {
      question: 'How do I choose the right JKESS product?',
      answer:
        'Choose low-voltage battery kits for residential and rack systems, high voltage kits for battery rack control, and C&I ESS cabinets for larger commercial storage projects.',
    },
    {
      question: 'Can JKESS help confirm inverter or PCS compatibility?',
      answer:
        'Yes. Share your inverter, PCS, or EMS model together with voltage, capacity, and communication requirements so JKESS can review compatibility.',
    },
    {
      question: 'Which products can be ordered directly?',
      answer:
        'Battery Kit, 6U Battery Kit, and High Voltage Kit options can be selected directly, while the C&I ESS Cabinet is quoted by project configuration.',
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
        'Yes. JKESS can review project requirements for battery kits, high voltage BMS kits, and commercial energy storage cabinet configurations.',
    },
  ],
  downloads: [
    {
      question: 'What documents are available in the JKESS technical library?',
      answer:
        'The library includes datasheets, manuals, product specifications, and technical documents for JKESS battery kits, BMS products, accessories, and high voltage systems.',
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
