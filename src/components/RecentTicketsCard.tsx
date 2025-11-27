import React, { useEffect, useState } from "react";

interface Ticket {
  id: string;
  name: string;
  email: string;
  subject: string;
  priority: string;
  priorityColor: string;
  status: string;
  statusColor: string;
  agent: string | null;
  agentName: string;
  agentBg: string;
  createdAt: Date;
}

const SLA_LIMIT_HOURS = 4;

const RecentTicketsCard = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "#5421",
      name: "John Doe",
      email: "john@example.com",
      subject: "Login authentication issue",
      priority: "Urgent",
      priorityColor: "bg-red-100 text-red-800",
      status: "In Progress",
      statusColor: "bg-yellow-100 text-yellow-800",
      agent: "SJ",
      agentName: "Sarah",
      agentBg: "from-blue-500 to-purple-600",
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      id: "#5420",
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Billing inquiry about invoice",
      priority: "High",
      priorityColor: "bg-yellow-100 text-yellow-800",
      status: "Open",
      statusColor: "bg-blue-100 text-blue-800",
      agent: "MC",
      agentName: "Mike",
      agentBg: "from-green-600 to-green-700",
      createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
    },
    {
      id: "#5416",
      name: "David Parker",
      email: "david@example.com",
      subject: "Unable to upload attachments",
      priority: "Normal",
      priorityColor: "bg-blue-100 text-blue-800",
      status: "Open",
      statusColor: "bg-blue-100 text-blue-800",
      agent: "AK",
      agentName: "Aisha",
      agentBg: "from-pink-500 to-rose-600",
      createdAt: new Date(Date.now() - 20 * 60 * 1000),
    },
    {
      id: "#5419",
      name: "Bob Martin",
      email: "bob@example.com",
      subject: "Application crash on startup",
      priority: "Urgent",
      priorityColor: "bg-red-100 text-red-800",
      status: "New",
      statusColor: "bg-red-100 text-red-800",
      agent: null,
      agentName: "Unassigned",
      agentBg: "",
      createdAt: new Date(Date.now() - 3.7 * 60 * 60 * 1000),
    },
  ]);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (msLeft: number) => {
    if (msLeft <= 0) return "00:00:00";
    const totalSeconds = Math.floor(msLeft / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const getSlaClass = (msLeft: number) => {
    const hoursLeft = msLeft / (1000 * 60 * 60);
    if (hoursLeft <= 0.5)
      return "bg-red-50 border-red-500 text-red-800 animate-pulse border-2";
    if (hoursLeft <= 1.5)
      return "bg-red-50 border-red-300 text-red-700 border-2";
    if (hoursLeft <= 3)
      return "bg-yellow-50 border-yellow-300 text-yellow-700 border-2";
    return "bg-green-50 border-green-300 text-green-700 border-2";
  };

  return (
    <div className="bg-white rounded-2xl border border-purple-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100">
        <h3 className="text-lg font-bold text-gray-900">Recent Tickets</h3>
        <span
          className="text-sm font-semibold cursor-pointer hover:opacity-80 transition-colors"
          style={{ color: '#7c43df' }}
          onClick={() => onNavigate("tickets")}
        >
          View All Tickets
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Ticket ID", "Customer", "Subject", "Priority", "Status", "SLA", "Agent", "Updated"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-4 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, i) => {
              const elapsed = now - ticket.createdAt.getTime();
              const remaining = SLA_LIMIT_HOURS * 3600000 - elapsed;
              const slaClass = getSlaClass(remaining);

              return (
                <tr
                  key={i}
                  className="hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <td className="px-4 py-4 text-sm font-bold" style={{ color: '#7c43df' }}>{ticket.id}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="font-semibold text-gray-900">{ticket.name}</div>
                    <div className="text-xs text-gray-500">{ticket.email}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">{ticket.subject}</td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${ticket.priorityColor}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${ticket.statusColor}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm w-[130px]">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-[10px] font-mono font-semibold text-sm justify-center ${slaClass}`}
                      style={{ width: "120px", textAlign: "center" }}
                    >
                      <span className="text-base">⏱</span>
                      {formatTime(remaining)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {ticket.agent ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">{ticket.agentName}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">{ticket.agentName}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {Math.floor(elapsed / 60000)} min ago
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTicketsCard;