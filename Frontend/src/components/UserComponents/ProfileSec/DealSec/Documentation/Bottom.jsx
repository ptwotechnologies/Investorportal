import React, { useState, useEffect } from "react";
import { FiPlus, FiArrowLeft, FiSearch, FiX } from "react-icons/fi";
import { MdOutlinePrivateConnectivity } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from "axios";
import { serverUrl } from "@/App";
import { invalidateSidebarCache } from "../../ProfileSec1.jsx/Sidebar";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ── Sub-Components (Styled like Negotiation/Active Deals) ──

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
        {/* Row 1, Col 1: Real Company Name */}
        <div className="flex flex-col">
          <h3 className="lg:text-xl lg:text-[16px] font-medium text-[#000000] leading-tight">
            {companyName}
          </h3>
        </div>
        {/* Row 1, Col 2: Timeline Label */}
        <div className="flex flex-col lg:items-center">
          <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Timeline</p>
        </div>
        {/* Row 1, Col 3: Price Label */}
        <div className="flex flex-col lg:items-end">
          <p className="text-[10px] lg:text-[16px] text-[#000000] font-medium whitespace-nowrap">Price</p>
        </div>

        {/* Row 2, Col 1: Project Title */}
        <div className="flex flex-col -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000] decoration-[#59549F]  w-fit  ">
            {proj.requestId?.service || "Project Deal"}
          </p>
        </div>
        {/* Row 2, Col 2: Timeline Value */}
        <div className="flex flex-col lg:items-center -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000]">
            {proj.totalTimeline || "N/A"}
          </p>
        </div>
        {/* Row 2, Col 3: Price Value */}
        <div className="flex flex-col lg:items-end -mt-1">
          <p className="text-[10px] lg:text-sm text-[#000000]">Rs {proj.totalAmount || 0}</p>
        </div>

        {/* Row 3, Col 1: Real User Name */}
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
      <h3 className="text-[9px] lg:text-sm lg:font-medium text-[#001032]">{label}</h3>
    </div>
    <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
  </div>
);

const Bottom = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [step, setStep] = useState('overview'); // 'overview' or 'verification'
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  const userStr = localStorage.getItem("user");
  const userData = userStr ? JSON.parse(userStr) : null;
  const currentUserId = userData?._id ? String(userData._id) : (userData?.id ? String(userData.id) : null);
  const isProfessional = selectedDeal?.professionalId?._id === currentUserId || selectedDeal?.professionalId === currentUserId;
  const isStartupUser = selectedDeal && !isProfessional;

  useEffect(() => {
    fetchDeals();
    fetchUserPhone();
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
      const currentId = userData?._id || userData?.id;

      // Show Approved deals only if the current user hasn't verified yet
      const approvedDeals = res.data.filter(d => {
        if (d.status !== "Approved") return false;
        const isStartup = String(d.startupId?._id || d.startupId) === String(currentId);
        const alreadyVerified = isStartup ? d.documentation?.startupVerified : d.documentation?.professionalVerified;
        return !alreadyVerified;
      });
      setDeals(approvedDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast.error("Failed to fetch deals");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPhone = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${serverUrl}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.mobileNumber) {
        setPhoneNumber(res.data.mobileNumber);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log("Recaptcha resolved");
        }
      });
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) return toast.error("Phone number is missing");

    setIsSendingOtp(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!selectedDeal) return;

    if (isOtpVerified) {
      setIsVerifying(true);
      try {
        const token = localStorage.getItem("token");
        await axios.put(`${serverUrl}/api/deals/${selectedDeal._id}`, {
          ...(isStartupUser ? { startupVerified: true } : { professionalVerified: true }),
          ...(isProfessional ? { registrationNumber } : {})
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        invalidateSidebarCache();
        toast.success("Identity verified and deal documented!");
        if (isStartupUser) {
          navigate("/deal/payments", { state: { dealId: selectedDeal._id } });
        } else {
          navigate("/deal/revenue", { state: { dealId: selectedDeal._id } });
        }
      } catch (error) {
        console.error("Failed to update deal status:", error);
        toast.error("Failed to proceed. Please try again.");
      } finally {
        setIsVerifying(false);
      }
      return;
    }

    const code = otp.join("");
    if (code.length < 6) return toast.error("Please enter 6-digit OTP");
    if (!confirmationResult) return toast.error("Please send OTP first");

    setIsVerifying(true);
    try {
      await confirmationResult.confirm(code);
      toast.success("Identity verified successfully!");
      setIsOtpVerified(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP or verification failed.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFinalizeAgreement = async () => {
    // This is now partially merged into handleVerifyOtp's verified state
    // But keeping it as a fallback or for direct calls
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${serverUrl}/api/deals/${selectedDeal._id}`, {
        status: 'Documented',
        registrationNumber
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      invalidateSidebarCache();
      toast.success("Agreement signed and documented!");
      
      const userStr = localStorage.getItem("user");
      const userData = userStr ? JSON.parse(userStr) : null;
      const isProfessional = selectedDeal?.professionalId?._id === String(userData?._id) || selectedDeal?.professionalId === String(userData?._id);

      if (isProfessional) {
        navigate("/deal/revenue", { state: { dealId: selectedDeal._id } });
      } else {
        navigate("/deal/payments", { state: { dealId: selectedDeal._id } });
      }
    } catch (error) {
      console.error("Error finalizing agreement:", error);
      toast.error("Failed to finalize agreement");
    }
  };

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus move
    if (value !== "" && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2  lg:py-4 bg-[#FDFDFF] h-[630px] overflow-hidden relative">
      <div id="recaptcha-container"></div>

      {/* ── Left Column: Stats & Deals ── */}
      <div className={`flex-1 space-y-6 overflow-y-auto scrollbar-hide p-2 h-[600px] ${selectedDeal ? 'hidden lg:block' : 'block'}`}>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Total Documents" value={deals.length} bgColor="bg-[#D8E1F0]" />
          <StatCard label="Pending Signatures" value={deals.filter(d => d.status === 'Approved').length} bgColor="bg-[#D8D6F8]" />
          <StatCard label="Overdue Documents" value="0" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Completed Documents" value="0" bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-4 px-1">Approved Deals</h2>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading deals...</div>
          ) : deals.length === 0 ? (
            <div className="text-center py-10 text-gray-400 italic">No approved deals found</div>
          ) : (
            deals.map(deal => (
              <ProposalCard 
                key={deal._id} 
                proj={deal} 
                selectedProject={selectedDeal}
                handleViewProject={(d) => {
                  setSelectedDeal(d);
                  setStep('overview');
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Vertical Divider ── */}
      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column: Interactive Content ── */}
      <div className={`w-full lg:w-[450px] xl:w-[600px] h-[600px] overflow-y-auto scrollbar-hide p-2 flex flex-col ${!selectedDeal ? 'hidden lg:flex' : 'flex'}`}>
        
        {selectedDeal && (
          <div className="lg:hidden flex items-center gap-3 mb-4">
             <button 
               onClick={() => setSelectedDeal(null)} 
               className="p-2 bg-gray-50 rounded-full text-[#59549F] shadow-sm"
             >
               <FiArrowLeft size={20} />
             </button>
             <span className="font-bold text-lg text-[#000000] ">Back to List</span>
          </div>
        )}

        {selectedDeal ? (
          <div className="flex-1 flex flex-col">
            
            {/* ══ STEP 1: AGREEMENT OVERVIEW ══ */}
            {step === 'overview' && (
              <div className="bg-white rounded-2xl p-3 lg:p-8 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col space-y-4 ">
                <div className="flex items-center justify-between">
                  <h3 className="lg:text-xl text-lg font-semibold text-[#000000]">Agreement & Contract</h3>
                  <span className="bg-[#B91C1C] text-white text-[10px] px-2 lg:px-3 lg:py-1.5 py-1 rounded-full lg:font-semibold shrink-0">
                    Duration - {selectedDeal.totalTimeline}
                  </span>
                </div>

                {/* Agreement Scroll Box */}
                <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 lg:p-8 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] h-[400px] overflow-y-auto scrollbar-hide">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-semibold  text-[#000000] mb-2">Scope of work in milestone 1</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">These Terms and Conditions (“Terms”) govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (“Portal”) operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated]. These Terms and Conditions (“Terms”) govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (“Portal”) operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated].</p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-[#000000] mb-2">Term and conditions</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">These Terms and Conditions (“Terms”) govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (“Portal”) operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated]. These Terms and Conditions (“Terms”) govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (“Portal”) operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated].</p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-[#000000] mb-2">Confidentiality</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">These Terms and Conditions (“Terms”) govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (“Portal”) operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated]. These Terms and Conditions (“Terms”) govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (“Portal”) operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated].</p>
                    </div>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3 ">
                  <input 
                    type="checkbox" 
                    id="agreement" 
                    checked={agreementAccepted}
                    onChange={(e) => setAgreementAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 accent-[#59549F]"
                  />
                  <label htmlFor="agreement" className="text-xs text-[#000000]  leading-relaxed cursor-pointer">
                    I have read all the policies, terms and conditions and ready to sign up the agreement
                  </label>
                </div>

                <button 
                  disabled={!agreementAccepted}
                  onClick={() => setStep('verification')}
                  className={`w-full py-2 rounded-xl font-semibold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all ${agreementAccepted ? 'bg-[#D8D6F8] text-[#59549F] hover:bg-[#C9C7F0]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  Proceed for Verification
                </button>
              </div>
            )}

            {/* ══ STEP 2: VERIFICATION (OTP) ══ */}
            {step === 'verification' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-3 lg:p-8 lg:h-[540px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setStep('overview')} className="p-1 bg-gray-50 rounded-full text-[#59549F] hover:bg-gray-100">
                        <FiArrowLeft size={20} />
                      </button>
                      <h3 className="text-xl font-semibold text-[#000000]">Confirmation</h3>
                    </div>
                    <span className="bg-[#B91C1C] text-white text-[10px] px-3 py-1.5 rounded-full font-semibold">
                      Duration - {selectedDeal.totalTimeline}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Step 1 Identity Verification */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-3 lg:p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                      <h4 className="text-sm font-semibold text-[#000000] mb-2 ">Step 1 - Identity Verification</h4>
                      <p className="text-[10px] text-gray-500 mb-4 font-medium ">To confirm this agreement, please verify your identity by entering your registered contact number</p>
                      
                      <div className="flex gap-2">
                        <div className="px-2 w-[60px] h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-[#000000] text-sm shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] font-semibold">
                          +91
                        </div>
                        <input 
                          type="text" 
                          placeholder="Contact Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1 h-10 bg-white border border-gray-100 rounded-lg px-2 lg:px-4 text-[#000000] text-sm font-semibold shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] outline-none focus:border-[#D8D6F8]" 
                        />
                        <button 
                          onClick={handleSendOtp}
                          disabled={isSendingOtp}
                          className="px-4 lg:px-8 bg-[#D8D6F8] text-[#59549F] rounded-lg text-xs lg:text-sm font-bold shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] disabled:opacity-50"
                        >
                          {isSendingOtp ? "..." : "Send"}
                        </button>
                      </div>
                    </div>

                    {/* Step 2 - Enter OTP */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                      <h4 className="text-sm font-semibold text-[#000000] mb-4 ">Step 2 - Enter 6 digit OTP</h4>
                      <div className="flex justify-between gap-2 mb-4">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            className="w-full aspect-square max-w-[50px] bg-white border border-gray-200 rounded-xl text-center text-lg font-semibold shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] outline-none focus:border-[#D8D6F8]"
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium ">
                        Didn't receive it yet? <span className="text-[#59549F] cursor-pointer font-bold" onClick={handleSendOtp}>Resend</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                   <button 
                     onClick={handleVerifyOtp}
                     disabled={isVerifying}
                     className="w-full py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-semibold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all disabled:opacity-50"
                   >
                      {isVerifying ? "Verifying..." : (
                        isOtpVerified 
                          ? (isStartupUser ? "Confirm & Proceed for Payment" : "Confirm & Proceed to Revenue")
                          : "Confirm & Wait for Deal Activation"
                      )}
                   </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50 bg-white rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 mx-2">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <IoMdCheckmark size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-400">No Document Selected</h3>
            <p className="text-sm text-gray-400 mt-1 italic">Select a deal from the left to view agreement details.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Bottom;