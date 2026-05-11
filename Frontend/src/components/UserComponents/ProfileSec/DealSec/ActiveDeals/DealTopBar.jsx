import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";

const DealTopBar = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${serverUrl}/requests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const toggleDropdown = () => {
    const menu = document.getElementById('create-deal-dropdown');
    if (menu) menu.classList.toggle('hidden');
  };

  return (
    <div className="bg-white px-2.5 lg:px-6 lg:pt-6 pt-4 pb-3 ">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
        
        {/* Title Section */}
        <div className="flex-shrink-0 text-left w-full lg:w-auto">
          <h1 className="text-2xl font-medium text-[#001032] leading-tight">Active Deals</h1>
          <p className="text-[13px] lg:text-sm text-[#000000] mt-1">
            Manage all ongoing projects and work progress
          </p>
        </div>

        {/* Search and Action Row */}
        <div className="flex items-center gap-2 lg:gap-6 w-full lg:flex-1 lg:justify-end">
          {/* Search Bar */}
          <div className="relative flex-1 lg:max-w-[670px] flex items-center rounded-lg lg:rounded-xl justify-between gap-2 lg:gap-6 border pl-2 lg:pl-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] bg-white h-8 lg:h-12 overflow-hidden">
            <div className="flex items-center gap-2 w-full overflow-hidden">
              <div className="text-gray-400 shrink-0">
                <IoSearchOutline size={18} className="lg:hidden" />
                <IoSearchOutline size={22} className="hidden lg:block" />
              </div>
              <input
                type="text"
                placeholder="Search by projects, milestones or startups"
                className="outline-none transition-all placeholder:text-gray-400 w-full text-xs lg:text-base border-none ring-0 focus:ring-0 h-8 lg:h-12 pr-2"
              />
            </div>
          </div>

          {/* Create Button with Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="shrink-0 flex items-center justify-center gap-1 lg:gap-2 h-8 lg:h-12 px-3 lg:px-6 bg-[#D8D6F8] lg:rounded-xl rounded-lg hover:opacity-90 transition-all text-[#59549F] font-bold shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
            >
              <FaPlus size={15} className="lg:hidden" />
              <FaPlus size={18} className="hidden lg:block" />
              <span className="text-[13px] lg:text-lg whitespace-nowrap">Create Deal</span>
            </button>

            {/* Dropdown Menu */}
            <div 
              id="create-deal-dropdown"
              className="hidden absolute right-0 mt-2 w-[280px] lg:w-[350px] bg-white rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden"
            >
              <div className="p-2 border-b border-gray-50 bg-gray-50/50">
                <span className="text-sm text-black font-medium tracking-wider px-2">Select Request to Create Deal</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <div 
                      key={req._id}
                      onClick={() => {
                        navigate("/deal/dealdraft", { state: { requestId: req._id } });
                        toggleDropdown();
                      }}
                      className="p-3 lg:p-4 hover:bg-[#FDFDFF] cursor-pointer border-b border-gray-50 last:border-0 transition-all group"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm lg:text-base font-semibold text-[#001032] group-hover:text-[#59549F]">
                          {req.service || "Unnamed Project"}
                        </span>
                        <span className="text-[10px] lg:text-xs text-gray-400 mt-0.5">
                          {req.professionalId?.businessDetails?.firstName} {req.professionalId?.businessDetails?.lastName}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-400 text-sm italic">
                    No pending requests found. <br/>
                    <span className="text-[10px]">First you have to raise a request.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealTopBar;
