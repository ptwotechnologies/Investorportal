import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePrivateConnectivity } from "react-icons/md";


const TopBar = () => {
  return (
    <div className="bg-white px-6 py-6">
      <div id="top" className="flex items-start justify-between w-full ">
        <div className="w-[40%] ">
          <h1 className="text-xl font-semibold">Completed Deals</h1>
          <p className="text-sm">Review the summary and status of all completed deals.</p>
        </div>
        <div className="flex items-center  gap-4 ">
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
      </div>

      <div
        id="bottom"
        className="flex items-center justify-around gap-4 mt-10 "
      >
        <div className="bg-[#EEDEF4] shadow-md p-2 rounded-md w-full py-3 px-3">
          <div className="flex items-center gap-2">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="text-md">Total </h1>
          </div>
          <p className="mt-2 text-3xl font-bold">21</p>
          <div></div>
        </div>

        <div className="bg-[#E5DBFA] shadow-md p-2 rounded-md w-full py-3 px-3">
          <div className="flex items-center gap-2">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="text-md">Total Value</h1>
          </div>
          <p className="mt-2 text-3xl font-bold">5</p>
          <div></div>
        </div>
        <div className="bg-[#E7E4F6] shadow-md p-2 rounded-md w-full py-3 px-3">
          <div className="flex items-center gap-2">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="text-md">Average Release Time</h1>
          </div>
          <p className="mt-2 text-3xl font-bold">2</p>
          <div></div>
        </div>
        <div className="bg-[#E5E7F1] shadow-md p-2 rounded-md w-full py-3 px-3">
          <div className="flex items-center gap-2 ">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="text-md">Success Rate</h1>
          </div>
          <p className="mt-2 text-3xl font-bold">325k</p>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default TopBar
