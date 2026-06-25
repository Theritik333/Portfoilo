import { useEffect, useState } from "react"
import { useTechStore } from "../store"
import { Icon, Modal, Input, Spinner, Empty, ConfirmModal } from "../components/UI"
import Topbar from "../components/Topbar"

const EMPTY = { name: "", iconUrl: "", order: 0 }

export default function TechIcons() {
  const { icons, fetchAll, create, remove, loading } = useTechStore()
  const [modal, setModal] = useState(false)
  const [delId, setDelId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState("")

  useEffect(() => { fetchAll() }, [])

  const handleSave = async () => {
    if (!form.name) { setErr("Name is required"); return }
    setSaving(true)
    try { await create(form); setModal(false) }
    catch (e) { setErr(e.response?.data?.message || "Save failed") }
    setSaving(false)
  }

  const f = (key) => ({ value: form[key], onChange: (e) => setForm({ ...form, [key]: e.target.value }) })

  return (
    <div>
      <Topbar title="Tech Icons" />
      <div className="p-7 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400 font-semibold">{icons.length} tech icons</p>
          <button onClick={() => { setForm(EMPTY); setErr(""); setModal(true) }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-500/20">
            <Icon name="plus" size={13} /> Add Icon
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? <div className="flex items-center justify-center py-20"><Spinner /></div>
          : icons.length === 0 ? <Empty text="No tech icons yet." />
          : (
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {icons.map(ic => (
                <div key={ic._id} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-violet-200 transition-colors group relative">
                  {ic.iconUrl
                    ? <img src={ic.iconUrl} alt={ic.name} className="w-8 h-8 object-contain" />
                    : <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 font-black text-xs flex items-center justify-center">{ic.name?.[0]}</div>}
                  <p className="text-xs font-semibold text-gray-700 text-center leading-tight">{ic.name}</p>
                  <p className="text-[10px] text-gray-300">#{ic.order}</p>
                  <button onClick={() => setDelId(ic._id)}
                    className="absolute top-2 right-2 p-1 rounded-lg bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:bg-red-50">
                    <Icon name="trash" size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {modal && (
        <Modal title="Add Tech Icon" onClose={() => setModal(false)}
          footer={<>
            <button onClick={() => setModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold disabled:opacity-50">
              {saving ? "Saving…" : "Add Icon"}
            </button>
          </>}>
          {err && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{err}</p>}
          <Input label="Name *" {...f("name")} placeholder="React / Next.js / TypeScript" />
          <Input label="Icon URL" {...f("iconUrl")} placeholder="https://... (SVG or PNG)" />
          <Input label="Order" value={String(form.order)} onChange={e => setForm({ ...form, order: Number(e.target.value) })} placeholder="0" type="number" />
        </Modal>
      )}

      {delId && <ConfirmModal title="Delete Icon?" message="This will remove this tech icon permanently." onConfirm={async () => { await remove(delId); setDelId(null) }} onCancel={() => setDelId(null)} />}
    </div>
  )
}
