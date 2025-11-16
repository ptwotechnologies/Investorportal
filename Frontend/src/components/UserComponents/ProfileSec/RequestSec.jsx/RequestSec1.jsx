import React from 'react'
import { FaUser } from "react-icons/fa";
import { HiMiniLink } from "react-icons/hi2";
import { BsSendFill } from "react-icons/bs";
import { TfiList } from "react-icons/tfi";
import { FiEdit2 } from "react-icons/fi"; 

const RequestSec1 = () => {

    const rightPart = [
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },

    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
  ];

  const rightMobilePart = [
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
  ];

  return (
    <div className="md:flex bg-black lg:bg-gray-100 pl-4 pr-4 pb-4">
      <div className=" bg-gray-100 h-[85vh]  w-full  mx-auto  pt-4">
        {/* Header */}
        <div className="hidden md:flex bg-white border border-gray-400 shadow-md rounded-lg px-10 mb-4 justify-between items-center">
          <h1 className="text-md font-semibold text-gray-800">
            Welcome, Startup India Pvt. Ltd.
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
            <FaUser
              className="text-gray-600 border border-gray-600 p-1 rounded-full"
              size={24}
            />
            <span className="font-semibold text-gray-800">
              Switch to professional
            </span>
          </button>
        </div>

        {/* ✅ Equal height fix added here */}
        <div className="flex gap-4 items-stretch">
          {/* Left Card */}
          <div className="flex flex-col justify-between w-full md:w-[60%] items-center h-screen overflow-hidden">
            {/* 🔷 Top Fixed "Raised / Received" Bar */}
            <div className="lg:border  px-6 py-3 bg-white lg:border-gray-300 lg:shadow-md rounded-lg w-full z-10">
              <div className="flex border-2 shadow-md border-gray-300 items-center px-4 justify-between rounded-2xl min-w-[150px]">
                <div className="flex items-center gap-2">
                  <p className="px-2 border-r-2 border-gray-500">Raised</p>
                  <p className="text-white bg-gray-900 p-2 rounded-lg m-2">
                    Received
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <TfiList size={24} className="text-gray-500 bg-white" />
                </div>
              </div>
            </div>

            {/* 🟡 Scrollable Chat Messages */}
            <div className="flex-1 overflow-y-auto w-full px-6 py-4 space-y-4 scrollbar-hide border border-gray-300 rounded-lg mt-2 mb-62 lg:mb-44  shadow-md bg-white">
                
              {/* ✅ Desktop Right Part */}
              {rightPart.map((item, index) => (
                <div
                  key={index}
                  className={`border-2 p-2 flex items-center gap-10 border-gray-300 rounded-lg w-[90%]  
          ${
            index % 2 !== 0 ? "flex-row-reverse ml-auto" : "flex-row"
          } hidden lg:flex`}
                >
                  <div className="shrink-0 w-18 h-18 rounded-full border-2 border-gray-300 shadow-md flex items-center justify-center"></div>
                  <p className="flex-1 text-xs text-gray-700">{item.data}</p>
                </div>
              ))}

              {/* ✅ Mobile Right Part */}
              {rightMobilePart.map((item, index) => (
                <div
                  key={index}
                  className={`border-2 p-2 flex items-center gap-5 border-gray-300 rounded-lg w-[90%] 
          ${
            index % 2 !== 0 ? "flex-row-reverse ml-auto" : "flex-row"
          } flex lg:hidden`}
                >
                  <div className="shrink-0 w-20 h-20 rounded-full border-2 border-gray-300 shadow-md flex items-center justify-center"></div>
                  <p className="flex-1 text-gray-700">{item.data}</p>
                </div>
              ))}
            </div>

            {/* 🔻 Fixed Chat Input */}
            <div className="border p-5  border-gray-300 shadow-md rounded-lg lg:w-[46%] w-[92%]  mt-4 bg-white fixed lg:bottom-2 bottom-10 z-20">
              <div className="flex border-2 shadow-md border-gray-300 items-center px-4 justify-between rounded-xl flex-1 min-w-[150px]">
                {" "}
                <input
                  type="text"
                  placeholder="Enter the Text"
                  className="py-2 outline-none w-full"
                />
                <div className="flex items-center gap-2 flex-1">
                  <HiMiniLink size={24} className="text-gray-500 bg-white" />
                  <BsSendFill size={24} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Right Card (exact UI, untouched CSS) */}
          <div className="hidden lg:flex w-[40%] h-[90vh] ">
            <div className="bg-white border border-gray-300 shadow-md rounded-2xl overflow-hidden flex flex-col justify-between w-full h-full">
              {/* Header image section */}
              <div className="relative h-40 border-2 border-gray-300"></div>

              {/* Profile photo overlap */}
              <div className="relative px-4 -mt-12">
                <div className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-md bg-white"></div>

                <div className="mt-6 px-4">
                  <h2 className="text-gray-900 text-lg font-semibold">
                    Akshay Dogra
                  </h2>
                  <p className="text-sm text-gray-800 mt-2 leading-tight">
                    Grow Your Business by Partnering with <br />
                    <span>India’s Fastest-Growing Startup </span>
                  </p>
                  <p>Ecosystem</p>
                  <p className="text-sm text-gray-700 font-medium mt-3">
                    New Delhi, Delhi, India
                  </p>
                </div>
              </div>

              {/* About Section */}
              <div className=" mt-10 ">
                <div className="bg-white border-t-2 border-gray-300 rounded-xl shadow-sm p-6 px-8">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      About
                    </h3>
                    <button className="p-1 rounded-md hover:bg-gray-100 transition">
                      <FiEdit2 className="text-gray-800" />
                    </button>
                  </div>

                  <p className="text-[13px] text-gray-600 mt-2 leading-6">
                    An experienced entrepreneur and business professional who
                    consistently delivers high-quality and result-focused
                    marketing campaign, customer experience and design valuable
                    content for go-to-market, launch, start-up, brand building,
                    event and community engagement. Dedicated results and omni
                    channel product marketing, brand and community development.
                    <span className="text-gray-800 font-medium">
                      {" "}
                      See more...
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ✅ End Right Card */}
        </div>
      </div>
    </div>
  )
}

export default RequestSec1
