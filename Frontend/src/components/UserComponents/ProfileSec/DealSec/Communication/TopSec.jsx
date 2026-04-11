import React from "react";
import { FiPaperclip, FiFlag } from "react-icons/fi";
import { RiShieldCheckLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

const TopSec = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "files", label: "Files", icon: <FiPaperclip size={13} /> },
    { id: "milestones", label: "Milestones", icon: <FiFlag size={13} /> },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Client Info */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm">
          S
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-900 leading-tight">Stellar</h1>
          <p className="text-xs text-gray-500">Mobile App Development</p>
        </div>
      </div>

      {/* Stage + Payment Badge */}
      <div className="px-4 pb-2 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
          <span className="text-xs text-gray-500">Stage:</span>
          <span className="text-xs font-semibold text-teal-600 ml-0.5">Milestone 2/5</span>
        </div>
        <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 cursor-pointer hover:bg-orange-100 transition">
          <span className="text-xs font-medium text-orange-500">Payment Pending</span>
          <MdKeyboardArrowDown size={13} className="text-orange-400" />
        </div>
      </div>

      {/* Team */}
      <div className="px-4 pb-3 flex items-center gap-2">
        <div className="flex items-center -space-x-1.5">
          <div className="w-6 h-6 rounded-full bg-teal-400 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">Y</div>
          <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">A</div>
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1 flex-wrap">
          <span>You</span>
          <span className="text-gray-300">·</span>
          <span>Arjun Patel</span>
          <span className="text-gray-300">·</span>
          <RiShieldCheckLine size={11} className="text-gray-400 inline" />
          <span>Legal Team</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="px-2 flex border-t border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopSec;