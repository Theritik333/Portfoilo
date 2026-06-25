const PATHS = {
  grid: "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z",
  folder: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 8 8-8",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  menu: "M3 12h18M3 6h18M3 18h18",
  plus: "M12 5v14M5 12h14",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  save: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8",
  link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  alert: "M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  social: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  tech: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
}

export function Icon({ name, size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={PATHS[name]} />
    </svg>
  )
}

export function Avatar({ name, size = 36 }) {
  return (
    <div style={{ width: size, height: size, fontSize: size * 0.38, flexShrink: 0 }}
      className="rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold">
      {name?.[0]?.toUpperCase()}
    </div>
  )
}

export function Toggle({ value, onChange }) {
  return (
    <div onClick={() => onChange(!value)}
      className={`w-10 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${value ? "bg-violet-600" : "bg-gray-200"}`}>
      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${value ? "translate-x-5" : ""}`} />
    </div>
  )
}

export function Input({ label, value, onChange, placeholder, textarea, rows = 3, type = "text" }) {
  const cls = "w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-300"
  return (
    <div>
      {label && <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>}
      {textarea
        ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} className={`${cls} resize-none`} />
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={cls} />}
    </div>
  )
}

export function Modal({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <Icon name="x" size={15} />
          </button>
        </div>
        <div className="px-7 py-6 space-y-4 overflow-y-auto flex-1">{children}</div>
        {footer && <div className="px-7 pb-6 flex gap-3 flex-shrink-0">{footer}</div>}
      </div>
    </div>
  )
}

export function StatCard({ label, value, sub, color }) {
  const colors = {
    violet: "bg-violet-50 border-violet-100 text-violet-600",
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    red: "bg-red-50 border-red-100 text-red-500",
    green: "bg-emerald-50 border-emerald-100 text-emerald-600",
    orange: "bg-orange-50 border-orange-100 text-orange-500",
  }
  return (
    <div className={`rounded-2xl border p-6 ${colors[color]}`}>
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{label}</p>
      <p className="text-4xl font-black mt-2 mb-1">{value}</p>
      <p className="text-xs opacity-50 font-medium">{sub}</p>
    </div>
  )
}

export function Badge({ label, color = "gray" }) {
  const colors = {
    green: "bg-emerald-100 text-emerald-700",
    gray: "bg-gray-100 text-gray-500",
    red: "bg-red-100 text-red-600",
    violet: "bg-violet-100 text-violet-700",
    blue: "bg-blue-100 text-blue-600",
  }
  return <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${colors[color]}`}>{label}</span>
}

export function Spinner({ size = 20 }) {
  return (
    <div style={{ width: size, height: size }}
      className="border-2 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
  )
}

export function Empty({ text }) {
  return <div className="py-20 text-center"><p className="text-gray-300 text-sm font-semibold">{text}</p></div>
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "just now"
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}
      footer={
        <>
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">Delete</button>
        </>
      }>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
          <Icon name="alert" size={18} />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
      </div>
    </Modal>
  )
}
