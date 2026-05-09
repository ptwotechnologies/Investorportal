import React from "react";
import { IoClose } from "react-icons/io5";
import { FaRocket } from "react-icons/fa";

const ComingSoonModal = ({ onClose, title }) => {
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
            {/* 1. Icon on Top */}
            <div className="w-20 h-20 mb-6 animate-in slide-in-from-top-2 duration-500 bg-[#F3F2FF] rounded-full flex items-center justify-center">
              <FaRocket size={40} className="text-[#59549F] drop-shadow-lg" />
            </div>

            {/* 2. Header Content */}
            <div className="text-center w-full mb-6">
               <h1 className="text-xl font-bold text-[#2D317A] mb-2 leading-tight tracking-tight">
                 {title || "Feature Coming Soon"}
               </h1>
               <p className="text-[#5A5E9F] text-[13px] font-medium leading-relaxed max-w-[250px] mx-auto">
                 We're working hard to bring you this feature. <br/> Stay tuned for updates!
               </p>
            </div>

            {/* 3. Buttons Section */}
            <div className="w-full flex flex-col items-center gap-3">
              <button 
                onClick={onClose}
                className="w-full py-2.5 bg-[#59549F] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[#59549F]/30 hover:bg-[#48438A] transform active:scale-[0.98] transition-all tracking-wide"
              >
                Great, thanks!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;
