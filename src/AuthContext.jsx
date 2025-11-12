import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const LS_KEY = 'brahmin_samaj_auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch (_) {}
    setLoading(false)
  }, [])

  useEffect(() => {
    try {
      if (user) localStorage.setItem(LS_KEY, JSON.stringify(user))
      else localStorage.removeItem(LS_KEY)
    } catch (_) {}
  }, [user])

  const login = (email, password) => {
    const name = email.split('@')[0]
    const mockProfile = {
      id: 'me',
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      gender: 'Male',
      age: 28,
      height: 172,
      profession: 'Software Engineer',
      education: 'B.Tech',
      city: 'Pune',
      location: 'Pune, Maharashtra',
      caste: 'Brahmin',
      religion: 'Hindu',
      membership: 'Free',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg',
      contact: '+91-98XXXXXX90',
      bio: 'Rooted in tradition, forward in thinking. Looking for a like-minded partner.'
    }
    setUser({ ...mockProfile })
  }

  const signup = (data) => {
    const mockProfile = {
      id: 'me',
      name: data.name,
      email: data.email,
      gender: data.gender || 'Male',
      age: data.age ? Number(data.age) : 26,
      height: 168,
      profession: data.profession || 'Consultant',
      education: data.education || 'MBA',
      city: data.city || 'Mumbai',
      location: (data.city || 'Mumbai') + ', Maharashtra',
      caste: 'Brahmin',
      religion: 'Hindu',
      membership: 'Free',
      photo: data.gender === 'Female' ? 'https://randomuser.me/api/portraits/women/65.jpg' : 'https://randomuser.me/api/portraits/men/65.jpg',
      contact: '+91-97XXXXXX23',
      bio: 'Family-oriented, values culture and growth.'
    }
    setUser({ ...mockProfile })
  }

  const logout = () => setUser(null)

  const upgrade = (tier) => {
    if (!user) return
    setUser({ ...user, membership: tier })
  }

  const updateProfile = (updates) => {
    if (!user) return
    setUser({ ...user, ...updates })
  }

  const value = useMemo(() => ({ user, loading, login, signup, logout, upgrade, updateProfile }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
