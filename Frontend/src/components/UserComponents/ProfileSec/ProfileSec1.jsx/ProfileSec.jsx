import React from 'react'
import { CgProfile } from "react-icons/cg";
import profileLogo from "/profile.png";
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { LuDot } from "react-icons/lu";

const ProfileSec = () => {
  return (
   <div>
   <div className='hidden lg:block'>
      <div id='topbar' className='flex justify-between items-center  border-2 border-[#D9D9D9] rounded-xl bg-white px-5 m-1 mx-2 p-2'>
       <div>
       <p className='font-semibold text-[#001032]'>Welcome, Startup India Pvt. Ltd.</p>
       </div>
       <div className='flex items-center gap-x-3'>
        <CgProfile className='text-gray-500 ' size={25} />
        <p className='text-[#001426] font-semibold'>Switch to professional</p>
       </div>
     </div>
   </div>

     <div id='profile' className=' lg:border-2 border-[#D9D9D9] lg:rounded-b-xl bg-white lg:px-5 lg:m-2  lg:p-2'>
      <section aria-label="Profile header"
    >
      <div className="lg:h-20 h-9 bg-card " />

      <div className="border-t-2  border-[#EEECEC] " />
       <div>
          <div className='flex justify-start gap-12 items-center '>
            <div className='lg:w-28 lg:h-28 w-22 h-22 rounded-full border-2 relative bottom-12 bg-white lg:left-9 left-4'></div>
           <div className='mb-10'>
             <h1 className=' font-medium text-[#001032] text-xl hidden lg:block '>Startup </h1>
           </div>
          </div>
           
           <div className='flex justify-between lg:px-9 px-4 relative bottom-3 lg:mb-10 pb-5 lg:pb-0'>
            <div>
              <h1 className='font-medium mb-1 text-md lg:text-xl'>Akshay Dogra</h1>
              <p className='lg:w-[50%] w-[70%] text-sm'>Grow Your Business by Partnering with India’s Fastest-Growing Startup Ecosystem</p>
              <p className='text-sm'>New Delhi, Delhi, India</p>
            </div>
           <div className='hidden lg:block'>
             <div className='flex items-center '>
             <img src={profileLogo} alt="" className='w-20'/>
             <h1>Dharanam Foundation</h1>
            </div>
           </div>
           </div>

       </div>
    </section>
     </div>

       <div id='about' className='lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2 '>
        <div className='flex justify-between items-center mt-2 mb-1'>
          <h1 className='text-[#001032] lg:px-9  px-4 font-semibold text-md lg:text-xl'>About</h1>
           <MdEdit size={20} className='mr-3 lg:mr-0'/>
        </div>
        <div className='px-4 py-2 leading-11 lg:tracking-wider tracking-wide pr-4 lg:pr-0'>
          <p className='text-sm'>An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused marketing campaign, customer experience and design valuable content for go-to-market, launch, start-up, brand building, event and community engagement. Dedicated results and omni channel product marketing, brand and community development. Visionary, self-driven, motivated, who can take ownership and have the zeal to build something global. Skilled in operations management, operational Planning, Business Strategies and Employee Training. <Link><span className='font-medium'>See more...</span></Link></p>
        </div>

        <div className='flex  gap-4 lg:mx-9 mx-4 p-2 lg:px-13 lg:my-6 my-4 border-2 border-[#D9D9D9] rounded-xl font-medium text-[#001032]'>
          <h1 className='w-[70%] lg:w-auto text-md mt-1 lg:text-md lg:mt-0'>Top Skills</h1>
          <p className='text-sm leading-5 lg:leading-7'>Strategic Planning • Marketing Strategy • Customer Service • Pricing Strategy • Training <Link><span className='font-bold'>See more...</span></Link></p>
        </div>

       </div>

       <div id='services' className='lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2 my-2 lg:p-2 '>
           <div className='flex justify-between items-center mt-3 mb-1'>
          <h1 className='text-[#001032] lg:px-9 px-4 font-semibold text-md lg:text-xl'>Services</h1>
           <MdEdit size={20} className='mr-3 lg:mr-0' />
        </div>
         <div className='lg:pl-9 px-4 lg:py-2 py-1 leading-8 lg:leading-11 lg:tracking-wider tracking-wide mb-6'>
          <p className='text-sm font-medium leading-6 lg:leading-7 lg:pr-3'>Strategic Planning • Marketing Strategy • Customer Service • Pricing Strategy • Training • Team Building • Research Skills • Market Research<Link><span className='font-bold'>See more...</span></Link></p>
        </div>
       </div>

       <div id='experience' className='lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2  my-2'>
           <div className='flex justify-between items-center lg:my-6 mt-3 mb-2'>
          <h1 className='text-[#001032] lg:px-9 px-4 font-semibold text-md lg:text-xl'>Experience</h1>
           <MdEdit size={20} className='mr-3 lg:mr-0' />
        </div>
         <div className='flex gap-3  lg:pl-5 pl-3'>
          <div>
             <img src={profileLogo} alt="" className='w-15 mt-1'/>
          </div>
             <div>
              <h1 className='font-semibold pt-1text-md lg:text-xl'>Founder</h1>
              <p className='text-sm lg:pt-4 pt-2 font-medium'>Dharanam Foundation · Full-time</p>
              <p className='text-sm font-medium' >Oct 2024 - Present · 1 yr</p>
              <p className='text-sm font-medium'>Noida, Uttar Pradesh, India · Hybrid</p>
              <p className='flex text-sm lg:pt-8 pt-4 font-medium  pr-4'><LuDot size={25} />Designing customized revenue-generation strategies to enhance financial independence</p>
              <div className='flex'>
                 <LuDot size={25} />
              <p className=' text-sm lg:pb-8 pb-6 font-medium  pr-4'>Assisting NGOs with technology, legal, and marketing support at zero cost to enhance their growth and impact.<Link><span className='font-bold text-md'> See more...</span></Link></p>
              </div>
             </div>
         </div>
       </div>

       <div id='portfolio' className='lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2 my-2 '>
           <div className='flex justify-between items-center my-3'>
          <h1 className='text-[#001032] lg:px-9 px-4 font-semibold text-md lg:text-xl'>Portfolio</h1>
        </div>
         <div className='hidden lg:block'>
          <div id='desktop' className='pl-9  py-2 leading-11 tracking-wider mb-6 grid 2xl:grid-cols-4 lg:grid-cols-3 lg:gap-x-2 gap-y-5 lg:pr-10 2xl:pr-30'>
          <div className='w-60 h-60 border-2 border-[#D9D9D9] rounded-md'></div>
          <div className='w-60 h-60 border-2 border-[#D9D9D9] rounded-md'></div>
          <div className='w-60 h-60 border-2 border-[#D9D9D9] rounded-md'></div>
          <div className='w-60 h-60 border-2 border-[#D9D9D9] rounded-md'></div>
           <div className='w-60 h-60 border-2 border-[#D9D9D9] rounded-md'></div>
          <div className='w-60 h-60 border-2 border-[#D9D9D9] rounded-md'></div>
          <div className='w-60 h-60 border-2 border-[#D9D9D9] rounded-md'></div>
          <div className='w-60 h-60 border-2 border-[#D9D9D9] rounded-md'></div>
        </div>
         </div>
        <div className='lg:hidden'>
          <div id='desktop' className='lg:pl-9 pl-4 py-2 leading-11 tracking-wider mb-6 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide'>
          <div className='w-[40%] h-50 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center mr-4'></div>
          <div className='w-[40%] h-50 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center mr-4'></div>
          <div className='w-[40%] h-50 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center mr-4'></div>
          <div className='w-[40%] h-50 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center mr-4'></div>
           <div className='w-[40%] h-50 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center mr-4'></div>
          <div className='w-[40%] h-50 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center mr-4'></div>
          <div className='w-[40%] h-50 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center mr-4'></div>
          <div className='w-[40%] h-50 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center mr-4'></div>
        </div>
        </div>
       </div>



       <div id='social media' className='lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2 mb-4'>
           <div className='flex justify-between items-center my-3'>
          <h1 className='text-[#001032] lg:px-9 px-4 font-semibold text-md lg:text-xl'>Social Media</h1>
        </div>
         <div className='lg:pl-9 pl-4 py-2  mb-3  flex flex-col gap-2 lg:pr-30 pr-5 '>
         <input type="text" className='border-2 border-[#D9D9D9] rounded-md p-2 px-6' placeholder='Linkedin Profile'/>
         <input type="text" className='border-2 border-[#D9D9D9] rounded-md p-2 px-6' placeholder='Instagram Profile' />
        </div>
       </div>


    </div>
  )
}

export default ProfileSec
