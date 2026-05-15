import { FaPlus } from "react-icons/fa";
import { FiPlus, FiArrowLeft, FiAlertTriangle, FiEdit3, FiX, FiEye, FiZap, FiChevronDown } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlineArrowsRightLeft, HiOutlineUserGroup } from "react-icons/hi2";
import { LuArrowLeftRight, LuClock } from "react-icons/lu";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { invalidateSidebarCache } from "../../ProfileSec1.jsx/Sidebar";
import React from "react";

const Bottom = ({ 
  selectedProject, 
  setSelectedProject, 
  rightPanelState, 
  setRightPanelState, 
  selectedMilestone, 
  setSelectedMilestone,
  preselectedRequest,
  setPreselectedRequest
}) => {
  const [deals, setDeals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedDeal, setEditedDeal] = React.useState(null);
  const [userId, setUserId] = React.useState(null);
  const [userRole, setUserRole] = React.useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  // ── New Proposal Creation State ──
  const [eligibleRequests, setEligibleRequests] = React.useState([]);
  const [isFetchingRequests, setIsFetchingRequests] = React.useState(false);
  const [newDealData, setNewDealData] = React.useState({
    requestId: null,
    professionalId: null,
    scopeDescription: "",
    scopeItems: [],
    milestones: [],
    totalAmount: 0,
    totalTimeline: "",
  });

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
      // Show Negotiating, Approved, Draft, and Active deals
      const negotiatingDeals = res.data.filter(d => 
        ["Negotiating", "Approved", "Draft", "Active"].includes(d.status)
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

  const handleApproveMilestone = async (mId) => {
    try {
      const token = localStorage.getItem("token");
      const updatedMilestones = selectedProject.milestones.map(m => 
        (m._id === mId || m.id === mId) ? { ...m, status: "Approved" } : m
      );
      
      await axios.put(`${serverUrl}/api/deals/${selectedProject._id}`, {
        milestones: updatedMilestones
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Milestone approved");
      fetchDeals(false);
    } catch (error) {
      console.error("Error approving milestone:", error);
      toast.error("Failed to approve milestone");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
      case 'Awaiting Response':
        return <span className="bg-[#FFD324] text-[#000000] text-[8px]  px-3 py-1 rounded-full shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]">Awaiting Response</span>;
      case 'Approved':
        return <span className="bg-[#D7EBE4] text-[#2D6A4F] text-[8px] px-3 py-1 rounded-full shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]">Approved</span>;
      default:
        return <span className="bg-[#D8D6F8] text-[#59549F] text-[8px]  px-3 py-1 rounded-full shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]">{status}</span>;
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
      invalidateSidebarCache();
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

  // Fetch eligible requests when entering 'create' state
  React.useEffect(() => {
    const fetchEligible = async () => {
      if (rightPanelState !== 'create' || eligibleRequests.length > 0) return;
      
      setIsFetchingRequests(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const eligible = res.data.filter(r => r.acceptedProvider);
        setEligibleRequests(eligible);
        
        // Auto-select if only one
        if (eligible.length === 1) {
          const req = eligible[0];
          setNewDealData(prev => ({
            ...prev,
            requestId: req._id,
            professionalId: req.acceptedProvider?._id || req.acceptedProvider
          }));
        }
      } catch (err) {
        console.error("Error fetching eligible requests:", err);
      } finally {
        setIsFetchingRequests(false);
      }
    };
    fetchEligible();
  }, [rightPanelState]);

  // Handle preselected request from TopBar
  React.useEffect(() => {
    if (preselectedRequest) {
      setNewDealData(prev => ({
        ...prev,
        requestId: preselectedRequest._id,
        professionalId: preselectedRequest.acceptedProvider?._id || preselectedRequest.acceptedProvider
      }));
      // setPreselectedRequest(null); // We keep it for the label but clear if needed
    }
  }, [preselectedRequest]);

  const handleCreateProposal = async () => {
    if (!newDealData.requestId) return toast.error("Please select a request");
    if (newDealData.milestones.length === 0) return toast.error("Please add at least one milestone");

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...newDealData,
        status: "Draft"
      };
      await axios.post(`${serverUrl}/api/deals/create-draft`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      invalidateSidebarCache();
      toast.success("Proposal created successfully!");
      setRightPanelState('none');
      setNewDealData({
        requestId: null,
        professionalId: null,
        scopeDescription: "",
        scopeItems: [],
        milestones: [],
        totalAmount: 0,
        totalTimeline: "",
      });
      fetchDeals();
    } catch (err) {
      console.error("Error creating proposal:", err);
      toast.error(err.response?.data?.message || "Failed to create proposal");
    } finally {
      setLoading(false);
    }
  };

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
    if (rightPanelState === 'create') {
      setTempScopeItems(newDealData.scopeItems || []);
    } else if (selectedProject) {
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
      setRightPanelState(prevPanelState || 'overview');
      setPrevPanelState(null);
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
    if (rightPanelState === 'create') {
      setNewDealData({ ...newDealData, scopeItems: tempScopeItems });
      toast.success("Scope updated");
      setRightPanelState('create');
    } else if (isEditing) {
      setEditedDeal({ ...editedDeal, scopeItems: tempScopeItems });
      toast.success("Scope updated locally");
      setRightPanelState('overview');
    } else {
      setRightPanelState('overview');
    }
  };

  const backLabel = (rightPanelState === 'scopeDetails' || rightPanelState === 'milestoneDetails') 
    ? 'Back to Overview' 
    : (rightPanelState === 'create' ? 'Cancel Proposal' : 'Back to List');

  return (
    <div className="flex flex-col lg:flex-row gap-2  lg:px-4 lg:py-2 bg-[#FDFDFF]">
      
      {/* ── LEFT COLUMN ── */}
      <div className={`flex-1 space-y-4 max-h-[630px] xl:max-h-full overflow-y-auto scrollbar-hide p-2 ${rightPanelState !== 'none' ? 'hidden lg:block' : 'block'}`}>
        
        {/* Summary Cards Grid */} 
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#D8E1F0] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] px-2 py-4 lg:p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <HiOutlineArrowsRightLeft size={20} className="text-[#001032]" />
              <h3 className="text-[13px] lg:text-sm lg:font-medium text-[#001032]">Open Proposals</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">{deals.length}</p>
          </div>

          <div className="bg-[#D8D6F8] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] px-2 py-4 lg:p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <HiOutlineUserGroup size={20} className="text-[#001032]" />
              <h3 className="text-[13px] lg:text-sm lg:font-medium text-[#001032]">Awaiting Response</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">
              {deals.filter(d => {
                const uAgreed = isStartup ? d.documentation?.startupAgreed : d.documentation?.professionalAgreed;
                const oAgreed = isStartup ? d.documentation?.professionalAgreed : d.documentation?.startupAgreed;
                return uAgreed && !oAgreed;
              }).length}
            </p>
          </div>

          <div className="bg-[#EFDBD9] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] py-2 px-2 lg:p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <LuArrowLeftRight size={20} className="text-[#001032]" />
              <h3 className="text-[13px] lg:text-sm lg:font-medium text-[#001032]">Counter Offers</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">
              {deals.reduce((acc, d) => acc + (d.negotiation?.history?.length || 0), 0)}
            </p>
          </div>

          <div className="bg-[#D7EBE4] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] py-4 px-2 lg:p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <LuClock size={20} className="text-[#001032]" />
              <h3 className="text-[13px] lg:text-sm lg:font-medium text-[#001032]">Expiring Soon</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">0</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 mb-4 pr-2">
          <h2 className="text-xl font-medium text-[#000000] px-1">Proposals</h2>
        </div>

        {/* Professional Insight Card - Shows after 8 hours of negotiation and only if not approved */}
        {!isStartup && deals.some(d => {
          if (["Approved", "Active"].includes(d.status)) return false;
          const createdDate = new Date(d.createdAt);
          const now = new Date();
          const hoursElapsed = (now - createdDate) / (1000 * 60 * 60);
          return hoursElapsed >= 8;
        }) && (
          <div className="bg-[#FFF9F1] rounded-2xl p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#FFE0B2] space-y-3 mb-4 mx-1">
            <div className="flex items-center gap-3">
              <div className="text-[#1E88E5]">
                <FiEye size={20} />
              </div>
              <p className="text-sm font-medium text-[#455A64]">3 professionals are interested</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[#FBC02D]">
                <FiZap size={20} />
              </div>
              <p className="text-sm font-medium text-[#455A64]">Limited selection slots</p>
            </div>
          </div>
        )}
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading proposals...</div>
        ) : deals.length === 0 ? (
          <div className="flex flex-col items-center gap-4 lg:p-8 p-5 text-center border border-gray-300 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded-md bg-white w-[90%] lg:w-auto  max-w-sm mx-auto my-5 lg:my-10">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No negotiations found</h3>
              <p className="text-sm text-gray-500">Your active negotiations and counter-offers will appear here.</p>
            </div>
          </div>
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

       <div className="hidden lg:block w-px bg-gray-200 self-stretch  my-2" />

      {/* ── RIGHT COLUMN ── */}
      <div className={`lg:w-[450px] xl:w-[550px] mt-5 lg:mt-auto flex flex-col ${rightPanelState === 'none' ? 'hidden lg:block' : 'block'}`}>
        
        <div className={`transition-all duration-300 lg:h-[630px] xl:min-h-[85vh]  h-[540px] flex flex-col relative overflow-hidden lg:px-2 p-1
          ${(rightPanelState !== 'overview' && rightPanelState !== 'none' && rightPanelState !== 'create') 
            ? 'bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 lg:m-2 m-1 lg:p-3 p-2 rounded-2xl' 
            : 'bg-transparent'}`}>
          
          {/* Desktop Close Button */}
          {/* {rightPanelState !== 'none' && !isEditing && (
            <button 
              onClick={() => {
                setRightPanelState('none');
                setSelectedProject(null);
              }} 
              className="hidden lg:flex absolute top-4 right-4 z-10 p-1.5 bg-gray-50 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-all"
            >
              <FiX size={18} />
            </button>
          )} */}
          {/* Mobile Back Header */}
          {rightPanelState !== 'none' && (
            <div className="lg:hidden flex items-center justify-between mb-4 px-1 w-full">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleBack} 
                  className="p-1 bg-gray-50 rounded-full text-[#59549F] shadow-sm"
                >
                  <FiArrowLeft size={20} />
                </button>
                <span className="text-[16px]  text-[#000000]">{backLabel}</span>
              </div>
              
              {rightPanelState === 'milestoneDetails' && selectedMilestone && (
                <div className="bg-[#B91C1C] text-white text-[10px] px-3 py-1 rounded-full font-medium shadow-sm">
                  {selectedMilestone.duration ? `Timeline: ${selectedMilestone.duration}` : "No Timeline"}
                </div>
              )}
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
            <div className="flex-1 flex flex-col h-full overflow-hidden ">
              <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-4">
                {!newDealData.requestId ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50 bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100  rounded-2xl h-full">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FaPlus size={40} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-400">Select a Request</h3>
                    <p className="text-sm text-gray-400 mt-1 italic">Click the "Proposal" button in the Top Bar and select a project to start.</p>
                  </div>
                ) : (
                  <>
                    {/* Creation Editor */}
                    <div className="bg-white rounded-2xl lg:p-6 p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 relative">
                      <h4 className="text-[16px] font-medium text-[#000000] mb-2">Scope of Work</h4>
                      <textarea 
                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs min-h-[100px] focus:outline-none focus:border-[#59549F]"
                        placeholder="Describe the project scope..."
                        value={newDealData.scopeDescription}
                        onChange={(e) => setNewDealData({ ...newDealData, scopeDescription: e.target.value })}
                      />
                      <button 
                        onClick={() => {
                          setTempScopeItems(newDealData.scopeItems);
                          setPrevPanelState('create');
                          setRightPanelState('scopeDetails');
                        }}
                        className="w-full mt-4 py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                      >
                        {newDealData.scopeItems.length > 0 ? "Edit Details" : "Add Details"}
                      </button>
                    </div>

                    <div className="bg-white rounded-2xl lg:p-4 p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                      <h4 className="text-[16px] font-medium text-[#000000] mb-4 ">Total Budget</h4>
                      <div className="flex gap-3">
                        <div className="w-[120px] px-3 py-2 bg-gray-50 rounded-lg text-[13px] lg:text-[10px] text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR</div>
                        <input 
                          type="number"
                          className="flex-1 px-3 py-2 bg-gray-50 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] rounded-lg text-[13px] lg:text-[10px] border border-gray-100 outline-none focus:border-[#D8D6F8]"
                          placeholder="0.00"
                          value={newDealData.totalAmount}
                          onChange={(e) => setNewDealData({ ...newDealData, totalAmount: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl lg:p-4 p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
                      <h4 className="text-[16px] font-medium text-[#000000] mb-4">Total Timeline</h4>
                      <div className="flex gap-3">
                        <div className="w-[120px] px-3 py-2 bg-gray-50 rounded-lg text-[13px] lg:text-[10px] text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Days</div>
                        <input 
                          type="text"
                          className="flex-1 px-3 py-2 bg-gray-50 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] rounded-lg text-[13px] lg:text-[10px] border border-gray-100 outline-none focus:border-[#D8D6F8]"
                          placeholder="e.g. 90"
                          value={newDealData.totalTimeline}
                          onChange={(e) => setNewDealData({ ...newDealData, totalTimeline: e.target.value })}
                        />
                      </div>
                    </div>

                  <SectionCard title="Milestone" showPlus onPlusClick={() => {
                    setPrevPanelState('create');
                    setSelectedMilestone({
                      id: Date.now(),
                      title: "",
                      description: "",
                      status: "Pending",
                      duration: "",
                      amount: "",
                    });
                    setRightPanelState('milestoneDetails');
                  }}>
                      <div className="space-y-3 mt-4">
                        {newDealData.milestones.map((m, idx) => (
                          <div key={idx} className="bg-[#F8F8F8] rounded-xl p-3 relative flex items-center justify-between">
                            <div className="flex gap-3 items-start flex-1">
                              <div className="w-3 h-3 rounded-full bg-[#D8D6F8] mt-1 shrink-0" />
                              <div>
                                <h5 className="text-[10px] font-bold text-[#000000]">{m.title || "Untitled Milestone"}</h5>
                                <p className="text-[9px] text-gray-400">Rs {m.amount || 0}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleViewMilestone(m)}
                                className="text-[10px] text-[#59549F] font-bold hover:underline"
                              >
                                View
                              </button>
                              <button 
                                onClick={() => {
                                  const updated = newDealData.milestones.filter((_, i) => i !== idx);
                                  setNewDealData({ ...newDealData, milestones: updated });
                                }}
                                className="text-red-400 hover:text-red-600 p-1 text-lg"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                        {newDealData.milestones.length === 0 && (
                          <p className="text-[13px] text-gray-400 italic text-center py-2">No milestones added yet</p>
                        )}
                      </div>
                    </SectionCard>
                  </>
                )}
              </div>

              {newDealData.requestId && (
                <div className="px-2 bg-white border-t border-gray-100 shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] space-y-3">
                  <div className="flex gap-3">
                    <button 
                      onClick={handleCreateProposal}
                      disabled={loading}
                      className="flex-1 py-2 bg-[#D8D6F8] rounded-lg text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] disabled:opacity-50"
                    >
                      {loading ? "Creating..." : "Create Proposal"}
                    </button>
                    <button 
                      onClick={() => {
                        setRightPanelState('none');
                        setPreselectedRequest(null);
                      }}
                      className="flex-1 py-2 bg-white border-2 border-gray-100 rounded-lg text-gray-500 font-bold text-sm shadow-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {rightPanelState === 'overview' && selectedProject && (
            <div className="flex flex-col h-full overflow-hidden">
              {/* <button 
                onClick={() => {
                  setRightPanelState('none');
                  setSelectedProject(null);
                }} 
                className="absolute top-4 right-4 z-10 p-1.5 bg-gray-50 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-all"
              >
                <FiX size={18} />
              </button> */}

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-2 relative space-y-4">
                {!isEditing && (
                  <SectionCard title="Deal Strength" showDot>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <p className="text-xs text-[#585858] tracking-wide">{selectedProject.strength || "High likelihood of successful closure"}</p>
                        <span className="text-[10px] font-bold text-[#59549F]">85%</span>
                      </div>
                      <div className="w-[65%] h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                        <div 
                          className="h-full bg-[#007832] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: '85%' }}
                        ></div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {(selectedProject.strengthPoints || ["Fast response time", "Clear milestone breakdown", "Competitive pricing"]).map((pt, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#000000]">
                          <IoMdCheckmark className="text-green-800" size={16} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </SectionCard>
                )}
                {/* Scope summary */}
                <SectionCard title="Scope of Work">
                  {isEditing ? (
                    <textarea 
                      readOnly={true}
                      disabled={true}
                      className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none bg-gray-50 min-h-[100px] opacity-75 cursor-not-allowed"
                      value={editedDeal.scopeDescription}
                      onChange={() => {}}
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
                          <span className="absolute left-35 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Rs</span>
                          <input 
                            type="number"
                            className="w-full pl-8 pr-4 py-2 bg-white rounded-lg text-xs text-[#000000] border-2 border-[#D8D6F8] shadow-sm text-center focus:outline-none"
                            value={editedDeal.totalAmount}
                            onWheel={(e) => e.target.blur()}
                            onChange={(e) => setEditedDeal({ ...editedDeal, totalAmount: e.target.value })}
                          />
                        </div>
                      ) : (
                        <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] ">Rs {selectedProject.totalAmount}</div>
                      )}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 mt-4">
                    <h4 className="text-[16px] font-medium text-[#000000] mb-4">Total Timeline</h4>
                    <div className="flex flex-col lg:flex-row gap-3 mb-4">
                      <div className="lg:w-[150px] w-full px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-100 flex items-center justify-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Total Timeline</div>
                      {isEditing ? (
                        <input 
                          type="text"
                          className="flex-1 px-4 py-2 bg-white rounded-lg text-xs text-[#000000] border-2 border-[#D8D6F8] shadow-sm  focus:outline-none text-center"
                          value={editedDeal.totalTimeline}
                          onChange={(e) => setEditedDeal({ ...editedDeal, totalTimeline: e.target.value })}
                          placeholder="e.g. 90 Days"
                        />
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
                        <div className="absolute top-2 right-2 lg:top-4 lg:right-4 flex flex-col items-end gap-3">
                          {getStatusBadge(m.status)}
                          {!isEditing && (
                            <div className="flex bg-[#D8D6F8] rounded-sm overflow-hidden border border-[#D8D6F8] shadow-[inset_0px_0px_12px_rgba(0,0,0,0.1)]">
                              <button 
                                onClick={() => handleApproveMilestone(m._id || m.id)}
                                className="px-2 py-1 text-[10px]   text-[#59549F] hover:bg-[#C9C7F0] transition-all border-r border-[#59549F]/20"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleViewMilestone(m)}
                                className="px-2 py-1 text-[10px]   text-[#59549F] hover:bg-[#C9C7F0] transition-all"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <div className={`flex gap-3 ${!isEditing ? 'pr-28' : ''}`}>
                          <div className="w-4 h-4 rounded-full bg-[#D8D6F8] mt-1 shrink-0" />
                          <div className="flex-1">
                             {isEditing ? (
                               <div className="space-y-2">
                                 <input 
                                   type="text"
                                   readOnly={true}
                                   disabled={true}
                                   className="w-full p-2 text-xs border border-gray-200 rounded-lg focus:outline-none bg-gray-50 opacity-75 cursor-not-allowed"
                                   value={m.title}
                                   onChange={() => {}}
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
              <div className="sticky bottom-0 z-20 pt-1 pb-3 border-t border-gray-100 bg-white space-y-3 rounded-b-2xl shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] px-2">
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
                              className="w-full py-2 bg-[#D8D6F8] rounded-lg text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
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
            <div className="flex-1 flex flex-col h-full overflow-hidden p-2">
              {!isEditing && (
                <div className="hidden lg:flex items-center mb-4 gap-3">
                  <button onClick={handleBack} className="p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm">
                    <FiArrowLeft size={18} />
                  </button>
                  <h1 className="text-lg font-medium text-[#000000]">Scope of work </h1>
                </div>
              )}
              
              <div className="space-y-2 lg:p-3 px-3 py-3 -m-3 flex-1 overflow-y-auto scrollbar-hide">
                {tempScopeItems.map((item, index) => (
                  <div key={index} className="relative group">
                    <input 
                      type="text" 
                      value={item} 
                      onChange={(e) => handleScopeItemChange(index, e.target.value)}
                      readOnly={!(isEditing || prevPanelState === 'create')}
                      placeholder="Define scope item..."
                      className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-xs focus:border-[#59549F] outline-none transition-all pr-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                    />
                    {(isEditing || prevPanelState === 'create') && (
                      <button 
                        onClick={() => handleRemoveScopeItem(index)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-light text-gray-400 hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                
                {(isEditing || prevPanelState === 'create') && (
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
                    value={isEditing ? editedDeal?.scopeDescription : (rightPanelState === 'scopeDetails' && !selectedProject ? newDealData.scopeDescription : selectedProject?.scopeDescription)}
                    onChange={(e) => {
                      if (isEditing) {
                        setEditedDeal({ ...editedDeal, scopeDescription: e.target.value });
                      } else {
                        setNewDealData({ ...newDealData, scopeDescription: e.target.value });
                      }
                    }}
                    readOnly={!(isEditing || prevPanelState === 'create')}
                    disabled={!(isEditing || prevPanelState === 'create')}
                    className={`w-full min-h-[300px] p-6 border border-gray-100 rounded-2xl text-xs text-gray-500 leading-relaxed resize-none placeholder:italic shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] outline-none ${(isEditing || prevPanelState === 'create') ? "bg-[#FDFDFF]" : "bg-gray-50 opacity-75 cursor-not-allowed"}`}
                  />
                </div>
              </div>

              {(isEditing || prevPanelState === 'create') && (
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
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <div className="hidden lg:flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <button onClick={handleBack} className="p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm">
                    <FiArrowLeft size={18} />
                  </button>
                </div>
                <div className="bg-[#B91C1C] text-white text-[7px] lg:text-[10px] px-2 py-1.5 rounded-full ">
                  {selectedMilestone.duration ? `Duration - ${selectedMilestone.duration}` : "Add Duration"}
                </div>
              </div>
              
              <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide p-2">
                <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                   <h4 className="text-sm font-medium text-[#000000] mb-4">Milestone Title</h4>
                   <input 
                      type="text"
                      value={selectedMilestone.title}
                    readOnly={!(isEditing || prevPanelState === 'create')}
                    disabled={!(isEditing || prevPanelState === 'create')}
                    onChange={(e) => setSelectedMilestone({ ...selectedMilestone, title: e.target.value })}
                    placeholder="Milestone Title"
                    className={`w-full px-4 py-2 border border-gray-100 rounded-lg text-sm outline-none shadow-sm ${(isEditing || prevPanelState === 'create') ? "bg-[#FDFDFF]" : "bg-gray-50 opacity-75 cursor-not-allowed"}`}
                   />
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                   <h4 className="text-sm font-medium text-[#000000] mb-4">Milestone Budget - {selectedMilestone.title || "Milestone"}</h4>
                   <div className="flex flex-col lg:flex-row gap-3 mb-2">
                      <div className="lg:w-[150px] w-full px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[13px] lg:text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR - Indian Rupees</div>
                      <input 
                        type="number" 
                        value={selectedMilestone.amount}
                        readOnly={!(isEditing || prevPanelState === 'create')}
                        disabled={!(isEditing || prevPanelState === 'create')}
                        onChange={(e) => setSelectedMilestone({ ...selectedMilestone, amount: e.target.value })}
                        placeholder="0"
                        className={`flex-1 px-3 py-2 border border-gray-100 rounded-lg text-[13px] lg:text-[10px] outline-none shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center ${(isEditing || prevPanelState === 'create') ? "bg-[#FDFDFF]" : "bg-gray-50 opacity-75 cursor-not-allowed"}`} 
                      />
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                    <h4 className="text-sm font-medium text-[#000000] mb-4">Milestone Timeline - {selectedMilestone.title || "Milestone"}</h4>
                    <div className="flex flex-col lg:flex-row gap-3 mb-2">
                      <div className="lg:w-[150px] w-full px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[13px] lg:text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Total Days</div>
                      <input 
                        type="text" 
                        placeholder="Enter Days"
                        value={selectedMilestone.duration}
                        readOnly={!(isEditing || prevPanelState === 'create')}
                        disabled={!(isEditing || prevPanelState === 'create')}
                        onChange={(e) => setSelectedMilestone({ ...selectedMilestone, duration: e.target.value })}
                        className={`flex-1 px-3 py-2 text-center border border-gray-100 rounded-lg text-[13px] lg:text-[10px] outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] ${(isEditing || prevPanelState === 'create') ? "bg-[#FDFDFF]" : "bg-gray-50 opacity-75 cursor-not-allowed"}`} 
                      />
                    </div>
                 </div>
                                   <div className="pt-2">
                   <h4 className="text-base font-medium text-[#000000] mb-4 ">Scope of work in {selectedMilestone.title || "milestone"}</h4>
                   <textarea 
                     placeholder="Milestone Description"
                     value={selectedMilestone.description}
                     readOnly={!(isEditing || prevPanelState === 'create')}
                     disabled={!(isEditing || prevPanelState === 'create')}
                     onChange={(e) => setSelectedMilestone({ ...selectedMilestone, description: e.target.value })}
                     className={`w-full min-h-[180px] p-6 border border-gray-100 rounded-2xl text-sm text-gray-500 leading-relaxed resize-none placeholder:italic shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] outline-none ${(isEditing || prevPanelState === 'create') ? "bg-[#FDFDFF]" : "bg-gray-50 opacity-75 cursor-not-allowed"}`}
                   />
                </div>
              </div>

              {(isEditing || prevPanelState === 'create') && (
                <div className="flex gap-4 mt-8 ">
                  <button 
                    onClick={() => {
                      if (!selectedMilestone.title) return toast.error("Title is required");
                      if (prevPanelState === 'create') {
                        const exists = newDealData.milestones.findIndex(m => m.id === selectedMilestone.id);
                        if (exists > -1) {
                          const updated = [...newDealData.milestones];
                          updated[exists] = selectedMilestone;
                          setNewDealData({ ...newDealData, milestones: updated });
                        } else {
                          setNewDealData({ ...newDealData, milestones: [...newDealData.milestones, selectedMilestone] });
                        }
                        toast.success("Milestone saved");
                        setRightPanelState('create');
                        setPrevPanelState(null);
                      } else {
                        // For counter-offer editing
                        const exists = editedDeal.milestones.findIndex(m => m._id === selectedMilestone._id || m.id === selectedMilestone.id);
                        if (exists > -1) {
                          const updated = [...editedDeal.milestones];
                          updated[exists] = selectedMilestone;
                          setEditedDeal({ ...editedDeal, milestones: updated });
                        }
                        toast.success("Milestone saved");
                        setRightPanelState('overview');
                      }
                    }}
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
  const createdDate = new Date(proj.createdAt);
  const now = new Date();
  const hoursElapsed = (now - createdDate) / (1000 * 60 * 60);
  const showNudge = hoursElapsed >= 24 && !["Approved", "Active"].includes(proj.status);

  return (
    <div className={`bg-white rounded-2xl px-4 lg:px-6 py-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all shrink-0 ${selectedProject?._id === proj._id ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
      <div className="grid grid-cols-3 gap-2 lg:gap-2 mb-4 items-start">
        {/* Row 1, Col 1: Real Company Name */}
        <div className="flex flex-col min-w-0">
          <h3 className="text-[16px] lg:text-[16px] font-medium text-[#000000] leading-tight truncate">
            {companyName}
          </h3>
        </div>
        {/* Row 1, Col 2: Timeline Label */}
        <div className="flex flex-col items-center">
          <p className="text-[16px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Timeline</p>
        </div>
        {/* Row 1, Col 3: Price Label */}
        <div className="flex flex-col items-end">
          <p className="text-[16px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Price</p>
        </div>

        {/* Row 2, Col 1: Project Title */}
        <div className="flex flex-col -mt-1 min-w-0">
          <p className="text-[13px] lg:text-sm text-[#000000] decoration-[#59549F] truncate whitespace-nowrap w-full">
            {proj.requestId?.service || "Project Deal"}
          </p>
        </div>
        {/* Row 2, Col 2: Timeline Value */}
        <div className="flex flex-col items-center -mt-1">
          <p className="text-[13px] lg:text-sm text-[#000000] whitespace-nowrap">
            {proj.totalTimeline || "N/A"}
          </p>
        </div>
        {/* Row 2, Col 3: Price Value */}
        <div className="flex flex-col items-end -mt-1">
          <p className="text-[13px] lg:text-sm text-[#000000] whitespace-nowrap">Rs {proj.totalAmount || 0}</p>
        </div>

        {/* Row 3, Col 1: Real User Name */}
        <div className="col-span-3 mt-1">
          <p className="text-[13px] lg:text-sm text-[#000000] ">
            {userName}
          </p>
        </div>
      </div>
      
      {!isStartup && showNudge && (
        <div className="bg-[#FFF9F1] rounded-2xl p-4 mb-1 flex items-start gap-3 border border-[#FFE0B2] shadow-sm">
          <FiZap className="text-[#FBC02D] mt-1 shrink-0" size={20} />
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-[#000000] mb-1 lg:mb-2">This deal is close to finalization</h4>
            <p className="text-[10px] text-gray-500 leading-tight">Finalize now to secure the professional</p>
          </div>
        </div>
      )}

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
