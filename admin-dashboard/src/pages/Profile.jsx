import { useEffect, useState } from "react"
import { useProfileStore } from "../store"
import { Input, Icon, Spinner } from "../components/UI"
import Topbar from "../components/Topbar"

export default function Profile() {
  const { profile, fetchProfile, updateProfile, loading } = useProfileStore()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [err, setErr] = useState("")

  useEffect(() => { fetchProfile() }, [])
  useEffect(() => { if (profile) setForm({ ...profile }) }, [profile])

  const handleSave = async () => {
    setErr("")
    setSaving(true)
    try {
      await updateProfile(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) { setErr(e.response?.data?.message || "Save failed") }
    setSaving(false)
  }

  const f = (key) => ({ value: form?.[key] || "", onChange: (e) => setForm({ ...form, [key]: e.target.value }) })

  if (loading || !form) {
    return (
      <div>
        <Topbar title="Profile" />
        <div className="flex items-center justify-center h-64"><Spinner /></div>
      </div>
    )
  }

  return (
    <div>
      <Topbar title="Profile" />
      <div className="p-7 max-w-2xl space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5">
          <h2 className="text-sm font-black text-gray-900">Personal Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" {...f("name")} placeholder="Prakhar Mavi" />
            <Input label="Location" {...f("location")} placeholder="Toronto" />
          </div>
          <Input label="Tagline" {...f("tagline")} placeholder="Software developer turning ideas..." />
          <Input label="College" {...f("college")} placeholder="Seneca Computer Programming" />
          <Input label="Photo URL" {...f("photo")} placeholder="https://..." />
          <Input label="Pronunciation Audio URL" {...f("pronounceAudio")} placeholder="https://..." />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5">
          <h2 className="text-sm font-black text-gray-900">About Content</h2>
          <Input label="About Text" {...f("aboutText")} placeholder="I build reliable, user-focused products..." textarea rows={4} />

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">What I Focus On (one per line)</label>
            <textarea rows={4} value={(form.whatIFocusOn || []).join("\n")}
              onChange={e => setForm({ ...form, whatIFocusOn: e.target.value.split("\n") })}
              className="w-full mt-1.5 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none placeholder-gray-300"
              placeholder={"Product delivery: Next.js/React...\nMobile: Swift and React Native\nResilience: caching, queues..."} />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">How I Work — Improvements (one per line)</label>
            <textarea rows={4} value={(form.howIWork || []).join("\n")}
              onChange={e => setForm({ ...form, howIWork: e.target.value.split("\n") })}
              className="w-full mt-1.5 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none placeholder-gray-300"
              placeholder={"Cleaner data models\nStronger error handling\nRetries where they matter..."} />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Principles (one per line)</label>
            <textarea rows={4} value={(form.principles || []).join("\n")}
              onChange={e => setForm({ ...form, principles: e.target.value.split("\n") })}
              className="w-full mt-1.5 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none placeholder-gray-300"
              placeholder={"Choose the simplest tool\nPerformance is part of the product\nCollect only the data you need\nShip, learn, improve"} />
          </div>
        </div>

        {err && <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{err}</p>}

        <button onClick={handleSave} disabled={saving}
          className={`flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all disabled:opacity-60 shadow-lg ${saved ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-500/20"}`}>
          <Icon name={saved ? "check" : "save"} size={15} />
          {saving ? "Saving…" : saved ? "Saved!" : "Save Profile"}
        </button>
      </div>
    </div>
  )
}
