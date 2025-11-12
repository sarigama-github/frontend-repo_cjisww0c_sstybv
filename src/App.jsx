import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from './pages/Home'
import About from './pages/About'
import Membership from './pages/Membership'
import Browse from './pages/Browse'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyProfile from './pages/MyProfile'
import { AuthProvider } from './AuthContext'

function Layout({ children }){
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 to-amber-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/me" element={<MyProfile />} />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
