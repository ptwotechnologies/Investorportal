import React, { useState, useEffect } from "react";
import { FiPlus, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { toast } from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "@/App";
import { useNavigate } from "react-router-dom";
import { invalidateSidebarCache } from "../../ProfileSec1.jsx/Sidebar";

// ── UI Components (Defined outside to prevent losing focus on re-renders) ──

const Card = ({ title, children, className = "" }) => (
  <div className={` bg-white rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] ${className}`}>
    <div className="flex items-center justify-between mb-1">
      <h3 className="text-lg font-medium text-[#000000]">{title}</h3>
    </div>
    {children}
  </div>
);

const MilestoneItem = ({ milestone, onEdit }) => (
  <div className="bg-[#F1F1F1] rounded-xl lg:p-4 p-2 mb-4 last:mb-0 border border-transparent hover:border-[#D8D6F8] transition-all group">
    <div className="flex items-start justify-between">
      <div className="flex lg:gap-4 gap-2">
        <div className="lg:w-4 lg:h-4 w-2 h-2 rounded-full bg-[#D8D6F8] mt-1.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="text-[#000000] text-xs lg:text-sm font-semibold truncate">{milestone.name}</h4>
          <p className="lg:text-xs text-[10px] text-[#000000] mt-1 line-clamp-1">{milestone.description}</p>
          <p className="lg:text-xs text-[10px] text-[#999999] mt-2 text-[10px]">Due Date - {milestone.dueDate}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3">
        <span className="bg-[#EAB308] text-white lg:text-[9px] text-[6px] w-[70px] lg:w-auto px-2 py-0.5 rounded-md font-medium">
          {milestone.status}
        </span>
        <button 
          onClick={() => onEdit(milestone)}
          className="lg:px-6 px-2 py-1 bg-white border border-gray-200 lg:rounded-md rounded-sm lg:text-xs text-[8px] font-semibold text-[#59549F] hover:bg-gray-50 transition-all shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
);

const BottomSec = ({ activeView, setActiveView, selectedMilestone, setSelectedMilestone, requestId, professionalId }) => {
  const navigate = useNavigate();
  
  // ── State for Data ──
  const [scopeItems, setScopeItems] = useState([]);
  const [description, setDescription] = useState("");
  
  const [totalBudget, setTotalBudget] = useState("");
  const [totalTimeline, setTotalTimeline] = useState("");

  const [milestones, setMilestones] = useState([]);

  // ── Temp State for Editors ──
  const [tempMilestone, setTempMilestone] = useState(null);
  const [newScopeInput, setNewScopeInput] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [tempScopeItems, setTempScopeItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Selection State (for when requestId is missing) ──
  const [selectionRequestId, setSelectionRequestId] = useState(requestId || null);
  const [selectionProfessionalId, setSelectionProfessionalId] = useState(professionalId || null);
  const [eligibleRequests, setEligibleRequests] = useState([]);
  const [isFetchingRequests, setIsFetchingRequests] = useState(!requestId);
  const [currentUser, setCurrentUser] = useState(null);

  // Sync temp state when activeView changes
  useEffect(() => {
    if (activeView === 'editMilestone' && selectedMilestone) {
      setTempMilestone({ ...selectedMilestone });
    } else if (activeView === 'addMilestone') {
      setTempMilestone({
        id: Date.now(),
        name: "",
        description: "",
        dueDate: "",
        status: "Draft",
        duration: "0 Days",
        budget: "",
      });
    } else if (activeView === 'scope') {
      setTempScopeItems([...scopeItems]);
      setTempDescription(description);
    }
  }, [activeView, selectedMilestone]);

  // Fetch eligible requests if requestId is missing
  useEffect(() => {
    const fetchEligibleRequests = async () => {
      if (requestId) return;
      
      setIsFetchingRequests(true);
      try {
        const token = localStorage.getItem("token");
        const [userRes, raisedRes, receivedRes] = await Promise.all([
          axios.get(`${serverUrl}/user/me`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${serverUrl}/requests`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${serverUrl}/requests/received`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setCurrentUser(userRes.data);

        // Find requests raised by me with accepted professionals
        const eligible = raisedRes.data.filter(r => r.acceptedProvider);

        setEligibleRequests(eligible);
        
        // If only one eligible request, auto-select it
        if (eligible.length === 1) {
          const req = eligible[0];
          setSelectionRequestId(req._id);
          setSelectionProfessionalId(req.acceptedProvider?._id || req.acceptedProvider || req.userId?._id || req.userId);
        }
      } catch (err) {
        console.error("Error fetching eligible requests:", err);
        toast.error("Failed to fetch eligible requests");
      } finally {
        setIsFetchingRequests(false);
      }
    };

    fetchEligibleRequests();
  }, [requestId]);

  // ── Handlers ──
  const handleEditMilestone = (m) => {
    setSelectedMilestone(m);
    setActiveView('editMilestone');
  };

  const handleAddMilestoneView = () => {
    setSelectedMilestone(null);
    setActiveView('addMilestone');
  };

  const handleSaveMilestone = (silent = false) => {
    if (!tempMilestone.name) {
      if (!silent) toast.error("Milestone name is required");
      return null;
    }
    
    let updatedMilestones;
    if (activeView === 'addMilestone') {
      updatedMilestones = [...milestones, tempMilestone];
    } else {
      updatedMilestones = milestones.map(m => m.id === tempMilestone.id ? tempMilestone : m);
    }
    
    setMilestones(updatedMilestones);
    setActiveView('none');
    if (!silent) toast.success("Milestone saved successfully");
    return updatedMilestones;
  };

  const handleRemoveMilestone = (id) => {
    setMilestones(milestones.filter(m => m.id !== id));
    setActiveView('none');
    toast.success("Milestone removed");
  };

  const handleSaveScope = (silent = false) => {
    let finalItems = [...tempScopeItems];
    if (newScopeInput.trim()) {
      finalItems.push(newScopeInput.trim());
      setNewScopeInput("");
    }
    setScopeItems(finalItems);
    setDescription(tempDescription);
    setActiveView('none');
    if (!silent) toast.success("Scope saved successfully");
    return { items: finalItems, description: tempDescription };
  };

  const handleAddTempScope = () => {
    if (newScopeInput.trim()) {
      setTempScopeItems([...tempScopeItems, newScopeInput.trim()]);
      setNewScopeInput("");
    }
  };

  const handleRemoveScopeItem = (index) => {
    const updated = tempScopeItems.filter((_, i) => i !== index);
    setTempScopeItems(updated);
  };

  const handleScopeItemChange = (index, value) => {
    const updated = [...tempScopeItems];
    updated[index] = value;
    setTempScopeItems(updated);
  };

  const handleSubmitDraft = async () => {
    let currentScopeItems = scopeItems;
    let currentDescription = description;
    let currentMilestones = milestones;

    // Auto-save if in an editor and get latest values
    if (activeView === 'scope') {
      const saved = handleSaveScope(true);
      currentScopeItems = saved.items;
      currentDescription = saved.description;
    } else if (activeView === 'addMilestone' || activeView === 'editMilestone') {
      const saved = handleSaveMilestone(true);
      if (!saved) return; // Validation failed
      currentMilestones = saved;
    }

    if (!selectionRequestId || !selectionProfessionalId) {
      toast.error("Please select a request first");
      return;
    }

    if (currentScopeItems.length === 0) {
      return toast.error("Please add at least one item to the Scope of Work");
    }

    if (currentMilestones.length === 0) {
      toast.error("Please add at least one milestone");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const dealData = {
        requestId: selectionRequestId,
        professionalId: selectionProfessionalId,
        scopeDescription: currentDescription,
        scopeItems: currentScopeItems,
        totalAmount: totalBudget || currentMilestones.reduce((sum, m) => sum + Number(m.budget || 0), 0),
        totalTimeline: totalTimeline,
        milestones: currentMilestones.map(m => ({
          title: m.name,
          description: m.description,
          amount: Number(m.budget),
          duration: m.duration,
          status: "Pending"
        })),
        status: "Draft"
      };

      await axios.post(`${serverUrl}/api/deals/create-draft`, dealData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      invalidateSidebarCache();
      toast.success("Deal Draft submitted successfully!");
      navigate("/deal/activedeals");
    } catch (err) {
      console.error("Error submitting draft:", err);
      toast.error(err.response?.data?.message || "Failed to submit draft");
    } finally {
      setLoading(false);
    }
  };

  if (!requestId && !selectionRequestId) {
    return (
      <div className="flex-1 p-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-[0px_0px_24px_rgba(0,0,0,0.1)] border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#001032]">Select a Request</h2>
            <p className="text-gray-500 mt-2">Which project would you like to create a deal for?</p>
          </div>

          {isFetchingRequests ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59549F]"></div>
            </div>
          ) : eligibleRequests.length > 0 ? (
            <div className="grid gap-4">
              {eligibleRequests.map((req) => {
                const partner = req.acceptedProvider?._id || req.acceptedProvider;
                const partnerName = req.acceptedProvider?.name || "Professional";
                return (
                  <div 
                    key={req._id}
                    onClick={() => {
                      setSelectionRequestId(req._id);
                      setSelectionProfessionalId(partner);
                    }}
                    className="flex items-center justify-between p-5 rounded-2xl border-2 border-gray-50 hover:border-[#D8D6F8] hover:bg-[#FDFDFF] cursor-pointer transition-all group"
                  >
                    <div>
                      <h4 className="font-bold text-[#001032] group-hover:text-[#59549F]">{req.service}</h4>
                      <p className="text-xs text-gray-400 mt-1">Working with: {partnerName}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#59549F] group-hover:bg-[#D8D6F8] transition-all">
                      →
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-red-400 text-2xl" />
              </div>
              <h4 className="text-lg font-medium text-gray-700">No Eligible Requests</h4>
              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                You need to have an accepted professional on a request before you can create a deal draft.
              </p>
              <button 
                onClick={() => navigate("/profile/request")}
                className="mt-6 px-8 py-2.5 bg-[#59549F] text-white rounded-full font-bold hover:bg-[#48438a] transition-all"
              >
                Go to Requests
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-2 lg:px-4 py-4 bg-[#FDFDFF]">
      
      {/* ── LEFT COLUMN (Project Overview) ── */}
      <div className={`flex-1 space-y-4 max-h-[610px] overflow-y-auto p-2 scrollbar-hide mb-4 ${activeView !== 'none' ? 'hidden lg:block' : 'block'}`}>
        
        {/* Scope of Work summary */}
        <Card title="Scope of Work">
          <ul className="flex flex-col gap-3 mb-2">
            {[
              ...(activeView === 'scope' ? tempScopeItems : scopeItems),
              ...(activeView === 'scope' && newScopeInput.trim() ? [newScopeInput.trim()] : [])
            ].map((item, i) => {
              if (i >= 2) return null;
              return (
                <li key={i} className="text-[#000000] text-sm flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#59549F] shrink-0 mt-1.5" />
                  <span className="break-words leading-tight">{item}</span>
                </li>
              );
            })}
            {(activeView === 'scope' ? [...tempScopeItems, newScopeInput.trim()].filter(Boolean) : scopeItems).length === 0 && (
              <li className="text-gray-400 text-sm italic">No scope items added</li>
            )}
            {(activeView === 'scope' ? [...tempScopeItems, newScopeInput.trim()].filter(Boolean) : scopeItems).length > 2 && (
              <li className="text-gray-400 text-[10px] italic pl-4">+ {(activeView === 'scope' ? [...tempScopeItems, newScopeInput.trim()].filter(Boolean) : scopeItems).length - 2} more items</li>
            )}
          </ul>
          <button 
            onClick={() => setActiveView('scope')}
            className="w-full mt-7 py-2 bg-[#D8D6F8] rounded-xl text-[#000000] font-medium text-sm hover:opacity-90 transition-all shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
          >
            Add Details
          </button>
        </Card>

        {/* Total Budget card */}
        <Card title="Total Budget">
          <div className="flex flex-wrap gap-3 mt-4 mb-2">
            <div className="lg:w-[150px] w-full px-4 py-1.5 bg-[#F8F8F8] rounded-lg text-xs text-[#666666] border border-gray-100 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center">
              INR - Indian Rupees
            </div>
            <input 
              type="number" 
              placeholder="Total Budget"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs flex-1 outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center font-bold"
            />
          </div>
        </Card>

        {/* Total Timeline card */}
        <Card title="Total Timeline">
          <div className="flex flex-wrap gap-3 mt-4 mb-2">
            <div className="lg:w-[150px] w-full px-4 py-1.5 bg-[#F8F8F8] rounded-lg text-xs text-[#666666] border border-gray-100 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center">
              Total Days
            </div>
            <input 
              type="text" 
              placeholder="Total Days"
              value={totalTimeline}
              onChange={(e) => setTotalTimeline(e.target.value)}
              className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs flex-1 outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center font-bold"
            />
          </div>
        </Card>

        {/* Milestones Card */}
        <Card title="Milestone" className="relative min-h-[190px]"> 
          <button 
            onClick={handleAddMilestoneView}
            className="absolute top-3 right-6 text-[#59549F] hover:scale-110 transition-transform"
          >
            <FiPlus size={24} className="border-2 border-[#59549F] rounded-full p-0.5" />
          </button>
          <div className="mt-4 pr-2"> 
            {milestones.length > 0 ? (
              milestones.map(m => <MilestoneItem key={m.id} milestone={m} onEdit={handleEditMilestone} />)
            ) : (
              <p className="text-center text-gray-400 py-10 text-sm italic">No milestones added yet</p>
            )}
          </div>
        </Card>
      </div>

      {/* ── RIGHT COLUMN (Editor View) ── */}
      <div className={`lg:w-[450px] xl:w-[550px] flex flex-col gap-4 ${activeView === 'none' ? 'hidden lg:block' : 'block'}`}>
        
        {/* Editor Wrapper */}
        <div className={`bg-white  rounded-2xl lg:px-6 px-3 pt-4 mt-2 pb-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col relative transition-all duration-300 ${activeView === 'none' ? 'h-[610px]' : 'h-[550px]'} overflow-y-auto scrollbar-hide`}>
          
          {/* Mobile Back Header */}
          <div className="lg:hidden flex items-center gap-3 mb-3">
            <button onClick={() => setActiveView('none')} className="p-1 bg-gray-50 rounded-full text-[#59549F]">
              <FiArrowLeft size={20} />
            </button>
            <span className="font-bold text-lg">Back to List</span>
          </div>

          {activeView === 'none' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-[#D8D6F8]">
                <IoMdCheckmark size={40} />
              </div>
              <h3 className="text-lg font-bold text-gray-400">No Details Selected</h3>
              <p className="text-sm text-gray-400 mt-1 italic">Click "Add Details" on any section to start editing your draft.</p>
            </div>
          )}

          {activeView === 'scope' && (
            <div className="flex-1 flex flex-col h-full">
               <h3 className="text-lg font-semibold text-[#001032] mb-4">Edit Scope of Work</h3>
               
               <div className="space-y-3 mb-6">
                  
                  <div className="space-y-2">
                    {tempScopeItems.map((item, index) => (
                      <div key={index} className="relative flex items-center gap-2">
                        <input 
                          type="text" 
                          value={item} 
                          onChange={(e) => {
                            const updated = [...tempScopeItems];
                            updated[index] = e.target.value;
                            setTempScopeItems(updated);
                          }}
                          className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-xs focus:border-[#59549F] outline-none transition-all pr-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                        />
                        <button 
                          onClick={() => handleRemoveScopeItem(index)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-light text-gray-400 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="relative mt-2">
                    <input 
                      type="text" 
                      placeholder="Add more..." 
                      value={newScopeInput}
                      onChange={(e) => setNewScopeInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTempScope()}
                      className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-xs focus:border-[#59549F] outline-none transition-all pr-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                    />
                    <button 
                      onClick={handleAddTempScope}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-light text-gray-400 hover:text-[#59549F] transition-colors"
                    >
                      +
                    </button>
                  </div>
               </div>

               <div className="flex-1 flex flex-col mt-4">
                  <h4 className="text-lg font-medium text-[#000000] mb-2 px-1">Description</h4>
                  <textarea 
                    value={tempDescription}
                    onChange={(e) => setTempDescription(e.target.value)}
                    placeholder="Add the Description"
                    className="flex-1 w-full min-h-[150px] lg:p-6 p-3 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-sm focus:border-[#59549F] outline-none resize-none placeholder:italic shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                  />
               </div>

               <div className="flex gap-4 mt-6">
                  <button 
                    onClick={handleSaveScope}
                    className="flex-1 py-1 bg-[#D8D6F8] text-[#59549F] font-semibold rounded-lg hover:opacity-90 shadow-[inset_0px_0_12px_#00000040]"
                  >
                    Save Changes
                  </button>
                  <button onClick={() => setActiveView('none')} className="flex-1 py-1 bg-white border border-[#000000]/20 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 shadow-[inset_0px_0_12px_#00000040]">Cancel</button>
               </div>
            </div>
          )}

          {(activeView === 'editMilestone' || activeView === 'addMilestone') && tempMilestone && (
            <div className="flex-1 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="lg:text-lg text-sm font-medium text-[#1A1A1A]">{tempMilestone.name || "New Milestone"}</h3>
                   {activeView === 'editMilestone' && (
                     <button onClick={() => handleRemoveMilestone(tempMilestone.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                       <FiTrash2 size={20} />
                     </button>
                   )}
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto scrollbar-hide p-2">
                   {/* Name */}
                   <div>
                     <label className="text-xs font-bold text-gray-500  block mb-2">Milestone Name</label>
                     <input 
                       type="text"
                       value={tempMilestone.name}
                       onChange={(e) => setTempMilestone({...tempMilestone, name: e.target.value})}
                       className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#59549F] outline-none"
                       placeholder="e.g. Design Completion"
                     />
                   </div>

                   {/* Milestone Budget */}
                   <div className=" bg-white border border-gray-100 rounded-2xl px-3 lg:px-6 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                      <h4 className="text-sm font-medium text-[#000000] mb-4">Budget - {tempMilestone.name || "Milestone"}</h4>
                      <div className="flex gap-3 mb-2">
                        <div className="w-[150px] px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR - Indian Rupees</div>
                        <input 
                          type="number" 
                          placeholder="Total Budget"
                          value={tempMilestone.budget}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => setTempMilestone({...tempMilestone, budget: e.target.value})}
                          className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                        />
                      </div>
                   </div>

                   {/* Milestone Timeline */}
                   <div className="  bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                      <h4 className="text-sm font-medium text-[#000000] mb-4">Timeline - {tempMilestone.name || "Milestone"}</h4>
                      <div className="flex gap-3 mb-2 ">
                        <div className="w-[150px] px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Total Days</div>
                        <input 
                          type="text" 
                          placeholder="Total Days" 
                          value={tempMilestone.duration}
                          onChange={(e) => setTempMilestone({...tempMilestone, duration: e.target.value})}
                          className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                        />
                      </div>
                   </div>

                   {/* Milestone Scope */}
                   <div className=" ">
                      <h4 className="text-sm font-medium text-[#000000] mb-3">Scope of work in {tempMilestone.name || "milestone"}</h4>
                      <textarea 
                        placeholder="Add Description"
                        value={tempMilestone.description}
                        onChange={(e) => setTempMilestone({...tempMilestone, description: e.target.value})}
                        className="w-full lg:h-37 h-30 lg:p-6 p-3 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-sm focus:border-[#59549F] outline-none resize-none placeholder:italic shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                      />
                   </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button onClick={handleSaveMilestone} className="flex-1 lg:py-1 py-1 bg-[#D8D6F8] text-[#59549F] font-semibold rounded-lg hover:opacity-90 shadow-[inset_0px_0_12px_#00000040]">
                    {activeView === 'addMilestone' ? 'Add Milestone' : 'Save Changes'}
                  </button>
                  <button onClick={() => setActiveView('none')} className="flex-1 lg:py-1 py-1 bg-white border border-[#59549F]/20 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 shadow-[inset_0px_0_12px_#00000040]">Cancel</button>
               </div>
            </div>
          )}
          
        </div>

        {/* Global Submit Button */}
        <button 
          onClick={handleSubmitDraft}
          disabled={loading}
          className="w-full py-1.5 bg-[#D8D6F8] text-[#59549F] rounded-lg hover:bg-[#D8D6F8]/90 transition-all text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] font-semibold tracking-wider shadow-[inset_0px_0_12px_#00000040] disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Deal Draft"}
        </button>

      </div>
    </div>
  );
};

export default BottomSec;