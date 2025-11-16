import React from 'react'
import img from "/homeSec1.png";
import img1 from "/priceImg.png"

const ChannelPartnerSec1 = () => {
  return (
   <div className='pt-44 lg:pt-40 w-full lg:px-6 px-4 py-2 flex flex-col  justify-center items-center gap-5 h-[900px] lg:h-auto rounded-b-2xl lg:rounded-none
                   '>
             <button className='mt-32 lg:mt-0 mx-auto text-[#001426] border border-[#001426] p-2 px-5 rounded-full font-semibold tracking-wide'>Channel Partners</button>
            <div id='left' className='w-full  text-center   lg:text-[#001032]   '>
             <h1 className=' text-5xl  mx-auto  lg:text-4xl lg:font-bold font-semibold lg:leading-11 leading-15 tracking-wide  lg:w-[60%] '>Grow Your Business by Partnering with India’s Fastest-Growing Startup Ecosystem</h1>
       
               
               <button className='  mt-7 lg:bg-[#001032] lg:text-white bg-white text-[#001032] p-3 px-12 rounded-sm text-lg drop-shadow-[0_6px_2px_rgba(0,0,0,0.2)] lg:drop-shadow-none '>Get Listed</button>
            </div>
       
            <div id='right' className='w-full  my-5 lg:px-10 '>
              <div className='h-[330px] lg:h-[600px] bg-[#D8D8D8] lg:rounded-sm rounded-2xl '>
               <img src={img} alt="Image" className='object-cover h-full w-full lg:hidden rounded-2xl'/>
               <img src={img1} alt="Image" className='object-cover h-[90%] w-[90%] hidden lg:block mx-auto rounded-2xl'/>
              </div>
            </div>
           </div>
  )
}

export default ChannelPartnerSec1
