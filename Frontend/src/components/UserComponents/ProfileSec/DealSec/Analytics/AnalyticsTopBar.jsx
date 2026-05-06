import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const AnalyticsTopBar = () => {
  return (
    <div className="bg-white px-4 lg:px-6 lg:pt-6 pt-4 pb-3 border-b border-gray-100 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
        
        {/* Title Section */}
        <div className="flex-shrink-0 text-left w-full lg:w-auto">
          <h1 className="text-2xl font-medium text-[#001032] leading-tight">Analytics</h1>
          <p className="text-[12px] lg:text-sm text-[#000000] mt-1">
            Track your performance and deal statistics
          </p>
        </div>

        {/* Search Row */}
        <div className="flex items-center gap-2 lg:gap-6 w-full lg:flex-1 lg:justify-end">
          <div className="relative flex-1 lg:max-w-[670px] flex items-center rounded-lg lg:rounded-xl justify-between gap-2 lg:gap-6 border pl-2 lg:pl-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] bg-white h-8 lg:h-12 overflow-hidden">
            <div className="flex items-center gap-2 w-full overflow-hidden">
              <div className="text-gray-400 shrink-0">
                <IoSearchOutline size={18} className="lg:hidden" />
                <IoSearchOutline size={22} className="hidden lg:block" />
              </div>
              <input
                type="text"
                placeholder="Search analytics..."
                className="outline-none transition-all placeholder:text-gray-400 w-full text-xs lg:text-base border-none ring-0 focus:ring-0 h-8 lg:h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTopBar;
