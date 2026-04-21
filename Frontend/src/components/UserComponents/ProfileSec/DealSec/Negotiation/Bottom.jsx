import React from "react";
import { FiPlus, FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlineArrowsRightLeft, HiOutlineUserGroup } from "react-icons/hi2";
import { LuArrowLeftRight, LuClock } from "react-icons/lu";

const Bottom = ({ 
  selectedProject, 
  setSelectedProject, 
  rightPanelState, 
  setRightPanelState, 
  selectedMilestone, 
  setSelectedMilestone 
}) => {
  // ── Dummy Proposal Data ──
  const proposals = [
    {
      id: 1,
      name: "Parikalpna",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "1,50,000",
      badge: "Fast Responder",
      badgeColor: "bg-[#FDF1E7] text-[#6D5A4A]",
      strength: "High likelihood of successful closure",
      strengthPoints: ["Clear milestone breakdown", "Competitive pricing"],
      scopeSummary: ["Develop a mobile app with core features and user registration", "Implement payment gateway integration"],
      fullDescription: "Develop a mobile app with core features and user registration. Implement payment gateway integration and ensure cross-platform compatibility.",
      milestones: [
        {
          id: 101,
          name: "Milestone 1 - Wireframe Designing",
          description: "develop a mobile app with core features",
          dueDate: "15th April, 2026",
          status: "Awaiting Response",
          duration: "20 Days",
          budget: "1,20,000",
        },
        {
          id: 102,
          name: "Milestone 1 - Wireframe Designing",
          description: "develop a mobile app with core features",
          dueDate: "15th April, 2026",
          status: "Awaiting Response",
          duration: "20 Days",
          budget: "1,20,000",
        },
        {
          id: 103,
          name: "Milestone 1 - Wireframe Designing",
          description: "develop a mobile app with core features",
          dueDate: "15th April, 2026",
          status: "Awaiting Response",
          duration: "20 Days",
          budget: "1,20,000",
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
      badge: "Slow Responder - May delay deal",
      badgeColor: "bg-[#FDF1E7] text-[#6D5A4A]",
      scopeSummary: ["Develop a mobile app with core features and user registration", "Implement payment gateway integration"],
      fullDescription: "Develop a mobile app with core features and user registration. Implement payment gateway integration and ensure cross-platform compatibility.",
      milestones: [
        {
          id: 201,
          name: "Milestone 1 - Wireframe Designing",
          description: "develop a mobile app with core features",
          dueDate: "15th April, 2026",
          status: "Awaiting Response",
          duration: "20 Days",
          budget: "1,20,000",
        },
        {
          id: 202,
          name: "Milestone 1 - Wireframe Designing",
          description: "develop a mobile app with core features",
          dueDate: "15th April, 2026",
          status: "Awaiting Response",
          duration: "20 Days",
          budget: "1,20,000",
        },
        {
          id: 203,
          name: "Milestone 1 - Wireframe Designing",
          description: "develop a mobile app with core features",
          dueDate: "15th April, 2026",
          status: "Awaiting Response",
          duration: "20 Days",
          budget: "1,20,000",
        }
      ]
    },
    { 
      id: 3, 
      name: "Lawkase", 
      subtitle: "Mobile App Development", 
      owner: "Akshay Dogra", 
      dueDate: "1 March, 2026", 
      price: "1,50,000",
      scopeSummary: ["Develop a mobile app with core features and user registration", "Implement payment gateway integration"],
      fullDescription: "Develop a mobile app with core features and user registration. Implement payment gateway integration and ensure cross-platform compatibility.",
      milestones: [
        {
          id: 301,
          name: "Milestone 1 - Wireframe Designing",
          description: "develop a mobile app with core features",
          dueDate: "15th April, 2026",
          status: "Awaiting Response",
          duration: "20 Days",
          budget: "1,20,000",
        },
        {
          id: 302,
          name: "Milestone 1 - Wireframe Designing",
          description: "develop a mobile app with core features",
          dueDate: "15th April, 2026",
          status: "Awaiting Response",
          duration: "20 Days",
          budget: "1,20,000",
        },
        {
          id: 303,
          name: "Milestone 1 - Wireframe Designing",
          description: "develop a mobile app with core features",
          dueDate: "15th April, 2026",
          status: "Awaiting Response",
          duration: "20 Days",
          budget: "1,20,000",
        }
      ]
    },
  ];

  // ── Handlers ──
  const handleViewProject = (proj) => {
    setSelectedProject(proj);
    setRightPanelState('overview');
  };

  const handleViewScope = () => {
    setRightPanelState('scopeDetails');
  };

  const handleViewMilestone = (m) => {
    setSelectedMilestone(m);
    setRightPanelState('milestoneDetails');
  };

  const handleBack = () => {
    if (rightPanelState === 'scopeDetails' || rightPanelState === 'milestoneDetails') {
      setRightPanelState('overview');
    } else {
      setRightPanelState('none');
      setSelectedProject(null);
    }
  };

  const backLabel = (rightPanelState === 'scopeDetails' || rightPanelState === 'milestoneDetails') ? 'Back to Overview' : 'Back to List';

  // ── Sub-Components ──

  const ProposalCard = ({ proj }) => (
    <div className={`bg-white rounded-2xl px-4 lg:px-6 py-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all shrink-0 ${selectedProject?.id === proj.id ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
      <div className="grid grid-cols-3 gap-2 lg:gap-2 mb-4 items-start">
        <div className="flex flex-col">
          <h3 className="lg:text-[16px] text-[14px] font-medium text-[#000000] leading-tight">{proj.name}</h3>
        </div>
        <div className="flex flex-col lg:items-center">
          <p className="text-[14px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Due Date</p>
        </div>
        <div className="flex flex-col lg:items-end">
          <p className="text-[14px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Price</p>
        </div>

        <div className="flex flex-col -mt-1">
          <p className="text-[12px] lg:text-sm text-[#000000]">{proj.subtitle}</p>
        </div>
        <div className="flex flex-col lg:items-center -mt-1">
          <p className="text-[12px] lg:text-sm text-[#000000]">{proj.dueDate}</p>
        </div>
        <div className="flex flex-col lg:items-end -mt-1">
          <p className="text-[12px] lg:text-sm text-[#000000]">Rs {proj.price}</p>
        </div>

        <div className="col-span-3 flex justify-between items-center ">
          <p className="text-[12px] lg:text-sm text-[#000000]">{proj.owner}</p>
          {proj.badge && (
            <span className={`text-[10px] lg:text-[10px] px-2 py-0.5 rounded-full font-medium ${proj.badgeColor}`}>
              {proj.badge}
            </span>
          )}
        </div>
      </div>

      <button 
        onClick={() => handleViewProject(proj)}
        className="w-full mt-4 py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-all"
      >
        View Details
      </button>
    </div>
  );

  const SectionCard = ({ title, children, showPlus = false, showDot = false, underlined = false }) => (
    <div className="bg-white rounded-2xl lg:p-6 p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {showDot && <div className="w-2 h-2 rounded-full bg-[#3CC033]" />}
          <h4 className={`text-sm lg:text-[16px] font-medium text-[#000000] `}>
            {title}
          </h4>
        </div>
        {showPlus && (
          <div className="text-[#59549F] transition-transform cursor-pointer">
            <FiPlus size={24} className="border-2 border-[#59549F] rounded-full p-0.5" />
          </div>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF]">
      
      {/* ── LEFT COLUMN ── */}
      <div className={`flex-1 space-y-4 max-h-[610px] overflow-y-auto scrollbar-hide p-2 ${rightPanelState !== 'none' ? 'hidden lg:block' : 'block'}`}>
        
        {/* Summary Cards Grid */} 
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#D8E1F0] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <HiOutlineArrowsRightLeft size={20} className="text-[#001032]" />
              <h3 className="text-[12px] lg:text-sm lg:font-medium text-[#001032]">Open Proposals</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">7</p>
          </div>

          <div className="bg-[#D8D6F8] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <HiOutlineUserGroup size={20} className="text-[#001032]" />
              <h3 className="text-[12px] lg:text-sm lg:font-medium text-[#001032]">Awaiting Response</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">4</p>
          </div>

          <div className="bg-[#EFDBD9] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <LuArrowLeftRight size={20} className="text-[#001032]" />
              <h3 className="text-[12px] lg:text-sm lg:font-medium text-[#001032]">Counter Offers</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">3</p>
          </div>

          <div className="bg-[#D7EBE4] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <LuClock size={20} className="text-[#001032]" />
              <h3 className="text-[12px] lg:text-sm lg:font-medium text-[#001032]">Expiring Soon</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">2</p>
          </div>
        </div>

        {/* Interest/Slots Tip Card */}
        <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-2xl p-4 shadow-sm space-y-3 mt-2">
           <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-500"><path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p className="text-xs font-medium text-[#000000]">3 professionals are interested</p>
           </div>
           <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-yellow-500"><path d="M13 2L3 14H12V22L22 10H13V2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p className="text-xs font-medium text-[#000000]">Limited selection slots</p>
           </div>
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-2 mb-4 px-1">Proposals</h2>
        {proposals.map(proj => (
          <ProposalCard key={proj.id} proj={proj} />
        ))}
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className={`lg:w-[450px] xl:w-[550px] mt-5 lg:mt-auto flex flex-col ${rightPanelState === 'none' ? 'hidden lg:block' : 'block'}`}>
        
        <div className={`rounded-2xl p-2 transition-all duration-300 h-[610px] overflow-y-auto scrollbar-hide flex flex-col 
          ${(rightPanelState !== 'overview' && rightPanelState !== 'none') 
            ? 'bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 m-2 lg:p-6 p-3 ' 
            : 'bg-transparent'}`}>
          
          {/* Mobile Back Header */}
          {rightPanelState !== 'none' && (
            <div className="lg:hidden flex items-center gap-3 mb-3">
              <button onClick={handleBack} className=" bg-gray-50 rounded-full text-[#59549F]">
                <FiArrowLeft size={20} />
              </button>
              <span className="font-bold text-lg">{backLabel}</span>
            </div>
          )}

          {/* NO SELECTION STATE */}
          {rightPanelState === 'none' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50 bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100  rounded-2xl">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <IoMdCheckmark size={40} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-400">No Proposal Selected</h3>
              <p className="text-sm text-gray-400 mt-1 italic">Select a proposal from the left to view negotiation details.</p>
            </div>
          )}

          {/* OVERVIEW STATE */}
          {rightPanelState === 'overview' && selectedProject && (
            <div className="space-y-4">
              {/* Improve your proposal Card */}
              <div className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] rounded-2xl p-5 ">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#000000]">
                    <FiAlertTriangle size={20} className="text-[#F59E0B]" />
                    <h4 className="font-semibold text-[15px]">Improve your proposal</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                     <div className="flex items-center gap-2 text-xs text-[#000000]">
                       <IoMdCheckmark className="text-[#10B981] text-lg" />
                       <span>Clear milestone breakdown</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs text-[#000000]">
                       <IoMdCheckmark className="text-[#10B981] text-lg" />
                       <span>Competitive pricing</span>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 ">
                     <div className="bg-white p-3 flex flex-col gap-3">
                        <div className="flex items-start gap-2">
                           <FiAlertTriangle size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                           <div className="flex flex-col">
                              <span className="  text-[11px] lg:text-[11px] text-[#000000]">Budget Mismatch</span>
                              <span className="text-[9px] lg:text-[10px] text-gray-500 leading-tight mt-1">Match your total budget with total milestone's budget</span>
                           </div>
                        </div>
                        <button className="w-fit px-4 py-1 bg-[#D8D6F8] rounded-md text-[#59549F] text-[10px] font-medium shadow-sm ml-6">Revise</button>
                     </div>
                     <div className="bg-white p-3  flex flex-col gap-3">
                        <div className="flex items-start gap-2">
                           <FiAlertTriangle size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                           <div className="flex flex-col">
                              <span className=" text-[11px] lg:text-[11px] text-[#000000]">Scope of work is not properly defined</span>
                              <span className="text-[9px] lg:text-[10px] text-gray-500 leading-tight mt-1">Define your requirements in detail to understand it better</span>
                           </div>
                        </div>
                        <button className="w-fit px-4 py-1 bg-[#D8D6F8] rounded-md text-[#59549F] text-[10px] font-medium shadow-sm ml-6">Revise</button>
                     </div>
                  </div>
                </div>
              </div>

              {/* Scope summary */}
              <SectionCard title="Scope of Work" underlined>
                <p className="text-sm text-[#000000] mt-2 mb-4 leading-relaxed line-clamp-2">
                  {selectedProject.fullDescription}
                </p>
                <button 
                  onClick={handleViewScope}
                  className="w-full py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90 mt-2"
                >
                  View Details
                </button>
              </SectionCard>

              {/* Budget/Timeline */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                  <h4 className="text-[16px] font-medium text-[#000000] mb-4">Total Budget</h4>
                  <div className="flex flex-col lg:flex-row gap-3">
                    <div className="lg:w-[150px] w-full px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR - Indian Rupees</div>
                    <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Rs {selectedProject.price}</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                  <h4 className="text-[16px] font-medium text-[#000000] mb-4">Total Timeline</h4>
                  <div className="flex flex-col lg:flex-row gap-3 mb-4">
                    <div className="lg:w-[150px] w-full px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Total Days</div>
                    <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">90 Days</div>
                  </div>
                  <div className="flex justify-end">
                     <div className="flex bg-[#D8D6F8] rounded-md shadow-[inset_0px_0px_8px_rgba(0,0,0,0.15)] overflow-hidden border border-purple-200">
                        <button className="px-6 py-2 text-[#59549F] text-xs font-bold hover:bg-black/5 transition-all">Approve</button>
                        <div className="w-[1px] bg-[#59549F] opacity-20 my-2" />
                        <button className="px-6 py-2 text-[#59549F] text-xs font-bold hover:bg-black/5 transition-all">Edit</button>
                     </div>
                  </div>
                </div>
              </div>

              {/* Milestones list */}
              <SectionCard title="Milestone" showPlus>
                <div className="space-y-3 mt-4">
                  {selectedProject.milestones?.map(m => (
                    <div key={m.id} className="bg-[#F8F8F8] rounded-xl p-2 lg:p-4 relative">
                      <div className="absolute top-2 right-2 lg:top-4 lg:right-4">
                        <span className="bg-[#EAB308] text-white text-[8px] lg:text-[10px] px-2 py-0.5 rounded-md lg:font-medium">{m.status}</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#D8D6F8] mt-1 shrink-0" />
                        <div className="flex-1">
                          <h5 
                            onClick={() => handleViewMilestone(m)}
                            className="text-xs text-[#000000] cursor-pointer hover:text-[#59549F] transition-colors"
                          >
                            {m.name}
                          </h5>
                          <p className="text-[10px] text-gray-500 mt-1 leading-tight">{m.description}</p>
                          
                          <div className="flex items-center justify-between mt-4 gap-2">
                             <p className="text-[9px] lg:text-[10px] text-gray-400 font-medium whitespace-nowrap">Due Date - {m.dueDate}</p>
                             <div className="flex bg-[#D8D6F8] rounded-md shadow-[inset_0px_0px_8px_rgba(0,0,0,0.15)] overflow-hidden border border-purple-200">
                                <button className="px-3 lg:px-5 py-1.5 text-[8px] lg:text-[10px] font-bold text-[#59549F] hover:bg-black/5 transition-all">Approve</button>
                                <div className="w-[1px] bg-[#59549F] opacity-20 my-1" />
                                <button 
                                  onClick={() => handleViewMilestone(m)}
                                  className="px-3 lg:px-5 py-1.5 text-[8px] lg:text-[10px] font-bold text-[#59549F] hover:bg-black/5 transition-all"
                                >
                                  Edit
                                </button>
                             </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Negotiation Action Buttons */}
              <div className="space-y-3 pt-3 pb-3">
                 <div className="flex gap-3">
                    <button className="flex-1 py-2 bg-[#D8D6F8] rounded-lg text-[#59549F] font-semibold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                      Accept Proposal
                    </button>
                    <button className="flex-1 py-2 bg-white border-2 border-gray-100 rounded-lg text-[#000000] font-semibold text-sm shadow-sm">
                      Counter Proposal
                    </button>
                 </div>
                 <button className="w-full py-2 bg-[#D8D6F8] rounded-lg text-[#59549F] font-semibold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                    Proceed for Documentation
                 </button>
              </div>
            </div>
          )}

          {/* SCOPE DETAILS VIEW */}
          {rightPanelState === 'scopeDetails' && selectedProject && (
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6 lg:mb-6">
                <button onClick={handleBack} className="hidden lg:flex p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm">
                  <FiArrowLeft size={18} />
                </button>
                <h3 className="text-lg font-medium text-[#000000]">Scope of Work</h3>
              </div>
              <div className="space-y-2 lg:p-3 lg:px-3 py-3 lg:-m-3 flex-1">
                <div className="space-y-3">
                   {selectedProject.scopeSummary.map((item, i) => (
                     <div key={i} className="relative group">
                       <input 
                         type="text" 
                         value={item} 
                         readOnly
                         className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-xs focus:border-[#59549F] outline-none transition-all pr-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                       />
                       <button className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-light text-gray-400 hover:text-red-500 transition-colors">
                         ×
                       </button>
                     </div>
                   ))}
                </div>
                <div className="mt-8">
                   <h4 className="text-lg font-medium text-[#000000] mb-4">Description</h4>
                   <div className="min-h-[220px] p-6 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-xs text-gray-500 leading-relaxed whitespace-pre-line shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                     {selectedProject.fullDescription}
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* MILESTONE DETAILS VIEW */}
          {rightPanelState === 'milestoneDetails' && selectedMilestone && (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <button onClick={handleBack} className="hidden lg:flex p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm">
                    <FiArrowLeft size={18} />
                  </button>
                  <h3 className="text-lg font-medium text-[#000000]">{selectedMilestone.name.split(' - ')[0]}</h3>
                </div>
                <div className="bg-[#B91C1C] text-white text-[10px] px-3 py-1.5 rounded-full font-bold">
                  Duration - {selectedMilestone.duration}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                   <h4 className="text-sm font-medium text-[#000000] mb-4">Budget - {selectedMilestone.name.split(' - ')[0]}</h4>
                   <div className="flex flex-col lg:flex-row gap-3 mb-2">
                     <div className="lg:w-[150px] w-full px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR - Indian Rupees</div>
                     <input 
                       type="text" 
                       readOnly
                       value={`Rs ${selectedMilestone.budget}`}
                       className="flex-1 px-3 py-2 bg-[#FDFDFF] text-center lg:text-start border border-gray-100 rounded-lg text-[10px] outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                     />
                   </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                   <h4 className="text-sm font-medium text-[#000000] mb-4">Timeline - {selectedMilestone.name.split(' - ')[0]}</h4>
                   <div className="flex flex-col lg:flex-row gap-3 mb-2">
                     <div className="lg:w-[150px] w-full px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Total Days</div>
                     <input 
                       type="text" 
                       readOnly
                       value={selectedMilestone.duration}
                       className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center lg:text-start " 
                     />
                   </div>
                </div>

                <div className="pt-2">
                   <h4 className="text-base font-medium text-[#000000] mb-4 ">Scope of work in milestone 1</h4>
                   <div className="p-6 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-sm text-gray-500 leading-relaxed whitespace-pre-line placeholder:italic shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                     {selectedProject?.fullDescription}
                   </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Bottom;