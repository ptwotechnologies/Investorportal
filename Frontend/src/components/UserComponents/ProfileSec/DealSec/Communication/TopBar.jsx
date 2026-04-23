import React from "react";
import { FiPlus } from "react-icons/fi";

const TopBar = ({ onCreateClick }) => {
  return (
    <div className="bg-white px-4 lg:px-6 lg:pt-6 pt-4 pb-3 border-b border-gray-100 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
        {/* Left Section: Title and Subtitle */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl  font-medium text-[#001032] leading-tight">Communication</h1>
          <p className="text-[10px] lg:text-sm text-[#000000]  ">
            Manage all ongoing projects and work progress 
          </p>
        </div>

        {/* Right Section: Search and Action Buttons */}
        <div className="flex items-center gap-2 lg:gap-6 w-full lg:flex-1 lg:justify-end">
          {/* Search Bar */}
          <div className="relative flex-1 lg:max-w-[670px] flex items-center rounded-lg lg:rounded-xl justify-between gap-2 lg:gap-6 border pl-2 lg:pl-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] bg-white h-8 lg:h-12 overflow-hidden">
            <div className="flex items-center gap-2 w-full overflow-hidden">
              <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-gray-300 rounded-full shrink-0 ml-1" />
              <input
                type="text"
                placeholder="Search by projects, milestones or startups"
                className="outline-none transition-all placeholder:text-gray-400 w-full text-xs lg:text-base border-none ring-0 focus:ring-0 h-8 lg:h-12"
              />
            </div>
            <button className="flex items-center justify-center shrink-0 w-[80px] lg:w-[120px] lg:rounded-xl rounded-lg h-full hover:bg-gray-50 transition-all text-[#313131] font-medium text-[10px] lg:text-[15px] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] border-l">
              All Status
            </button>
          </div>

          {/* Communication Button */}
          <button 
            onClick={onCreateClick}
            className="flex items-center justify-center gap-1 lg:gap-2 h-8 lg:h-12 px-3 lg:px-6 bg-[#D8D6F8] lg:rounded-xl rounded-lg hover:opacity-90 transition-all text-[#59549F] font-bold shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
          >
            <FiPlus size={15} className="lg:hidden" />
            <FiPlus size={18} className="hidden lg:block" />
            <span className="text-[10px] lg:text-sm whitespace-nowrap">Communication</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
