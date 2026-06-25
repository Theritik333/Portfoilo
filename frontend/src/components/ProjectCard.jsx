import { Link } from "react-router-dom"

// Color based on project title first char
function getColor(title) {
  const colors = ["#7c3aed", "#2563eb", "#0d9488", "#db2777", "#ea580c", "#16a34a"]
  return colors[(title?.charCodeAt(0) || 0) % colors.length]
}

export default function ProjectCard({ project }) {
  const color = getColor(project.title)

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
    >
      {/* Preview banner — thumbnail from backend ya colored bg */}
      <div
        style={{ background: project.thumbnail ? undefined : `${color}0f` }}
        className="h-44 flex items-center justify-center border-b border-gray-50 overflow-hidden"
      >
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div
            style={{ background: color, boxShadow: `0 8px 24px ${color}55` }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl"
          >
            {project.title?.[0]}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-[16px] font-black text-[#0d0d12] leading-tight mb-2 group-hover:text-violet-600 transition-colors tracking-[-0.3px]">
          {project.title}
        </h3>
        <p className="text-[13px] text-gray-400 leading-[1.6] mb-4 line-clamp-3">
          {project.shortDesc}
        </p>

        {/* Tech tags — backend se techStack[] array */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((t, i) => (
              <span key={i} className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                {t.tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
