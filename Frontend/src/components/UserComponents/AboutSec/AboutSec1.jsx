import React from 'react'
import { Link } from 'react-router-dom'

const AboutSec1 = () => {
  return (
    <div className='pt-20  w-full lg:px-7 px-4 py-2 flex flex-col lg:flex-row justify-between items-center'>

     <div id='left' className=' lg:w-[50%] my-5 text-[#001032] lg:p-4 '>
      <h6 className='text-sm font-semibold lg:my-4 mt-3 mb-2 border border-[#001032] w-fit px-4 py-1 rounded-full'>About us</h6>
      <h1 className=' text-4xl lg:text-6xl font-bold lg:font-semibold lg:leading-15  leading-12 tracking-wide '>Taking your </h1>
       <h1 className='text-4xl lg:text-6xl font-bold lg:font-semibold  leading-15 tracking-wide pb-12 hidden lg:block'>step to the next level </h1> 

       <h1 className='text-4xl lg:text-6xl font-bold lg:font-semibold  lg:leading-15  leading-12 tracking-wide  lg:hidden'>step to  </h1>
        <h1 className='text-4xl lg:text-6xl font-bold lg:font-semibold  lg:leading-15  leading-12 tracking-wide lg:pb-12 pb-4 lg:hidden '>the next level </h1>

        <p className='  lg:leading-9 tracking-wider lg:w-[60%]  pr-4'>Grow Your Business by Partnering with India’s Fastest-Growing Startup Ecosystem</p>
        <Link to="/login"><button className=' my-6 lg:mt-18 bg-[#001032] text-white p-2 px-13 rounded-sm text-lg'>Enroll now</button></Link>
     </div>

     <div id='right' className='w-full lg:w-[50%] lg:mt-28'>
       <div className='h-[220px] lg:h-[420px] bg-[#D8D8D8] lg:rounded-sm'>


       </div>
     </div>
    </div>
  )
}

export default AboutSec1