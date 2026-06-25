import { useUIStore, useMessageStore } from "../store"
import { Icon } from "./UI"

export default function Topbar({ title }) {
  const { toggleSidebar } = useUIStore()
  const { messages } = useMessageStore()
  const unread = messages.filter((m) => m.status === "unread").length

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 -ml-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
          <Icon name="menu" size={18} />
        </button>
        <h1 className="text-base font-black text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {unread > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-500 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {unread} unread
          </div>
        )}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-xs font-black">P</div>
      </div>
    </header>
  )
}
