import type { PageFaq } from '@/lib/page-faqs'

export default function PageFaqSection({
  faqs,
  title = 'Frequently Asked Questions',
  description = 'Common questions customers ask before choosing JKESS energy storage products.',
}: {
  faqs: PageFaq[]
  title?: string
  description?: string
}) {
  return (
    <section aria-labelledby="page-faq-title" className="bg-white py-14 md:py-18">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 text-center">
          <p aria-hidden="true" className="text-xs font-bold uppercase tracking-[0.22em] text-green-600">FAQ</p>
          <h2 id="page-faq-title" className="mt-3 text-2xl font-bold text-gray-950 md:text-4xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500">{description}</p>
        </div>
        <dl className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-5 md:p-6">
              <dt className="text-base font-semibold text-gray-950">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-gray-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
