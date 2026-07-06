import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { BsBuildings } from 'react-icons/bs';
import { FiTrendingUp } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { HiOutlineUsers, HiOutlineDocumentText } from 'react-icons/hi';
import { FaRegBuilding } from 'react-icons/fa';

const CompanyProfileSec = () => {
  const [activeTab, setActiveTab] = useState('About');

  const tabs = [
    'About',
    'Industry & Business',
    'Founding Team',
    'Milestones',
    'Traction',
    'Media & Links'
  ];

  return (
    <div className="w-full font-sans flex flex-col h-screen lg:max-h-screen overflow-hidden p-3 lg:px-5 lg:py-3 gap-3">
      {/* Top Navigation Strip */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-2 flex justify-between items-center shrink-0 w-full">
        <div className="flex items-center gap-5 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap font-medium text-[13px] transition-colors ${
                activeTab === tab
                  ? 'bg-[#1e1b4b] text-white px-4 py-1.5 rounded-full'
                  : 'text-gray-600 hover:text-gray-900 px-1'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <div className="w-9 h-5 bg-white border border-gray-300 rounded-full flex items-center p-0.5 cursor-pointer">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          </div>
          <span className="font-semibold text-gray-800 text-[13px]">Switch to professional</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col lg:flex-row gap-3 min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* Left Column */}
        <div className="w-full lg:w-[58%] flex flex-col gap-3 h-full">
          {/* Main Profile Card - Flexible Height */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 relative flex-1 flex flex-col overflow-hidden min-h-[260px]">
            <div className="h-14 lg:h-[20%] border-b border-gray-100 relative shrink-0">
              <MdEdit className="absolute top-3 right-4 text-[18px] text-gray-600 cursor-pointer hover:text-gray-900 bg-white/80 p-1.5 rounded-full shadow-sm w-7 h-7" />
            </div>
            <div className="px-4 pb-4 lg:px-5 lg:pb-4 relative flex-1 flex flex-col">
              <div className="absolute -top-10 left-5 w-20 h-20 bg-white border-4 border-white rounded-full shadow-sm flex items-center justify-center shrink-0 z-10">
                 <div className="w-full h-full bg-gray-100 rounded-full border border-gray-200"></div>
                 <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#eef2ff] rounded-md flex items-center justify-center cursor-pointer shadow-sm">
                    <FaRegBuilding className="text-[#4f46e5] text-[10px]" />
                 </div>
              </div>
              
              <div className="mt-12 flex flex-col h-full justify-between">
                <div>
                  <h1 className="text-xl lg:text-[21px] font-bold text-[#1e1b4b] mb-1">Parikalpna Technologies</h1>
                  <p className="text-gray-600 text-[13px] mb-4 leading-snug max-w-[95%]">
                    Grow Your Business by Partnering with India's Fastest-Growing Startup Ecosystem
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-3 mt-auto">
                  {/* Stats Boxes */}
                  <div className="bg-[#f8faff] rounded-lg p-2 lg:p-2.5 border border-indigo-50/50 flex items-center gap-2">
                    <div className="text-indigo-600 shrink-0 bg-[#eef2ff] p-1.5 rounded-md">
                      <BsBuildings className="text-[14px]" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Founded</p>
                      <p className="font-bold text-gray-800 text-[12px] leading-none">2026</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#f8faff] rounded-lg p-2 lg:p-2.5 border border-indigo-50/50 flex items-center gap-2">
                    <div className="text-indigo-600 shrink-0 bg-[#eef2ff] p-1.5 rounded-md">
                      <FiTrendingUp className="text-[14px]" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Stage</p>
                      <p className="font-bold text-gray-800 text-[12px] leading-none">Series A</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#f8faff] rounded-lg p-2 lg:p-2.5 border border-indigo-50/50 flex items-center gap-2">
                    <div className="text-indigo-600 shrink-0 bg-[#eef2ff] p-1.5 rounded-md">
                      <IoLocationOutline className="text-[14px]" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Head Office</p>
                      <p className="font-bold text-gray-800 text-[12px] leading-none">Delhi, India</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#f8faff] rounded-lg p-2 lg:p-2.5 border border-indigo-50/50 flex items-center gap-2">
                    <div className="text-indigo-600 shrink-0 bg-[#eef2ff] p-1.5 rounded-md">
                      <HiOutlineUsers className="text-[14px]" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Team Size</p>
                      <p className="font-bold text-gray-800 text-[12px] leading-none">12 People</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Card - Fixed Height matching Mission Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:px-5 lg:py-4 relative shrink-0 h-auto lg:h-[230px] xl:h-[250px] flex flex-col overflow-hidden">
            <MdEdit className="absolute top-4 right-4 text-[18px] text-gray-600 cursor-pointer hover:text-gray-900" />
            <h2 className="text-[15px] font-bold text-[#1e1b4b] mb-2 shrink-0">About</h2>
            <div className="flex-1 overflow-hidden">
              <p className="text-gray-600 text-[13px] leading-relaxed text-justify line-clamp-[6] xl:line-clamp-[8]">
                An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused marketing campaign, customer experience and design valuable content for go-to-market, launch, start-up, brand building, event and community engagement. Dedicated results and omni channel product marketing, brand and community development. Visionary, self-driven, motivated, who can take ownership and have the zeal to build something global. Skilled in operations management, operational Planning, Business Strategies and Employee Training. <span className="font-bold cursor-pointer text-[#1e1b4b] ml-1">See more...</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[42%] flex flex-col gap-3 h-full">
          {/* Company Details - Flexible Height */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:px-5 lg:py-4 relative flex-1 flex flex-col min-h-[260px]">
             <div className="flex items-center gap-2 mb-3 shrink-0">
                <div className="bg-[#eef2ff] p-1.5 rounded-md text-indigo-600">
                    <HiOutlineDocumentText className="text-[15px]" />
                </div>
                <h2 className="text-[15px] font-bold text-[#1e1b4b]">Company Details</h2>
             </div>
             <MdEdit className="absolute top-4 right-4 text-[18px] text-gray-600 cursor-pointer hover:text-gray-900" />
             
             <div className="flex flex-col flex-1 justify-between text-[12.5px] xl:text-[13px]">
                <div className="grid grid-cols-[40%_60%] items-center">
                    <span className="text-gray-400 font-medium">Legal Name</span>
                    <span className="text-gray-800 font-semibold truncate">Parikalpna Technologies Pvt. Ltd.</span>
                </div>
                <div className="grid grid-cols-[40%_60%] items-center">
                    <span className="text-gray-400 font-medium">Regd No./CIN/LLPIN</span>
                    <span className="text-gray-800 font-semibold truncate">U71645GF4654FF09G4541563FFF</span>
                </div>
                <div className="grid grid-cols-[40%_60%] items-center">
                    <span className="text-gray-400 font-medium">Incorporation Date</span>
                    <span className="text-gray-800 font-semibold truncate">27th June 2026</span>
                </div>
                <div className="grid grid-cols-[40%_60%] items-center">
                    <span className="text-gray-400 font-medium">Company Type</span>
                    <span className="text-gray-800 font-semibold truncate">Private Limited</span>
                </div>
                <div className="grid grid-cols-[40%_60%] items-center">
                    <span className="text-gray-400 font-medium">Email</span>
                    <span className="text-gray-800 font-semibold truncate">PrivateLimited@gmail.com</span>
                </div>
                <div className="grid grid-cols-[40%_60%] items-center">
                    <span className="text-gray-400 font-medium">Phone</span>
                    <span className="text-gray-800 font-semibold truncate">+91 8789855895</span>
                </div>
                <div className="grid grid-cols-[40%_60%] items-center">
                    <span className="text-gray-400 font-medium">Website</span>
                    <span className="text-[#1e1b4b] font-semibold truncate cursor-pointer hover:underline">PrivateLimited.com</span>
                </div>
                <div className="grid grid-cols-[40%_60%] items-start mt-0.5">
                    <span className="text-gray-400 font-medium">LinkedIn</span>
                    <span className="text-[#1e1b4b] font-semibold leading-tight cursor-pointer hover:underline break-words">PrivateLimited.com/company/<br/>privateltd</span>
                </div>
                <div className="grid grid-cols-[40%_60%] items-start mt-0.5">
                    <span className="text-gray-400 font-medium">Registered Address</span>
                    <span className="text-gray-800 font-semibold leading-tight line-clamp-2 xl:line-clamp-3">Parikalpna Technologies Parikalpna Technologies Pvt. Ltd. Parikalpna Technologies Pvt. Ltd.</span>
                </div>
             </div>
          </div>

          {/* Mission & Vision - Fixed Height matching About Card */}
          <div className="bg-[#1e1b4b] rounded-xl shadow-sm text-white p-4 lg:px-5 lg:py-4 relative shrink-0 h-auto lg:h-[230px] xl:h-[250px] flex flex-col justify-center gap-4 xl:gap-5">
            {/* Mission */}
            <div>
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="bg-white/10 p-1.5 rounded-md text-indigo-200">
                        <HiOutlineDocumentText className="text-[14px]" />
                    </div>
                    <h3 className="text-[14.5px] font-bold">Mission</h3>
                </div>
                <p className="text-indigo-100/90 text-[12.5px] xl:text-[13px] leading-relaxed text-justify line-clamp-2 xl:line-clamp-3">
                    An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused marketing campaign, customer experience and design
                </p>
            </div>
            
            {/* Vision */}
            <div>
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="bg-white/10 p-1.5 rounded-md text-indigo-200">
                        <HiOutlineDocumentText className="text-[14px]" />
                    </div>
                    <h3 className="text-[14.5px] font-bold">Vision</h3>
                </div>
                <p className="text-indigo-100/90 text-[12.5px] xl:text-[13px] leading-relaxed text-justify line-clamp-2 xl:line-clamp-3">
                    An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused marketing campaign, customer experience and design
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileSec;
