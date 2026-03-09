import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePrivateConnectivity } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { IoGrid } from "react-icons/io5";
import { BiObjectsHorizontalLeft } from "react-icons/bi";
import {  Shield } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-white px-3 lg:px-6 py-6">
      <div id="top" className="flex flex-col lg:flex-row items-start justify-between w-full ">
        <div className="lg:w-[40%] w-full ">
          <h1 className="text-xl font-semibold">Proposals & Documentation</h1>
          <p className="lg:text-sm text-xs">Review the final agreement and confirm to activate the deal</p>
        </div>
        <div className="lg:flex items-center  gap-4 hidden">
           <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#EFEAF7]">
            <div className="w-9 h-9 rounded-full bg-[#E4DCFA] flex items-center justify-center shrink-0">
              <Shield size={18} className="text-purple-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm leading-tight">Secure Agreement</p>
              <p className="text-[10px] text-gray-500">Encrypted Verification</p>
            </div>
          </div>
        </div>

        <div className="flex items-center  gap-4 lg:hidden w-full mt-4 ">
          
           <div className="flex items-center gap-5 p-3 bg-white rounded-xl border border-[#EFEAF7] w-full">
            <div className="w-10 h-10 rounded-full bg-[#E4DCFA] flex items-center justify-center shrink-0">
              <Shield size={18} className="text-purple-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm leading-tight">Secure Agreement</p>
              <p className="text-[10px] text-gray-500">Encrypted Verification</p>
            </div>
          </div>

          
          
        </div>
      </div>

      <div
        id="bottom"
        className="grid grid-cols-2 lg:flex items-center justify-around gap-4 lg:mt-10 mt-4 "
      >
        <div className="bg-[#EAEAFD] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-1">
          <div className="flex items-center lg:gap-2 gap-1">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="lg:text-[16px] text-[10px]">Open Proposals</h1>
          </div>
          <p className="mt-2 lg:text-3xl text-2xl font-bold">21</p>
          <div></div>
        </div>

        <div className="bg-[#F8EAF5] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-1">
          <div className="flex items-center lg:gap-2 gap-1">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="lg:text-[16px] text-[10px]">Awaiting Your Response</h1>
          </div>
          <p className="mt-2 lg:text-3xl text-2xl font-bold">5</p>
          <div></div>
        </div>
        <div className="bg-[#FCEFEB] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-1">
          <div className="flex items-center lg:gap-2 gap-1">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="lg:text-[16px] text-[10px]">Counter Offers</h1>
          </div>
          <p className="mt-2 lg:text-3xl text-2xl font-bold">2</p>
          <div></div>
        </div>
        <div className="bg-[#F8ECFB] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-1">
          <div className="flex items-center lg:gap-2 gap-1">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="lg:text-[16px] text-[10px]">Expiring Soon</h1>
          </div>
          <p className="mt-2 l:text-3xl text-2xl font-bold">325k</p>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
