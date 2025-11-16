import React from 'react'

const StartupSec3 = () => {
  return (
     <>
    <div className=" p-10 lg:pt-35 hidden lg:block">
      <h1 className="text-[#001032CC] text-5xl font-bold">
        The broken loops in the market
      </h1>
      <div className="flex justify-center items-center gap-13 pt-15">
        <div id="left" className="w-[40%] ">
          <h1 className="text-2xl font-semibold py-10">The support system you’ve been missing</h1>
          <ul className="list-disc pl-4 p-4 font-medium">
            <li >
              <h2 >Verified startup flow</h2>
              <p className="text-base">
                Work with early-stage founders actively seeking your services - no cold outreach needed.
              </p>
            </li>
            <li >
              <h2 >Organic visibility </h2>
              <p className="text-base">
                Get discovered organically inside the portal by 500+ startups browsing daily.
              </p>
            </li>
             <li >
              <h2 >Access to mid & high ticket projects</h2>
              <p className="text-base">
                Work on clearly defined projects, budgets are pre-set and verified by our admin team.
              </p>
            </li>
            <li>
              <h2>Admin-support communication</h2>
              <p className="text-base">
                From onboarding to delivery, we help streamline conversations and protect both sides.
              </p>
            </li>
             <li>
              <h2 >Consultation for industry experts</h2>
              <p className="text-base">
                Get free guidance on portfolio building, pricing, negotiation, and presentation.
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

export default StartupSec3
