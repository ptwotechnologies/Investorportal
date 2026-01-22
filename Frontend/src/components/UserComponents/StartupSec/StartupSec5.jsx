import React from 'react'
import { Link } from 'react-router-dom'

const StartupSec5 = () => {
  const divElements = [
     {
        number:"1 ",
        phoneScreenHeading:"Get visibility without paid ads :",
        phoneScreenPara:"Reach verified investors and consultants with zero ad spend or noisy outreach"
     },
     {
        number:"2",
        phoneScreenHeading:"Your startup gets protected:",
        phoneScreenPara:"Every interaction is reviewed by our team for clarity, fairness and trust"
     },
     {
        number:"3",
        phoneScreenHeading:"Guidance when you need it:",
        phoneScreenPara:"Get one-on-one support with strategy, positioning, pitch materials and growth"
     },
        {
        number:"4",
         phoneScreenHeading:"Access to active investors:",
        phoneScreenPara:"Build credibility faster inside our growing investor discovery ecosystem"
     },
     {
        number:"5",
        phoneScreenHeading:"Seamless coordination:",
        phoneScreenPara:"We simplify intros, align scopes and keep your fundraising clean and smooth."
     },
     {
        number:"6 ",
         phoneScreenHeading:"Verified ecosystem, zero scam :",
        phoneScreenPara:"We maintain a 99.99% safe environment so you don’t waste energy on noise"
     },
   
 
   ]

   const phoneElements = [
     {
        number:"1 ",
        phoneScreenHeading:"Get visibility without paid ads :",
        phoneScreenPara:"Reach verified investors and consultantswith zero ad spend or noisy outreach"
     },
     {
        number:"2",
        phoneScreenHeading:"Your startup gets protected :",
        phoneScreenPara:"Every interaction is reviewed by ourteam for clarity, fairness and trust"
     },
     {
        number:"3",
        phoneScreenHeading:"Guidance when you need it :",
        phoneScreenPara:"Get one-on-one support with strategy,positioning, pitch materials and growth"
     },
        {
        number:"4",
         phoneScreenHeading:"Access to active investors :",
        phoneScreenPara:"Build credibility faster inside ourgrowing investor discovery ecosystem"
     },
     {
        number:"5",
        phoneScreenHeading:"Seamless founder coordination :",
        phoneScreenPara:"We simplify intros, align scopes andkeep your fundraising clean and smooth"
     },
     {
        number:"6 ",
         phoneScreenHeading:"Verified ecosystem, zero scam risk :",
        phoneScreenPara:"We maintain a 99.99% safe environmentso you don’t waste energy on noise"
     },
     {
        number:"7 ",
         phoneScreenHeading:"Opportunity to join incubation : ",
        phoneScreenPara:"Become part of our curated program andscale faster with structured support"
     },
 
   ]
  return (
    <>
    <div className='bg-linear-to-t from-[#002A30] to-[#001032] from-40% text-white lg:mt-25 mt-5 py-7  rounded-sm lg:rounded-none p-5 shadow-2xl lg:shadow-none' >
         
        <h1 className="text-5xl px-8 py-15 font-semibold hidden lg:block">
          Consultations that move you forward
        </h1>
        <h1 className='lg:hidden text-3xl font-semibold pb-7'>
          Why founders choose this portal?
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
      <h1 className='text-md mt-3 text-[#001032]'>Let’s turn it into <br/>
your real-world momentum!</h1>
      <Link to="/login"><button className='bg-[#002A30] p-2 lg:p-3 text-white lg:my-8 my-3 mt-8 px-10 rounded-lg text-lg'>Let’s get started 
 </button></Link>
    </div>
   </>
  )
}

export default StartupSec5
