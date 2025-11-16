import React from 'react'
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";

const AboutSec5 = () => {
  return (
    <div className=' lg:p-12 '>
        <div className='text-5xl text-[#001032]  lg:mb-30 font-semibold leading-14 tracking-wide p-5'>
         <h1>Who’s here and what that matters?</h1>
        </div>
        <div className='flex flex-col lg:flex-row items-center  gap-2  '>
            <div id='left' className=' lg:w-[40%] lg:p-5 mb-15 '>
             <div className='hidden lg:block'>
              <div className='flex items-center gap-4 '>
                <IoMdArrowRoundDown className='text-[#272626]' size={25} />
                <h1 className='text-[#000000] font-medium text-2xl'>Investors</h1>
             </div>
             <p className='my-10 font-medium text-sm text-[#000000] '>They use the portal to find refined, verified startups that are already prepared and aligned with their interests. Since we offer investor consultations and pitch improvement support, what they receive is already filtered, focused, and investment-ready.</p>
             </div>

             <div className='lg:hidden bg-[#001032CC] p-5 mt-8'>
              <div className='flex items-center gap-4  '>
                <IoMdArrowRoundForward  className='text-black' size={35}/>
                <h1 className='text-white font-medium text-4xl lg:text-2xl'>Investors</h1>
             </div>
             <p className='my-10  text-xl text-white ml-13'>They use the portal to find refined, verified startups that are already prepared and aligned with their interests. Since we offer investor consultations and pitch improvement support, what they receive is already filtered, focused, and investment-ready.</p>
             </div>
             
            <div  className='flex items-center  gap-4 lg:my-10 py-14 lg:py-0 lg:p-0 p-7 bg-[#4489C499] lg:bg-white'>
              <IoMdArrowRoundForward  className='text-[#272626] hidden lg:block' size={25} />
              <IoMdArrowRoundForward  className='text-white lg:hidden' size={35} />
              <h1 className='text-white lg:text-[#000000] font-medium text-4xl lg:text-2xl'>Service Professionals</h1>
            </div>
            <div  className='flex items-center gap-4 lg:my-10 py-14 lg:py-0 lg:p-0 p-7 bg-[#4489C466] lg:bg-white'>
                <IoMdArrowRoundForward className='text-[#272626] hidden lg:block' size={25} />
                <IoMdArrowRoundForward  className='text-white lg:hidden' size={35} />
               <h1 className='text-white lg:text-[#000000] font-medium text-4xl lg:text-2xl'> Channel Partners</h1>
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