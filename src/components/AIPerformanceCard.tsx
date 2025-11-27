import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (threshold = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

const AIPerformanceCard = () => {
  const { ref, inView } = useScrollAnimation(0.5);
  
  return (
    <div ref={ref} className="bg-white rounded-2xl border border-purple-100 p-6 mb-6 shadow-sm hover:shadow-lg hover:shadow-purple-100/50 transition-all">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100">
        <h3 className="text-lg font-bold ">
          AI Performance
        </h3>
      </div>
      <div className="flex justify-center py-5">
        <div className="relative w-30 h-30">
          <svg width="120" height="120" className="-rotate-90">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="52" fill="none" stroke="#f3e8ff" strokeWidth="8" />
            <circle 
              cx="60" 
              cy="60" 
              r="52" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeDasharray="327" 
              strokeDashoffset={inView ? "71.94" : "327"} 
              className="transition-all duration-1000 ease-out" 
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              78%
            </div>
            <div className="text-xs text-gray-500">Success</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
          <div className="text-2xl font-bold text-emerald-600">982</div>
          <div className="text-xs text-gray-500 mt-1">Resolved</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100">
          <div className="text-2xl font-bold text-red-400">265</div>
          <div className="text-xs text-gray-500 mt-1">Escalated</div>
        </div>
      </div>
    </div>
  );
};

export default AIPerformanceCard;