import React, { useState } from "react";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";

const AboutSec5 = () => {
  
  const [openSection, setOpenSection] = useState("investors");

  const toggle = (name) => {
    setOpenSection(prev => prev === name ? null : name);
  };
  return (
    <div className=' lg:p-12 '>
        <div className='text-4xl lg:text-5xl text-[#001032]  lg:mb-30 font-semibold lg:leading-14 tracking-wide p-5'>
         <h1>Who’s here and what matters?</h1>
        </div>
        <div className='flex flex-col lg:flex-row items-center  gap-2  '>
    <div id='left' className='lg:w-[40%] lg:p-5 mb-15'>
  
  {/* SECTION 1 — Investors (DESKTOP) */}
  <div className='hidden lg:block mb-5'>
    <div
      className='flex items-center gap-4 cursor-pointer'
      onClick={() => toggle("investors")}
    >
      {openSection === "investors" 
        ? <IoMdArrowRoundDown className='text-[#272626]' size={35} />
        : <IoMdArrowRoundForward className='text-[#272626]' size={35} />
      }
      <h1 className='text-[#000000] font-medium text-4xl'>
        Investors
      </h1>
    </div>

    {/* Paragraph INSIDE SAME BLOCK */}
    {openSection === "investors" && (
      <p className='my-6 font-medium text-md tracking-wide text-[#000000]'>
        They use the portal to find refined, verified startups that are already prepared and aligned with their interests. Since we offer investor consultations and pitch improvement support, what they receive is already filtered, focused, and investment-ready.
      </p>
    )}
  </div>

  {/* SECTION 1 MOBILE */}
  <div className='lg:hidden bg-[#001032CC] p-7 mt-8 py-14'>
    <div
      className='flex items-center gap-4 cursor-pointer '
      onClick={() => toggle("investors")}
    >
      {openSection === "investors"
        ? <IoMdArrowRoundDown className='text-white' size={30} />
        : <IoMdArrowRoundForward className='text-white' size={30} />
      }
      <h1 className='text-white font-medium text-2xl'>
        Investors
      </h1>
    </div>

    {/* paragraph INSIDE same blue box */}
    {openSection === "investors" && (
      <p className='my-6 text-md text-white ml-13'>
        They use the portal to find refined, verified startups...
      </p>
    )}
  </div>

  
  {/* SECTION 2 — Service Professionals */}
  <div
    className={`cursor-pointer transition-all duration-300 
    p-7 lg:p-0 lg:py-0 py-14 lg:my-10
    ${openSection === "service" ? "bg-[#4489C499] lg:bg-white"  : "bg-[#4489C499]  lg:bg-white"}`}
    onClick={() => toggle("service")}
  >
    <div className='flex items-center gap-4'>
      {openSection === "service"
        ? <IoMdArrowRoundDown className='text-white lg:text-[#272626]' size={35} />
        : <IoMdArrowRoundForward className='text-white lg:text-[#272626]' size={35} />
      }
      <h1 className='font-medium lg:text-4xl text-2xl  text-white lg:text-[#000000]'>
        Service Professionals
      </h1>
    </div>

    {/* paragraph stays INSIDE SAME DIV */}
    {openSection === "service" && (
      <p className='text-md lg:text-base text-white lg:text-[#000000] mt-4 ml-13 lg:ml-0'>
         They use the portal to find refined, verified startups...
      </p>
    )}
  </div>


  {/* SECTION 3 — Channel Partners */}
  <div
    className={`cursor-pointer transition-all duration-300 
    p-7 lg:p-0 lg:py-0 py-14 
    ${openSection === "channel" ? "bg-[#4489C466] lg:bg-white" : "bg-[#4489C466] lg:bg-white"}`}
    onClick={() => toggle("channel")}
  >
    <div className='flex items-center gap-4'>
      {openSection === "channel"
        ? <IoMdArrowRoundDown className='text-white lg:text-[#272626]' size={35} />
        : <IoMdArrowRoundForward className='text-white lg:text-[#272626]' size={35} />
      }
      <h1 className='font-medium lg:text-4xl text-2xl text-white lg:text-[#000000]'>
        Channel Partners
      </h1>
    </div>

    {/* paragraph INSIDE SAME DIV */}
    {openSection === "channel" && (
      <p className='text-md lg:text-base text-white lg:text-[#000000] mt-4 ml-13 lg:ml-0'>
         They use the portal to find refined, verified startups...
      </p>
    )}
  </div>

</div>


           


            <div id='right' className=' w-[60%]  pl-12 hidden lg:block '>
            <div className='w-full h-[480px] bg-[#D8D8D8] rounded-sm '>

            </div>
        </div>

        </div>
      
    </div>
  )
}

export default AboutSec5