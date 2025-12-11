import React from 'react'

const InvestorSec2 = () => {
  return (
     <>
    <div className="mt-15  hidden  lg:block">
      <hr />
      <div className=" m-10">
        <h1 className='mb-15 mt-20 text-5xl text-[#001032] font-semibold leading-11 tracking-wider'>The investor portal</h1>
        <div className="flex justify-evenly items-center gap-20">
          <div className="flex justify-center items-center gap-15 mx-10 ml-35">
            <div className="w-[18%] ">
              <div className="text-6xl mb-1 text-[#002A30] font-semibold ">
                <p >1</p></div>
              <p className="text-[#001032] font-medium  tracking-wide leading-8 text-lg ">Discover</p>
              <p className='text-sm w-[90%]'>Curated deal flow Meet vetted founders buildinghigh-potential ventures </p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
            </div>
            <div className="w-[18%]  ">
              <div className="text-6xl mb-1 text-[#002A30] font-semibold ">
                <p >2</p></div>
              <p className="text-[#001032] font-medium  tracking-wide leading-8 text-xl">Evaluate</p>
              <p className='text-sm w-[90%]'>Structured startup dataReview clarity-driven insights built for investor decisions </p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
            </div>
             <div className="w-[18%]  ">
             <div className="text-6xl mb-1 text-[#002A30] font-semibold">
                <p >3</p></div>
              <p className="text-[#001032] font-medium  tracking-wide leading-8 text-xl">Network</p>
               <p className='text-sm w-[90%]'>Connect with experts Access domain partners whosupport your investment thesis </p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
            </div>
             <div className="w-[18%]  ">
              <div className="text-6xl mb-1 text-[#002A30] font-semibold">
                <p >4</p></div>
              <p className="text-[#001032] font-medium  tracking-wide leading-8 text-xl">Allocate</p>
              <p className='text-sm w-[90%]'>Deploy with confidenceInvest through verified startup-ready systems </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="phoneScreen" className="bg-[#DDDDDD] rounded-2xl text-white flex flex-wrap gap-x-4 gap-y-16  justify-center mt-1 py-14 pt-40 lg:hidden">
      <button className="bg-[#002A30] p-2 text-lg w-[45%] border-2 border-white rounded-2xl">Curated Deal <br/> Flow </button>
      <button className="bg-[#002A30] p-2 text-lg w-[45%] border-2 border-white rounded-2xl" > Expert-Verified Startups </button>
      <button className="bg-[#002A30] p-2 text-lg w-[45%] border-2 border-white rounded-2xl">Smart Matching System </button>
      <button className="bg-[#002A30] p-2 text-lg w-[45%] border-2 border-white rounded-2xl"> Post-Investment Support </button>
      <button className="bg-[#002A30] p-2 text-lg w-[40%] border-2 border-white rounded-2xl">Transparent Founder Data </button>

    </div>
   </>
  )
}

export default InvestorSec2
