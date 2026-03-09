import React, { useState, useEffect } from "react";
import { Check, X, ArrowLeft } from "lucide-react";
import { IoGrid } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";

const proposals = [
  { id: 1, company: "Stellar", project: "Mobile App Development", amount: "₹ 1,20,000", status: "Countered", statusColor: "bg-orange-100 text-orange-500", expiry: "Expires in 2 4 days", avatarBg: "bg-orange-400", initial: "S" },
  { id: 2, company: "NomadX", project: "Saas Web Development", amount: "₹ 80,000", status: "Awaiting Response", statusColor: "bg-blue-100 text-blue-500", expiry: "Expires in 4 4 days", avatarBg: "bg-blue-400", initial: "N" },
  { id: 3, company: "DQ Solutions", project: "E-commerce Website", amount: "₹ 75,000", status: "Expires tomorrow", statusColor: "bg-red-100 text-red-500", expiry: "Expires tomorrow", avatarBg: "bg-indigo-400", initial: "D" },
  { id: 4, company: "PQ Solutions", project: "UI/UX Design", amount: "₹ 45,000", status: "Declined", statusColor: "bg-red-50 text-red-400", expiry: "Declined 3 days ago", avatarBg: "bg-sky-400", initial: "P" },
  { id: 5, company: "CyberCore", project: "CRM System Setup", amount: "", status: "", statusColor: "", expiry: "Declined 3 days ago", avatarBg: "bg-teal-400", initial: "C" },
];

// ── Shared detail content ─────────────────────────────────────────────────────
const ProposalDetail = ({ selected }) => (
  <div className="bg-white rounded-2xl shadow-sm lg:px-5 pt-3 pb-3 px-3">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${selected.avatarBg} flex items-center justify-center text-white font-bold text-base shrink-0`}>
          {selected.initial}
        </div>
        <div>
          <h2 className="font-bold text-gray-800 text-base leading-tight">{selected.company} × Akshay Dogra</h2>
          <p className="text-gray-400 text-xs">{selected.project}</p>
        </div>
      </div>
      <p className="font-bold text-gray-800 text-base">₹1,20,000</p>
    </div>

    <div className="mb-4">
      <span className="bg-linear-to-b from-[#A8A0E8] to-[#958FD9] text-white text-xs px-4 py-1 rounded-full font-medium">
        Counter Offer
      </span>
    </div>

    <div className="mb-4">
      <h3 className="font-semibold text-gray-800 mb-2 text-sm">Proposed Terms</h3>
      <p className="text-gray-600 text-xs mb-1"><span className="font-medium">Scope:</span> 20 app screens • API integration - 3 revisions</p>
      <p className="text-gray-600 text-xs mb-1"><span className="font-medium">Timeline:</span> 60 Days</p>
      <p className="text-gray-600 text-xs"><span className="font-medium">Total Budget:</span> ₹1,20,000</p>
    </div>

    <hr className="mb-4" />

    <div className="mb-4">
      <h3 className="font-semibold text-gray-800 mb-3 text-sm">Change History</h3>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center mt-0.5 shrink-0">
            <Check size={12} className="text-purple-600" />
          </div>
          <p className="text-xs text-gray-600"><span className="font-medium text-gray-800">Startup</span> Proposed ₹1,00,000</p>
        </div>
        <span className="text-xs text-gray-500 shrink-0">₹ 4.0L</span>
      </div>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2">
          <div className={`w-6 h-6 rounded-full ${selected.avatarBg} flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5`}>A</div>
          <div>
            <div className="flex items-center gap-1 flex-wrap">
              <p className="text-xs font-medium text-gray-800">Professional Akshay Dogra</p>
              <span className="bg-yellow-100 text-yellow-600 text-[10px] px-1.5 py-0.5 rounded font-medium">Budget updated</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold text-gray-800 text-xs">₹1,20,000</span>
              <span className="bg-linear-to-b from-[#A8A0E8] to-[#958FD9] text-white text-[10px] px-2 py-0.5 rounded-full">Counter Offer</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-gray-500 shrink-0">₹ 2.0L</span>
      </div>
      <p className="text-xs text-gray-400 mb-3">2 days ago ✎</p>
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center mt-0.5 shrink-0">
          <Check size={12} className="text-purple-600" />
        </div>
        <p className="text-xs text-gray-600"><span className="font-medium text-gray-800">Startup</span> Modified milestone split:</p>
      </div>
    </div>

    <hr className="mb-4" />

    <div className="flex items-center gap-2 flex-wrap">
      <button className="flex items-center gap-2 bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white text-sm font-semibold px-4 py-2 rounded-lg whitespace-nowrap">
        <Check size={14} /> Accept Proposal
      </button>
      <button className="border border-purple-300 text-purple-600 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors whitespace-nowrap">
        Counter Offer
      </button>
      <button className="border border-red-200 text-red-400 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap">
        Reject
      </button>
    </div>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const Bottom = () => {
  const [selected, setSelected] = useState(proposals[0]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleSelect = (p) => {
    setSelected(p);
    setMobileOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-3 w-full px-3 lg:px-6 py-4">

      {/* ══ LEFT: Proposal List ══════════════════════════════════════════════ */}
      <div className="lg:w-[22%] w-full flex flex-col">
        <div className="flex items-center justify-between h-8 mb-2">
          <h1 className="font-semibold text-[#5C5D78] text-base leading-none">Proposal List</h1>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="bg-white border border-gray-200 px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 text-[#837DA1] w-full">
            <AiOutlineBars size={12} /><span>All Status</span>
          </div>
          <div className="bg-white border border-gray-200 px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 text-[#837DA1] w-full">
            <IoGrid size={11} /><span>Table</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide" style={{ maxHeight: "54vh" }}>
          {proposals.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`bg-white rounded-xl p-3 cursor-pointer border transition-all ${
                selected.id === p.id ? "border-purple-200 shadow-md" : "border-transparent shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-7 h-7 rounded-full ${p.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {p.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm leading-tight">{p.company}</p>
                  <p className="text-gray-400 text-[10px]">{p.project}</p>
                </div>
              </div>
              {p.amount && (
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800 text-sm">{p.amount}</span>
                  {p.status && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${p.statusColor}`}>{p.status}</span>
                  )}
                </div>
              )}
              <p className="text-[10px] text-gray-400 mt-1">{p.expiry}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MIDDLE: Desktop only ═════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[48%] flex-col">
        <ProposalDetail selected={selected} />
      </div>

      {/* ══ MOBILE: Slide-up overlay ═════════════════════════════════════════ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          onClick={() => setMobileOpen(false)}
        >
          {/* Panel — stop propagation so tapping inside doesn't close */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl flex flex-col bg-gray-100"
            style={{ maxHeight: "88vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top handle bar + back + close */}
            <div className="flex items-center justify-between px-4 py-3 bg-white rounded-t-2xl border-b border-gray-100 shrink-0">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 active:text-gray-900"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              {/* Company name in center */}
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full ${selected.avatarBg} flex items-center justify-center text-white text-[10px] font-bold`}>
                  {selected.initial}
                </div>
                <p className="font-semibold text-gray-800 text-sm">{selected.company}</p>
              </div>

              <button
                onClick={() => setMobileOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 active:bg-gray-200"
              >
                <X size={15} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto scrollbar-hide flex-1 p-3">
              <ProposalDetail selected={selected} />
            </div>
          </div>
        </div>
      )}

      {/* ══ RIGHT: Terms Summary  ════════════════════════════════ */}
      <div className="lg:w-[30%] w-full flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm px-3 py-4 lg:p-4">
          <div className="h-8 mb-2 bg-[#FDF1E7] rounded-xl shadow-sm px-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
            <p className="text-xs text-[#6D5A4A] font-medium">Proposal expires in 2 days</p>
          </div>

          <h3 className="font-semibold text-gray-800 mb-3 text-sm">Terms Summary</h3>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <p className="text-xs text-gray-500 font-medium">Startup Offer</p>
            <p className="text-xs text-gray-500 font-medium">Professional Counter</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="font-bold text-gray-800 text-sm">₹ 1,00,000</p>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="font-bold text-gray-800 text-sm">₹ 1,20,000</p>
            </div>
          </div>

          <hr className="mb-3" />

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Budget</p>
              <span className="bg-orange-100 text-orange-500 text-xs px-3 py-1 rounded-full font-medium">45 days</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Timeline</p>
              <span className="bg-orange-100 text-orange-500 text-xs px-3 py-1 rounded-full font-medium">60 days</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Revisions</p>
              <span className="text-xs text-gray-700 font-medium">2</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button className="w-full flex items-center justify-center gap-2 bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white text-sm font-semibold py-2.5 rounded-xl">
              <Check size={14} /> Accept Proposal
            </button>
            <button className="w-full border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
              Counter Offer
            </button>
            <button className="w-full border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
              Reject
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Bottom;