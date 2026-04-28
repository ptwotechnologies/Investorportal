import React, { useState, useEffect } from "react";
import { FiPlus, FiArrowLeft, FiPlusCircle, FiChevronDown, FiX } from "react-icons/fi";
import { MdOutlinePrivateConnectivity, MdSecurity, MdOutlineFactCheck, MdOutlineHandshake } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "@/App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Bottom = ({ isCreateMode, setIsCreateMode, initialDealId, initialMilestoneId }) => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]); // All active deals for creation
  const [disputes, setDisputes] = useState([]); // User's existing disputes
  const [selectedDeal, setSelectedDeal] = useState(null);
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
    fetchDeals();
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
  }, [initialDealId, deals, initialMilestoneId]);

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

  const fetchDeals = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/deals/my-deals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeals(res.data.filter(d => d.status === "Active" || d.status === "Documented" || d.status === "Approved" || d.status === "Completed"));
    } catch (error) {
      console.error("Error fetching deals:", error);
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
    <div className={`${bgColor} rounded-2xl p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <MdOutlineFactCheck size={20} className="text-[#001032]" />
        <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032] leading-tight">{label}</h3>
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
        <div className="grid grid-cols-3 gap-2 lg:gap-2 mb-4 items-start">
          <div className="flex flex-col">
            <h3 className="lg:text-xl lg:text-[16px] font-medium text-[#000000] leading-tight truncate">{companyName}</h3>
          </div>
          <div className="flex flex-col lg:items-center">
            <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Due Date</p>
          </div>
          <div className="flex flex-col lg:items-end">
            <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Price</p>
          </div>

          <div className="flex flex-col -mt-1">
            <p className="text-[10px] lg:text-sm text-[#000000] decoration-[#59549F] underline-offset-4 w-fit truncate">
              {proj.scopeItems?.[0] || "Mobile App Development"}
            </p>
          </div>
          <div className="flex flex-col lg:items-center -mt-1">
            <p className="text-[10px] lg:text-sm text-[#000000]">1 March, 2026</p>
          </div>
          <div className="flex flex-col lg:items-end -mt-1">
            <p className="text-[10px] lg:text-sm text-[#000000]">Rs {proj.totalAmount || 0}</p>
          </div>
        </div>
        <div className="col-span-3 mb-2">
          <p className="text-[10px] lg:text-sm text-[#000000] opacity-70">{ownerName}</p>
        </div>
        <button 
          onClick={() => onSelect(proj)}
          className="w-full mt-2 py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-xl text-[#59549F] font-medium text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
        >
          View Details
        </button>
      </div>
    );
  };

  const DisputeItem = ({ dispute, deal }) => (
    <div className="space-y-3 mb-8 last:mb-0 rounded-2xl p-3 lg:p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between px-2">
        <h4 className="text-sm lg:text-base font-medium text-[#001032]">Dispute ID – {getDisplayId(dispute._id)}</h4>
        <span className="bg-[#B91C1C] text-white text-[6px] lg:text-[10px] px-1 lg:px-3 py-1 rounded-full lg:font-semibold">
          Duration - 20 Days
        </span>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-4 lg:p-4 lg:px-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2">
        <h5 className="text-sm lg:text-base font-semibold text-[#001032]">
          {deal?.milestones?.find(m => m._id === dispute.milestoneId)?.title || "Milestone 1"}
        </h5>
        <p className="text-[12px] lg:text-xs text-[#001032]/70 lg:font-medium leading-relaxed">
          <span className="text-[#59549F] lg:font-semibold italic">Reason</span> – {dispute.reason}
        </p>
        <p className="text-[12px] lg:text-xs text-[#001032]/70 ">
          <span className="text-[#59549F] lg:font-semibold italic">Amount</span> – Rs {dispute.amount}
        </p>
        <div className="flex justify-end mt-2">
          <button 
            onClick={() => setSelectedDispute(dispute)}
            className="px-6 py-2 bg-[#D8D6F8] text-[#59549F] rounded-lg text-[10px] lg:text-xs font-semibold shadow-sm hover:opacity-90"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const displayDeals = isCreateMode ? deals : disputes.map(d => d.dealId).filter((v, i, a) => a.findIndex(t => t._id === v._id) === i);

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF] lg:h-[660px] h-screen overflow-hidden">
      
      {/* ── Left Column ── */}
      <div className={`flex-1 space-y-6 overflow-y-auto scrollbar-hide p-2 ${ (selectedDeal || selectedDispute) ? 'hidden lg:block' : 'block'}`}>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Total Disputes" value="9" bgColor="bg-[#D8E1F0]" />
          <StatCard label="Active Disputes" value="4" bgColor="bg-[#D8D6F8]" />
          <StatCard label="Resolved" value="3" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Escalated" value="4" bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-4 px-1">{isCreateMode ? "Select Project to Dispute" : "Case List"}</h2>
        
        <div className="space-y-6 pb-20">
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
            <div className="text-center py-20 text-gray-400 italic">No case list found</div>
          )}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column ── */}
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col gap-4 overflow-hidden ${(!selectedDeal && !selectedDispute) ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Main Content Area (Right) */}
        {selectedDeal || selectedDispute ? (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className={`flex-1 overflow-y-auto scrollbar-hide space-y-6 p-2 lg:p-4`}>
              
              {isCreateMode && selectedDeal && !selectedDispute ? (
                /* ── Create View ── */
                <div className="space-y-6">
                  <div className="flex items-center gap-3 px-2">
                    <button 
                      onClick={() => setSelectedDeal(null)} 
                      className="p-1.5 bg-gray-50 rounded-full text-[#59549F] shadow-sm hover:bg-gray-100"
                    >
                      <FiArrowLeft size={18} />
                    </button>
                    <h4 className="text-base font-semibold text-[#001032]">Dispute ID – DSP-2026-CO003921</h4>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-3">
                    <h5 className="text-sm font-semibold text-[#001032]">Milestones</h5>
                    <select 
                      className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs outline-none shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.1)]"
                      value={formData.milestoneId}
                      onChange={(e) => setFormData({...formData, milestoneId: e.target.value})}
                    >
                      <option value="">Select a milestone</option>
                      {selectedDeal.milestones?.map(m => (
                        <option key={m._id || m.id} value={m._id || m.id}>{m.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] space-y-3">
                    <h5 className="text-sm font-semibold text-[#001032]">Amount</h5>
                    <input 
                      type="number"
                      placeholder="INR - Indian Rupees"
                      className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs outline-none shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.1)]"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-[#001032] px-2">Reason</h5>
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                      <textarea 
                        className="w-full min-h-[100px] text-xs outline-none bg-transparent"
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

                  <div className="space-y-4 pt-4">
                    <button onClick={handleEscalate} className="w-full py-2 bg-[#FBD5D5] hover:bg-[#F9C1C1] rounded-xl text-[#B91C1C] font-semibold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.15)] transition-all">
                      Escalate
                    </button>
                    <button onClick={() => navigate('/deal/communication', { state: { dealId: selectedDeal._id } })} className="w-full py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-xl text-[#59549F] font-semibold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all">
                      Proceed for Communication
                    </button>
                  </div>
                </div>
              ) : selectedDispute ? (
                /* ── Detail View (Second Figma Screen) ── */
                <div className="space-y-6">
                  <div className="flex items-center gap-3 px-2">
                    <button 
                      onClick={() => setSelectedDispute(null)} 
                      className="p-1.5 bg-gray-50 rounded-full text-[#59549F] shadow-sm hover:bg-gray-100"
                    >
                      <FiArrowLeft size={18} />
                    </button>
                    <h4 className="text-sm lg:text-base font-bold text-[#001032] underline decoration-blue-500 underline-offset-4 decoration-2">
                      Dispute ID – {getDisplayId(selectedDispute._id)}
                    </h4>
                    <div className="flex-1" />
                    <span className="bg-[#B91C1C] text-white text-[10px] px-3 py-1.5 rounded-lg font-bold shadow-sm">
                      Duration - 20 Days
                    </span>
                  </div>

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

                  {/* Wide Button at Bottom */}
                  <div className="pt-6">
                    <button 
                      onClick={() => navigate('/deal/communication', { state: { dealId: selectedDeal._id, disputeId: selectedDispute._id } })}
                      className="w-full py-3 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-xl text-[#59549F] font-bold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
                    >
                      Proceed for Communication
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Disputes List View (First Figma Screen, Right Side) ── */
                <div className="space-y-4 mt-2">
                  {disputes.filter(d => d.dealId._id === selectedDeal._id).map((dispute) => (
                    <DisputeItem key={dispute._id} dispute={dispute} deal={selectedDeal} />
                  ))}
                  {disputes.filter(d => d.dealId._id === selectedDeal._id).length === 0 && (
                     <div className="text-center py-20 text-gray-400 italic">No disputes raised for this project yet.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Empty Selection State */
          <div className="mx-2 my-2 flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50 bg-white rounded-3xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 ">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MdOutlineFactCheck size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-400">No Case Selected</h3>
            <p className="text-sm text-gray-400 mt-1 italic">Select a case from the list to view active disputes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bottom;