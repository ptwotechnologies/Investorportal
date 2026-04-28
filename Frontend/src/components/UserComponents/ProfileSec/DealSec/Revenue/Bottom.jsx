import React, { useState, useEffect } from "react";
import { FiFileText, FiPlus, FiArrowLeft, FiChevronDown } from "react-icons/fi";
import { MdOutlineFactCheck, MdOutlinePrivateConnectivity } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";

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
          <p className="text-[10px] lg:text-sm text-[#000000] decoration-[#59549F] underline-offset-4 w-fit truncate max-w-[100px]">
            {proj.scopeItems?.[0] || "Project Deal"}
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

const StatCard = ({ label, value, bgColor }) => (
  <div className={`${bgColor} rounded-2xl p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
    <div className="flex items-center gap-2">
      <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
      <h3 className="text-[10px] lg:text-sm lg:font-semibold text-[#001032] leading-tight">{label}</h3>
    </div>
    <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
  </div>
);

const Bottom = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${serverUrl}/api/deals/my-deals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userStr = localStorage.getItem("user");
      const userData = userStr ? JSON.parse(userStr) : null;
      const currentUserId = userData?._id ? String(userData._id) : (userData?.id ? String(userData.id) : null);

      // Show Documented (verified), Active or Completed deals ONLY where user is Professional
      const revenueDeals = res.data.filter(d => {
        const profIdStr = d.professionalId?._id ? String(d.professionalId._id) : (typeof d.professionalId === 'string' ? d.professionalId : String(d.professionalId));
        const isProfessionalOfThisDeal = profIdStr === currentUserId;

        // Show ONLY if Professional has verified (even if status is still Approved) OR if already Documented/Active
        const isVerifiedByMe = d.documentation?.professionalVerified;
        const isOfficiallyReady = ["Documented", "Active", "Completed"].includes(d.status);

        return (isVerifiedByMe || isOfficiallyReady) && isProfessionalOfThisDeal;
      });
      setDeals(revenueDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast.error("Failed to fetch deals");
    } finally {
      setLoading(false);
    }
  };

  const milestoneBreakdown = selectedMilestone ? {
    amount: Number(selectedMilestone.amount),
    fee: Math.round(Number(selectedMilestone.amount) * 0.2), // 20% Platform Fee
    gst: Math.round(Number(selectedMilestone.amount) * 0.2 * 0.18), // 18% GST on Fee
    received: Math.round(Number(selectedMilestone.amount) * 0.8) // 80% to professional
  } : null;

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-2 lg:py-2 bg-[#FDFDFF] lg:h-[650px] h-screen overflow-hidden">
      
      {/* ── Left Column ── */}
      <div className={`flex-1 flex py-2 flex-col gap-6 overflow-hidden ${selectedDeal ? 'hidden lg:flex' : 'flex'}`}>
        <div className="grid grid-cols-2 gap-4 shrink-0 px-1">
          <StatCard label="Active Deals" value={deals.length} bgColor="bg-[#D8E1F0]" />
          <StatCard label="Earnings In Progress" value={deals.length} bgColor="bg-[#D8D6F8]" />
          <StatCard label="Pending Release" value="0" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Total Earnings" value="0" bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-semibold text-[#001032] px-1 shrink-0">Revenue Overview</h2>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-1 space-y-4 p-2">
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading...</div>
          ) : deals.length === 0 ? (
            <div className="text-center py-10 text-gray-400 italic">No revenue data available</div>
          ) : (
            deals.map(deal => (
              <ProposalCard 
                key={deal._id} 
                proj={deal} 
                selectedProject={selectedDeal}
                handleViewProject={(d) => {
                  setSelectedDeal(d);
                  setSelectedMilestone(d.milestones?.[0] || null);
                }}
              />
            ))
          )}
        </div>
      </div>

      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col gap-6 overflow-hidden ${selectedDeal ? 'flex' : 'hidden lg:flex'}`}>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide p-1 space-y-6">
          {selectedDeal ? (
            <>
              <button 
                onClick={() => setSelectedDeal(null)}
                className="lg:hidden flex items-center gap-2 text-[#59549F] font-semibold mb-4"
              >
                <div className="p-2 bg-gray-50 rounded-full shadow-sm">
                    <FiArrowLeft size={18} />
                </div>
                Back to List
              </button>

              <div className="bg-white rounded-2xl border border-gray-100 p-4 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-6">
                 <h3 className="text-lg font-semibold text-[#001032]">Revenue for Milestones</h3>

                 <div className="space-y-4">
                    {selectedDeal.milestones?.map((m, idx) => (
                      <div key={m._id || idx} onClick={() => setSelectedMilestone(m)} className={`bg-[#F3F3F3] rounded-2xl p-3 lg:p-4 flex items-end justify-between gap-2 cursor-pointer transition-all ${selectedMilestone?._id === m._id ? 'border-[#D8D6F8] border-2 shadow-md' : 'border-transparent border-2'}`}>
                        <div className="flex items-start gap-2 lg:gap-3 overflow-hidden">
                           <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${m.status === 'Paid' ? 'bg-green-400' : 'bg-[#D8D6F8]'}`} />
                           <div className="overflow-hidden">
                              <h4 className="text-[12px] lg:text-sm font-semibold text-[#001032] truncate">{m.title}</h4>
                              <p className="text-[10px] text-gray-400 mt-1 truncate">{m.description}</p>
                              <p className="text-[9px] text-gray-400 truncate">{m.status === 'Paid' ? 'Payment Received' : 'Payment Pending'}</p>
                           </div>
                        </div>
                        <div className={`text-[10px] font-bold px-3 py-1.5 rounded-md shadow-sm whitespace-nowrap ${m.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                           {m.status === 'Paid' ? 'Received' : 'Pending'}
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              {selectedMilestone && (
                <div className="bg-white mt-6 rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden">
                   <div className="flex items-center justify-between px-6 lg:px-8 py-2 bg-[#F0EDFD] rounded-2xl">
                      <h3 className="text-base font-semibold text-[#000000]">Breakdown</h3>
                      <FiChevronDown size={22} className="text-[#000000] cursor-pointer" />
                   </div>
                   
                   <div className="p-4 lg:p-8">
                      <div className="grid grid-cols-3 gap-1 lg:gap-3 lg:mb-6 my-3">
                         <div className="bg-[#EEECFD] rounded-xl lg:rounded-2xl p-2 py-4 flex flex-col items-center justify-center shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                            <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium leading-tight">Milestone Amount</p>
                            <p className="text-[10px] lg:text-lg text-[#000000] font-bold">Rs {milestoneBreakdown.amount}</p>
                         </div>
                         <div className="bg-[#F5F5F5] rounded-xl lg:rounded-2xl p-2 flex flex-col items-center justify-center shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                            <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium leading-tight">Fees + GST</p>
                            <p className="text-[10px] lg:text-lg text-gray-400 font-bold">Rs {milestoneBreakdown.fee + milestoneBreakdown.gst}</p>
                         </div>
                         <div className="bg-[#EEECFD] rounded-xl lg:rounded-2xl p-2 flex flex-col items-center justify-center shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                            <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium leading-tight">Net Earning</p>
                            <p className="text-[10px] lg:text-lg text-[#59549F] font-bold">Rs {milestoneBreakdown.received}</p>
                         </div>
                      </div>

                      <p className="text-xs text-black font-semibold mb-6">20% platform fees ensures</p>

                      <div className="grid grid-cols-3 gap-2 lg:gap-4">
                          <div className="border border-[#D8D6F8] rounded-xl lg:rounded-2xl p-1 lg:p-2 flex flex-col items-center justify-center shadow-sm bg-white aspect-square lg:aspect-auto">
                            <img src="/paymentsec1.png" alt="Secure payment" className="w-full h-full object-contain" />
                          </div>
                          <div className="border border-[#D8D6F8] rounded-xl lg:rounded-2xl p-1 lg:p-2 flex flex-col items-center justify-center shadow-sm bg-white aspect-square lg:aspect-auto">
                            <img src="/paymentsec2.png" alt="Verified execution" className="w-full h-full object-contain" />
                          </div>
                          <div className="border border-[#D8D6F8] rounded-xl lg:rounded-2xl p-1 lg:p-2 flex flex-col items-center justify-center shadow-sm bg-white aspect-square lg:aspect-auto">
                            <img src="/paymentsec3.png" alt="Dispute protection" className="w-full h-full object-contain" />
                          </div>
                      </div>
                   </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-40 text-center gap-4">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdOutlineFactCheck size={32} className="text-gray-300" />
               </div>
               <p className="text-sm font-medium italic">Select a deal to view revenue details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bottom;
