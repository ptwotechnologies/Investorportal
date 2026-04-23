import React, { useState } from "react";
import { FiFileText, FiPlus } from "react-icons/fi";
import { MdOutlineFactCheck } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";

const Bottom = () => {
  const [selectedDeal, setSelectedDeal] = useState(null); 

  const dealsData = [
    { id: 1, title: "Milestone 1", project: "Mobile App Development", owner: "Akshay Dogra", dueDate: "1 March, 2026", price: "1,50,000" },
    { id: 2, title: "Milestone 2", project: "Mobile App Development", owner: "Akshay Dogra", dueDate: "1 March, 2026", price: "1,50,000" },
    { id: 3, title: "Milestone 3", project: "Mobile App Development", owner: "Akshay Dogra", dueDate: "1 March, 2026", price: "1,50,000" },
  ];

  const StatCard = ({ label, value, bgColor }) => (
    <div className={`${bgColor} rounded-2xl p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <FiFileText size={20} className="text-[#001032]" />
        <h3 className="text-[10px] lg:text-sm lg:font-semibold text-[#001032] leading-tight">{label}</h3>
      </div>
      <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
    </div>
  );

  const DealCard = ({ deal }) => (
    <div className={`bg-white rounded-2xl p-6 lg:p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col gap-6 ${selectedDeal?.id === deal.id ? 'border-[#D8D6F8]' : ''}`}>
      <div className="grid grid-cols-3 gap-4 items-start">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg lg:text-[14px] font-medium text-[#001032]">{deal.title}</h3>
          <p className="text-[10px] lg:text-xs text-[#001032]">{deal.project}</p>
          <p className="text-[10px] lg:text-xs text-[#001032] mt-2">{deal.owner}</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-lg lg:text-[14px] font-medium text-[#001032]">Due Date</span>
          <p className="text-[10px] lg:text-xs text-[#001032]">{deal.dueDate}</p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-lg lg:text-[14px] font-medium text-[#001032]">Price</span>
          <p className="text-[10px] lg:text-xs text-[#001032]">Rs {deal.price}</p>
        </div>
      </div>
      <button 
        onClick={() => setSelectedDeal(deal)}
        className="w-full py-1 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-bold text-sm lg:text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
      >
        View Details
      </button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-2 lg:py-2 bg-[#FDFDFF] lg:h-[650px] h-screen overflow-hidden">
      
      {/* ── Left Column ── */}
      <div className={`flex-1 flex py-2 flex-col gap-6 overflow-hidden ${selectedDeal ? 'hidden lg:flex' : 'flex'}`}>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 shrink-0 px-1">
          <StatCard label="Total Deals" value="16" bgColor="bg-[#D8E1F0]" />
          <StatCard label="Total Value" value="325k" bgColor="bg-[#D8D6F8]" />
          <StatCard label="Average Release Time" value="3 Days" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Success Rate" value="90%" bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-semibold text-[#001032] px-1 shrink-0">All Deals</h2>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-1 space-y-6 p-2">
          {dealsData.map((deal, idx) => (
            <DealCard key={idx} deal={deal} />
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col p-2 gap-6 overflow-y-auto scrollbar-hide ${selectedDeal ? 'flex' : 'hidden lg:flex'}`}>
        
        {/* Mobile Back Button */}
        {selectedDeal && (
          <button 
            onClick={() => setSelectedDeal(null)}
            className="lg:hidden flex items-center gap-2 text-[#59549F] font-semibold mb-2"
          >
            <div className="p-2 bg-gray-50 rounded-full shadow-sm">
                <FiArrowLeft size={18} />
            </div>
            Back to List
          </button>
        )}
        <div className="bg-white rounded-2xl p-3 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-4">
           <h3 className="text-lg font-semibold text-[#001032]">Success Rate</h3>
           <p className="text-sm text-[#001032]/70 leading-relaxed">90% as per analysis about work flow, disputes and timely delivery</p>
           <button className="w-full py-1 bg-[#D8D6F8] text-[#59549F] rounded-lg font-bold shadow-sm">View Details</button>
        </div>

        {/* Total Value Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
           <h3 className="text-lg font-semibold text-[#001032]">Total Value</h3>
           <div className="flex flex-col lg:flex-row gap-3">
              <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 text-xs text-gray-400 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1">INR - Indian Rupees</div>
              <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 text-xs text-gray-400 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1">Minimum Budget</div>
              <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 text-xs text-gray-400 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1">Maximum Budget</div>
           </div>
        </div>

        {/* Completed Date Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
           <h3 className="text-lg font-semibold text-[#001032]">Completed Date</h3>
           <div className="flex flex-col lg:flex-row gap-3">
              <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 text-xs text-gray-400 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1">Date</div>
              <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 text-xs text-gray-400 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1">From</div>
              <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 text-xs text-gray-400 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1">To</div>
           </div>
        </div>

        {/* Released Funds Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-6">
           <h3 className="text-lg font-semibold text-[#001032]">Released Funds</h3>
           <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-[#F3F3F3] rounded-2xl p-4 flex items-end justify-between gap-4">
                   <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#D8D6F8] mt-1.5" />
                      <div>
                         <h4 className="text-sm  text-[#001032]">Milestone 1 - Wireframe Designing</h4>
                         <p className="text-[10px] text-gray-400 mt-1">Develop a mobile app with core features</p>
                         <p className="text-[9px] text-gray-400">Due Date - 15th April, 2026</p>
                      </div>
                   </div>
                   <div className="bg-[#D8D6F8] text-[#59549F] text-[10px] font-bold px-4 py-1.5 rounded-md shadow-sm">Completed</div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Bottom;
