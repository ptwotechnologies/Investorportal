import React, { useState } from "react";
import { Check, ChevronDown, AlignJustify } from "lucide-react";
import { AiOutlineBars } from "react-icons/ai";
import { IoGrid } from "react-icons/io5";
import { BiColumns } from "react-icons/bi";

// ── Data ─────────────────────────────────────────────────────────────────────
const deals = [
  {
    id: 1,
    company: "Stellar",
    project: "Mobile App Development",
    sub: "lo dlay Fi 0 erepns",
    totalValue: "₹ 1,20,000",
    totalSub: "₹ 1,0.4%",
    escrow: "₹ 1,20,000",
    escrowSub: "₹ 2,2.2%",
    successRate: 100,
    completed: "10 Mar 2026",
    avatarBg: "bg-orange-400",
    initial: "S",
  },
  {
    id: 2,
    company: "NomadX",
    project: "Backend API Development",
    sub: "6 Repons1 :1 Rlécup",
    totalValue: "₹ 90,000",
    totalSub: "₹ 2,2.2%",
    escrow: "₹ 90,000",
    escrowSub: "₹ 29.3%",
    successRate: 100,
    completed: "5 Mar 2026",
    avatarBg: "bg-yellow-500",
    initial: "N",
  },
  {
    id: 3,
    company: "PQ Solutions",
    project: "UI/UX Design",
    sub: "6 Deals·1d Pesign",
    totalValue: "₹ 55,000",
    totalSub: "₹ 1,5.2%",
    escrow: "₹ 55,000",
    escrowSub: "₹ 36.7%",
    successRate: 90,
    completed: "1 Mar 2026",
    avatarBg: "bg-indigo-400",
    initial: "P",
  },
  {
    id: 4,
    company: "Munify",
    project: "Custom Software Build",
    sub: "6 Deals, 1miesional",
    totalValue: "₹ 2,35,000",
    totalSub: "₹ 2,36.7%",
    escrow: "₹ 2,35,000",
    escrowSub: "₹ 1,52.2%",
    successRate: 100,
    completed: "20 Feb 2026",
    avatarBg: "bg-teal-400",
    initial: "M",
  },
  {
    id: 5,
    company: "PQ Solutions",
    project: "UI/UX Design",
    sub: "6 Deals, 1miesional",
    totalValue: "₹ 55,000",
    totalSub: "₹ 52.46%",
    escrow: "₹ 55,000",
    escrowSub: "₹ 3,24.3%",
    successRate: 90,
    completed: "1 Mar 2026",
    avatarBg: "bg-sky-400",
    initial: "P",
  },
  {
    id: 6,
    company: "Munify",
    project: "Custom Software Build",
    sub: "9 Deals, 1miesional",
    totalValue: "₹ 2,35,000",
    totalSub: "₹ 2,35.2%",
    escrow: "₹ 2,35,000",
    escrowSub: "₹ 2,35.2%",
    successRate: 100,
    completed: "20 Feb 2026",
    avatarBg: "bg-teal-500",
    initial: "M",
  },
];

const providers = [
  { company: "PQ Solutions", sub: "5, Dealt, Suc.", rating: 4.8, avatarBg: "bg-indigo-400", initial: "P" },
  { company: "Stellar",      sub: "6, Deals, Suc.", rating: 4.8, avatarBg: "bg-orange-400", initial: "S" },
  { company: "Stellar",      sub: "6, Deals, Suc.", rating: 4.8, avatarBg: "bg-yellow-500", initial: "S" },
  { company: "NomadX",       sub: "9, Deals, Suc.", rating: 4.8, avatarBg: "bg-teal-400",   initial: "N" },
];

const reviewSummary = [
  { stars: 5, count: 28 },
  { stars: 4, count: 4  },
  { stars: 3, count: 1  },
];

// ── Gauge ────────────────────────────────────────────────────────────────────
const RatingGauge = ({ value = 4.6 }) => (
  <div className="flex flex-col items-center">
    <svg width="120" height="40" viewBox="0 0 120 70">
      <path d="M 14 65 A 48 48 0 0 1 106 65" fill="none" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
      <path
        d="M 14 65 A 48 48 0 0 1 106 65"
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${(value / 5) * 150} 150`}
      />
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A8A0E8" />
          <stop offset="100%" stopColor="#71BEB6" />
        </linearGradient>
      </defs>
      <text x="60" y="63" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1F2937">{value}</text>
    </svg>
    <div className="flex gap-0.5 -mt-1">
      {[1,2,3,4,5].map((i) => (
        <span key={i} className={`text-base ${i <= Math.floor(value) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
      ))}
    </div>
  </div>
);

// ── Column widths — SAME for header and rows ─────────────────────────────────
// Using explicit % widths on a flex row so header & rows always align
const COL = {
  deal:    "w-[28%]",
  total:   "w-[18%]",
  escrow:  "w-[18%]",
  success: "w-[14%]",
  date:    "w-[18%]",
};

// ── Main ─────────────────────────────────────────────────────────────────────
const Bottom = () => {
  const [view, setView] = useState("table");

  return (
    <div className="flex items-start gap-4 w-full px-6 py-4">

      {/* ══ LEFT: Deal Table ═════════════════════════════════════════════════ */}
      <div className="w-[70%] flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5">
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                view === "grid" ? "bg-[#EBE0FB] text-purple-600" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <IoGrid size={12} /> Grid View
            </button>
            <button
              onClick={() => setView("table")}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                view === "table" ? "bg-[#EBE0FB] text-purple-600" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <AlignJustify size={12} /> Table View
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400">
            <button className="p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50"><AiOutlineBars size={13} /></button>
            <button className="p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50"><AlignJustify size={13} /></button>
            <button className="p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50"><BiColumns size={13} /></button>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* ── Header row ── */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 text-sm font-semibold text-gray-500">
            <div className="w-[30%]">Deal</div>
            <div className="w-[16%] flex items-center gap-1">
              Total Value <ChevronDown size={11} />
            </div>
            <div className="w-[16%]">Escrow Released</div>
            <div className="w-[13%]">Success Rate</div>
            <div className="w-[16%]">Completed</div>
          </div>

          {/* ── Data rows ── */}
          <div className="divide-y divide-gray-50 overflow-y-auto scrollbar-hide" style={{ maxHeight: "53vh" }}>
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="flex items-start justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
              >
                {/* Deal */}
                <div className="w-[30%] flex items-center gap-3 pr-2">
                  <div className={`w-9 h-9 rounded-xl ${deal.avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                    {deal.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 text-sm leading-tight truncate">{deal.company}</p>
                    <p className="text-gray-400 text-[10px] truncate">{deal.project}</p>
                    <p className="text-gray-300 text-[9px] truncate">{deal.sub}</p>
                  </div>
                </div>

                {/* Total Value */}
                <div className="w-[16%]">
                  <p className="font-bold text-[#433267] text-sm">{deal.totalValue}</p>
                  <p className="text-purple-400 text-[10px] mt-0.5">{deal.totalSub}</p>
                </div>

                {/* Escrow Released */}
                <div className="w-[16%]">
                  <p className="font-bold text-[#433267] text-sm">{deal.escrow}</p>
                  <p className="text-purple-400 text-[10px] mt-0.5">{deal.escrowSub}</p>
                </div>

                {/* Success Rate */}
                <div className="w-[13%] flex items-center gap-1.5">
                  {deal.successRate === 100 ? (
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-teal-600" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-yellow-500" />
                    </div>
                  )}
                  <span className="font-bold text-[#433267]  text-sm">{deal.successRate}%</span>
                </div>

                {/* Completed date + View Details button stacked */}
                <div className="w-[16%] flex flex-col items-start gap-1.5">
                  <span className="text-gray-500 text-xs">{deal.completed}</span>
                  <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors whitespace-nowrap">
                    View Details ›
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ RIGHT: Providers + Ratings ══════════════════════════════════════ */}
      <div className="w-[30%] flex flex-col gap-2">

        {/* Top Service Providers */}
        <div>
          <h1 className="font-semibold text-[#5C5D78] text-base mb-3 mt-1">Top Service Providers</h1>
          <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
            {providers.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl ${p.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {p.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm leading-tight">{p.company}</p>
                    <p className="text-gray-400 text-[10px]">{p.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs text-yellow-400">{"★".repeat(Math.floor(p.rating))}</span>
                  <span className="text-xs font-semibold text-gray-600">{p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Ratings */}
        <div className="bg-white rounded-2xl shadow-sm px-4 pt-2">
          <h3 className="font-semibold text-gray-800 text-sm ">Overall Ratings</h3>

          <div className="flex justify-center mb-1">
            <RatingGauge value={4.6} />
          </div>

          <hr className="" />

          <h3 className="font-semibold text-gray-800 text-sm mb-1">Review Summary</h3>
          <div className="space-y-2">
            {reviewSummary.map((r) => (
              <div key={r.stars} className="flex items-center gap-2">
                <span className="text-yellow-400 text-xs shrink-0">{"★".repeat(r.stars)}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-400 rounded-full"
                    style={{ width: `${(r.count / 28) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-5 text-right shrink-0">{r.count}</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 border border-gray-200 text-gray-600 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 transition-colors">
            View All Reviews
          </button>
        </div>

      </div>
    </div>
  );
};

export default Bottom;