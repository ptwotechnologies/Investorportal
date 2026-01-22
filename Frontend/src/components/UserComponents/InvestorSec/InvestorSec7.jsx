import React from 'react'
import { Link } from 'react-router-dom'

const InvestorSec7 = () => {
  return (
   <div className=" mt-10 lg:p-10  ">
      <h1 className="text-[#001032] text-3xl lg:text-5xl font-bold text-center lg:text-start">
       How do I get started?
      </h1>
      <div className='hidden lg:block'>
        <div className="flex  justify-center items-center gap-40 pt-15 ">
        <div id="left" className="w-[40%] ">
         <div className='text-[#001032] text-2xl font-medium leading-8 tracking-wide '>
            <h1 className='py-6'>Choose your on-boarding plan</h1>
            <hr />
         <h1 className='py-6'>Create your profile and list your services</h1>
          <hr />
         <h1 className='py-6'>Get approved in 24 hours</h1>
          <hr />
         <h1 className='py-6'>Go live on the portal</h1>
          <hr />
         </div>
         <div className='flex justify-between items-center gap-15'>
            <h1 className='py-6 text-4xl'>Get Onboarded</h1>
            <p className='bg-[#D9D9D9] rounded-full p-6 text-5xl mr-10 mt-2'>1/4</p>
         </div>
        </div>
        <div id="right" className="w-[60%]  ">
          <div className="w-full h-[500px] bg-[#EEEEEE] rounded-sm"></div>
         
        </div>
      </div>
      </div>

      <div className='lg:hidden bg-[#002A30] p-10 px-5 mt-10 rounded-sm text-white'>
        <div>
          <div className='w-10 h-10 bg-[#EEEEEE] mb-8 lg:hidden'>
            </div>
            <h1 className='text-2xl font-semibold pb-5'>Choose your on-boarding plan</h1>
           
            <p className='text-md leading-9 tracking-wider'>→ Select the tier that aligns with your investment style and focus</p>
            <p className='text-md leading-9 tracking-wider pb-9'>→ Just pick what fits your business goals</p>
           
             <div className='h-[300px] bg-[#FFFFFF] rounded-sm  mb-8'> </div>
             <hr className='mx-6'  />
        </div>

        <div>
          <div className='w-10 h-10 bg-[#EEEEEE] my-6 lg:hidden'>
            </div>
            <h1 className='text-2xl font-semibold pb-5'>Create your investor profile, past deals & experience</h1>
           
            <p className='text-md leading-9 tracking-wider'>→ Add categories, pricing, experience and turnaround timelines</p>
            <p className='text-md leading-9 tracking-wider pb-9'>→ Share your sectors, thesis, past deals, and preferred ticket sizes.</p>
           
             <div className='h-[300px] bg-[#FFFFFF] rounded-sm mt-6 my-8'> </div>
              <hr className='mx-6' />
        </div>

        <div>
          <div className='w-10 h-10 bg-[#EEEEEE] my-6 lg:hidden'>
            </div>
            <h1 className='text-2xl font-semibold pb-5'>Get verified in 24 hours</h1>
           
            <p className='text-md leading-9 tracking-wider'>→ Our team confirms your details to maintain credibility in the system</p>
            
             <div className='h-[300px] bg-[#FFFFFF] rounded-sm  my-8'> </div>
             <hr className='mx-6'  />
        </div>

        <div>
          <div className='w-10 h-10 bg-[#EEEEEE] my-6 lg:hidden'>
            </div>
            <h1 className='text-2xl font-semibold pb-5'>Go live on the portal</h1>
           
            <p className='text-md leading-9 tracking-wider'>→ Start discovering refined founders and evaluating real opportunities</p>
           
             <div className='h-[300px] bg-[#FFFFFF] rounded-sm  my-8'> </div>
              <hr className='mx-6'  />
        </div>




      </div>

       <div className='lg:hidden text-center  mt-8'>
                    <h1 className='text-[#001032] text-2xl font-semibold text-center'>Ready to on-board...?</h1>
                      <Link to="/login"><button className='bg-[#001032] text-white px-5 py-3 rounded-sm shadow-2xl mt-7 '>Click here & Get started</button></Link>
                              <div  className="w-full  h-fit  p-4 text-start mt-5">
                         <div className=' w-full h-full gap-10  shadow-xl border px-6 pb-6  rounded-md p-4'>
                            <p className=' text-sm leading-6 tracking-wider pb-4 '>You’ve built the skill. We’ve built the ecosystem</p>
                            <p className=' text-sm leading-6 tracking-wider '>Instead of chasing leads or spending on ads, get consistent work from real founders Together we create a cleaner, more predictable work pipeline</p>
            
                             <div className=' flex justify-between items-center lg:mt-25 mt-15 ' >
                                 <div className='font-semibold text-sm'>
                                    <h1>Join once. </h1>
                                      <p>Let the work come for you</p>
                                 </div>
                              <div className='flex justify-center items-center gap-3'>
                                <div className='w-0.5 h-[70px] bg-[#D9D9D9] '>
                              </div>
                                <div className=' rounded-full bg-[#001032] w-20 h-20 flex items-center justify-center'>
                                  <p className=' text-sm  text-white'>Get Listed</p>
                              </div>
                              
                              </div>
                         </div>
                          </div>
                        </div>
                  </div>
    </div>
  )
}

export default InvestorSec7
