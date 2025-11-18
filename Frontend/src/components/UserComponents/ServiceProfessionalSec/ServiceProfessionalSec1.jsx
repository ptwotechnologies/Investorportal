import React from 'react'
import img from "/homeSec1.png";
import { Link } from 'react-router-dom';


const ServiceProfessionalSec1 = () => {
  return (
    <div className='pt-30 lg:pt-35 w-full lg:px-6 px-4 py-2 flex flex-col lg:flex-row justify-around items-start  h-[800px] lg:h-auto rounded-b-2xl lg:rounded-none
          bg-linear-to-b from-[#001032] from-40% via-blue-[#001032] at-130% to-[#003198] lg:bg-none text-white '>
      <h6 className='lg:hidden mx-auto mb-3 text-sm'>For Service Professionals</h6>
     <div id='left' className='w-full text-center lg:text-start lg:w-[50%] lg:my-5 lg:text-[#001032]   lg:pt-3 '>
      <h1 className='hidden lg:block text-5xl lg:text-4xl lg:font-bold font-semibold lg:leading-14 leading-15 tracking-wider lg:w-[80%] '>Grow Your Services by Partnering with </h1>
        <h1 className='hidden lg:block text-5xl lg:text-4xl lg:font-bold font-semibold lg:leading-14 leading-15 tracking-wider lg:w-[90%] ' >India’s Most Trusted Founder Ecosystem</h1>
        <h1 className='lg:hidden text-4xl font-semibold tracking-wider leading-13'>Grow Your Business by Working With India’s Most Serious & Verified Startups</h1>
        <p className='text-2xl lg:leading-9 tracking-wider lg:w-[80%] font-medium py-7 hidden lg:block text-[#001032]'>Join Artestor to get verified leads, fair terms, and predictable projects</p>
        <Link to="/login"><button className='  mt-7 lg:bg-[#001032] lg:text-white bg-white text-[#001032] p-2 lg:p-4 px-6 lg:px-13 rounded-sm text-xl lg:font-medium mb-15 lg:mb-0'>Get Discovered
</button></Link>
     </div>

     <div id='right' className='w-full my-5 lg:w-[50%] '>
       <div className='h-[280px] lg:h-[470px] bg-[#D8D8D8] lg:rounded-sm rounded-2xl '>
        <img src={img} alt="Image" className='object-cover h-full w-full lg:hidden rounded-2xl'/>
       </div>
     </div>
    </div>
  )
}

export default ServiceProfessionalSec1