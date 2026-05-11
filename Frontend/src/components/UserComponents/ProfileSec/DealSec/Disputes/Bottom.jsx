import React, { useState, useEffect } from "react";
import { FiPlus, FiArrowLeft, FiPlusCircle, FiChevronDown, FiX } from "react-icons/fi";
import { MdOutlinePrivateConnectivity, MdSecurity, MdOutlineFactCheck, MdOutlineHandshake } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "@/App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Bottom = ({ 
  isCreateMode, 
  setIsCreateMode, 
  initialDealId, 
  initialMilestoneId, 
  deals, 
  selectedDeal, 
  setSelectedDeal 
}) => {
  const navigate = useNavigate();
  const [disputes, setDisputes] = useState([]); // User's existing disputes
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Helper for R2 public URLs
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    const publicBaseUrl = "https://pub-cb99bea3292949639f304d67adc5d74e.r2.dev";
    const privateBaseUrl = `https://copteno.c2fc1593db66d893ceff4e23d571cfb6.r2.cloudflarestorage.com`;
    if (imageUrl.startsWith(privateBaseUrl)) {
      return imageUrl.replace(privateBaseUrl, publicBaseUrl);
    }
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${serverUrl}${imageUrl}`;
  };

  // Helper for Display ID
  const getDisplayId = (mongoId) => {
    if (!mongoId) return "DSP-2026-C0000000";
    return `DSP-2026-CO${mongoId.slice(-7).toUpperCase()}`;
  };
  
  // Form State
  const [formData, setFormData] = useState({
    milestoneId: "",
    amount: "",
    reason: "",
    evidence: [] // Array of URLs
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDisputes();
  }, []);

  // Handle initial data from routing state
  useEffect(() => {
    if (initialDealId && deals.length > 0) {
      const deal = deals.find(d => String(d._id) === String(initialDealId));
      if (deal) {
        setSelectedDeal(deal);
        if (initialMilestoneId) {
          const m = deal.milestones?.find(ms => String(ms._id) === String(initialMilestoneId));
          setFormData(prev => ({ 
            ...prev, 
            milestoneId: initialMilestoneId,
            amount: m?.amount || ""
          }));
        }
      }
    }
  }, [initialDealId, deals, initialMilestoneId, setSelectedDeal]);

  const fetchDisputes = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/disputes/my-disputes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDisputes(res.data);
    } catch (error) {
      console.error("Error fetching disputes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);
    uploadData.append("type", "dispute-evidence");

    try {
      setIsUploading(true);
      const res = await axios.post(`${serverUrl}/api/disputes/upload-evidence`, uploadData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      
      setFormData(prev => ({
        ...prev,
        evidence: [...prev.evidence, res.data.url]
      }));
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEscalate = async () => {
    if (!selectedDeal || !formData.milestoneId || !formData.reason || !formData.amount) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await axios.post(`${serverUrl}/api/disputes/create`, {
        dealId: selectedDeal._id,
        milestoneId: formData.milestoneId,
        amount: formData.amount,
        reason: formData.reason,
        evidence: formData.evidence.join(",")
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Dispute raised successfully!");
      setIsCreateMode(false);
      setSelectedDeal(null);
      setFormData({ milestoneId: "", amount: "", reason: "", evidence: [] });
      fetchDisputes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to raise dispute");
    }
  };

  const StatCard = ({ label, value, bgColor }) => (
    <div className={`${bgColor} rounded-2xl px-2 py-4 lg:p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <MdOutlineFactCheck size={20} className="text-[#001032]" />
        <h3 className="text-[13px] lg:text-sm lg:font-medium text-[#001032] leading-tight">{label}</h3>
      </div>
      <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
    </div>
  );

  const ProjectCard = ({ proj, isSelected, onSelect }) => {
    const startup = typeof proj.startupId === 'object' ? proj.startupId : {};
    const companyName = startup.businessDetails?.companyName || "N/A";
    const professional = typeof proj.professionalId === 'object' ? proj.professionalId : {};
    const ownerName = professional.businessDetails ? `${professional.businessDetails.firstName} ${professional.businessDetails.lastName}` : "N/A";

    return (
      <div className={`bg-white rounded-2xl px-4 lg:px-6 py-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all shrink-0 ${isSelected ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
        <div className="grid grid-cols-3 gap-2 lg:gap-2 mb-4 items-start w-full">
          {/* Row 1 */}
          <div className="flex flex-col overflow-hidden">
            <h3 className="text-[16px] font-medium text-[#000000] leading-tight truncate">{companyName}</h3>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[16px] text-[#000000] font-medium whitespace-nowrap">Timeline</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[16px] text-[#000000] font-medium whitespace-nowrap">Price</p>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col -mt-1 overflow-hidden">
            <p className="text-[13px] lg:text-sm text-[#000000] truncate">
              {proj.requestId?.service || deals.find(d => d._id === proj._id)?.requestId?.service || "Project Deal"}
            </p>
          </div>
          <div className="flex flex-col items-center -mt-1">
            <p className="text-[13px] lg:text-sm text-[#000000]">{proj.totalTimeline || "N/A"}</p>
          </div>
          <div className="flex flex-col items-end -mt-1">
            <p className="text-[13px] lg:text-sm text-[#000000]">Rs {proj.totalAmount || 0}</p>
          </div>

          {/* Row 3 */}
          <div className="col-span-3 mt-1">
            <p className="text-[13px] lg:text-sm text-[#000000] opacity-70">{ownerName}</p>
          </div>
        </div>

        <button 
          onClick={() => onSelect(proj)}
          className="w-full py-2 bg-[#D8D6F8] rounded-xl text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-all"
        >
          View Details
        </button>
      </div>
    );
  };

  const DisputeItem = ({ dispute, deal }) => (
    <div className="bg-white rounded-xl lg:rounded-2xl p-3 mt-1 shadow-[0px_0px_12px_rgba(0,0,0,0.25)] border border-gray-50 mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-4 px-1">
        <h4 className="lg:text-[15px] text-[11px]  font-medium text-[#001032]">Dispute ID – {getDisplayId(dispute._id)}</h4>
        <span className="bg-[#B91C1C] text-white lg:text-[10px] text-[8px]  px-3 py-1 rounded-full  shadow-sm">
          Duration - 20 Days
        </span>
      </div>
      
      <div className="bg-[#F9FAFB]/50 rounded-xl border border-gray-100 lg:p-3 p-2 lg:px-6 shadow-[0px_0px_12px_rgba(0,0,0,0.25)] space-y-3">
        <h5 className="text-[14px] lg:text-base font-medium text-[#001032]">
          {deal?.milestones?.find(m => m._id === dispute.milestoneId)?.title || "Milestone 1"}
        </h5>
        <p className="text-[10px] text-gray-400 -mt-2 truncate">
          {deal?.requestId?.service || deals.find(d => d._id === (deal?._id || dispute.dealId?._id || dispute.dealId))?.requestId?.service || "Project Deal"}
        </p>
        <div className="space-y-2">
          <p className="text-[12px] lg:text-sm text-gray-500 leading-relaxed line-clamp-2">
            <span className="text-[#59549F] font-medium">Reason</span> – {dispute.reason}
          </p>
          <p className="text-[12px] lg:text-sm text-gray-500 font-medium">
            <span className="text-[#59549F]">Amount</span> – Rs {dispute.amount.toLocaleString()}
          </p>
        </div>
        
        <div className="flex justify-end ">
          <button 
            onClick={() => setSelectedDispute(dispute)}
            className="px-6 py-1 bg-[#D8D6F8] hover:bg-[#C9C7F0] text-[#59549F] rounded-sm text-[11px] lg:text-xs font-bold shadow-[inset_0px_0px_8px_rgba(0,0,0,0.2)] transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const displayDeals = disputes.map(d => d.dealId).filter((v, i, a) => 
    v && a.findIndex(t => t && t._id === v._id) === i
  );

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:px-4 lg:py-1 bg-[#FDFDFF] lg:h-[640px] h-auto overflow-hidden">
      
      {/* ── Left Column ── */}
      <div className={`flex-1 flex flex-col lg:py-2 gap-4 overflow-hidden ${ (selectedDeal || selectedDispute) ? 'hidden lg:flex' : 'flex'}`}>
        <div className="grid grid-cols-2 gap-4 shrink-0 px-2 lg:px-0">
          <StatCard label="Total Disputes" value={disputes.length} bgColor="bg-[#D8E1F0]" />
          <StatCard label="Active Disputes" value={disputes.filter(d => d.status === 'Open' || d.status === 'In-Progress' || !d.status).length} bgColor="bg-[#D8D6F8]" />
          <StatCard label="Resolved" value={disputes.filter(d => d.status === 'Resolved').length} bgColor="bg-[#EFDBD9]" />
          <StatCard label="Escalated" value={disputes.length} bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-medium text-[#000000] px-3 shrink-0">Case List</h2>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 p-2">
          {displayDeals.length > 0 ? (
            displayDeals.map(deal => (
              <ProjectCard 
                key={deal._id} 
                proj={deal} 
                isSelected={selectedDeal?._id === deal._id}
                onSelect={(d) => {
                  setSelectedDeal(d);
                  setSelectedDispute(null);
                  setIsCreateMode(false);
                }}
              />
            ))
          ) : (
            <div className="flex flex-col items-center gap-4 lg:p-8 p-5 text-center border border-gray-300 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded-md bg-white w-[90%] lg:w-auto  max-w-sm mx-auto lg:my-10">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No cases found</h3>
                <p className="text-sm text-gray-500">Your project disputes and case history will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2 ml-1" />

      {/* ── Right Column ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-[calc(100vh-140px)] lg:h-full flex flex-col overflow-hidden ${(selectedDeal || selectedDispute) ? 'flex' : 'hidden lg:flex'}`}>
        
        {/* Header */}
        {(selectedDeal || selectedDispute) && (
          <div className="flex lg:hidden items-center gap-3 py-2 px-4 shrink-0">
            <button 
                onClick={() => {
                  if (selectedDispute) setSelectedDispute(null);
                  else setSelectedDeal(null);
                }} 
                className="p-1.5 bg-gray-50 rounded-full text-[#59549F] shadow-sm hover:bg-gray-100"
            >
              <FiArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold text-[#001032]">
              {selectedDispute ? "Dispute Details" : isCreateMode ? "Raise Dispute" : "Project Disputes"}
            </h2>
          </div>
        )}

        <div className={`flex-1 flex flex-col overflow-hidden m-2 rounded-2xl relative ${(!selectedDispute && !isCreateMode) ? 'bg-transparent border-none' : 'bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100'}`}>
          <div className="flex-1 overflow-y-auto scrollbar-hide relative pb-32 lg:pb-0">
            {!selectedDeal && !selectedDispute ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-50">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-[#D8D6F8]">
                  <IoMdCheckmark size={40} />
                </div>
                <h3 className="text-lg font-bold text-gray-400">No Case Selected</h3>
                <p className="text-sm text-gray-400 mt-1 italic">Select a case from the list to view active disputes.</p>
              </div>
            ) : isCreateMode && selectedDeal && !selectedDispute ? (
              /* ── Create View ── */
              <div className="p-3 lg:p-4 space-y-4">
                  <div className="bg-white rounded-2xl border border-gray-100 lg:p-5 p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-3">
                    <h5 className="text-sm font-semibold text-[#001032]">Milestones</h5>
                    <select 
                      className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-xs outline-none shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.1)]"
                      value={formData.milestoneId}
                      onChange={(e) => {
                        const mId = e.target.value;
                        const m = selectedDeal.milestones?.find(ms => String(ms._id || ms.id) === String(mId));
                        setFormData({
                          ...formData, 
                          milestoneId: mId,
                          amount: m?.amount || ""
                        });
                      }}
                    >
                      <option value="">Select a milestone</option>
                      {selectedDeal.milestones?.map(m => (
                        <option key={m._id || m.id} value={m._id || m.id}>{m.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 lg:p-5 p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-3">
                    <h5 className="text-sm font-semibold text-[#001032]">Amount</h5>
                    <input 
                      type="number"
                      placeholder="INR - Indian Rupees"
                      className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-xs outline-none shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.1)]"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-[#001032] px-2">Reason</h5>
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                      <textarea 
                        className="w-full min-h-[60px] text-xs outline-none bg-transparent"
                        placeholder="State your reason here..."
                        value={formData.reason}
                        onChange={(e) => setFormData({...formData, reason: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
                    <h4 className="text-sm font-semibold text-[#001032]">Evidence Upload</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Upload the evidence in jpg, pdf and docx format</p>
                    <div className="grid grid-cols-2 gap-4">
                      {formData.evidence?.map((url, i) => (
                        <div key={i} className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                          <img src={getImageUrl(url)} alt="evidence" className="w-full h-full object-cover" />
                          <button 
                            onClick={() => setFormData(prev => ({ ...prev, evidence: prev.evidence.filter((_, idx) => idx !== i) }))}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 z-10"
                          >
                            <FiX size={12} />
                          </button>
                        </div>
                      ))}
                      {formData.evidence?.length < 4 && (
                        <div 
                          onClick={() => document.getElementById('evidence-upload').click()}
                          className="aspect-[4/3] bg-white border-2 border-dashed border-[#D8D6F8] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all text-[#59549F]"
                        >
                          {isUploading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#59549F]"></div> : <FiPlus size={32} />}
                        </div>
                      )}
                    </div>
                    <input type="file" id="evidence-upload" className="hidden" accept="image/*,.pdf,.doc,.docx" onChange={handleFileUpload} />
                  </div>
              </div>
            ) : selectedDispute ? (
              /* ── Detail View ── */
              <div className="p-4 lg:p-6 space-y-6">
                  {/* Info Card */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
                    <h5 className="text-sm lg:text-base font-bold text-[#001032]">
                      {selectedDeal?.milestones?.find(m => m._id === selectedDispute.milestoneId)?.title || "Milestone 1"}
                    </h5>
                    <div className="space-y-3">
                      <p className="text-[12px] lg:text-sm text-gray-500 leading-relaxed">
                        <span className="text-[#59549F] font-bold">Reason</span> – {selectedDispute.reason}
                      </p>
                      <p className="text-[12px] lg:text-sm text-gray-500 font-medium">
                        <span className="text-[#59549F] font-bold">Amount</span> – Rs {selectedDispute.amount}
                      </p>
                    </div>
                  </div>

                  {/* Evidence Display */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-4">
                    <div>
                      <h4 className="text-sm lg:text-base font-bold text-[#001032]">Evidence Upload</h4>
                      <p className="text-[12px] lg:text-xs text-gray-400 mt-1">Upload the evidence in jpg, pdf and docx format</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {selectedDispute.evidence?.split(',').filter(url => url).map((url, i) => (
                        <div key={i} className="aspect-[4/3] bg-white border border-gray-100 rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                          <img src={getImageUrl(url)} alt="evidence" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            ) : (
              /* ── Disputes List View (Project specific) ── */
              <div className="px-2 space-y-4">
                {disputes.filter(d => d.dealId._id === selectedDeal._id).map((dispute) => (
                  <DisputeItem key={dispute._id} dispute={dispute} deal={selectedDeal} />
                ))}
                {disputes.filter(d => d.dealId._id === selectedDeal._id).length === 0 && (
                   <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-40">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <IoMdCheckmark size={30} className="text-gray-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700">No disputes raised</h3>
                      <p className="text-sm text-gray-500">There are no active disputes for this project.</p>
                   </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Footer Buttons - Outside the scrollable area */}
        {(selectedDeal || selectedDispute) && (
          <div className="fixed bottom-0 left-0 right-0 lg:sticky lg:bottom-0 z-50 lg:z-20 px-2 lg:py-2 lg:px-2 bg-[#FDFDFF]/60 backdrop-blur-md lg:bg-transparent shadow-none lg:shadow-none space-y-3">
            {isCreateMode && selectedDeal && !selectedDispute && (
              <>
                <button 
                  onClick={handleEscalate} 
                  className="w-full py-1.5  bg-[#FBD5D5] hover:bg-[#F9C1C1] rounded-lg text-[#B91C1C] font-semibold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.15)] transition-all"
                >
                  Escalate
                </button>
                <button 
                  onClick={() => navigate('/deal/communication', { state: { dealId: selectedDeal._id } })} 
                  className="w-full py-1.5 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-semibold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
                >
                  Proceed for Communication
                </button>
              </>
            )}
            {selectedDispute && (
              <button 
                onClick={() => navigate('/deal/communication', { state: { dealId: selectedDeal._id, disputeId: selectedDispute._id } })}
                className="w-full py-1.5 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-bold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
              >
                Proceed for Communication
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bottom;