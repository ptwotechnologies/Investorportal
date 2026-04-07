import React from "react";
import { RiDraftLine } from "react-icons/ri";

const TopSec = ({ clientName = "Stellar", clientSubtitle = "Mobile App Development" }) => {
  return (
    <div className="pt-2 p-2 px-4">
      {/* Header */}
      <div className="py-2 flex items-center gap-2">
        <RiDraftLine size={20} className="text-gray-600" />
        <h1 className="lg:text-2xl text-xl  text-gray-800">Deal Draft</h1>
      </div>
      <hr className="border-gray-200" />

      {/* Client Info */}
      <div className="mt-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {clientName.charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">{clientName}</h2>
          <p className="text-sm text-gray-500">{clientSubtitle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-500">Prepare a draft deal to send to the service professional.</p>

      {/* Drafting Deal For */}
      <div className="mt-4 flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Drafting Deal for</label>
        <input
          type="text"
          defaultValue={clientName}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <hr className="border-gray-200 mt-4" />
    </div>
  );
};

export default TopSec;