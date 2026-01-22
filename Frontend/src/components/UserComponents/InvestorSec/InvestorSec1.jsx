import React from 'react'
import img from "/homeSec1.png";

const InvestorSec1 = () => {
  return (
    <div className='pt-55 lg:pt-20 w-full lg:px-6 px-4 py-2 flex flex-col  justify-center items-center gap-5 h-[680px] lg:h-auto rounded-b-2xl lg:rounded-none
                  bg-linear-to-b from-[#001032] from-40% via-blue-[#001032] at-130% to-[#003198] lg:bg-none text-white '>
              <h6 className='lg:hidden mx-auto  border border-white px-4 py-1 rounded-full'>For Investors</h6>
             <div id='left' className='w-full text-center lg:text-start  lg:my-5 lg:text-[#001032]   lg:pt-3 '>
              <h1 className=' text-4xl lg:text-4xl lg:font-bold font-semibold lg:leading-11 leading-12 tracking-wide lg:w-[80%] lg:hidden'>Discover <br/>  Curated And High Quality Startups Screened Through a Founder-Focused Ecosystem </h1>
                <button className='lg:hidden  mt-7 lg:bg-[#001032] lg:text-white bg-white text-[#001032] p-2 lg:px-13 px-8 rounded-sm text-lg '>Get Listed</button>
             </div>
        
             <div id='right' className='w-full my-5 lg:w-[80%]  '>
               <div className='h-[220px] lg:h-[400px] bg-[#D8D8D8] lg:rounded-sm rounded-2xl lg:flex lg:justify-center lg:items-end'>
                <img src={img} alt="Image" className='object-cover h-full w-full lg:hidden rounded-2xl'/>
                 <button className='hidden lg:block mb-3 lg:bg-[#001032] lg:text-white bg-white text-[#001032] p-3 px-15  rounded-sm text-lg'>Get Listed</button>
               </div>
             </div>
             <div className='hidden lg:block text-center  w-[75%]'>
                <h1 className='  text-center text-5xl font-semibold  leading-13  tracking-wide  text-[#001032]'>Discover Curated And High Quality Startups Screened Through a Founder-Focused Ecosystem</h1>
             </div>
            </div>
  )
}

export default InvestorSec1
