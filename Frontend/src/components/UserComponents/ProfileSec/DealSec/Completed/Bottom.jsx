import React, { useState } from "react";
import { Check, ChevronDown, AlignJustify } from "lucide-react";
import { AiOutlineBars } from "react-icons/ai";
import { IoGrid } from "react-icons/io5";
import { BiColumns } from "react-icons/bi";

// ── Data ─────────────────────────────────────────────────────────────────────
const deals = [
  { id: 1, company: "Stellar", project: "Mobile App Development", sub: "lo dlay Fi 0 erepns", totalValue: "₹ 1,20,000", totalSub: "₹ 1,0.4%", escrow: "₹ 1,20,000", escrowSub: "₹ 2,2.2%", successRate: 100, completed: "10 Mar 2026", avatarBg: "bg-orange-400", initial: "S" },
  { id: 2, company: "NomadX", project: "Backend API Development", sub: "6 Repons1 :1 Rlécup", totalValue: "₹ 90,000", totalSub: "₹ 2,2.2%", escrow: "₹ 90,000", escrowSub: "₹ 29.3%", successRate: 100, completed: "5 Mar 2026", avatarBg: "bg-yellow-500", initial: "N" },
  { id: 3, company: "PQ Solutions", project: "UI/UX Design", sub: "6 Deals·1d Pesign", totalValue: "₹ 55,000", totalSub: "₹ 1,5.2%", escrow: "₹ 55,000", escrowSub: "₹ 36.7%", successRate: 90, completed: "1 Mar 2026", avatarBg: "bg-indigo-400", initial: "P" },
  { id: 4, company: "Munify", project: "Custom Software Build", sub: "6 Deals, 1miesional", totalValue: "₹ 2,35,000", totalSub: "₹ 2,36.7%", escrow: "₹ 2,35,000", escrowSub: "₹ 1,52.2%", successRate: 100, completed: "20 Feb 2026", avatarBg: "bg-teal-400", initial: "M" },
  { id: 5, company: "PQ Solutions", project: "UI/UX Design", sub: "6 Deals, 1miesional", totalValue: "₹ 55,000", totalSub: "₹ 52.46%", escrow: "₹ 55,000", escrowSub: "₹ 3,24.3%", successRate: 90, completed: "1 Mar 2026", avatarBg: "bg-sky-400", initial: "P" },
  { id: 6, company: "Munify", project: "Custom Software Build", sub: "9 Deals, 1miesional", totalValue: "₹ 2,35,000", totalSub: "₹ 2,35.2%", escrow: "₹ 2,35,000", escrowSub: "₹ 2,35.2%", successRate: 100, completed: "20 Feb 2026", avatarBg: "bg-teal-500", initial: "M" },
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

const SORT_OPTIONS = [
  { label: "All Deals",     dot: "bg-purple-400" },
  { label: "100% Success",  dot: "bg-teal-400" },
  { label: "90% Success",   dot: "bg-yellow-400" },
  { label: "Recent First",  dot: "bg-blue-400" },
];

// ── Gauge ─────────────────────────────────────────────────────────────────────
const RatingGauge = ({ value = 4.6 }) => (
  <div className="flex flex-col items-center">
    <svg width="120" height="40" viewBox="0 0 120 70">
      <path d="M 14 65 A 48 48 0 0 1 106 65" fill="none" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
      <path d="M 14 65 A 48 48 0 0 1 106 65" fill="none" stroke="url(#gaugeGrad)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(value / 5) * 150} 150`} />
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

// ── Desktop table ─────────────────────────────────────────────────────────────
const DesktopTableHeader = () => (
  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 text-sm font-semibold text-gray-500 shrink-0">
    <div className="w-[30%]">Deal</div>
    <div className="w-[16%] flex items-center gap-1">Total Value <ChevronDown size={11} /></div>
    <div className="w-[16%]">Escrow Released</div>
    <div className="w-[13%]">Success Rate</div>
    <div className="w-[16%]">Completed</div>
  </div>
);

const DesktopDealRow = ({ deal }) => (
  <div className="flex items-start justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
    <div className="w-[30%] flex items-center gap-3 pr-2">
      <div className={`w-9 h-9 rounded-xl ${deal.avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0`}>{deal.initial}</div>
      <div className="min-w-0">
        <p className="font-semibold text-gray-800 text-sm leading-tight truncate">{deal.company}</p>
        <p className="text-gray-400 text-[10px] truncate">{deal.project}</p>
        <p className="text-gray-300 text-[9px] truncate">{deal.sub}</p>
      </div>
    </div>
    <div className="w-[16%]">
      <p className="font-bold text-[#433267] text-sm">{deal.totalValue}</p>
      <p className="text-purple-400 text-[10px] mt-0.5">{deal.totalSub}</p>
    </div>
    <div className="w-[16%]">
      <p className="font-bold text-[#433267] text-sm">{deal.escrow}</p>
      <p className="text-purple-400 text-[10px] mt-0.5">{deal.escrowSub}</p>
    </div>
    <div className="w-[13%] flex items-center gap-1.5">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${deal.successRate === 100 ? "bg-teal-100" : "bg-yellow-100"}`}>
        <Check size={11} className={deal.successRate === 100 ? "text-teal-600" : "text-yellow-500"} />
      </div>
      <span className="font-bold text-[#433267] text-sm">{deal.successRate}%</span>
    </div>
    <div className="w-[16%] flex flex-col items-start gap-1.5">
      <span className="text-gray-500 text-xs">{deal.completed}</span>
      <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors whitespace-nowrap">
        View Details ›
      </button>
    </div>
  </div>
);

// ── Mobile compact deal card ──────────────────────────────────────────────────
const MobileDealCard = ({ deal }) => (
  <div className="px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
    {/* Top: avatar + name + success */}
    <div className="flex items-center justify-between mb-2.5">
      <div className="flex items-center gap-2.5">
        <div className={`w-9 h-9 rounded-xl ${deal.avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0`}>{deal.initial}</div>
        <div>
          <p className="font-semibold text-gray-800 text-sm leading-tight">{deal.company}</p>
          <p className="text-gray-400 text-[10px] truncate max-w-[140px]">{deal.project}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${deal.successRate === 100 ? "bg-teal-100" : "bg-yellow-100"}`}>
          <Check size={10} className={deal.successRate === 100 ? "text-teal-600" : "text-yellow-500"} />
        </div>
        <span className="font-bold text-[#433267] text-xs">{deal.successRate}%</span>
      </div>
    </div>

    {/* Bottom: 3 columns — value | escrow | completed+button */}
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1">
        <p className="text-[9px] text-gray-400 mb-0.5">Total Value</p>
        <p className="font-bold text-[#433267] text-xs">{deal.totalValue}</p>
        <p className="text-purple-400 text-[9px]">{deal.totalSub}</p>
      </div>
      <div className="flex-1">
        <p className="text-[9px] text-gray-400 mb-0.5">Escrow Released</p>
        <p className="font-bold text-[#433267] text-xs">{deal.escrow}</p>
        <p className="text-purple-400 text-[9px]">{deal.escrowSub}</p>
      </div>
      <div className="flex-1 flex flex-col items-end">
        <p className="text-[9px] text-gray-400 mb-0.5">Completed</p>
        <p className="text-gray-500 text-xs">{deal.completed}</p>
        <button className="mt-1 text-[9px] text-gray-500 border border-gray-200 px-2 py-0.5 rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap">
          View Details ›
        </button>
      </div>
    </div>
  </div>
);

// ── Mobile section: view toggle + sort dropdown + cards ───────────────────────
const MobileDealsSection = ({ view, setView }) => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("All Deals");
  const activeDot = SORT_OPTIONS.find(o => o.label === sort)?.dot || "bg-purple-400";

  const filtered = sort === "100% Success"
    ? deals.filter(d => d.successRate === 100)
    : sort === "90% Success"
    ? deals.filter(d => d.successRate === 90)
    : sort === "Recent First"
    ? [...deals].reverse()
    : deals;

  return (
    <div className="flex flex-col">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        {/* View toggle */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors ${view === "grid" ? "bg-[#EBE0FB] text-purple-600" : "text-gray-500"}`}
          >
            <IoGrid size={11} /> Grid
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors ${view === "table" ? "bg-[#EBE0FB] text-purple-600" : "text-gray-500"}`}
          >
            <AlignJustify size={11} /> Table
          </button>
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-[#5C5D78] shadow-sm"
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${activeDot}`} />
            {sort}
            <ChevronDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-[145px] overflow-hidden">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => { setSort(opt.label); setOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-left transition-colors ${
                      sort === opt.label ? "bg-[#F4ECFD] text-[#6B3FA0] font-semibold" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${opt.dot}`} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-y-auto scrollbar-hide" style={{ maxHeight: "60vh" }}>
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">No deals found.</div>
          ) : (
            filtered.map((deal) => <MobileDealCard key={deal.id} deal={deal} />)
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const Bottom = () => {
  const [view, setView] = useState("table");

  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 w-full px-3 lg:px-6 py-4">

      {/* ══ LEFT ══════════════════════════════════════════════════════════════ */}
      <div className="lg:w-[70%] w-full flex flex-col">

        {/* DESKTOP — hidden on mobile */}
        <div className="hidden lg:flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5">
              <button onClick={() => setView("grid")} className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${view === "grid" ? "bg-[#EBE0FB] text-purple-600" : "text-gray-500 hover:bg-gray-50"}`}>
                <IoGrid size={12} /> Grid View
              </button>
              <button onClick={() => setView("table")} className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${view === "table" ? "bg-[#EBE0FB] text-purple-600" : "text-gray-500 hover:bg-gray-50"}`}>
                <AlignJustify size={12} /> Table View
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <button className="p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50"><AiOutlineBars size={13} /></button>
              <button className="p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50"><AlignJustify size={13} /></button>
              <button className="p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50"><BiColumns size={13} /></button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm flex flex-col" style={{ maxHeight: "60vh" }}>
            <DesktopTableHeader />
            <div className="overflow-y-auto scrollbar-hide flex-1 divide-y divide-gray-50">
              {deals.map((deal) => <DesktopDealRow key={deal.id} deal={deal} />)}
            </div>
          </div>
        </div>

        {/* MOBILE — hidden on desktop */}
        <div className="flex lg:hidden flex-col">
          <MobileDealsSection view={view} setView={setView} />
        </div>

      </div>

      {/* ══ RIGHT ═════════════════════════════════════════════════════════════ */}
      <div className="lg:w-[30%] w-full flex flex-col gap-2">

        <div>
          <h1 className="font-semibold text-[#5C5D78] text-base mb-3 mt-1">Top Service Providers</h1>
          <div className="bg-white rounded-2xl shadow-sm px-3 py-4 lg:p-4 flex flex-col gap-3">
            {providers.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl ${p.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{p.initial}</div>
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

        <div className="bg-white rounded-2xl shadow-sm px-3 lg:px-4 pt-2 pb-3 lg:pb-1">
          <h3 className="font-semibold text-gray-800 text-sm ">Overall Ratings</h3>
          <div className="flex justify-center mb-1"><RatingGauge value={4.6} /></div>
          <hr className="mb-2" />
          <h3 className="font-semibold text-gray-800 text-sm mb-1">Review Summary</h3>
          <div className="space-y-2">
            {reviewSummary.map((r) => (
              <div key={r.stars} className="flex items-center gap-2">
                <span className="text-yellow-400 text-xs shrink-0 w-[45px]">{"★".repeat(r.stars)}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${(r.count / 28) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-5 text-right shrink-0">{r.count}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-2 border border-gray-200 text-gray-600 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 transition-colors">
            View All Reviews
          </button>
        </div>

      </div>
    </div>
  );
};

export default Bottom;