// import { useEffect } from "react"
// import { useStore } from "../store"
// import { Spinner, ErrorScreen } from "../components/Loader"
// import SocialBtn from "../components/SocialBtn"

// export default function About() {
//   const { profile, socialLinks, fetchAll, loading, error } = useStore()

//   useEffect(() => {
//     if (!profile) fetchAll()
//   }, [])

//   if (loading) return <Spinner />
//   if (error || !profile) return <ErrorScreen message={error} onRetry={fetchAll} />

//   return (
//     <div className="max-w-[600px] mx-auto px-6 pt-[72px] pb-32">
//       <div className="pt-10">

//         {/* Photo from backend */}
//         {profile.photo ? (
//           <img
//             src={profile.photo}
//             alt={profile.name}
//             className="w-full rounded-2xl object-cover aspect-[4/3] mb-5"
//           />
//         ) : (
//           <div className="w-full rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 aspect-[4/3] mb-5 flex items-center justify-center border border-gray-100">
//             <span className="text-[80px] font-black text-violet-200 select-none">{profile.name?.[0]}</span>
//           </div>
//         )}

//         {/* Social links */}
//         {socialLinks.length > 0 && (
//           <div className="flex gap-2 mb-6">
//             {socialLinks.map((l) => <SocialBtn key={l._id} link={l} />)}
//           </div>
//         )}

//         {/* About card */}
//         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
//           <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px] mb-3">ABOUT</p>
//           <h1 className="text-[26px] font-black text-[#0d0d12] tracking-[-0.5px] mb-5">A bit about me</h1>

//           <p className="text-[14px] text-gray-500 leading-[1.7] mb-3">
//             I'm a software developer based in{" "}
//             <strong className="text-[#0d0d12] font-semibold">{profile.location}</strong> and a{" "}
//             <strong className="text-[#0d0d12] font-semibold">{profile.college}</strong> grad.
//           </p>
//           <p className="text-[14px] text-gray-500 leading-[1.7] mb-6">{profile.aboutText}</p>

//           {profile.whatIFocusOn?.length > 0 && (
//             <div className="mb-5">
//               <p className="text-[11px] font-bold text-[#0d0d12] mb-3">What I Focus On</p>
//               {profile.whatIFocusOn.map((item, i) => (
//                 <p key={i} className="text-[13px] text-gray-500 leading-[1.65] mb-1">{item}</p>
//               ))}
//             </div>
//           )}

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

//           {profile.principles?.length > 0 && (
//             <div>
//               <p className="text-[11px] font-bold text-[#0d0d12] mb-3">Principles</p>
//               {profile.principles.map((item, i) => (
//                 <p key={i} className="text-[13px] text-gray-500 leading-[1.65] mb-1">{item}</p>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Available card */}
//         <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[13px] font-bold text-[#0d0d12] mb-0.5">Available for work</p>
//               <p className="text-[11px] text-gray-400">Open to freelance and full-time roles</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               <span className="text-[11px] font-bold text-green-600">Available</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useEffect } from "react"
import { useStore } from "../store"
import { Spinner, ErrorScreen } from "../components/Loader"
import SocialBtn from "../components/SocialBtn"

export default function About() {
  const { profile, socialLinks, fetchAll, loading, error } = useStore()

  useEffect(() => { if (!profile) fetchAll() }, [])

  if (loading) return <Spinner />
  if (error || !profile) return <ErrorScreen message={error} onRetry={fetchAll} />

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-28 pb-32">

        <div className="lg:grid lg:grid-cols-2 lg:gap-14 xl:gap-20 items-start">

          {/* LEFT — photo + socials */}
          <div  className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 lg:sticky lg:top-24 lg:self-start mt-4 lg:mt-0 lg:pt-16">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name}
                 className="w-full rounded-2xl object-cover aspect-[4/5] lg:aspect-[3/4] shadow-sm" />
            ) : (
              <div className="w-full rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 aspect-[4/3] mb-5 flex items-center justify-center border border-gray-100">
                <span className="text-[80px] font-black text-violet-200 select-none">{profile.name?.[0]}</span>
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((l) => <SocialBtn key={l._id} link={l} />)}
              </div>
            )}

            {/* Availability */}
            <div className="mt-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-[#0d0d12] mb-0.5">Available for work</p>
                  <p className="text-[11px] text-gray-400">Open to freelance and full-time roles</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-green-600">Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — about content */}
          <div>
            <div className="bg-white border border-gray-100 rounded-2xl p-7 lg:p-8 shadow-sm">
              <p className="text-[18px] font-bold text-gray-300 uppercase tracking-[2px] mb-3">ABOUT</p>
              <h1 className="text-[28px] md:text-[34px] font-black text-[#0d0d12] tracking-[-0.8px] mb-6">A bit about me</h1>

              <p className="text-[14px] text-gray-500 leading-[1.7] mb-3">
                I'm a software developer based in{" "}
                <strong className="text-[#0d0d12] font-semibold">{profile.location}</strong> and a{" "}
                <strong className="text-[#0d0d12] font-semibold">{profile.college}</strong> grad.
              </p>
              <p className="text-[14px] text-gray-500 leading-[1.7] mb-7">{profile.aboutText}</p>

              {profile.whatIFocusOn?.length > 0 && (
  <div className="mb-6">
    <p className="text-[11px] font-bold text-[#0d0d12] mb-3">
      What I Focus On
    </p>

    <ul className="space-y-2">
      {profile.whatIFocusOn.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-[14px] text-gray-500 leading-[1.7]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d12] mt-2 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)}

            {profile.howIWork?.length > 0 && (
  <div className="mb-6">
    <p className="text-[11px] font-bold text-[#0d0d12] mb-2">
      How I Work
    </p>

    <p className="text-[12px] text-gray-400 mb-4">
      I start with a small, working version and iterate quickly with measurable improvements:
    </p>

    <ul className="space-y-2">
      {profile.howIWork.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-[14px] text-gray-500 leading-[1.7]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d12] mt-2 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)}

                                                 {profile.principles?.length > 0 && (
  <div>
    <p className="text-[11px] font-bold text-[#0d0d12] uppercase tracking-wider mb-4">
      Principles
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {profile.principles.map((item, i) => (
        <div
          key={i}
          className="group rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4 hover:border-gray-200 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0d0d12] text-white flex items-center justify-center text-[12px] font-bold flex-shrink-0">
              {i + 1}
            </div>

            <p className="text-[14px] text-gray-600 leading-[1.7] group-hover:text-[#0d0d12] transition-colors">
              {item}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}