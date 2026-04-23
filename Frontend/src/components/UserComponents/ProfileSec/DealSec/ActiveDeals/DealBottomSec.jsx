import React from "react";
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlinePrivateConnectivity } from "react-icons/md";

const DealBottomSec = ({ 
  selectedProject, 
  setSelectedProject, 
  rightPanelState, 
  setRightPanelState, 
  selectedMilestone, 
  setSelectedMilestone 
}) => {
  // ── Dummy Project Data ──
  const projects = [
    {
      id: 1,
      name: "Parikalpna",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "1,50,000",
      strength: "High likelihood of successful closure",
      strengthPoints: ["Fast response time", "Clear milestone breakdown", "Competitive pricing"],
      scopeSummary: ["Develop a mobile app with core features and user registration", "Implement payment gateway integration"],
      fullDescription: "These Terms and Conditions (\"Terms\") govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (\"Portal\") operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated].",
      milestones: [
        {
          id: 101,
          name: "Milestone 1 - Wireframe Designing",
          description: "Develop a mobile app with core features",
          dueDate: "15th April, 2026",
          status: "Awaiting Response",
          duration: "20 Days",
          budget: "1,20,000",
        },
        {
          id: 102,
          name: "Milestone 2 - UI/UX Design",
          description: "Design system and high fidelity screens",
          dueDate: "20th May, 2026",
          status: "In Progress",
          duration: "30 Days",
          budget: "80,000",
        }
      ]
    },
    { id: 2, name: "Stellar", subtitle: "Web Platform", owner: "Arjun Patel", dueDate: "18 Mar, 2026", price: "2,00,000" },
    { id: 3, name: "NomadX", subtitle: "API Integration", owner: "Sarah Chen", dueDate: "5 June, 2026", price: "75,000" },
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

  const ProjectCard = ({ proj }) => (
    <div className={`bg-white rounded-2xl px-4 lg:px-6 py-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all shrink-0 ${selectedProject?.id === proj.id ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
      <div className="grid grid-cols-3 gap-2 lg:gap-2 mb-4 items-start">
        {/* Row 1, Col 1: Title */}
        <div className="flex flex-col">
          <h3 className="lg:text-xl lg:text-[16px] font-medium text-[#000000] leading-tight">{proj.name}</h3>
        </div>
        {/* Row 1, Col 2: Due Date Label */}
        <div className="flex flex-col lg:items-center">
          <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Due Date</p>
        </div>
        {/* Row 1, Col 3: Price Label */}
        <div className="flex flex-col lg:items-end">
          <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Price</p>
        </div>

        {/* Row 2, Col 1: Subtitle */}
        <div className="flex flex-col -mt-1">
          <p className="text-[10px] lg:text-sm  text-[#000000]  decoration-[#59549F] underline-offset-4 w-fit">{proj.subtitle}</p>
        </div>
        {/* Row 2, Col 2: Due Date Value */}
        <div className="flex flex-col lg:items-center -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000] ">{proj.dueDate}</p>
        </div>
        {/* Row 2, Col 3: Price Value */}
        <div className="flex flex-col lg:items-end -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000] ">Rs {proj.price}</p>
        </div>

        {/* Row 3, Col 1: Owner (Below Row 2) */}
        <div className="col-span-3">
          <p className="text-[10px] lg:text-sm text-[#000000]  ">{proj.owner}</p>
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

  const SectionCard = ({ title, children, showPlus = false, showDot = false }) => (
    <div className="bg-white rounded-2xl lg:p-6 p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {showDot && <div className="w-2 h-2 rounded-full bg-[#3CC033]" />}
          <h4 className="text-sm lg:text-[16px] font-medium text-[#000000]">{title}</h4>
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
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-4  lg:py-4 bg-[#FDFDFF]">
      
      {/* ── LEFT COLUMN (Project List) ── */}
      <div className={`flex-1 space-y-4 max-h-[610px] overflow-y-auto scrollbar-hide p-2 ${rightPanelState !== 'none' ? 'hidden lg:block' : 'block'}`}>
        
        {/* Summary Cards Grid */} 
        <div className="grid grid-cols-2 gap-4">
          {/* Active Deals Card */}
          <div className="bg-[#D8E1F0] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Active Deals</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">16</p>
          </div>

          {/* Total Ongoing Value Card */}
          <div className="bg-[#D8D6F8] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Total Ongoing Value</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">32L</p>
          </div>

          {/* Pending Release Card */}
          <div className="bg-[#EFDBD9] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Pending Payments</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">3.5L</p>
          </div>

          {/* Due this week Card */}
          <div className="bg-[#D7EBE4] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Due this week</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">5L</p>
          </div>
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-2 mb-4 px-1">Deal Drafts</h2>
        {projects.map(proj => (
          <ProjectCard key={proj.id} proj={proj} />
        ))}
      </div>

      {/* ── RIGHT COLUMN (Dynamic Panel) ── */}
      <div className={`lg:w-[450px] xl:w-[550px] mt-5 lg:mt-auto flex flex-col ${rightPanelState === 'none' ? 'hidden lg:block' : 'block'}`}>
        
        <div className={`rounded-2xl p-2 transition-all duration-300 h-[610px] overflow-y-auto scrollbar-hide flex flex-col 
          ${(rightPanelState === 'scopeDetails' || rightPanelState === 'milestoneDetails' || rightPanelState === 'none') 
            ? 'bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 m-2 lg:p-6 p-3' 
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
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50  ">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <IoMdCheckmark size={40} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-400">No Project Selected</h3>
              <p className="text-sm text-gray-400 mt-1 italic">Select a project from the left to view active deal details.</p>
            </div>
          )}

          {/* OVERVIEW STATE */}
          {rightPanelState === 'overview' && selectedProject && (
            <div className="space-y-4 ">
              {/* Deal Strength */}
              <SectionCard title="Deal Strength" showDot>
                <p className="text-xs text-gray-500 mb-4">{selectedProject.strength}</p>
                <ul className="space-y-2">
                  {selectedProject.strengthPoints.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs  text-[#000000]">
                      <IoMdCheckmark className="text-[#000000]" size={16} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {/* Scope summary */}
              <SectionCard title="Scope of Work">
                <ul className="space-y-1 mb-4">
                  {selectedProject.scopeSummary.map((item, i) => (
                    <li key={i} className="text-[#000000] text-sm">{item}</li>
                  ))}
                </ul>
                <button 
                  onClick={handleViewScope}
                  className="w-full py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90"
                >
                  View Details
                </button>
              </SectionCard>

              {/* Budget/Timeline (Read-only version) */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                  <h4 className="text-[16px] font-medium text-[#000000] mb-5 ">Total Budget</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="lg:w-[150px] w-full px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR - Indian Rupees</div>
                    <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Rs {selectedProject.price}</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                  <h4 className="text-[16px] font-medium text-[#000000] mb-3">Total Timeline</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="lg:w-[150px] w-full px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Total Days</div>
                    <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">90 Days</div>
                  </div>
                </div>
              </div>

              {/* Milestones list */}
              <SectionCard title="Milestone" showPlus>
                <div className="space-y-3 mt-2">
                  {selectedProject.milestones.map(m => (
                    <div key={m.id} className="bg-[#F8F8F8] rounded-xl p-4 relative">
                      <div className="absolute top-4 right-4 items-end flex flex-col gap-2">
                        <span className="bg-[#EAB308] text-white text-[10px] px-2 py-0.5 rounded-md font-medium">{m.status}</span>
                        <button 
                          onClick={() => handleViewMilestone(m)}
                          className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-[#59549F] shadow-sm hover:bg-gray-50"
                        >
                          View Details
                        </button>
                      </div>
                      <div className="flex gap-3 pr-24">
                        <div className="w-4 h-4 rounded-full bg-[#D8D6F8] mt-1 shrink-0" />
                        <div>
                          <h5 className="text-xs font-medium text-[#000000]">{m.name}</h5>
                          <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{m.description}</p>
                          <p className="text-[10px] text-gray-400 mt-2 font-medium">Due Date - {m.dueDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {rightPanelState === 'scopeDetails' && selectedProject && (
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6 lg:mb-6">
                <button onClick={handleBack} className="hidden lg:flex p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm">
                  <FiArrowLeft size={18} />
                </button>
                <h3 className="text-lg font-medium text-[#000000]">Scope of Work</h3>
              </div>
              <div className="space-y-2 lg:p-3 px-0 py-0 lg:-m-3 flex-1">
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
                   <div className="relative group">
                     <input 
                       type="text" 
                       placeholder="Add more..." 
                       readOnly
                       className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-xs focus:border-[#59549F] outline-none transition-all pr-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-dashed" 
                     />
                     <button className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-light text-gray-400 hover:text-[#59549F] transition-colors">
                       +
                     </button>
                   </div>
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

          {/* FULL MILESTONE DETAILS VIEW */}
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
                   <div className="flex gap-3 mb-2">
                     <div className="lg:w-[150px] w-full px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR - Indian Rupees</div>
                     <input 
                       type="text" 
                       readOnly
                       value={`Rs ${selectedMilestone.budget}`}
                       className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                     />
                   </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                   <h4 className="text-sm font-medium text-[#000000] mb-4">Timeline - {selectedMilestone.name.split(' - ')[0]}</h4>
                   <div className="flex gap-3 mb-2">
                     <div className="lg:w-[150px] w-full px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Total Days</div>
                     <input 
                       type="text" 
                       readOnly
                       value={selectedMilestone.duration}
                       className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
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

export default DealBottomSec;
