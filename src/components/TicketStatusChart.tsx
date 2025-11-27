import { useEffect, useRef, useState } from 'react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

const TicketStatusChart = () => {
  const { ref, inView } = useScrollAnimation(0.3);
const data = [
  { name: 'Open', value: 45, color: '#F87171' },      // 🔴 Coral Red - Needs attention
  { name: 'In Progress', value: 30, color: '#3B82F6' }, // 🔵 Blue - Being worked on
  { name: 'Resolved', value: 25, color: '#22C55E' }    // 🟢 Green - Completed
];
 return (
  <div ref={ref} className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
      <h3 className="text-lg font-bold text-gray-900">Ticket Status Distribution</h3>
    </div>
    
    {/* Changed layout to be responsive */}
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
      {/* Chart Container - adjusted width */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <ResponsiveContainer width="100%" height={220} minWidth={200}>
          <PieChart>
            <Pie
              key={inView ? 'visible' : 'hidden'}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={1200}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend - now stacks on mobile */}
      <div className="flex flex-col gap-3 w-full lg:w-auto">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-4 h-4 rounded flex-shrink-0" style={{ backgroundColor: item.color }}></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-700">{item.name}</div>
              <div className="text-xs text-gray-500">{item.value}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default TicketStatusChart;