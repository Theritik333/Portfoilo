import { useEffect, useState } from "react"
import { useMessageStore } from "../store"
import { Avatar, Icon, Modal, Badge, Spinner, Empty, ConfirmModal, timeAgo } from "../components/UI"
import Topbar from "../components/Topbar"

export default function Messages() {
  const { messages, fetchAll, markRead, remove, loading } = useMessageStore()
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)
  const [delId, setDelId] = useState(null)

  useEffect(() => { fetchAll() }, [])

  const unread = messages.filter(m => m.status === "unread").length
  const filtered = messages.filter(m => filter === "all" ? true : m.status === filter)

  const open = (msg) => {
    setSelected(msg)
    if (msg.status === "unread") markRead(msg._id)
  }

  const handleDelete = async () => {
    await remove(delId)
    if (selected?._id === delId) setSelected(null)
    setDelId(null)
  }

  return (
    <div>
      <Topbar title="Messages" />
      <div className="p-7 space-y-5">
        {/* Filter tabs */}
        <div className="flex items-center gap-2">
          {[
            { id: "all", label: `All (${messages.length})` },
            { id: "unread", label: `Unread (${unread})` },
            { id: "read", label: "Read" },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${filter === f.id ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20" : "bg-white border border-gray-200 text-gray-500 hover:border-violet-300"}`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? <div className="flex items-center justify-center py-20"><Spinner /></div>
          : filtered.length === 0 ? <Empty text={`No ${filter} messages`} />
          : (
            <div className="divide-y divide-gray-50">
              {filtered.map(msg => (
                <div key={msg._id} onClick={() => open(msg)}
                  className={`px-6 py-4 flex items-start gap-4 cursor-pointer hover:bg-gray-50/70 transition-colors ${msg.status === "unread" ? "bg-violet-50/40" : ""}`}>
                  <Avatar name={msg.name} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-bold ${msg.status === "unread" ? "text-gray-900" : "text-gray-500"}`}>{msg.name}</p>
                      {msg.status === "unread" && <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />}
                      <Badge label={msg.status} color={msg.status === "unread" ? "violet" : "gray"} />
                    </div>
                    <p className="text-xs text-violet-500 font-semibold">{msg.email}</p>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">{msg.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <p className="text-[10px] text-gray-300 font-medium">{timeAgo(msg.createdAt)}</p>
                    <button onClick={e => { e.stopPropagation(); setDelId(msg._id) }}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-200 hover:text-red-400 transition-colors">
                      <Icon name="trash" size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <Modal title="Message Detail" onClose={() => setSelected(null)}
          footer={<>
            <a href={`mailto:${selected.email}`}
              className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold text-center transition-colors">
              Reply via Email
            </a>
            <button onClick={() => { setDelId(selected._id); setSelected(null) }}
              className="px-5 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors">
              Delete
            </button>
          </>}>
          <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
            <Avatar name={selected.name} size={48} />
            <div>
              <p className="font-black text-gray-900 text-base">{selected.name}</p>
              <p className="text-sm text-violet-500 font-semibold">{selected.email}</p>
              <p className="text-xs text-gray-300 mt-0.5">{timeAgo(selected.createdAt)}</p>
            </div>
          </div>
          {selected.ipAddress && (
            <p className="text-xs text-gray-300">IP: {selected.ipAddress}</p>
          )}
          <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">{selected.message}</div>
        </Modal>
      )}

      {delId && (
        <ConfirmModal title="Delete Message?" message="This will permanently delete this message. This cannot be undone."
          onConfirm={handleDelete} onCancel={() => setDelId(null)} />
      )}
    </div>
  )
}
