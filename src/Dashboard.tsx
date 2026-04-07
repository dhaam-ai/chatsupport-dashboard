import React from 'react';
import StatsGrid from './components/StatsGrid';
import AlertsCard from './components/AlertsCard';
import AIPerformanceCard from './components/AIPerformanceCard';
import TicketVolumeCard from './components/TicketVolumeCard';
import TicketStatusChart from './components/TicketStatusChart';
import RecentTicketsCard from './components/RecentTicketsCard';

const Dashboard = () => {
  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl shadow-xl font-semibold text-sm z-[1000] animate-slideIn';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.replace('animate-slideIn', 'animate-slideOut');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };

  const handleNavigate = (page: string) => {
    showToast(`Navigating to ${page}...`);
  };

  return (
    <div className="p-6 space-y-6 h-[90vh] overflow-scroll">
      <StatsGrid />

      <div className="grid  lg:grid-cols-2 gap-6">
        <AlertsCard onAction={showToast} />
        <AIPerformanceCard />
      </div>

      <div className="grid  lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TicketVolumeCard />
        </div>
        <TicketStatusChart />
      </div>

      <RecentTicketsCard onNavigate={handleNavigate} />
    </div>
  );
};

export default Dashboard;
