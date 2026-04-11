import React, { useState } from "react";
import {
  FiPaperclip, FiFlag, FiSend, FiDownload, FiEye,
  FiCheckCircle, FiClock, FiAlertCircle
} from "react-icons/fi";
import { BsCurrencyRupee } from "react-icons/bs";

// ─── Shared dummy data ───────────────────────────────────────────
const FILES = [
  { id: 1, name: "UI_Screens_v2.fig", uploader: "Arjun", date: "Feb 2", color: "bg-purple-500" },
  { id: 2, name: "UI_Screens_v3.fig", uploader: "Arjun", date: "Feb 2", color: "bg-purple-500" },
  { id: 3, name: "UI_Screens_v4.fig", uploader: "Arjun", date: "Feb 2", color: "bg-purple-500" },
];

const MILESTONES = [
  { id: 1, title: "Milestone 1 – Wireframes",       days: 20, status: "Approved",    amount: 45000 },
  { id: 2, title: "Milestone 2 – UI Design",        days: 30, status: "In Review",   amount: 60000 },
  { id: 3, title: "Milestone 3 – Front-end Dev",    days: 30, status: "Pending",     amount: 80000 },
  { id: 4, title: "Milestone 4 – Backend & APIs",   days: 25, status: "Pending",     amount: 75000 },
  { id: 5, title: "Milestone 5 – Testing & Launch", days: 15, status: "Pending",     amount: 40000 },
];

const MESSAGES = [
  {
    id: 1,
    type: "escrow",
    amount: "₹ 45,000",
    sub: "Milestone 1 Approved yesterday at 4:30 PM",
  },
  {
    id: 2,
    type: "message",
    sender: "Arjun Patel",
    avatar: "A",
    avatarBg: "bg-blue-500",
    time: "9:45 AM",
    text: "Milestone 2 UI screens completed. Please review.",
    files: [
      { name: "UI_Screens_v2.fig", time: "9:45 AM" },
      { name: "UI_Screens_v3.fig", time: "9:45 AM", actions: true },
      { name: "UI_Screens_v4.fig", time: "9:45 AM", actions: true },
    ],
  },
  {
    id: 3,
    type: "milestone_submitted",
    sender: "Arjun Patel",
    avatar: "A",
    avatarBg: "bg-blue-500",
    time: "9:45 AM",
    milestone: "Milestone 2",
  },
  {
    id: 4,
    type: "message",
    sender: "Akshay Dogra",
    avatar: "AK",
    avatarBg: "bg-teal-500",
    time: "9:50 AM",
    text: "I will review them and get back to you soon. Thanks Arjun",
  },
];

// ─── Status badge helper ─────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Approved:   { cls: "bg-green-100 text-green-600",  icon: <FiCheckCircle size={10} /> },
    "In Review":{ cls: "bg-blue-100 text-blue-600",    icon: <FiClock size={10} /> },
    Pending:    { cls: "bg-gray-100 text-gray-500",    icon: <FiAlertCircle size={10} /> },
  };
  const { cls, icon } = map[status] || map.Pending;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${cls}`}>
      {icon}{status}
    </span>
  );
};

// ─── File row ────────────────────────────────────────────────────
const FileRow = ({ file, compact = false }) => (
  <div className={`flex items-center gap-3 ${compact ? "py-2 border-b border-gray-100 last:border-0" : "bg-gray-50 rounded-lg px-3 py-2 mb-1.5"}`}>
    <div className={`w-7 h-7 rounded-lg ${file.color} flex items-center justify-center flex-shrink-0`}>
      <FiPaperclip size={12} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-800 truncate">{file.name}</p>
      <p className="text-[10px] text-gray-400">Uploaded by {file.uploader} · {file.date}</p>
    </div>
    {!compact && (
      <button className="p-1.5 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition">
        <FiDownload size={12} />
      </button>
    )}
  </div>
);

// ─── Chat message renderer ───────────────────────────────────────
const ChatMessage = ({ msg }) => {
  if (msg.type === "escrow") {
    return (
      <div className="flex items-start gap-2 py-3">
        <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <BsCurrencyRupee size={13} className="text-teal-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            <span className="text-teal-600">{msg.amount}</span> moved to escrow
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">{msg.sub}</p>
        </div>
      </div>
    );
  }

  if (msg.type === "milestone_submitted") {
    return (
      <div className="flex items-start gap-2.5 py-2">
        <div className={`w-8 h-8 rounded-full ${msg.avatarBg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
          {msg.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-violet-600">{msg.milestone} Submitted</span>
              {" "}by {msg.sender}
            </p>
            <span className="text-[10px] text-gray-400 ml-auto">{msg.time}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button className="text-xs font-semibold text-white bg-violet-500 hover:bg-violet-600 px-3 py-1.5 rounded-lg transition">
              Review Milestone
            </button>
            <button className="text-xs font-semibold text-white bg-teal-500 hover:bg-teal-600 px-3 py-1.5 rounded-lg transition">
              Approve
            </button>
            <button className="text-xs font-medium text-gray-600 hover:text-gray-800 px-1 py-1.5 transition">
              Request Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 py-2">
      <div className={`w-8 h-8 rounded-full ${msg.avatarBg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 flex-shrink-0`}>
        {msg.avatar}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-gray-800">{msg.sender}</span>
          <span className="text-[10px] text-gray-400">{msg.time}</span>
        </div>
        {msg.text && <p className="text-xs text-gray-700 mb-2 leading-relaxed">{msg.text}</p>}
        {msg.files && (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {msg.files.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5 px-3 py-2 border-b border-gray-100 last:border-0 bg-white hover:bg-gray-50 transition">
                <div className="w-6 h-6 rounded-md bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <FiPaperclip size={10} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{f.name}</p>
                  <p className="text-[10px] text-gray-400">{f.time}</p>
                </div>
                {f.actions && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button className="text-[10px] font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 px-2 py-0.5 rounded transition">
                      Preview
                    </button>
                    <button className="text-[10px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded transition">
                      Download
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Files Tab ───────────────────────────────────────────────────
const FilesTab = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col h-full">
      {/* Date divider */}
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[10px] text-gray-400 font-medium">Today</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Chat Feed */}
      <div className="flex-1 overflow-y-auto px-4 space-y-0.5">
        {MESSAGES.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}
      </div>

      {/* Message Input */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
          <button className="text-gray-400 hover:text-teal-500 transition flex-shrink-0">
            <FiPaperclip size={16} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button className="text-teal-500 hover:text-teal-600 transition flex-shrink-0">
            <FiSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Milestones Tab ──────────────────────────────────────────────
const MilestonesTab = () => {
  const [selected, setSelected] = useState(MILESTONES[1]);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-4 py-3 space-y-2">
        {/* Section header */}
        <div className="flex items-center gap-2 mb-1">
          <FiFlag className="text-teal-500" size={13} />
          <h3 className="text-xs font-semibold text-gray-700">Project Milestones</h3>
          <span className="ml-auto text-[10px] text-gray-400">{MILESTONES.length} total</span>
        </div>

        {/* Milestone list */}
        {MILESTONES.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelected(m)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
              selected?.id === m.id
                ? "border-teal-400 bg-teal-50"
                : "border-gray-100 bg-white hover:border-teal-200 hover:bg-gray-50"
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              m.status === "Approved" ? "bg-green-100 text-green-600" :
              m.status === "In Review" ? "bg-blue-100 text-blue-600" :
              "bg-gray-100 text-gray-500"
            }`}>
              {m.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate">{m.title}</p>
              <p className="text-[10px] text-gray-400">{m.days} Days</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge status={m.status} />
              <p className="text-[10px] font-semibold text-gray-600">
                ₹{m.amount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}

        {/* Selected detail card */}
        {selected && (
          <div className="mt-3 bg-white border border-teal-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-bold text-gray-800">{selected.title}</p>
                <StatusBadge status={selected.status} />
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400">Budget</p>
                <p className="text-sm font-bold text-teal-600">₹{selected.amount.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-2 border-t border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400">Duration</p>
                <p className="text-xs font-semibold text-gray-700">{selected.days} Days</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Milestone</p>
                <p className="text-xs font-semibold text-gray-700">{selected.id} of {MILESTONES.length}</p>
              </div>
            </div>
            {selected.status === "In Review" && (
              <div className="mt-3 flex items-center gap-2">
                <button className="flex-1 text-xs font-semibold text-white bg-teal-500 hover:bg-teal-600 py-2 rounded-lg transition">
                  Approve
                </button>
                <button className="flex-1 text-xs font-medium text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 py-2 rounded-lg transition">
                  Request Changes
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main BottomSec ──────────────────────────────────────────────
const BottomSec = ({ activeTab }) => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {activeTab === "files" && <FilesTab />}
      {activeTab === "milestones" && <MilestonesTab />}
    </div>
  );
};

export default BottomSec;