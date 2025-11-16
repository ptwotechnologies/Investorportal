import React, { useState } from "react";
import { FiPhone, FiGlobe, FiMail, FiBriefcase, FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";
import Header from "./Header";
import { FiArrowRight } from "react-icons/fi";
import { MdPhone, MdLanguage, MdEmail, MdWork } from "react-icons/md";

const AdminSec3 = () => {

    const topSkills = [
    "Strategic Planning",
    "Marketing Strategy",
    "Customer Service",
    "Pricing Strategy",
    "Training",
  ];

  const services = [
    "Strategic Planning",
    "Marketing Strategy Management",
    "Pricing Strategy",
    "Training",
    "Team Building",
    "Research Skills",
    "Research",
    "Management",
  ];

  return (
     <div className="min-h-screen bg-[#ebebeb] p-6">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <div className="max-w-[96%] mx-auto flex gap-4">
        {/* top div  */}
        <div className="w-full gap-6 flex items-center justify-center py-4 ">
          {/* left  */}
          <div className="w-[25%] px-8 py-3 bg-white rounded-lg">
            <div className="w-full flex justify-between items-start">
              <div className="w-24 h-24 bg-[#C4C4C4] rounded-full mx-auto"></div>

              <div className="flex flex-col items-end">
                {/* Toggle Switch (Extreme Right) */}
                <label className="relative inline-flex items-center cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-14 h-8 bg-[#C4C4C4] peer-focus:outline-none rounded-full relative peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#335559]"></div>
                </label>

                {/* User Info */}
                <div className="flex flex-col items-end">
                  <h3 className="font-semibold text-[#001426] text-lg">
                    Angela Moss
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">Highnest Studios</p>
                </div>
              </div>
            </div>

            {/* Contact Details - Two Column Layout */}
            <div className="flex gap-3 ml-2">
              {/* Icon Column */}
              <div className="flex flex-col bg-[#001426] rounded-2xl p-2 gap-1">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shrink-0">
                  <MdPhone size={20} className="text-[#001426]" />
                </div>
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shrink-0">
                  <MdLanguage size={20} className="text-[#001426]" />
                </div>
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shrink-0">
                  <MdEmail size={20} className="text-[#001426]" />
                </div>
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shrink-0">
                  <MdWork size={20} className="text-[#001426]" />
                </div>
              </div>

              {/* Text Column */}
              <div className="flex flex-col gap-2 flex-1 justify-center">
                <div className="h-6 flex items-center">
                  <span className="text-sm text-[#001426] font-medium">
                    +91 8766270884
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-sm text-[#001426] font-medium">
                    www.artestor.com
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-sm text-[#001426] font-medium underline">
                    info@artestor.com
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-sm text-[#001426] font-medium">
                    Founder, CEO
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* mid  */}
          <div className="w-[50%] px-10 py-4 bg-white rounded-lg self-stretch">
            <h2 className="mb-4 text-[#001426] text-xl font-semibold">About</h2>
            <p className="mb-6 text-gray-800 text-sm leading-relaxed">
              An experienced entrepreneur and business professional who
              consistently delivers high-quality and result-focused marketing
              campaign, customer experience and design valuable content for
              go-to-market, launch, start-up, brand building, event and
              community engagement. Dedicated results and omni channel product
              marketing, brand and community development. Visionary,
              self-driven, motivated, who can take ownership and have the zeal
              to build something global. Skilled in operations management,
              operational Planning, Business Strategies and Employee Training.{" "}
              <span className="font-semibold text-black">See more...</span>{" "}
            </p>
          </div>
          {/* right  */}
          <div className="w-[25%] px-10 py-4 bg-white rounded-lg self-stretch">
            <h2 className="mb-4 text-[#001426] text-xl font-semibold">
              Services
            </h2>
            <p className="text-base leading-relaxed text-[#0a1034] mb-6">
              Strategic Planning • Marketing Strategy • Customer Service •
              Pricing Strategy • Training • Team Building • Research Skills •
              Market Research{" "}
              <span className="font-semibold text-[#0a1034] cursor-pointer hover:underline">
                See more...
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Experience Section */}
      <div className="bg-white max-w-[96%] mx-auto rounded-lg shadow-md p-6 px-10 relative">
        <div className="flex max-w-[60%] mx-auto mb-4 border border-gray-800 justify-center py-4 rounded-2xl flex-wrap items-center gap-4 text-sm">
          <span className="font-semibold text-[#001426]">Top Skills</span>
          <span className="text-gray-800">
            Strategic Planning • Marketing Strategy • Customer Service • Pricing
            Strategy • Training{" "}
            <span className="ml-2 text-[#001426] font-medium cursor-pointer">
              See more...
            </span>
          </span>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center shrink-0">
            <span className="text-orange-600">🏛️</span>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-4">Founder</h4>
            <p className="text-sm text-gray-700 mb-1">
              Dharanam Foundation · Full-time
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Oct 2024 - Present · 1 yr
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Noida, Uttar Pradesh, India · Hybrid
            </p>

            <ul className="text-sm text-gray-700 space-y-1 mt-6 list-disc list-inside">
              <li>
                Designing customized revenue-generation strategies to enhance
                financial independence
              </li>
              <li>
                Assisting NGOs with technology, legal, and marketing support at
                zero cost to enhance their growth and impact.
                <button className="font-semibold ml-1 hover:underline">
                  See more...
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* portfolio section  */}
      <div className="bg-white max-w-[96%] mx-auto mt-4 rounded-lg shadow-md p-6 px-16 relative">
        <h3 className="text-xl font-semibold text-gray-900 my-4">Portfolio</h3>

        <div className="max-w-full mx-auto mb-6">
          <div className="flex gap-4 overflow-x-auto flex-nowrap md:flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div
                key={item}
                className="shrink-0 w-60 md:w-[calc(18%-1rem)]"
              >
                <div className="border border-gray-300 rounded-lg aspect-square flex items-center justify-center shadow-md">
                  {/* Card content */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* social media secction  */}
      <div className="bg-white max-w-[96%] mx-auto my-4 rounded-lg shadow-md p-6 px-10 relative">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Social Media
        </h3>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex gap-6 justify-between">
            <a
              href="#"
              className="py-2 w-[80%] px-6 border border-gray-300 shadow-md rounded-lg"
            >
              Linkedin Profile
            </a>
            <button className="px-4 w-[20%] py-2 rounded-2xl text-white font-medium bg-[#335559]">
              Approve
            </button>
          </div>
          <div className="flex gap-6 justify-between">
            <a
              href="#"
              className=" w-[80%] py-2 px-6 border border-gray-300 shadow-md rounded-lg"
            >
              Instagram Profile
            </a>
            <button className="px-4 w-[20%] py-2 rounded-2xl text-white font-medium bg-[#ba1e1e]">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSec3
