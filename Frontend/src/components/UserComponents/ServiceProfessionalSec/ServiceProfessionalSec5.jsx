import React from 'react'
import { Link } from 'react-router-dom'

const ServiceProfessionalSec5 = () => {
 const divElements = [
     {
        number:"1 ",
        para:"Legal paperwork, compliances, agreements",
        phoneScreenHeading:"Work with committed founders:",
        phoneScreenPara:"Every startup here is verified, guided and serious about growth"
     },
     {
        number:"2",
        para:"Building an MVP or scaling tech without wasting months",
        phoneScreenHeading:"Get predictable workflows:",
        phoneScreenPara:"We help align scope, timelines and clarity before work begins"
     },
     {
        number:"3",
        para:"Branding that earns trust, not just looks good",
        phoneScreenHeading:"Build trust with structure:",
        phoneScreenPara:"You get clean communication, secure timelines and support"
     },
        {
        number:"4",
        para:"Marketing that brings in real users, not just traffic",
         phoneScreenHeading:"No spending on ads:",
        phoneScreenPara:"Stop paying for Meta and Google. Get discovered organically here"
     },
     {
        number:"5",
        para:"Fundraising prep — how to talk to investors like you know your stuff",
        phoneScreenHeading:"Support when things scale:",
        phoneScreenPara:"As founders grow, more work and larger scopes naturally come to you"
     },
     {
        number:"6 ",
        para:"Understanding where your money’s going (and why it matters)",
         phoneScreenHeading:"Zero-noise ecosystem:",
        phoneScreenPara:"Only real, incubated founders — no spam, no irrelevant leads"
     },
   
 
   ]

   const phoneElements = [
     {
        number:"1 ",
        phoneScreenHeading:"Work with committed founders:",
        phoneScreenPara:"Every startup here is verified, guided and serious about growth"
     },
     {
        number:"2",
        phoneScreenHeading:"Get predictable workflows:",
        phoneScreenPara:"We help align scope, timelines and clarity before work begins"
     },
     {
        number:"3",
        phoneScreenHeading:"Build trust with structure:",
        phoneScreenPara:"You get clean communication, secure timelines and support"
     },
        {
        number:"4",
         phoneScreenHeading:"No spending on ads:",
        phoneScreenPara:"Stop paying for Meta and Google. Get discovered organically here"
     },
     {
        number:"5",
        phoneScreenHeading:"Support when things scale:",
        phoneScreenPara:"As founders grow, more work and larger scopes naturally come to you"
     },
     {
        number:"6 ",
         phoneScreenHeading:"Zero-noise ecosystem:",
        phoneScreenPara:"Only real, incubated founders — no spam, no irrelevant leads"
     },
     {
        number:"7 ",
         phoneScreenHeading:"Grow your reputation: ",
        phoneScreenPara:"Your work brings visibility inside a curated startup network"
     },
 
   ]


  return (
   <>
    <div className='bg-linear-to-t from-[#002A30] to-[#001032] from-40% text-white mt-25 py-7  rounded-sm lg:rounded-none p-5 shadow-2xl lg:shadow-none' >
         
        <h1 className="text-5xl px-8 py-15 font-semibold hidden lg:block">
          Consultations that move you forward
        </h1>
        <h1 className='lg:hidden text-3xl font-semibold pb-7'>
          Why service providers choose Artestor?
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
    <div className='shadow-2xl p-7 pt-15 m-2 lg:hidden text-center '>
      <h1 className='text-xl font-bold text-[#001032]'>Feels like a dream?</h1>
      <h1 className='text-md mt-3 text-[#001032]'>Let’s turn it into your everyday work</h1>
      <Link to="/login"><button className='bg-[#002A30] p-2 lg:p-3 text-white lg:my-8 my-3 mt-8 px-10 rounded-lg text-lg'>Let’s get started 
 </button></Link>
    </div>
   </>
  )
}

export default ServiceProfessionalSec5
