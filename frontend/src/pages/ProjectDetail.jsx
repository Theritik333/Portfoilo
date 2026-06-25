// import { useEffect } from "react"
// import { useParams, Link } from "react-router-dom"
// import { useStore } from "../store"
// import { Spinner, ErrorScreen } from "../components/Loader"

// export default function ProjectDetail() {
//   const { slug } = useParams()
//   const { projects, fetchAll, loading, error } = useStore()

//   useEffect(() => {
//     if (!projects.length) fetchAll()
//   }, [])

//   if (loading) return <Spinner />
//   if (error) return <ErrorScreen message={error} onRetry={fetchAll} />

//   // GET /api/projects/:slug — getProjectBySlug from store
//   const project = projects.find((p) => p.slug === slug)

//   if (!project) {
//     return (
//       <div className="max-w-[600px] mx-auto px-6 pt-28 text-center">
//         <p className="text-gray-400 text-[14px] mb-4">Project not found.</p>
//         <Link
//           to="/projects"
//           className="inline-flex items-center gap-1.5 text-[13px] font-semibold border border-gray-200 bg-white px-4 py-2 rounded-full hover:bg-gray-50 transition-colors text-gray-600"
//         >
//           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
//             <path d="M19 12H5M12 5l-7 7 7 7" />
//           </svg>
//           Back to projects
//         </Link>
//       </div>
//     )
//   }

//   const dateStr = project.date
//     ? new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
//     : ""

//   return (
//     <div className="max-w-[600px] mx-auto px-6 pt-[72px] pb-32">

//       {/* Back + Live Demo — screenshot se exact */}
//       <div className="pt-6 flex items-center justify-between mb-6">
//         <Link
//           to="/projects"
//           className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-[#0d0d12] border border-gray-200 bg-white px-4 py-2 rounded-full transition-colors"
//         >
//           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
//             <path d="M19 12H5M12 5l-7 7 7 7" />
//           </svg>
//           Back to projects
//         </Link>
//         {project.liveUrl && (
//           <a
//             href={project.liveUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="flex items-center gap-1.5 text-[12px] font-bold text-white bg-[#0d0d12] px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
//           >
//             Live Demo
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
//               <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
//             </svg>
//           </a>
//         )}
//       </div>

//       {/* ── Header card ─────────────────────────────────────── */}
//       <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
//         {dateStr && (
//           <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-3">
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//               <rect x="3" y="4" width="18" height="18" rx="2" />
//               <line x1="16" y1="2" x2="16" y2="6" />
//               <line x1="8" y1="2" x2="8" y2="6" />
//               <line x1="3" y1="10" x2="21" y2="10" />
//             </svg>
//             {dateStr}
//           </div>
//         )}
//         <h1 className="text-[28px] font-black text-[#0d0d12] tracking-[-1px] leading-[1.15] mb-4">
//           {project.title}
//         </h1>
//         {/* shortDesc — backend field */}
//         <p className="text-[14px] text-gray-500 leading-[1.7]">{project.shortDesc}</p>
//         {/* fullDesc — backend field */}
//         {project.fullDesc && (
//           <p className="text-[13px] text-gray-400 leading-[1.7] mt-3">{project.fullDesc}</p>
//         )}
//       </div>

//       {/* ── The Problem — backend: theProblem field ──────────── */}
//       {project.theProblem && (
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
//           <h2 className="text-[18px] font-black text-[#0d0d12] tracking-[-0.4px] mb-3">The Problem</h2>
//           <p className="text-[13px] text-gray-500 leading-[1.7]">{project.theProblem}</p>
//         </div>
//       )}

//       {/* ── What It Does — backend: whatItDoes[] array ─────── */}
//       {project.whatItDoes?.length > 0 && (
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
//           <h2 className="text-[18px] font-black text-[#0d0d12] tracking-[-0.4px] mb-3">What It Does</h2>
//           <p className="text-[12px] text-gray-400 mb-4">A modular platform with multiple interconnected applications:</p>
//           <div className="space-y-4">
//             {project.whatItDoes.map((item, i) => (
//               <div key={i} className="flex gap-3">
//                 <span className="text-gray-200 flex-shrink-0 mt-0.5">•</span>
//                 <p className="text-[13px] text-gray-500 leading-[1.65]">
//                   <strong className="text-[#0d0d12] font-bold">{item.title}</strong>
//                   {item.description ? ` — ${item.description}` : ""}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── Architecture — backend: architecture (string) ───── */}
//       {project.architecture && (
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
//           <h2 className="text-[18px] font-black text-[#0d0d12] tracking-[-0.4px] mb-4">Architecture</h2>
//           <pre className="bg-[#0d0d12] text-green-400 text-[11px] font-mono p-5 rounded-xl overflow-x-auto leading-[1.7] whitespace-pre">
//             {project.architecture}
//           </pre>
//         </div>
//       )}

//       {/* ── Tech Stack — backend: techStack[] [{layer, tech}] ─ */}
//       {project.techStack?.length > 0 && (
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
//           <h2 className="text-[18px] font-black text-[#0d0d12] tracking-[-0.4px] mb-5">Tech Stack</h2>
//           {/* Table header */}
//           <div className="grid grid-cols-2 pb-2 mb-1 border-b border-gray-100">
//             <span className="text-[10px] font-black text-gray-300 uppercase tracking-[1.5px]">LAYER</span>
//             <span className="text-[10px] font-black text-gray-300 uppercase tracking-[1.5px]">TECH</span>
//           </div>
//           {project.techStack.map((row, i) => (
//             <div key={i} className="grid grid-cols-2 py-3 border-b border-gray-50 last:border-0">
//               <span className="text-[13px] font-bold text-[#0d0d12]">{row.layer}</span>
//               <span className="text-[13px] text-gray-500">{row.tech}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── Key Decisions — backend: keyDecisions[] [{title, description}] */}
//       {project.keyDecisions?.length > 0 && (
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
//           <h2 className="text-[18px] font-black text-[#0d0d12] tracking-[-0.4px] mb-5">Key Decisions</h2>
//           <div className="space-y-5">
//             {project.keyDecisions.map((d, i) => (
//               <div key={i}>
//                 <p className="text-[13px] font-bold text-[#0d0d12] mb-1.5">{d.title}</p>
//                 <p className="text-[13px] text-gray-500 leading-[1.65]">{d.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── Challenges Solved — backend: challengesSolved[] [{title, description}] */}
//       {project.challengesSolved?.length > 0 && (
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
//           <h2 className="text-[18px] font-black text-[#0d0d12] tracking-[-0.4px] mb-5">Challenges Solved</h2>
//           <div className="space-y-5">
//             {project.challengesSolved.map((c, i) => (
//               <div key={i}>
//                 <p className="text-[13px] font-bold text-[#0d0d12] mb-1.5">{c.title}</p>
//                 <p className="text-[13px] text-gray-500 leading-[1.65]">{c.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── Performance — backend: performance (string) ─────── */}
//       {project.performance && (
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
//           <h2 className="text-[18px] font-black text-[#0d0d12] tracking-[-0.4px] mb-4">Performance</h2>
//           <pre className="bg-[#0d0d12] text-green-400 text-[11px] font-mono p-5 rounded-xl overflow-x-auto leading-[1.7] whitespace-pre">
//             {project.performance}
//           </pre>
//         </div>
//       )}

//       {/* ── Try It — screenshot mein dikh raha tha ─────────── */}
//       {project.liveUrl && (
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
//           <h2 className="text-[18px] font-black text-[#0d0d12] tracking-[-0.4px] mb-2">Try It</h2>
//           <p className="text-[12px] text-gray-400 mb-5">Launch the interactive demo in your browser.</p>
//           <a
//             href={project.liveUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="flex items-center gap-4 bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-gray-100 transition-all rounded-2xl py-7 px-6 group"
//           >
//             <div className="w-10 h-10 bg-[#0d0d12] rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform flex-shrink-0">
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                 <polygon points="5 3 19 12 5 21 5 3" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-[13px] font-bold text-[#0d0d12]">Launch interactive demo</p>
//               <p className="text-[11px] text-gray-400 mt-0.5">{project.liveUrl}</p>
//             </div>
//           </a>
//         </div>
//       )}
//     </div>
//   )
// }

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useStore } from "../store"
import { Spinner, ErrorScreen } from "../components/Loader"

export default function ProjectDetail() {
  const { slug } = useParams()
  const { projects, fetchAll, loading, error } = useStore()

  useEffect(() => { if (!projects.length) fetchAll() }, [])

  if (loading) return <Spinner />
  if (error) return <ErrorScreen message={error} onRetry={fetchAll} />

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-32 text-center">
        <p className="text-gray-400 text-[14px] mb-4">Project not found.</p>
        <Link to="/projects"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold border border-gray-200 bg-white px-4 py-2 rounded-full hover:bg-gray-50 transition-colors text-gray-600">
          ← Back to projects
        </Link>
      </div>
    )
  }

  const dateStr = project.date
    ? new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : ""

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm ${className}`}>
      {children}
    </div>
  )

  const SectionTitle = ({ children }) => (
    <h2 className="text-[18px] md:text-[20px] font-black text-[#0d0d12] tracking-[-0.4px] mb-5">{children}</h2>
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-24 pb-32">

        {/* Back + Live Demo */}
        <div className="flex items-center justify-between pt-4 mb-8">
          <Link to="/projects"
            className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-[#0d0d12] border border-gray-200 bg-white px-4 py-2 rounded-full transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to projects
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-bold text-white bg-[#0d0d12] px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
              Live Demo
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          )}
        </div>

        {/* Two-column layout on desktop */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-10 xl:gap-14 items-start">

          {/* LEFT — sticky sidebar on desktop */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 mb-6 lg:mb-0">
            <Card>
              {dateStr && (
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-3">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {dateStr}
                </div>
              )}
              <h1 className="text-[22px] md:text-[26px] font-black text-[#0d0d12] tracking-[-0.8px] leading-[1.2] mb-4">
                {project.title}
              </h1>
              <p className="text-[13px] text-gray-500 leading-[1.7] mb-4">{project.shortDesc}</p>
              {project.fullDesc && (
                <p className="text-[12px] text-gray-400 leading-[1.7]">{project.fullDesc}</p>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer"
                  className="mt-5 flex items-center gap-2 bg-[#0d0d12] text-white text-[12px] font-bold px-4 py-2.5 rounded-full hover:bg-gray-800 transition-colors justify-center">
                  ↗ View Live Demo
                </a>
              )}
            </Card>

            {/* Tech Stack in sidebar on desktop */}
            {project.techStack?.length > 0 && (
              <Card className="mt-4">
                <SectionTitle>Tech Stack</SectionTitle>
                <div className="grid grid-cols-1 pb-1 mb-1 border-b border-gray-100 grid-cols-2">
                  <span className="text-[9px] font-black text-gray-300 uppercase tracking-[1.5px]">LAYER</span>
                  <span className="text-[9px] font-black text-gray-300 uppercase tracking-[1.5px]">TECH</span>
                </div>
                {project.techStack.map((row, i) => (
                  <div key={i} className="grid grid-cols-2 py-2.5 border-b border-gray-50 last:border-0">
                    <span className="text-[12px] font-bold text-[#0d0d12]">{row.layer}</span>
                    <span className="text-[12px] text-gray-500">{row.tech}</span>
                  </div>
                ))}
              </Card>
            )}
          </div>

          {/* RIGHT — main content */}
          <div className="lg:col-span-2 space-y-5">

            {project.theProblem && (
              <Card>
                <SectionTitle>The Problem</SectionTitle>
                <p className="text-[13px] text-gray-500 leading-[1.7]">{project.theProblem}</p>
              </Card>
            )}

            {project.whatItDoes?.length > 0 && (
              <Card>
                <SectionTitle>What It Does</SectionTitle>
                <p className="text-[12px] text-gray-400 mb-4">A modular platform with multiple interconnected applications:</p>
                <div className="space-y-4">
                  {project.whatItDoes.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-gray-200 flex-shrink-0 mt-0.5">•</span>
                      <p className="text-[13px] text-gray-500 leading-[1.65]">
                        <strong className="text-[#0d0d12] font-bold">{item.title}</strong>
                        {item.description ? ` — ${item.description}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {project.architecture && (
              <Card>
                <SectionTitle>Architecture</SectionTitle>
                <pre className="bg-[#0d0d12] text-green-400 text-[11px] font-mono p-5 rounded-xl overflow-x-auto leading-[1.7] whitespace-pre">
                  {project.architecture}
                </pre>
              </Card>
            )}

            {project.keyDecisions?.length > 0 && (
              <Card>
                <SectionTitle>Key Decisions</SectionTitle>
                <div className="space-y-5">
                  {project.keyDecisions.map((d, i) => (
                    <div key={i}>
                      <p className="text-[13px] font-bold text-[#0d0d12] mb-1.5">{d.title}</p>
                      <p className="text-[13px] text-gray-500 leading-[1.65]">{d.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {project.challengesSolved?.length > 0 && (
              <Card>
                <SectionTitle>Challenges Solved</SectionTitle>
                <div className="space-y-5">
                  {project.challengesSolved.map((c, i) => (
                    <div key={i}>
                      <p className="text-[13px] font-bold text-[#0d0d12] mb-1.5">{c.title}</p>
                      <p className="text-[13px] text-gray-500 leading-[1.65]">{c.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {project.performance && (
              <Card>
                <SectionTitle>Performance</SectionTitle>
                <pre className="bg-[#0d0d12] text-green-400 text-[11px] font-mono p-5 rounded-xl overflow-x-auto leading-[1.7] whitespace-pre">
                  {project.performance}
                </pre>
              </Card>
            )}

            {project.liveUrl && (
              <Card>
                <SectionTitle>Try It</SectionTitle>
                <p className="text-[12px] text-gray-400 mb-5">Launch the interactive demo in your browser.</p>
                <a href={project.liveUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-gray-100 transition-all rounded-2xl py-7 px-6 group">
                  <div className="w-10 h-10 bg-[#0d0d12] rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0d0d12]">Launch interactive demo</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{project.liveUrl}</p>
                  </div>
                </a>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}