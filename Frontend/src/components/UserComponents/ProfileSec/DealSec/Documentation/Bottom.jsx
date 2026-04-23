import React, { useState } from "react";
import { FiPlus, FiArrowLeft, FiSearch } from "react-icons/fi";
import { MdOutlinePrivateConnectivity } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const Bottom = () => {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [step, setStep] = useState('overview'); // 'overview' or 'verification'
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("8766270884");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const deals = [
    {
      id: 1,
      name: "Parikalpna",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "Rs 1,50,000",
      duration: "20 Days",
      scopeText: `These Terms and Conditions (“Terms”) govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (“Portal”) operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated]. These Terms and Conditions (“Terms”) govern the access to and use of the website and collaboration portal available at https://collaboration.copteno.com (“Portal”) operated by Copteno Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at [Registered Office: To be updated].`,
    },
    {
      id: 2,
      name: "Aetherweb",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "Rs 1,50,000",
      duration: "20 Days",
      scopeText: "Agreement content for Aetherweb...",
    },
    {
      id: 3,
      name: "Lawkase",
      subtitle: "Mobile App Development",
      owner: "Akshay Dogra",
      dueDate: "1 March, 2026",
      price: "Rs 1,50,000",
      duration: "20 Days",
      scopeText: "Agreement content for Lawkase...",
    }
  ];

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

  const StatCard = ({ label, value, bgColor }) => (
    <div className={`${bgColor} rounded-2xl p-4 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
        <h3 className="text-[9px] lg:text-sm lg:font-medium text-[#001032]">{label}</h3>
      </div>
      <p className="text-xl lg:text-2xl font-bold text-[#001032]">{value}</p>
    </div>
  );

  const DealCard = ({ deal }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border-2 transition-all ${selectedDeal?.id === deal.id ? 'border-[#D8D6F8]' : 'border-transparent'}`}>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-[#000000]">{deal.name}</h3>
          <p className="text-xs text-gray-500 font-medium">{deal.subtitle}</p>
          <p className="text-xs text-[#000000] font-medium">{deal.owner}</p>
        </div>
        <div className="space-y-3 text-center">
          <h3 className="text-base font-semibold text-[#000000]">Due Date</h3>
          <p className="text-xs text-gray-500 font-medium">{deal.dueDate}</p>
        </div>
        <div className="space-y-3 text-right">
          <h3 className="text-base font-semibold text-[#000000]">Price</h3>
          <p className="text-xs text-gray-500 font-medium">{deal.price}</p>
        </div>
      </div>
      <button 
        onClick={() => {
          setSelectedDeal(deal);
          setStep('overview');
        }}
        className="w-full mt-2 py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-bold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all"
      >
        View Details
      </button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF] h-[630px] overflow-hidden">
      
      {/* ── Left Column: Stats & Deals ── */}
      <div className={`flex-1 space-y-6 overflow-y-auto scrollbar-hide p-2 h-[600px] ${selectedDeal ? 'hidden lg:block' : 'block'}`}>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Total Documents" value="16" bgColor="bg-[#D8E1F0]" />
          <StatCard label="Pending Signatures" value="4" bgColor="bg-[#D8D6F8]" />
          <StatCard label="Overdue Documents" value="3" bgColor="bg-[#EFDBD9]" />
          <StatCard label="Completed Documents" value="12" bgColor="bg-[#D7EBE4]" />
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-4 px-1">Deals</h2>
        <div className="space-y-4">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>

      {/* ── Vertical Divider ── */}
      <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2" />

      {/* ── Right Column: Interactive Content ── */}
      <div className={`w-full lg:w-[450px] xl:w-[600px] h-[600px] overflow-y-auto scrollbar-hide p-2 flex flex-col ${!selectedDeal ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Back navigation behavior */}
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
                    Duration - {selectedDeal.duration}
                  </span>
                </div>

                {/* Agreement Scroll Box */}
                <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 lg:p-8 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] h-[400px] overflow-y-auto scrollbar-hide">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-semibold  text-[#000000] mb-2">Scope of work in milestone 1</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{selectedDeal.scopeText}</p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-[#000000] mb-2">Term and conditions</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{selectedDeal.scopeText}</p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-[#000000] mb-2">Confidentiality</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{selectedDeal.scopeText}</p>
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
                      Duration - {selectedDeal.duration}
                    </span>
                  </div>

                  {/* Step 1 Identity Verification Header */}
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-3 lg:p-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                      <h4 className="text-sm font-semibold text-[#000000] mb-2 ">Step 1 - Identity Verification</h4>
                      <p className="text-[10px] text-gray-500 mb-4 font-medium ">To confirm this agreement, please verify your identity by entering your registered contact number</p>
                      <div className="flex gap-2">
                        <div className="px-2 w-[60px]  bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm  shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)]">
                          +91
                        </div>
                        <input 
                          type="text" 
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1 h-10 bg-white border border-gray-100 rounded-lg px-2 lg:px-4 text-[#000000] text-sm font-semibold shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)] outline-none focus:border-[#D8D6F8]" 
                        />
                        <button className="px-2 lg:px-5  bg-[#D8D6F8] text-[#59549F] rounded-lg text-xs lg:text-sm font-medium shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.15)]">
                          Send
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
                        Didn't receive it yet? <span className="text-[#59549F] cursor-pointer font-bold">Resend</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                   <button className="w-full py-2 bg-[#D8D6F8] hover:bg-[#C9C7F0] rounded-lg text-[#59549F] font-semibold text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] transition-all">
                      Confirm & Proceed for Payment
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