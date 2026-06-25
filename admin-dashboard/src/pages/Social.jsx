import { useEffect, useState } from "react"
import { useSocialStore } from "../store"
import { Icon, Modal, Input, Spinner, Empty, ConfirmModal } from "../components/UI"
import Topbar from "../components/Topbar"

const EMPTY = { platform: "", url: "", icon: "", order: 0 }

export default function Social() {
  const { links, fetchAll, create, update, remove, loading } = useSocialStore()
  const [modal, setModal] = useState(null)
  const [delId, setDelId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState("")

  useEffect(() => { fetchAll() }, [])

  const openNew = () => { setForm(EMPTY); setErr(""); setModal({ mode: "new" }) }
  const openEdit = (l) => { setForm({ platform: l.platform||"", url: l.url||"", icon: l.icon||"", order: l.order||0 }); setErr(""); setModal({ mode: "edit", id: l._id }) }

  const handleSave = async () => {
    if (!form.platform || !form.url) { setErr("Platform and URL are required"); return }
    setSaving(true)
    try {
      modal.mode === "new" ? await create(form) : await update(modal.id, form)
      setModal(null)
    } catch (e) { setErr(e.response?.data?.message || "Save failed") }
    setSaving(false)
  }

  const f = (key) => ({ value: form[key], onChange: (e) => setForm({ ...form, [key]: e.target.value }) })

  return (
    <div>
      <Topbar title="Social Links" />
      <div className="p-7 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400 font-semibold">{links.length} social links</p>
          <button onClick={openNew} className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-500/20">
            <Icon name="plus" size={13} /> Add Link
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? <div className="flex items-center justify-center py-20"><Spinner /></div>
          : links.length === 0 ? <Empty text="No social links yet." />
          : (
            <div className="divide-y divide-gray-50">
              {links.map(l => (
                <div key={l._id} className="px-6 py-4 flex items-center gap-4 group hover:bg-gray-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 font-black text-sm flex items-center justify-center flex-shrink-0">{l.platform?.[0]?.toUpperCase()}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{l.platform}</p>
                    <a href={l.url} target="_blank" rel="noreferrer" className="text-xs text-violet-500 hover:underline truncate block">{l.url}</a>
                  </div>
                  <span className="text-xs text-gray-300 font-medium">Order: {l.order}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(l)} className="p-2 rounded-lg hover:bg-violet-50 text-gray-300 hover:text-violet-600 transition-colors"><Icon name="edit" size={14} /></button>
                    <button onClick={() => setDelId(l._id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"><Icon name="trash" size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {modal && (
        <Modal title={modal.mode === "new" ? "Add Social Link" : "Edit Social Link"} onClose={() => setModal(null)}
          footer={<>
            <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold disabled:opacity-50">
              {saving ? "Saving…" : "Save"}
            </button>
          </>}>
          {err && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{err}</p>}
          <Input label="Platform *" {...f("platform")} placeholder="GitHub / LinkedIn / Discord" />
          <Input label="URL *" {...f("url")} placeholder="https://github.com/..." />
          <Input label="Icon (optional)" {...f("icon")} placeholder="Icon name or URL" />
          <Input label="Order" value={String(form.order)} onChange={e => setForm({ ...form, order: Number(e.target.value) })} placeholder="0" type="number" />
        </Modal>
      )}

      {delId && <ConfirmModal title="Delete Link?" message="This will permanently delete this social link." onConfirm={async () => { await remove(delId); setDelId(null) }} onCancel={() => setDelId(null)} />}
    </div>
  )
}
