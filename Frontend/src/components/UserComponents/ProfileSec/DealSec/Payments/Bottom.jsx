import React, { useState, useEffect } from "react";
import { FiPlus, FiArrowLeft, FiPlusCircle, FiChevronDown } from "react-icons/fi";
import { MdOutlinePrivateConnectivity } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

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
          <p className="text-[10px] lg:text-sm text-[#000000] decoration-[#59549F]  w-fit ">
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

const StatCard = ({ label, value, bgColor }) => (
  <div className={`${bgColor} rounded-2xl p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
    <div className="flex items-center gap-2">
      <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
      <h3 className="text-[11px] lg:text-sm lg:font-medium text-[#001032] leading-tight">{label}</h3>
    </div>
    <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
  </div>
);

const Bottom = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    if (deals.length > 0 && location.state?.dealId) {
      const deal = deals.find(d => d._id === location.state.dealId);
      if (deal) {
        setSelectedDeal(deal);
        setSelectedMilestone(deal.milestones?.[0] || null);
      }
    }
  }, [deals, location.state]);

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
      
      // Filter deals: Only show to the actual Startup (Buyer) of the deal
      const paymentDeals = res.data.filter(d => {
        const startupIdStr = d.startupId?._id ? String(d.startupId._id) : (typeof d.startupId === 'string' ? d.startupId : String(d.startupId));
        const isStartupOfThisDeal = startupIdStr === currentUserId;
        
        // Show if Startup has verified (even if status is still Approved) OR if already Documented/Active
        const isVerifiedByMe = d.documentation?.startupVerified;
        const isOfficiallyReady = ["Documented", "Active", "Completed"].includes(d.status);

        return (isVerifiedByMe || isOfficiallyReady) && isStartupOfThisDeal;
      });
      setDeals(paymentDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast.error("Failed to fetch deals");
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!selectedMilestone) return toast.error("Please select a milestone to pay");

    setIsProcessingPayment(true);
    const res = await loadRazorpay();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      setIsProcessingPayment(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const amount = Number(selectedMilestone.amount);
      
      console.log("Creating order for deal:", selectedDeal._id, "milestone:", selectedMilestone._id);
      
      // 1. Create order on backend
      const orderRes = await axios.post(`${serverUrl}/api/payment/create-order`, {
        amount,
        dealId: selectedDeal._id,
        milestoneId: selectedMilestone._id || selectedMilestone.id
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { order } = orderRes.data;
      console.log("Order created:", order);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Investor Portal",
        description: `Payment for ${selectedMilestone.title}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            console.log("Payment success response:", response);
            await axios.post(`${serverUrl}/api/payment/verify-payment`, {
              ...response,
              dealId: selectedDeal._id,
              milestoneId: selectedMilestone._id || selectedMilestone.id
            }, {
              headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Payment Successful!");
            fetchDeals(); // Refresh status
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed");
          } finally {
            setIsProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Payment modal dismissed");
            setIsProcessingPayment(false);
          }
        },
        prefill: {
          name: localStorage.getItem("userName"),
          email: localStorage.getItem("userEmail"),
        },
        theme: { color: "#59549F" },
      };

      console.log("Opening Razorpay modal with options:", options);
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to initiate payment");
      setIsProcessingPayment(false);
    }
  };


  const milestoneBreakdown = selectedMilestone ? {
    amount: Number(selectedMilestone.amount),
    fee: Math.round(Number(selectedMilestone.amount) * 0.2), // 20% Platform Fee
    gst: Math.round(Number(selectedMilestone.amount) * 0.2 * 0.18), // 18% GST on Fee
    total: Math.round(Number(selectedMilestone.amount) + (Number(selectedMilestone.amount) * 0.2 * 1.18))
  } : null;

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF] lg:h-[650px] h-screen overflow-hidden">
      
      {/* ── Left Column ── */}
      <div className={`flex-1 space-y-6 overflow-y-auto scrollbar-hide p-2 ${selectedDeal ? 'hidden lg:block' : 'block'}`}>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Active Deals" value={deals.length} bgColor="bg-[#D8E1F0]" />
          <StatCard label="Pending Payments" value={deals.length} bgColor="bg-[#D8D6F8]" />
          <StatCard label="Overdue Payments" value="0" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Total Payments" value="0" bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-4 px-1">Deals for Payment</h2>
        <div className="space-y-4 pb-20">
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading...</div>
          ) : deals.length === 0 ? (
            <div className="text-center py-10 text-gray-400 italic">No deals awaiting payment</div>
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
      <div className={`w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col gap-4 ${!selectedDeal ? 'hidden lg:flex' : 'flex'}`}>
        
        {selectedDeal && (
          <div className="lg:hidden flex items-center gap-3">
            <button onClick={() => setSelectedDeal(null)} className="p-2 bg-gray-50 rounded-full text-[#59549F]">
              <FiArrowLeft size={20} />
            </button>
            <span className="font-bold text-lg text-[#001032]">Back to Deals</span>
          </div>
        )}

        {selectedDeal ? (
          <div className="flex-1 flex flex-col h-full min-h-0">
            <div className="flex-1 bg-white rounded-2xl m-2 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden min-h-0">
              <div className="flex-1 overflow-y-auto scrollbar-hide p-4 lg:p-6 space-y-4">
                
                <div className="bg-white ">
                  <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-[#000000]">Payment for Milestones</h3>
                      <FiPlusCircle size={22} className="text-[#59549F] cursor-pointer" />
                  </div>

                  <div className="space-y-4">
                      {selectedDeal.milestones?.map((m, idx) => (
                        <div key={m._id || idx} className={`relative bg-[#F9F9FF] rounded-xl p-2 lg:p-4 border transition-all ${selectedMilestone?._id === m._id ? 'border-[#D8D6F8] shadow-md' : 'border-gray-100 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.05)]'}`}>
                          <div className="flex gap-3">
                              <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${selectedMilestone?._id === m._id ? 'bg-[#D8D6F8]' : 'bg-gray-200'}`} />
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold text-[#000000]">{m.title}</h4>
                                <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{m.description}</p>
                                <p className="text-[10px] text-gray-400 mt-1">Timeline - {m.duration}</p>
                              </div>
                              <div className="flex flex-col items-end gap-3 shrink-0">
                                <div className={`text-[8px] px-2 py-0.5 rounded-full font-bold border ${m.status === 'Paid' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-[#D97706] border-orange-100'}`}>
                                    {m.status || 'Pending'}
                                </div>
                                <button 
                                    disabled={m.status === 'Paid'}
                                    onClick={() => setSelectedMilestone(m)}
                                    className={`px-4 py-1.5 rounded-md text-[10px] font-bold shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.25)] transition-all ${selectedMilestone?._id === m._id ? 'bg-[#D8D6F8] text-[#59549F]' : 'bg-gray-100 text-gray-400'}`}
                                >
                                    {m.status === 'Paid' ? 'Completed' : (selectedMilestone?._id === m._id ? 'Pay Now' : 'Select')}
                                </button>
                              </div>
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

                    <div className="p-2 lg:p-8">
                      <div className="grid grid-cols-3 gap-1 lg:gap-3 lg:mb-6 my-3">
                          <div className="bg-[#EEECFD] rounded-xl lg:rounded-2xl p-1 py-5 lg:p-4 flex flex-col items-center justify-center space-y-1 lg:space-y-2 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                            <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium leading-tight">Milestone Amount</p>
                            <p className="text-[9px] lg:text-lg text-[#000000] font-bold">Rs {milestoneBreakdown.amount}</p>
                          </div>
                          <div className="bg-[#F5F5F5] rounded-xl lg:rounded-2xl p-1 lg:p-4 flex flex-col items-center justify-center space-y-1 lg:space-y-2 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                            <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium leading-tight">Platform Fee + GST</p>
                            <p className="text-[9px] lg:text-lg text-gray-400 font-bold">Rs {milestoneBreakdown.fee + milestoneBreakdown.gst}</p>
                          </div>
                          <div className="bg-[#EEECFD] rounded-xl lg:rounded-2xl p-1 lg:p-4 flex flex-col items-center justify-center space-y-1 lg:space-y-2 shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] text-center">
                            <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium leading-tight">Total Payable</p>
                            <p className="text-[9px] lg:text-lg text-[#59549F] font-bold">Rs {milestoneBreakdown.total}</p>
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
              </div>
            </div>

            {selectedMilestone && selectedMilestone.status !== 'Paid' && (
              <div className="mx-2 mt-3">
                <button 
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  className="w-full py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-semibold text-base shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all disabled:opacity-50"
                >
                  {isProcessingPayment ? "Processing..." : `Pay Rs ${selectedMilestone.amount}`}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50 bg-white rounded-[2rem] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 mx-2">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <IoMdCheckmark size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-400">No Deal Selected</h3>
            <p className="text-sm text-gray-400 mt-1 italic">Select a deal from the left to view payment status.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Bottom;