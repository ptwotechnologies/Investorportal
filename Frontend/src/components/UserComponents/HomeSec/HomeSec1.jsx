import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import img1 from "/homeSec1.png";

const HomeSec1 = () => {
  return (
   <>
    <div className= "bg-[#001032] h-340 md:h-auto lg:bg-white w-full pt-10 lg:pt-25  px-7 rounded-b-4xl" >
      <div
        className="text-sm text-white flex justify-start items-center gap-2 p-2 md:px-4 w-[65%] sm:w-[55%] md:w-[40%] lg:w-[32%] xl:w-[30%] rounded-3xl mt-20 
        bg-linear-to-r from-[#001426] lg:from-70% via-blue-[#001426] at-130% to-[#D8D8D8] 
        "
      >
        <p>We've built a platform for startups</p>
        <IoIosArrowRoundForward size={25} className="hidden md:block" />
      </div>

      <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center mt-3  ">
        <div id="left" className="w-full lg:w-[50%] lg:bg-white  ">
          <div>
            <h1 className="font-bold text-4xl lg:text-5xl  lg:text-[#001032] text-white leading-15 tracking-wider lg:leading-snug lg:tracking-normal">
              Build smarter, grow faster, and fund confidently
            </h1>

            <p className="w-[89%] md:w-[58%] mt-5 text-white lg:text-[#001032] leading-10 tracking-wider  ">
              Access curated investors, verified experts, and essential growth tools — all connected seamlessly inside Artestor 
            </p>

            <button className="mt-11 lg:bg-[#001032] bg-white text-[#12355C] lg:text-white font-medium p-4 px-17 text-xl rounded-sm">
              Get Started
            </button>
          </div>

          <hr className="lg:hidden mt-15 w-[80%] m-auto border-t border-gray-500" />
          <div className="hidden lg:block">
            <div
              className="text-sm mx-auto lg:mx-0 text-white flex justify-start items-center gap-2 p-2 md:px-4 w-[65%] md:w-[55%] lg:w-[50%] xl:w-[45%] rounded-3xl  lg:mt-40
        bg-linear-to-r from-[#001426] lg:from-70% via-blue-[#001426] at-130% to-[#D8D8D8]"
            >
              <p>We've built a platform for startups</p>
              <IoIosArrowRoundForward size={25} className="hidden md:block" />
            </div>
          </div>

          <div className="lg:hidden lg:px-6 w-full">
            <div
              className="text-md mx-auto text-white  p-3  w-full md:w-[70%] rounded-4xl mt-20 mb-20
        bg-linear-to-r from-[#001426] from-40% via-blue-[#001426] at-130% to-[#D8D8D8]"
            >
              <p className="text-center hidden lg:block">Built for startups ready to grow smarter</p>
              <p className="text-center lg:hidden text-sm ">Designed for founders ready to grow with purpose</p>
             
            </div>
          </div>

          <div className=" text-lg hidden lg:block">
             <div className="flex justify-start items-center gap-3 mt-10">
              <div className="w-8 h-8 bg-[#001032]"></div>
              <p className="leading-8 tracking-wider">
               
                Investors are already waiting for startups like you
              </p>
            </div>
            <div className="flex justify-start items-center gap-3 mt-10">
              <div className="w-8 h-8 bg-[#001032]"></div>
              <p className="leading-8 tracking-wider">
               
                Investors are already waiting for startups like you
              </p>
            </div>
            <div className="flex justify-start items-center gap-3 mt-10">
              <div className="w-8 h-8 bg-[#001032]"></div>
              <p className="leading-8 tracking-wider">
                Free guidance from experts to become investor-ready
              </p>
            </div>
            <div className="flex justify-start items-center gap-3 mt-10 ">
              <div className="w-8 h-8 bg-[#001032] "></div>
              <p className="leading-8 tracking-wider">
                You can tap into real audience without running a single ad
              </p>
            </div>
          </div>

          <div id='phone' className='lg:hidden text-white flex items-center gap-3  overflow-x-scroll  scrollbar-hide '>
              <div>
                 <div className='w-55 h-45 rounded-2xl bg-[#FFFFFF]'></div>
                 <p className='p-3 h-25 text-sm font-light'>Investors are already discovering founders like you</p>
              </div>
              <div>
                 <div className='w-55 h-45 rounded-2xl bg-[#FFFFFF]'></div>
                 <p className='p-3 h-25 text-sm font-light'>Access expert-led services at startup-first pricing</p>
              </div>
              <div>
                 <div className='w-55 h-45 rounded-2xl bg-[#FFFFFF]'></div>
                 <p className='p-3 h-25 text-sm font-light'>Get free advisory from mentors and venture experts</p>
              </div>
          </div>
        </div>

        <div
          id="right"
          className="w-full lg:w-[50%] lg:bg-white rounded-md lg:rounded-sm mt-auto flex justify-center items-center   ">
          <img src={img1} alt="" className="rounded-sm object-fill h-[870px]  hidden lg:block"  />
          <div className="lg:hidden  h-100 w-full  mt-10">
            <img src={img1} alt="" className="rounded-4xl    w-full h-[280px] object-cover  border border-[#001032]" />
               </div>
        </div>
      </div>
          <div className="hidden lg:block">
            <div className="flex justify-center items-center gap-3 bg-[#001032] ml-auto text-white w-[50%] mt-4 p-1 rounded-sm ">
        <button>See How It Works</button>
        <IoIosArrowRoundForward size={25} />
          </div>
          </div>
    </div>
     <div className="flex justify-center items-center gap-2 border-2 border-[#002A30]  w-[60%] 
     mt-36 mx-auto p-3 px-4 text-[#001032] text-xl rounded-sm font-semibold lg:hidden">
        <button>See How It Works</button>
        <IoIosArrowRoundForward size={25} className="mt-1" />
          </div>
          </>
  )
}

export default HomeSec1