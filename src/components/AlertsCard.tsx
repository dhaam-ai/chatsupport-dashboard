import React from 'react';

interface AlertProps {
  type: 'error' | 'warning' | 'info';
  icon: string;
  title: string;
  text: string;
  onAction: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, icon, title, text, onAction }) => {
  const bgColors = {
    error: 'bg-red-50 border-red-500 text-red-900',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
    info: 'bg-blue-50 border-blue-500 text-blue-900',
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg mb-3 border-l-4 ${bgColors[type]}`}>
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <div className="font-semibold mb-0.5">{title}</div>
        <div className="text-sm opacity-90">{text}</div>
      </div>
      <button
        className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
        onClick={onAction}
      >
        Review
      </button>
    </div>
  );
};

interface AlertsCardProps {
  onAction: (msg: string) => void;
}


const AlertsCard = ({ onAction }: { onAction: (msg: string) => void }) => {
  return (
    <div className="bg-white rounded-2xl border border-purple-100 p-6 mb-6 shadow-sm hover:shadow-lg hover:shadow-purple-100/50 transition-all">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100">
        <h3 className="text-lg font-bold text-gray-900">
          Urgent Alerts
        </h3>
        <span 
          className="text-sm font-semibold cursor-pointer hover:opacity-80 transition-colors" 
          style={{ color: '#7c43df' }}
          onClick={() => onAction('Opening alerts')}
        >
          View All
        </span>
      </div>
      <Alert 
        type="error" 
        icon="⚠️" 
        title="SLA Breach Warning" 
        text="3 tickets are approaching SLA deadline" 
        onAction={() => onAction('Viewing SLA tickets')} 
      />
      <Alert 
        type="warning" 
        icon="📢" 
        title="Unassigned Tickets" 
        text="5 urgent tickets need immediate assignment" 
        onAction={() => onAction('Assigning tickets')} 
      />
      <Alert 
        type="info" 
        icon="🤖" 
        title="AI Escalations" 
        text="8 tickets escalated by AI assistant" 
        onAction={() => onAction('Reviewing escalations')} 
      />
    </div>
  );
};

export default AlertsCard;