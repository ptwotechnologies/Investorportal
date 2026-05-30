import React from "react";
import { IoClose } from "react-icons/io5";

const RequestSuccessModal = ({ isOpen, onClose, onViewRequest }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/25 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-5 bg-white/95 border border-[#59549F]/20 rounded-2xl p-6 sm:p-5 shadow-[0px_12px_40px_rgba(89,84,159,0.2)] max-w-lg w-full animate-in zoom-in-95 duration-200">
        
        {/* Absolute Top-Right Close Button for perfect alignment on both mobile & desktop */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-50 rounded-full cursor-pointer shrink-0"
        >
          <IoClose size={18} />
        </button>

        {/* Left: Elegant glowing rocket badge */}
        <div className="w-13 h-13 rounded-xl bg-gradient-to-tr from-[#59549F] to-[#8F8ACD] flex items-center justify-center text-white text-2xl shrink-0 shadow-[0px_4px_14px_rgba(89,84,159,0.3)] relative">
          <span>🚀</span>
          <div className="absolute inset-0 rounded-xl border border-[#59549F]/30 animate-pulse"></div>
        </div>
        
        {/* Center: Title & message text */}
        <div className="flex-1 text-center sm:text-left min-w-0 pr-0 sm:pr-4">
          <h4 className="font-extrabold text-sm text-[#001032] leading-tight">Request Published!</h4>
          <p className="text-xs text-gray-500 mt-1 leading-normal">
            Your request is now live. Relevant professionals are being notified.
          </p>
        </div>

        {/* Right: Premium CTA button (scales to full width on mobile) */}
        <div className="flex items-center shrink-0 w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0">
          <button
            onClick={onViewRequest}
            className="w-full sm:w-auto bg-gradient-to-r from-[#59549F] to-[#48438A] hover:shadow-[0px_4px_12px_rgba(89,84,159,0.3)] text-white font-bold py-2.5 sm:py-2 px-6 sm:px-4.5 rounded-xl text-xs transition-all duration-300 cursor-pointer shadow-[0px_2px_6px_rgba(89,84,159,0.15)] transform active:scale-95 whitespace-nowrap text-center"
          >
            View Request
          </button>
        </div>

      </div>
    </div>
  );
};

export default RequestSuccessModal;
