import React from 'react'
import { Link } from 'react-router-dom'

const JoinUsSec1 = () => {
  return (
   <div className='lg:bg-[#D8D8D880]  text-white'>
        <div className='bg-[#001032] lg:bg-[#D8D8D880]'>
            <h1 className='lg:hidden pt-25 text-center pb-3 '>For Service Professionals</h1>
        <div className=' text-center w-full lg:h-screen flex justify-center items-start lg:items-end lg:pb-16 '>
            <div className=' lg:w-[73%] lg:text-[#001032]' >
            <p className='text-[42px] font-semibold leading-13 lg:leading-14 tracking-wide mb-6 '>Grow Your Business by Partnering with India’s Fastest-Growing Startup Ecosystem</p>
        <p className='text-2xl leading-8 tracking-wide hidden lg:block'>Grow Your Business by Partnering with India</p>
        <Link to="/login"><button className='  mt-3 lg:bg-[#001426] lg:text-white bg-white text-[#001032] 
        p-2 px-14 rounded-sm text-lg mb-15 lg:mb-0'>Get Listed</button></Link>
        </div>
    </div>
        </div>

    <div id="phoneScreen" className="lg:hidden">
      <div className="w-full h-16 bg-[#BBEEFF9E] rounded-t-sm"></div>
      <div className="w-full h-16 bg-[#EEEEEE] rounded-t-sm"></div>
      <div className="w-full h-16 bg-[#002A308A] rounded-t-sm"></div>
      <div className="w-full h-64 bg-[#FFFFFF] rounded-sm shadow-md mb-20"></div>
    </div>
    </div>
  )
}

export default JoinUsSec1
