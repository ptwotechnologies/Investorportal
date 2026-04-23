import React, { useState } from "react";
import { FiPlus, FiArrowLeft, FiPlusCircle, FiChevronDown } from "react-icons/fi";
import { MdOutlinePrivateConnectivity, MdSecurity, MdOutlineFactCheck, MdOutlineHandshake } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const Bottom = ({ isCreateMode, setIsCreateMode }) => {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedDispute, setSelectedDispute] = useState(null);

  const deals = [
    {
      id: 1,
      name: "Parikalpna",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "1,50,000",
      disputes: [
        {
          id: "DSP-2026-C0003921",
          duration: "20 Days",
          milestone: "Milestone 1",
          reason: "Work is not delivered as expected and there are a lot of problems with the UI design",
          amount: "Rs 10,000"
        },
        {
          id: "DSP-2026-C0003922",
          duration: "20 Days",
          milestone: "Milestone 1",
          reason: "Work is not delivered as expected and there are a lot of problems with the UI design",
          amount: "Rs 10,000"
        },
        {
          id: "DSP-2026-C0003923",
          duration: "20 Days",
          milestone: "Milestone 1",
          reason: "Work is not delivered as expected and there are a lot of problems with the UI design",
          amount: "Rs 10,000"
        }
      ]
    },
    {
      id: 2,
      name: "Aetherweb",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "1,50,000",
      disputes: []
    },
    {
      id: 3,
      name: "Lawkase",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "1,50,000",
      disputes: []
    }
  ];

  const StatCard = ({ label, value, bgColor }) => (
    <div className={`${bgColor} rounded-2xl p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <MdOutlineFactCheck size={20} className="text-[#001032]" />
        <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032] leading-tight">{label}</h3>
      </div>
      <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
    </div>
  );

  const DealCard = ({ deal }) => (
    <div className={`bg-white rounded-2xl px-4 lg:px-6 py-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all ${selectedDeal?.id === deal.id ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
      <div className="grid grid-cols-3 gap-2 lg:gap-2 mb-4 items-start">
        <div className="flex flex-col">
          <h3 className="lg:text-xl lg:text-[16px] font-medium text-[#000000] leading-tight">{deal.name}</h3>
        </div>
        <div className="flex flex-col lg:items-center">
          <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Due Date</p>
        </div>
        <div className="flex flex-col lg:items-end">
          <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Price</p>
        </div>

        <div className="flex flex-col -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000] decoration-[#59549F] underline-offset-4 w-fit">{deal.subtitle}</p>
        </div>
        <div className="flex flex-col lg:items-center -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000] ">{deal.dueDate}</p>
        </div>
        <div className="flex flex-col lg:items-end -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000] ">Rs {deal.price}</p>
        </div>

        <div className="col-span-3">
          <p className="text-[10px] lg:text-sm text-[#000000] ">{deal.owner}</p>
        </div>
      </div>
      <button 
        onClick={() => {
          setSelectedDeal(deal);
          setSelectedDispute(null);
          setIsCreateMode(false);
        }}
        className="w-full mt-2 py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-xl text-[#59549F] font-medium text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
      >
        View Details
      </button>
    </div>
  );

  const DisputeItem = ({ dispute }) => (
    <div className="space-y-3 mb-8 last:mb-0 rounded-2xl p-3 lg:p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between px-2">
        <h4 className="text-sm lg:text-base font-medium text-[#001032]">Dispute ID – {dispute.id}</h4>
        <span className="bg-[#B91C1C] text-white text-[6px] lg:text-[10px] px-1 lg:px-3 py-1 rounded-full lg:font-semibold">
          Duration - {dispute.duration}
        </span>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-2 lg:px-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2">
        <h5 className="text-sm lg:text-base font-semibold text-[#001032]">{dispute.milestone}</h5>
        <p className="text-[12px] lg:text-xs text-[#001032]/70 lg:font-medium leading-relaxed">
          <span className="text-[#59549F] lg:font-semibold">Reason</span> – {dispute.reason}
        </p>
        <p className="text-[12px] lg:text-xs text-[#001032]/70 ">
          <span className="text-[#59549F] lg:font-semibold">Amount</span> – {dispute.amount}
        </p>
        <div className="flex justify-end mt-2">
          <button 
            onClick={() => {
              setSelectedDispute(dispute);
              setIsCreateMode(false);
            }}
            className="px-6 py-2 bg-[#D8D6F8] text-[#59549F] rounded-lg text-[10px] lg:text-xs font-semibold shadow-sm hover:opacity-90"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF] lg:h-[660px] h-screen overflow-hidden">
      
      {/* ── Left Column ── */}
      <div className={`flex-1 space-y-6 overflow-y-auto scrollbar-hide p-2 ${ (selectedDeal || isCreateMode) ? 'hidden lg:block' : 'block'}`}>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Total Disputes" value="9" bgColor="bg-[#D8E1F0]" />
          <StatCard label="Active Disputes" value="4" bgColor="bg-[#D8D6F8]" />
          <StatCard label="Resolved" value="3" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Escalated" value="4" bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-4 px-1">Case List</h2>
        <div className="space-y-6 pb-20">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col gap-4 overflow-hidden ${(!selectedDeal && !isCreateMode) ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Back Header (Mobile & Detail View) */}
        {(selectedDeal || isCreateMode) && (
          <div className="flex items-center gap-3 py-1 mt-1 mx-2">
            <button 
              onClick={() => {
                if (isCreateMode) {
                  setIsCreateMode(false);
                } else if (selectedDispute) {
                  setSelectedDispute(null);
                } else {
                  setSelectedDeal(null);
                }
              }} 
              className="lg:p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm "
            >
              <FiArrowLeft size={20} />
            </button>
            <span className="font-semibold text-lg text-[#001032] ">
              {isCreateMode ? 'Create Dispute' : (selectedDispute ? 'Dispute Details' : 'Back to Case List')}
            </span>
          </div>
        )}

        {(selectedDeal || isCreateMode) ? (
          <div className={`flex-1 bg-white flex flex-col overflow-hidden ${(selectedDispute || isCreateMode) ? 'shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 rounded-2xl lg:mx-4 mx-1 ' : ''}`}>
            <div className={`flex-1 overflow-y-auto scrollbar-hide space-y-6 ${(selectedDispute || isCreateMode) ? 'p-2 lg:p-5 ' : 'p-2 lg:p-4'}`}>
              
              {isCreateMode ? (
                /* ── Create Dispute View ── */
                <div className="space-y-6 ">
                   <h4 className="text-base font-semibold text-[#001032] px-2">Dispute ID – DSP-2026-CO003921</h4>

                   {/* Milestones Input */}
                   <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-3">
                      <h5 className="text-sm font-semibold text-[#001032]">Milestones</h5>
                      <input 
                        type="text"
                        placeholder="Enter the digit - 1 or 2, etc."
                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs outline-none shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.1)] placeholder:text-gray-300"
                      />
                   </div>

                   {/* Amount Input */}
                   <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-3">
                      <h5 className="text-sm font-semibold text-[#001032]">Amount</h5>
                      <input 
                        type="text"
                        placeholder="INR - Indian Rupees"
                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs outline-none shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.1)] placeholder:text-gray-300"
                      />
                   </div>

                   {/* Reason Card */}
                   <div className="space-y-3">
                      <h5 className="text-sm font-semibold text-[#001032] px-2">Reason</h5>
                      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                         <p className="text-[10px] lg:text-[11px] text-gray-400 leading-relaxed text-justify">
                            These Terms and Conditions ("Terms") govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com ("Portal") operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated]. These Terms and Conditions ("Terms") govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com ("Portal") operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated].
                         </p>
                      </div>
                   </div>

                   {/* Evidence Upload */}
                   <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[#001032]">Evidence Upload</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Upload the evidence in jpg, pdf and docx format</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="aspect-[4/3] bg-white border border-gray-100 rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
                            <FiPlus size={32} className="text-[#59549F]" />
                          </div>
                        ))}
                      </div>
                   </div>

                   {/* Action Buttons */}
                   <div className="space-y-4 pt-4 px-2">
                      <button className="w-full py-2 bg-[#FBD5D5] hover:bg-[#F9C1C1] rounded-xl text-[#B91C1C] font-semibold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.15)] transition-all">
                        Escalate
                      </button>
                      <button className="w-full py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-xl text-[#59549F] font-semibold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all">
                        Proceed for Communication
                      </button>
                   </div>
                </div>
              ) : selectedDispute ? (
                /* ── Dispute Detail View ── */
                <div className="space-y-6 ">
                  {/* Header (Same as card) */}
                  <div className="flex items-center justify-between lg:px-2">
                    <h4 className="text-sm lg:text-base font-medium text-[#001032] ">Dispute ID – {selectedDispute.id}</h4>
                    <span className="bg-[#B91C1C] text-white text-[6px] lg:text-[10px] px-3 py-1 rounded-full lg:font-semibold">
                      Duration - {selectedDispute.duration}
                    </span>
                  </div>

                  {/* Section 1: Milestone Info */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-4">
                    <h5 className="text-sm lg:text-lg font-semibold text-[#001032]">{selectedDispute.milestone}</h5>
                    <p className="text-[12px] lg:text-sm text-gray-500 lg:font-medium leading-relaxed">
                      <span className="text-[#59549F] lg:font-bold">Reason</span> – {selectedDispute.reason}
                    </p>
                    <p className="text-[12px] lg:text-sm text-gray-500 ">
                      <span className="text-[#59549F] lg:font-bold">Amount</span> – {selectedDispute.amount}
                    </p>
                  </div>

                  {/* Section 2: Evidence Upload */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
                    <div>
                      <h4 className="text-sm lg:text-base font-semibold text-[#001032]">Evidence Upload</h4>
                      <p className="text-[12px] lg:text-xs text-gray-400 mt-1">Upload the evidence in jpg, pdf and docx format</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-[4/3] bg-white border border-gray-100 rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
                          <FiPlus size={32} className="text-[#59549F]" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proceed Button */}
                  <div className="pt-4 px-2">
                    <button className="w-full py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-xl text-[#59549F] font-semibold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all">
                      Proceed for Communication
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Disputes List View ── */
                selectedDeal.disputes.length > 0 ? (
                  selectedDeal.disputes.map((dispute, index) => (
                    <DisputeItem key={index} dispute={dispute} />
                  ))
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <IoMdCheckmark size={40} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-400">No Disputes Found</h3>
                    <p className="text-sm text-gray-400 mt-1 italic">There are no ongoing disputes for this project.</p>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className=" mx-2 my-2 flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50 bg-white rounded-3xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 ">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <IoMdCheckmark size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-400">No Case Selected</h3>
            <p className="text-sm text-gray-400 mt-1 italic">Select a case from the list to view active disputes.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Bottom;