import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { MdPhone, MdLanguage, MdEmail, MdWork } from "react-icons/md";
import { motion } from "framer-motion";
import Header from "./Header";

const AdminSec5 = () => {

     const users = Array(1).fill({
    name: "Angela Moss",
    company: "Highnest Studios",
    plan: "-Basic",
    Date: "- 8th November, 2025",
    TransactionID: "- 768976543234 ",
    Registeredas:  "- Startup",
    PaymentAmount:  " - Rs 9999",
    
  });

  const statuses = ["Received","Approved", "Rejected"];

  return (
    <div className="min-h-screen bg-[#ebebeb] p-6">
      {/* Header - White Background Container */}
     <Header />

      {/* Main Content Area */}
      <div className="max-w-[96%] mx-auto flex gap-4 mt-25">
        {/* Sidebar - White Background */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-[200px] bg-white h-[83vh] rounded-2xl p-3 shadow-sm"
        >
          <div className="space-y-2">
            {statuses.map((status) => (
              <button
                key={status}
                className="w-full py-3 px-3 bg-[#001426] text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors text-center leading-tight whitespace-nowrap"
              >
                {status}
              </button>
            ))}
          </div> 
        </motion.div>

        {/* Cards Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  ">
          {users.map((user, index) => (
            <div className="flex flex-col">
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-full flex justify-between items-start mb-2 pr-2">
                  {/* Profile Image */}
                  <div className="w-22 h-22 bg-[#C4C4C4] rounded-full mx-auto mb-2"></div>

                  {/* Right Side: Toggle + User Info */}
                  <div className="flex flex-col items-end">
                    {/* Toggle Switch (Extreme Right) */}
                    <label className="relative inline-flex items-center cursor-pointer mb-4">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-14 h-8 bg-[#C4C4C4] peer-focus:outline-none rounded-full relative peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#335559]"></div>
                    </label>

                    {/* User Info */}
                    <div className="flex flex-col items-end">
                      <h3 className="font-semibold text-[#001426] mb-1 text-lg">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-6">
                        {user.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Details - Two Column Layout */}
                <div className="flex gap-3 ml-2">
                  {/* Icon Column */}
                  <div className="flex flex-col  rounded-2xl p-2 gap-2">
                    <div className=" flex items-center justify-center shrink-0">
                     plan
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                     Date 
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                     Transaction ID 
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                     Registered as 
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                     Payment Amount 
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="flex flex-col gap-2 flex-1 justify-center">
                    <div className="h-10 flex items-center">
                      <span className="text-sm text-[#001426] font-medium">
                        {user.plan}
                      </span>
                    </div>
                    <div className="h-10 flex items-center ">
                      <span className="text-sm text-[#001426] font-medium">
                        {user.Date}
                      </span>
                    </div>
                    <div className="h-10 flex items-center">
                      <span className="text-sm text-[#001426] font-medium underline">
                        {user.TransactionID}
                      </span>
                    </div>
                    <div className="h-10 flex items-center">
                      <span className="text-sm text-[#001426] font-medium">
                        {user.Registeredas}
                      </span>
                    </div>
                    <div className="h-10 flex items-center">
                      <span className="text-sm text-[#001426] font-medium">
                        {user.PaymentAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow Button */}
                <button className="w-12 h-12 bg-[#335559] rounded-full flex items-center justify-center ml-auto hover:bg-teal-800 transition-colors">
                  <FiArrowRight size={20} className="text-white" />
                </button>
              </motion.div>
              <button className="bg-[#001426] text-white p-2 mt-2 rounded-lg">Payment Received</button>
              <div className="flex justify-between gap-2 px-6 mb-6 mt-3 w-full">
                <button className="px-4  py-2 rounded-lg text-white text-[18px] font-medium bg-[#335559]">
                  Approve
                </button>
                <button className="px-4  py-2 rounded-lg text-white text-[18px] font-medium bg-[#ba1e1e]">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminSec5