import React from 'react'

const ServiceProfessionalSec3 = () => {
  return (
    <>
    <div className=" p-10 pt-15 hidden lg:block">
      <h1 className="text-[#001032CC] text-5xl font-bold">
        Gaps in the Market
      </h1>
      <div className="flex justify-center items-center gap-13 pt-15">
        <div id="left" className="w-[40%] ">
          <h1 className="text-xl font-semibold pb-2">Most service pros chase noisy leads, deal with scope creep, and lose hours on discovery calls that never convert. We fix that.</h1>
          <ul className="list-disc pl-4 px-4 font-medium">
            <li >
              <h2 className='text-xl font-medium my-2' >Predictable project flow:</h2>
              <p className=" text-lg text-wide leading-7">
                Get matched to startups that match your expertise and capacity.
              </p>
            </li>
            <li >
              <h2 className='text-xl font-medium my-2' >Verified decisions: </h2>
              <p className=" text-lg text-wide leading-7">
                Work only with founders vetted for clarity, intent and budgets.
              </p>
            </li>
             <li >
              <h2 className='text-xl font-medium my-2'  >Clear scopes, fair rates:</h2>
              <p className=" text-lg text-wide leading-7">
                Set deliverables and pricing up-front — no hidden surprises.
              </p>
            </li>
            <li>
              <h2 className='text-xl font-medium my-2'>Payment protection:</h2>
              <p className=" text-lg text-wide leading-7">
                Platform-assisted payments and milestone release keep work steady.
              </p>
            </li>
             <li>
              <h2 className='text-xl font-medium my-2' >Long-term relationships:</h2>
              <p className=" text-lg text-wide leading-7">
                Convert single projects into recurring collaborations and retainers.
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

export default ServiceProfessionalSec3