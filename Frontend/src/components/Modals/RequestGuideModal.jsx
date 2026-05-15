import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClipboard, FiArrowRight, FiX } from 'react-icons/fi';

const RequestGuideModal = ({ isOpen, onClose, title = "No Pending Requests" }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4  bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-22 bg-[#D8D6F8] flex items-center justify-center overflow-hidden">
            <div className="absolute top-4 right-4">
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors text-[#59549F]"
                >
                    {/* <FiX size={20} /> */}
                </button>
            </div>
            <div className="w-15 h-15 bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                <FiClipboard size={28} className="text-[#59549F]" />
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-[#001032] mb-2">
            {title}
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed mb-6 px-2">
            To get started with a new deal, you first need to raise a service request. 
            Once a service professional is assigned or interested, you'll be able to create and manage deals here.
          </p>

          <div className="space-y-2 px-4">
            <button
              onClick={() => {
                navigate('/request');
                onClose();
              }}
              className="w-full py-1.5 bg-[#59549F] hover:bg-[#48438a] text-white rounded-lg text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              Raise a Request
              <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onClose}
              className="w-full py-1.5 bg-gray-100 hover:bg-gray-100 text-gray-500 rounded-lg text-sm font-semibold transition-all"
            >
              Maybe Later
            </button>
          </div>
        </div>

        {/* Footer/Hint */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest font-bold">
                Professional & Secure Deal Management
            </p>
        </div>
      </div>
    </div>
  );
};

export default RequestGuideModal;
