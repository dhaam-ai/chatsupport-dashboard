import React from 'react';
import { Ticket, Users, Clock3, Star, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  gradient?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  icon,
  iconBg = 'bg-gray-50',
  iconColor = 'text-gray-700',
  gradient = 'from-gray-500 to-gray-600',
}) => {
  const isNegative = change.startsWith('-');
  const changeValue = change.replace(/[+-]/g, '');

  return (
    <div className="group relative bg-white border border-gray-300  rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-purple-50/0 group-hover:from-purple-50/50 group-hover:to-transparent transition-all duration-300 rounded-2xl"></div>
      
      <div className="relative z-10">
        {/* Top section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {label}
            </p>
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
              {value}
            </h3>
          </div>
          
          {/* Icon with clean background */}
          <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} border-2 border-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
            <div className={`${iconColor}`}>
              {icon}
            </div>
          </div>
        </div>

        {/* Bottom section with trend */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
            isNegative 
              ? 'bg-red-50 text-red-600' 
              : 'bg-emerald-50 text-emerald-600'
          }`}>
            {isNegative ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5" />
            )}
            {changeValue}
          </div>
          <span className="text-xs text-gray-500 font-medium">vs last month</span>
        </div>
      </div>

      {/* Decorative corner element - theme colored */}
      
    </div>
  );
};

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Tickets"
        value="247"
        change="+12%"
        icon={<Ticket className="w-6 h-6" />}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        gradient="from-blue-500 to-blue-600"
      />
      <StatCard
        label="Active Customers"
        value="1,842"
        change="+8.2%"
        icon={<Users className="w-6 h-6" />}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
        gradient="from-emerald-500 to-emerald-600"
      />
      <StatCard
        label="Avg Response Time"
        value="2.5h"
        change="-18%"
        icon={<Clock3 className="w-6 h-6" />}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
        gradient="from-amber-500 to-amber-600"
      />
      <StatCard
        label="Satisfaction Score"
        value="94%"
        change="+2.1%"
        icon={<Star className="w-6 h-6" />}
        iconBg="bg-purple-50"
        iconColor="text-purple-600"
        gradient="from-purple-500 to-purple-600"
      />
    </div>
  );
};

export default StatsGrid;