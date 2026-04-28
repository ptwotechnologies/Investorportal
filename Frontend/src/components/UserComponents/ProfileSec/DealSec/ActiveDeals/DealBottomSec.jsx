import React from "react";
import { FiPlus, FiArrowLeft, FiEdit3, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlinePrivateConnectivity } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";

const DealBottomSec = ({ 
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
  const [userRole, setUserRole] = React.useState(localStorage.getItem("role"));
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState(null);
  const [tempScopeItems, setTempScopeItems] = React.useState([]);
  const [newScopeInput, setNewScopeInput] = React.useState("");

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
      
      const activeDeals = res.data;
      setDeals(activeDeals);

      // Sync selected project with fresh data if it's currently viewed
      if (selectedProject) {
        const updated = activeDeals.find(d => d._id === selectedProject._id);
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

  // ── Handlers ──
  const handleViewProject = (proj) => {
    setSelectedProject(proj);
    setRightPanelState('overview');
  };

  const handleViewScope = () => {
    setTempScopeItems(selectedProject.scopeItems || []);
    setRightPanelState('scopeDetails');
  };

  const handleSaveScope = () => {
    if (isEditing) {
      setEditedDeal({ ...editedDeal, scopeItems: tempScopeItems });
      toast.success("Scope updated locally");
    }
    setRightPanelState('overview');
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

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-4  lg:py-4 bg-[#FDFDFF]">
      
      {/* ── LEFT COLUMN (Project List) ── */}
      <div className={`flex-1 space-y-4 max-h-[610px] overflow-y-auto scrollbar-hide p-2 ${rightPanelState !== 'none' ? 'hidden lg:block' : 'block'}`}>
        
        {/* Summary Cards Grid */} 
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#D8E1F0] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Active Deals</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">{deals.length}</p>
          </div>
          <div className="bg-[#D8D6F8] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Total Ongoing Value</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">₹{deals.reduce((acc, d) => acc + (d.totalAmount || 0), 0).toLocaleString()}</p>
          </div>
          <div className="bg-[#EFDBD9] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Pending Payments</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">0</p>
          </div>
          <div className="bg-[#D7EBE4] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Due this week</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">0</p>
          </div>
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-2 mb-4 px-1">Deal Drafts</h2>
        {loading ? (
           <div className="text-center py-10">Loading deals...</div>
        ) : deals.length === 0 ? (
           <div className="text-center py-10 text-gray-400 italic">No deal drafts found</div>
        ) : (
          deals.map(proj => (
            <ProjectCard 
              key={proj._id} 
              proj={proj} 
              selectedProject={selectedProject}
              handleViewProject={handleViewProject}
            />
          ))
        )}
      </div>

      {/* ── RIGHT COLUMN (Dynamic Panel) ── */}
      <div className={`lg:w-[450px] xl:w-[550px] mt-5 lg:mt-auto flex flex-col ${rightPanelState === 'none' ? 'hidden lg:block' : 'block'}`}>
        
        <div className={`transition-all duration-300 h-[610px] flex flex-col relative overflow-hidden
          ${(rightPanelState === 'scopeDetails' || rightPanelState === 'milestoneDetails' || rightPanelState === 'none') 
            ? 'bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 m-2 rounded-2xl' 
            : 'bg-transparent'}`}>
          
          <div className="flex-1 overflow-y-auto scrollbar-hide p-2 relative space-y-4">
            {/* Desktop Close Button */}
            {rightPanelState !== 'none' && !isEditing && (
              <button 
                onClick={() => {
                  setRightPanelState('none');
                  setSelectedProject(null);
                }} 
                className="hidden lg:flex absolute top-2 right-2 z-10 p-1.5 bg-gray-50 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-all"
              >
                <FiX size={18} />
              </button>
            )}
            {/* Mobile Back Header */}
            {rightPanelState !== 'none' && (
              <div className="lg:hidden flex items-center gap-3 mb-3">
                <button onClick={handleBack} className="p-1 bg-gray-50 rounded-full text-[#59549F]">
                  <FiArrowLeft size={20} />
                </button>
                <span className="font-bold text-lg">{backLabel}</span>
              </div>
            )}

            {/* NO SELECTION STATE */}
            {rightPanelState === 'none' && (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-50">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-[#D8D6F8]">
                  <IoMdCheckmark size={40} />
                </div>
                <h3 className="text-lg font-bold text-gray-400">No Project Selected</h3>
                <p className="text-sm text-gray-400 mt-1 italic">Select a project from the left to view active deal details.</p>
              </div>
            )}

            {/* OVERVIEW STATE */}
            {rightPanelState === 'overview' && selectedProject && (
              <div className="space-y-4 ">
                {!isEditing && (
                  <SectionCard title="Deal Strength" showDot>
                    <p className="text-xs text-gray-500 mb-4">{selectedProject.strength || "Deal initialized and ready for review."}</p>
                    <ul className="space-y-2">
                      {(selectedProject.strengthPoints || ["Draft submitted", "Awaiting professional review"]).map((pt, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#000000]">
                          <IoMdCheckmark className="text-[#000000]" size={16} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </SectionCard>
                )}

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
                        className="w-full py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90"
                      >
                        View Details
                      </button>
                    </>
                  )}
                </SectionCard>

                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                    <h4 className="text-[16px] font-medium text-[#000000] mb-5 ">Total Budget</h4>
                    <div className="flex flex-wrap gap-3">
                      <div className="lg:w-[150px] w-full px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center">INR - Indian Rupees</div>
                      {isEditing ? (
                         <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Rs</span>
                            <input 
                              type="number"
                              className="w-full pl-8 pr-4 py-2 bg-white rounded-lg text-xs text-[#000000] border-2 border-[#D8D6F8] shadow-sm font-bold focus:outline-none"
                              value={editedDeal.totalAmount}
                              onChange={(e) => setEditedDeal({ ...editedDeal, totalAmount: e.target.value })}
                            />
                         </div>
                      ) : (
                        <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center font-bold">Rs {selectedProject.totalAmount}</div>
                      )}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                    <h4 className="text-[16px] font-medium text-[#000000] mb-3">Total Timeline</h4>
                    <div className="flex flex-wrap gap-3">
                      <div className="lg:w-[150px] w-full px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center">Total Timeline</div>
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
                        <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center font-bold">{selectedProject.totalTimeline || "N/A"}</div>
                      )}
                    </div>
                  </div>
                </div>

                <SectionCard title="Milestone">
                  <div className="space-y-3 mt-2">
                    {(isEditing ? editedDeal.milestones : selectedProject.milestones)?.map((m, idx) => (
                      <div key={m._id || m.id || idx} className="bg-[#F8F8F8] rounded-xl p-4 relative">
                        {!isEditing && (
                          <div className="absolute top-4 right-4 items-end flex flex-col gap-2">
                            <span className="bg-[#EAB308] text-white text-[10px] px-2 py-0.5 rounded-md font-medium">Pending</span>
                            <button 
                              onClick={() => handleViewMilestone(m)}
                              className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-[#59549F] shadow-sm hover:bg-gray-50"
                            >
                              View Details
                            </button>
                          </div>
                        )}
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
                                    const newMilestones = [...editedDeal.milestones];
                                    newMilestones[idx].title = e.target.value;
                                    setEditedDeal({ ...editedDeal, milestones: newMilestones });
                                  }}
                                  placeholder="Milestone Title"
                                />
                                <textarea 
                                  className="w-full p-2 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-[#59549F]"
                                  value={m.description}
                                  onChange={(e) => {
                                    const newMilestones = [...editedDeal.milestones];
                                    newMilestones[idx].description = e.target.value;
                                    setEditedDeal({ ...editedDeal, milestones: newMilestones });
                                  }}
                                  placeholder="Milestone Description"
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
                                        const newMilestones = [...editedDeal.milestones];
                                        newMilestones[idx].duration = e.target.value;
                                        setEditedDeal({ ...editedDeal, milestones: newMilestones });
                                      }}
                                      placeholder="e.g. 10 Days"
                                    />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <>
                                <h5 className="text-xs font-medium text-[#000000]">{m.title}</h5>
                                <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{m.description}</p>
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
                     {tempScopeItems.map((item, index) => (
                       <div key={index} className="relative group">
                         <div className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-xs flex items-center gap-2 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#59549F] shrink-0" />
                           <input 
                             type="text" 
                             value={item} 
                             readOnly={!isEditing}
                             onChange={(e) => handleScopeItemChange(index, e.target.value)}
                             className="flex-1 bg-transparent outline-none break-words leading-tight"
                           />
                           {isEditing && (
                              <button 
                                onClick={() => handleRemoveScopeItem(index)}
                                className="text-xl font-light text-gray-400 hover:text-red-500 transition-colors"
                              >
                                ×
                              </button>
                           )}
                         </div>
                       </div>
                     ))}
                     {isEditing && (
                       <div className="relative group mt-4">
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
                  </div>
                  <div className="mt-8">
                     <h4 className="text-lg font-medium text-[#000000] mb-4">Description</h4>
                     <textarea 
                       value={isEditing ? editedDeal.scopeDescription : selectedProject.scopeDescription}
                       readOnly={!isEditing}
                       onChange={(e) => isEditing && setEditedDeal({ ...editedDeal, scopeDescription: e.target.value })}
                       className="w-full min-h-[220px] p-6 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-xs text-gray-500 leading-relaxed whitespace-pre-line shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] outline-none focus:border-[#59549F]"
                       placeholder="Add the Description"
                     />
                  </div>
                  {isEditing && (
                    <div className="flex gap-4 mt-8">
                       <button 
                         onClick={handleSaveScope}
                         className="flex-1 py-2 bg-[#D8D6F8] text-[#59549F] font-semibold rounded-xl hover:opacity-90 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                       >
                         Save Changes
                       </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {rightPanelState === 'milestoneDetails' && selectedMilestone && (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    {!isEditing && (
                      <button onClick={handleBack} className="hidden lg:flex p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm">
                        <FiArrowLeft size={18} />
                      </button>
                    )}
                    <h3 className="text-lg font-medium text-[#000000]">
                      {selectedMilestone.title || "Milestone Details"}
                    </h3>
                  </div>
                  <div className="bg-[#B91C1C] text-white text-[10px] px-3 py-1.5 rounded-full font-bold">
                    Budget - Rs {selectedMilestone.amount}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                     <h4 className="text-sm font-medium text-[#000000] mb-4">Milestone Budget</h4>
                     <div className="flex gap-3 mb-2">
                       <div className="lg:w-[150px] w-full px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR - Indian Rupees</div>
                       <input 
                         type="text" 
                         readOnly
                         value={`Rs ${selectedMilestone.amount}`}
                         className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center font-bold" 
                       />
                     </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                     <h4 className="text-sm font-medium text-[#000000] mb-4">Milestone Timeline</h4>
                     <div className="flex gap-3 mb-2">
                       <div className="lg:w-[150px] w-full px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Duration</div>
                       <input 
                         type="text" 
                         readOnly
                         value={selectedMilestone.duration || "N/A"}
                         className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center font-bold" 
                       />
                     </div>
                  </div>

                  <div className="pt-2">
                     <h4 className="text-base font-medium text-[#000000] mb-4 ">Scope of work in milestone</h4>
                     <div className="p-6 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-sm text-gray-500 leading-relaxed whitespace-pre-line shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                       {selectedMilestone.description || "No description provided for this milestone."}
                     </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STATIC FOOTER BUTTONS */}
          {selectedProject && (rightPanelState === 'overview' || rightPanelState === 'create') && (
            <div className="p-4 lg:p-2 bg-white border-t border-gray-100 rounded-b-2xl"> 
              <div className="flex gap-4">
                 {isEditing ? (
                   <>
                     <button 
                       onClick={() => {
                         setIsEditing(false);
                         setEditedDeal(null);
                       }}
                       className="flex-1 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-500 font-bold text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                     >
                       Cancel
                     </button>
                     <button 
                       onClick={() => handleUpdateDeal({ ...editedDeal, isCounter: true })}
                       className="flex-1 py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                     >
                       <IoMdCheckmark /> Submit Counter
                     </button>
                   </>
                 ) : (
                   <div className="flex flex-col w-full gap-3">
                      {isStartup && selectedProject?.documentation?.professionalAgreed && !hasUserAgreed && (
                        <div className="text-[10px] lg:text-xs font-semibold text-[#59549F] bg-[#D8D6F8]/30 py-1.5 px-3 rounded-lg flex items-center gap-2 animate-pulse">
                          <IoMdCheckmark /> Professional has approved this deal
                        </div>
                      )}
                      {!isStartup && selectedProject?.documentation?.startupAgreed && !hasUserAgreed && (
                        <div className="text-[10px] lg:text-xs font-semibold text-[#59549F] bg-[#D8D6F8]/30 py-1.5 px-3 rounded-lg flex items-center gap-2 animate-pulse">
                          <IoMdCheckmark /> Startup has approved this deal
                        </div>
                      )}

                      {hasBothAgreed || selectedProject?.status === 'Approved' ? (
                        <div className="flex flex-col gap-3 w-full">
                          <button 
                            disabled
                            className="w-full py-2 bg-gray-50 rounded-xl text-gray-400 font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
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
                      ) : hasUserAgreed ? (
                        <div className="flex flex-col gap-3 w-full">
                          <button 
                            disabled
                            className="w-full py-2 bg-gray-50 rounded-xl text-gray-400 font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            <IoMdCheckmark /> Approved
                          </button>
                          <button 
                            disabled
                            className="w-full py-2 bg-gray-100 rounded-xl text-gray-400 font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2 opacity-50"
                          >
                            <IoMdCheckmark /> Awaiting Response
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-3 w-full">
                          <button 
                            onClick={() => {
                              setIsEditing(true);
                              setEditedDeal({ ...selectedProject });
                            }}
                            className="flex-1 py-2 bg-white border-2 border-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-sm hover:bg-[#59549F] hover:text-white transition-all flex items-center justify-center gap-2"
                          >
                            <FiEdit3 /> Counter
                          </button>
                          <button 
                            onClick={() => {
                              const approvalPayload = isStartup 
                                ? { startupAgreed: true } 
                                : { professionalAgreed: true };
                              handleUpdateDeal(approvalPayload);
                            }}
                            className="flex-1 py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                          >
                            <IoMdCheckmark /> Approve
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

// ── Sub-Components ──

const ProjectCard = ({ proj, selectedProject, handleViewProject }) => {
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
        <div className="flex flex-col">
          <h3 className="lg:text-xl lg:text-[16px] font-medium text-[#000000] leading-tight">
            {companyName}
          </h3>
        </div>
        <div className="flex flex-col lg:items-center">
          <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Timeline</p>
        </div>
        <div className="flex flex-col lg:items-end">
          <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Price</p>
        </div>

        <div className="flex flex-col -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000] decoration-[#59549F]  w-fit  ">
            {proj.requestId?.service || "Project Deal"}
          </p>
        </div>
        <div className="flex flex-col lg:items-center -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000]">
            {proj.totalTimeline || "N/A"}
          </p>
        </div>
        <div className="flex flex-col lg:items-end -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000]">Rs {proj.totalAmount || 0}</p>
        </div>

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

export default DealBottomSec;
