import { useEffect, useRef, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

const generateTicketData = (days: number) => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    data.push({
      name: d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      }),
      tickets: Math.floor(Math.random() * 300) + 100,
    });
  }

  return data;
};

const TicketVolumeCard = () => {
  const { ref, inView } = useScrollAnimation(0.2);
  const [timeRange, setTimeRange] = useState("7");
  const [data, setData] = useState(generateTicketData(7));
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setData(generateTicketData(Number(timeRange)));
  }, [timeRange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTickInterval = () => {
    const range = Number(timeRange);
    if (range <= 7) return 0;
    if (range <= 30) return 3;
    return 6;
  };

  const timeOptions = [
    { id: "7", label: "Last 7 Days" },
    { id: "30", label: "Last 30 Days" },
    { id: "90", label: "Last 90 Days" },
  ];

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl border border-purple-100 p-6 mb-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100">
        <h3 className="text-lg font-bold text-gray-900">Ticket Volume Trend</h3>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-purple-50 focus:ring-2 transition-all flex items-center gap-2 shadow-sm"
          >
            {timeOptions.find((t) => t.id === timeRange)?.label}
            <svg
              className={`w-4 h-4 transform transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn">
              {timeOptions.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setTimeRange(t.id);
                    setOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer rounded-lg transition-colors ${
                    t.id === timeRange
                      ? 'font-semibold'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  style={t.id === timeRange ? { backgroundColor: '#f3e8ff', color: '#7c43df' } : {}}
                >
                  {t.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-5 bg-gray-50 rounded-lg mt-4">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c43df" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c43df" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              style={{ fontSize: "12px" }}
              interval={getTickInterval()}
            />
            <YAxis stroke="#64748b" style={{ fontSize: "12px" }} width={40} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="tickets"
              stroke="#7c43df"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTickets)"
              animationBegin={0}
              animationDuration={1500}
              isAnimationActive={inView}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TicketVolumeCard;