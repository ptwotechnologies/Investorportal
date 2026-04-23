import React, { useState } from "react";
import { FiArrowLeft, FiPlus, FiFileText } from "react-icons/fi";
import { MdOutlineFactCheck } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const Bottom = () => {
  const [activeTab, setActiveTab] = useState("Files");
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [selectedMilestoneItem, setSelectedMilestoneItem] = useState(null);
  const [selectedFileDispute, setSelectedFileDispute] = useState(null);
  const [isThreadOpen, setIsThreadOpen] = useState(false);

  const disputesData = [
    {
      id: "DSP-2026-C0003921",
      duration: "20 Days",
      project: "Parikalpna",
      reason: "Work is not delivered as expected and there are a lot of problems with the UI design",
      amount: "Rs 10,000",
      details: {
        name: "Parikalpna",
        subtitle: "Mobile App Development",
        owner: "Akshay Dogra",
        dueDate: "1 March, 2026",
        price: "1,50,000"
      }
    },
    {
        id: "DSP-2026-C0003922",
        duration: "20 Days",
        project: "Aetherweb",
        reason: "Work is not delivered as expected and there are a lot of problems with the UI design",
        amount: "Rs 10,000",
        details: {
          name: "Aetherweb",
          subtitle: "Mobile App Development",
          owner: "Akshay Dogra",
          dueDate: "1 March, 2026",
          price: "1,50,000"
        }
      },
      {
        id: "DSP-2026-C0003923",
        duration: "20 Days",
        project: "Lawkase",
        reason: "Work is not delivered as expected and there are a lot of problems with the UI design",
        amount: "Rs 10,000",
        details: {
          name: "Lawkase",
          subtitle: "Mobile App Development",
          owner: "Akshay Dogra",
          dueDate: "1 March, 2026",
          price: "1,50,000"
        }
      }
  ];

  const milestonesData = [
    {
      id: 1,
      name: "Parikalpna",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "1,50,000",
      items: [
        {
          id: "Com - MS-2026-CO003921",
          duration: "20 Days",
          title: "Milestone 1",
          reason: "Work is not delivered as expected and there are a lot of problems with the UI design",
          amount: "Rs 10,000"
        },
        {
          id: "Com - MS-2026-CO003922",
          duration: "20 Days",
          title: "Milestone 2",
          reason: "Work is not delivered as expected and there are a lot of problems with the UI design",
          amount: "Rs 10,000"
        },
        {
            id: "Com - MS-2026-CO003923",
            duration: "20 Days",
            title: "Milestone 3",
            reason: "Work is not delivered as expected and there are a lot of problems with the UI design",
            amount: "Rs 10,000"
        }
      ]
    }
  ];

  const chatMessages = [
    { name: "Akshay Dogra", time: "Tuesday, Mar 1 2021 · 10:25 AM", text: "Work is not delivered as expected and there are a lot of problems with the UI design. Work is not delivered as expected and there are a lot of problems with the UI design. Work is not delivered as expected and there are a lot of problems with the UI design." },
    { name: "Parikalpna", time: "Tuesday, Mar 1 2021 · 10:28 AM", text: "Work is not delivered as expected and there are a lot of problems with the UI design. Work is not delivered as expected and there are a lot of problems with the UI design. Work is not delivered as expected and there are a lot of problems with the UI design." },
    { name: "Admin", time: "Tuesday, Mar 1 2021 · 10:35 AM", text: "Work is not delivered as expected and there are a lot of problems with the UI design. Work is not delivered as expected and there are a lot of problems with the UI design.", isAdmin: true },
    { name: "Akshay Dogra", time: "Tuesday, Mar 1 2021 · 10:45 AM", text: "Work is not delivered as expected and there are a lot of problems with the UI design. Work is not delivered as expected and there are a lot of problems with the UI design." },
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

  const MilestoneCard = ({ milestone }) => (
    <div className={`bg-white rounded-2xl p-6 lg:p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col gap-6 ${selectedMilestone?.id === milestone.id ? 'border-[#D8D6F8]' : ''}`}>
      <div className="grid grid-cols-3 gap-4 items-start">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg lg:text-[14px] font-medium text-[#001032]">{milestone.name}</h3>
          <p className="text-[10px] lg:text-xs text-[#001032]">{milestone.subtitle}</p>
          <p className="text-[10px] lg:text-xs text-[#001032] mt-2">{milestone.owner}</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-lg lg:text-[14px] font-medium text-[#001032]">Due Date</span>
          <p className="text-[10px] lg:text-xs text-[#001032]">{milestone.dueDate}</p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-lg lg:text-[14px] font-medium text-[#001032]">Price</span>
          <p className="text-[10px] lg:text-xs text-[#001032]">Rs {milestone.price}</p>
        </div>
      </div>
      <button 
        onClick={() => {
            setSelectedMilestone(milestone);
            setSelectedDispute(null);
            setSelectedFileDispute(null);
            setIsThreadOpen(false);
        }}
        className="w-full py-1 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-bold text-sm lg:text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
      >
        View Details
      </button>
    </div>
  );

  const DisputeCard = ({ dispute, onDetailsClick }) => (
    <div className="space-y-3 mb-6 last:mb-0 rounded-2xl p-3 lg:p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] bg-white">
      <div className="flex items-center justify-between px-2">
        <h4 className="text-sm lg:text-base font-semibold text-[#001032]">Dispute ID – {dispute.id}</h4>
        <span className="bg-[#B91C1C] text-white text-[6px] lg:text-[10px] px-2 lg:px-3 py-1 rounded-full lg:font-semibold">
          Duration - {dispute.duration}
        </span>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-3 lg:px-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2">
        <h5 className="text-sm lg:text-base font-semibold text-[#001032]">{dispute.project}</h5>
        <p className="text-[10px] lg:text-xs text-[#001032]/70 lg:font-medium leading-relaxed">
          <span className="text-[#59549F] lg:font-semibold">Reason</span> – {dispute.reason}
        </p>
        <p className="text-[10px] lg:text-xs text-[#001032]/70 ">
          <span className="text-[#59549F] lg:font-semibold">Amount</span> – {dispute.amount}
        </p>
        <div className="flex justify-end mt-2">
          <button 
            onClick={() => onDetailsClick(dispute)}
            className="px-6 py-2 bg-[#D8D6F8] text-[#59549F] rounded-lg text-[10px] lg:text-xs font-semibold shadow-sm hover:opacity-90 transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const ProjectCard = ({ details }) => (
    <div className="bg-white rounded-2xl p-6 lg:p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4 items-start">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg lg:text-[14px] font-medium text-[#001032]">{details.name}</h3>
          <p className="text-[10px] lg:text-xs text-[#001032]  decoration-[#59549F]">{details.subtitle}</p>
          <p className="text-[10px] lg:text-xs text-[#001032] mt-2">{details.owner}</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-lg lg:text-[14px] font-medium text-[#001032]">Due Date</span>
          <p className="text-[10px] lg:text-xs text-[#001032]">{details.dueDate}</p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-lg lg:text-[14px] font-medium text-[#001032]">Price</span>
          <p className="text-[10px] lg:text-xs text-[#001032]">Rs {details.price}</p>
        </div>
      </div>
      <button 
        onClick={() => setIsThreadOpen(true)}
        className="w-full py-1 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-md text-[#59549F] font-bold text-sm lg:text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
      >
        Open Thread
      </button>
    </div>
  );

  const MilestoneDetailItem = ({ item }) => (
    <div className="space-y-3 mb-6 last:mb-0 rounded-2xl p-3 lg:p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] bg-white">
      <div className="flex items-center justify-between px-2">
        <h4 className="text-sm lg:text-base font-semibold text-[#001032]">{item.id}</h4>
        <span className="bg-[#B91C1C] text-white text-[8px] lg:text-[10px] px-3 py-1 rounded-full">
          Duration - {item.duration}
        </span>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-3 lg:px-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2">
        <h5 className="text-sm lg:text-base font-semibold text-[#001032]">{item.title}</h5>
        <p className="text-[10px] lg:text-xs text-[#001032]/70 font-medium leading-relaxed">
          <span className="text-[#59549F] font-semibold">Reason</span> – {item.reason}
        </p>
        <p className="text-[10px] lg:text-xs text-[#001032]/70 ">
          <span className="text-[#59549F] font-semibold">Amount</span> – {item.amount}
        </p>
        <div className="flex justify-end mt-2">
          <button 
            onClick={() => {
                setSelectedMilestoneItem(item);
                setIsThreadOpen(true);
            }}
            className="px-6 py-2 bg-[#D8D6F8] text-[#59549F] rounded-lg text-[10px] lg:text-xs font-semibold shadow-sm hover:opacity-90 transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-2 lg:py-2 bg-[#FDFDFF] lg:h-[650px] h-screen overflow-hidden">
      
      {/* ── Left Column ── */}
      <div className={`flex-1 flex py-2 flex-col gap-6 overflow-hidden ${ (selectedDispute || isThreadOpen || selectedMilestone || selectedFileDispute) ? 'hidden lg:flex' : 'flex'}`}>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 shrink-0 px-1">
          <StatCard label="Open Communication" value="16" bgColor="bg-[#D8E1F0]" />
          <StatCard label="Resolved" value="4" bgColor="bg-[#D8D6F8]" />
          <StatCard label="Pending" value="3" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Closed" value="12" bgColor="bg-[#D7EBE4]" />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-1 shrink-0">
          {["Milestones", "Disputes", "Files"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedDispute(null);
                setSelectedMilestone(null);
                setSelectedMilestoneItem(null);
                setSelectedFileDispute(null);
                setIsThreadOpen(false);
              }}
              className={`flex-1 py-1 text-[10px] lg:text-sm font-bold rounded-lg transition-all shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border ${
                activeTab === tab 
                ? "bg-[#D8D6F8] text-[#59549F] border-[#D8D6F8]" 
                : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div> 

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-1 space-y-4  p-2">
          {activeTab === "Disputes" ? (
            disputesData.map((dispute, idx) => (
              <DisputeCard 
                key={idx} 
                dispute={dispute} 
                onDetailsClick={(d) => {
                    setSelectedDispute(d);
                    setSelectedMilestone(null);
                    setSelectedFileDispute(null);
                    setIsThreadOpen(false);
                }}
              />
            ))
          ) : activeTab === "Milestones" ? (
            milestonesData.map((milestone, idx) => (
              <MilestoneCard key={idx} milestone={milestone} />
            ))
          ) : activeTab === "Files" ? (
            disputesData.map((dispute, idx) => (
              <DisputeCard 
                key={idx} 
                dispute={dispute} 
                onDetailsClick={(d) => {
                    setSelectedFileDispute(d);
                    setSelectedDispute(null);
                    setSelectedMilestone(null);
                    setIsThreadOpen(false);
                }}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-40 opacity-40 italic text-sm">
              No {activeTab} data available
            </div>
          )}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col  overflow-hidden ${(selectedDispute || isThreadOpen || selectedMilestone || selectedFileDispute) ? 'flex' : 'hidden lg:flex'}`}>
        
        {/* Back Header */}
        {(selectedDispute || isThreadOpen || selectedMilestone || selectedFileDispute) && (
          <div className="flex items-center gap-3 py-1 px-2">
            {!isThreadOpen && (
              <>
                <button 
                    onClick={() => {
                        setSelectedDispute(null);
                        setSelectedMilestone(null);
                        setSelectedFileDispute(null);
                    }} 
                    className="p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm"
                >
                  <FiArrowLeft size={20} />
                </button>
                <span className="font-semibold text-lg text-[#001032]">
                    {selectedMilestone ? "Milestone Details" : "Dispute Projects"}
                </span>
              </>
            )}
          </div>
        )}

        <div className={`flex-1 bg-white lg:rounded-2xl flex flex-col overflow-hidden m-1 ${(!isThreadOpen && activeTab === "Milestones") ? "" : ""}`}>
          {(selectedDispute || selectedFileDispute) && !isThreadOpen && (
            <div className="flex items-center justify-between px-2 shrink-0">
               <h2 className="text-xl font-semibold text-[#001032]">Disputes</h2>
            </div> 
          )}

          <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
            {isThreadOpen ? (
              /* ═══ Communication Thread View ═══ */
              <div className="space-y-8 ">
                {activeTab === "Files" ? (
                  /* ─── Files Specific Thread View (matches screenshot) ─── */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <button 
                              onClick={() => {
                                  setIsThreadOpen(false);
                              }}
                              className="p-1.5 bg-gray-50 rounded-full text-[#59549F] shadow-sm hover:bg-gray-100 transition-all"
                          >
                              <FiArrowLeft size={18} />
                          </button>
                          <h4 className="text-sm font-semibold text-[#001032]">
                              Dispute ID – {selectedFileDispute?.id || "DSP-2026-CO003923"}
                          </h4>
                       </div>
                       <span className="bg-[#B91C1C] text-white text-[8px] px-3 py-1 rounded-full">
                          Duration - {selectedFileDispute?.duration || "20 Days"}
                       </span>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                       <h5 className="font-semibold text-[#001032] mb-2">Milestone 1</h5>
                       <p className="text-xs text-gray-500">
                         <span className="text-[#59549F] font-semibold">Reason</span> – {selectedFileDispute?.reason || "Work is not delivered as expected..."}
                       </p>
                       <p className="text-xs text-gray-500 mt-1">
                         <span className="text-[#59549F] font-semibold">Amount</span> – {selectedFileDispute?.amount || "Rs 10,000"}
                       </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
                       <div className="flex items-center justify-between">
                          <div>
                             <h5 className="text-sm font-semibold text-[#001032]">Files</h5>
                             <p className="text-[10px] text-gray-400">Upload the files in jpg, pdf and docx format</p>
                          </div>
                          <button className="text-[#59549F] hover:opacity-70 transition-all">
                             <div className="w-8 h-8 rounded-full border-2 border-[#59549F] flex items-center justify-center">
                                <FiPlus size={20} />
                             </div>
                          </button>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         {[1, 2, 3, 4, 5, 6].map(i => (
                           <div key={i} className="aspect-[16/9] bg-white border border-gray-100 rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1)]" />
                         ))}
                       </div>
                    </div>
                  </div>
                ) : (
                  /* ─── Standard Communication Thread (Disputes/Milestones) ─── */
                  <>
                    {/* Top Summary */}
                    <div className="space-y-6">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <button 
                                onClick={() => {
                                    setIsThreadOpen(false);
                                    setSelectedMilestoneItem(null);
                                }}
                                className="p-1.5 bg-gray-50 rounded-full text-[#59549F] shadow-sm hover:bg-gray-100 transition-all"
                            >
                                <FiArrowLeft size={18} />
                            </button>
                            <h4 className="text-sm font-semibold text-[#001032]">
                                {selectedMilestoneItem?.id || selectedDispute?.id || "DSP-2026-CO003923"}
                            </h4>
                         </div>
                         <span className="bg-[#B91C1C] text-white text-[8px] px-3 py-1 rounded-full">
                            Duration - {selectedMilestoneItem?.duration || "20 Days"}
                         </span>
                       </div>

                       <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                          <h5 className="font-semibold text-[#001032] mb-2">
                            {selectedMilestoneItem?.title || "Milestone 1"}
                          </h5>
                          <p className="text-xs text-gray-500">
                            <span className="text-[#59549F] font-semibold">Reason</span> – {selectedMilestoneItem?.reason || selectedDispute?.reason || "Work is not delivered as expected..."}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            <span className="text-[#59549F] font-semibold">Amount</span> – {selectedMilestoneItem?.amount || "Rs 10,000"}
                          </p>
                       </div>

                       <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
                          <h5 className="text-sm font-semibold text-[#001032]">
                            {selectedMilestoneItem ? "Files" : "Evidence Upload"}
                          </h5>
                          <p className="text-[10px] text-gray-400 -mt-2">
                            {selectedMilestoneItem ? "Upload the files in jpg, pdf and docx format" : "Upload the evidence in jpg, pdf and docx format"}
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map(i => (
                              <div key={i} className="aspect-[4/3] bg-white border border-gray-100 rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1)] flex items-center justify-center">
                                <FiPlus size={24} className="text-[#59549F]" />
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>

                    {/* Chat Thread */}
                    <div className="space-y-6 mt-10">
                       <h3 className="text-base font-semibold text-[#001032]">Communication Thread</h3>
                       {chatMessages.map((msg, i) => (
                         <div key={i} className={`flex flex-col gap-2 ${msg.isAdmin ? 'pl-10' : ''}`}>
                            <div className="bg-white rounded-2xl p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-50 relative">
                               <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
                                  <div className="flex-1 flex items-center justify-between">
                                     <span className="font-semibold text-sm text-[#001032]">{msg.name}</span>
                                     <span className="text-[9px] text-gray-400">{msg.time}</span>
                                  </div>
                               </div>
                               <p className="text-[11px] text-gray-500 leading-relaxed text-justify">{msg.text}</p>
                               <div className="flex justify-end mt-2">
                                  <button className="px-4 py-1 bg-[#D8D6F8] text-[#59549F] text-[10px] font-bold rounded-md">Reply</button>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>

                    {/* Bottom Controls */}
                    <div className="space-y-4 mt-8">
                       <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Enter the text" 
                            className="w-full pl-4 pr-16 py-4 bg-white border border-gray-200 rounded-xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] text-xs outline-none"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-[#59549F]">
                             <button className="hover:opacity-70"><FiPlus className="rotate-45" size={18} /></button>
                             <button className="hover:opacity-70"><FiPlus className="-rotate-12" size={18} /></button>
                          </div>
                       </div>

                       {!selectedMilestoneItem && (
                         <>
                            <button className="w-full py-2 border border-gray-300 rounded-xl text-sm font-semibold text-[#313131] hover:bg-gray-50">Resolution Options</button>
                            <button className="w-full py-2 bg-[#004F5B] text-white rounded-xl text-sm font-semibold shadow-md hover:opacity-90">Approve Payment</button>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="py-2 bg-[#FFEDCF] text-[#FF9D00] rounded-xl text-sm font-semibold shadow-sm">Refund Payment</button>
                                <button className="py-2 border border-gray-200 rounded-xl text-sm font-semibold bg-[#FFFFFF] text-[#59549F]">Split Payment</button>
                                <button className="py-2 bg-[#CDCDCD] text-[#404040] rounded-xl text-sm font-semibold shadow-sm">Request Revision</button>
                                <button className="py-2 bg-[#FFD0D0] text-[#BA1E1E]  rounded-xl text-sm font-semibold shadow-sm">Escalate</button>
                            </div>
                         </>
                       )}
                    </div>
                  </>
                )}
              </div>
            ) : (selectedDispute || selectedFileDispute) ? (
              <div className="space-y-6 ">
                {[1, 2, 3].map((_, i) => (
                  <ProjectCard key={i} details={(selectedDispute || selectedFileDispute).details} />
                ))}
              </div>
            ) : selectedMilestone ? (
              /* ═══ Milestone Details List View ═══ */
              <div className="space-y-6 ">
                {selectedMilestone.items.length > 0 ? (
                  selectedMilestone.items.map((item, idx) => (
                    <MilestoneDetailItem key={idx} item={item} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full opacity-40 text-center gap-4">
                     <p className="text-sm font-medium italic">No milestones found for this project</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-40 text-center gap-4">
                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <MdOutlineFactCheck size={32} className="text-gray-300" />
                 </div>
                 <p className="text-sm font-medium italic">Select a {activeTab.slice(0, -1).toLowerCase()} from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
