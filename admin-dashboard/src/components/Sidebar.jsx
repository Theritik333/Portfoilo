import { NavLink } from "react-router-dom"
import { useAuthStore, useUIStore, useMessageStore } from "../store"
import { Icon } from "./UI"

const nav = [
  { to: "/", label: "Dashboard", icon: "grid" },
  { to: "/projects", label: "Projects", icon: "folder" },
  { to: "/messages", label: "Messages", icon: "mail" },
  { to: "/profile", label: "Profile", icon: "user" },
  { to: "/social", label: "Social Links", icon: "social" },
  { to: "/tech", label: "Tech Icons", icon: "tech" },
]

export default function Sidebar() {
  const { logout, admin } = useAuthStore()
  const { sidebarOpen } = useUIStore()
  const { messages } = useMessageStore()
  const unread = messages.filter((m) => m.status === "unread").length

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-[#0c0c10] border-r border-white/[0.05] flex flex-col z-30 transition-all duration-300 ${sidebarOpen ? "w-56" : "w-[58px]"}`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 h-16 border-b border-white/[0.05] flex-shrink-0 ${sidebarOpen ? "px-5" : "px-[17px]"}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/20">
          <span className="text-white font-black text-sm">P</span>
        </div>
        {sidebarOpen && (
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm leading-none truncate">{admin?.email || "Admin"}</p>
            <p className="text-white/25 text-[10px] mt-0.5">Portfolio Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {nav.map(({ to, label, icon }) => {
          const isMail = icon === "mail"
          return (
            <NavLink key={to} to={to} end={to === "/"}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 rounded-xl text-sm font-semibold transition-all relative
                ${sidebarOpen ? "px-3 py-2.5" : "px-[15px] py-2.5 justify-center"}
                ${isActive ? "bg-violet-600/15 text-violet-400" : "text-white/30 hover:text-white/60 hover:bg-white/[0.04]"}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-violet-400 rounded-r-full" />}
                  <Icon name={icon} size={15} />
                  {sidebarOpen && <span>{label}</span>}
                  {isMail && sidebarOpen && unread > 0 && (
                    <span className="ml-auto text-[10px] font-black bg-red-500 text-white min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">{unread}</span>
                  )}
                  {isMail && !sidebarOpen && unread > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 pb-4 border-t border-white/[0.05] pt-3 flex-shrink-0">
        <button onClick={logout}
          className={`w-full flex items-center gap-3 rounded-xl text-sm font-semibold text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all ${sidebarOpen ? "px-3 py-2.5" : "px-[15px] py-2.5 justify-center"}`}>
          <Icon name="logout" size={15} />
          {sidebarOpen && "Logout"}
        </button>
      </div>
    </aside>
  )
}
