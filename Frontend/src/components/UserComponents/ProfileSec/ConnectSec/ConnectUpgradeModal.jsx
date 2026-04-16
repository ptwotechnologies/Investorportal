import React from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import handshakeImg from "../../../../assets/modal/handshake.png";

const ConnectUpgradeModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-hidden">
      {/* Premium Glassmorphism Overlay */}
      <div 
        className="absolute inset-0 bg-[#D8D6F8]/40 backdrop-blur-xs animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Main Container mirroring the screenshot structure */}
      <div className="relative w-full max-w-md flex flex-col items-center animate-in zoom-in-95 fade-in duration-300">
        
        {/* Page-level headers (as seen in screenshot behind/above the modal) */}
        <div className="text-center mb-6 relative z-10 px-4">
          <h1 className="text-xl md:text-2xl font-medium text-[#2D317A] mb-1.5 drop-shadow-sm">
            Unlock Investor Connections
          </h1>
          <p className="text-[#4A4E91]  text-xs md:text-sm mb-1">
            More investors are available to <span className="font-medium">connect right now</span>
          </p>
          <p className="text-[#5A5E9F]/80 text-[10px] md:text-xs max-w-xs mx-auto leading-relaxed">
            You’ve reached your free connection limit. Access more investors and continue building valuable connections.
          </p>
        </div>

        {/* The White Modal Box */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full overflow-hidden relative">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors z-20"
          >
            <IoClose size={24} />
          </button>

          {/* Top Decorative Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-[#D8D6F8]/30 to-transparent pointer-events-none" />

          <div className="p-6 md:p-8 flex flex-col relative z-10">
            <div className="flex flex-col md:flex-row items-center lg:items-start gap-4 md:gap-8">
              
              {/* Illustration Section */}
              <div className="w-26 md:w-30 shrink-0 animate-in slide-in-from-left-4 duration-500">
                <img 
                  src={handshakeImg} 
                  alt="Connect Illustration" 
                  className="w-full h-auto drop-shadow-xl"
                />
              </div>

              {/* Text & List Section */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg md:text-[16px] font-bold text-[#2D317A] mb-1.5 leading-tight">
                  Unlock Investor Connections
                </h2>
                <p className="text-[10px]  text-gray-400 mb-4 uppercase tracking-wider">With Full Access, you can:</p>
                
                <ul className="space-y-2">
                  {[
                    "Connect with multiple investors",
                    "Increase your visibility in investor discovery",
                    "Get higher chances of connection acceptance",
                    "Build stronger deal opportunities"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 justify-center md:justify-start group">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <FaCheck size={8} className="text-green-600" />
                      </div>
                      <span className="text-[11px] text-[#4A4E91]  leading-tight">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="mt-8 flex flex-col items-center gap-3 w-full px-4">
              <button 
                onClick={() => navigate("/pricing")}
                className="w-full max-w-xs py-2 bg-[#59549F] text-white rounded-xl font-bold text-xs md:text-sm shadow-lg shadow-purple-100 hover:bg-[#48438A] transform active:scale-[0.98] transition-all"
              >
                Unlock Investor Access
              </button>
              
              <button 
                onClick={onClose}
                className="text-gray-400 font-bold text-[10px] md:text-xs hover:text-gray-600 transition-colors tracking-wide"
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
