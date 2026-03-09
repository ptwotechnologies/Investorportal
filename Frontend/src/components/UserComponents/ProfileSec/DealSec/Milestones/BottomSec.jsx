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
    <div className="flex flex-col lg:flex-row items-start gap-4 w-full lg:px-6 px-3 py-4">
      <div className="lg:w-[70%] w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-[#5C5D78]">Milestones</h1>
          </div>

          <div className="flex items-center gap-2 text-[#837DA1]">
            <div className="bg-white border px-2 lg:px-3 py-1 rounded-md text-xs lg:text-sm flex items-center gap-1 lg:gap-2">
              <AiOutlineBars />
              <button>All Status</button>
            </div>
            <div className="bg-white border px-2 lg:px-3 py-1 rounded-md text-xs lg:text-sm flex items-center gap-1">
              <button>Due Date</button>
              <RiArrowDownSLine size={18} />
            </div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 h-[60vh] overflow-y-auto scrollbar-hide">

          {/* ── Card 1: Stellar ── */}
          <div className="bg-white w-full rounded-2xl shadow-md p-3">

            {/* Top Section */}
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-orange-400 flex items-center justify-center shrink-0">
                <p className="text-white font-bold text-base lg:text-lg">S</p>
              </div>
              <div className="w-full min-w-0">
                <h1 className="text-sm lg:text-lg font-semibold text-gray-800 leading-tight">
                  Stellar{" "}
                  <span className="text-xs lg:text-sm text-gray-500 font-normal">
                    - Mobile App Development
                  </span>
                </h1>
                <div className="w-full flex items-center justify-between mt-0.5">
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-gray-500">Project:</p>
                    <p className="font-semibold text-gray-800 text-xs">Arjun Patel</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-[10px] lg:text-xs text-gray-400">Total Value</p>
                    <p className="font-semibold text-gray-800 text-xs">₹ 25,00,000</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Milestone 1 */}
            <div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-sm bg-[#71BEB6] flex items-center justify-center shrink-0 mt-0.5">
                  <p className="text-white font-bold text-xs">1</p>
                </div>
                <div className="w-full min-w-0">
                  {/* Title row — stacks on mobile */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <h1 className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                      Milestone 1
                      <span className="text-xs text-gray-500 font-normal ml-1">- Wireframes</span>
                    </h1>
                    <div className="flex items-center justify-between gap-2">
                      <div className="bg-[#EEE8FB] rounded-full py-0.5 px-3 text-[10px] lg:text-xs whitespace-nowrap">
                        Due 02 Feb 2026
                      </div>
                      <p className="text-xs text-gray-700 font-medium whitespace-nowrap">₹ 25,00,000</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="my-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-linear-to-r from-[#71BEB6] to-[#85C3BF] rounded-full" />
                  </div>

                  {/* Action row — wraps on mobile */}
                  <div className="flex  items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#8076A3] text-xs">Status</span>
                      <button className="bg-linear-to-b from-[#A8A0E8] to-[#958FD9] py-1 px-2 lg:px-3 rounded-sm text-white text-[10px] lg:text-xs whitespace-nowrap">
                        View Summary
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <div className="bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white font-semibold py-1 px-2 lg:px-4 rounded-sm flex items-center gap-1.5 lg:gap-5 text-[10px] lg:text-xs">
                        <button className="whitespace-nowrap">Approve</button>
                        <div className="w-px h-4 lg:h-6 bg-[#2B877B]" />
                        <button className="whitespace-nowrap">Request Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Milestone 2 */}
            <div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-sm bg-[#F5959F] flex items-center justify-center shrink-0 mt-0.5">
                  <p className="text-white font-bold text-xs">2</p>
                </div>
                <div className="w-full min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <h1 className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                      Milestone 2
                      <span className="text-xs text-gray-500 font-normal ml-1">- UI Screens</span>
                    </h1>
                    <div className="flex items-center justify-between gap-2">
                      <div className="bg-[#EEE8FB] rounded-full py-0.5 px-3 text-[10px] lg:text-xs whitespace-nowrap">
                        Due 02 Feb 2026
                      </div>
                      <p className="text-xs text-gray-700 font-medium whitespace-nowrap">₹ 25,00,000</p>
                    </div>
                  </div>

                  <div className="my-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-linear-to-r from-[#F68F9D] to-[#F38A97] rounded-full" />
                  </div>

                  <div className="flex  items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#8076A3] text-xs">Status</span>
                      <button className="bg-linear-to-b from-[#A8A0E8] to-[#958FD9] py-1 px-2 lg:px-3 rounded-sm text-white text-[10px] lg:text-xs whitespace-nowrap">
                        View Summary
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <div className="bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white font-semibold py-1 px-2 lg:px-4 rounded-sm flex items-center gap-1.5 lg:gap-5 text-[10px] lg:text-xs">
                        <button className="whitespace-nowrap">Approve</button>
                        <div className="w-px h-4 lg:h-6 bg-[#2B877B]" />
                        <button className="whitespace-nowrap">Request Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Card 2: NomadX ── */}
          <div className="bg-white w-full rounded-2xl shadow-md p-3">

            {/* Top Section */}
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-blue-400 flex items-center justify-center shrink-0">
                <p className="text-white font-bold text-base lg:text-lg">A</p>
              </div>
              <div className="w-full min-w-0">
                <h1 className="text-sm lg:text-lg font-semibold text-gray-800 leading-tight">
                  NomadX{" "}
                  <span className="text-xs lg:text-sm text-gray-500 font-normal">
                    - Mobile App Development
                  </span>
                </h1>
                <div className="w-full flex items-center justify-between mt-0.5">
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-gray-500">Project:</p>
                    <p className="font-semibold text-gray-800 text-xs">Arjun Patel</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-[10px] lg:text-xs text-gray-400">Total Value</p>
                    <p className="font-semibold text-gray-800 text-xs">₹ 25,00,000</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Milestone 1 */}
            <div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-sm bg-[#71BEB6] flex items-center justify-center shrink-0 mt-0.5">
                  <p className="text-white font-bold text-xs">1</p>
                </div>
                <div className="w-full min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <h1 className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                      Milestone 1
                      <span className="text-xs text-gray-500 font-normal ml-1">- Wireframes</span>
                    </h1>
                    <div className="flex items-center justify-between gap-2">
                      <div className="bg-[#EEE8FB] rounded-full py-0.5 px-3 text-[10px] lg:text-xs whitespace-nowrap">
                        Due 02 Feb 2026
                      </div>
                      <p className="text-xs text-gray-700 font-medium whitespace-nowrap">₹ 25,00,000</p>
                    </div>
                  </div>

                  <div className="my-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-linear-to-r from-[#71BEB6] to-[#85C3BF] rounded-full" />
                  </div>

                  <div className="flex  items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#8076A3] text-xs">Status</span>
                      <button className="bg-linear-to-b from-[#A8A0E8] to-[#958FD9] py-1 px-2 lg:px-3 rounded-sm text-white text-[10px] lg:text-xs whitespace-nowrap">
                        View Summary
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <div className="bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white font-semibold py-1 px-2 lg:px-4 rounded-sm flex items-center gap-1.5 lg:gap-5 text-[10px] lg:text-xs">
                        <button className="whitespace-nowrap">Approve</button>
                        <div className="w-px h-4 lg:h-6 bg-[#2B877B]" />
                        <button className="whitespace-nowrap">Request Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Milestone 2 */}
            <div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-sm bg-[#F5959F] flex items-center justify-center shrink-0 mt-0.5">
                  <p className="text-white font-bold text-xs">2</p>
                </div>
                <div className="w-full min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <h1 className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                      Milestone 2
                      <span className="text-xs text-gray-500 font-normal ml-1">- UI Screens</span>
                    </h1>
                    <div className="flex items-center justify-between gap-2">
                      <div className="bg-[#EEE8FB] rounded-full py-0.5 px-3 text-[10px] lg:text-xs whitespace-nowrap">
                        Due 02 Feb 2026
                      </div>
                      <p className="text-xs text-gray-700 font-medium whitespace-nowrap">₹ 25,00,000</p>
                    </div>
                  </div>

                  <div className="my-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-linear-to-r from-[#F68F9D] to-[#F38A97] rounded-full" />
                  </div>

                  <div className="flex  items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#8076A3] text-xs">Status</span>
                      <button className="bg-linear-to-b from-[#A8A0E8] to-[#958FD9] py-1 px-2 lg:px-3 rounded-sm text-white text-[10px] lg:text-xs whitespace-nowrap">
                        View Summary
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <div className="bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white font-semibold py-1 px-2 lg:px-4 rounded-sm flex items-center gap-1.5 lg:gap-5 text-[10px] lg:text-xs">
                        <button className="whitespace-nowrap">Approve</button>
                        <div className="w-px h-4 lg:h-6 bg-[#2B877B]" />
                        <button className="whitespace-nowrap">Request Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── RIGHT: Execution Insights ── */}
      <div className="lg:w-[30%] w-full">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-semibold text-[#5C5D78]">Execution Insights</h1>
          <ButtonGroup className="h-7">
            <Button variant="secondary" size="sm" className="h-full bg-[#EBE0FB] text-[#5D46B7] rounded-sm">
              <IoGrid />
            </Button>
            <ButtonGroupSeparator />
            <Button variant="secondary" size="sm" className="h-full bg-white rounded-sm">
              <BiObjectsHorizontalLeft />
            </Button>
          </ButtonGroup>
        </div>

        <div className="w-full bg-white rounded-2xl">
          {/* Upcoming Deadlines */}
          <div className="lg:px-5 px-3 py-3">
            <h3 className="text-gray-700 font-semibold mb-4 text-sm">Upcoming Deadlines</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
                  <span className="text-gray-700 text-xs lg:text-sm">UI Screens</span>
                </div>
                <span className="text-gray-500 text-xs">10 days</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">2</div>
                  <span className="text-gray-700 text-xs lg:text-sm">Backend API</span>
                </div>
                <span className="text-gray-500 text-xs">12 days</span>
              </div>
            </div>
          </div>

          <hr className="mx-5 my-2" />

          {/* Approval Pending */}
          <div className="lg:px-5 px-3">
            <h3 className="text-gray-700 font-semibold mb-2 text-sm">Approval Pending</h3>
            <div className="bg-[#FDF5EE] rounded-xl p-3 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <IndianRupee size={15} className="text-gray-600" />
                  <span className="text-sm lg:text-lg font-semibold text-gray-800">
                    30,000 <span className="text-xs text-gray-400">Ceccal</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Escrow ↓ 2 days</p>
              </div>
              <span className="text-xs bg-yellow-100 text-[#877A68] px-2 lg:px-3 py-1 rounded-full font-medium whitespace-nowrap">
                In 2 Days <span className="text-[#EDB778] font-bold">10</span>
              </span>
            </div>
          </div>

          <hr className="mx-5 my-3" />

          {/* Recent Activities */}
          <div className="lg:px-5 px-3 pb-3">
            <h3 className="text-gray-700 font-semibold mb-3 text-sm">Recent Activities</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-xs lg:text-sm">Wireframes</p>
                    <p className="text-xs text-gray-500">Submitted Stellar</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 shrink-0 ml-2">5 hours ago</span>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <IndianRupee size={14} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-xs lg:text-sm">₹25,000 released</p>
                    <p className="text-xs text-gray-500">PQ Solutions</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 shrink-0 ml-2">5 hours ago</span>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <Upload size={14} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-xs lg:text-sm">Revision Requested</p>
                    <p className="text-xs text-gray-500">PQ Solutions</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 shrink-0 ml-2">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BottomSec;