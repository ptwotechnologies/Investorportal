import React from 'react'
import { Link } from 'react-router-dom'

const InvestorSec5 = () => {
   const divElements = [
     {
        number:"1 ",
        phoneScreenHeading:"Access refined deal flow:",
        phoneScreenPara:"Meet founders who already completed structured readiness"
     },
     {
        number:"2",
        phoneScreenHeading:"Verified startup profiles:",
        phoneScreenPara:"All data is reviewed for trust, accuracy, and presentation"
     },
     {
        number:"3",
        phoneScreenHeading:"Guidance when needed:",
        phoneScreenPara:"Get expert insights on traction, narratives, and signals"
     },
        {
        number:"4",
         phoneScreenHeading:"Cross-industry exposure:",
        phoneScreenPara:"Discover opportunities across multiple growing sectors"
     },
     {
        number:"5",
        phoneScreenHeading:"Seamless introductions:",
        phoneScreenPara:"We handle alignment so your time goes to evaluation"
     },
     {
        number:"6 ",
         phoneScreenHeading:"Zero noise, zero clutter:",
        phoneScreenPara:"Only credible startups enter the ecosystem — nothing random"
     },
   
 
   ]

   const phoneElements = [
     {
        number:"1 ",
        phoneScreenHeading:"Access refined deal flow:",
        phoneScreenPara:"Meet founders who already completed structured readiness"
     },
     {
        number:"2",
        phoneScreenHeading:"Verified startup profiles:",
        phoneScreenPara:"All data is reviewed for trust, accuracy, and presentation"
     },
     {
        number:"3",
        phoneScreenHeading:"Guidance when needed:",
        phoneScreenPara:"Get expert insights on traction, narratives, and signals"
     },
        {
        number:"4",
         phoneScreenHeading:"Cross-industry exposure:",
        phoneScreenPara:"Discover opportunities across multiple growing sectors"
     },
     {
        number:"5",
        phoneScreenHeading:"Seamless introductions:",
        phoneScreenPara:"We handle alignment so your time goes to evaluation"
     },
     {
        number:"6 ",
         phoneScreenHeading:"Zero noise, zero clutter:",
        phoneScreenPara:"Only credible startups enter the ecosystem — nothing random"
     },
     {
        number:"7 ",
         phoneScreenHeading:"Opportunity to mentor:  ",
        phoneScreenPara:"Support promising founders and shape future investments"
     },
 
   ]
  return (
   <>
    <div className='bg-linear-to-t from-[#002A30] to-[#001032] from-40% text-white mt-25 py-7  rounded-sm lg:rounded-none p-5 shadow-2xl lg:shadow-none' >
         
        <h1 className="text-5xl px-8 py-15 font-semibold hidden lg:block">
          Consultations that move you forward
        </h1>
        <h1 className='lg:hidden text-3xl font-semibold pb-7'>
          Why service providers choose this portal?
        </h1>
       <div className='hidden lg:block'>
            <div className="grid lg:grid-cols-3 lg:gap-x-30 gap-5 lg:gap-y-30 lg:m-10 lg:mx-25">
          {
            divElements.map((item , index)=>(
                <div key={index} className="flex">
            <div className="border-l h-20 border-[#FFFFFF4D] p-2"></div>
            <div>
              <h1 className="text-6xl">{item.number}</h1>
              <p className="font-medium tracking-wide text-xl ">
              {item.phoneScreenHeading}
              </p>
              <p className="text-lg font-light tracking-wide ">
              {item.phoneScreenPara}
              </p>
            </div>
          </div>
            ))}
       
        </div>
       </div>

       <div className=' lg:hidden'>
 <div className="grid lg:grid-cols-3 lg:gap-x-70 gap-5 lg:gap-y-30 lg:m-10 lg:mx-32">
          {
            phoneElements.map((item , index)=>(
                <div key={index} className="flex my-2">
            <div className="border-l h-23 border-[#FFFFFF4D] p-2"></div>
            <div>
              <h1 className="text-5xl">{item.number}</h1>
              <p className="text-md font-medium tracking-wide   ">
              {item.phoneScreenHeading}
              </p>
              <p className="text-sm tracking-wide font-light">
              {item.phoneScreenPara}
              </p>
            </div>
          </div>
            ))}
       
        </div>
       </div>
    </div>
    <div className='shadow-2xl p-7 pt-10 m-2 lg:hidden text-center '>
         <h1 className='text-xl font-bold text-[#001032]'>Sounds like the right fit?</h1>
         <h1 className='text-md mt-3 text-[#001032]'>Let’s help you meet better founders </h1>
         <Link to="/login"><button className='bg-[#002A30] p-2 lg:p-3 text-white lg:my-8 my-3 mt-8 px-10 rounded-lg text-lg'>Let’s get started 
    </button></Link>
       </div>
   </>
  )
}

export default InvestorSec5
