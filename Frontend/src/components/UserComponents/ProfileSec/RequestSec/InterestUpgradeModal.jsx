import React from "react";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const InterestUpgradeModal = ({ onClose, userRole, userAmount }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-[#fdf9f0] border border-[#f5e6cc] rounded-[1.5rem] shadow-2xl max-w-sm w-full p-6 relative overflow-hidden transition-all duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200/50 rounded-full transition-colors"
        >
          <IoClose size={20} />
        </button>

        {/* Header Section with Icon and Text */}
        <div className="flex items-start gap-4 mb-3 pt-1">
          <div className="shrink-0 w-14 h-14 bg-[#fff2d6] rounded-full flex items-center justify-center shadow-inner relative overflow-hidden">
             <div className="absolute inset-0 bg-radial from-white/40 to-transparent"></div>
             <FaStar size={24} className="text-[#f9b233] drop-shadow-md" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-[13px] font-bold text-[#001032] leading-tight mb-1">
              Free Plan: <span className="font-medium text-gray-600">You've used 1 / 1 interests.</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              More opportunities are waiting for you!
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200/60 mb-5"></div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => navigate("/pricing", { 
              state: { 
                isUpgradeFlow: true, 
                role: userRole, 
                currentPlanAmount: userAmount 
              } 
            })}
            className="w-full py-2 bg-[#59549F] text-white rounded-md font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#48438a] transition-all shadow-md active:scale-95"
          >
            🔒 Upgrade Now
          </button>
          
          <button 
            onClick={() => navigate("/pricing", { 
              state: { 
                isUpgradeFlow: true, 
                role: userRole, 
                currentPlanAmount: userAmount 
              } 
            })}
            className="py-1 text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors tracking-widest uppercase"
          >
            Unlock Full Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestUpgradeModal;
