import Link from 'next/link'

export default function NewsPage() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">News & Updates</h1>
        <p className="text-gray-500 mb-12">Stay up to date with the latest from JKESS.</p>
        <div className="text-center py-20 text-gray-400">
          <p>No articles yet. Check back soon!</p>
        </div>
      </div>
    </div>
  )
}
