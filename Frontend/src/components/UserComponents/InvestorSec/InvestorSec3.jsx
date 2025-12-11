import React from 'react'

const InvestorSec3 = () => {
  return (
     <>
    <div className=" p-10 lg:pt-35 hidden lg:block">
      <h1 className="text-[#001032CC] text-5xl font-bold">
       WHY INVESTORS CHOOSE THIS <br/> PORTAL?
      </h1>
      <div className="flex justify-center items-center gap-13 pt-15">
        <div id="left" className="w-[40%] ">
          <h1 className="text-2xl font-semibold py-10">The support system you’ve been missing</h1>
          <ul className="list-disc pl-4 p-4 font-medium">
            <li >
              <h2 className='text-xl font-semibold' >Access pre-vetted founders</h2>
              <p className=" text-lg font-light">
                Review startups that have been refined through structured preparation and expert assessment.
              </p>
            </li>
            <li >
              <h2 className='text-xl font-semibold'>All data is verified </h2>
              <p className=" text-lg font-light">
                Every metric, document, and statement is checked by our team for accuracy and clarity.
              </p>
            </li>
             <li >
              <h2 className='text-xl font-semibold'>Diligence support when needed</h2>
              <p className=" text-lg font-light">
                Get guided summaries, founder notes, and clean financial breakdowns.
              </p>
            </li>
            <li>
              <h2 className='text-xl font-semibold'>Network with aligned founders</h2>
              <p className=" text-lg font-light">
                See opportunities filtered to match your sector, thesis, and ticket size.
              </p>
            </li>
             <li>
              <h2 className='text-xl font-semibold' >Seamless deal coordination</h2>
              <p className=" text-lg font-light">
               We help streamline calls, clarify expectations, and maintain momentum.
              </p>
            </li>

          </ul>
        </div>
        <div id="right" className="w-[60%] grid grid-cols-2 gap-8 ">
          <div className="w-100 h-60 bg-[#EEEEEE] rounded-sm"></div>
          <div className="w-100 h-60 bg-[#002A308A] rounded-sm"></div>
          <div className="w-100 h-60 bg-[#0010329E] rounded-sm"></div>
          <div className="w-100 h-60 bg-[#1C1C1C99] "></div>
        </div>
      </div>
    </div>

    <div id="phoneScreen" className="lg:hidden">
      <div className="w-full h-16 bg-[#0010329E] rounded-t-sm"></div>
      <div className="w-full h-16 bg-[#EEEEEE] rounded-t-sm"></div>
      <div className="w-full h-16 bg-[#002A308A] rounded-t-sm"></div>
      <div className="w-full h-64 bg-[#FFFFFF] rounded-sm shadow-md mb-20"></div>
    </div>
    </>
  )
}

export default InvestorSec3
