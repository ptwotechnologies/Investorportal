import React from 'react'
import ProgressBar, { ProgressBar2, ProgressBar3 } from "./ProgressBar";
import {
  FaCalendar,
  FaCalendarCheck,
  FaImage,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import Graph1 from "./Graph1";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';


const DashboardSec = () => {
 const percentage = 75;
 const percentage2 = 25;

     const members = Array(4).fill(null);
     const newRegistrations = [
    { name: "Kirti Saini", role: "Startup", hours: "12.5 h" },
    { name: "Parineeta", role: "Investor", hours: "18.6 h" },
    { name: "Nandini Sen", role: "Service Professional", hours: "4.2 h" },
    { name: "Rahul Rai", role: "Startup", hours: "2.5 h" },
  ];


  return (
    <div className='bg-gray-200 h-screen pt-2 px-2'>
      <div className='hidden lg:block'>
         <div
                  id="topbar"
                  className="flex justify-between items-center  border-2 border-[#D9D9D9] rounded-xl bg-white px-5  mx-2 p-2"
                >
                  <div>
                    <p className="font-semibold text-[#001032]">
                      Welcome, Startup India Pvt. Ltd.
                    </p>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <CgProfile className="text-gray-500 " size={25} />
                    <p className="text-[#001426] font-semibold">
                      Switch to professional
                    </p>
                  </div>
                </div>
        <div className="bg-gray-200 px-3 pt-3 flex gap-3 ">
        <div id="left" className="w-[70%] ">
          <div id="top" className="flex items-center gap-3">
            <div id="left" className="rounded-2xl bg-white p-5 h-[47vh]  w-[50%]">
              <h1 className="text-3xl font-semibold text-[#202020] my-3">
                Progress Statistics
              </h1>
              <div className="flex items-center gap-3 my-6 text-[#202020]">
                <h1 className="text-2xl font-semibold ">64%</h1>
                <p className="w-[20%] font-normal text-md leading-5">
                  Total Activity
                </p>
              </div>

              <div className="flex items-center w-full gap-2 text-[#6F6F6F] my-4 mb-5">
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

              <div className="flex items-center justify-evenly bg-gray-100  p-2 mt-1 rounded-3xl">
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
              className="rounded-2xl bg-white p-3 py-4 h-[47vh]  w-[50%]"
            >
              <div className="flex  items-center justify-between ">
           <h1  className="text-3xl font-semibold text-[#202020] my-2">Profile</h1>
              </div>
              <div>
               
                <p className="text-sm text-[#6F6F6F] w-[90%] my-1">
                  Punctuation - learn the basics without the pain people will
                  never laugh at your punctuation again. you do not require any
                  materials or software
                </p>
                <div className="flex justify-between items-center gap-5 mt-4 mb-2">
                  <div id="members" className="w-[50%] ">
                    <div className="bg-[#f1f1f1] p-2 py-2  rounded-xl">
                      <p className="text-lg text-gray-500  text-center pb-1">
                       People
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
                        Optimisation
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
                <div className='bg-[#F1F1F1] w-full py-3 px-7 rounded-2xl my-3'>
                   <div className='bg-yellow-200 rounded-xl'>
                     <div
                          className="bg-yellow-400 h-full flex items-center justify-center transition-all rounded-xl"
                          style={{ width: `${percentage2}%` }}
                        >
                          <span className="text-gray-800 font-bold text-xs">
                            {percentage2}%
                          </span>
                        </div>
                   </div>

                </div>

                <div className="bg-[#001426] text-white p-1 rounded-lg text-center mt-1">
                  <Link to="/profile"><button className="">Complete Your Profile</button></Link>
                </div>
              </div>
            </div>
          </div>

          <div id="bottom" className="bg-white rounded-2xl mt-3 h-[41vh]">
            <div className="flex items-center justify-between px-5 py-4">
              <h1 className="text-3xl text-[#202020] font-semibold">Requests</h1>
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
                <h1 className="my-3  leading-5 text-[#202020] font-semibold text-lg">
                  Require development service{" "}
                </h1>
                <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-4 my-1 mb-4 rounded-md">
                  Check status
                </button>
                <div className="flex items-center gap-2 my-2">
                  <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                  <div className="text-sm ">
                    <p>Harika</p>
                    <p>Investor</p>
                  </div>
                </div>
              </div>

               <div className="border w-[35%] p-3 text-white  bg-[#001426] rounded-3xl mb-2">
                <p className=" text-sm">14.00 P.M.</p>
                <h1 className="my-3  leading-5  font-semibold text-lg">
                  Require to connect with investors
                </h1>
                <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-4 my-1 mb-4 rounded-md">
                 Check status
                </button>
                <div className="flex items-center gap-2 my-2">
                  <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                  <div className="text-sm">
                    <p>Anil Jain</p>
                    <p>Startup</p>
                  </div>
                </div>
              </div>


            <div className="border w-[35%] p-3 bg-[#F1F1F1] rounded-3xl mb-2">
                <p className="text-[#6F6F6F] text-sm">17.00 P.M.</p>
                <h1 className="my-3  leading-5 text-[#202020] font-semibold text-lg">
                  Looking for <br/> assistance in leads
                </h1>
                <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-6 my-1 mb-4  rounded-md ">
                  Check status
                </button>
                <div className="flex items-center gap-2 my-2">
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

        <div id="right" className="w-[30%] h-[90vh] bg-white rounded-2xl p-4 text-[#202020]">
         <div className="flex items-center justify-between">
           <p className="text-3xl font-semibold my-4">Activity</p>
          <div className="flex items-center gap-1 border border-[#6F6F6F] p-1 px-3 rounded-2xl">
            <FaCalendar/>
            <p>last 7 days</p>
             </div>
         </div>

         <div className="flex items-center gap-5 p-5 py-5">
          <p className="text-3xl font-semibold">50</p>
          <p className="text-md font-medium">Connects</p>
         </div>

         <div>
          <Graph1/>
         </div>

         <div className="bg-[#F1F1F1] px-8 py-4 mt-4 rounded-2xl">
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




      <div className='lg:hidden bg-gray-100 h-auto'>
        <div>
          <div
              id="right"
              className="rounded-2xl bg-white p-3 py-4 mt-2 m-2"
            >
              <div className="flex  items-center justify-between ">
           <h1  className="text-xl font-semibold text-[#202020] my-1">Profile</h1>
              </div>
              <div>
               
                <p className="text-xs text-[#6F6F6F]  my-1">
                  Punctuation - learn the basics without the pain people will
                  never laugh at your punctuation again. you do not require any
                  materials or software
                </p>
                <div className="flex justify-between items-center gap-3 mt-4 mb-2">
                  <div id="members" className="w-[50%] ">
                    <div className="bg-[#f1f1f1] p-2 py-2  rounded-xl">
                      <p className="text-sm text-gray-500  text-center pb-1">
                        People
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
                      <p className="text-sm text-gray-500  text-center pb-1">
                        Optimisation
                      </p>

                      <div className="w-full bg-yellow-200 rounded-xl h-8 overflow-hidden my-1">
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
                <div className='bg-[#F1F1F1] w-full py-3 px-7 rounded-2xl my-3'>
                   <div className='bg-yellow-200 rounded-xl'>
                     <div
                          className="bg-yellow-400 h-full flex items-center justify-center transition-all rounded-xl"
                          style={{ width: `${percentage2}%` }}
                        >
                          <span className="text-gray-800 font-bold text-xs">
                            {percentage2}%
                          </span>
                        </div>
                   </div>

                </div>

                <div className="bg-[#001426] text-white p-1 rounded-lg text-center mt-1">
                 <Link to="/profile"> <button className="">Complete Your Profile</button></Link>
                </div>
              </div>
            </div>

            <div id="left" className="rounded-2xl bg-white p-5 mt-3 m-2 ">
              <h1 className="text-xl font-semibold text-[#202020] my-4">
                Progress Statistics
              </h1>
              <div className="flex items-center gap-3 my-6 text-[#202020]">
                <h1 className="text-2xl font-semibold ">64%</h1>
                <p className="w-[20%] font-normal text-sm leading-5">
                  Total Activity
                </p>
              </div>

              <div className="flex items-center w-full gap-2 text-[#6F6F6F] my-4 mb-7">
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
                  <p className="text-center  text-sm text-[#202020]">8</p>
                  <p className="text-[#202020] text-sm">Connect</p>
                </div>
                <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                <div>
                  <div className="bg-[#0B5EFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <RiCheckDoubleLine />
                  </div>
                  <p className="text-center  text-sm text-[#202020]">12</p>
                  <p className='text-[#202020] text-sm"'>Requests</p>
                </div>

                <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                <div>
                  <div className="bg-[#FF6812] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <FaCalendarCheck />
                  </div>
                  <p className="text-center  text-[#202020] text-sm">14</p>
                  <p className='text-[#202020] text-sm"'>Help Tokens</p>
                </div>
              </div>
            </div>

               <div id="bottom" className="bg-white rounded-2xl p-5 mt-3 m-2">
            <div className="flex items-center justify-between  py-2">
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

            <div className="flex flex-col items-center gap-2 py-2">
              <div className="border w-full  p-3 bg-[#F1F1F1] rounded-3xl mb-2">
                <p className="text-[#6F6F6F] text-sm">10.30 A.M.</p>
                <h1 className="my-3  w-[85%] leading-5 text-[#202020] font-semibold text-lg">
                  Require development service{" "}
                </h1>
                <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-4 my-1 mb-4 rounded-md">
                  Check status
                </button>
                <div className="flex items-center gap-2 my-2">
                  <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                  <div className="text-sm ">
                    <p>Harika</p>
                    <p>Investor</p>
                  </div>
                </div>
              </div>

               <div className="border w-full   p-3 text-white  bg-[#001426] rounded-3xl mb-2">
                <p className=" text-sm">14.00 P.M.</p>
                <h1 className="my-3  leading-5  font-semibold text-lg">
                  Require to connect with investors
                </h1>
                <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-4 my-1 mb-4 rounded-md">
                 Check status
                </button>
                <div className="flex items-center gap-2 my-2">
                  <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                  <div className="text-sm">
                    <p>Anil Jain</p>
                    <p>Startup</p>
                  </div>
                </div>
              </div>


            <div className="border w-full   p-3 bg-[#F1F1F1] rounded-3xl mb-2">
                <p className="text-[#6F6F6F] text-sm">17.00 P.M.</p>
                <h1 className="my-3 w-[65%] leading-5 text-[#202020] font-semibold text-lg">
                  Looking for assistance in leads
                </h1>
                <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-6 my-1 mb-4  rounded-md ">
                  Check status
                </button>
                <div className="flex items-center gap-2 my-2">
                  <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                  <div className="text-sm">
                    <p>Niharika Sharma</p>
                    <p>Service Professional</p>
                  </div>
                </div>
              </div>

            </div>
          </div> 


           <div id="right" className="mt-2 m-2 h-[96vh] bg-white rounded-2xl p-4 text-[#202020]">
         <div className="flex items-center justify-between">
           <p className="text-3xl font-semibold my-4">Activity</p>
          <div className="flex items-center gap-1 border border-[#6F6F6F] p-1 px-3 rounded-2xl">
            <FaCalendar/>
            <p>last 7 days</p>
             </div>
         </div>

         <div className="flex items-center gap-5 p-5 py-8">
          <p className="text-3xl font-semibold">50</p>
          <p className="text-md font-medium">Connects</p>
         </div>

         <div>
          <Graph1/>
         </div>

         <div className="bg-[#F1F1F1] px-8 py-6 mt-5 rounded-2xl">
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

     
    </div>
  )
}

export default DashboardSec
