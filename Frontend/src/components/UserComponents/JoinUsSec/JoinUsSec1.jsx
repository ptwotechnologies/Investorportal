import React from 'react'
import { Link } from 'react-router-dom'

const JoinUsSec1 = () => {
  return (
   <div className='lg:bg-[#D8D8D880]  text-white'>
        <div className='bg-[#001032] lg:bg-[#D8D8D880] px-5 pt-8'>
            <h1 className='lg:hidden mt-18  text-center mx-auto border border-white w-fit px-4 py-1 mb-2 rounded-full '>Join us</h1>
            <img src="/joinuspage1.png" alt="" className=' w-230 h-100 mx-auto object-cover mt-30 hidden lg:block rounded-sm' />
        <div className=' text-center w-full  flex justify-center items-start lg:items-end lg:pb-5 '>
          
            <div className=' lg:w-[73%] lg:text-[#001032]' >
            <p className='text-[42px] font-semibold leading-13 lg:leading-12 tracking-wide mb-6 hidden lg:block mt-5'>Collaborate, grow, and accelerate opportunities on one unified platform</p>
            <p className='text-4xl font-semibold leading-13 lg:leading-14 tracking-wide mb-6 lg:hidden '>Collaborate, grow, and accelerate opportunities on one unified platform - An ecosystem for every business</p>
        <p className='text-2xl leading-8 tracking-wide hidden lg:block'>Join India’s Fastest-Growing Business Ecosystem</p>
        <Link to="/login"><button className='  mt-3 lg:bg-[#001426] lg:text-white bg-white text-[#001032] 
        p-2 px-14 rounded-sm text-lg mb-35 lg:mb-0'>Get Listed</button></Link>
        </div>
    </div>
        </div>

    <div id="phoneScreen" className="lg:hidden px-4 ">
      {/* <div className="w-full h-16 bg-[#BBEEFF9E] rounded-t-sm"></div>
      <div className="w-full h-16 bg-[#EEEEEE] rounded-t-sm"></div>
      <div className="w-full h-16 bg-[#002A308A] rounded-t-sm"></div> */}
      <div className="w-full h-74 bg-[#FFFFFF]  shadow-md relative bottom-20 rounded-xl ">
        <img src="/joinuspage2.png" alt=""  className='w-full h-full object-contain '/>
      </div>
    </div>
    </div>
  )
}

export default JoinUsSec1
