import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store"

export default function Login() {
  const { login, loading } = useAuthStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [err, setErr] = useState("")

  const handleSubmit = async () => {
    setErr("")
    if (!form.email || !form.password) { setErr("Please fill in all fields"); return }
    const res = await login(form.email, form.password)
    if (res.ok) navigate("/")
    else setErr(res.message)
  }

  return (
    <div className="min-h-screen bg-[#0c0c10] flex items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 mb-5 shadow-2xl shadow-violet-500/30">
            <span className="text-white font-black text-xl">P</span>
          </div>
          <h1 className="text-2xl font-black text-white">Admin Panel</h1>
          <p className="text-sm text-white/30 mt-1.5">Prakhar Mavi Portfolio</p>
        </div>
        <div className="bg-white/5 border border-white/[0.08] rounded-2xl p-8 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="admin@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/15 text-sm outline-none focus:border-violet-500/60 transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Password</label>
            <input type="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/15 text-sm outline-none focus:border-violet-500/60 transition-colors" />
          </div>
          {err && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">{err}</p>}
          <button onClick={handleSubmit} disabled={loading}
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20">
            {loading ? <><span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />Signing in…</> : "Sign in →"}
          </button>
        </div>
      </div>
    </div>
  )
}
