import { useState } from 'react'
import { useAuth } from '../AuthContext'
import { Link } from 'react-router-dom'

export default function MyProfile(){
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(user || {})

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-rose-900">Please login to view your profile</h2>
        <Link to="/login" className="mt-6 inline-block bg-rose-800 text-white px-5 py-2 rounded-md">Login</Link>
      </div>
    )
  }

  const onSave = () => {
    updateProfile({ name: form.name, city: form.city, profession: form.profession, education: form.education, bio: form.bio })
    setEditing(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-6">
        <img src={user.photo} alt={user.name} className="h-28 w-28 rounded-full object-cover" />
        <div>
          <h1 className="text-3xl font-extrabold text-rose-900">{user.name}</h1>
          <p className="text-gray-600">{user.age} • {user.profession}</p>
          <p className="text-gray-600">{user.location}</p>
          <div className="mt-2 text-sm px-3 py-1 inline-block rounded-full bg-rose-50 text-rose-800 border">Membership: {user.membership}</div>
        </div>
      </div>

      <div className="mt-8 bg-white border rounded-xl p-6">
        {!editing ? (
          <>
            <p className="text-gray-700">{user.bio}</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setEditing(true)} className="px-4 py-2 rounded-md border">Edit Profile</button>
              <Link to="/membership" className="px-4 py-2 rounded-md bg-rose-800 text-white">Upgrade Membership</Link>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <input value={form.name || ''} onChange={e=>setForm({ ...form, name: e.target.value })} className="w-full border rounded-md px-3 py-2" />
            <input value={form.profession || ''} onChange={e=>setForm({ ...form, profession: e.target.value })} className="w-full border rounded-md px-3 py-2" placeholder="Profession" />
            <input value={form.education || ''} onChange={e=>setForm({ ...form, education: e.target.value })} className="w-full border rounded-md px-3 py-2" placeholder="Education" />
            <input value={form.city || ''} onChange={e=>setForm({ ...form, city: e.target.value })} className="w-full border rounded-md px-3 py-2" placeholder="City" />
            <textarea value={form.bio || ''} onChange={e=>setForm({ ...form, bio: e.target.value })} className="w-full border rounded-md px-3 py-2" rows={4} placeholder="About you" />
            <div className="flex gap-3">
              <button onClick={onSave} className="px-4 py-2 rounded-md bg-rose-800 text-white">Save</button>
              <button onClick={()=>setEditing(false)} className="px-4 py-2 rounded-md border">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
