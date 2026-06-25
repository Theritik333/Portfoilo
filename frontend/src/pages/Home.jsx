// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import { useStore } from "../store"
// import { Spinner, ErrorScreen } from "../components/Loader"
// import SocialBtn from "../components/SocialBtn"
// import ProjectCard from "../components/ProjectCard"

// export default function Home() {
//   const { profile, projects, socialLinks, techIcons, fetchAll, loading, error } = useStore()
//   const [aiInput, setAiInput] = useState("")

//   useEffect(() => {
//     fetchAll()
//   }, [])

//   if (loading) return <Spinner />
//   if (error || !profile) return <ErrorScreen message={error} onRetry={fetchAll} />

//   const featured = projects.filter((p) => p.featured)

//   return (
//     <div className="max-w-[600px] mx-auto px-6 pt-[72px] pb-32">

//       {/* ─── HERO ──────────────────────────────────────────── */}
//       <section className="pt-10 pb-10">

//         {/* HI I'M label */}
//         <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[3px] mb-4">
//           HI, I'M
//         </p>

//         {/* Name + sound button */}
//         <div className="flex items-center gap-3 mb-4 flex-wrap">
//           <h1 className="text-[48px] sm:text-[56px] leading-none font-black text-[#0d0d12] tracking-[-2.5px]">
//             {profile.name}
//           </h1>
//           {profile.pronounceAudio && (
//             <button
//               onClick={() => {
//                 const audio = new Audio(profile.pronounceAudio)
//                 audio.play().catch(() => {})
//               }}
//               className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all flex-shrink-0"
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//                 <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
//                 <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Tagline */}
//         <p className="text-[15px] text-gray-500 leading-[1.7] mb-7 max-w-lg">
//           {profile.tagline}
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex items-center gap-2.5 flex-wrap mb-7">
//           <Link
//             to="/projects"
//             className="flex items-center gap-1.5 bg-[#0d0d12] text-white text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all active:scale-95"
//           >
//             View Projects
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </Link>
//           <Link
//             to="/contact"
//             className="text-[13px] font-semibold text-[#0d0d12] border border-gray-200 bg-white px-5 py-2.5 rounded-full hover:bg-gray-50 transition-all"
//           >
//             Contact
//           </Link>
//           <Link
//             to="/about"
//             className="text-[13px] font-semibold text-gray-400 px-3 py-2.5 hover:text-gray-600 transition-colors"
//           >
//             About
//           </Link>
//         </div>

//         {/* AI Chat bar — exact from screenshot */}
//         <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5 mb-7">
//           <input
//             value={aiInput}
//             onChange={(e) => setAiInput(e.target.value)}
//             placeholder="Ask anything, blazingly fast..."
//             className="flex-1 bg-transparent text-[13px] text-gray-600 placeholder-gray-300 outline-none"
//           />
//           <button className="w-8 h-8 bg-[#0d0d12] rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-gray-800 transition-colors">
//             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>

//         {/* Tech icons — from /api/tech-icons */}
//         {techIcons.length > 0 && (
//           <div className="flex items-center gap-2 flex-wrap mb-7">
//             <span className="text-[11px] font-semibold text-gray-300">Core:</span>
//             {techIcons.map((ic) => (
//               <div
//                 key={ic._id}
//                 title={ic.name}
//                 className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-default overflow-hidden"
//               >
//                 {ic.iconUrl ? (
//                   <img src={ic.iconUrl} alt={ic.name} className="w-5 h-5 object-contain" />
//                 ) : (
//                   <span className="text-[10px] font-black text-gray-500">{ic.name?.[0]}</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Social links — from /api/social */}
//         {socialLinks.length > 0 && (
//           <div className="flex items-center gap-2">
//             {socialLinks.map((l) => (
//               <SocialBtn key={l._id} link={l} />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ─── ABOUT PREVIEW ─────────────────────────────────── */}
//       <section className="mb-8">
//         {/* Photo from backend */}
//         {profile.photo && (
//           <img
//             src={profile.photo}
//             alt={profile.name}
//             className="w-full rounded-2xl object-cover aspect-[4/3] mb-5"
//           />
//         )}

//         {/* About card */}
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
//           <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px] mb-3">ABOUT</p>
//           <h2 className="text-[24px] font-black text-[#0d0d12] tracking-[-0.5px] mb-5">A bit about me</h2>

//           <p className="text-[14px] text-gray-500 leading-[1.7] mb-3">
//             I'm a software developer based in {profile.location} and a {profile.college} grad.
//           </p>
//           <p className="text-[14px] text-gray-500 leading-[1.7] mb-6">{profile.aboutText}</p>

//           {/* whatIFocusOn — from backend */}
//           {profile.whatIFocusOn?.length > 0 && (
//             <div className="mb-5">
//               <p className="text-[11px] font-bold text-[#0d0d12] mb-3">What I Focus On</p>
//               {profile.whatIFocusOn.map((item, i) => (
//                 <p key={i} className="text-[13px] text-gray-500 leading-[1.65] mb-1">{item}</p>
//               ))}
//             </div>
//           )}

//           {/* howIWork — from backend */}
//           {profile.howIWork?.length > 0 && (
//             <div className="mb-5">
//               <p className="text-[11px] font-bold text-[#0d0d12] mb-2">How I Work</p>
//               <p className="text-[12px] text-gray-400 mb-3">
//                 I start with a small, working version and iterate quickly with measurable improvements:
//               </p>
//               {profile.howIWork.map((item, i) => (
//                 <p key={i} className="text-[13px] text-gray-500 leading-[1.65] mb-1">{item}</p>
//               ))}
//             </div>
//           )}

//           {/* principles — from backend */}
//           {profile.principles?.length > 0 && (
//             <div>
//               <p className="text-[11px] font-bold text-[#0d0d12] mb-3">Principles</p>
//               {profile.principles.map((item, i) => (
//                 <p key={i} className="text-[13px] text-gray-500 leading-[1.65] mb-1">{item}</p>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ─── FEATURED PROJECTS ─────────────────────────────── */}
//       {featured.length > 0 && (
//         <section>
//           <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-5">
//             <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px] mb-2">PROJECTS</p>
//             <h2 className="text-[24px] font-black text-[#0d0d12] tracking-[-0.5px] mb-2">Selected work</h2>
//             <p className="text-[13px] text-gray-400">A few things I've built and shipped. Click a card to read the story.</p>
//           </div>
//           <div className="space-y-4">
//             {featured.map((p) => <ProjectCard key={p._id} project={p} />)}
//           </div>
//           {projects.length > featured.length && (
//             <div className="mt-5 text-center">
//               <Link
//                 to="/projects"
//                 className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-400 hover:text-[#0d0d12] transition-colors"
//               >
//                 View all {projects.length} projects
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
//                   <path d="M5 12h14M12 5l7 7-7 7" />
//                 </svg>
//               </Link>
//             </div>
//           )}
//         </section>
//       )}
//     </div>
//   )
// }

// home 2
// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import { useStore } from "../store"
// import { Spinner, ErrorScreen } from "../components/Loader"
// import SocialBtn from "../components/SocialBtn"
// import ProjectCard from "../components/ProjectCard"

// export default function Home() {
//   const { profile, projects, socialLinks, techIcons, fetchAll, loading, error } = useStore()
//   const [aiInput, setAiInput] = useState("")

//   useEffect(() => { fetchAll() }, [])

//   if (loading) return <Spinner />
//   if (error || !profile) return <ErrorScreen message={error} onRetry={fetchAll} />

//   const featured = projects.filter((p) => p.featured)

//   return (
//     <div className="min-h-screen bg-white">
      
//       {/* ── HERO ─────────────────────────────────────────────────── */}
//       <section className="max-w-6xl mx-auto px-6 lg:px-12 pt-28 pb-16 lg:pt-32 lg:pb-24">
//         <div className="max-w-2xl">
//           <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[3px] mb-5">HI, I'M</p>

//           {/* Name + sound */}
//           <div className="flex items-center gap-4 mb-5 flex-wrap">
//             <h1 className="text-[52px] md:text-[68px] lg:text-[80px] leading-none font-black text-[#0d0d12] tracking-[-3px]">
//               {profile.name}
//             </h1>
//             {profile.pronounceAudio && (
//               <button
//                 onClick={() => new Audio(profile.pronounceAudio).play().catch(() => {})}
//                 className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all flex-shrink-0"
//               >
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//                   <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
//                   <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
//                 </svg>
//               </button>
//             )}
//           </div>

//           <p className="text-[15px] md:text-[17px] text-gray-500 leading-[1.7] mb-8 max-w-xl">
//             {profile.tagline}
//           </p>

//           {/* CTA buttons */}
//           <div className="flex items-center gap-3 flex-wrap mb-8">
//             <Link to="/projects"
//               className="flex items-center gap-2 bg-[#0d0d12] text-white text-[13px] font-bold px-6 py-3 rounded-full hover:bg-gray-800 transition-all active:scale-95">
//               View Projects
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
//                 <path d="M5 12h14M12 5l7 7-7 7" />
//               </svg>
//             </Link>
//             <Link to="/contact"
//               className="text-[13px] font-semibold text-[#0d0d12] border border-gray-200 bg-white px-6 py-3 rounded-full hover:bg-gray-50 transition-all">
//               Contact
//             </Link>
//             <Link to="/about"
//               className="text-[13px] font-semibold text-gray-400 px-4 py-3 hover:text-gray-600 transition-colors">
//               About
//             </Link>
//           </div>

//           {/* AI Chat bar */}
//           <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-5 py-3 mb-8 max-w-lg">
//             <input
//               value={aiInput}
//               onChange={(e) => setAiInput(e.target.value)}
//               placeholder="Ask anything, blazingly fast..."
//               className="flex-1 bg-transparent text-[13px] text-gray-600 placeholder-gray-300 outline-none"
//             />
//             <button className="w-8 h-8 bg-[#0d0d12] rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-gray-800 transition-colors">
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
//                 <path d="M5 12h14M12 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>

//           {/* Tech icons */}
//           {techIcons.length > 0 && (
//             <div className="flex items-center gap-2 flex-wrap mb-7">
//               <span className="text-[11px] font-semibold text-gray-300">Core:</span>
//               {techIcons.map((ic) => (
//                 <div key={ic._id} title={ic.name}
//                   className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-default overflow-hidden">
//                   {ic.iconUrl
//                     ? <img src={ic.iconUrl} alt={ic.name} className="w-5 h-5 object-contain" />
//                     : <span className="text-[10px] font-black text-gray-500">{ic.name?.[0]}</span>}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Social links */}
//           {socialLinks.length > 0 && (
//             <div className="flex items-center gap-2">
//               {socialLinks.map((l) => <SocialBtn key={l._id} link={l} />)}
//             </div>
//           )}
//         </div>
        
//       </section>
     
       
//       {/* ── ABOUT + PHOTO ─────────────────────────────────────────── */}
//       <section className="max-w-6xl mx-auto px-6 lg:px-12 pb-20">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 items-start">

//           {/* Photo — left on desktop */}
//           {profile.photo && (
//             <div className="mb-8 lg:mb-0 lg:sticky lg:top-24">
//               <img
//                 src={profile.photo}
//                 alt={profile.name}
//                 className="w-full rounded-2xl object-cover aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/3]"
//               />
//               {socialLinks.length > 0 && (
//                 <div className="flex gap-2 mt-5">
//                   {socialLinks.map((l) => <SocialBtn key={l._id} link={l} />)}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* About card — right on desktop */}
//           <div>
//             <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
//               <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px] mb-3">ABOUT</p>
//               <h2 className="text-[24px] md:text-[28px] font-black text-[#0d0d12] tracking-[-0.5px] mb-5">A bit about me</h2>

//               <p className="text-[14px] text-gray-500 leading-[1.7] mb-3">
//                 I'm a software developer based in {profile.location} and a {profile.college} grad.
//               </p>
//               <p className="text-[14px] text-gray-500 leading-[1.7] mb-6">{profile.aboutText}</p>

//               {profile.whatIFocusOn?.length > 0 && (
//                 <div className="mb-5">
//                   <p className="text-[11px] font-bold text-[#0d0d12] mb-3">What I Focus On</p>
//                   {profile.whatIFocusOn.map((item, i) => (
//                     <p key={i} className="text-[13px] text-gray-500 leading-[1.65] mb-1">{item}</p>
//                   ))}
//                 </div>
//               )}

//               {profile.howIWork?.length > 0 && (
//                 <div className="mb-5">
//                   <p className="text-[11px] font-bold text-[#0d0d12] mb-2">How I Work</p>
//                   <p className="text-[12px] text-gray-400 mb-3">I start with a small, working version and iterate quickly:</p>
//                   {profile.howIWork.map((item, i) => (
//                     <p key={i} className="text-[13px] text-gray-500 leading-[1.65] mb-1">{item}</p>
//                   ))}
//                 </div>
//               )}

//               {profile.principles?.length > 0 && (
//                 <div>
//                   <p className="text-[11px] font-bold text-[#0d0d12] mb-3">Principles</p>
//                   {profile.principles.map((item, i) => (
//                     <p key={i} className="text-[13px] text-gray-500 leading-[1.65] mb-1">{item}</p>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── FEATURED PROJECTS ──────────────────────────────────────── */}
//       {featured.length > 0 && (
//         <section className="max-w-6xl mx-auto px-6 lg:px-12 pb-32">
//           <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm mb-7">
//             <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px] mb-2">PROJECTS</p>
//             <h2 className="text-[24px] md:text-[28px] font-black text-[#0d0d12] tracking-[-0.5px] mb-2">Selected work</h2>
//             <p className="text-[13px] text-gray-400">A few things I've built and shipped. Click a card to read the story.</p>
//           </div>

//           {/* Grid on desktop */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
//             {featured.map((p) => <ProjectCard key={p._id} project={p} />)}
//           </div>

//           {projects.length > featured.length && (
//             <div className="mt-7 text-center">
//               <Link to="/projects"
//                 className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-400 hover:text-[#0d0d12] transition-colors">
//                 View all {projects.length} projects
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
//                   <path d="M5 12h14M12 5l7 7-7 7" />
//                 </svg>
//               </Link>
//             </div>
//           )}
//         </section>
//       )}
//     </div>
//   )
// }

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useStore } from "../store"
import { Spinner, ErrorScreen } from "../components/Loader"
import SocialBtn from "../components/SocialBtn"
import ProjectCard from "../components/ProjectCard"

export default function Home() {
  const { profile, projects, socialLinks, techIcons, fetchAll, loading, error } = useStore()
  const [aiInput, setAiInput] = useState("")

  useEffect(() => { fetchAll() }, [])

  if (loading) return <Spinner />
  if (error || !profile) return <ErrorScreen message={error} onRetry={fetchAll} />

  const featured = projects.filter((p) => p.featured)

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════════
          HERO + IMAGE — side by side on desktop
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 pt-24 lg:pt-28">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-24">

          {/* ── LEFT: Hero content ── */}
          <div className="flex-1 py-8 lg:py-16">
            <p className="text-[14px] font-bold text-gray-400 uppercase tracking-[3px] mb-5">HI, I'M</p>

            {/* Name */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <h1 className="text-[48px] sm:text-[56px] lg:text-[64px] xl:text-[72px] leading-none font-black text-[#0d0d12] tracking-[-3px]">
                {profile.name}
              </h1>
              {profile.pronounceAudio && (
                <button
                  onClick={() => new Audio(profile.pronounceAudio).play().catch(() => {})}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all flex-shrink-0"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
                  </svg>
                </button>
              )}
            </div>

            {/* Tagline */}
            <p className="text-[15px] lg:text-[16px] text-gray-500 leading-[1.7] mb-8 max-w-md">
              {profile.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap mb-8">
              <Link to="/projects"
                className="flex items-center gap-2 bg-[#0d0d12] text-white text-[13px] font-bold px-6 py-3 rounded-full hover:bg-gray-800 transition-all active:scale-95">
                View Projects
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/contact"
                className="text-[13px] font-semibold text-[#0d0d12] border border-gray-200 bg-white px-6 py-3 rounded-full hover:bg-gray-50 transition-all">
                Contact
              </Link>
              <Link to="/about"
                className="text-[13px] font-semibold border border-gray-200  rounded-full bg-white text-gray-400 px-3 py-3 hover:text-gray-600 transition-colors">
                About
              </Link>
            </div>

            {/* AI Chat bar */}
            {/* <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5 mb-8 max-w-sm">
              <input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask anything, blazingly fast..."
                className="flex-1 bg-transparent text-[13px] text-gray-600 placeholder-gray-300 outline-none min-w-0"
              />
              <button className="w-8 h-8 bg-[#0d0d12] rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-gray-800 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div> */}

            {/* Tech icons */}
            {techIcons.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-7">
                <span className="text-[12px] font-semibold text-gray-300 mr-1">Core:</span>
                {techIcons.map((ic) => (
                  <div key={ic._id} title={ic.name}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-default overflow-hidden">
                    {ic.iconUrl
                      ? <img src={ic.iconUrl} alt={ic.name} className="w-5 h-5 object-contain" />
                      : <span className="text-[10px] font-black text-gray-500">{ic.name?.[0]}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map((l) => <SocialBtn key={l._id} link={l} />)}
              </div>
            )}
          </div>

          {/* ── RIGHT: Full image — sticky on desktop ── */}
          {profile.photo && (
            <div className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 lg:sticky lg:top-24 lg:self-start mt-4 lg:mt-0 lg:pt-16">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full rounded-2xl object-cover aspect-[4/5] lg:aspect-[3/4] shadow-sm"
              />
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT — full box, clean desktop layout
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* About header */}
          <div className="px-7 lg:px-10 pt-8 pb-6 border-b border-gray-50">
            <p className="text-[18px] font-bold text-gray-300 uppercase tracking-[2px] mb-2">ABOUT</p>
            <h2 className="text-[26px] lg:text-[30px] font-black text-[#0d0d12] tracking-[-0.8px]">A bit about me</h2>
          </div>

          {/* About body — 2 cols on desktop */}
          <div className="px-7 lg:px-10 py-8 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">

            {/* Col 1 */}
            <div>
              <p className="text-[14px] text-gray-500 leading-[1.75] mb-3">
                I'm a software developer based in{" "}
                <strong className="text-[#0d0d12] font-semibold">{profile.location}</strong> and a{" "}
                <strong className="text-[#0d0d12] font-semibold">{profile.college}</strong> grad.
              </p>
              <p className="text-[14px] text-gray-500 leading-[1.75] mb-8 lg:mb-0">
                {profile.aboutText}
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-6">
              {profile.whatIFocusOn?.length > 0 && (
              <div className="mb-8">
               <p className="text-[14px] font-bold text-[#0d0d12] uppercase tracking-wider mb-4">
                           What I Focus On
                  </p>

                 <ul className="space-y-3">
                   {profile.whatIFocusOn.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0d0d12] mt-2 flex-shrink-0" />
                     <span className="text-[14px] text-gray-500 leading-[1.8]">
                        {item}
                       </span>
                      </li>
                     ))}
                  </ul>
              </div>
              )}

              {profile.howIWork?.length > 0 && (
                // <div>
                //   <p className="text-[14px] font-bold text-[#0d0d12] uppercase tracking-wider mb-2">How I Work</p>
                //   <p className="text-[14px] text-gray-400 mb-3">Starting small, iterating fast:</p>
                //   {profile.howIWork.map((item, i) => (
                //     <p key={i} className="text-[13px] text-gray-500 leading-[1.65] mb-1.5">{item}</p>
                //   ))}
                // </div>
                <div>
  <p className="text-[14px] font-bold text-[#0d0d12] uppercase tracking-wider mb-2">
    How I Work
  </p>

  <p className="text-[14px] text-gray-400 mb-4">
    Starting small, iterating fast:
  </p>

  <ul className="space-y-3">
    {profile.howIWork.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="w-2 h-2 rounded-full bg-[#0d0d12] mt-2 flex-shrink-0" />

        <span className="text-[14px] text-gray-500 leading-[1.8]">
          {item}
        </span>
      </li>
    ))}
  </ul>
</div>
              )}
            </div>
          </div>

          {/* Principles — full width bottom strip */}
          {profile.principles?.length > 0 && (
            <div className="px-7 lg:px-10 py-7 bg-gray-50/60 border-t border-gray-100">
              <p className="text-[14px] font-bold text-[#0d0d12] uppercase tracking-[2px] mb-4">Principles</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {profile.principles.map((item, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-3">
                    <p className="text-[14px] text-gray-500 leading-[1.6]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED PROJECTS
      ══════════════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 lg:px-12 pb-32">

          {/* Section header */}
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-[14px] font-bold text-gray-300 uppercase tracking-[2px] mb-2">PROJECTS</p>
              <h2 className="text-[26px] lg:text-[30px] font-black text-[#0d0d12] tracking-[-0.8px]">Selected work</h2>
              <p className="text-[13px] text-gray-400 mt-1">A few things I've built and shipped.</p>
            </div>
            {projects.length > featured.length && (
              <Link to="/projects"
                className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-400 hover:text-[#0d0d12] transition-colors border border-gray-200 px-4 py-2 rounded-full hover:border-gray-300">
                View all {projects.length}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((p) => <ProjectCard key={p._id} project={p} />)}
          </div>

          {/* Mobile view all */}
          {projects.length > featured.length && (
            <div className="mt-6 text-center sm:hidden">
              <Link to="/projects"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-400 hover:text-[#0d0d12] transition-colors">
                View all {projects.length} projects →
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
