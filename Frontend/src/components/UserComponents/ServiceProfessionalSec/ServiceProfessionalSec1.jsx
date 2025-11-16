import React from 'react'
import img from "/homeSec1.png";


const ServiceProfessionalSec1 = () => {
  return (
    <div className='pt-40 w-full lg:px-6 px-4 py-2 flex flex-col lg:flex-row justify-between items-start gap-5 h-[900px] lg:h-auto rounded-b-2xl lg:rounded-none
          bg-linear-to-b from-[#001032] from-40% via-blue-[#001032] at-130% to-[#003198] lg:bg-none text-white '>
      <h6 className='lg:hidden mx-auto'>For Service Professionals</h6>
     <div id='left' className='w-full text-center lg:text-start lg:w-[40%] lg:my-5 lg:text-[#001032]   lg:pt-3 '>
      <h1 className=' text-5xl lg:text-4xl lg:font-bold font-semibold lg:leading-11 leading-15 tracking-wide lg:w-[80%] '>Grow Your Business by Partnering with India’s Fastest-Growing Startup Ecosystem</h1>

        <p className='text-lg lg:leading-9 tracking-wider lg:w-[60%] font-medium py-7 hidden lg:block'>Grow Your Business by Partnering with India’s Fastest-Growing Startup</p>
        <button className='  mt-7 lg:bg-[#001032] lg:text-white bg-white text-[#001032] p-4 px-13 rounded-sm text-lg'>Get Listed</button>
     </div>

     <div id='right' className='w-full my-5 lg:w-[50%] '>
       <div className='h-[330px] lg:h-[470px] bg-[#D8D8D8] lg:rounded-sm rounded-2xl '>
        <img src={img} alt="Image" className='object-cover h-full w-full lg:hidden rounded-2xl'/>
       </div>
     </div>
    </div>
  )
}

export default ServiceProfessionalSec1