import React from "react";
import { MdOutlinePrivateConnectivity } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const AnalyticsBottomSec = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-2  lg:px-4 lg:py-2 bg-[#FDFDFF] lg:h-[640px] h-auto overflow-hidden">
      
      {/* ── LEFT COLUMN ── */}
      <div className="flex-1 flex flex-col lg:py-2 gap-6 overflow-hidden">
        
        {/* Summary Cards Grid */} 
        <div className="grid grid-cols-2 px-2 gap-4 shrink-0">
          <div className="bg-[#D8E1F0] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] px-2 py-4 lg:p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[13px] lg:text-sm lg:font-medium text-[#001032]">Total Deals</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">0</p>
          </div>
          <div className="bg-[#D8D6F8] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] px-2 py-4 lg:p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[13px] lg:text-sm lg:font-medium text-[#001032]">Total Deal Value</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">₹0</p>
          </div>
          <div className="bg-[#EFDBD9] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]   px-2 py-4 lg:p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[13px] lg:text-sm lg:font-medium text-[#001032]">Completed Deals</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">0</p>
          </div>
          <div className="bg-[#D7EBE4] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]   px-2 py-4 lg:p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[13px] lg:text-sm lg:font-medium text-[#001032]">Success Rate</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">0%</p>
          </div>
        </div>

        <h2 className="text-xl font-medium text-[#000000] px-1 shrink-0 px-2">Detailed Reports</h2>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide p-2 w-[90%] lg:w-auto mx-auto">
          <div className="flex flex-col items-center gap-4 lg:p-8 p-5 text-center border border-gray-300 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded-md bg-white w-full max-w-sm mx-auto lg:my-10">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No analytics data</h3>
              <p className="text-sm text-gray-500">Detailed insights and reports will appear here as you complete more deals.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-px bg-gray-200 self-stretch  my-2" />

      {/* ── RIGHT COLUMN ── */}
      <div className="w-full lg:w-[450px] xl:w-[550px] h-full flex flex-col overflow-hidden hidden lg:flex">
        
        <div className="flex-1 flex flex-col overflow-hidden bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 m-2 rounded-2xl relative">
          <div className="flex-1 flex flex-col items-center justify-center h-full p-10 text-center opacity-50">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-[#D8D6F8]">
              <IoMdCheckmark size={40} />
            </div>
            <h3 className="text-lg font-bold text-gray-400">No Category Selected</h3>
            <p className="text-sm text-gray-400 mt-1 italic">Select a report category from the left to see detailed insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBottomSec;
