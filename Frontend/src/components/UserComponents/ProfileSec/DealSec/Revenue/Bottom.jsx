import React, { useState } from "react";
import { FiFileText, FiPlus, FiArrowLeft, FiChevronDown } from "react-icons/fi";
import { MdOutlineFactCheck } from "react-icons/md";
import { RiShieldCheckLine, RiShieldLine, RiShieldFlashLine } from "react-icons/ri";

const Bottom = () => {
  const [selectedDeal, setSelectedDeal] = useState(null);

  const dealsData = [
    { id: 1, name: "Parikalpna", subtitle: "Mobile App Development", owner: "Akshay Dogra", dueDate: "1 March, 2026", price: "1,50,000" },
    { id: 2, name: "Aetherweb", subtitle: "Mobile App Development", owner: "Akshay Dogra", dueDate: "1 March, 2026", price: "1,50,000" },
    { id: 3, name: "Lawkase", subtitle: "Mobile App Development", owner: "Akshay Dogra", dueDate: "1 March, 2026", price: "1,50,000" },
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
          <h3 className="text-lg lg:text-[14px] font-medium text-[#001032]">{deal.name}</h3>
          <p className="text-[10px] lg:text-xs text-[#001032]">{deal.subtitle}</p>
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
          <StatCard label="Active Deals" value="16" bgColor="bg-[#D8E1F0]" />
          <StatCard label="Earnings In Progress" value="4" bgColor="bg-[#D8D6F8]" />
          <StatCard label="Pending Release" value="3" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Total Earnings" value="325k" bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-semibold text-[#001032] px-1 shrink-0">Deals</h2>

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
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col  gap-6 overflow-hidden ${selectedDeal ? 'flex' : 'hidden lg:flex'}`}>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide p-1 space-y-6 p-2">
          {selectedDeal ? (
            <>
              {/* Mobile Back Button */}
              <button 
                onClick={() => setSelectedDeal(null)}
                className="lg:hidden flex items-center gap-2 text-[#59549F] font-semibold mb-4"
              >
                <div className="p-2 bg-gray-50 rounded-full shadow-sm">
                    <FiArrowLeft size={18} />
                </div>
                Back to List
              </button>

              {/* Payment for Milestones Section */}
              <div className="bg-white rounded-2xl border border-gray-100 p-2 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#001032]">Payment for Milestones</h3>
                    <button className="text-[#59549F] hover:opacity-70 transition-all">
                        <div className="w-8 h-8 rounded-full border-2 border-[#59549F] flex items-center justify-center">
                          <FiPlus size={20} />
                        </div>
                    </button>
                 </div>

                 <div className="space-y-4">
                    {/* Milestone Row 1 */}
                     <div className="bg-[#F3F3F3] rounded-2xl p-3 lg:p-4 flex items-end justify-between gap-2 lg:gap-4">
                        <div className="flex items-start gap-2 lg:gap-3 overflow-hidden">
                           <div className="w-3 h-3 rounded-full bg-[#D8D6F8] mt-1.5 shrink-0" />
                           <div className="overflow-hidden">
                              <div className="flex items-center gap-2 flex-nowrap">
                                 <h4 className="text-[12px] lg:text-sm font-semibold text-[#001032] truncate">Milestone 1 - Wireframe Designing</h4>
                                 <span className="bg-[#FF9D00] text-white text-[7px] lg:text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">Awaiting Response</span>
                              </div>
                              <p className="text-[10px] text-gray-400 mt-1 truncate">Develop a mobile app with core features</p>
                              <p className="text-[9px] text-gray-400 truncate">Amount Received - 15th April, 2026</p>
                           </div>
                        </div>
                        <div className="bg-[#D8D6F8] text-[#59549F] text-[10px] font-bold px-3 lg:px-4 py-1.5 rounded-md shadow-sm whitespace-nowrap">Received</div>
                     </div>

                     {/* Milestone Row 2 */}
                     <div className="bg-[#F3F3F3] rounded-2xl p-3 lg:p-4 flex items-end justify-between gap-2 lg:gap-4 opacity-70">
                        <div className="flex items-start gap-2 lg:gap-3 overflow-hidden">
                           <div className="w-3 h-3 rounded-full bg-[#D8D6F8] mt-1.5 shrink-0" />
                           <div className="overflow-hidden">
                              <div className="flex items-center gap-2 flex-nowrap">
                                 <h4 className="text-[12px] lg:text-sm font-semibold text-[#001032] truncate">Milestone 1 - Wireframe Designing</h4>
                                 <span className="bg-[#FF9D00] text-white text-[7px] lg:text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">Awaiting Response</span>
                              </div>
                              <p className="text-[10px] text-gray-400 mt-1 truncate">Develop a mobile app with core features</p>
                              <p className="text-[9px] text-gray-400 truncate">Amount Received - 15th April, 2026</p>
                           </div>
                        </div>
                        <div className="bg-[#CDCDCD] text-[#404040] text-[10px] font-bold px-3 lg:px-4 py-1.5 rounded-md shadow-sm whitespace-nowrap">Pay Now</div>
                     </div>

                     {/* Milestone Row 3 */}
                     <div className="bg-[#F3F3F3] rounded-2xl p-3 lg:p-4 flex items-end justify-between gap-2 lg:gap-4 opacity-70">
                        <div className="flex items-start gap-2 lg:gap-3 overflow-hidden">
                           <div className="w-3 h-3 rounded-full bg-[#D8D6F8] mt-1.5 shrink-0" />
                           <div className="overflow-hidden">
                              <div className="flex items-center gap-2 flex-nowrap">
                                 <h4 className="text-[12px] lg:text-sm font-semibold text-[#001032] truncate">Milestone 1 - Wireframe Designing</h4>
                                 <span className="bg-[#FF9D00] text-white text-[7px] lg:text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">Awaiting Response</span>
                              </div>
                              <p className="text-[10px] text-gray-400 mt-1 truncate">Develop a mobile app with core features</p>
                              <p className="text-[9px] text-gray-400 truncate">Amount Received - 15th April, 2026</p>
                           </div>
                        </div>
                        <div className="bg-[#CDCDCD] text-[#404040] text-[10px] font-bold px-3 lg:px-4 py-1.5 rounded-md shadow-sm whitespace-nowrap">Pay Now</div>
                     </div>
                 </div>
              </div>

            {/* Milestone Breakdown Section */}
            <div className="bg-white mt-6 rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden">
               <div className="flex items-center justify-between px-6 lg:px-8 py-2 bg-[#F0EDFD] rounded-2xl">
                  <h3 className="text-base font-semibold text-[#000000]">Milestone 1 Breakdown</h3>
                  <FiChevronDown size={22} className="text-[#000000] cursor-pointer" />
               </div>
               
               <div className="p-2 lg:p-8">
                  <div className="grid grid-cols-3 gap-1 lg:gap-3 lg:mb-6 my-3">
                     <div className="bg-[#EEECFD] rounded-xl lg:rounded-2xl p-1 py-5 lg:p-4 flex flex-col items-center justify-center space-y-1 lg:space-y-2 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                        <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium leading-tight">Milestone Amount</p>
                        <p className="text-[9px] lg:text-lg text-[#000000] font-bold">Rs 50,000</p>
                     </div>
                     <div className="bg-[#F5F5F5] rounded-xl lg:rounded-2xl p-1 lg:p-4 flex flex-col items-center justify-center space-y-1 lg:space-y-2 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                        <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium leading-tight">Platform Fee (20% + GST)</p>
                        <p className="text-[9px] lg:text-lg text-gray-400 font-bold">Rs 10,000</p>
                     </div>
                     <div className="bg-[#EEECFD] rounded-xl lg:rounded-2xl p-1 lg:p-4 flex flex-col items-center justify-center space-y-1 lg:space-y-2 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                        <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium leading-tight">Total Received</p>
                        <p className="text-[9px] lg:text-lg text-[#59549F] font-bold">Rs 40,000</p>
                     </div>
                  </div>

                  <p className="text-xs text-black font-semibold mb-6">20% platform fees ensures</p>

                  <div className="grid grid-cols-3 gap-2 lg:gap-4">
                     <div className="border border-[#D8D6F8] rounded-xl lg:rounded-2xl p-1 lg:p-2 flex flex-col items-center justify-center shadow-sm bg-white aspect-square lg:aspect-auto">
                        <img src="/paymentsec1.png" alt="Secure payment" className="w-full h-full object-contain" />
                     </div>
                     <div className="border border-[#D8D6F8] rounded-xl lg:rounded-2xl p-1 lg:p-2 flex flex-col items-center justify-center shadow-sm bg-white aspect-square lg:aspect-auto">
                        <img src="/paymentsec2.png" alt="Verified execution" className="w-full h-full object-contain" />
                     </div>
                     <div className="border border-[#D8D6F8] rounded-xl lg:rounded-2xl p-1 lg:p-2 flex flex-col items-center justify-center shadow-sm bg-white aspect-square lg:aspect-auto">
                        <img src="/paymentsec3.png" alt="Dispute protection" className="w-full h-full object-contain" />
                     </div>
                  </div>
               </div>
            </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-40 text-center gap-4">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdOutlineFactCheck size={32} className="text-gray-300" />
               </div>
               <p className="text-sm font-medium italic">Select a deal from the list to view details</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Bottom;
