import { useEffect, useMemo, useState } from 'react'
import { mockProfiles } from '../data'
import { useAuth } from '../AuthContext'
import { Link } from 'react-router-dom'

function Card({ p, isPaid }){
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <img src={p.photo} alt={p.name} className="h-40 w-full object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-rose-900">{p.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-rose-50 text-rose-800">{p.age} yrs</span>
        </div>
        <p className="text-sm text-gray-700 mt-1">{p.profession}</p>
        <p className="text-xs text-gray-500">{p.location}</p>
        <p className="text-xs text-gray-600 mt-2">Education: {p.education}</p>
        <p className="text-xs text-gray-600">Caste: {p.caste}</p>
        {isPaid ? (
          <p className="text-sm text-rose-800 mt-3 font-medium">Contact: {p.contact}</p>
        ) : (
          <p className="text-sm mt-3 text-gray-500">Contact: <span className="blur-sm select-none">{p.contact}</span> <span className="ml-2 text-rose-700">Upgrade to view</span></p>
        )}
      </div>
    </div>
  )
}

export default function Browse(){
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [gender, setGender] = useState('')
  const [city, setCity] = useState('')
  const [education, setEducation] = useState('')
  const [ageRange, setAgeRange] = useState([20, 35])
  const [showSmart, setShowSmart] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-rose-900">Please login to browse profiles</h2>
        <p className="text-gray-600 mt-2">Only community members can see available matches.</p>
        <Link to="/login" className="mt-6 inline-block bg-rose-800 text-white px-5 py-2 rounded-md">Login</Link>
      </div>
    )
  }

  const isPaid = user.membership !== 'Free'

  const filtered = useMemo(() => {
    let list = [...mockProfiles]

    // Filters
    if (gender) list = list.filter(p => p.gender === gender)
    if (city) list = list.filter(p => p.city.toLowerCase().includes(city.toLowerCase()))
    if (education) list = list.filter(p => p.education.toLowerCase().includes(education.toLowerCase()))
    list = list.filter(p => p.age >= ageRange[0] && p.age <= ageRange[1])

    // Smart match: prefer same city, similar age, same religion
    if (showSmart && user) {
      list = list.filter(p => {
        const sameReligion = p.religion === user.religion
        const ageDiff = Math.abs(p.age - user.age) <= 4
        const sameCity = p.city === user.city
        const eduHint = user.education ? p.education.split(',')[0] === user.education.split(',')[0] : true
        return sameReligion && (ageDiff || sameCity || eduHint)
      })
    }

    return list
  }, [gender, city, education, ageRange, showSmart, user])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-rose-900">Browse Profiles</h1>
          <p className="text-gray-600">Use filters or try Smart Match to discover potential partners.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowSmart(false)} className={`px-4 py-2 rounded-md border ${!showSmart ? 'bg-rose-800 text-white border-rose-800' : 'border-gray-300 text-gray-700'}`}>All Profiles</button>
          <button onClick={() => setShowSmart(true)} className={`px-4 py-2 rounded-md border ${showSmart ? 'bg-amber-500 text-white border-amber-500' : 'border-gray-300 text-gray-700'}`}>Smart Match</button>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-4 gap-4 bg-white border rounded-xl p-4">
        <select value={gender} onChange={e=>setGender(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <input value={city} onChange={e=>setCity(e.target.value)} className="border rounded-md px-3 py-2" placeholder="City" />
        <input value={education} onChange={e=>setEducation(e.target.value)} className="border rounded-md px-3 py-2" placeholder="Education" />
        <div className="flex items-center gap-2">
          <input type="number" value={ageRange[0]} onChange={e=>setAgeRange([Number(e.target.value), ageRange[1]])} className="w-20 border rounded-md px-2 py-2" />
          <span className="text-gray-500">to</span>
          <input type="number" value={ageRange[1]} onChange={e=>setAgeRange([ageRange[0], Number(e.target.value)])} className="w-20 border rounded-md px-2 py-2" />
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Array.from({ length: 6 }).map((_,i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map(p => <Card key={p.id} p={p} isPaid={isPaid} />)}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-600">No profiles match your filters.</div>
          )}
        </div>
      )}
    </div>
  )
}
