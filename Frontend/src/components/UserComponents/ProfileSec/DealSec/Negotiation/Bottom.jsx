import { FiPlus, FiArrowLeft, FiAlertTriangle, FiEdit3, FiX } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlineArrowsRightLeft, HiOutlineUserGroup } from "react-icons/hi2";
import { LuArrowLeftRight, LuClock } from "react-icons/lu";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React from "react";

const Bottom = ({ 
  selectedProject, 
  setSelectedProject, 
  rightPanelState, 
  setRightPanelState, 
  selectedMilestone, 
  setSelectedMilestone 
}) => {
  const [deals, setDeals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedDeal, setEditedDeal] = React.useState(null);
  const [userId, setUserId] = React.useState(null);
  const [userRole, setUserRole] = React.useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  // Robust Role Detection: Compare current user ID with deal participants to ensure accurate labels
  const amIStartup = userId && (selectedProject?.startupId?._id === userId || selectedProject?.startupId === userId);
  const amIProfessional = userId && (selectedProject?.professionalId?._id === userId || selectedProject?.professionalId === userId);
  
  // Fallback to localStorage role if IDs aren't loaded yet
  const isStartup = userId ? amIStartup : (userRole?.toLowerCase().trim() === "startup");
  
  const hasUserAgreed = isStartup 
    ? selectedProject?.documentation?.startupAgreed 
    : selectedProject?.documentation?.professionalAgreed;
    
  const hasOtherAgreed = isStartup 
    ? selectedProject?.documentation?.professionalAgreed 
    : selectedProject?.documentation?.startupAgreed;
    
  const hasBothAgreed = (selectedProject?.documentation?.startupAgreed && selectedProject?.documentation?.professionalAgreed) || selectedProject?.status === 'Approved';

  React.useEffect(() => {
    fetchDeals();
    fetchUserInfo();
  }, []);

  // Polling to keep state in sync across both parties
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isEditing) {
        fetchDeals(false); // Fetch silently in background
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isEditing]);

  // Update totalAmount automatically when milestones change during editing
  React.useEffect(() => {
    if (isEditing && editedDeal?.milestones) {
       const newTotal = editedDeal.milestones.reduce((sum, m) => sum + (Number(m.amount) || 0), 0);
       if (newTotal !== Number(editedDeal.totalAmount)) {
         setEditedDeal(prev => prev ? { ...prev, totalAmount: newTotal } : prev);
       }
    }
  }, [editedDeal?.milestones, isEditing]);

  const fetchDeals = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${serverUrl}/api/deals/my-deals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Show Negotiating AND Approved deals ONLY if they have been countered (negotiation history exists)
      const negotiatingDeals = res.data.filter(d => 
        (d.status === "Negotiating" || d.status === "Approved") && 
        (d.negotiation?.history?.length > 0)
      );
      setDeals(negotiatingDeals);

      // Sync selected project with fresh data if it's currently viewed
      if (selectedProject) {
        const updated = negotiatingDeals.find(d => d._id === selectedProject._id);
        if (updated) setSelectedProject(updated);
      }
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast.error("Failed to fetch deals");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const userRes = await axios.get(`${serverUrl}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(userRes.data._id);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleUpdateDeal = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${serverUrl}/api/deals/${selectedProject._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(payload.isCounter ? "Counter offer submitted" : "Approval submitted");
      setIsEditing(false);
      // Update local state for selected project to reflect changes immediately
      const updatedProject = { 
        ...selectedProject, 
        ...payload,
        documentation: {
          ...selectedProject.documentation,
          ...(payload.startupAgreed !== undefined ? { startupAgreed: payload.startupAgreed } : {}),
          ...(payload.professionalAgreed !== undefined ? { professionalAgreed: payload.professionalAgreed } : {}),
        }
      };
      if (updatedProject.documentation.startupAgreed && updatedProject.documentation.professionalAgreed) {
        updatedProject.status = "Approved";
      }
      setSelectedProject(updatedProject);
      fetchDeals(false);
      // Don't close panel or clear selection
    } catch (error) {
      console.error("Error updating deal:", error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const [tempScopeItems, setTempScopeItems] = React.useState([]);
  const [newScopeInput, setNewScopeInput] = React.useState("");
  const [prevPanelState, setPrevPanelState] = React.useState(null);

  // ── Handlers ──
  const handleViewProject = (proj) => {
    setSelectedProject(proj);
    setRightPanelState('overview');
  };

  const handleCreateNew = () => {
    setSelectedProject(null);
    setRightPanelState('create');
  };

  const handleViewScope = () => {
    setPrevPanelState(rightPanelState);
    if (selectedProject) {
      setTempScopeItems(selectedProject.scopeItems || []);
    }
    setRightPanelState('scopeDetails');
  };

  const handleViewMilestone = (m) => {
    setPrevPanelState(rightPanelState);
    setSelectedMilestone(m);
    setRightPanelState('milestoneDetails');
  };

  const handleCreateMilestone = () => {
    setPrevPanelState(rightPanelState);
    setSelectedMilestone({
      id: Date.now(),
      name: "New Milestone",
      description: "",
      dueDate: "",
      status: "Draft",
      duration: "",
      budget: "",
    });
    setRightPanelState('milestoneDetails');
  };

  const handleBack = () => {
    if (rightPanelState === 'scopeDetails' || rightPanelState === 'milestoneDetails') {
      setRightPanelState('overview');
    } else {
      setRightPanelState('none');
      setSelectedProject(null);
      setIsEditing(false);
    }
  };

  const handleAddScopeItem = () => {
    if (newScopeInput.trim()) {
      setTempScopeItems([...tempScopeItems, newScopeInput.trim()]);
      setNewScopeInput("");
    }
  };

  const handleRemoveScopeItem = (index) => {
    setTempScopeItems(tempScopeItems.filter((_, i) => i !== index));
  };

  const handleScopeItemChange = (index, value) => {
    const updated = [...tempScopeItems];
    updated[index] = value;
    setTempScopeItems(updated);
  };

  const handleSaveScope = () => {
    if (isEditing) {
      setEditedDeal({ ...editedDeal, scopeItems: tempScopeItems, scopeDescription: editedDeal.scopeDescription });
      toast.success("Scope updated locally");
    }
    setRightPanelState('overview');
  };

  const backLabel = (rightPanelState === 'scopeDetails' || rightPanelState === 'milestoneDetails') 
    ? 'Back to Overview' 
    : (rightPanelState === 'create' ? 'Cancel Proposal' : 'Back to List');

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF]">
      
      {/* ── LEFT COLUMN ── */}
      <div className={`flex-1 space-y-4 max-h-[610px] overflow-y-auto scrollbar-hide p-2 ${rightPanelState !== 'none' ? 'hidden lg:block' : 'block'}`}>
        
        {/* Summary Cards Grid */} 
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#D8E1F0] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <HiOutlineArrowsRightLeft size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Open Proposals</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">7</p>
          </div>

          <div className="bg-[#D8D6F8] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <HiOutlineUserGroup size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Awaiting Response</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">4</p>
          </div>

          <div className="bg-[#EFDBD9] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <LuArrowLeftRight size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Counter Offers</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">3</p>
          </div>

          <div className="bg-[#D7EBE4] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <LuClock size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Expiring Soon</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">2</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 mb-4 pr-2">
          <h2 className="text-xl font-medium text-[#000000] px-1">Proposals</h2>
        </div>
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading proposals...</div>
        ) : deals.length === 0 ? (
          <div className="text-center py-10 text-gray-400 italic">No active negotiations</div>
        ) : (
          deals.map(proj => (
            <ProposalCard 
              key={proj._id} 
              proj={proj} 
              selectedProject={selectedProject}
              handleViewProject={handleViewProject}
            />
          ))
        )}
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className={`lg:w-[450px] xl:w-[550px] mt-5 lg:mt-auto flex flex-col ${rightPanelState === 'none' ? 'hidden lg:block' : 'block'}`}>
        
        <div className={`transition-all duration-300 h-[610px] flex flex-col relative overflow-hidden p-2
          ${(rightPanelState !== 'overview' && rightPanelState !== 'none' && rightPanelState !== 'create') 
            ? 'bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 m-2 lg:p-6 p-3 rounded-2xl' 
            : 'bg-transparent'}`}>
          
          {/* Desktop Close Button */}
          {rightPanelState !== 'none' && !isEditing && (
            <button 
              onClick={() => {
                setRightPanelState('none');
                setSelectedProject(null);
              }} 
              className="hidden lg:flex absolute top-4 right-4 z-10 p-1.5 bg-gray-50 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-all"
            >
              <FiX size={18} />
            </button>
          )}
          {/* Mobile Back Header */}
          {rightPanelState !== 'none' && (
            <div className="lg:hidden flex items-center gap-3 mb-3">
              <button 
                onClick={handleBack} 
                className=" bg-gray-50 rounded-full text-[#59549F]"
              >
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

          {/* CREATE PROPOSAL STATE */}
          {rightPanelState === 'create' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl lg:p-6 p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                <h4 className="text-[16px] font-medium text-[#000000] mb-2">Scope of Work</h4>
                <p className="text-[10px] lg:text-xs text-[#000000] mb-4 leading-relaxed">
                  Develop a mobile app with core features and user registration 
                  Implement payment gateway integration
                </p>
                <button 
                  onClick={handleViewScope}
                  className="w-full py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                >
                  Add Details
                </button>
              </div>

              <div className="bg-white rounded-2xl lg:p-4 p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                <h4 className="text-[16px] font-medium text-[#000000] mb-4">Total Budget</h4>
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="lg:w-[150px] w-full px-3 py-2 bg-white rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] whitespace-nowrap">INR - Indian Rupees</div>
                  <div className="flex-1 px-3 py-2 bg-white rounded-lg text-xs text-gray-400 text-center lg:text-start  border border-gray-100 flex items-center justify-center lg:justify-start shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Budget Amount</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl lg:p-4 p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                <h4 className="text-[16px] font-medium text-[#000000] mb-4">Total Timeline</h4>
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="lg:w-[150px] w-full px-3 py-2 bg-white rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] whitespace-nowrap">Total Days</div>
                  <div className="flex-1 px-3 py-2 bg-white rounded-lg text-xs text-gray-400   border border-gray-100 flex items-center justify-center lg:justify-start shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Timeline Duration</div>
                </div>
              </div>

              <SectionCard title="Milestone" showPlus onPlusClick={handleCreateMilestone}>
                <div className="space-y-3 mt-4">
                  {[1, 2, 3].map(m => (
                    <div key={m} className="bg-[#F2F2F2] rounded-xl p-3 lg:p-4 relative flex items-center justify-between pr-4">
                      <div className="flex gap-3 items-start flex-1">
                        <div className="w-4 h-4 rounded-full bg-[#D8D6F8] shrink-0" />
                        <div className="flex-1">
                          <h5 className="text-[10px] lg:text-xs text-[#000000]">Milestone {m} - Wireframe Designing</h5>
                          <p className="text-[8px] lg:text-[10px] text-gray-400 mt-1">Develop a mobile app with core features</p>
                          <p className="text-[8px] lg:text-[10px] text-gray-400 font-medium whitespace-nowrap lg:mt-1">Due Date - 15th April, 2026</p>
                        </div>
                      </div>
                      <div className="absolute  right-2 top-1 lg:right-4">
                        <span className="bg-[#EAB308] text-white text-[8px] lg:text-[10px] px-2 py-0.5 rounded-md">Awaiting Response</span>
                      </div>
                      <button 
                        onClick={() => handleViewMilestone({ id: m, name: `Milestone ${m}`, description: 'Develop a mobile app with core features', dueDate: '15th April, 2026', status: 'Awaiting Response', duration: '20 Days', budget: '1,20,000' })}
                        className="bg-white px-4 py-1 rounded-md text-[#59549F] text-[10px] lg:text-xs font-bold shadow-sm whitespace-nowrap mt-8 lg:mt-6"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <div className="space-y-3 pt-3 ">
                 <div className="flex gap-3">
                    <button 
                      onClick={() => setRightPanelState('none')} 
                      className="flex-1 py-2 bg-[#D8D6F8] rounded-lg text-[#59549F] font-medium text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                    >
                      Create Proposal
                    </button>
                    <button 
                      onClick={() => setRightPanelState('none')}
                      className="flex-1 py-2 bg-white border-2 border-gray-100 rounded-lg text-[#000000] font-medium text-sm shadow-sm"
                    >
                      Cancel Proposal
                    </button>
                 </div>
                 <button className="w-full py-2 bg-[#D8D6F8] rounded-lg text-[#59549F] font-medium text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                    Proceed for Documentation
                 </button>
              </div>
            </div>
          )}

          {rightPanelState === 'overview' && selectedProject && (
            <div className="flex flex-col h-full overflow-hidden">
              <button 
                onClick={() => {
                  setRightPanelState('none');
                  setSelectedProject(null);
                }} 
                className="absolute top-4 right-4 z-10 p-1.5 bg-gray-50 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-all"
              >
                <FiX size={18} />
              </button>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-2 relative space-y-4">
                {/* Scope summary */}
                <SectionCard title="Scope of Work">
                  {isEditing ? (
                    <textarea 
                      className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#59549F] min-h-[100px]"
                      value={editedDeal.scopeDescription}
                      onChange={(e) => setEditedDeal({ ...editedDeal, scopeDescription: e.target.value })}
                      placeholder="Enter deal description..."
                    />
                  ) : (
                    <>
                      <ul className="space-y-1 mb-4">
                        {(selectedProject.scopeItems?.length > 0 ? selectedProject.scopeItems : [selectedProject.scopeDescription]).slice(0, 3).map((item, i) => (
                          <li key={i} className="text-[#000000] text-sm flex items-center gap-2">
                             <div className="w-1 h-1 rounded-full bg-[#59549F] shrink-0" />
                             <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <button 
                        onClick={handleViewScope}
                        className="w-full py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90 mt-2"
                      >
                        View Details
                      </button>
                    </>
                  )}
                </SectionCard>

                {/* Budget/Timeline */}
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                    <h4 className="text-[16px] font-medium text-[#000000] mb-4">Total Budget</h4>
                    <div className="flex flex-col lg:flex-row gap-3">
                      <div className="lg:w-[150px] w-full px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR - Indian Rupees</div>
                      {isEditing ? (
                        <div className="flex-1 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Rs</span>
                          <input 
                            type="number"
                            className="w-full pl-8 pr-4 py-2 bg-white rounded-lg text-xs text-[#000000] border-2 border-[#D8D6F8] shadow-sm font-bold focus:outline-none"
                            value={editedDeal.totalAmount}
                            onWheel={(e) => e.target.blur()}
                            onChange={(e) => setEditedDeal({ ...editedDeal, totalAmount: e.target.value })}
                          />
                        </div>
                      ) : (
                        <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] font-bold">Rs {selectedProject.totalAmount}</div>
                      )}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 mt-4">
                    <h4 className="text-[16px] font-medium text-[#000000] mb-4">Total Timeline</h4>
                    <div className="flex flex-col lg:flex-row gap-3 mb-4">
                      <div className="lg:w-[150px] w-full px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Total Timeline</div>
                      {isEditing ? (
                        userRole?.toLowerCase().trim() === "service_professional" ? (
                          <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center font-bold">
                            {editedDeal.totalTimeline || "N/A"}
                          </div>
                        ) : (
                          <input 
                            type="text"
                            className="flex-1 px-4 py-2 bg-white rounded-lg text-xs text-[#000000] border-2 border-[#D8D6F8] shadow-sm font-bold focus:outline-none"
                            value={editedDeal.totalTimeline}
                            onChange={(e) => setEditedDeal({ ...editedDeal, totalTimeline: e.target.value })}
                            placeholder="e.g. 90 Days"
                          />
                        )
                      ) : (
                        <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] font-bold">{selectedProject.totalTimeline || "N/A"}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Milestones list */}
                <SectionCard title="Milestone" showPlus={isEditing}>
                  <div className="space-y-3 mt-4">
                    {(isEditing ? editedDeal.milestones : selectedProject.milestones)?.map((m, idx) => (
                      <div key={m._id || m.id || idx} className="bg-[#F8F8F8] rounded-xl p-2 lg:p-4 relative">
                        <div className="absolute top-2 right-2 lg:top-4 lg:right-4 flex flex-col items-end gap-2">
                          <span className="bg-[#EAB308] text-white text-[8px] lg:text-[10px] px-2 py-0.5 rounded-md lg:font-medium">{m.status}</span>
                          {!isEditing && (
                            <button 
                              onClick={() => handleViewMilestone(m)}
                              className="px-3 lg:px-4 py-1 bg-white border border-gray-200 rounded-lg text-[8px] lg:text-[10px] font-bold text-[#59549F] shadow-sm hover:bg-gray-50"
                            >
                              View Details
                            </button>
                          )}
                        </div>
                        
                        <div className={`flex gap-3 ${!isEditing ? 'pr-28' : ''}`}>
                          <div className="w-4 h-4 rounded-full bg-[#D8D6F8] mt-1 shrink-0" />
                          <div className="flex-1">
                             {isEditing ? (
                               <div className="space-y-2">
                                 <input 
                                   type="text"
                                   className="w-full p-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#59549F]"
                                   value={m.title}
                                   onChange={(e) => {
                                     const newMilestones = editedDeal.milestones.map((milestone, i) => 
                                       i === idx ? { ...milestone, title: e.target.value } : milestone
                                     );
                                     setEditedDeal({ ...editedDeal, milestones: newMilestones });
                                   }}
                                   placeholder="Milestone Title"
                                 />
                                 <div className="flex gap-2 items-center">
                                   <span className="text-[10px] text-gray-400">Budget: Rs</span>
                                   <input 
                                     type="number"
                                     className="flex-1 p-2 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#59549F]"
                                     value={m.amount}
                                     onWheel={(e) => e.target.blur()}
                                     onChange={(e) => {
                                       const newMilestones = editedDeal.milestones.map((milestone, i) => 
                                         i === idx ? { ...milestone, amount: e.target.value } : milestone
                                       );
                                       setEditedDeal({ ...editedDeal, milestones: newMilestones });
                                     }}
                                   />
                                 </div>
                                 {userRole?.toLowerCase().trim() !== "service_professional" && (
                                   <div className="flex gap-2 items-center">
                                     <span className="text-[10px] text-gray-400">Timeline:</span>
                                     <input 
                                       type="text"
                                       className="flex-1 p-2 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#59549F]"
                                       value={m.duration}
                                       onChange={(e) => {
                                         const newMilestones = editedDeal.milestones.map((milestone, i) => 
                                           i === idx ? { ...milestone, duration: e.target.value } : milestone
                                         );
                                         setEditedDeal({ ...editedDeal, milestones: newMilestones });
                                       }}
                                       placeholder="e.g. 10 Days"
                                     />
                                   </div>
                                 )}
                               </div>
                             ) : (
                               <>
                                 <h5 className="text-xs text-[#000000] font-medium">{m.title}</h5>
                                 <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-1">{m.description}</p>
                                 <div className="flex justify-between items-center mt-2">
                                   <p className="text-[10px] text-gray-400 font-medium">Budget - Rs {m.amount}</p>
                                   <p className="text-[10px] text-gray-400 font-medium">Timeline - {m.duration || "N/A"}</p>
                                 </div>
                               </>
                             )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>

              {/* Static Action Buttons Footer */}
              <div className="pt-1 border-t border-gray-100 bg-white space-y-3 rounded-b-2xl shadow-[0px_-4px_12px_rgba(0,0,0,0.05)]">
                 <div className="flex gap-3">
                    {isEditing ? (
                      <>
                        <button 
                          onClick={() => {
                            setIsEditing(false);
                            setEditedDeal(null);
                          }}
                          className="flex-1 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-500 font-bold text-sm shadow-sm hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleUpdateDeal({ ...editedDeal, isCounter: true })}
                          className="flex-1 py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90 flex items-center justify-center gap-2"
                        >
                          <IoMdCheckmark /> Submit Counter
                        </button>
                      </>
                    ) : (
                      <>
                        {hasBothAgreed && (
                          <div className="flex flex-col w-full gap-3">
                            <button 
                              disabled
                              className="w-full py-2 bg-gray-100 rounded-lg text-gray-400 font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              <IoMdCheckmark /> Approved
                            </button>
                            <button 
                              onClick={() => navigate('/deal/documentation')}
                              className="w-full py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                              <IoMdCheckmark /> Proceed for Documentation
                            </button>
                          </div>
                        )}

                        {!hasBothAgreed && hasUserAgreed && (
                          <div className="flex flex-col w-full gap-3">
                            <button 
                              disabled
                              className="w-full py-2 bg-gray-50 rounded-lg text-gray-400 font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              <IoMdCheckmark /> Approved
                            </button>
                            <button 
                              disabled
                              className="w-full py-2 bg-gray-100 rounded-lg text-gray-400 font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2 opacity-50"
                            >
                              <IoMdCheckmark /> Awaiting Response
                            </button>
                          </div>
                        )}

                        {!hasBothAgreed && !hasUserAgreed && (
                          <div className="flex flex-col w-full gap-3">
                            {isStartup && selectedProject?.documentation?.professionalAgreed && (
                              <div className="text-[10px] lg:text-xs font-semibold text-[#59549F] bg-[#D8D6F8]/30 py-1.5 px-3 rounded-lg flex items-center gap-2 animate-pulse">
                                <IoMdCheckmark /> Professional has approved this deal
                              </div>
                            )}
                            {!isStartup && selectedProject?.documentation?.startupAgreed && (
                              <div className="text-[10px] lg:text-xs font-semibold text-[#59549F] bg-[#D8D6F8]/30 py-1.5 px-3 rounded-lg flex items-center gap-2 animate-pulse">
                                <IoMdCheckmark /> Startup has approved this deal
                              </div>
                            )}
                            <div className="flex gap-3 w-full">
                              <button 
                                onClick={() => {
                                  const approvalPayload = isStartup 
                                    ? { startupAgreed: true } 
                                    : { professionalAgreed: true };
                                  handleUpdateDeal(approvalPayload);
                                }}
                                className="flex-1 py-2 rounded-lg font-semibold text-sm bg-[#D8D6F8] text-[#59549F] hover:opacity-90 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 transition-all"
                              >
                                <IoMdCheckmark /> Approve
                              </button>
                              {!isEditing && (
                                <button 
                                  onClick={() => {
                                    setIsEditing(true);
                                    setEditedDeal({ ...selectedProject });
                                  }}
                                  className="flex-1 py-2 bg-white border-2 border-gray-100 rounded-lg text-[#000000] font-semibold text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                  <FiEdit3 /> Counter
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

          {rightPanelState === 'scopeDetails' && (
            <div className="flex-1 flex flex-col">
              {!isEditing && (
                <div className="hidden lg:flex items-center mb-4">
                  <button onClick={handleBack} className="p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm">
                    <FiArrowLeft size={18} />
                  </button>
                </div>
              )}
              
              <div className="space-y-2 lg:p-3 px-3 py-3 -m-3 flex-1">
                {tempScopeItems.map((item, index) => (
                  <div key={index} className="relative group">
                    <input 
                      type="text" 
                      value={item} 
                      onChange={(e) => handleScopeItemChange(index, e.target.value)}
                      readOnly={!isEditing}
                      placeholder="Define scope item..."
                      className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-xs focus:border-[#59549F] outline-none transition-all pr-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                    />
                    {isEditing && (
                      <button 
                        onClick={() => handleRemoveScopeItem(index)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-light text-gray-400 hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Add more..." 
                      value={newScopeInput}
                      onChange={(e) => setNewScopeInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddScopeItem()}
                      className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-xs focus:border-[#59549F] outline-none transition-all pr-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                    />
                    <button 
                      onClick={handleAddScopeItem}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-light text-gray-400 hover:text-[#59549F] transition-colors"
                    >
                      +
                    </button>
                  </div>
                )}

                <div className="mt-8">
                  <h4 className="text-lg font-medium text-[#000000] mb-4">Description</h4>
                  <textarea 
                    placeholder="Add the Description"
                    value={isEditing ? editedDeal.scopeDescription : selectedProject.scopeDescription}
                    onChange={(e) => isEditing && setEditedDeal({ ...editedDeal, scopeDescription: e.target.value })}
                    readOnly={!isEditing}
                    className="w-full min-h-[220px] p-6 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-xs text-gray-500 leading-relaxed resize-none placeholder:italic shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] outline-none focus:border-[#59549F]"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 mt-8">
                  <button 
                    onClick={handleSaveScope}
                    className="flex-1 py-2 bg-[#D8D6F8] text-[#59549F] font-semibold rounded-xl hover:opacity-90 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={handleBack}
                    className="flex-1 py-2 bg-white border-2 border-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
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
                  <input 
                    type="text"
                    defaultValue={selectedMilestone.title}
                    placeholder="Milestone Title"
                    className="text-lg font-medium text-[#000000] bg-transparent outline-none focus:border-b border-[#59549F]/20"
                  />
                </div>
                <div className="bg-[#B91C1C] text-white text-[7px] lg:text-[10px] px-2 py-1.5 rounded-full ">
                  {selectedMilestone.duration ? `Duration - ${selectedMilestone.duration}` : "Add Duration"}
                </div>
              </div>
              
              <div className="space-y-6 flex-1">
                <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                   <h4 className="text-sm font-medium text-[#000000] mb-4">Milestone Budget - {selectedMilestone.title || "Milestone"}</h4>
                   <div className="flex flex-col lg:flex-row gap-3 mb-2">
                     <div className="lg:w-[150px] w-full px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR - Indian Rupees</div>
                     <input 
                       type="text" 
                       readOnly
                       value={`Rs ${selectedMilestone.amount || 0}`}
                       className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center font-bold" 
                     />
                   </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                   <h4 className="text-sm font-medium text-[#000000] mb-4">Milestone Timeline - {selectedMilestone.title || "Milestone"}</h4>
                   <div className="flex flex-col lg:flex-row gap-3 mb-2">
                     <div className="lg:w-[150px] w-full px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Total Days</div>
                     <input 
                       type="text" 
                       placeholder="Enter Days"
                       defaultValue={selectedMilestone.duration}
                       className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center lg:text-start " 
                     />
                   </div>
                </div>

                <div className="pt-2">
                   <h4 className="text-base font-medium text-[#000000] mb-4 ">Scope of work in {selectedMilestone.title || "milestone"}</h4>
                   <textarea 
                     placeholder="Add the Description"
                     defaultValue={selectedMilestone.description}
                     className="w-full min-h-[180px] p-6 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-sm text-gray-500 leading-relaxed resize-none placeholder:italic shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] outline-none focus:border-[#59549F]"
                   />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 mt-8 ">
                  <button 
                    onClick={handleBack}
                    className="flex-1 py-1 bg-[#D8D6F8] text-[#59549F] font-semibold rounded-lg hover:opacity-90 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleBack}
                    className="flex-1 py-1 bg-white border-2 border-gray-100 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// ── Sub-Components ──

const ProposalCard = ({ proj, selectedProject, handleViewProject }) => {
  const userStr = localStorage.getItem("user");
  const userData = userStr ? JSON.parse(userStr) : null;
  const currentUserId = userData?._id || userData?.id;

  // Determine which party to show (the "other" party)
  const isStartup = String(proj.startupId?._id || proj.startupId) === String(currentUserId);
  const displayUser = isStartup ? proj.professionalId : proj.startupId;

  const party = typeof displayUser === 'object' ? displayUser : {};
  const companyName = party.businessDetails?.companyName || "N/A";
  const firstName = party.businessDetails?.firstName || "";
  const lastName = party.businessDetails?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const userName = fullName || "N/A";

  return (
    <div className={`bg-white rounded-2xl px-4 lg:px-6 py-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all shrink-0 ${selectedProject?._id === proj._id ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
      <div className="grid grid-cols-3 gap-2 lg:gap-2 mb-4 items-start">
        {/* Row 1, Col 1: Real Company Name */}
        <div className="flex flex-col">
          <h3 className="lg:text-xl lg:text-[16px] font-medium text-[#000000] leading-tight">
            {companyName}
          </h3>
        </div>
        {/* Row 1, Col 2: Timeline Label */}
        <div className="flex flex-col lg:items-center">
          <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Timeline</p>
        </div>
        {/* Row 1, Col 3: Price Label */}
        <div className="flex flex-col lg:items-end">
          <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Price</p>
        </div>

        {/* Row 2, Col 1: Project Title */}
        <div className="flex flex-col -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000] decoration-[#59549F] w-fit">
            {proj.requestId?.service || "Project Deal"}
          </p>
        </div>
        {/* Row 2, Col 2: Timeline Value */}
        <div className="flex flex-col lg:items-center -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000]">
            {proj.totalTimeline || "N/A"}
          </p>
        </div>
        {/* Row 2, Col 3: Price Value */}
        <div className="flex flex-col lg:items-end -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000]">Rs {proj.totalAmount || 0}</p>
        </div>

        {/* Row 3, Col 1: Real User Name */}
        <div className="col-span-3 mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000] font-medium opacity-70">
            {userName}
          </p>
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
};

const SectionCard = ({ title, children, showPlus = false, onPlusClick, showDot = false }) => (
  <div className="bg-white rounded-2xl p-4 lg:p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 relative">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        {showDot && <div className="w-2 h-2 rounded-full bg-[#3CC033]" />}
        <h3 className="text-base font-semibold text-[#000000] tracking-wider">{title}</h3>
      </div>
      {showPlus && (
        <div 
          onClick={onPlusClick}
          className="text-[#59549F] transition-transform cursor-pointer"
        >
          <FiPlus size={24} className="border-2 border-[#59549F] rounded-full p-0.5" />
        </div>
      )}
    </div>
    {children}
  </div>
);

export default Bottom;
