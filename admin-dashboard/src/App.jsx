import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore, useUIStore } from "./store"
import Sidebar from "./components/Sidebar"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Messages from "./pages/Messages"
import Profile from "./pages/Profile"
import Social from "./pages/Social"
import TechIcons from "./pages/TechIcons"

function ProtectedLayout({ children }) {
  const { sidebarOpen } = useUIStore()
  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      <Sidebar />
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-56" : "ml-[58px]"}`}>
        {children}
      </div>
    </div>
  )
}

export default function App() {
  const { token } = useAuthStore()

  if (!token) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  return (
    <ProtectedLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/social" element={<Social />} />
        <Route path="/tech" element={<TechIcons />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ProtectedLayout>
  )
}
