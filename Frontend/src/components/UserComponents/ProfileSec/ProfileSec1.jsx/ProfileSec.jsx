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

     <div id='profile' className=' border-3 lg:border-2 border-[#D9D9D9] lg:rounded-b-xl bg-white lg:px-5 lg:m-2  lg:p-2'>
      <section aria-label="Profile header"
    >
      <div className="h-30 bg-card " />

      <div className="border-t-2  border-[#EEECEC] " />
       <div>
          <div className='flex justify-start gap-12 items-center '>
            <div className='w-28 h-28 rounded-full border-2 relative bottom-12 bg-white left-9 '></div>
           <div className='mb-10'>
             <h1 className=' font-medium text-[#001032] text-xl '>Startup </h1>
           </div>
          </div>
           
           <div className='flex justify-between px-9 relative bottom-3 mb-10'>
            <div>
              <h1 className='font-medium mb-1 text-xl'>Akshay Dogra</h1>
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

       <div id='about' className='border-2 border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2 '>
        <div className='flex justify-between items-center my-2'>
          <h1 className='text-[#001032] px-9 font-semibold text-xl'>About</h1>
           <MdEdit size={20} className='mr-2 lg:mr-0'/>
        </div>
        <div className='pl-9 py-2 leading-11 tracking-wider'>
          <p className='text-sm'>An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused marketing campaign, customer experience and design valuable content for go-to-market, launch, start-up, brand building, event and community engagement. Dedicated results and omni channel product marketing, brand and community development. Visionary, self-driven, motivated, who can take ownership and have the zeal to build something global. Skilled in operations management, operational Planning, Business Strategies and Employee Training. <Link><span className='font-medium'>See more...</span></Link></p>
        </div>

        <div className='flex gap-5 mx-9 p-2 lg:px-13 my-6 border-2 border-[#D9D9D9] rounded-xl font-medium text-[#001032]'>
          <h1 className='w-[60%] lg:w-auto'>Top Skills</h1>
          <p className='text-sm leading-7'>Strategic Planning • Marketing Strategy • Customer Service • Pricing Strategy • Training <Link><span className='font-bold'>See more...</span></Link></p>
        </div>

       </div>

       <div id='services' className='border-2 border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2 my-2 lg:p-2 '>
           <div className='flex justify-between items-center my-3'>
          <h1 className='text-[#001032] px-9 font-semibold text-xl'>Services</h1>
           <MdEdit size={20} className='mr-2 lg:mr-0' />
        </div>
         <div className='pl-9 py-2 leading-11 tracking-wider mb-6'>
          <p className='text-sm font-medium leading-7 pr-3'>Strategic Planning • Marketing Strategy • Customer Service • Pricing Strategy • Training • Team Building • Research Skills • Market Research<Link><span className='font-bold'>See more...</span></Link></p>
        </div>
       </div>

       <div id='experience' className='border-2 border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2  my-2'>
           <div className='flex justify-between items-center my-6'>
          <h1 className='text-[#001032] px-9 font-semibold text-xl'>Experience</h1>
           <MdEdit size={20} className='mr-2 lg:mr-0' />
        </div>
         <div className='flex gap-3  pl-5'>
          <div>
             <img src={profileLogo} alt="" className='w-15'/>
          </div>
             <div>
              <h1 className='font-semibold pt-1 text-xl'>Founder</h1>
              <p className='text-sm pt-4 font-medium'>Dharanam Foundation · Full-time</p>
              <p className='text-sm font-medium' >Oct 2024 - Present · 1 yr</p>
              <p className='text-sm font-medium'>Noida, Uttar Pradesh, India · Hybrid</p>
              <p className='flex text-sm pt-8 font-medium  pr-4'><LuDot size={25} />Designing customized revenue-generation strategies to enhance financial independence</p>
              <div className='flex'>
                 <LuDot size={25} />
              <p className=' text-sm pb-8 font-medium  pr-4'>Assisting NGOs with technology, legal, and marketing support at zero cost to enhance their growth and impact.<Link><span className='font-bold text-md'> See more...</span></Link></p>
              </div>
             </div>
         </div>
       </div>

       <div id='portfolio' className='border-2 border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2 my-2 '>
           <div className='flex justify-between items-center my-3'>
          <h1 className='text-[#001032] px-9 font-semibold text-xl'>Portfolio</h1>
        </div>
         <div className='hidden lg:block'>
          <div id='desktop' className='pl-9 py-2 leading-11 tracking-wider mb-6 grid 2xl:grid-cols-4 lg:grid-cols-3 gap-x-2 gap-y-5 lg:pr-10 2xl:pr-30'>
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
          <div id='desktop' className='pl-9 py-2 leading-11 tracking-wider mb-6 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide'>
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



       <div id='social media' className='border-2 border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2 '>
           <div className='flex justify-between items-center my-3'>
          <h1 className='text-[#001032] px-9 font-semibold text-xl'>Social Media</h1>
        </div>
         <div className='pl-9 py-2  mb-3  flex flex-col gap-2 lg:pr-30 pr-5 '>
         <input type="text" className='border-2 border-[#D9D9D9] rounded-md p-2 px-6' placeholder='Linkedin Profile'/>
         <input type="text" className='border-2 border-[#D9D9D9] rounded-md p-2 px-6' placeholder='Instagram Profile' />
        </div>
       </div>


    </div>
  )
}

export default ProfileSec
