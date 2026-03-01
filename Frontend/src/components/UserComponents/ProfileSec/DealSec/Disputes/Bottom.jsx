import React, { useState } from "react";
import { Check, Upload, AlertTriangle, Clock, FileText, MessageSquare, ChevronDown } from "lucide-react";
import { IoGrid } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";

// ── Data ──────────────────────────────────────────────────────────────────────
const cases = [
  {
    id: "DSP-2026-0045",
    company: "Stellar",
    sub: "× Akshay Dogra",
    project: "UI Screens",
    filedBy: "Startup",
    tags: ["HD", "Adher Review"],
    tagColors: ["bg-blue-100 text-blue-600", "bg-green-100 text-green-600"],
    avatarBg: "bg-orange-400",
    initial: "S",
    status: null,
  },
  {
    id: "DSP-2026-0045",
    company: "Dispute Sxy",
    sub: "",
    project: "Milestone ₹11 ,eay Dogra",
    filedBy: "Startup",
    tags: ["Under Review"],
    tagColors: ["bg-purple-100 text-purple-600"],
    avatarBg: "bg-purple-300",
    initial: "D",
    status: null,
  },
  {
    id: null,
    company: "NomadX",
    sub: "",
    project: "F1ad -end API",
    filedBy: "Startup",
    tags: ["Open"],
    tagColors: ["bg-green-100 text-green-600"],
    avatarBg: "bg-blue-400",
    initial: "N",
    status: null,
  },
  {
    id: null,
    company: "PQ Solutions",
    sub: "",
    project: "UI Files",
    filedBy: "Professional",
    tags: ["Resolved"],
    tagColors: ["bg-emerald-100 text-emerald-600"],
    avatarBg: "bg-sky-400",
    initial: "P",
    status: "Resolved",
  },
  {
    id: null,
    company: "Munify",
    sub: "",
    project: "Backend API",
    amount: "₹6500",
    filedBy: "Munity",
    tags: ["Resolved"],
    tagColors: ["bg-emerald-100 text-emerald-600"],
    avatarBg: "bg-teal-400",
    initial: "M",
    status: "Resolved",
  },
];

const evidenceFiles = [
  { name: "Screenshot_01.png", size: "₹ 3.5 KB", icon: "img", color: "bg-blue-50 border-blue-100" },
  { name: "esjera0", size: "2.5 MB", icon: "img", color: "bg-orange-50 border-orange-100" },
  { name: "chat_log.pdf", size: "1.2 MB", icon: "pdf", color: "bg-pink-50 border-pink-100" },
  { name: "Feedback.docx", size: "1.1 MB", icon: "doc", color: "bg-blue-50 border-blue-100" },
];

const messages = [
  {
    sender: "Stellar",
    sub: "(Akshay Dogra)",
    time: "April 5, 2026 at 10:32 AM",
    text: "The initial design does not follow the specifications we agreed upon. I see several UI components missing or misaligned. Please review the wireframes as and make the necessary corrections.",
    avatarBg: "bg-orange-400",
    initial: "S",
  },
  {
    sender: "PQ Solutions",
    sub: "(Amit Verma)",
    time: "April 5, 2026 at 11:00 AM",
    text: "Hello Akshay, I understand your concerns. I'll review the wireframes and ensure that all components are adjusted according to the specifications. I'll get back to you with the revised design.",
    avatarBg: "bg-sky-400",
    initial: "P",
  },
];

const timelineSteps = [
  { label: "Case Timeline", date: "Apr 5, 2026", done: true },
  { label: "Evidence Submitted", date: "Apr 5, 2026", done: true },
  { label: "Platform Review", date: "In Progress", done: false, inProgress: true },
];

const resolutionOptions = [
  { label: "Approve Payment", icon: <Check size={14} />, style: "bg-gradient-to-b from-[#5BB9AE] to-[#379C8C] text-white border-0" },
  { label: "Refund Payment", icon: <span className="text-orange-400">↺</span>, style: "bg-orange-50 text-orange-500 border border-orange-100" },
  { label: "Split Payment", icon: <span className="text-purple-500">⊞</span>, style: "bg-purple-50 text-purple-600 border border-purple-100" },
  { label: "Request Revision", icon: <MessageSquare size={13} className="text-blue-500" />, style: "bg-blue-50 text-blue-600 border border-blue-100" },
  { label: "Escalate", icon: <AlertTriangle size={13} className="text-red-400" />, style: "bg-red-50 text-red-500 border border-red-100" },
];

// ── File icon helper ──────────────────────────────────────────────────────────
const FileIcon = ({ type }) => {
  if (type === "pdf") return <div className="w-8 h-8 bg-pink-200 rounded flex items-center justify-center text-[9px] font-bold text-pink-700">PDF</div>;
  if (type === "doc") return <div className="w-8 h-8 bg-blue-200 rounded flex items-center justify-center text-[9px] font-bold text-blue-700">DOC</div>;
  return <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-[9px] font-bold text-blue-500">IMG</div>;
};

// ── Main ──────────────────────────────────────────────────────────────────────
const Bottom = () => {
  const [selectedCase, setSelectedCase] = useState(cases[0]);

  return (
    <div className="flex items-start gap-3 w-full px-6 py-4">

      {/* ══ LEFT: Case List ════════════════════════════════════════════════════ */}
      <div className="w-[22%] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-semibold text-[#5C5D78] text-base">Case List</h1>
          <div className="flex items-center gap-1">
            <button className="p-1 bg-white border border-gray-200 rounded text-gray-400 hover:bg-gray-50"><IoGrid size={12} /></button>
            <button className="p-1 bg-white border border-gray-200 rounded text-gray-400 hover:bg-gray-50 flex items-center gap-0.5 text-xs px-1.5">
              <AiOutlineBars size={12} /> 1
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide" style={{ maxHeight: "60vh" }}>
          {cases.map((c, i) => (
            <div
              key={i}
              onClick={() => setSelectedCase(c)}
              className={`bg-white rounded-xl p-3 cursor-pointer border transition-all ${
                selectedCase === c ? "border-purple-200 shadow-md" : "border-transparent shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-8 h-8 rounded-full ${c.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {c.initial}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm leading-tight">{c.company}</p>
                  {c.sub && <p className="text-gray-500 text-[10px]">{c.sub}</p>}
                </div>
              </div>

              {c.id && <p className="text-gray-400 text-[10px] mb-1">{c.id}</p>}

              <p className="text-[11px] font-medium text-purple-500 truncate mb-1">{c.project}</p>

              <p className="text-[10px] text-gray-400 mb-1.5">Filed by {c.filedBy}</p>

              {c.amount && <p className="text-[10px] text-gray-600 font-semibold mb-1">Filed by {c.filedBy} {c.amount}</p>}

              <div className="flex flex-wrap gap-1">
                {c.tags.map((tag, j) => (
                  <span key={j} className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${c.tagColors[j] || "bg-gray-100 text-gray-500"}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MIDDLE: Case Detail ════════════════════════════════════════════════ */}
      <div className="w-[50%] flex flex-col" style={{ maxHeight: "65vh" }}>

        {/* Dispute ID header bar — fixed, never scrolls */}
        <div className="flex items-center justify-between  px-2  mb-3 shrink-0">
          <p className="text-sm text-gray-600">
            Dispute ID: <span className="font-bold text-gray-800">DSP-2026-0045</span>
          </p>
          <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 px-3 py-1 rounded-lg">
            <AlertTriangle size={12} className="text-red-400" />
            <span className="text-xs text-red-500 font-medium">Case escalated to compliance</span>
          </div>
        </div>

        {/* All detail cards — scrollable together */}
        <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide flex-1">

          {/* Case info card */}
          <div className="bg-white rounded-2xl shadow-sm px-5 py-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="font-bold text-gray-800 text-base">Stellar × Akshay Dogra</h2>
                <p className="text-xs text-gray-500 mt-0.5">Milestone: UI Screens</p>
              </div>
              <p className="font-bold text-gray-800 text-base">₹ 30,000</p>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-gray-500">Amount:</span>
              <span className="font-bold text-gray-800 text-sm">₹ 35,000</span>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-600">
                High <ChevronDown size={11} />
              </div>
            </div>

            <p className="text-xs text-gray-600">
              <span className="font-semibold text-gray-800">Dispute Reason:</span> Work delivered does not match agreed specifications.
            </p>
          </div>

          {/* Evidence Upload */}
          <div className="bg-white rounded-2xl shadow-sm px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">Evidence Upload</h3>
              <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload size={12} />
                Upload More
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {evidenceFiles.map((file, i) => (
                <div key={i} className={`border rounded-xl p-2.5 flex flex-col gap-1.5 ${file.color}`}>
                  <div className="w-full h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileIcon type={file.icon} />
                  </div>
                  <p className="text-[9px] font-medium text-gray-700 truncate">{file.name}</p>
                  <p className="text-[9px] text-gray-400">{file.size}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="bg-white rounded-2xl shadow-sm px-5 py-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Conversation Thread</h3>
            <div className="flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${msg.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>
                    {msg.initial}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm">
                        <span className="font-bold text-gray-800">{msg.sender}</span>{" "}
                        <span className="text-gray-400 text-xs">{msg.sub}</span>
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>{/* end scrollable area */}
      </div>

      {/* ══ RIGHT: Resolution ══════════════════════════════════════════════════ */}
      <div className="w-[28%] flex flex-col gap-3">
        <h1 className="font-semibold text-[#5C5D78] text-base">Resolution</h1>

        {/* Case Timeline */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-3">
          <div className="flex flex-col gap-">
            {timelineSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                {/* Timeline dot + line */}
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    step.inProgress
                      ? "bg-orange-100 border-2 border-orange-400"
                      : step.done
                      ? "bg-purple-100"
                      : "bg-gray-100"
                  }`}>
                    {step.done && !step.inProgress && (
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                    )}
                    {step.inProgress && (
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                    )}
                  </div>
                  {i < timelineSteps.length - 1 && (
                    <div className="w-px h-6 bg-gray-200 mt-1" />
                  )}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${step.inProgress ? "text-orange-500" : "text-gray-800"}`}>
                    {step.label}
                  </p>
                  <p className="text-[10px] text-gray-400">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Options */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-3">
          <h3 className="font-semibold text-gray-800 text-sm mb-2">Resolution Options</h3>
          <div className="flex flex-col gap-2">
            {resolutionOptions.map((opt, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 ${opt.style}`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Bottom;