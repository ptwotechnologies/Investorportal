import React from 'react'

const StartupSec2 = () => {
  return (
    <>
    <div className="mt-15  hidden  lg:block">
      <hr />
      <div className=" m-10">
        <h1 className='mb-18 mt-18 text-5xl text-[#001032] font-semibold leading-11 tracking-wider'>The startup ecosystem</h1>
        <div className="flex justify-evenly items-center gap-20">
          <div className="flex justify-center items-center gap-15 mx-10 ml-35">
            <div className="w-[18%] ">
              <div className="text-7xl mb-1 text-[#002A30] font-semibold ">
                <p >1</p></div>
              <p className="text-[#001032] font-medium  tracking-wide leading-8 text-xl ">Onboard</p>
              <p className='text-sm w-[90%]'>Start your journey with a structured flow designed for founders preparing to scale</p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#acacac33]"></div>
            </div>
            <div className="w-[18%]  ">
              <div className="text-7xl mb-1 text-[#002A30] font-semibold ">
                <p >2</p></div>
              <p className="text-[#001032] font-medium  tracking-wide leading-8 text-xl">Guide</p>
              <p className='text-sm w-[90%]'>Get strategic direction to shape your story, product, and investment narrative</p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#acacac33]"></div>
            </div>
             <div className="w-[18%]  ">
             <div className="text-7xl mb-1 text-[#002A30] font-semibold">
                <p >3</p></div>
              <p className="text-[#001032] font-medium  tracking-wide leading-8 text-xl">Network</p>
               <p className='text-sm w-[90%]'>Build meaningful connections with people who can accelerate your next milestone </p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#acacac33]"></div>
            </div>
             <div className="w-[18%]  ">
              <div className="text-7xl mb-1 text-[#002A30] font-semibold">
                <p >4</p></div>
              <p className="text-[#001032] font-medium  tracking-wide leading-8 text-xl">Allocate</p>
              <p className='text-sm w-[90%]'>Focus your time and energy where it matters most with a guided founder path </p>
            </div>
           
          </div>
        </div>
      </div>
    </div>

    <div id="phoneScreen" className="border rounded-2xl text-white flex flex-wrap gap-x-4 gap-y-16  justify-center mt-1 py-8 pt-40  lg:hidden">
      <button className="shadow-lg text-[#000000] border p-2 text-md w-[45%] rounded-2xl">Investor-Ready Preparation </button>
      <button className="shadow-lg text-[#000000] border p-2 text-md w-[45%] rounded-2xl" > Transparent Fund Process </button>
      <button className="shadow-lg text-[#000000] border p-2 text-md w-[45%] rounded-2xl">Expert-Led Mentorship </button>
      <button className="shadow-lg text-[#000000] border p-2 text-md w-[45%] rounded-2xl"> Smart Founder Matching </button>
      <button className="shadow-lg text-[#000000] border p-2 text-md w-[40%] rounded-2xl">Post-Launch Support </button>

    </div>
   </>
  )
}

export default StartupSec2
