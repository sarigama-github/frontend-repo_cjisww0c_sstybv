import { memberships } from '../data'
import { useAuth } from '../AuthContext'
import { Link } from 'react-router-dom'

export default function Membership(){
  const { user, upgrade } = useAuth()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-rose-900">Membership Plans</h1>
          <p className="text-gray-600 mt-2">Choose a plan that suits your goals. Upgrade anytime.</p>
        </div>
        {user && (
          <div className="px-3 py-1 rounded-full text-sm bg-rose-50 text-rose-800 border">Current: {user.membership}</div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {memberships.map(t => (
          <div key={t.id} className={`border rounded-xl p-6 bg-white shadow-sm ${t.id==='gold' ? 'ring-2 ring-amber-400' : ''}`}>
            <h3 className="text-xl font-semibold text-rose-900">{t.name}</h3>
            <p className="text-3xl font-bold text-rose-800 mt-2">{t.price === 0 ? 'Free' : `₹${t.price}`}</p>
            <ul className="mt-4 text-sm text-gray-700 space-y-2 list-disc list-inside">
              {t.features.map((f,i) => <li key={i}>{f}</li>)}
            </ul>
            {user ? (
              <button onClick={() => upgrade(t.name)} className="mt-6 w-full bg-rose-800 text-white py-2 rounded-md">Upgrade</button>
            ) : (
              <Link to="/login" className="mt-6 w-full inline-block text-center bg-rose-800 text-white py-2 rounded-md">Login to Upgrade</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
