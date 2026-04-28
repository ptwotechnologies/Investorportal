import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiPlus, FiFileText, FiSend, FiPaperclip } from "react-icons/fi";
import { MdOutlineFactCheck } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";

const Bottom = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Milestones");
  const [disputes, setDisputes] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection states
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isThreadOpen, setIsThreadOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchDisputes();
    fetchDeals();
  }, []);

  const fetchDisputes = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/disputes/my-disputes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDisputes(res.data);
      
      if (location.state?.disputeId) {
        const d = res.data.find(disp => disp._id === location.state.disputeId);
        if (d) {
          setSelectedDispute(d);
          setSelectedDeal(d.dealId);
          setIsThreadOpen(true);
          setActiveTab("Disputes");
        }
      }
    } catch (error) {
      console.error("Error fetching disputes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeals = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/deals/my-deals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeals(res.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedDispute) return;

    try {
      const res = await axios.post(`${serverUrl}/api/disputes/message/${selectedDispute._id}`, {
        message: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const updatedDisp = res.data.dispute;
      setDisputes(prev => prev.map(d => d._id === updatedDisp._id ? updatedDisp : d));
      setSelectedDispute(updatedDisp);
      setNewMessage("");
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const getDisplayId = (mongoId) => {
    if (!mongoId) return "DSP-2026-CO000000";
    return `DSP-2026-CO${mongoId.slice(-7).toUpperCase()}`;
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    const publicBaseUrl = "https://pub-cb99bea3292949639f304d67adc5d74e.r2.dev";
    const privateBaseUrl = `https://copteno.c2fc1593db66d893ceff4e23d571cfb6.r2.cloudflarestorage.com`;
    if (imageUrl.startsWith(privateBaseUrl)) return imageUrl.replace(privateBaseUrl, publicBaseUrl);
    return imageUrl.startsWith("http") ? imageUrl : `${serverUrl}${imageUrl}`;
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

  const DisputeSummaryCard = ({ dispute }) => {
    const deal = dispute.dealId;
    const startupName = deal.startupId?.businessDetails?.companyName || "N/A";

    return (
      <div className={`bg-white rounded-2xl p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4 border-2 transition-all ${selectedDispute?._id === dispute._id ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[#001032]">Dispute ID – {getDisplayId(dispute._id)}</h4>
          <span className="bg-[#B91C1C] text-white text-[8px] lg:text-[10px] px-3 py-1 rounded-full font-semibold">Duration - 20 Days</span>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-2">
           <h5 className="text-sm font-bold text-[#001032]">{startupName}</h5>
           <p className="text-[11px] text-gray-500 leading-relaxed">
             <span className="text-[#59549F] font-bold italic">Reason</span> – {dispute.reason}
           </p>
           <p className="text-[11px] text-gray-500">
             <span className="text-[#59549F] font-bold italic">Amount</span> – Rs {dispute.amount}
           </p>
           <div className="flex justify-end pt-2">
             <button 
              onClick={() => {
                setSelectedDispute(dispute);
                setSelectedDeal(dispute.dealId);
                setIsThreadOpen(false);
              }}
              className="px-4 py-1.5 bg-[#D8D6F8] text-[#59549F] text-[10px] font-bold rounded-lg shadow-sm hover:opacity-90"
             >
               View Details
             </button>
           </div>
        </div>
      </div>
    );
  };

  const ProjectCard = ({ deal, isSelected, onSelect }) => {
    const startup = deal.startupId?.businessDetails?.companyName || "N/A";
    const prof = deal.professionalId?.businessDetails;
    const owner = prof ? `${prof.firstName} ${prof.lastName}` : "N/A";

    return (
      <div className={`bg-white rounded-2xl px-4 lg:px-6 py-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all shrink-0 ${isSelected ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
        <div className="grid grid-cols-3 gap-2 mb-4 items-start">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-[#001032] truncate">{startup}</h3>
            <p className="text-[10px] text-gray-400">Mobile App Development</p>
            <p className="text-[10px] text-[#001032] mt-2 opacity-70">{owner}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#001032]">Due Date</span>
            <p className="text-[10px] text-gray-400">1 March, 2026</p>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-bold text-[#001032]">Price</span>
             <p className="text-[10px] text-gray-400">Rs {deal.totalAmount || 0}</p>
          </div>
        </div>
        <button 
          onClick={() => onSelect(deal)}
          className="w-full py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-xl text-[#59549F] font-bold text-xs shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
        >
          View Details
        </button>
      </div>
    );
  };

  const MilestoneDisputeCard = ({ milestone, project, dispute }) => {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4 border border-gray-100">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-sm font-semibold text-[#001032]">Com - MS-2026-CO{milestone._id?.slice(-7).toUpperCase()}</h4>
          <span className="bg-[#B91C1C] text-white text-[8px] lg:text-[10px] px-3 py-1 rounded-full font-bold">Duration - 20 Days</span>
        </div>
        <div className={`bg-white rounded-xl border p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-2 transition-all ${dispute ? 'border-blue-400 border-2' : 'border-gray-100'}`}>
           <h5 className="text-sm font-bold text-[#001032]">{milestone.title}</h5>
           <p className="text-[11px] text-gray-500 leading-relaxed">
             <span className="text-[#59549F] font-bold">Reason</span> – {dispute?.reason || "No issues reported."}
           </p>
           <p className="text-[11px] text-gray-500">
             <span className="text-[#59549F] font-bold">Amount</span> – Rs {milestone.amount}
           </p>
           <div className="flex justify-end pt-2">
             <button 
              disabled={!dispute}
              onClick={() => {
                setSelectedDispute(dispute);
                setSelectedDeal(project);
                setIsThreadOpen(true);
              }}
              className={`px-4 py-1.5 bg-[#D8D6F8] text-[#59549F] text-[10px] font-bold rounded-lg shadow-sm ${!dispute ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
             >
               View Details
             </button>
           </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;

  const renderThreadView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-[#001032] underline decoration-blue-500 underline-offset-4">
          Dispute ID – {getDisplayId(selectedDispute?._id)}
        </h4>
        <span className="bg-[#B91C1C] text-white text-[10px] px-3 py-1.5 rounded-lg font-bold">Duration - 20 Days</span>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-3">
         <h5 className="text-sm font-bold text-[#001032]">
           {selectedDeal?.milestones?.find(m => String(m._id) === String(selectedDispute?.milestoneId))?.title || "Milestone 1"}
         </h5>
         <p className="text-[12px] text-gray-500 leading-relaxed"><span className="text-[#59549F] font-bold">Reason</span> – {selectedDispute?.reason}</p>
         <p className="text-[12px] text-gray-500 font-bold"><span className="text-[#59549F]">Amount</span> – Rs {selectedDispute?.amount}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
         <h5 className="text-sm font-bold text-[#001032]">Evidence Upload</h5>
         <div className="grid grid-cols-2 gap-4">
           {selectedDispute?.evidence?.split(',').filter(u => u).map((url, i) => (
             <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-100">
                <img src={getImageUrl(url)} className="w-full h-full object-cover" alt="evidence" />
             </div>
           ))}
         </div>
      </div>

      <div className="space-y-6 pt-6">
         <h3 className="text-base font-bold text-[#001032]">Communication Thread</h3>
         <div className="space-y-4">
            {selectedDispute?.messages?.map((msg, i) => (
              <div key={i} className="flex flex-col gap-1">
                 <div className="bg-white rounded-2xl p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-50 relative">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
                       <div className="flex-1 flex items-center justify-between">
                          <span className="font-bold text-sm text-[#001032]">
                            {msg.senderId.businessDetails?.companyName || (msg.senderId.businessDetails ? `${msg.senderId.businessDetails.firstName} ${msg.senderId.businessDetails.lastName}` : "User")}
                          </span>
                          <span className="text-[9px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                       </div>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed text-justify">{msg.message}</p>
                    <div className="flex justify-end mt-2">
                       <button className="px-4 py-1 bg-[#D8D6F8] text-[#59549F] text-[10px] font-bold rounded-md">Reply</button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div className="pt-4 space-y-4">
        <div className="relative">
           <input 
             type="text" 
             placeholder="Enter the text" 
             className="w-full pl-4 pr-16 py-4 bg-white border border-gray-200 rounded-xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] text-xs outline-none"
             value={newMessage}
             onChange={(e) => setNewMessage(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
           />
           <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-[#59549F]">
              <button className="hover:opacity-70"><FiPaperclip size={18} /></button>
              <button onClick={handleSendMessage} className="hover:opacity-70"><FiSend size={18} /></button>
           </div>
        </div>
        <div className="space-y-3 pb-10">
           <button className="w-full py-2 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#313131] hover:bg-gray-50 shadow-sm transition-all">Resolution Options</button>
           <button className="w-full py-2 bg-[#004F5B] text-white rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-all">Approve Payment</button>
           <div className="grid grid-cols-2 gap-4">
              <button className="py-2 bg-[#FFEDCF] text-[#FF9D00] rounded-xl text-sm font-bold shadow-sm">Refund Payment</button>
              <button className="py-2 bg-white border border-[#D8D6F8] text-[#59549F] rounded-xl text-sm font-bold shadow-sm">Split Payment</button>
              <button className="py-2 bg-[#CDCDCD] text-[#404040] rounded-xl text-sm font-bold shadow-sm">Request Revision</button>
              <button className="py-2 bg-[#FFD0D0] text-[#BA1E1E] rounded-xl text-sm font-bold shadow-sm">Escalate</button>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-2 lg:py-2 bg-[#FDFDFF] lg:h-[650px] h-screen overflow-hidden">
      
      {/* ── Left Column ── */}
      <div className={`flex-1 flex py-2 flex-col gap-6 overflow-hidden ${ (selectedDeal || selectedDispute) && isThreadOpen ? 'hidden lg:flex' : 'flex'}`}>
        <div className="grid grid-cols-2 gap-4 px-1 shrink-0">
          <StatCard label="Active Conversations" value="16" bgColor="bg-[#D8E1F0]" />
          <StatCard label="Awaiting Response" value="4" bgColor="bg-[#D8D6F8]" />
          <StatCard label="In Discussion" value="3" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Closed Conversations" value="12" bgColor="bg-[#D7EBE4]" />
        </div>

        <div className="flex items-center gap-2 px-1 shrink-0">
          {["Milestones", "Disputes", "Files"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedDeal(null);
                setSelectedDispute(null);
                setIsThreadOpen(false);
              }}
              className={`flex-1 py-1 text-[10px] lg:text-sm font-bold rounded-lg transition-all shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border ${
                activeTab === tab 
                ? "bg-[#D8D6F8] text-[#59549F] border-[#D8D6F8]" 
                : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-6">
          {(activeTab === "Milestones" || activeTab === "Files") ? (
             deals.filter(deal => disputes.some(d => d.dealId?._id === deal._id)).map(deal => (
               <ProjectCard 
                 key={deal._id} 
                 deal={deal} 
                 isSelected={selectedDeal?._id === deal._id} 
                 onSelect={(d) => { setSelectedDeal(d); setSelectedDispute(null); setIsThreadOpen(false); }} 
               />
             ))
          ) : activeTab === "Disputes" ? (
             disputes.map(disp => <DisputeSummaryCard key={disp._id} dispute={disp} />)
          ) : (
            <div className="text-center py-20 text-gray-400 italic">Tab content coming soon</div>
          )}
        </div>
      </div>

      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col overflow-hidden ${(selectedDeal || selectedDispute) ? 'flex' : 'hidden lg:flex'}`}>
        
        {(selectedDeal || selectedDispute) && (
          <div className="flex items-center gap-3 py-2 px-2 shrink-0">
            <button 
                onClick={() => {
                    if (isThreadOpen) setIsThreadOpen(false);
                    else if (activeTab === "Milestones") setSelectedDeal(null);
                    else setSelectedDispute(null);
                }} 
                className="p-1.5 bg-gray-50 rounded-full text-[#59549F] shadow-sm hover:bg-gray-100"
            >
              <FiArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-bold text-[#001032]">
              {isThreadOpen ? "Communication Thread" : (activeTab === "Milestones" ? "Milestones" : (activeTab === "Files" ? "Files" : "Disputes"))}
            </h2>
          </div>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
          {isThreadOpen ? (
            renderThreadView()
          ) : (activeTab === "Milestones" || activeTab === "Files") && selectedDeal && !isThreadOpen ? (
            /* ═══ Milestone List for selected Project (Right Side) ═══ */
            <div className="space-y-6">
               {selectedDeal.milestones?.filter(ms => disputes.some(d => String(d.milestoneId) === String(ms._id) && String(d.dealId?._id) === String(selectedDeal._id))).map(ms => {
                 const msDispute = disputes.find(d => String(d.milestoneId) === String(ms._id) && String(d.dealId?._id) === String(selectedDeal._id));
                 return <MilestoneDisputeCard key={ms._id} milestone={ms} project={selectedDeal} dispute={msDispute} />;
               })}
               {(!selectedDeal.milestones || selectedDeal.milestones.filter(ms => disputes.some(d => String(d.milestoneId) === String(ms._id) && String(d.dealId?._id) === String(selectedDeal._id))).length === 0) && (
                 <div className="text-center py-20 text-gray-400 italic">No disputed {activeTab === "Files" ? "files" : "milestones"} found for this project.</div>
               )}
            </div>
          ) : activeTab === "Disputes" && selectedDispute ? (
             <div className="space-y-6">
               <div className="bg-white rounded-2xl p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col gap-6">
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-bold text-[#001032] truncate">{selectedDispute.dealId?.startupId?.businessDetails?.companyName || "N/A"}</h3>
                      <p className="text-[10px] text-gray-400">Mobile App Development</p>
                      <p className="text-[10px] text-[#001032] mt-2 opacity-70">
                        {selectedDispute.dealId?.professionalId?.businessDetails ? `${selectedDispute.dealId.professionalId.businessDetails.firstName} ${selectedDispute.dealId.professionalId.businessDetails.lastName}` : "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-[#001032]">Due Date</span>
                      <p className="text-[10px] text-gray-400">1 March, 2026</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-[#001032]">Price</span>
                      <p className="text-[10px] text-gray-400">Rs {selectedDispute.dealId?.totalAmount}</p>
                    </div>
                  </div>
                  <button onClick={() => setIsThreadOpen(true)} className="w-full py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-xs shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]">Open Thread</button>
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-40 text-center gap-4">
               <MdOutlineFactCheck size={32} className="text-gray-300" />
               <p className="text-sm font-medium italic">Select a {activeTab === "Milestones" ? "project" : "dispute"} to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bottom;
