import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";

const HomeSec6 = () => {
  return (
     <div className=''>

        <div id='top' className='text-center lg:p-5 pt-10 text-[#001032] lg:bg-[#F9972A1A] mt-10'>
            <h1 className='text-3xl lg:text-5xl font-semibold p-3 lg:p-5 lg:pb-13 '>Great! <br/>
               How do I get started then?</h1>
               <p className='text-sm lg:text-md w-[300px] mx-auto '>Simple, just choose which profile fits you, and we’ll show you what to do next.</p>
        </div>

        <div className='hidden lg:block'>
            <div id='bottom' className='lg:bg-[#F9972A1A] grid  grid-cols-3 gap-10 w-full gap-x-6 p-20 py-12 text-white '>
            <div className='bg-[#001032] rounded-sm p-6 w-full'>
                <div className='flex justify-start items-center py-4 gap-4 '>
                    <div className='bg-[#FFFFFF] w-22 h-22'></div>
                    <h1 className='text-2xl font-semibold'>Startup</h1>
                </div>
                <h1 className='text-sm leading-6 tracking-wide py-4'>Sign up and create your account</h1>
                <p className='text-sm leading-6 tracking-wide w-[50%]'>Start exploring, connect with others, get listed, build your portfolio and go live</p>
                <div className='flex justify-end items-center gap-3'>
                    <button className='text-2xl font-semibold mb-2 mt-5'>Startups</button>
                    <IoIosArrowRoundForward size={25} className='mt-5'/>
                </div>

            </div>
            <div className='bg-[#616B80] rounded-sm p-6'>
                <div className='flex justify-start items-center py-4 gap-4 '>
                    <div className='bg-[#FFFFFF] w-22 h-22'></div>
                    <h1 className='text-2xl font-semibold'>Investor</h1>
                </div>
                <h1 className='text-sm leading-6 tracking-wide py-4'>Sign up and create your account</h1>
                <p className='text-sm leading-6 tracking-wide w-[50%]'>Share your investment focus, preferred industries, ticket sizes, and past experience</p>
                <div className='flex justify-end items-center gap-3'>
                    <button className='text-2xl font-semibold mb-2 mt-5 bg-white text-[#000000] p-2 px-3 rounded-sm'> Get Started</button>
                </div>


            </div>
            <div className='bg-[#002A30CC] rounded-sm p-6'>
                <div className='flex justify-start items-center py-4 gap-4 '>
                    <div className='bg-[#FFFFFF] w-22 h-22'></div>
                    <h1 className='text-2xl font-semibold'>Service Professionals</h1>
                </div>
                <h1 className='text-sm leading-6 tracking-wide py-4'>Sign up and create your account</h1>
                <p className='text-sm leading-6 tracking-wide w-[50%]'>Get discovered by verified startups, respond to interest, and convert leads directly</p>
                <div className='flex justify-end items-center gap-3'>
                    <button className='text-2xl font-semibold mb-2 mt-5'>Service Professionals</button>
                    <IoIosArrowRoundForward size={25} className='mt-5'/>
                </div>


            </div>
   

        </div>
        </div>

        <div className='lg:hidden'>
             <div id='bottom' className=' grid grid-cols-1 gap-6 w-full  p-4 py-12 text-white '>
            <div className='bg-[#001032CC] rounded-sm p-3 px-4 w-full'>
                    <h1 className='text-xl font-semibold'>I’m a Startup</h1>
                <h1 className='text-sm leading-6 tracking-wide py-2  pt-4 font-extralight'>Pick your onboarding plan</h1>
                <p className='text-sm leading-6 tracking-wider w-full font-extralight'>We’ll walk you through the platform, and discuss how to use your expert consult credit</p>
                 <button className='text-md mb-2 mt-7 bg-white text-[#000000] p-2 px-6 rounded-sm'> Get Started</button>
            </div>

             <div className='bg-[#616B80] rounded-sm p-3 px-4 w-full'>
                    <h1 className='text-xl font-semibold'>Investors</h1>
                <h1 className='text-sm leading-6 tracking-wide py-2  pt-4 font-extralight'>Sign up and create your account</h1>
                <p className='text-sm leading-6 tracking-wider w-full font-extralight'>Share your investment focus, preferred industries, ticket sizes, and past experience</p>
                 <button className='text-md mb-2 mt-7 bg-white text-[#000000] p-2 px-6 rounded-sm'> Get Started</button>
            </div>
             <div className='bg-[#002A30CC] rounded-sm p-3 px-4 w-full'>
                    <h1 className='text-xl font-semibold'>Service Professionals</h1>
                <h1 className='text-sm leading-6 tracking-wide py-2  pt-4 font-extralight'>Choose your onboarding plan</h1>
                <p className='text-sm leading-6 tracking-wider w-full font-extralight'>Get discovered by verified startups, respond to interest, and convert leads directly</p>
                 <button className='text-md mb-2 mt-7 bg-white text-[#000000] p-2 px-6 rounded-sm'> Get Started</button>
            </div>

        </div>
        </div>
      
    </div>
  )
}

export default HomeSec6