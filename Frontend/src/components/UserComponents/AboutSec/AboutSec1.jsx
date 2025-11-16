import React from 'react'

const AboutSec1 = () => {
  return (
    <div className='pt-25  w-full lg:px-7 px-4 py-2 flex flex-col lg:flex-row justify-between items-center'>

     <div id='left' className=' lg:w-[50%] my-5 text-[#001032] lg:p-4 '>
      <h6 className='text-md font-semibold lg:py-4 pt-3'>About us</h6>
      <h1 className=' text-5xl lg:text-6xl font-bold leading-15 tracking-wide '>Taking your </h1>
       <h1 className='text-5xl lg:text-6xl font-bold leading-15 tracking-wide pb-12 hidden lg:block'>Step to the next level </h1> 

       <h1 className='text-5xl lg:text-6xl font-bold leading-15 tracking-wide  lg:hidden'>Step to  </h1>
        <h1 className='text-5xl lg:text-6xl font-bold leading-15 tracking-wide lg:pb-12 pb-4 lg:hidden '>the next level </h1>

        <p className='text-lg lg:leading-9 tracking-wider lg:w-[60%] font-medium pr-4'>Grow Your Business by Partnering with India’s Fastest-Growing Startup Ecosystem</p>
        <button className=' mt-6 lg:mt-18 bg-[#001032] text-white p-4 px-13 rounded-sm text-lg'>Enroll now</button>
     </div>

     <div id='right' className='w-full lg:w-[50%] lg:mt-28'>
       <div className='h-[250px] lg:h-[420px] bg-[#D8D8D8] lg:rounded-sm'>


       </div>
     </div>
    </div>
  )
}

export default AboutSec1