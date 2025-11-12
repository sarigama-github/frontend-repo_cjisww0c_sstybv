import { useState } from 'react'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', gender: 'Male', city: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    signup(form)
    navigate('/me')
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-rose-900">Create Account</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input value={form.name} onChange={e=>setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full border rounded-md px-3 py-2" required />
        <input type="email" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border rounded-md px-3 py-2" required />
        <input type="password" value={form.password} onChange={e=>setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full border rounded-md px-3 py-2" required />
        <select value={form.gender} onChange={e=>setForm({ ...form, gender: e.target.value })} className="w-full border rounded-md px-3 py-2">
          <option>Male</option>
          <option>Female</option>
        </select>
        <input value={form.city} onChange={e=>setForm({ ...form, city: e.target.value })} placeholder="City" className="w-full border rounded-md px-3 py-2" />
        <button className="w-full bg-rose-800 text-white py-2 rounded-md">Sign Up</button>
      </form>
    </div>
  )
}
