import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { HiOutlineHandRaised, HiOutlineRocketLaunch, HiOutlineBuildingLibrary, HiOutlineShoppingBag } from "react-icons/hi2";

const JoinUsSec5 = () => {
  return (
    <div className='lg:my-10'>
      <div className="max-w-[1500px] mx-auto w-full lg:!px-10 min-[1500px]:!px-0">
        <div id='top' className='text-start pt-7 lg:mt-25 text-[#001032]'>
          <h1 className='lg:text-5xl text-3xl font-medium px-3'>Portals to Explore</h1>
        </div>

        <div className='hidden lg:block'>
          <div id='bottom' className='lg:bg-[#002A3033] mt-10 grid grid-cols-2 gap-10 w-full gap-x-6 p-20 py-12 text-white'>
            <div className='bg-[#001426] rounded-sm p-6 w-full'>
              <div className='flex justify-start items-center py-4 gap-4'>
                <div className='bg-[#FFFFFF] w-22 h-22 flex items-center justify-center rounded-sm'>
                  <HiOutlineHandRaised size={50} className="text-[#001426]" />
                </div>
                <h1 className='text-2xl font-medium'>NGO Portal</h1>
              </div>
              <h1 className='text-sm leading-6 tracking-wide py-4'>Sign up and create your account</h1>
              <p className='text-sm leading-6 tracking-wide w-[50%]'>Start exploring, connect with others, get listed, build your portfolio and go live</p>
              <div className='flex justify-end items-center gap-3'>
                <button className='text-2xl mb-2 mt-5'>Explore</button>
                <IoIosArrowRoundForward size={25} className='mt-5' />
              </div>
            </div>
            <div className='bg-[#002A30] rounded-sm p-6'>
              <div className='flex justify-start items-center py-4 gap-4'>
                <div className='bg-[#FFFFFF] w-22 h-22 flex items-center justify-center rounded-sm'>
                  <HiOutlineRocketLaunch size={50} className="text-[#002A30]" />
                </div>
                <h1 className='text-2xl font-medium'>Incubation Portal</h1>
              </div>
              <h1 className='text-sm leading-6 tracking-wide py-4'>Sign up and create your account</h1>
              <p className='text-sm leading-6 tracking-wide w-[50%]'>Start exploring, connect with others, get listed, build your portfolio and go live</p>
              <div className='flex justify-end items-center gap-3'>
                <button className='text-2xl mb-2 mt-5 bg-white text-[#000000] p-2 px-3 rounded-sm'> Get Started</button>
              </div>
            </div>
            <div className='bg-[#002A30] rounded-sm p-6'>
              <div className='flex justify-start items-center py-4 gap-4'>
                <div className='bg-[#FFFFFF] w-22 h-22 flex items-center justify-center rounded-sm'>
                  <HiOutlineBuildingLibrary size={50} className="text-[#002A30]" />
                </div>
                <h1 className='text-2xl font-medium'>Ash Portal</h1>
              </div>
              <h1 className='text-sm leading-6 tracking-wide py-4'>Sign up and create your account</h1>
              <p className='text-sm leading-6 tracking-wide w-[50%]'>Start exploring, connect with others, get listed, build your portfolio and go live</p>
              <div className='flex justify-end items-center gap-3'>
                <button className='text-2xl mb-2 mt-5'>Explore</button>
                <IoIosArrowRoundForward size={25} className='mt-5' />
              </div>
            </div>
            <div className='bg-[#001426] rounded-sm p-6'>
              <div className='flex justify-start items-center py-4 gap-4'>
                <div className='bg-[#FFFFFF] w-22 h-22 flex items-center justify-center rounded-sm'>
                  <HiOutlineShoppingBag size={50} className="text-[#001426]" />
                </div>
                <h1 className='text-2xl font-medium'>ECOM Portal</h1>
              </div>
              <h1 className='text-sm leading-6 tracking-wide py-4'>Sign up and create your account</h1>
              <p className='text-sm leading-6 tracking-wide w-[50%]'>Start exploring, connect with others, get listed, build your portfolio and go live</p>
              <div className='flex justify-end items-center gap-3'>
                <button className='text-2xl mb-2 mt-5'>Explore</button>
                <IoIosArrowRoundForward size={25} className='mt-5' />
              </div>
            </div>
          </div>
        </div>

        <div className='lg:hidden'>
          <div id='bottom' className='grid grid-cols-1 gap-6 w-full p-4 py-12 text-white'>
            <div className='bg-[#001426] rounded-sm p-3 px-4 w-full'>
              <h1 className='text-xl font-medium'>NGO Portal</h1>
              <h1 className='text-sm leading-6 tracking-wide py-2 pt-4 font-extralight'>Pick your onboarding plan</h1>
              <p className='text-sm leading-6 tracking-wider w-full font-extralight'>We’ll help you set up your profile, engage with donors, and manage operational needs</p>
              <button className='text-md mb-2 mt-7 bg-white text-[#000000] p-2 px-6 rounded-sm'> Get Started</button>
            </div>

            <div className='bg-[#002A30] rounded-sm p-3 px-4 w-full'>
              <h1 className='text-xl font-medium'>Inqbate Portal</h1>
              <h1 className='text-sm leading-6 tracking-wide py-2 pt-4 font-extralight'>Pick your onboarding plan</h1>
              <p className='text-sm leading-6 tracking-wider w-full font-extralight'>We’ll walk you through the platform, and discuss how to use your expert consult credit</p>
              <button className='text-md mb-2 mt-7 bg-white text-[#000000] p-2 px-6 rounded-sm'> Get Started</button>
            </div>
            <div className='bg-[#001426] rounded-sm p-3 px-4 w-full'>
              <h1 className='text-xl font-medium'>Ash Portal</h1>
              <h1 className='text-sm leading-6 tracking-wide py-2 pt-4 font-extralight'>Pick your onboarding plan</h1>
              <p className='text-sm leading-6 tracking-wider w-full font-extralight'>We’ll walk you through the platform, and discuss how to use your expert consult credit</p>
              <button className='text-md mb-2 mt-7 bg-white text-[#000000] p-2 px-6 rounded-sm'> Get Started</button>
            </div>
            <div className='bg-[#002A30] rounded-sm p-3 px-4 w-full'>
              <h1 className='text-xl font-medium'>ECOM Portal</h1>
              <h1 className='text-sm leading-6 tracking-wide py-2 pt-4 font-extralight'>Pick your onboarding plan</h1>
              <p className='text-sm leading-6 tracking-wider w-full font-extralight'>We’ll walk you through the platform, and discuss how to use your expert consult credit</p>
              <button className='text-md mb-2 mt-7 bg-white text-[#000000] p-2 px-6 rounded-sm'> Get Started</button>
            </div>
          </div>
          <div className='lg:hidden px-10'>
            <h1 className='bg-linear-to-r from-[#001032] from-70% via-blue-[#001426] at-130% to-[#D8D8D8] p-2 px-10 w-full mx-auto rounded-3xl text-lg text-white'>
              This portal is for you</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinUsSec5
