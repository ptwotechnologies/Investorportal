import React  from 'react'
import { CgProfile } from "react-icons/cg";
import { Send } from "lucide-react";
import { IoSearchSharp } from "react-icons/io5";
import { TfiList } from "react-icons/tfi";
import { HiMiniLink } from "react-icons/hi2";
import { BsSendFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const HelpSec = () => {
 const leftPart = [
    {
      name: "I need assistance with sign up the account",
    },
    {
      name: "Service professional is not responding",
    },
    {
      name: "Can I connect with the investors?",
    },
    {
      name: "Can I connect with the other startups?",
    },
  ];
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
  ];
  return (
    <div className="md:flex w-full overflow-hidden">
      <div className="min-h-screen bg-gray-100 lg:p-4 p-2 w-full  mx-auto">
        {/* Header */}
        <div className="hidden lg:flex bg-white border fixed w-[78%] z-20 border-gray-400 shadow-md rounded-lg px-10 mb-4 justify-between items-center">
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
        <div id='mobile ' className='lg:hidden bg-white border border-gray-300 p-2 mb-2 rounded-lg'> 
              <div className="flex justify-between items-start gap-4 w-full  ">
              <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 rounded-full border border-gray-300 shadow-md shrink-0"></div>
                <p className="text-gray-900 font-semibold">Tickets</p>
                <div className="flex border-2 shadow-md border-gray-300 items-center px-4 justify-between rounded-2xl flex-1 min-w-[150px]">
                  <div className="flex items-center gap-2 flex-1">
                    <IoSearchSharp size={24} className="text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search Messages"
                      className="p-2 outline-none w-full"
                    />
                  </div>
                  <TfiList size={24} className="text-gray-500" />
                </div>
              </div>
            </div>
            </div>
        <div className="flex gap-4 lg:mt-15  h-40">
          {/* Left Card */}
           <div className="lg:min-h-screen flex flex-col   rounded-lg border  border-gray-300 lg:p-6 p-3 shadow-md w-full lg:w-[40%] h-[77vh] lg:h-screen bg-white">
            <div id='desktop ' className='hidden lg:block'> 
              <div className="flex justify-between items-start gap-4 w-full  ">
              <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 rounded-full border border-gray-300 shadow-md shrink-0"></div>
                <p className="text-gray-900 font-semibold">Tickets</p>

                {/* Responsive input container */}
                <div className="flex border-2 shadow-md border-gray-300 items-center px-4 justify-between rounded-2xl flex-1 min-w-[150px]">
                  <div className="flex items-center gap-2 flex-1">
                    <IoSearchSharp size={24} className="text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search Messages"
                      className="p-2 outline-none w-full"
                    />
                  </div>
                  <TfiList size={24} className="text-gray-500" />
                </div>
              </div>
            </div>
            </div>

            

            <hr className="border-gray-300 w-full  my-3 hidden lg:block" />

            <div className="flex flex-col w-full gap-4 ">
              {leftPart.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-gray-300 shadow-md shrink-0"></div>
                      <p className="text-gray-800 text-xs font-medium">{item.name}</p>
                    </div>
                    <p className="text-xs text-gray-500 self-end w-[23%] lg:w-auto">10:08 A.M.</p>
                  </div>
                  <hr className="border-gray-300 w-full mt-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="hidden lg:block w-[60%] items-center justify-center h-screen ml-auto overflow-hidden ">
            <div className='h-[calc(100vh-170px)] overflow-y-scroll scrollbar-hide'>
              <div className="border p-6  pt-20 flex flex-col gap-6 bg-white border-gray-300 shadow-md rounded-lg w-full ">
              {rightPart.map((item, index) => (
                <div
                  key={index}
                  className={`
                    border-2 p-2 flex items-center gap-10 border-gray-300 rounded-lg w-[90%]
                    ${index % 2 !== 0 ? "flex-row-reverse ml-auto" : "flex-row"}
                  `}
                >
                  <div className="shrink-0 w-18 h-18 rounded-full border-2 border-gray-300 shadow-md flex items-center justify-center "></div>
                  <p className="flex-1 text-gray-700 text-xs">{item.data}</p>{" "}
                  {/* use item.data */}
                </div>
              ))}
            </div>
            </div>

            <div className="border p-5 border-gray-300 shadow-md rounded-lg w-[46%] mt-4 bg-white fixed bottom-0 z-20">
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
        </div>
      </div>
    </div>
  )
}

export default HelpSec
