import React from 'react'

import { Link } from 'react-router-dom';


const SubscriptionSec1 = () => {
  return (
    <div className='lg:pt-40 w-full lg:px-6 px-4 py-2 flex flex-col justify-center items-center gap-5 h-[880px] lg:h-auto rounded-b-2xl lg:rounded-none'>
      <div className="max-w-[1600px] mx-auto w-full flex flex-col justify-center items-center gap-5">
        <button className='mt-25 lg:mt-0 mx-auto text-[#001426] border border-[#001426] p-1 lg:px-7 px-5 rounded-full font-semibold tracking-wide text-sm lg:text-[16px]'>Business Refinement Program</button>
        <div id='left' className='w-full text-center lg:text-[#001032]'>
          <h1 className='text-4xl mx-auto lg:text-4xl lg:font-bold font-semibold lg:leading-11 leading-12 tracking-wide lg:w-[60%]'>Grow Your Business by Partnering with India’s Fastest-Growing Startup Ecosystem</h1>
          <Link to="/login"><button className='mt-7 lg:bg-[#001032] lg:text-white bg-white text-[#001032] p-2 px-10 rounded-sm text-lg drop-shadow-[0_6px_2px_rgba(0,0,0,0.2)] lg:drop-shadow-none'>Register</button></Link>
        </div>
        <div id='right' className='w-full my-5 lg:my-0 lg:w-[60%] min-[1450px]:w-full'>
          <div className='relative h-80 lg:h-[400px] min-[1400px]:!h-[600px] lg:rounded-sm rounded-2xl flex justify-center items-end overflow-hidden shadow-md lg:shadow-none'>
            <img src="/businessrefinepage2.png" alt="Image" className='h-full w-full lg:hidden rounded-2xl border'/>
            <img src="/businessrefinepage1.png" alt="Image" className='h-full w-full  hidden lg:block mx-auto rounded-sm border'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionSec1
