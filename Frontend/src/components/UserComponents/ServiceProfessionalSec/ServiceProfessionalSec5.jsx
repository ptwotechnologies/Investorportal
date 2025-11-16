import React from 'react'

const ServiceProfessionalSec5 = () => {
 const divElements = [
     {
        number:"1 ",
        para:"Legal paperwork, compliances, agreements",
        phoneScreenHeading:"Get clients without paid marketing:",
        phoneScreenPara:"Work with pre-vetted startups actively seeking expert services without any ads or paid marketing."
     },
     {
        number:"2",
        para:"Building an MVP or scaling tech without wasting months",
        phoneScreenHeading:"All payments are protected :",
        phoneScreenPara:"All transactions are overseen by our admin team for clarity and accountability."
     },
     {
        number:"3",
        para:"Branding that earns trust, not just looks good",
        phoneScreenHeading:"Guidance when you need it : ",
        phoneScreenPara:"Get one-on-one guidance with portfolio, pricing, pitch decks and positioning"
     },
        {
        number:"4",
        para:"Marketing that brings in real users, not just traffic",
         phoneScreenHeading:"Access to active investors :",
        phoneScreenPara:"Build credibility and visibility within our growing investor network"
     },
     {
        number:"5",
        para:"Fundraising prep — how to talk to investors like you know your stuff",
        phoneScreenHeading:"Seamless project coordination :",
        phoneScreenPara:"We manage introductions, clarify project scopes, and keep things moving smoothly."
     },
     {
        number:"6 ",
        para:"Understanding where your money’s going (and why it matters)",
         phoneScreenHeading:"Verified clients with zero scam risk :",
        phoneScreenPara:"We maintain a 99.99% scam-free ecosystem, so you don’t waste time on fake leads or risky deals."
     },
 
   ]
  return (
   <>
    <div className='bg-linear-to-t from-[#002A30] to-[#001032] text-white mt-25 py-7  rounded-sm lg:rounded-none p-5 shadow-2xl lg:shadow-none' >
         
        <h1 className="text-4xl px-8 py-15 font-semibold hidden lg:block">
          Consultations that move you forward
        </h1>
        <h1 className='lg:hidden text-4xl font-semibold pb-7'>
          Why service providers choose this portal?
        </h1>
        <div className="grid lg:grid-cols-3 lg:gap-x-70 gap-5 lg:gap-y-30 lg:m-10 lg:mx-32">
          {
            divElements.map((item , index)=>(
                <div key={index} className="flex">
            <div className="border-l h-17 border-gray-700 p-2"></div>
            <div>
              <h1 className="text-3xl">{item.number}</h1>
              <p className="text-sm tracking-wide hidden lg:block">
              {item.para}
              </p>
              <p className="text-sm tracking-wide  lg:hidden">
              {item.phoneScreenHeading}
              </p>
              <p className="text-sm tracking-wide lg:hidden">
              {item.phoneScreenPara}
              </p>
            </div>
          </div>
            ))}
       
        </div>
    </div>
    <div className='shadow-2xl p-7 pt-15 m-2 lg:hidden text-center '>
      <h1 className='text-2xl font-bold text-[#001032]'>Sounds like a dream? <br />
       Let’s make them reality for ya!</h1>
      <button className='bg-[#002A30] p-3 text-white my-8 px-10 rounded-lg text-lg'>Let’s get started </button>
    </div>
   </>
  )
}

export default ServiceProfessionalSec5
