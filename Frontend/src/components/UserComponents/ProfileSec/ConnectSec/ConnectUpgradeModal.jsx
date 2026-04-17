import React from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import handshakeImg from "../../../../assets/modal/handshake.png";

const ConnectUpgradeModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Standard Neutral Glassmorphism Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-[340px] animate-in zoom-in-95 fade-in duration-300">
        
        {/* The Solid White Modal Box */}
        <div className="bg-white rounded-[2rem] shadow-2xl w-full overflow-hidden relative border border-[#D8D6F8] p-6 pt-10">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-6 text-gray-400 hover:text-gray-600 transition-colors z-20"
          >
            <IoClose size={24} />
          </button>

          <div className="flex flex-col items-center">
            {/* 1. Image on Top */}
            <div className="w-24 mb-6 animate-in slide-in-from-top-2 duration-500">
              <img 
                src={handshakeImg} 
                alt="Connect Illustration" 
                className="w-full h-auto drop-shadow-xl"
              />
            </div>

            {/* 2. Header Content (Combining all messages from your screenshots) */}
            <div className="text-center w-full mb-3">
               <h1 className="text-xl font-medium text-[#2D317A] mb-1 leading-tight tracking-tight">
                 Unlock Investor Connections
               </h1>
               <p className="text-[#5A5E9F] text-[12px] font-semibold mb-1 leading-tight">
                 More investors are available to <span className="text-[#59549F]">connect right now</span>
               </p>
               <p className="text-[#5A5E9F]/80 text-[11px] leading-relaxed max-w-[280px] mx-auto mb-2">
                 You’ve reached your free connection limit. Access more investors and continue building valuable connections.
               </p>
               <p className="text-[#5A5E9F] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] opacity-70">
                 WITH FULL ACCESS, YOU CAN:
               </p>
            </div>

            {/* 3. Benefits List */}
            <div className="w-full mb-8">
              <ul className="space-y-2">
                {[
                  "Connect with multiple investors",
                  "Increase your visibility in investor discovery",
                  "Get higher chances of connection acceptance",
                  "Build stronger deal opportunities"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 justify-start max-w-[260px] mx-auto">
                    <div className="w-4.5 h-4.5 rounded-full bg-green-100 flex items-center justify-center shrink-0 shadow-sm border border-green-200">
                      <FaCheck size={8} className="text-green-600" />
                    </div>
                    <span className="text-[11px] md:text-[11px] text-[#4A4E91] leading-tight">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Buttons Section */}
            <div className="w-full flex flex-col items-center gap-3">
              <button 
                onClick={() => navigate("/pricing")}
                className="w-full py-2 bg-[#59549F] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[#59549F]/30 hover:bg-[#48438A] transform active:scale-[0.98] transition-all tracking-wide"
              >
                Unlock Investor Access
              </button>
              
              <button 
                onClick={onClose}
                className="text-gray-400 font-bold text-xs hover:text-gray-600 transition-colors tracking-wide py-1"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectUpgradeModal;
