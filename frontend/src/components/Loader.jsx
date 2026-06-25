export function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-gray-100 border-t-gray-500 rounded-full animate-spin" />
    </div>
  )
}

export function ErrorScreen({ message, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-[15px] font-bold text-gray-700 mb-2">Backend se connect nahi hua</p>
        <p className="text-[13px] text-gray-400 mb-1">{message}</p>
        <p className="text-[12px] text-gray-300 mb-6">
          Make sure backend is running on{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 text-[11px]">
            http://localhost:5000
          </code>
        </p>
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-[#0d0d12] text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  )
}
