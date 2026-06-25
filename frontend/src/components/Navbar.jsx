// import { useState } from "react"
// import { Link, useLocation } from "react-router-dom"

// export default function Navbar() {
//   const [open, setOpen] = useState(false)
//   const { pathname } = useLocation()

//   const links = [
//     { to: "/", label: "Home" },
//     { to: "/projects", label: "Projects" },
//     { to: "/about", label: "About" },
//     { to: "/contact", label: "Contact" },
//   ]

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white/92 backdrop-blur-md border-b border-gray-100">
//       <div className="max-w-[600px] mx-auto px-6 h-14 flex items-center justify-between">
//         {/* Logo — exact "prakhar" from screenshot */}
//         <Link to="/" className="font-black text-[18px] text-[#0d0d12] tracking-tight select-none">
//           Ritik.Co
//         </Link>

//         {/* Hamburger only — screenshot shows hamburger on mobile */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
//             {open
//               ? <path d="M18 6L6 18M6 6l12 12" />
//               : <path d="M3 12h18M3 6h18M3 18h18" />}
//           </svg>
//         </button>
//       </div>

//       {/* Dropdown menu */}
//       {open && (
//         <div className="border-t border-gray-100 bg-white">
//           <div className="max-w-[600px] mx-auto px-4 py-2">
//             {links.map((l) => (
//               <Link
//                 key={l.to}
//                 to={l.to}
//                 onClick={() => setOpen(false)}
//                 className={`block px-4 py-3 rounded-xl text-[14px] font-semibold transition-colors ${
//                   pathname === l.to
//                     ? "text-[#0d0d12] bg-gray-50"
//                     : "text-gray-400 hover:text-[#0d0d12] hover:bg-gray-50"
//                 }`}
//               >
//                 {l.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }


import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-black text-[18px] text-[#0d0d12] tracking-tight select-none">
          Ritik.Ca
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-xl text-[14px] font-semibold transition-colors ${
                pathname === l.to
                  ? "text-[#0d0d12] bg-gray-100"
                  : "text-gray-400 hover:text-[#0d0d12] hover:bg-gray-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {open
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl text-[14px] font-semibold transition-colors ${
                  pathname === l.to
                    ? "text-[#0d0d12] bg-gray-50"
                    : "text-gray-400 hover:text-[#0d0d12] hover:bg-gray-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
