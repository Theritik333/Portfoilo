import { useState } from "react"
import { useStore } from "../store"

export default function Contact() {
  const { submitContact } = useStore()
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | sending | success | error
  const [errMsg, setErrMsg] = useState("")

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setErrMsg("Please fill in all fields.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrMsg("Please enter a valid email.")
      return
    }
    setErrMsg("")
    setStatus("sending")
    try {
      await submitContact(form)
      setStatus("success")
    } catch (e) {
      setErrMsg(e?.response?.data?.message || "Something went wrong. Try again.")
      setStatus("idle")
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[14px] text-[#0d0d12] placeholder-gray-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all"

  return (
   <div className="min-h-screen bg-white">
  <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-28 pb-32">

    <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-start">

      {/* Left Side */}
      <div>
        <p className="text-[18px] font-bold text-gray-300 uppercase tracking-[2px] mb-3">
          CONTACT
        </p>

        <h1 className="text-[32px] md:text-[40px] font-black text-[#0d0d12] tracking-[-1px] mb-4">
          Get in touch
        </h1>

        <p className="text-[14px] text-gray-400 leading-[1.7] mb-8">
          Have a project in mind, a freelance opportunity, or just want to say
          hello? I'd love to hear from you.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-gray-100">
            <p className="text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
              Response Time
            </p>
            <p className="text-[14px] text-[#0d0d12] font-medium">
              Usually within 24 hours
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-gray-100">
            <p className="text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
              Available For
            </p>
            <p className="text-[14px] text-[#0d0d12] font-medium">
              Freelance • Full-time • Remote
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">

        {status === "success" ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h3 className="text-[18px] font-black text-[#0d0d12] mb-2">
              Message sent!
            </h3>

            <p className="text-[13px] text-gray-400">
              I'll get back to you soon.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Name
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Your name"
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="your@email.com"
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Message
              </label>

              <textarea
                rows={7}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder="Tell me about your project..."
                className={`${inputCls} resize-none`}
              />
            </div>

            {errMsg && (
              <p className="text-[12px] text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {errMsg}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="w-full py-4 rounded-full bg-[#0d0d12] hover:bg-gray-800 text-white text-[13px] font-bold transition-all disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

          </div>
        )}
      </div>
    </div>
  </div>
</div>
  )
}
