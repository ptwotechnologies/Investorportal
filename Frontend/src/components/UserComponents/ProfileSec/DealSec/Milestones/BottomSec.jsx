import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiPlus, FiFileText, FiClipboard, FiChevronDown } from "react-icons/fi";
import { MdOutlinePrivateConnectivity } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BottomSec = ({ selectedMilestone, setSelectedMilestone, activeView, setActiveView }) => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection states
  const [selectedDeal, setSelectedDeal] = useState(null);
  
  // Add Milestone states
  const [tempMilestone, setTempMilestone] = useState({
    title: "",
    description: "",
    amount: "",
    duration: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extensionDays, setExtensionDays] = useState("");
  const [showExtensionInput, setShowExtensionInput] = useState(false);

  const userStr = localStorage.getItem("user");
  const userData = userStr ? JSON.parse(userStr) : null;
  const currentUserId = userData?._id || userData?.id;
  const isStartup = userData?.role?.toLowerCase() === "startup";

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    if (activeView === 'addMilestone') {
      setTempMilestone({
        title: "",
        description: "",
        amount: "",
        duration: ""
      });
      setSelectedMilestone(null);
    }
  }, [activeView]);

  const fetchDeals = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/deals/my-deals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Show Active, Completed, Negotiating, or Documented deals
      const activeDeals = res.data.filter(d => 
        ["Active", "Completed", "Negotiating", "Documented"].includes(d.status)
      );
      setDeals(activeDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMilestoneSubmit = async () => {
    if (!selectedDeal) {
      toast.error("Please select a project first");
      return;
    }
    if (!tempMilestone.title || !tempMilestone.amount) {
      toast.error("Please fill in milestone title and amount");
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedMilestones = [...(selectedDeal.milestones || []), {
        ...tempMilestone,
        status: "Pending"
      }];

      const payload = {
        milestones: updatedMilestones,
        status: "Negotiating",
        isCounter: true, // This triggers history update in backend
        startupAgreed: true,
        professionalAgreed: false
      };

      await axios.put(`${serverUrl}/api/deals/${selectedDeal._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("New milestone proposed! Project moved to negotiation.");
      setActiveView('none');
      fetchDeals();
      setSelectedDeal(null);
    } catch (error) {
      console.error("Error adding milestone:", error);
      toast.error(error.response?.data?.message || "Failed to add milestone");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateMilestone = async (milestoneId, updates) => {
    if (!selectedDeal) return;
    setIsSubmitting(true);
    try {
      const updatedMilestones = selectedDeal.milestones.map(m => 
        String(m._id) === String(milestoneId) ? { ...m, ...updates } : m
      );

      const payload = { milestones: updatedMilestones };
      
      // If all milestones are now completed, mark the whole deal as completed
      const allDone = updatedMilestones.every(m => m.status === 'Completed');
      if (allDone && updatedMilestones.length > 0) {
        payload.status = 'Completed';
      }

      await axios.put(`${serverUrl}/api/deals/${selectedDeal._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Milestone updated successfully");
      fetchDeals();
      
      // Update selected milestone in local state to reflect changes
      const updatedM = updatedMilestones.find(m => String(m._id) === String(milestoneId));
      setSelectedMilestone(updatedM);
      
      // Update selectedDeal in local state as well
      setSelectedDeal({ ...selectedDeal, milestones: updatedMilestones });

    } catch (error) {
      console.error("Error updating milestone:", error);
      toast.error("Failed to update milestone");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkCompleted = (mId) => {
    handleUpdateMilestone(mId, { status: "Completed" });
  };

  const handleRequestExtension = (mId) => {
    if (!extensionDays) {
      toast.error("Please enter number of days");
      return;
    }
    handleUpdateMilestone(mId, { 
      extensionRequest: { 
        days: Number(extensionDays), 
        status: "Pending" 
      } 
    });
    setExtensionDays("");
    setShowExtensionInput(false);
  };

  const handleApproveExtension = (mId, extraDays, currentDuration) => {
    // Basic duration math: "10 Days" -> 10 + extra
    const currentDays = parseInt(currentDuration) || 0;
    const newDuration = `${currentDays + extraDays} Days`;
    
    handleUpdateMilestone(mId, { 
      duration: newDuration,
      extensionRequest: { days: 0, status: "Approved" }
    });
  };

  const handleDisapproveExtension = (mId) => {
    handleUpdateMilestone(mId, { 
      extensionRequest: { days: 0, status: "Disapproved" },
      isDisapproved: true
    });
  };

  const milestoneBreakdown = selectedMilestone ? {
    amount: Number(selectedMilestone.amount),
    fee: Math.round(Number(selectedMilestone.amount) * 0.2), // 20% Platform Fee
    gst: Math.round(Number(selectedMilestone.amount) * 0.2 * 0.18), // 18% GST on Fee
    totalPayable: Math.round(Number(selectedMilestone.amount) + (Number(selectedMilestone.amount) * 0.2 * 1.18)),
    netRevenue: Math.round(Number(selectedMilestone.amount) * 0.8) // Milestone amount minus 20% fee
  } : null;

  const StatCard = ({ label, value, bgColor }) => (
    <div className={`${bgColor} rounded-2xl px-2 py-4 lg:p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
        <h3 className="text-[13px] lg:text-sm lg:font-medium text-[#001032]">{label}</h3>
      </div>
      <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
    </div>
  );

  const ProjectCard = ({ deal, isSelected, onSelect }) => {
    const userStr = localStorage.getItem("user");
    const userData = userStr ? JSON.parse(userStr) : null;
    const currentUserId = userData?._id || userData?.id;

    // Determine which party to show (the "other" party)
    const isStartupOwner = String(deal.startupId?._id || deal.startupId) === String(currentUserId);
    const displayUser = isStartupOwner ? deal.professionalId : deal.startupId;
    
    const party = typeof displayUser === 'object' ? displayUser : {};
    const companyName = party.businessDetails?.companyName || "N/A";
    const firstName = party.businessDetails?.firstName || "";
    const lastName = party.businessDetails?.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();
    const userName = fullName || "N/A";

    const paidMilestones = deal.milestones?.filter(m => m.status === 'Paid' || m.status === 'Completed').length || 0;
    const totalMilestones = deal.milestones?.length || 0;
    
    // Use the earliest paidAt date as the project start date
    const paidDates = deal.milestones?.filter(m => m.paidAt).map(m => new Date(m.paidAt));
    const startDate = paidDates?.length > 0 
      ? new Date(Math.min(...paidDates)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      : "Pending Payment";

    return (
      <div className={`bg-white rounded-2xl px-4 lg:px-6 py-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all shrink-0 ${isSelected ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
      <div className="grid grid-cols-3 gap-2 lg:gap-2 mb-4 items-start w-full">
        {/* Row 1, Col 1: Real Company Name */}
        <div className="flex flex-col overflow-hidden">
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
        <div className="flex flex-col -mt-1 overflow-hidden">
          <p className="text-[13px] lg:text-sm text-[#000000] truncate">
            {deal.requestId?.service || "Project Deal"}
          </p>
        </div>
        {/* Row 2, Col 2: Timeline Value */}
        <div className="flex flex-col items-center -mt-1">
          <p className="text-[13px] lg:text-sm text-[#000000] ">
            {deal.totalTimeline || "N/A"}
          </p>
        </div>
        {/* Row 2, Col 3: Price Value */}
        <div className="flex flex-col items-end -mt-1">
          <p className="text-[13px] lg:text-sm text-[#000000] ">Rs {deal.totalAmount || 0}</p>
        </div>

        {/* Row 3, Col 1: Real User Name */}
        <div className="col-span-3 mt-1">
          <p className="text-[13px] lg:text-sm text-[#000000] ">
            {userName}
          </p>
        </div>
      </div>
        <button 
          onClick={() => onSelect(deal)}
          className="w-full mt-4 py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
        >
          View Details
        </button>
      </div>
    );
  };

  const MilestoneCard = ({ ms, isSelected, onSelect }) => {
    // Determine which party to show (the "other" party) from selectedDeal
    const isStartupOwner = String(selectedDeal.startupId?._id || selectedDeal.startupId) === String(currentUserId);
    const displayUser = isStartupOwner ? selectedDeal.professionalId : selectedDeal.startupId;
    
    const party = typeof displayUser === 'object' ? displayUser : {};
    const firstName = party.businessDetails?.firstName || "";
    const lastName = party.businessDetails?.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim() || "Professional";

    return (
      <div className={`bg-white rounded-2xl p-3 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all ${isSelected ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="space-y-2 overflow-hidden">
            <h3 className="text-sm lg:text-sm font-semibold text-[#000000] truncate">{ms.title}</h3>
            <p className="text-sm lg:text-sm text-gray-500 font-medium truncate whitespace-nowrap">
              {selectedDeal?.requestId?.service || "Service Milestone"}
            </p>
            <p className="text-sm lg:text-sm text-[#000000] font-medium opacity-70 truncate">
              {fullName}
            </p>
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-sm lg:text-sm font-semibold text-[#000000]">Due Date</h3>
            <p className="text-sm lg:text-sm text-gray-500 font-medium">{ms.duration || "20 Days"}</p>
          </div>
          <div className="space-y-2 text-right">
            <h3 className="text-sm lg:text-sm font-semibold text-[#000000]">Price</h3>
            <p className="text-sm lg:text-sm text-gray-500 font-medium">Rs {ms.amount}</p>
          </div>
        </div>
        <button 
          onClick={() => onSelect(ms)}
          className="w-full mt-2 py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
        >
          View Details
        </button>
      </div>
    );
  };

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-2  lg:px-4 lg:py-1 bg-[#FDFDFF] lg:h-[640px] h-auto overflow-hidden">
      
      {/* ── Left Column: Project List ── */}
      <div className={`flex-1 flex flex-col  py-2 gap-6 overflow-hidden ${selectedDeal ? 'hidden lg:flex' : 'flex'}`}>
        <div className="grid grid-cols-2 gap-4 shrink-0 px-2 lg:px-0">
          <StatCard label="Active Projects" value={deals.length} bgColor="bg-[#D8E1F0]" />
          <StatCard label="Paid Milestones" value={deals.reduce((acc, d) => acc + (d.milestones?.filter(m => m.status === 'Paid').length || 0), 0)} bgColor="bg-[#D8D6F8]" />
          <StatCard label="Total Value" value={`Rs ${deals.reduce((acc, d) => acc + (d.totalAmount || 0), 0)}`} bgColor="bg-[#EFDBD9]" />
          <StatCard label="Completed" value={deals.reduce((acc, d) => acc + (d.milestones?.filter(m => m.status === 'Completed').length || 0), 0)} bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-medium text-[#000000] px-1 shrink-0">Active Deals</h2>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 p-2">
          {deals.length === 0 ? (
            <div className="flex flex-col items-center gap-4 lg:p-8 p-5 text-center border border-gray-300 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded-md bg-white w-[90%] lg:w-auto max-w-sm mx-auto lg:my-10">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No active deals found</h3>
                <p className="text-sm text-gray-500">Your current deals and projects will appear here.</p>
              </div>
            </div>
          ) : (
            deals.map(deal => (
              <ProjectCard 
                key={deal._id} 
                deal={deal} 
                isSelected={selectedDeal?._id === deal._id}
                onSelect={(d) => { setSelectedDeal(d); setSelectedMilestone(null); }}
              />
            ))
          )}
        </div>
      </div>

      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2 ml-1" />

      <div className={`w-full lg:w-[450px] xl:w-[550px] h-[75vh] lg:h-full flex flex-col overflow-hidden ${!selectedDeal ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Header */}
        {selectedDeal && (
          <div className={`flex items-center gap-3 py-2 px-4 shrink-0 ${selectedDeal ? 'lg:hidden' : ''}`}>
            <button 
                onClick={() => {
                    if (selectedMilestone) setSelectedMilestone(null);
                    else if (activeView === 'addMilestone') setActiveView('none');
                    else setSelectedDeal(null);
                }} 
                className="p-1.5 bg-gray-50 rounded-full text-[#59549F] shadow-sm hover:bg-gray-100"
            >
              <FiArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold text-[#001032]">
              {selectedMilestone ? "Milestone Details" : activeView === 'addMilestone' ? "Add New Milestone" : "Project Milestones"}
            </h2>
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 m-2 rounded-2xl relative">
          <div className="flex-1 overflow-y-auto scrollbar-hide relative">
            {!selectedDeal ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-50">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-[#D8D6F8]">
                  <IoMdCheckmark size={40} />
                </div>
                <h3 className="text-lg font-bold text-gray-400">No Project Selected</h3>
                <p className="text-sm text-gray-400 mt-1 italic">Select a project from the left to view milestones.</p>
              </div>
            ) : (
              <div className="p-2 lg:p-4 space-y-6 min-h-[500px]">
                {selectedMilestone ? (
                  /* ═══ Milestone Detail View (Figma Styled) ═══ */
                  <div className="bg-white p-2 flex flex-col space-y-6">
                    {/* Header with Badge */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-[#000000]">{selectedMilestone.title}</h3>
                      <div className="bg-[#B91C1C] text-white text-[10px] px-4 py-2 rounded-full font-bold shadow-sm">
                        Duration - {selectedMilestone.duration || "20 Days"}
                      </div>
                    </div>

                    {/* Budget Inset Card */}
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-[0px_0px_12px_rgba(0,0,0,0.25)] space-y-3">
                      <h4 className="text-sm font-semibold text-[#000000]">Budget - {selectedMilestone.title}</h4>
                      <div className="flex gap-2">
                        <div className="flex-[0.8] bg-[#FDFDFF] border border-gray-100 rounded-lg py-2 px-3 shadow-[inset_0px_0px_8px_rgba(0,0,0,0.1)] text-[10px] text-gray-400 font-bold flex items-center justify-center text-center">
                          INR - Indian Rupees
                        </div>
                        <div className="flex-1 bg-white border border-gray-100 rounded-lg py-2 px-3 shadow-[0px_0px_12px_rgba(0,0,0,0.15)] text-[11px] text-gray-500 font-bold flex items-center justify-center">
                          Rs {selectedMilestone.amount}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Inset Card */}
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-[0px_0px_12px_rgba(0,0,0,0.25)] space-y-3">
                      <h4 className="text-sm font-semibold text-[#000000]">Timeline - {selectedMilestone.title}</h4>
                      <div className="flex gap-2">
                        <div className="flex-[0.8] bg-[#FDFDFF] border border-gray-100 rounded-lg py-2 px-3 shadow-[inset_0px_0px_8px_rgba(0,0,0,0.1)] text-[10px] text-gray-400 font-bold flex items-center justify-center text-center">
                          Total Days
                        </div>
                        <div className="flex-1 bg-white border border-gray-100 rounded-lg py-2 px-3 shadow-[0px_0px_12px_rgba(0,0,0,0.15)] text-[11px] text-gray-500 font-bold flex items-center justify-center">
                          {selectedMilestone.duration || "20 Days"}
                        </div>
                      </div>
                    </div>

                    {/* Scope Card */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-[#000000]">Scope of work in {selectedMilestone.title.toLowerCase()}</h4>
                      <div className="w-full bg-white border border-gray-100 rounded-xl p-3 lg:p-4 shadow-[0px_0px_12px_rgba(0,0,0,0.25)] h-[150px] overflow-y-auto scrollbar-hide">
                        <p className="text-xs text-gray-500 leading-relaxed text-justify">
                          {selectedMilestone.description || "No specific scope provided for this milestone yet. These Terms and Conditions govern the access to and use of the website and collaboration portal."}
                        </p>
                      </div>
                    </div>

                    {/* Financial Breakdown Card (Copied from Payments) */}
                    <div className="bg-white mt-3 rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden">
                      <div className="flex items-center justify-between px-6 lg:px-8 py-2 bg-[#F0EDFD] rounded-2xl">
                          <h3 className="text-base font-semibold text-[#000000]">
                            {String(selectedDeal.startupId?._id || selectedDeal.startupId) === String(currentUserId) ? "Payment Breakdown" : "Revenue Breakdown"}
                          </h3>
                          <FiChevronDown size={22} className="text-[#000000] cursor-pointer" />
                      </div>

                      <div className="p-2 lg:p-4">
                        <div className="grid grid-cols-3 gap-1 lg:gap-3 lg:mb-3 my-3">
                            <div className="bg-[#EEECFD] rounded-xl lg:rounded-2xl p-1 py-3 lg:p-3 flex flex-col items-center justify-center space-y-1 lg:space-y-2 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                              <p className="text-[9px] lg:text-[10px] text-[#000000] leading-tight">Milestone Amount</p>
                              <p className="text-[13px] lg:text-lg text-[#000000] font-bold">Rs {milestoneBreakdown.amount}</p>
                            </div>
                            <div className="bg-[#F5F5F5] rounded-xl lg:rounded-2xl p-1 py-3 lg:p-3 flex flex-col items-center justify-center space-y-1 lg:space-y-2 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                              <p className="text-[9px] lg:text-[10px] text-[#000000] leading-tight">Platform Fee (20%)</p>
                              <p className="text-[13px] lg:text-lg text-gray-400 font-bold">Rs {milestoneBreakdown.fee}</p>
                            </div>
                            <div className="bg-[#EEECFD] rounded-xl lg:rounded-2xl p-1 py-3 lg:p-3 flex flex-col items-center justify-center space-y-1 lg:space-y-2 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                              <p className="text-[9px] lg:text-[10px] text-[#000000] leading-tight">
                                {String(selectedDeal.startupId?._id || selectedDeal.startupId) === String(currentUserId) ? "Total Payable" : "Net Earnings"}
                              </p>
                              <p className="text-[13px] lg:text-lg text-[#59549F] font-bold">
                                Rs {String(selectedDeal.startupId?._id || selectedDeal.startupId) === String(currentUserId) ? milestoneBreakdown.totalPayable : milestoneBreakdown.netRevenue}
                              </p>
                            </div>
                        </div> 

                        <p className="text-xs text-black font-semibold mb-6">20% platform fees ensures</p>

                        <div className="grid grid-cols-3 gap-2 lg:gap-4">
                            <div className="border border-[#D8D6F8] rounded-xl lg:rounded-2xl p-1 lg:p-2 flex flex-col items-center justify-center shadow-sm bg-white aspect-square lg:aspect-auto">
                              <img src="/paymentsec1.png" alt="Secure payment" className="w-full h-full object-contain scale-140" />
                            </div>
                            <div className="border border-[#D8D6F8] rounded-xl lg:rounded-2xl p-1 lg:p-2 flex flex-col items-center justify-center shadow-sm bg-white aspect-square lg:aspect-auto">
                              <img src="/paymentsec2.png" alt="Verified execution" className="w-full h-full object-contain scale-140" />
                            </div>
                            <div className="border border-[#D8D6F8] rounded-xl lg:rounded-2xl p-1 lg:p-2 flex flex-col items-center justify-center shadow-sm bg-white aspect-square lg:aspect-auto">
                              <img src="/paymentsec3.png" alt="Dispute protection" className="w-full h-full object-contain scale-140" />
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeView === 'addMilestone' ? (
                  /* ═══ Add Milestone Form ═══ */
                  String(selectedDeal.startupId?._id || selectedDeal.startupId) !== String(currentUserId) ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-10 opacity-60">
                      <FiClipboard size={32} className="text-gray-300 mb-4" />
                      <p className="text-sm font-medium italic">Only the project creator (Buyer) can add new milestones.</p>
                      <button onClick={() => setActiveView('none')} className="mt-4 text-[#59549F] text-xs font-bold underline">Go Back</button>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-[#000000]">New Milestone</h3>
                        <div className="bg-[#B91C1C] text-white text-[10px] px-4 py-2 rounded-full font-bold shadow-sm italic">
                          Drafting...
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Milestone Name</label>
                          <input 
                            type="text"
                            value={tempMilestone.title}
                            onChange={(e) => setTempMilestone({...tempMilestone, title: e.target.value})}
                            className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-sm focus:border-[#D8D6F8] outline-none shadow-[inset_0px_0px_12px_rgba(0,0,0,0.15)] font-semibold"
                            placeholder="e.g. Design Completion"
                          />
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] space-y-3">
                          <h4 className="text-sm font-bold text-[#000000]">Budget - Setup</h4>
                          <div className="flex gap-2">
                            <div className="flex-[0.8] bg-[#FDFDFF] border border-gray-100 rounded-xl py-2 px-3 shadow-[inset_0px_0px_8px_rgba(0,0,0,0.1)] text-[10px] text-gray-400 font-bold flex items-center justify-center text-center">
                              INR - Rupees
                            </div>
                            <input 
                              type="number" 
                              placeholder="Amount"
                              value={tempMilestone.amount}
                              onChange={(e) => setTempMilestone({...tempMilestone, amount: e.target.value})}
                              className="flex-1 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_rgba(0,0,0,0.15)] font-bold text-center" 
                            />
                          </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] space-y-3">
                          <h4 className="text-sm font-bold text-[#000000]">Timeline - Setup</h4>
                          <div className="flex gap-2">
                            <div className="flex-[0.8] bg-[#FDFDFF] border border-gray-100 rounded-xl py-2 px-3 shadow-[inset_0px_0px_8px_rgba(0,0,0,0.1)] text-[10px] text-gray-400 font-bold flex items-center justify-center text-center">
                              Total Days
                            </div>
                            <input 
                              type="text" 
                              placeholder="e.g. 15 Days" 
                              value={tempMilestone.duration}
                              onChange={(e) => setTempMilestone({...tempMilestone, duration: e.target.value})}
                              className="flex-1 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_rgba(0,0,0,0.15)] font-bold text-center" 
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Scope of work</label>
                          <textarea 
                            placeholder="Describe the deliverables for this milestone..."
                            value={tempMilestone.description}
                            onChange={(e) => setTempMilestone({...tempMilestone, description: e.target.value})}
                            className="w-full h-[120px] p-4 bg-[#FDFDFF] border border-gray-100 rounded-xl text-sm focus:border-[#D8D6F8] outline-none resize-none placeholder:italic shadow-[inset_0px_0px_12px_rgba(0,0,0,0.15)] leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  /* ═══ Milestone List ═══ */
                  <div className="space-y-4">
                    {selectedDeal.milestones?.filter(m => ['Paid', 'Completed', 'Pending', 'Negotiating'].includes(m.status)).map(ms => (
                      <MilestoneCard key={ms._id} ms={ms} onSelect={(m) => setSelectedMilestone(m)} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ─── Static Footer Area (Outside the Main Card) ─── */}
        <div className="shrink-0 p-2 lg:p-0 sticky bottom-0 lg:relative bg-[#FDFDFF] z-50">
          {/* 1. Milestone Detail Actions */}
          {selectedDeal && selectedMilestone && (
            <div className="lg:px-6 pb-2  pt-1 bg-[#FDFDFF] border-t border-gray-100 space-y-4 rounded-lg lg:rounded-none shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] lg:shadow-none">
               {String(selectedDeal.professionalId?._id || selectedDeal.professionalId) === String(currentUserId) ? (
                 <div className="space-y-4">
                    {showExtensionInput && selectedMilestone.status !== "Completed" && (
                      <div className="p-4 bg-gray-50 rounded-xl space-y-3 shadow-inner mb-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase text-center tracking-wider">Extra days needed?</p>
                        <div className="flex gap-2">
                          <input 
                            type="number"
                            placeholder="Days"
                            value={extensionDays}
                            onChange={(e) => setExtensionDays(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#59549F] bg-white text-sm"
                          />
                          <button 
                            onClick={() => handleRequestExtension(selectedMilestone._id)}
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-[#59549F] text-white font-bold rounded-lg text-sm shadow-md"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleMarkCompleted(selectedMilestone._id)}
                        disabled={isSubmitting || selectedMilestone.status === "Completed"}
                        className={`flex-1 py-2 font-bold rounded-xl shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all flex items-center justify-center gap-2 text-sm ${
                          selectedMilestone.status === "Completed" 
                            ? "bg-[#D8D6F8] text-[#59549F] opacity-70 cursor-default" 
                            : "bg-[#59549F] hover:bg-[#48438a] text-white"
                        }`}
                      >
                        <IoMdCheckmark size={18} />
                        {selectedMilestone.status === "Completed" ? "Completed" : "Mark Completed"}
                      </button>
                      <button 
                        onClick={() => setShowExtensionInput(!showExtensionInput)}
                        disabled={isSubmitting || selectedMilestone.status === "Completed"}
                        className={`flex-1 py-2 font-bold rounded-xl shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all text-sm ${
                          selectedMilestone.status === "Completed"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                            : "bg-[#D8D6F8] hover:bg-[#C9C7F0] text-[#59549F]"
                        }`}
                      >
                        Request Extension
                      </button>
                    </div>
                    {selectedMilestone.extensionRequest?.status === "Pending" && selectedMilestone.status !== "Completed" && (
                      <div className="p-3 bg-[#FFF9C4] border border-[#FBC02D] rounded-xl text-center text-[10px] text-[#827717] font-bold">
                        Time Extension Pending ({selectedMilestone.extensionRequest.days} Days)
                      </div>
                    )}
                 </div>
               ) : (
                 <div className="space-y-4">
                    {selectedMilestone.status === "Completed" ? (
                      <div className="w-full py-2 bg-[#D7EBE4] text-[#2D6A4F] font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 opacity-80 text-sm">
                         <IoMdCheckmark size={18} />
                         Milestone Completed
                      </div>
                    ) : (
                      <button disabled className="w-full py-2 bg-[#D8D6F8] text-[#59549F] rounded-lg lg:rounded-xl text-sm font-bold shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.1)] opacity-80 cursor-default  tracking-wider">
                        Working on this milestone
                      </button>
                    )}
                    {selectedMilestone.extensionRequest?.status === "Pending" && selectedMilestone.status !== "Completed" && (
                      <div className="p-4 bg-[#FFF9C4] rounded-2xl space-y-3 border border-[#FBC02D]">
                         <p className="text-sm font-bold text-[#827717]">Time Extension Requested: {selectedMilestone.extensionRequest.days} Days</p>
                         <div className="flex gap-2">
                            <button onClick={() => handleApproveExtension(selectedMilestone._id, selectedMilestone.extensionRequest.days, selectedMilestone.duration)} className="flex-1 py-2 bg-[#2D6A4F] text-white font-bold rounded-lg text-sm">Approve</button>
                            <button onClick={() => handleDisapproveExtension(selectedMilestone._id)} className="flex-1 py-2 bg-[#B91C1C] text-white font-bold rounded-lg text-sm">Disapprove</button>
                         </div>
                      </div>
                    )}
                    {selectedMilestone.isDisapproved && (
                      <button onClick={() => navigate("/deal/disputes", { state: { isCreateMode: true, dealId: selectedDeal._id, milestoneId: selectedMilestone._id } })} className="w-full py-3 bg-[#B91C1C] text-white font-bold rounded-xl shadow-lg text-sm">Raise a Dispute</button>
                    )}
                 </div>
               )}
            </div>
          )}

          {/* 2. Add Milestone Actions */}
          {activeView === 'addMilestone' && selectedDeal && String(selectedDeal.startupId?._id || selectedDeal.startupId) === String(currentUserId) && (
            <div className="pt-2 pb-6 px-2 bg-[#FDFDFF] border-t border-gray-100 flex gap-4 rounded-2xl lg:rounded-none shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] lg:shadow-none">
               <button 
                 onClick={handleAddMilestoneSubmit}
                 disabled={isSubmitting}
                 className="flex-[2] py-3 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all disabled:opacity-50"
               >
                 {isSubmitting ? "Processing..." : "Proceed for Negotiation"}
               </button>
               <button 
                 onClick={() => setActiveView('none')}
                 className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all shadow-sm"
               >
                 Cancel
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomSec;