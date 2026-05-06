import React from "react";
import { MdOutlinePrivateConnectivity } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const AnalyticsBottomSec = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-4 lg:py-4 bg-[#FDFDFF]">
      
      {/* ── LEFT COLUMN ── */}
      <div className="flex-1 space-y-4 max-h-[610px] overflow-y-auto scrollbar-hide p-2">
        
        {/* Summary Cards Grid */} 
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#D8E1F0] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Total Deals</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">0</p>
          </div>
          <div className="bg-[#D8D6F8] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Total Deal Value</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">₹0</p>
          </div>
          <div className="bg-[#EFDBD9] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Completed Deals</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">0</p>
          </div>
          <div className="bg-[#D7EBE4] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] p-4 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MdOutlinePrivateConnectivity size={20} className="text-[#001032]" />
              <h3 className="text-[10px] lg:text-sm lg:font-medium text-[#001032]">Success Rate</h3>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#001032]">0%</p>
          </div>
        </div>

        <h2 className="text-xl font-medium text-[#000000] mt-2 mb-4 px-1">Detailed Reports</h2>
        <div className="text-center py-20 text-gray-400 italic bg-white rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100">
          No analytics data available for the selected period
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="lg:w-[450px] xl:w-[550px] mt-5 lg:mt-auto flex flex-col hidden lg:block">
        <div className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 m-2 rounded-2xl h-[610px] flex flex-col items-center justify-center text-center p-10 opacity-50">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-[#D8D6F8]">
            <IoMdCheckmark size={40} />
          </div>
          <h3 className="text-lg font-bold text-gray-400">Insights Panel</h3>
          <p className="text-sm text-gray-400 mt-1 italic">
            Select a report category to see detailed insights and graphical representations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBottomSec;
