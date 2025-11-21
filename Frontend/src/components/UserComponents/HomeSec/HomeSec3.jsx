import React from 'react'
import img1 from "/homeSec2Img2.png"
import { Link } from "react-router-dom";

const HomeSec3 = () => {
  return (
    <div className="">
      <div id="top" className="text-center mt-8 lg:mt-16">
        <h1 className="text-2xl lg:text-4xl font-semibold lg:tracking-wider mb-1  lg:mb-4 text-[#12355C] ">
          Sound like your story? 
        </h1>
        <p className="text-xl lg:text-2xl font-medium lg:tracking-wider text-[#12355C] mb-9 ">
          Perfect — let’s take you inside
        </p>
        <div className="text-white rounded-2xl font-medium hidden lg:block">
          <Link to="/login"><button className="bg-[#001032] m-2 w-90 p-2 text-xl rounded-sm">
            I’d Like To Get Me Started
          </button></Link>
          <Link to="/login"><button className="bg-[#001032] m-2 w-90 p-2 text-xl rounded-sm">
            How it works
          </button></Link>
        </div>
        <div className="text-white rounded-2xl font-medium flex justify-center items-center lg:hidden">
          <Link to="/login"> <button className="bg-[#001032] m-2 w-fit p-2 text-md lg:text-xl rounded-sm">
            How it works
          </button></Link>
          <Link to="/login"><button className="border border-[#12355C] text-[#002A30] m-2 w-fit p-2 text-md lg:text-xl rounded-sm">
            I’d Like To Get Me Started
          </button></Link>
         
        </div>
      </div>

        <div className="bg-[#001032CC]  hidden lg:block">
           <div id="bottom" className="  lg:mt-16 text-white w-full p-10">
       <div className="flex justify-center items-center">
         <div className=" p-2  w-full mt-14">
          <h1 className="text-5xl font-medium mb-7">What makes us different?</h1>
          <p className="text-md w-[80%] leading-8 tracking-wide mb-15">You see, we’ve also spent years refining pitches, chasing warm intros, paying for ads, and hoping something would finally move. Most of it didn’t.</p>
            <p className="mb-2">That’s when we realized —</p>
              <p className="text-2xl font-semibold   mb-2">The problem wasn’t the founders. </p>
                <p className="text-2xl font-semibold mb-17 ">It was the system around them</p>
                <hr className='w-full mb-5 ' />

                <h1 className='text-xl font-semibold mb-5 '>Really! The system is built to exhaust founders</h1>
                <div className='leading-20 tracking-wider w-[94%]'>
                  <p className='text-sm leading-6'>First, you’re pushed into ad platforms where every click drains your budget — even if none of them convert. Then come the workshops, courses, and “growth promises” That leave you with theory, not traction.…</p>
                <p className='text-sm leading-6 my-5'>Next, agencies show up with retainers, legal paperwork, design fees, and marketing retainers — everything except what you actually need: real users and real investors. By the time you reach the important conversations, you’ve spent time, money, and clarity — without the forward movement you expected.</p>
                
               <p className='text-sm leading-6 mb-8'>Phew..! </p>
                </div>
                <hr  />
                <h1 className='my-4 text-xl font-semibold'>Keep your financials clean and transparent</h1>
                 <hr  />
                 <h1 className='my-4 text-xl font-semibold'>Get simplified compliance and support</h1>
                 <hr  />

        </div>


        <div className='w-full'>
          <div className="  w-full  grid grid-cols-2 gap-x-30 gap-y-25 place-items-center">
          <div>
            <h1 className="text-5xl font-bold">150+</h1>
            <p className="text-sm font-semibold">Service Professionals</p>
          </div>
          <div>
                <h1 className="text-5xl font-bold">500+</h1>
            <p className="text-sm font-semibold">Startups & Businesses</p>
          </div>
          <div>
                <h1 className="text-5xl font-bold">10+</h1>
            <p className="text-sm font-semibold">Venture Firms</p>
          </div>
          <div >
              <h1 className="text-5xl font-bold">50+</h1>
            <p className="text-sm font-semibold ">Angel Investors & VCs</p>
          </div>
          </div>

          <div className="mt-15 mx-10">
         <div className="  w-full ">
            <img src={img1} alt="Image" className="h-115 w-full rounded-md relative top-16"/>
        </div>
        
          
       </div>
        </div>
       </div>
   
         
      </div>

      <div className="pb-12 pt-5 mr-20" >
        <p className="bg-white w-[43%] text-center rounded-4xl  ml-auto p-2 px-3 font-bold text-[#001032] tracking-wide ">Simply, a one stop solution for startups & founders!</p>
      </div>

        </div>

        <div id="phoneScreenBottom" className="lg:hidden bg-[#001032CC] rounded-t-sm mt-10 p-7 py-4 text-white">
          <h1 className="text-3xl font-semibold leading-12 tracking-wider w-[90%]">Built by founders, 
who lived it first</h1>
             <p className="text-md  leading-8 tracking-wide mt-4 mb-10 w-[93%]">We’ve been through it — chasing investors, burning capital on ads, trusting agencies that never delivered. Most of it led nowhere.</p>
              <p className="text-lg font-semibold leading-8 tracking-wider " >That’s when we realized — </p>
               <p className=' text-lg font-semibold leading-8 tracking-wider w-[70%]'> the system was broken, not our ideas.</p>
                  
                <p className="bg-[#616B80] p-3 text-sm rounded-4xl text-center mt-9 mb-3">Really! The system is built to drain founders…</p>
                <p className="px-3 text-sm font-light">First, the ad platforms charge you for every single click (doesn’t matter if those clicks) <Link to="/" className="cursor-pointer">See more...</Link></p>
                <hr className="border-t border-[#FFFFFF33] mt-9 m-3 "/>

                <p className="bg-[#616B80] p-3  text-sm rounded-4xl text-center mt-6 mb-3">That’s when we decided, we need to fix this... </p>
                <p className="px-2 pl-3 text-sm font-light pb-4">So our team sat together, spent months on planning, strategizing, building and came up <Link to="/" className="cursor-pointer">See more...</Link></p>
        </div>
        <div className="lg:hidden p-4">
                <p className="bg-[#616B80] p-3 px-2 text-xs rounded-4xl text-center  mt-7 mb-7 text-white ">Simply, a connected ecosystem for founders & growth!</p>
        </div>

     
    </div>
  )
}

export default HomeSec3