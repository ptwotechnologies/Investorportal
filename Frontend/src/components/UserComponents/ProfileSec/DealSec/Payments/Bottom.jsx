import React, { useState } from "react";
import { FiPlus, FiArrowLeft, FiPlusCircle, FiChevronDown } from "react-icons/fi";
import { MdOutlinePrivateConnectivity, MdSecurity, MdOutlineFactCheck, MdOutlineHandshake } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const Bottom = () => {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(1);

  const deals = [
    {
      id: 1,
      name: "Parikalpna",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "Rs 1,50,000",
    },
    {
      id: 2,
      name: "Aetherweb",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "Rs 1,50,000",
    },
    {
      id: 3,
      name: "Lawkase",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "Rs 1,50,000",
    }
  ];

  const milestones = [
    {
      id: 1,
      name: "Milestone 1 - Wireframe Designing",
      description: "Develop a mobile app with core features",
      dueDate: "15th April, 2026",
      status: "Awaiting Response",
      amount: "50,000",
      fee: "10,000",
      payable: "40,000"
    },
    {
      id: 2,
      name: "Milestone 1 - Wireframe Designing",
      description: "Develop a mobile app with core features",
      dueDate: "15th April, 2026",
      status: "Awaiting Response",
      amount: "50,000",
      fee: "10,000",
      payable: "40,000"
    },
    {
      id: 3,
      name: "Milestone 1 - Wireframe Designing",
      description: "Develop a mobile app with core features",
      dueDate: "15th April, 2026",
      status: "Awaiting Response",
      amount: "50,000",
      fee: "10,000",
      payable: "40,000"
    }
  ];

  const StatCard = ({ label, value, bgColor }) => (
    <div className={`${bgColor} rounded-2xl p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
        <h3 className="text-[11px] lg:text-sm lg:font-medium text-[#001032] leading-tight">{label}</h3>
      </div>
      <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
    </div>
  );

  const DealCard = ({ deal }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all ${selectedDeal?.id === deal.id ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-[#000000]">{deal.name}</h3>
          <p className="text-xs text-gray-500 font-medium">{deal.subtitle}</p>
          <p className="text-xs text-[#000000] font-medium">{deal.owner}</p>
        </div>
        <div className="space-y-3 text-center">
          <h3 className="text-base font-semibold text-[#000000]">Due Date</h3>
          <p className="text-xs text-gray-500 font-medium">{deal.dueDate}</p>
        </div>
        <div className="space-y-3 text-right">
          <h3 className="text-base font-semibold text-[#000000]">Price</h3>
          <p className="border-b border-[#D8D6F8] inline-block text-xs text-[#000000] font-semibold">{deal.price}</p>
        </div>
      </div>
      <button 
        onClick={() => setSelectedDeal(deal)}
        className="w-full mt-2 py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
      >
        View Details
      </button>
    </div>
  );

  const activeMilestone = milestones.find(m => m.id === selectedMilestoneId) || milestones[0];

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF] lg:h-[650px] h-screen overflow-hidden">
      
      {/* ── Left Column ── */}
      <div className={`flex-1 space-y-6 overflow-y-auto scrollbar-hide p-2 ${selectedDeal ? 'hidden lg:block' : 'block'}`}>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Active Deals" value="16" bgColor="bg-[#D8E1F0]" />
          <StatCard label="Due This Month" value="4" bgColor="bg-[#D8D6F8]" />
          <StatCard label="Overdue Payments" value="3" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Total Payments" value="325k" bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-4 px-1">Deals</h2>
        <div className="space-y-4 pb-20">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col gap-4 ${!selectedDeal ? 'hidden lg:flex' : 'flex'}`}>

        
        {/* Header (Back button on mobile) */}
        {selectedDeal && (
          <div className="lg:hidden flex items-center gap-3">
            <button onClick={() => setSelectedDeal(null)} className="p-2 bg-gray-50 rounded-full text-[#59549F]">
              <FiArrowLeft size={20} />
            </button>
            <span className="font-bold text-lg text-[#001032]">Back to Deals</span>
          </div>
        )}

        {selectedDeal ? (
          <div className="flex-1 flex flex-col h-full min-h-0">
            {/* Scrollable White Card Area */}
            <div className="flex-1 bg-white rounded-2xl m-2 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden min-h-0">
              <div className="flex-1 overflow-y-auto scrollbar-hide p-4 lg:p-6 space-y-4">
                
                {/* Payment for Milestones Panel */} 
                <div className="bg-white ">
                  <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-[#000000]">Payment for Milestones</h3>
                      <FiPlusCircle size={22} className="text-[#59549F] cursor-pointer" />
                  </div>

                  <div className="space-y-4">
                      {milestones.map(m => (
                        <div key={m.id} className="relative bg-[#F9F9FF] rounded-xl p-2 lg:p-4 border border-gray-100 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.05)]">
                          <div className="flex gap-3">
                              <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${m.id === selectedMilestoneId ? 'bg-[#D8D6F8]' : 'bg-gray-200'}`} />
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold text-[#000000]">{m.name}</h4>
                                <p className="text-[10px] text-gray-400 mt-1">{m.description}</p>
                                <p className="text-[10px] text-gray-400 mt-1">Due Date - {m.dueDate}</p>
                              </div>
                              <div className="flex flex-col items-end gap-3 shrink-0">
                                <div className="bg-orange-50 text-[#D97706] text-[8px] px-2 py-0.5 rounded-full font-bold border border-orange-100">
                                    {m.status}
                                </div>
                                <button 
                                    onClick={() => setSelectedMilestoneId(m.id)}
                                    className={`px-4 py-1.5 rounded-md text-[10px] font-bold shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.25)] transition-all ${m.id === selectedMilestoneId ? 'bg-[#D8D6F8] text-[#59549F]' : 'bg-gray-100 text-gray-400'}`}
                                >
                                    {m.id === selectedMilestoneId ? 'Pay Now' : 'Select'}
                                </button>
                              </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Breakdown Panel */}
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
                          <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium leading-tight">Total Payable</p>
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
              </div>
            </div>

            {/* Pay Button - Outside the main white card */}
            <button className="w-[98%] mt-3 mx-2 py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-semibold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all">
              Pay for Milestone One
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50 bg-white rounded-[2rem] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 mx-2">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <IoMdCheckmark size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-400">No Deal Selected</h3>
            <p className="text-sm text-gray-400 mt-1 italic">Select a deal from the left to view payment status.</p>
          </div>
        )}
      </div>


    </div>
  );
};

export default Bottom;