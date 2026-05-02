import React, { useState, useEffect } from "react";
import { FiFileText, FiPlus, FiArrowLeft, FiClipboard } from "react-icons/fi";
import { MdOutlineFactCheck } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "@/App";

const Bottom = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null); 
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const userStr = localStorage.getItem("user");
  const userData = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCompletedDeals();
  }, []);

  const fetchCompletedDeals = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/deals/my-deals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Filter for deals that are marked as Completed
      // or deals where ALL milestones are Completed
      const completedDeals = res.data.filter(d => 
        d.status === "Completed" || 
        (d.milestones?.length > 0 && d.milestones.every(m => m.status === 'Completed'))
      );
      setDeals(completedDeals);
    } catch (error) {
      console.error("Error fetching completed deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ label, value, bgColor }) => (
    <div className={`${bgColor} rounded-2xl p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <FiFileText size={20} className="text-[#001032]" />
        <h3 className="text-[10px] lg:text-sm lg:font-semibold text-[#001032] leading-tight">{label}</h3>
      </div>
      <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
    </div>
  );

  const ProjectCard = ({ deal, isSelected, onSelect }) => {
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

    return (
      <div className={`bg-white rounded-2xl p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all ${isSelected ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col">
            <h3 className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap leading-tight">
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

  const MilestoneCard = ({ ms }) => (
    <div className="bg-[#F3F3F3] rounded-2xl p-4 flex items-end justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-3 h-3 rounded-full bg-[#D8D6F8] mt-1.5" />
        <div>
          <h4 className="text-sm text-[#001032] font-semibold">{ms.title}</h4>
          <p className="text-[10px] text-gray-400 mt-1">{ms.description || "Project milestone successfully completed"}</p>
          <p className="text-[9px] text-gray-400">Timeline - {ms.duration || "20 Days"}</p>
        </div>
      </div>
      <div className="bg-[#D7EBE4] text-[#2D6A4F] text-[10px] font-bold px-4 py-1.5 rounded-md shadow-sm border border-[#2D6A4F]/20">Completed</div>
    </div>
  );

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF] lg:h-[640px] h-screen overflow-hidden">
      
      {/* ── Left Column: Project List ── */}
      <div className={`flex-1 flex flex-col gap-6 overflow-hidden ${selectedDeal ? 'hidden lg:flex' : 'flex'}`}>
        <div className="grid grid-cols-2 gap-4 shrink-0">
          <StatCard label="Total Completed" value={deals.length} bgColor="bg-[#D8E1F0]" />
          <StatCard label="Total Value" value={`Rs ${deals.reduce((acc, d) => acc + (d.totalAmount || 0), 0)}`} bgColor="bg-[#D8D6F8]" />
          <StatCard label="Success Rate" value={deals.length > 0 ? "100%" : "0%"} bgColor="bg-[#D7EBE4]" />
          <StatCard 
            label="Average Days" 
            value={deals.length > 0 ? Math.round(deals.reduce((acc, d) => acc + (parseInt(d.totalTimeline) || 0), 0) / deals.length) : 0} 
            bgColor="bg-[#EFDBD9]" 
          />
        </div>

        <h2 className="text-xl font-medium text-[#000000] px-1 shrink-0">Finished Projects</h2>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 p-2">
          {deals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-40 text-center gap-4">
               <FiClipboard size={32} />
               <p className="text-sm font-medium italic">No completed projects found yet.</p>
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

      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column: Details ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col overflow-y-auto scrollbar-hide p-2 gap-6 ${selectedDeal ? 'flex' : 'hidden lg:flex'}`}>
        
        {/* Mobile Back Button */}
        {selectedDeal && (
          <button 
            onClick={() => setSelectedDeal(null)}
            className="lg:hidden flex items-center gap-2 text-[#59549F] font-semibold mb-2"
          >
            <FiArrowLeft size={18} />
            Back to List
          </button>
        )}

        {/* Content Area */}
        {!selectedDeal ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50 bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 rounded-2xl h-full min-h-[500px]">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MdOutlineFactCheck size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-400">No Project Selected</h3>
            <p className="text-sm text-gray-400 mt-1 italic">Select a completed project from the left to view details.</p>
          </div>
        ) : (
          <>
            {/* Success Rate Card */}
            <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-4">
               <h3 className="text-lg font-semibold text-[#001032]">Success Rate</h3>
               <p className="text-sm text-[#001032]/70 leading-relaxed">
                 90% as per analysis about work flow, disputes and timely delivery
               </p>
               <button className="w-full py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] text-[#59549F] rounded-xl font-bold shadow-sm transition-all">
                 View Details
               </button>
            </div>

            {/* Total Value Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
               <h3 className="text-lg font-semibold text-[#001032]">Total Value</h3>
               <div className="flex flex-col lg:flex-row gap-3">
                  <div className="bg-[#FDFDFF] px-4 py-3 rounded-lg border border-gray-100 text-[10px] text-gray-400 font-bold shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1 text-center">
                    INR - Indian Rupees
                  </div>
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-100 text-[10px] text-gray-400 font-bold shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1 text-center">
                    {`Rs ${selectedDeal.milestones?.length ? Math.min(...selectedDeal.milestones.map(m => m.amount || 0)) : 0}`}
                  </div>
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-100 text-[10px] text-gray-400 font-bold shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1 text-center">
                    {`Rs ${selectedDeal.milestones?.length ? Math.max(...selectedDeal.milestones.map(m => m.amount || 0)) : 0}`}
                  </div>
               </div>
            </div>

            {/* Completed Date Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
               <h3 className="text-lg font-semibold text-[#001032]">Completed Date</h3>
               <div className="flex flex-col lg:flex-row gap-3">
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-100 text-[10px] text-gray-400 font-bold shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1 text-center">
                    {selectedDeal.updatedAt ? new Date(selectedDeal.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "N/A"}
                  </div>
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-100 text-[10px] text-gray-400 font-bold shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1 text-center">
                    From
                  </div>
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-100 text-[10px] text-gray-400 font-bold shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex-1 text-center">
                    To
                  </div>
               </div>
            </div>

            {/* Released Funds Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 lg:p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-6">
               <h3 className="text-lg font-semibold text-[#001032]">Released Funds</h3>
               <div className="space-y-4">
                  {selectedDeal.milestones?.length > 0 ? selectedDeal.milestones.map((ms) => (
                    <div key={ms._id} className="bg-[#F3F3F3] rounded-2xl p-4 flex items-center justify-between gap-4">
                       <div className="flex items-start gap-3">
                          <div className="w-3 h-3 rounded-full bg-[#D8D6F8] mt-1.5 shrink-0" />
                          <div>
                             <h4 className="text-sm font-semibold text-[#001032]">{ms.title}</h4>
                             <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{ms.description || "Milestone successfully released"}</p>
                             <p className="text-[9px] text-gray-400">Due Date - {ms.duration || "N/A"}</p>
                          </div>
                       </div>
                       <div className="bg-[#D8D6F8] text-[#59549F] text-[10px] font-bold px-4 py-1.5 rounded-md shadow-sm whitespace-nowrap">
                         Completed
                       </div>
                    </div>
                  )) : (
                    <div className="text-center py-10 opacity-30 italic text-sm">No released funds found.</div>
                  )}
               </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Bottom;
