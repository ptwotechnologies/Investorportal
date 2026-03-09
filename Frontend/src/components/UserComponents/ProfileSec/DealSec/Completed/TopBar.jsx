import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePrivateConnectivity } from "react-icons/md";


const TopBar = () => {
  return (
    <div className="bg-white px-3 lg:px-6 py-6">
      <div id="top" className="flex flex-col lg:flex-row items-start justify-between w-full ">
        <div className="lg:w-[40%] w-full ">
          <h1 className="text-xl font-semibold">Completed Deals</h1>
          <p className="lg:text-sm text-xs">Review the summary and status of all completed deals.</p>
        </div>
        <div className="lg:flex items-center  gap-4 hidden ">
          <div className="flex items-center border border-[#D9D9D9] gap-2  rounded-md h-10 px-2">
            <CiSearch size={25} />
            <input
              type="text"
              name=""
              id=""
              placeholder="Search by startup or professional"
              className=" outline-none w-80 "
            />
            <button className="px-4 border-l border-[#D9D9D9] h-full">
              All Status
            </button>
          </div>
          <div className="flex items-center gap-2  border border-[#D9D9D9]  rounded-md h-10 px-3">
           
           <button>Download CSV</button>
          </div>
        </div>

        <div className="flex items-center  gap-2 lg:hidden mt-4 w-full">
          <div className="flex items-center border border-[#D9D9D9] gap-2  rounded-md  px-2 w-full">
            <CiSearch size={25} />
            <input
              type="text"
              name=""
              id=""
              placeholder="Search "
              className=" outline-none w-full "
            />
            <button className="px-2 py-2 border-l border-[#D9D9D9] h-full lg:text-[16px] text-xs w-28">
              All Status
            </button>
          </div>
          <div className="flex items-center gap-2  border border-[#D9D9D9]  rounded-md  px-2 lg:text-[16px] text-xs w-34 py-2">
           
           <button>Download CSV</button>
          </div>
        </div>
      </div>

      <div
        id="bottom"
        className="grid grid-cols-2 lg:flex items-center justify-around gap-4 lg:mt-10 mt-4"
      >
        <div className="bg-[#EEDEF4] shadow-md p-2 rounded-md w-full py-3 px-2 lg:px-3">
          <div className="flex items-center gap-1 lg:gap-2">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="lg:text-[16px] text-[11px]">Total </h1>
          </div>
          <p className="mt-2 lg:text-3xl text-2xl font-bold">21</p>
          <div></div>
        </div>

        <div className="bg-[#E5DBFA] shadow-md p-2 rounded-md w-full py-3 px-2 lg:px-3">
          <div className="flex items-center gap-1 lg:gap-2">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="lg:text-[16px] text-[11px]">Total Value</h1>
          </div>
          <p className="mt-2 lg:text-3xl text-2xl font-bold">5</p>
          <div></div>
        </div>
        <div className="bg-[#E7E4F6] shadow-md p-2 rounded-md w-full py-3 px-2 lg:px-3">
          <div className="flex items-center lg:gap-2 gap-1">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="lg:text-[16px] text-[11px]">Average Release Time</h1>
          </div>
          <p className="mt-2 lg:text-3xl text-2xl font-bold">2</p>
          <div></div>
        </div>
        <div className="bg-[#E5E7F1] shadow-md p-2 rounded-md w-full py-3 px-2 lg:px-3">
          <div className="flex items-center lg:gap-2  gap-1">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="lg:text-[16px] text-[11px]">Success Rate</h1>
          </div>
          <p className="mt-2 lg:text-3xl text-2xl font-bold">325k</p>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default TopBar
