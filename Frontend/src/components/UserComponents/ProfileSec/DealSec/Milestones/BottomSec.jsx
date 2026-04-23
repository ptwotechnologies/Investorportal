import React from "react";
import { FiArrowRight, FiCheckCircle, FiClock, FiAlertCircle, FiClipboard, FiPlus, FiArrowLeft } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { MdOutlinePrivateConnectivity } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const BottomSec = ({ selectedMilestone, setSelectedMilestone }) => {
  // ── Dummy Data ──
  const milestones = [
    {
      id: 1,
      name: "Milestone 1",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "1,50,000",
      duration: "20 Days",
      budget: { currency: "INR - Indian Rupees", min: "1,20,000", max: "1,80,000" },
      timeline: { label: "Total Days", from: "1 March, 2026", to: "1 April, 2026" },
      scope: `These Terms and Conditions (“Terms”) govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (“Portal”) operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated]. These Terms and Conditions (“Terms”) govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (“Portal”) operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated].`
    },
    {
      id: 2,
      name: "Milestone 2",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "1,50,000",
      duration: "30 Days",
      budget: { currency: "INR - Indian Rupees", min: "1,50,000", max: "2,00,000" },
      timeline: { label: "Total Days", from: "1 May, 2026", to: "1 June, 2026" },
      scope: "Full stack development for the primary web interface..."
    },
    {
      id: 3,
      name: "Milestone 3",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "1,50,000",
      duration: "15 Days",
      budget: { currency: "INR - Indian Rupees", min: "50,000", max: "80,000" },
      timeline: { label: "Total Days", from: "1 July, 2026", to: "15 July, 2026" },
      scope: "Final testing and deployment phase..."
    }
  ];

  // ── Sub-Components ──
  const StatCard = ({ label, value, bgColor }) => (
    <div className={`${bgColor} rounded-2xl p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
        <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">{label}</h3>
      </div>
      <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
    </div>
  );

  const MilestoneCard = ({ m }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all ${selectedMilestone?.id === m.id ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-[#000000]">{m.name}</h3>
          <p className="text-xs text-gray-500 font-medium">{m.subtitle}</p>
          <p className="text-xs text-[#000000] font-medium">{m.owner}</p>
        </div>
        <div className="space-y-3 text-center">
          <h3 className="text-base font-semibold text-[#000000]">Due Date</h3>
          <p className="text-xs text-gray-500 font-medium">{m.dueDate}</p>
        </div>
        <div className="space-y-3 text-right">
          <h3 className="text-base font-semibold text-[#000000]">Price</h3>
          <p className="text-xs text-gray-500 font-medium ">Rs {m.price}</p>
        </div>
      </div>
      <button 
        onClick={() => setSelectedMilestone(m)}
        className="w-full mt-2 py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
      >
        View Details
      </button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF] h-[640px] overflow-hidden">
      
      {/* ── Left Column: Milestone List ── */}
      <div className={`flex-1 space-y-6 overflow-y-auto scrollbar-hide p-2 ${selectedMilestone ? 'hidden lg:block' : 'block'}`}>
        
        {/* Stats Grid inside left column */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Total Milestones" value="16" bgColor="bg-[#D8E1F0]" />
          <StatCard label="Due this week" value="4" bgColor="bg-[#D8D6F8]" />
          <StatCard label="Overdue" value="3" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Pending Approval" value="5" bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-2 px-1">Deal Drafts</h2>
        <div className="space-y-4 ">
          {milestones.map(m => (
            <MilestoneCard key={m.id} m={m} />
          ))}
        </div>
      </div>

      {/* ── Vertical Divider (Desktop Only) ── */}
      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column: Detail Panel ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full overflow-y-auto scrollbar-hide p-2 flex flex-col ${!selectedMilestone ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Mobile Back Header */}
        {selectedMilestone && (
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <button 
              onClick={() => setSelectedMilestone(null)} 
              className="p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm"
            >
              <FiArrowLeft size={20} />
            </button>
            <span className="font-bold text-lg text-[#000000]">Back to List</span>
          </div>
        )}

        {selectedMilestone ? (
          <div className="bg-white rounded-2xl p-3 lg:p-6 lg:p-8 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col space-y-4 ">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-xl font-semibold text-[#000000]">{selectedMilestone.name}</h3>
              <span className="bg-[#B91C1C] text-white text-[10px] px-3 py-1.5 rounded-full font-semibold">
                Duration - {selectedMilestone.duration}
              </span>
            </div>

            {/* Budget Section */}
            <div className="space-y-4">
               <h4 className="text-base font-semibold text-[#000000]">Budget - {selectedMilestone.name}</h4>
               <div className="flex flex-col lg:flex-row gap-3">
                  <div className="lg:w-[150px] w-full bg-[#FDFDFF] border border-gray-100 rounded-lg py-2.5 px-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-[10px] items-center flex justify-center text-gray-400 font-medium whitespace-nowrap">
                     {selectedMilestone.budget.currency}
                  </div>
                  <div className="flex-1 bg-white border border-gray-100 rounded-lg py-2.5 px-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-[10px] items-center flex justify-center text-gray-400 font-medium">
                     Enter Budget
                  </div>
               </div>
            </div>

            {/* Timeline Section */}
            <div className="space-y-4">
               <h4 className="text-base font-semibold text-[#000000]">Timeline - {selectedMilestone.name}</h4>
               <div className="flex flex-col lg:flex-row gap-3">
                  <div className="lg:w-[150px] w-full bg-[#FDFDFF] border border-gray-100 rounded-lg py-2.5 px-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-[10px] items-center flex justify-center text-gray-400 font-medium">
                     {selectedMilestone.timeline.label}
                  </div>
                  <div className="flex-1 bg-white border border-gray-100 rounded-lg py-2.5 px-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-[10px] items-center flex justify-center text-gray-400 font-medium">
                     Enter Days
                  </div>
               </div>
            </div>

            {/* Scope Section */}
            <div className="space-y-4">
               <h4 className="text-base font-semibold text-[#000000]">Scope of work in {selectedMilestone.name.toLowerCase()}</h4>
               <div className="w-full bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] min-h-[300px] overflow-y-auto scrollbar-hide">
                  <p className="text-xs text-gray-500 leading-relaxed">
                     {selectedMilestone.scope}
                  </p>
               </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4">
               <button className="w-full py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-semibold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all">
                  Proceed for Negotiation
               </button>
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50 bg-white rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 mx-2">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <IoMdCheckmark size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-400">No Milestone Selected</h3>
            <p className="text-sm text-gray-400 mt-1 italic">Select a milestone from the left to view progress details.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default BottomSec;