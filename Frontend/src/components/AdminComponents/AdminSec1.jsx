import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import {
  FaCalendar,
  FaCalendarCheck,
  FaImage,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import ProgressBar, { ProgressBar2, ProgressBar3 } from "../UserComponents/ProfileSec/UserDashboard/ProgressBar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import Graph1 from "../UserComponents/ProfileSec/UserDashboard/Graph1";

const AdminSec1 = () => {
  const percentage = 75;

  const members = Array(4).fill(null);
  const newRegistrations = [
    { name: "Kirti Saini", role: "Startup", hours: "12.5 h" },
    { name: "Parineeta", role: "Investor", hours: "18.6 h" },
    { name: "Nandini Sen", role: "Service Professional", hours: "4.2 h" },
    { name: "Rahul Rai", role: "Startup", hours: "2.5 h" },
  ];

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="bg-gray-200 pt-34 p-7 flex gap-4">
        <div id="left" className="w-[70%] ">
          <div id="top" className="flex items-center gap-4">
            <div id="left" className="rounded-2xl bg-white p-5  w-[50%]">
              <h1 className="text-xl font-semibold text-[#202020] mb-2">
                Progress Statistics
              </h1>
              <div className="flex items-center gap-3 mb-4 text-[#202020]">
                <h1 className="text-2xl font-semibold ">64%</h1>
                <p className="w-[20%] font-normal text-md leading-5">
                  Total Activity
                </p>
              </div>

              <div className="flex items-center w-full gap-2 text-[#6F6F6F]">
                <div className="w-[60%]">
                  <ProgressBar />
                  <p className="text-sm mt-1">20%</p>
                </div>
                <div className="w-[80%]">
                  <ProgressBar2 />
                  <p className="text-sm mt-1">35%</p>
                </div>
                <div className="w-full">
                  <ProgressBar3 />
                  <p className="text-sm mt-1">41%</p>
                </div>
              </div>

              <div className="flex items-center justify-evenly bg-gray-100  p-2 mt-3 rounded-3xl">
                <div>
                  <div className="bg-[#760BFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <FaImage />
                  </div>
                  <p className="text-center my-2 text-2xl text-[#202020]">8</p>
                  <p className="text-[#202020]">On Approval</p>
                </div>
                <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                <div>
                  <div className="bg-[#0B5EFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <RiCheckDoubleLine />
                  </div>
                  <p className="text-center my-2 text-2xl text-[#202020]">12</p>
                  <p>Registered</p>
                </div>

                <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                <div>
                  <div className="bg-[#FF6812] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <FaCalendarCheck />
                  </div>
                  <p className="text-center my-2 text-2xl text-[#202020]">14</p>
                  <p>Requests</p>
                </div>
              </div>
            </div>

            <div
              id="right"
              className="rounded-2xl bg-[#F7F8FA] p-3 py-4  w-[50%]"
            >
              <div className="flex  items-center justify-between ">
                <h1 className="bg-[#E6FFEC] text-[#00801F] text-sm font-medium p-1 px-7 rounded-3xl">
                  Startup
                </h1>
                <h1 className="bg-[#EEE6FF] text-[#250075] text-sm font-medium p-1 px-7 rounded-3xl">
                  Service Professional
                </h1>
                <h1 className="bg-[#00142633] text-[#250075] text-sm font-medium p-1 px-7 rounded-3xl">
                  Investor
                </h1>
              </div>
              <div>
                <h1 className="text-lg font-medium text-[#202020] mt-2">
                  English punctuation made easy{" "}
                </h1>
                <p className="text-sm text-[#6F6F6F] w-[90%] my-1">
                  Punctuation - learn the basics without the pain people will
                  never laugh at your punctuation again. you do not require any
                  materials or software
                </p>
                <div className="flex justify-between items-center gap-5 mt-2">
                  <div id="members" className="w-[50%] ">
                    <div className="bg-[#f1f1f1] p-2 py-2  rounded-xl">
                      <p className="text-lg text-gray-500  text-center pb-1">
                        Members
                      </p>
                      <div className="flex -space-x-2 justify-center">
                        {members.map((_, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div id="subscription" className=" w-[50%] ">
                    <div className="bg-[#f1f1f1] p-2 py-2   rounded-xl">
                      <p className="text-lg text-gray-500  text-center pb-1">
                        Subscriptions
                      </p>

                      <div className="w-full bg-yellow-100 rounded-xl h-10 overflow-hidden">
                        <div
                          className="bg-yellow-400 h-full rounded-xl flex items-center justify-center transition-all"
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-gray-800 font-bold text-sm">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#001426] text-white p-1 rounded-lg text-center mt-1">
                  <button className="">Continue Learning</button>
                </div>
              </div>
            </div>
          </div>

          <div id="bottom" className="bg-white rounded-2xl mt-4">
            <div className="flex items-center justify-between px-5 py-4">
              <h1 className="text-xl text-[#202020] font-semibold">Requests</h1>
              <div className="flex items-center gap-1 ">
                <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                  <IoIosArrowRoundBack size={25} />
                </div>
                <h1 className="text-[#202020] font-medium ">Today</h1>
                <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                  <IoIosArrowRoundForward size={25} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4  px-4 ">
              <div className="border w-[35%] p-3 bg-[#F1F1F1] rounded-3xl mb-2">
                <p className="text-[#6F6F6F] text-sm">10.30 A.M.</p>
                <h1 className="mt-2 w-[50%] leading-5 text-[#202020] font-semibold text-lg">
                  Applied as an investor{" "}
                </h1>
                <button className="bg-white text-[#FF6812] py-1 px-6 my-4 rounded-md">
                  Approve
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                  <div className="text-sm">
                    <p>Harika</p>
                    <p>Investor</p>
                  </div>
                </div>
              </div>

               <div className="border w-[35%] p-3 text-white  bg-[#001426] rounded-3xl mb-2">
                <p className=" text-sm">14.00 P.M.</p>
                <h1 className="mt-2 w-[65%] leading-5  font-semibold text-lg">
                  Require to connect with investors
                </h1>
                <button className="bg-white text-[#FF6812] py-1 px-6 my-4 rounded-md">
                  Approve
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                  <div className="text-sm">
                    <p>Anil Jain</p>
                    <p>Startup</p>
                  </div>
                </div>
              </div>


            <div className="border w-[35%] p-3 bg-[#F1F1F1] rounded-3xl mb-2">
                <p className="text-[#6F6F6F] text-sm">17.00 P.M.</p>
                <h1 className="mt-2 w-[65%] leading-5 text-[#202020] font-semibold text-lg">
                  Looking for assistance in leads
                </h1>
                <button className="bg-white text-[#FF6812] py-1 px-6 my-4 rounded-md ">
                  Approve
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                  <div className="text-sm">
                    <p>Niharika Sharma</p>
                    <p>Service Professional</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div id="right" className="w-[30%] bg-[#F7F8FA] rounded-2xl p-4 text-[#202020]">
         <div className="flex items-center justify-between">
           <p className="text-xl font-semibold">Activity</p>
          <div className="flex items-center gap-1 border border-[#6F6F6F] p-1 px-3 rounded-2xl">
            <FaCalendar/>
            <p>last 7 days</p>
             </div>
         </div>

         <div className="flex items-center gap-5 p-5 py-2">
          <p className="text-3xl font-semibold">50</p>
          <p className="text-md font-medium">Registrations</p>
         </div>

         <div>
          <Graph1/>
         </div>

         <div className="bg-[#F1F1F1] px-8 pt-4 rounded-2xl">
           <h3 className="text-gray-900 text-[18px] font-semibold mb-3">
              New Registrations
            </h3>
            <div className="flex flex-col gap-2 mt-1">
              {newRegistrations.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-start gap-3">
                    {idx === 0 ? (
                      <RiCheckDoubleLine
                        size={24}
                        className="text-blue-500 text-xs mt-1"
                      />
                    ) : (
                      <RiCheckLine
                        size={24}
                        className="text-gray-400 text-xs mt-1"
                      />
                    )}
                    <div>
                      <p className="text-sm mb-1 text-gray-500">{item.name}</p>
                      <p className="text-sm font-medium text-gray-900">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{item.hours}</p>
                </motion.div>
              ))}
            </div>

         </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSec1;
