// export default function ScheduleBtn() {
//   return (
//     <div className="fixed bottom-6 right-4 z-50">
//       <button
//         onClick={() => window.open("https://cal.com", "_blank")}
//         className="flex items-center gap-2.5 bg-[#0d0d12] text-white text-[13px] font-semibold px-5 py-3.5 rounded-full shadow-2xl shadow-black/20 hover:bg-gray-800 transition-all active:scale-95"
//       >
//         {/* Calendar icon — exact from screenshot */}
//         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//           <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//           <line x1="16" y1="2" x2="16" y2="6" />
//           <line x1="8" y1="2" x2="8" y2="6" />
//           <line x1="3" y1="10" x2="21" y2="10" />
//         </svg>
//         Schedule a call
//       </button>
//     </div>
//   )
// }
export default function ScheduleBtn() {
  const handleSchedule = () => {
    window.open(
      "https://cal.com/ritik-fitness-ottgmk",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="fixed bottom-6 right-4 z-50">
      <button
        onClick={handleSchedule}
        className="flex items-center gap-2.5 bg-[#0d0d12] text-white text-[13px] font-semibold px-5 py-3.5 rounded-full shadow-2xl shadow-black/20 hover:bg-gray-800 transition-all active:scale-95"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>

        Schedule a call
      </button>
    </div>
  );
}