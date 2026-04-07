import React, { useState } from "react";
import { FiFileText, FiFlag, FiPlus, FiTrash2 } from "react-icons/fi";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdOutlineCalendarToday } from "react-icons/md";

const CURRENCIES = ["INR - Indian Rupee", "USD - US Dollar", "EUR - Euro", "GBP - British Pound"];

const BottomSec = () => {
  // ── Scope of Work ──
  const [scopeItems, setScopeItems] = useState([
    "Develop a mobile app with core features and user registration",
    "Implement payment gateway integration",
  ]);
  const [scopeInput, setScopeInput] = useState("");

  // ── Budget ──
  const [currency, setCurrency] = useState("INR - Indian Rupee");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [equityStake, setEquityStake] = useState(0);
  const [stakeAmount, setStakeAmount] = useState("");

  // ── Milestones ──
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: "Milestone 1 - Wireframes",
      days: 20,
      date: "2024-03-15",
      description: "Create low and high-fidelity wireframes for all app screens including onboarding, dashboard, and core feature flows.",
      deliverables: ["Low-fi wireframes", "High-fi mockups", "Clickable prototype"],
      status: "In Progress",
    },
    {
      id: 2,
      title: "Milestone 2 - UI Design",
      days: 30,
      date: "2024-04-14",
      description: "Design the complete UI with brand guidelines, component library, and all screen designs ready for developer handoff.",
      deliverables: ["Design system", "All screen designs", "Asset exports"],
      status: "Pending",
    },
    {
      id: 3,
      title: "Milestone 3 - Front-end Development",
      days: 30,
      date: "2024-05-14",
      description: "Develop all front-end screens using React Native, integrate with APIs, and ensure responsive layouts across devices.",
      deliverables: ["React Native screens", "API integration", "QA-ready build"],
      status: "Pending",
    },
  ]);
  const [selectedMilestone, setSelectedMilestone] = useState(milestones[0]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newM, setNewM] = useState({ title: "", days: "", date: "", description: "", timeline: "", budget: "" });

  // ── Helpers ──
  const addScopeItem = () => {
    if (scopeInput.trim()) {
      setScopeItems([...scopeItems, scopeInput.trim()]);
      setScopeInput("");
    }
  };
  const removeScopeItem = (idx) => setScopeItems(scopeItems.filter((_, i) => i !== idx));

  const addMilestone = () => {
    if (!newM.title.trim()) return;
    const m = {
      id: Date.now(),
      title: newM.title,
      days: parseInt(newM.days) || 0,
      date: newM.date,
      description: newM.description,
      timeline: newM.timeline,
      budget: newM.budget,
      deliverables: [],
      status: "Pending",
    };
    const updated = [...milestones, m];
    setMilestones(updated);
    setSelectedMilestone(m);
    setNewM({ title: "", days: "", date: "", description: "", timeline: "", budget: "" });
    setShowAddForm(false);
  };

  const removeMilestone = (id, e) => {
    e.stopPropagation();
    const remaining = milestones.filter((m) => m.id !== id);
    setMilestones(remaining);
    if (selectedMilestone?.id === id) setSelectedMilestone(remaining[0] || null);
  };

  const updateStatus = (status) => {
    const updated = milestones.map((m) =>
      m.id === selectedMilestone.id ? { ...m, status } : m
    );
    setMilestones(updated);
    setSelectedMilestone({ ...selectedMilestone, status });
  };

  const statusStyle = (s) => {
    if (s === "In Progress") return "bg-blue-100 text-blue-600";
    if (s === "Done") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-500";
  };

  return (
    <div className="mt-4 p-2 px-4 pb-6 space-y-4">

      {/* ── Add Milestone Modal ── */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FiFlag className="text-teal-500" size={16} />
                <h2 className="text-sm font-semibold text-gray-800">Add New Milestone</h2>
              </div>
              <button
                onClick={() => { setShowAddForm(false); setNewM({ title: "", days: "", date: "", description: "", timeline: "", budget: "" }); }}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
              >
                <span className="text-sm leading-none">✕</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-5 py-4 space-y-3">
              {/* Title */}
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Milestone 4 - Testing"
                  value={newM.title}
                  onChange={(e) => setNewM({ ...newM, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Days + Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Days</label>
                  <input
                    type="number"
                    placeholder="e.g. 20"
                    value={newM.days}
                    onChange={(e) => setNewM({ ...newM, days: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Date</label>
                  <input
                    type="date"
                    value={newM.date}
                    onChange={(e) => setNewM({ ...newM, date: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Description</label>
                <textarea
                  placeholder="Describe what this milestone covers..."
                  value={newM.description}
                  onChange={(e) => setNewM({ ...newM, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Timeline + Budget */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Timeline</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Months"
                    value={newM.timeline}
                    onChange={(e) => setNewM({ ...newM, timeline: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Budget</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={newM.budget}
                      onChange={(e) => setNewM({ ...newM, budget: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg pl-6 pr-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => { setShowAddForm(false); setNewM({ title: "", days: "", date: "", description: "", timeline: "", budget: "" }); }}
                className="flex-1 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition"
              >Cancel</button>
              <button
                onClick={addMilestone}
                className="flex-1 py-2 text-xs font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition shadow-sm"
              >Save Milestone</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 2×2 GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* TOP LEFT — Scope of Work */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <FiFileText className="text-blue-500" size={15} />
            <h3 className="font-semibold text-gray-800 text-sm">Scope of Work</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            Outline the services, tasks, or deliverables you expect from the service professional.
          </p>
          <ul className="space-y-2 mb-3">
            {scopeItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                <span className="flex-1 leading-snug">{item}</span>
                <button
                  onClick={() => removeScopeItem(idx)}
                  className="text-gray-300 hover:text-red-400 text-xs mt-0.5 flex-shrink-0"
                >✕</button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              type="text"
              value={scopeInput}
              onChange={(e) => setScopeInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addScopeItem()}
              placeholder="Add a deliverable..."
              className="flex-1 border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button
              onClick={addScopeItem}
              className="text-xs bg-teal-500 text-white px-3 py-1.5 rounded-md hover:bg-teal-600 transition"
            >Add</button>
          </div>
        </div>

        {/* TOP RIGHT — Budget (matches screenshot) */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <BsCurrencyRupee className="text-yellow-500" size={15} />
            <h3 className="font-semibold text-gray-800 text-sm"> Total Budget</h3>
          </div>

          {/* Row 1: currency pill + min–max inputs */}
          <div className="flex items-center gap-2 mb-4">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-gray-200 rounded-md px-2.5 py-2 text-xs text-gray-600 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-500 flex-shrink-0"
            >
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="flex items-center gap-1 flex-1">
              <div className="relative flex-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                <input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="1,00,000"
                  className="w-full border border-gray-200 rounded-md pl-5 pr-2 py-2 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <span className="text-gray-400 text-xs font-medium">–</span>
              <div className="relative flex-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                <input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="20,000,000"
                  className="w-full border border-gray-200 rounded-md pl-5 pr-2 py-2 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

        

         
        </div>

        {/* BOTTOM LEFT — Milestone List */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col h-55 ">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FiFlag className="text-teal-500" size={15} />
              <h3 className="font-semibold text-gray-800 text-sm">Milestones</h3>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-7 h-7 rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center text-white transition shadow-sm"
              title="Add milestone"
            >
              <FiPlus size={14} />
            </button>
          </div>



          {/* List */}
          <div className="space-y-2 flex-1 overflow-y-auto pr-0.5 scrollbar-hide">
            {milestones.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-8">No milestones yet. Click + to add one.</p>
            )}
            {milestones.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMilestone(m)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer border transition-all ${
                  selectedMilestone?.id === m.id
                    ? "border-teal-400 bg-teal-50"
                    : "border-gray-100 hover:border-teal-200 hover:bg-gray-50"
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${selectedMilestone?.id === m.id ? "bg-teal-500" : "bg-gray-300"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{m.title}</p>
                  <p className="text-xs text-gray-400">{m.days} Days</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusStyle(m.status)}`}>
                  {m.status}
                </span>
                <button
                  onClick={(e) => removeMilestone(m.id, e)}
                  className="text-gray-300 hover:text-red-400 transition flex-shrink-0"
                >
                  <FiTrash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM RIGHT — Milestone Detail */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-55 flex flex-col flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex-1 overflow-y-auto p-4">
          {selectedMilestone ? (
            <>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight">{selectedMilestone.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium mt-1.5 inline-block ${statusStyle(selectedMilestone.status)}`}>
                    {selectedMilestone.status}
                  </span>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Duration</p>
                  <p className="text-lg font-bold text-teal-600 leading-tight">{selectedMilestone.days}</p>
                  <p className="text-[10px] text-gray-400">Days</p>
                </div>
              </div>

              <hr className="border-gray-100 mb-3" />

              {selectedMilestone.date && (
                <div className="flex items-center gap-1.5 mb-3">
                  <MdOutlineCalendarToday size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-500">Due date: </span>
                  <span className="text-xs font-medium text-gray-700">
                    {new Date(selectedMilestone.date).toLocaleDateString("en-IN", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </span>
                </div>
              )}

              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-600 mb-1">Description</p>
                <p className="text-xs text-gray-500 leading-relaxed">{selectedMilestone.description}</p>
              </div>

              {selectedMilestone.deliverables?.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Deliverables</p>
                  <ul className="space-y-1.5">
                    {selectedMilestone.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-2">Update Status</p>
                <div className="flex gap-2">
                  {["Pending", "In Progress", "Done"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(s)}
                      className={`flex-1 text-[10px] py-1.5 rounded-md font-medium transition border ${
                        selectedMilestone.status === s
                          ? "bg-teal-500 text-white border-teal-500"
                          : "bg-white text-gray-500 border-gray-200 hover:border-teal-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <FiFlag size={28} className="text-gray-200 mb-2" />
              <p className="text-xs text-gray-400">Select a milestone to view its details</p>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex items-center justify-between ">
        <button className="lg:px-5 px-2 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          Discard Draft
        </button>
        <div className="flex gap-3">
          <button className="lg:px-5 px-2 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Save Draft
          </button>
          <button className="lg:px-6 px-2 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition shadow-sm">
            Submit Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSec;