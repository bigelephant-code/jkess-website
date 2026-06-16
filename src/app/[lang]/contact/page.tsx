export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-12">
          Have a question about our products or need a custom quote? We&apos;d love to hear from you.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-6">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Email</p>
            <a href="mailto:chinaenergymall@163.com" className="text-green-600 font-medium hover:underline">
              chinaenergymall@163.com
            </a>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Location</p>
            <p className="text-gray-700">Building B4, Guangming, Shenzhen, China</p>
          </div>
        </div>
      </div>
    </div>
  )
}
