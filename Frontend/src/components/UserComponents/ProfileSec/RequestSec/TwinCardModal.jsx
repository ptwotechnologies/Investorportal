import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const raisedRequestOptions = [
  { id: 1, label: "Connect with Incubators" },
  { id: 2, label: "Require Advisory Service" },
  { id: 3, label: "Require Legal Service" },
  { id: 4, label: "Require CXO Service" },
  { id: 5, label: "Require Compliance Service" },
  { id: 6, label: "Require HR Service" },
  { id: 7, label: "Require Development Service" },
  { id: 8, label: "Require Finance Service" },
  { id: 9, label: "Require Design Service" },
  { id: 10, label: "Require Funding Solutions" },
  { id: 11, label: "Require Marketing Service" },
  { id: 12, label: "Connect with Investors" },
  { id: 13, label: "Require Consultation Service" },
  { id: 14, label: "Other" },
];

const TwinCardModal = ({ onClose, lightbulbImg, lockImg, userRole, userAmount }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [isNextPage, setIsNextPage] = useState(false);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="flex flex-col gap-4 max-w-md w-full">
        
        {/* Card 1: Raise Request */}
        <div className="bg-white rounded-[1.2rem] shadow-2xl p-3 md:p-5 relative overflow-hidden">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose size={18} />
          </button>

          <div className="flex gap-3 md:gap-4 items-start">
            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 blur-[0.5px]">
              <img src={lightbulbImg} alt="Idea" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
            </div>
            
            <div className="flex-1 space-y-2 md:space-y-3">
              <h2 className="text-base md:text-lg font-bold text-[#001032]">Quick Raise</h2>
              
              <div className="space-y-1.5 md:space-y-2 blur-[0.5px] opacity-50">
                <div className="relative">
                  <select 
                    disabled={true}
                    className="w-full p-2 md:p-2.5 pr-8 bg-gray-50 border border-gray-200 rounded-lg appearance-none outline-none text-[11px] md:text-xs text-gray-700 cursor-not-allowed"
                  >
                    <option value="">Select Category</option>
                  </select>
                </div>

                <input 
                  type="text" 
                  disabled={true}
                  placeholder="Brief requirement..."
                  className="w-full p-2 md:p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none text-[11px] md:text-xs text-gray-700 cursor-not-allowed"
                />

                <div className="flex gap-2 items-center">
                  <input 
                    type="text" 
                    disabled={true}
                    placeholder="Budget"
                    className="flex-1 p-2 md:p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none text-[11px] md:text-xs text-gray-700 cursor-not-allowed"
                  />
                  <button 
                    type="button"
                    disabled={true}
                    className="px-4 md:px-5 py-2 md:py-2.5 bg-[#D8D6F8] text-[#59549F] font-bold rounded-lg text-[11px] shrink-0 cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Raised Another Request Locked */}
        <div className="bg-white rounded-[1.2rem] shadow-2xl p-3 md:p-4 relative overflow-hidden transition-all duration-500 border border-gray-100">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-red-50 rounded-xl flex items-center justify-center">
               <img src={lockImg} alt="Locked" className="w-7 h-7 md:w-8 md:h-8 object-contain" />
            </div>

            <div className="flex-1">
              <h2 className="text-sm md:text-base font-bold text-[#001032] leading-tight mb-0.5">
                Limit Reached
              </h2>
              <p className="text-[11px] md:text-xs text-gray-500 leading-snug">
                Your free request limit has been reached. Upgrade to unlock unlimited requests!
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button 
              onClick={() => navigate("/pricing", { 
                state: { 
                  isUpgradeFlow: true, 
                  role: userRole, 
                  currentPlanAmount: userAmount 
                } 
              })}
              className="w-full py-2 bg-[#59549F] text-white rounded-md font-bold text-[11px] md:text-xs flex items-center justify-center gap-2 hover:bg-[#48438a] transition-colors shadow-md active:scale-[0.98]"
            >
              🔒 Unlock Full Access
            </button>
            <button 
              onClick={onClose}
              className="w-full text-center text-[10px] md:text-[11px] font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest"
            >
              Maybe Later
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TwinCardModal;
