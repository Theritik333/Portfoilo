import { useEffect, useState } from "react"
import { useProjectStore } from "../store"
import { Icon, Modal, Input, Toggle, Badge, Spinner, Empty, ConfirmModal } from "../components/UI"
import Topbar from "../components/Topbar"

const EMPTY_FORM = {
  title: "",
  slug: "",
  date: "",
  shortDesc: "",
  fullDesc: "",
  liveUrl: "",
  thumbnail: "",
  featured: false,
  order: 0,

  theProblem: "",

  whatItDoes: [{ title: "", description: "" }],

  architecture: "",

  techStack: [{ layer: "", tech: "" }],

  keyDecisions: [{ title: "", description: "" }],

  challengesSolved: [{ title: "", description: "" }],

  performance: "",
}

export default function Projects() {
  const { projects, fetchAll, create, update, remove, loading } = useProjectStore()
  const [modal, setModal] = useState(null)
  const [delId, setDelId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState("")

  useEffect(() => { fetchAll() }, [])

  const openNew = () => { setForm(EMPTY_FORM); setErr(""); setModal({ mode: "new" }) }
 const openEdit = (p) => {
  setForm({
    ...EMPTY_FORM,
    ...p,
  })

  setErr("")
  setModal({
    mode: "edit",
    id: p._id,
  })
}

  const handleSave = async () => {
    if (!form.title || !form.slug) { setErr("Title and slug are required"); return }
    setSaving(true)
    try {
      modal.mode === "new" ? await create(form) : await update(modal.id, form)
      setModal(null)
    } catch (e) { setErr(e.response?.data?.message || "Save failed") }
    setSaving(false)
  }

  const handleDelete = async () => { await remove(delId); setDelId(null) }

  const f = (key) => ({ value: form[key], onChange: (e) => setForm({ ...form, [key]: e.target.value }) })

  return (
    <div>
      <Topbar title="Projects" />
      <div className="p-7 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400 font-semibold">{projects.length} projects total</p>
          <button onClick={openNew} className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-500/20">
            <Icon name="plus" size={13} /> New Project
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? <div className="flex items-center justify-center py-20"><Spinner /></div>
          : projects.length === 0 ? <Empty text="No projects yet. Add your first one!" />
          : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/60">
                    {["Project", "Slug", "Status", "Live URL", "Actions"].map(h => (
                      <th key={h} className="text-left text-[10px] font-black text-gray-300 uppercase tracking-widest px-6 py-3.5 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {projects.map(p => (
                    <tr key={p._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-600 font-black text-sm flex items-center justify-center flex-shrink-0">{p.title?.[0]}</div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 leading-tight max-w-[180px] truncate">{p.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5 max-w-[180px] truncate">{p.shortDesc}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><code className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg">{p.slug}</code></td>
                      <td className="px-6 py-4"><Badge label={p.featured ? "Featured" : "Draft"} color={p.featured ? "green" : "gray"} /></td>
                      <td className="px-6 py-4">
                        {p.liveUrl ? <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-violet-500 hover:underline truncate block max-w-[120px]">{p.liveUrl}</a>
                          : <span className="text-xs text-gray-300">—</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-violet-50 text-gray-300 hover:text-violet-600 transition-colors"><Icon name="edit" size={14} /></button>
                          <button onClick={() => setDelId(p._id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"><Icon name="trash" size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {modal && (
        <Modal title={modal.mode === "new" ? "New Project" : "Edit Project"} onClose={() => setModal(null)}
          footer={<>
            <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold disabled:opacity-50">
              {saving ? "Saving…" : "Save Project"}
            </button>
          </>}>
          {err && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{err}</p>}
          <Input label="Title *" {...f("title")} placeholder="Mavizo – E-Commerce Platform" />
          <Input label="Slug *" {...f("slug")} placeholder="mavizo" />
          <Input label="Short Description" {...f("shortDesc")} placeholder="Brief one-liner..." textarea rows={2} />
          <Input label="Full Description" {...f("fullDesc")} placeholder="Detailed description..." textarea rows={3} />
          <Input label="The Problem" {...f("theProblem")} placeholder="Problem this project solves..." textarea rows={2} />
          <Input label="Live URL" {...f("liveUrl")} placeholder="https://..." />
          <Input label="Thumbnail URL" {...f("thumbnail")} placeholder="https://..." />
          <Input
  label="Project Date"
  type="date"
  value={form.date?.slice?.(0, 10) || ""}
  onChange={(e) =>
    setForm({
      ...form,
      date: e.target.value,
    })
  }
/>

<Input
  label="Display Order"
  type="number"
  value={form.order}
  onChange={(e) =>
    setForm({
      ...form,
      order: Number(e.target.value),
    })
  }
/>

<Input
  label="Architecture"
  textarea
  rows={6}
  value={form.architecture}
  onChange={(e) =>
    setForm({
      ...form,
      architecture: e.target.value,
    })
  }
  placeholder="Project structure..."
/>

<Input
  label="Performance"
  textarea
  rows={4}
  value={form.performance}
  onChange={(e) =>
    setForm({
      ...form,
      performance: e.target.value,
    })
  }
  placeholder="Performance details..."
/>
<div className="space-y-3">
  <h3 className="font-bold text-sm">Tech Stack</h3>

  {form.techStack.map((item, index) => (
    <div key={index} className="border rounded-xl p-3 space-y-2">

      <div className="flex justify-end">
        {form.techStack.length > 1 && (
          <button
            type="button"
            className="text-red-500 text-xs font-bold hover:text-red-600"
            onClick={() => {
              const arr = [...form.techStack]
              arr.splice(index, 1)

              setForm({
                ...form,
                techStack: arr,
              })
            }}
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          placeholder="Layer"
          value={item.layer}
          onChange={(e) => {
            const arr = [...form.techStack]
            arr[index].layer = e.target.value

            setForm({
              ...form,
              techStack: arr,
            })
          }}
        />

        <Input
          placeholder="Technology"
          value={item.tech}
          onChange={(e) => {
            const arr = [...form.techStack]
            arr[index].tech = e.target.value

            setForm({
              ...form,
              techStack: arr,
            })
          }}
        />
      </div>
    </div>
  ))}

  <button
    type="button"
    className="text-violet-600 text-sm font-bold"
    onClick={() =>
      setForm({
        ...form,
        techStack: [
          ...form.techStack,
          {
            layer: "",
            tech: "",
          },
        ],
      })
    }
  >
    + Add Tech
  </button>
</div>
<div className="space-y-3">
  <h3 className="font-bold text-sm">What It Does</h3>

  {form.whatItDoes.map((item, index) => (
    <div key={index} className="border rounded-xl p-3 space-y-2">

      <div className="flex justify-end">
        {form.whatItDoes.length > 1 && (
          <button
            type="button"
            className="text-red-500 text-xs font-bold hover:text-red-600"
            onClick={() => {
              const arr = [...form.whatItDoes]
              arr.splice(index, 1)

              setForm({
                ...form,
                whatItDoes: arr,
              })
            }}
          >
            Remove
          </button>
        )}
      </div>

      <Input
        placeholder="Feature Title"
        value={item.title}
        onChange={(e) => {
          const arr = [...form.whatItDoes]
          arr[index].title = e.target.value

          setForm({
            ...form,
            whatItDoes: arr,
          })
        }}
      />

      <Input
        textarea
        rows={2}
        placeholder="Description"
        value={item.description}
        onChange={(e) => {
          const arr = [...form.whatItDoes]
          arr[index].description = e.target.value

          setForm({
            ...form,
            whatItDoes: arr,
          })
        }}
      />
    </div>
  ))}

  <button
    type="button"
    className="text-violet-600 text-sm font-bold"
    onClick={() =>
      setForm({
        ...form,
        whatItDoes: [
          ...form.whatItDoes,
          {
            title: "",
            description: "",
          },
        ],
      })
    }
  >
    + Add Feature
  </button>
</div>
<div className="space-y-3">
  <h3 className="font-bold text-sm">Key Decisions</h3>

  {form.keyDecisions.map((item, index) => (
    <div key={index} className="border rounded-xl p-3 space-y-2">
      <div className="flex justify-end">
        {form.keyDecisions.length > 1 && (
          <button
            type="button"
            className="text-red-500 text-xs font-bold hover:text-red-600"
            onClick={() => {
              const arr = [...form.keyDecisions]
              arr.splice(index, 1)

              setForm({
                ...form,
                keyDecisions: arr,
              })
            }}
          >
            Remove
          </button>
        )}
      </div>

      <Input
        placeholder="Decision Title"
        value={item.title}
        onChange={(e) => {
          const arr = [...form.keyDecisions]
          arr[index].title = e.target.value
          setForm({ ...form, keyDecisions: arr })
        }}
      />

      <Input
        textarea
        rows={2}
        placeholder="Description"
        value={item.description}
        onChange={(e) => {
          const arr = [...form.keyDecisions]
          arr[index].description = e.target.value
          setForm({ ...form, keyDecisions: arr })
        }}
      />
    </div>
  ))}

  <button
    type="button"
    className="text-violet-600 text-sm font-bold"
    onClick={() =>
      setForm({
        ...form,
        keyDecisions: [
          ...form.keyDecisions,
          {
            title: "",
            description: "",
          },
        ],
      })
    }
  >
    + Add Decision
  </button>
</div>
<div className="space-y-3">
  <h3 className="font-bold text-sm">Challenges Solved</h3>

  {form.challengesSolved.map((item, index) => (
    <div key={index} className="border rounded-xl p-3 space-y-2">
      <div className="flex justify-end">
        {form.challengesSolved.length > 1 && (
          <button
            type="button"
            className="text-red-500 text-xs font-bold hover:text-red-600"
            onClick={() => {
              const arr = [...form.challengesSolved]
              arr.splice(index, 1)

              setForm({
                ...form,
                challengesSolved: arr,
              })
            }}
          >
            Remove
          </button>
        )}
      </div>

      <Input
        placeholder="Challenge"
        value={item.title}
        onChange={(e) => {
          const arr = [...form.challengesSolved]
          arr[index].title = e.target.value

          setForm({
            ...form,
            challengesSolved: arr,
          })
        }}
      />

      <Input
        textarea
        rows={2}
        placeholder="Solution"
        value={item.description}
        onChange={(e) => {
          const arr = [...form.challengesSolved]
          arr[index].description = e.target.value

          setForm({
            ...form,
            challengesSolved: arr,
          })
        }}
      />
    </div>
  ))}

  <button
    type="button"
    className="text-violet-600 text-sm font-bold"
    onClick={() =>
      setForm({
        ...form,
        challengesSolved: [
          ...form.challengesSolved,
          {
            title: "",
            description: "",
          },
        ],
      })
    }
  >
    + Add Challenge
  </button>
</div>
          <label className="flex items-center gap-3 cursor-pointer">
            <Toggle value={form.featured} onChange={v => setForm({ ...form, featured: v })} />
            <span className="text-sm text-gray-700 font-semibold">Featured project</span>
          </label>
        </Modal>
      )}

      {delId && (
        <ConfirmModal title="Delete Project?" message="This will permanently delete the project and all its data. This action cannot be undone."
          onConfirm={handleDelete} onCancel={() => setDelId(null)} />
      )}
    </div>
  )
}
