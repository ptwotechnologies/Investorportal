import React from 'react'

import { Link } from 'react-router-dom'; 

const PricingSec1 = () => {
  return (
    <div className='pt-20 lg:pt-15 w-full lg:px-6 min-[1400px]:!pt-19 px-4 py-2 flex flex-col justify-center items-center gap-5 h-[900px] lg:h-auto rounded-b-2xl lg:rounded-none'>
      <div className="max-w-[1600px] mx-auto w-full flex flex-col justify-center items-center gap-5">
        <button className=' mx-auto text-[#001426] border border-[#001426] p-1 px-12 rounded-full font-semibold tracking-wide lg:mt-15'>Pricing</button>
        <div id='left' className='w-full text-center lg:text-[#001032]'>
          <h1 className='text-[42px] mx-auto lg:text-4xl lg:font-bold font-semibold lg:leading-11 leading-14 tracking-wide lg:w-[60%]'>Grow Your Business by Partnering with India’s Fastest-Growing Startup Ecosystem</h1>
          <Link to="/login"><button className='mt-7  lg:my-10 lg:bg-[#001032] lg:text-white bg-white text-[#001032] p-1 px-10 rounded-sm text-lg drop-shadow-[0_6px_2px_rgba(0,0,0,0.2)] lg:drop-shadow-none'>Get Listed</button></Link>
        </div>
        <div id='right' className='w-full my-5 lg:my-0 lg:w-[80%] min-[1450px]:w-full'>
          <div className='relative h-[250px] lg:h-[300px] min-[1400px]:!h-[500px] bg-[#D8D8D8] lg:rounded-sm rounded-2xl flex justify-center items-end overflow-hidden shadow-md lg:shadow-none'>
            <img src="/pricepage2.png" alt="Image" className='h-full w-full lg:hidden rounded-2xl'/>
            <img src="/pricepage1.png" alt="Image" className='w-full h-full  border hidden lg:block mx-auto rounded-sm'/>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default PricingSec1