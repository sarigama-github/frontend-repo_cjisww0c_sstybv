import { Link } from 'react-router-dom'
import { mockProfiles } from '../data'

export default function Home() {
  const featured = mockProfiles.slice(0, 4)
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-rose-900">Brahmin Matrimonial</h1>
            <p className="mt-4 text-gray-700 leading-relaxed">Preserving culture and fostering meaningful connections within the Brahmin Samaj. Verified profiles, respectful matchmaking, and community-first values.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/signup" className="px-5 py-3 rounded-md bg-rose-800 text-white font-medium shadow">Join Now</Link>
              <Link to="/browse" className="px-5 py-3 rounded-md bg-white border text-rose-800 font-medium">Browse Profiles</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featured.map(p => (
              <div key={p.id} className="bg-white rounded-lg shadow border p-4">
                <img src={p.photo} alt={p.name} className="h-28 w-full object-cover rounded" />
                <h3 className="mt-3 font-semibold text-rose-900">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.age} • {p.profession}</p>
                <p className="text-xs text-gray-500">{p.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-rose-900">Why Choose Us</h2>
        <p className="mt-2 text-gray-600">Trust, tradition, and technology — crafted for the Brahmin community.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h3 className="font-semibold text-rose-900">Verified Profiles</h3>
            <p className="text-gray-600 text-sm">Every profile is carefully reviewed for authenticity.</p>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h3 className="font-semibold text-rose-900">Smart Matches</h3>
            <p className="text-gray-600 text-sm">Rule-based suggestions built on community preferences.</p>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h3 className="font-semibold text-rose-900">Privacy First</h3>
            <p className="text-gray-600 text-sm">Your details are protected. Share contact only when ready.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
