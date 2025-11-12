import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-rose-800 bg-rose-50' : 'text-gray-700 hover:text-rose-800'}`

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold">🕉️</span>
            <span className="font-semibold text-rose-900">Brahmin Matrimonial</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/membership" className={linkClass}>Membership</NavLink>
            <NavLink to="/browse" className={linkClass}>Browse Profiles</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login" className="text-sm text-rose-800 font-medium">Login</Link>
                <Link to="/signup" className="text-sm bg-rose-800 text-white px-3 py-2 rounded-md">Join Now</Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/me" className="text-sm text-rose-800 font-medium">My Profile</Link>
                <button onClick={() => { logout(); navigate('/') }} className="text-sm text-gray-600 hover:text-rose-800">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
