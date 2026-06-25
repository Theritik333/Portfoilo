// import { useEffect } from "react"
// import { useStore } from "../store"
// import { Spinner, ErrorScreen } from "../components/Loader"
// import ProjectCard from "../components/ProjectCard"

// export default function Projects() {
//   const { projects, fetchAll, loading, error } = useStore()

//   useEffect(() => {
//     if (!projects.length) fetchAll()
//   }, [])

//   if (loading) return <Spinner />
//   if (error) return <ErrorScreen message={error} onRetry={fetchAll} />

//   return (
//     <div className="max-w-[600px] mx-auto px-6 pt-[72px] pb-32">
//       <div className="pt-10 mb-7">
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
//           <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px] mb-2">PROJECTS</p>
//           <h1 className="text-[26px] font-black text-[#0d0d12] tracking-[-0.5px] mb-2">Selected work</h1>
//           <p className="text-[13px] text-gray-400 leading-[1.6]">
//             A few things I've built and shipped. Click a card to read the story.
//           </p>
//         </div>
//       </div>

//       {projects.length === 0 ? (
//         <div className="text-center py-16">
//           <p className="text-gray-300 text-[13px]">
//             No projects yet. Add them from the admin panel.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {projects.map((p) => (
//             <ProjectCard key={p._id} project={p} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

import { useEffect } from "react"
import { useStore } from "../store"
import { Spinner, ErrorScreen } from "../components/Loader"
import ProjectCard from "../components/ProjectCard"

export default function Projects() {
  const { projects, fetchAll, loading, error } = useStore()

  useEffect(() => { if (!projects.length) fetchAll() }, [])

  if (loading) return <Spinner />
  if (error) return <ErrorScreen message={error} onRetry={fetchAll} />

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-28 pb-32">

        {/* Header */}
        <div className="max-w-xl mb-10">
          <p className="text-[18px] font-bold text-gray-300 uppercase tracking-[2px] mb-3">PROJECTS</p>
          <h1 className="text-[32px] md:text-[40px] font-black text-[#0d0d12] tracking-[-1px] mb-3">Selected work</h1>
          <p className="text-[14px] text-gray-400 leading-[1.6]">
            A few things I've built and shipped. Click a card to read the story.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-300 text-[13px]">No projects yet. Add them from the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.map((p) => <ProjectCard key={p._id} project={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}