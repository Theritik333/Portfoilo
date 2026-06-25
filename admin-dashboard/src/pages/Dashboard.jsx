import { useEffect } from "react"
import { useProjectStore, useMessageStore, useProfileStore } from "../store"
import { StatCard, Avatar, Badge, Spinner, timeAgo } from "../components/UI"
import Topbar from "../components/Topbar"

export default function Dashboard() {
  const { projects, fetchAll: fetchProjects, loading: pLoad } = useProjectStore()
  const { messages, fetchAll: fetchMessages, loading: mLoad } = useMessageStore()
  const { profile, fetchProfile } = useProfileStore()
  const unread = messages.filter(m => m.status === "unread").length

  useEffect(() => { fetchProjects(); fetchMessages(); fetchProfile() }, [])

  return (
    <div>
      <Topbar title="Dashboard" />
      <div className="p-7 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Projects" value={projects.length} sub={`${projects.filter(p=>p.featured).length} featured`} color="violet" />
          <StatCard label="Total Messages" value={messages.length} sub="Contact submissions" color="blue" />
          <StatCard label="Unread" value={unread} sub={unread > 0 ? "Need attention" : "All caught up"} color={unread > 0 ? "red" : "green"} />
          <StatCard label="Profile" value={profile ? "✓" : "–"} sub={profile ? "Configured" : "Not set"} color="orange" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Recent Messages */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <p className="text-sm font-black text-gray-900">Recent Messages</p>
              <span className="text-[11px] text-gray-300 font-semibold">{messages.length} total</span>
            </div>
            {mLoad ? (
              <div className="flex items-center justify-center py-16"><Spinner /></div>
            ) : messages.length === 0 ? (
              <div className="py-16 text-center text-gray-300 text-sm">No messages yet</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {messages.slice(0, 6).map(msg => (
                  <div key={msg._id} className={`px-6 py-3.5 flex items-start gap-3.5 ${msg.status === "unread" ? "bg-violet-50/40" : ""}`}>
                    <Avatar name={msg.name} size={34} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className={`text-sm font-bold leading-none ${msg.status === "unread" ? "text-gray-900" : "text-gray-500"}`}>{msg.name}</p>
                        {msg.status === "unread" && <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
                      </div>
                      <p className="text-xs text-violet-400 font-medium">{msg.email}</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{msg.message}</p>
                    </div>
                    <p className="text-[10px] text-gray-300 font-medium flex-shrink-0">{timeAgo(msg.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Projects Quick */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <p className="text-sm font-black text-gray-900">Projects</p>
              <span className="text-[11px] text-gray-300 font-semibold">{projects.length}</span>
            </div>
            {pLoad ? (
              <div className="flex items-center justify-center py-16"><Spinner /></div>
            ) : projects.length === 0 ? (
              <div className="py-16 text-center text-gray-300 text-sm">No projects yet</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {projects.map(p => (
                  <div key={p._id} className="px-5 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 font-black text-xs flex items-center justify-center flex-shrink-0">{p.title?.[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-gray-800 truncate leading-none">{p.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 font-mono truncate">{p.slug}</p>
                    </div>
                    <Badge label={p.featured ? "Live" : "Draft"} color={p.featured ? "green" : "gray"} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
