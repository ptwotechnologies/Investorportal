import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { BsBoxArrowInUpRight } from "react-icons/bs";

const ChannelPartnerSec1 = () => {
  return (
    <div className=' lg:mb-20 lg:mt-30 lg:p-2.5 lg:border border-[#b5b3b3] bg-[#E5E5E5] rounded-4xl '>
       <div className='lg:border border-[#E5E5E5] lg:p-7 px-2 bg-white rounded-4xl lg:py-25 py-20'>
       <div id='top' className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
             <div className="px-4">
          <h1 className="lg:text-6xl text-4xl font-medium text-[#001032] lg:mb-7 mb-2 mt-6 leading-tight">
            Register as <br /> channel partner
          </h1>

          <p className="text-[#001032] lg:mb-7 mb-5 lg:text-2xl lg:w-[80%]  text-md leading-6">
            Our experts in Artestor will support you and solve your queries in multiple domains:
          </p>

          <ul className="space-y-2 text-[#001032]"> 
            <div className='flex items-center gap-3'>
              <FaCircleCheck />
              <h1 className='lg:text-xl text-md'>Startups</h1>
            </div>
             <div className='flex items-center gap-3'>
              <FaCircleCheck />
              <h1 className='lg:text-xl text-md'>Service Professionals</h1>
            </div>
             <div className='flex items-center gap-3'>
              <FaCircleCheck />
              <h1 className='lg:text-xl text-md'>Investors</h1>
            </div>
             <div className='flex items-center gap-3'>
              <FaCircleCheck />
              <h1 className='lg:text-xl text-md'>Channel Partners</h1>
            </div>
          </ul>

          <p className="lg:mt-10 mt-6 text-[#001032] lg:text-2xl text-md tracking-wide lg:leading-8 lg:w-[87%] mb-10">
            Get the benefits of channel partners and connect with 50+ investors and 500+ startups and 200+ service professionals
          </p>

          {/* boxes */}
          <div className="grid grid-cols-4 gap-3 mt-6 lg:w-[80%] mb-6 lg:mb-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-15 border border-gray-400 rounded-md"
              />
            ))}
          </div>

          <div className='hidden lg:block'>
            <p className="mt-6 text-md text-[#001032] flex items-center gap-1 ">
            Looking for pricing and benefits
             <span className="underline cursor-pointer flex items-center gap-1"> Explore Auxiliaries <BsBoxArrowInUpRight size={20} className='mt-2' /></span>
          </p>
          </div>
        </div>

        </div>

        <div id='form' className='p-2.5 border-3 rounded-xl border-gray-200 bg-gray-100'>
               <div className="bg-white rounded-xl border-3 border-gray-200 lg:p-10 px-3 py-5 shadow-lg">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="p-3 lg:py-6 border rounded-lg" placeholder="First name" />
            <input className="p-3 lg:py-6 border rounded-lg" placeholder="Last name" />
          </div>

          <input className="p-3 lg:py-6 border rounded-lg w-full mt-4" placeholder="Work email address" />
          <input className="p-3 lg:py-6 border rounded-lg w-full mt-4" placeholder="Company name" />
          <input className="p-3 lg:py-6 border rounded-lg w-full mt-4" placeholder="Website" />

          <div className="mt-6 border p-3 lg:py-6 flex items-center lg:gap-3 gap-1">
            <div>
              <p className="text-[#002B31] font-medium lg:text-md text-sm ">
              Are you already registered as Service Professional?
            </p>
            <p className='text-[#1D2A29CC] text-xs lg:text-sm'>Register yourself as service professional before applying to be a channel partner</p>
            </div>

            <div className="flex items-center lg:gap-4 gap-2">
              <label className="  text-gray-700">
                <input type="radio" name="reg" /> <br/> Yes
              </label>
              <label className=" text-gray-700">
                <input type="radio" name="reg" /> <br/> No
              </label>
            </div>
          </div>

          {/* Terms */}
          <div className="lg:mt-20 mt-10 lg:mb-5 mb-10 text-[#1D2A29CC]">
            <p className='tracking-wide lg:leading-7 text-sm lg:text-md mb-2 lg:mb-0'>By clicking, you agree to our Term and Conditions to be a channel partner.</p>
           <div className='flex lg:items-center items-start lg:gap-3 gap-1'>
             <input type="checkbox" className='mt-1 lg:mt-0' />
            <span className=" tracking-wide text-sm lg:text-md">
              I have read all the terms and conditions and I’m ready to be a channel partner.
            </span>
           </div>
          </div>

          <button className="mt-6 lg:mb-35 mb-20 bg-[#001032] text-white px-8 py-3 rounded-sm text-lg">
            Get Started
          </button>

          <p className="lg:text-[16px] text-[14px] text-[#1D2A29CC] ">
           Please note that this is an application to seek funding or other services for a new venture or business.
           By clicking "Get Started" you agree to Artestor’s Privacy Policy
          </p>
        </div>
            
        </div>

       </div>

   <div id='bottom' className='lg:mt-30 lg:px-10 mt-10'>
  <h1 className='lg:hidden text-[22px] text-[#001032] font-semibold'>
    Experience to be remembered
  </h1>

  <div className="
    flex lg:grid
    lg:grid-cols-3
    lg:gap-x-25
    gap-8
    mt-8 px-2
    overflow-x-auto lg:overflow-visible
    space-x-1 lg:space-x-0
    scrollbar-hide
    snap-x snap-mandatory
  ">

    {[1, 2, 3].map((item) => (
      <div key={item} className="min-w-full lg:min-w-0 px-7 lg:px-0 snap-center">

        <hr className='border-t-[#00103299] mb-10 hidden lg:block' />

        <div
          className="
            bg-white border border-gray-200 rounded-xl 
            lg:p-6 p-3 
            flex flex-col justify-between mx-2 lg:mx-0
            shadow-[0_4px_30px_rgba(0,0,0,0.12)]   
          "
        >
          <p className="text-[#001032] lg:pb-30 pb-5 lg:text-lg text-[14px] tracking-wide lg:leading-7">
            I used to spend hours sending proposals that went nowhere. Through this platform, I started getting real, qualified leads who were actually ready to move. The 90-day partnership helped me grow my client base and confidence.
          </p>

          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="text-[#001032] font-semibold text-sm lg:text-md">
                Join once,
              </p>
              <p className="font-semibold text-[#001032] text-sm lg:text-md">
                Let the ecosystem work for you
              </p>
            </div>

            <div className='h-20 w-0.5 bg-[#00000033] mx-1'></div>

            <div className="lg:w-20 lg:h-20 w-18 h-15 lg:bg-[#001032] bg-[#00103233] rounded-full"></div>
          </div>
        </div>

      </div>
    ))}

  </div>
</div>



       </div>
    </div>
  )
}

export default ChannelPartnerSec1