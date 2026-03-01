import React from "react";
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

const TopBar = () => {
  return (
    <div className="bg-white px-6 py-6">
      <div id="top" className="flex items-start justify-between w-full ">
        <div className="w-[40%] ">
          <h1 className="text-xl font-semibold">Milestones</h1>
          <p className="text-sm">Track project progress and payment stages</p>
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
          <div className="flex items-center gap-2  text-white  rounded-md">
           
            <ButtonGroup className=" h-9">
              <Button variant="secondary" size="sm" className="h-full bg-[#9B8EDE] text-white">
              <IoGrid />  Grid
              </Button>
              <ButtonGroupSeparator />
              <Button variant="secondary" size="sm" className="h-full">
             <BiObjectsHorizontalLeft /> Talle
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <div
        id="bottom"
        className="flex items-center justify-around gap-4 mt-10 "
      >
        <div className="bg-[#F2F6FB] shadow-md p-2 rounded-md w-full py-3 px-3">
          <div className="flex items-center gap-2">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="text-md">Total Amilestones</h1>
          </div>
          <p className="mt-2 text-3xl font-bold">21</p>
          <div></div>
        </div>

        <div className="bg-[#F3E8FD] shadow-md p-2 rounded-md w-full py-3 px-3">
          <div className="flex items-center gap-2">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="text-md">Due this week</h1>
          </div>
          <p className="mt-2 text-3xl font-bold">5</p>
          <div></div>
        </div>
        <div className="bg-[#FEEEF2] shadow-md p-2 rounded-md w-full py-3 px-3">
          <div className="flex items-center gap-2">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="text-md">Overdue</h1>
          </div>
          <p className="mt-2 text-3xl font-bold">2</p>
          <div></div>
        </div>
        <div className="bg-[#FEF5EE] shadow-md p-2 rounded-md w-full py-3 px-3">
          <div className="flex items-center gap-2 ">
            <MdOutlinePrivateConnectivity size={25} />
            <h1 className="text-md">Pending Approvals</h1>
          </div>
          <p className="mt-2 text-3xl font-bold">325k</p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
