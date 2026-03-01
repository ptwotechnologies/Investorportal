import React from "react";
import { Check, Upload, IndianRupee } from "lucide-react";
import { AiOutlineBars } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { IoGrid } from "react-icons/io5";
import { BiObjectsHorizontalLeft } from "react-icons/bi";

const BottomSec = () => {
  return (
    <div className="flex items-start gap-4 w-full px-6 py-4">
      <div className="w-[70%]">
        <div className="flex items-center justify-between ">
          <div>
            <h1 className="font-semibold text-[5C5D78] ">Milestones</h1>
          </div>

          <div className="flex items-center gap-2 text-[#837DA1]">
            <div className="bg-white border  px-3 py-1 rounded-md text-sm flex items-center gap-2">
              <AiOutlineBars />
              <button>All Status</button>
            </div>
            <div className="bg-white border px-3 py-1 rounded-md text-sm flex items-center gap-1">
              <button>Due Date</button>
              <RiArrowDownSLine size={20} />
            </div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 h-[60vh] overflow-y-auto scrollbar-hide">
          <div>
            <div className="bg-white w-full  rounded-2xl shadow-md p-3">
              {/* Top Section */}

              <div className="flex items-start gap-2 ">
                <div className="w-12 h-12 rounded-xl bg-orange-400 flex items-center justify-center">
                  <p className="text-white font-bold text-lg">S</p>
                </div>
                <div className="w-full">
                  <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                      Stellar{" "}
                      <span className="text-sm text-gray-500 font-normal">
                        - Mobile App Development
                      </span>
                    </h1>
                  </div>

                  <div className=" w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">Project:</p>
                      <p className="font-semibold text-gray-800">Arjun Patel</p>
                    </div>

                    <div className="flex items-center gap-2 ">
                      <h1 className="text-[9F97AE]">Total Value</h1>
                      <p className="font-semibold text-gray-800">₹ 25,00,000</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-5 " />

              {/* Middle Section  milestone 1*/}
              <div>
                <div className="flex items-start gap-2 ">
                  <div className="w-6 h-6 rounded-sm bg-[#71BEB6] flex items-center justify-center">
                    <p className="text-white font-bold text-lg">S</p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-800">
                        Milestone 1
                        <span className="text-sm text-gray-500 font-normal">
                          - Wireframes
                        </span>
                      </h1>
                    </div>

                    <div className="bg-[#EEE8FB] rounded-full p-1 px-5">
                      <button>Due 02 Feb 2026</button>
                    </div>

                    <div>
                      <p>₹ 25,00,000</p>
                    </div>
                  </div>
                </div>
                <div className="my-4 h-1.5  ml-8 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-linear-to-r from-[#71BEB6] to-[#85C3BF]"></div>
                </div>

                <div className="flex items-center justify-between ml-8 mt-6">
                  <div className="flex items-center gap-5">
                    <h1 className="text-[#8076A3]">Status</h1>
                    <button className="bg-linear-to-b from-[#A8A0E8] to-[#958FD9] p-1 px-3 rounded-sm text-white">
                      View Summary
                    </button>
                  </div>

                  <div className="flex items-center gap-5">
                    <button className="bg-[#EAF5FA] text-[#297475] font-semibold p-1 px-4 rounded-sm">
                      Approve
                    </button>
                    <div className="bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white font-semibold p-1 px-4 rounded-sm flex items-center gap-5">
                      <button>Approve</button>
                      <div className="w-0.5 h-6 bg-[#2B877B]"></div>
                      <button>Request Changes</button>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-5 " />


              {/* Middle Section  milestone 2*/}
              <div>
                <div className="flex items-start gap-2 ">
                  <div className="w-6 h-6 rounded-sm bg-[#F5959F] flex items-center justify-center">
                    <p className="text-white font-bold text-lg">S</p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-800">
                        Milestone 2
                        <span className="text-sm text-gray-500 font-normal">
                          - UI Screens
                        </span>
                      </h1>
                    </div>

                    <div className="bg-[#EEE8FB] rounded-full p-1 px-5">
                      <button>Due 02 Feb 2026</button>
                    </div>

                    <div>
                      <p>₹ 25,00,000</p>
                    </div>
                  </div>
                </div>
                <div className="my-4 h-1.5  ml-8 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-linear-to-r from-[#F68F9D] to-[#F38A97]"></div>
                </div>

                <div className="flex items-center justify-between ml-8 mt-6">
                  <div className="flex items-center gap-5">
                    <h1 className="text-[#8076A3]">Status</h1>
                    <button className="bg-linear-to-b from-[#A8A0E8] to-[#958FD9] p-1 px-3 rounded-sm text-white">
                      View Summary
                    </button>
                  </div>

                  <div className="flex items-center gap-5">
                    <button className="bg-[#EAF5FA] text-[#297475] font-semibold p-1 px-4 rounded-sm">
                      Approve
                    </button>
                    <div className="bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white font-semibold p-1 px-4 rounded-sm flex items-center gap-5">
                      <button>Approve</button>
                      <div className="w-0.5 h-6 bg-[#2B877B]"></div>
                      <button>Request Changes</button>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          </div>

          <div>
            <div className="bg-white w-full  rounded-2xl shadow-md p-3">
              {/* Top Section */}

              <div className="flex items-start gap-2 ">
                <div className="w-12 h-12 rounded-xl bg-blue-400 flex items-center justify-center">
                  <p className="text-white font-bold text-lg">A</p>
                </div>
                <div className="w-full">
                  <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                      NomadX
                      <span className="text-sm text-gray-500 font-normal">
                        - Mobile App Development
                      </span>
                    </h1>
                  </div>

                  <div className=" w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">Project:</p>
                      <p className="font-semibold text-gray-800">Arjun Patel</p>
                    </div>

                    <div className="flex items-center gap-2 ">
                      <h1 className="text-[9F97AE]">Total Value</h1>
                      <p className="font-semibold text-gray-800">₹ 25,00,000</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-5 " />

              {/* Middle Section  milestone 1*/}
              <div>
                <div className="flex items-start gap-2 ">
                  <div className="w-6 h-6 rounded-sm bg-[#71BEB6] flex items-center justify-center">
                    <p className="text-white font-bold text-lg">S</p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-800">
                        Milestone 1
                        <span className="text-sm text-gray-500 font-normal">
                          - Wireframes
                        </span>
                      </h1>
                    </div>

                    <div className="bg-[#EEE8FB] rounded-full p-1 px-5">
                      <button>Due 02 Feb 2026</button>
                    </div>

                    <div>
                      <p>₹ 25,00,000</p>
                    </div>
                  </div>
                </div>
                <div className="my-4 h-1.5  ml-8 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-linear-to-r from-[#71BEB6] to-[#85C3BF]"></div>
                </div>

                <div className="flex items-center justify-between ml-8 mt-6">
                  <div className="flex items-center gap-5">
                    <h1 className="text-[#8076A3]">Status</h1>
                    <button className="bg-linear-to-b from-[#A8A0E8] to-[#958FD9] p-1 px-3 rounded-sm text-white">
                      View Summary
                    </button>
                  </div>

                  <div className="flex items-center gap-5">
                    <button className="bg-[#EAF5FA] text-[#297475] font-semibold p-1 px-4 rounded-sm">
                      Approve
                    </button>
                    <div className="bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white font-semibold p-1 px-4 rounded-sm flex items-center gap-5">
                      <button>Approve</button>
                      <div className="w-0.5 h-6 bg-[#2B877B]"></div>
                      <button>Request Changes</button>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-5 " />


              {/* Middle Section  milestone 2*/}
              <div>
                <div className="flex items-start gap-2 ">
                  <div className="w-6 h-6 rounded-sm bg-[#F5959F] flex items-center justify-center">
                    <p className="text-white font-bold text-lg">S</p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-800">
                        Milestone 2
                        <span className="text-sm text-gray-500 font-normal">
                          - UI Screens
                        </span>
                      </h1>
                    </div>

                    <div className="bg-[#EEE8FB] rounded-full p-1 px-5">
                      <button>Due 02 Feb 2026</button>
                    </div>

                    <div>
                      <p>₹ 25,00,000</p>
                    </div>
                  </div>
                </div>
                <div className="my-4 h-1.5  ml-8 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-linear-to-r from-[#F68F9D] to-[#F38A97]"></div>
                </div>

                <div className="flex items-center justify-between ml-8 mt-6">
                  <div className="flex items-center gap-5">
                    <h1 className="text-[#8076A3]">Status</h1>
                    <button className="bg-linear-to-b from-[#A8A0E8] to-[#958FD9] p-1 px-3 rounded-sm text-white">
                      View Summary
                    </button>
                  </div>

                  <div className="flex items-center gap-5">
                    <button className="bg-[#EAF5FA] text-[#297475] font-semibold p-1 px-4 rounded-sm">
                      Approve
                    </button>
                    <div className="bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white font-semibold p-1 px-4 rounded-sm flex items-center gap-5">
                      <button>Approve</button>
                      <div className="w-0.5 h-6 bg-[#2B877B]"></div>
                      <button>Request Changes</button>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          </div>

          
        </div>
      </div>

      <div className="w-[30%]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-[5C5D78]">Execution Insights</h1>
          </div>

          <div>
            <ButtonGroup className=" h-7">
              <Button
                variant="secondary"
                size="sm"
                className="h-full bg-[#EBE0FB] text-[5D46B7] rounded-sm  "
              >
                <IoGrid />
              </Button>
              <ButtonGroupSeparator />
              <Button
                variant="secondary"
                size="sm"
                className="h-full bg-white rounded-sm"
              >
                <BiObjectsHorizontalLeft />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="mt-2">
          <div className=" w-full max-w-sm  bg-white rounded-t-2xl">
            {/* Upcoming Milestones */}
            <div className="px-5 py-3 ">
              <h3 className="text-gray-700 font-semibold mb-4">
                Upcoming Deadlines
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span className="text-gray-700">UI Screens</span>
                  </div>
                  <span className="text-gray-500">10 days</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span className="text-gray-700">Backend API</span>
                  </div>
                  <span className="text-gray-500">12 days</span>
                </div>
              </div>
            </div>
            <hr className="mx-5 my-2" />
            {/* Payment Alerts */}
            <div className=" px-5 ">
              <h3 className="text-gray-700 font-semibold mb-2 ">
                Approval Pending
              </h3>

              <div className="bg-[#FDF5EE] rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-gray-600" />
                    <span className="text-lg font-semibold text-gray-800">
                      30,000 <span className="text-sm ">Ceccal</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Escrow ↓ 2 days</p>
                </div>

                <span className="text-xs bg-yellow-100 text-[#877A68] px-3 py-1 rounded-full font-medium">
                  In 2 Days <span className="text-[#EDB778] font-bold">10</span>
                </span>
              </div>
            </div>

            <hr className="mx-5 my-2 mt-4" />

            {/* Recent Activities */}
            <div className="px-5 pb-2">
              <h3 className="text-gray-700 font-semibold mb-2 ">
                Recent Activities
              </h3>

              <div className="space-y-4 text-sm">
                {/* Activity 1 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Wireframes</p>
                      <p className="text-xs text-gray-500">Submitted Stelar</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">5 hours ago</span>
                </div>

                {/* Activity 2 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <IndianRupee size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">
                        ₹25,000 released
                      </p>
                      <p className="text-xs text-gray-500">PQ Solutions</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">5 hours ago</span>
                </div>

                {/* Activity 3 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Upload size={16} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">
                        Revision Requested
                      </p>
                      <p className="text-xs text-gray-500">PQ Solutions</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSec;
