import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiPlus, FiFileText, FiClipboard } from "react-icons/fi";
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
      // Fetch only active/approved deals
      const res = await axios.get(`${serverUrl}/api/deals/my-deals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Only show deals that have at least ONE PAID milestone
      const activeDeals = res.data.filter(d => 
        d.milestones?.some(m => m.status === 'Paid' || m.status === 'Completed')
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

  const StatCard = ({ label, value, bgColor }) => (
    <div className={`${bgColor} rounded-2xl p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
        <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">{label}</h3>
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
            <p className="text-[10px] lg:text-sm text-[#000000] decoration-[#59549F] w-fit">
              {deal.requestId?.service || "Project Deal"}
            </p>
          </div>
          <div className="flex flex-col lg:items-center -mt-1">
            <p className="text-[10px] lg:text-sm text-[#000000]">
              {deal.totalTimeline || "N/A"}
            </p>
          </div>
          <div className="flex flex-col lg:items-end -mt-1">
            <p className="text-[10px] lg:text-sm text-[#000000]">Rs {deal.totalAmount || 0}</p>
          </div>

          <div className="col-span-3 mt-1">
            <p className="text-[10px] lg:text-sm text-[#000000] font-medium opacity-70">
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

  const MilestoneCard = ({ ms, isSelected, onSelect }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all ${isSelected ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-[#000000]">{ms.title}</h3>
          <p className="text-xs text-gray-500 font-medium">Mobile App Development</p>
          <p className="text-xs text-[#000000] font-medium opacity-70">Akshay Dogra</p>
        </div>
        <div className="space-y-3 text-center">
          <h3 className="text-base font-semibold text-[#000000]">Due Date</h3>
          <p className="text-xs text-gray-500 font-medium">{ms.duration || "20 Days"}</p>
        </div>
        <div className="space-y-3 text-right">
          <h3 className="text-base font-semibold text-[#000000]">Price</h3>
          <p className="text-xs text-gray-500 font-medium">Rs {ms.amount}</p>
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

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF] lg:h-[640px] h-screen overflow-hidden">
      
      {/* ── Left Column: Project List ── */}
      <div className={`flex-1 flex flex-col gap-6 overflow-hidden ${selectedDeal ? 'hidden lg:flex' : 'flex'}`}>
        <div className="grid grid-cols-2 gap-4 shrink-0">
          <StatCard label="Active Projects" value={deals.length} bgColor="bg-[#D8E1F0]" />
          <StatCard label="Paid Milestones" value={deals.reduce((acc, d) => acc + (d.milestones?.filter(m => m.status === 'Paid').length || 0), 0)} bgColor="bg-[#D8D6F8]" />
          <StatCard label="Total Value" value={`Rs ${deals.reduce((acc, d) => acc + (d.totalAmount || 0), 0)}`} bgColor="bg-[#EFDBD9]" />
          <StatCard label="Completed" value={deals.reduce((acc, d) => acc + (d.milestones?.filter(m => m.status === 'Completed').length || 0), 0)} bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-medium text-[#000000] px-1 shrink-0">Active Deals</h2>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 p-2">
          {deals.map(deal => (
            <ProjectCard 
              key={deal._id} 
              deal={deal} 
              isSelected={selectedDeal?._id === deal._id}
              onSelect={(d) => { setSelectedDeal(d); setSelectedMilestone(null); }}
            />
          ))}
        </div>
      </div>

      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column: Milestones or Detail ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col overflow-hidden ${!selectedDeal ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Header */}
        {selectedDeal && (
          <div className="flex items-center gap-3 py-2 px-2 shrink-0">
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

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
            {!selectedDeal ? (
              <div className="flex flex-col items-center justify-center h-full opacity-40 text-center gap-4">
                 <FiClipboard size={32} className="text-gray-300" />
                 <p className="text-sm font-medium italic">Select a project to view its milestones</p>
              </div>
            ) : selectedMilestone ? (
            /* ═══ Milestone Detail View ═══ */
            <div className="bg-white rounded-2xl p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-[#001032]">{selectedMilestone.title}</h3>
                  <span className="bg-[#B91C1C] text-white text-[10px] px-3 py-1.5 rounded-full font-bold">
                    Duration - {selectedMilestone.duration || "20 Days"}
                  </span>
               </div>

               <div className="space-y-4">
                  <h4 className="text-base font-semibold text-[#001032]">Budget - {selectedMilestone.title}</h4>
                  <div className="flex gap-3">
                     <div className="w-[150px] bg-[#FDFDFF] border border-gray-100 rounded-lg py-3 px-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-xs text-gray-400 font-bold flex justify-center items-center">
                        INR - Indian Rupees
                     </div>
                     <div className="flex-1 bg-white border border-gray-100 rounded-lg py-3 px-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-xs text-gray-400 font-bold flex justify-center items-center">
                        Rs {selectedMilestone.amount}
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="text-base font-semibold text-[#001032]">Timeline - {selectedMilestone.title}</h4>
                  <div className="flex gap-3">
                     <div className="w-[150px] bg-[#FDFDFF] border border-gray-100 rounded-lg py-3 px-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-xs text-gray-400 font-bold flex justify-center items-center">
                        Total Days
                     </div>
                     <div className="flex-1 bg-white border border-gray-100 rounded-lg py-3 px-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-xs text-gray-400 font-bold flex justify-center items-center">
                        {selectedMilestone.duration || "20 Days"}
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="text-base font-semibold text-[#001032]">Scope of work in {selectedMilestone.title.toLowerCase()}</h4>
                  <div className="w-full bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] min-h-[250px] overflow-y-auto scrollbar-hide">
                     <p className="text-xs text-gray-500 leading-relaxed text-justify">
                        {selectedMilestone.description || "No specific scope provided for this milestone yet. These Terms and Conditions govern the access to and use of the website and collaboration portal."}
                     </p>
                  </div>
               </div>

               {/* ─── Actions Section ─── */}
               <div className="pt-4 border-t border-gray-100 space-y-4">
                  
                  {/* Provider Controls (Service Professional) */}
                  {String(selectedDeal.professionalId?._id || selectedDeal.professionalId) === String(currentUserId) && (
                    <div className="space-y-4">
                        <>
                           {showExtensionInput && selectedMilestone.status !== "Completed" && (
                             <div className="p-4 bg-gray-50 rounded-xl space-y-3 shadow-inner mb-4">
                               <p className="text-xs font-bold text-gray-500 uppercase text-center">How many extra days do you need?</p>
                               <div className="flex gap-2">
                                 <input 
                                   type="number"
                                   placeholder="Days"
                                   value={extensionDays}
                                   onChange={(e) => setExtensionDays(e.target.value)}
                                   className="flex-1 px-4 py-2 border rounded-lg outline-none focus:border-[#59549F] bg-white"
                                 />
                                 <button 
                                   onClick={() => handleRequestExtension(selectedMilestone._id)}
                                   disabled={isSubmitting}
                                   className="px-6 py-2 bg-[#59549F] text-white font-bold rounded-lg text-sm shadow-md active:scale-95 transition-all"
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
                               className={`flex-1 py-2 font-bold rounded-xl shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all flex items-center justify-center gap-2 ${
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
                               className={`flex-1 py-2 font-bold rounded-xl shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all ${
                                 selectedMilestone.status === "Completed"
                                   ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                                   : "bg-[#D8D6F8] hover:bg-[#C9C7F0] text-[#59549F]"
                               }`}
                             >
                               Request Extension
                             </button>
                           </div>
                        </>

                       {/* Status Badge for Extension */}
                       {selectedMilestone.extensionRequest?.status === "Pending" && (
                         <div className="p-3 bg-[#FFF9C4] border border-[#FBC02D] rounded-xl text-center text-xs text-[#827717] font-bold">
                           TIME EXTENSION PENDING ({selectedMilestone.extensionRequest.days} DAYS)
                         </div>
                       )}
                    </div>
                  )}

                  {/* Buyer Controls (Startup/Client) */}
                  {String(selectedDeal.startupId?._id || selectedDeal.startupId) === String(currentUserId) && (
                    <div className="space-y-4">
                       {selectedMilestone.status === "Completed" && (
                         <div className="w-full py-2 bg-[#D7EBE4] text-[#2D6A4F] font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 opacity-80">
                            <IoMdCheckmark size={18} />
                            Milestone Completed
                         </div>
                       )}

                       {/* Extension Request Approval */}
                       {selectedMilestone.extensionRequest?.status === "Pending" && (
                         <div className="p-4 bg-[#FFF9C4] rounded-xl space-y-3 border border-[#FBC02D]">
                            <p className="text-sm font-bold text-[#827717]">Time Extension Requested: {selectedMilestone.extensionRequest.days} Days</p>
                            <div className="flex gap-2">
                               <button 
                                 onClick={() => handleApproveExtension(selectedMilestone._id, selectedMilestone.extensionRequest.days, selectedMilestone.duration)}
                                 className="flex-1 py-2 bg-[#2D6A4F] text-white font-bold rounded-lg text-sm shadow-sm"
                               >
                                 Approve
                               </button>
                               <button 
                                 onClick={() => handleDisapproveExtension(selectedMilestone._id)}
                                 className="flex-1 py-2 bg-[#B91C1C] text-white font-bold rounded-lg text-sm shadow-sm"
                               >
                                 Disapprove
                               </button>
                            </div>
                         </div>
                       )}

                       {/* Dispute Trigger */}
                       {selectedMilestone.isDisapproved && (
                         <button 
                           onClick={() => {
                             toast.success("Redirecting to Disputes...");
                             navigate("/deal/disputes", { 
                               state: { 
                                 isCreateMode: true, 
                                 dealId: selectedDeal._id,
                                 milestoneId: selectedMilestone._id
                               } 
                             });
                           }}
                           className="w-full py-2 bg-[#B91C1C] text-white font-bold rounded-xl shadow-lg hover:bg-[#991B1B] transition-all flex items-center justify-center gap-2"
                         >
                           Raise a Dispute
                         </button>
                       )}
                    </div>
                  )}
               </div>
            </div>
          ) : activeView === 'addMilestone' ? (
            /* ═══ Add Milestone Form (Buyer Only) ═══ */
            !selectedDeal ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-10 opacity-60">
                 <FiClipboard size={32} className="text-gray-300 mb-4" />
                 <p className="text-sm font-medium">Please select a project first to add milestones</p>
                 <button onClick={() => setActiveView('none')} className="mt-4 text-[#59549F] text-xs font-bold underline">Go Back</button>
              </div>
            ) : String(selectedDeal.startupId?._id || selectedDeal.startupId) !== String(currentUserId) ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-10 opacity-60">
                 <FiClipboard size={32} className="text-gray-300 mb-4" />
                 <p className="text-sm font-medium italic">Only the project creator (Buyer) can add new milestones.</p>
                 <button onClick={() => setActiveView('none')} className="mt-4 text-[#59549F] text-xs font-bold underline">Go Back</button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col space-y-6">
                <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide p-2">
                   {/* Name */}
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Milestone Name</label>
                     <input 
                       type="text"
                       value={tempMilestone.title}
                       onChange={(e) => setTempMilestone({...tempMilestone, title: e.target.value})}
                       className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-sm focus:border-[#59549F] outline-none shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                       placeholder="e.g. Design Completion"
                     />
                   </div>

                   {/* Budget */}
                   <div className="space-y-4">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Budget</label>
                      <div className="flex gap-3">
                        <div className="w-[150px] px-3 py-3 bg-[#FDFDFF] border border-gray-100 rounded-lg text-xs text-gray-400 text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex items-center justify-center">
                          INR - Indian Rupees
                        </div>
                        <input 
                          type="number" 
                          placeholder="Amount"
                          value={tempMilestone.amount}
                          onChange={(e) => setTempMilestone({...tempMilestone, amount: e.target.value})}
                          className="flex-1 px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-lg text-sm outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] font-bold" 
                        />
                      </div>
                   </div>

                   {/* Timeline */}
                   <div className="space-y-4">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Timeline</label>
                      <div className="flex gap-3">
                        <div className="w-[150px] px-3 py-3 bg-[#FDFDFF] border border-gray-100 rounded-lg text-xs text-gray-400 text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex items-center justify-center">
                          Total Days
                        </div>
                        <input 
                          type="text" 
                          placeholder="e.g. 15 Days" 
                          value={tempMilestone.duration}
                          onChange={(e) => setTempMilestone({...tempMilestone, duration: e.target.value})}
                          className="flex-1 px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-lg text-sm outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] font-bold" 
                        />
                      </div>
                   </div>

                   {/* Scope */}
                   <div className="space-y-4">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Scope of work</label>
                      <textarea 
                        placeholder="Describe the deliverables for this milestone..."
                        value={tempMilestone.description}
                        onChange={(e) => setTempMilestone({...tempMilestone, description: e.target.value})}
                        className="w-full h-40 lg:p-6 p-3 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-sm focus:border-[#59549F] outline-none resize-none placeholder:italic shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] leading-relaxed"
                      />
                   </div>
                </div>
              </div>
            )
          ) : (
            /* ═══ Milestone List for Project ═══ */
            <div className="space-y-4">
               {selectedDeal.milestones?.filter(m => m.status === 'Paid' || m.status === 'Completed').map(ms => (
                 <MilestoneCard key={ms._id} ms={ms} onSelect={(m) => setSelectedMilestone(m)} />
               ))}
            </div>
          )}
          </div>

          {/* Static Buttons for Add Milestone */}
          {activeView === 'addMilestone' && selectedDeal && String(selectedDeal.startupId?._id || selectedDeal.startupId) === String(currentUserId) && (
            <div className="pt-2 bg-[#FDFDFF] border-t border-gray-100 shrink-0">
               <div className="flex gap-4">
                  <button 
                    onClick={handleAddMilestoneSubmit}
                    disabled={isSubmitting}
                    className="flex-[2] py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Proceed for Negotiation"}
                  </button>
                  <button 
                    onClick={() => setActiveView('none')}
                    className="flex-1 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all shadow-sm"
                  >
                    Cancel
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomSec;