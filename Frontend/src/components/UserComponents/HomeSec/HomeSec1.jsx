import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import img1 from "/homeSec1.png";
import { Link } from 'react-router-dom';

const HomeSec1 = () => {
  return (
   <>
    <div className= "bg-[#001032] h-290 md:h-auto lg:bg-white w-full pt-5 lg:pt-20  px-5 rounded-b-4xl" >
      <div
        className="text-[12px] text-white flex justify-start items-center gap-2 p-2 md:px-4 w-[70%] md:w-[40%] lg:w-[32%] xl:w-[22%] rounded-3xl mt-20 
        bg-linear-to-r from-[#001032] from-20% lg:from-70% via-blue-[#001032] at-130% to-[#D8D8D8] 
        "
      >
        <p>We've built a platform for startups</p>
        <IoIosArrowRoundForward size={25} className="hidden md:block" />
      </div>

      <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center mt-3  ">
        <div id="left" className="w-full lg:w-[50%] lg:bg-white  ">
          <div>
            <h1 className="font-semibold text-4xl lg:text-6xl  lg:text-[#001032] text-white leading-15 tracking-wide lg:leading-snug lg:tracking-normal">
              Build smarter, grow faster, and fund confidently
            </h1>

            <p className="w-[89%] md:w-[68%] mt-3 lg:text-xl text-[#FFFFFFCC] lg:text-[#001032B5] leading-9 tracking-wide  font-light lg:font-normal">
              Access curated investors, verified experts, and essential growth tools — all connected seamlessly inside Artestor 
            </p>

           <Link to="/login"> <button className="lg:mt-11 mt-8 lg:bg-[#001032] bg-white text-[#12355C] lg:text-white  lg:p-4 p-3 lg:px-17 px-8 text-xl rounded-sm">
              Get Started
            </button></Link>
          </div>

          <hr className="lg:hidden mt-12 w-[90%] m-auto border-t border-[#FFFFFF33]" />
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
              className="text-md mx-auto text-white  p-3  w-full md:w-[70%] rounded-4xl mt-10 mb-10
        bg-linear-to-r from-[#001032] from-40% via-blue-[#001032] at-130% to-[#D8D8D8]"
            >
              <p className="text-center hidden lg:block">Built for startups ready to grow smarter</p>
              <p className="text-center lg:hidden text-[12px]">Designed for founders ready to grow with purpose</p>
             
            </div>
          </div>

          <div className=" text-lg hidden lg:block">
             <div className="flex justify-start items-center gap-3 mt-10">
              <div className="w-8 h-8 bg-[#001032]"></div>
              <p className="leading-8 tracking-wider">
               
               Investors are actively browsing for founders like you
              </p>
            </div>
            <div className="flex justify-start items-center gap-3 mt-10">
              <div className="w-8 h-8 bg-[#001032]"></div>
              <p className="leading-8 tracking-wider">
               
                Experts are ready to guide you at every critical step
              </p>
            </div>
            <div className="flex justify-start items-center gap-3 mt-10">
              <div className="w-8 h-8 bg-[#001032]"></div>
              <p className="leading-8 tracking-wider">
               Reach real audiences organically without spending on ads
              </p>
            </div>
            <div className="flex justify-start items-center gap-3 mt-10 ">
              <div className="w-8 h-8 bg-[#001032] "></div>
              <p className="leading-8 tracking-wider">
               Access practical, founder-focused support for investor readiness
              </p>
            </div>
          </div>

          <div id='phone' className='lg:hidden text-white flex items-center gap-3  overflow-x-scroll  scrollbar-hide '>
              <div>
                 <div className='w-50 h-45 rounded-2xl bg-[#FFFFFF]'></div>
                 <p className='p-3 h-25 text-sm font-light w-[80%]'>Investors are already discovering founders like you</p>
              </div>
              <div>
                 <div className='w-50 h-45 rounded-2xl bg-[#FFFFFF]'></div>
                 <p className='p-3 h-25 text-sm font-light w-[80%]'>Access expert-led services at startup-first pricing</p>
              </div>
              <div>
                 <div className='w-50 h-45 rounded-2xl bg-[#FFFFFF]'></div>
                 <p className='p-3 h-25 text-sm font-light w-[80%]'>Get free advisory from mentors and venture experts</p>
              </div>
          </div>
        </div>

        <div
          id="right"
          className="w-full lg:w-[50%] lg:bg-white rounded-md lg:rounded-sm mt-auto flex justify-center items-center   ">
          <img src={img1} alt="" className="rounded-sm object-fill h-[870px]  hidden lg:block"  />
          <div className="lg:hidden  h-90 w-full  mt-10">
            <img src={img1} alt="" className="rounded-4xl    w-full h-[200px] object-cover  border border-[#001032]" />
               </div>
        </div>
      </div>
          <div className="hidden lg:block">
            <Link to="/login"> <div className="flex justify-center items-center gap-3 bg-[#001032] ml-auto text-white w-[50%] mt-4 p-1 rounded-sm ">
       <button>See How It Works</button>
        <IoIosArrowRoundForward size={25} />
          </div></Link>
          </div>
    </div>
     <div className="flex justify-center items-center gap-2 border-2 border-[#002A30]  w-[70%] 
     mt-28 mx-auto p-3 px-4 text-[#001032] text-xl rounded-sm font-semibold lg:hidden">
       <Link to="/login"> <button>See How It Works</button></Link>
        <IoIosArrowRoundForward size={25} className="mt-1" />
          </div>
          </>
  )
}

export default HomeSec1