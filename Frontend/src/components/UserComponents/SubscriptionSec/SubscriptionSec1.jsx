import React from 'react'
import img from "/homeSec1.png";
import img1 from "/priceImg.png"
import { Link } from 'react-router-dom';


const SubscriptionSec1 = () => {
  return (
   <div className=' lg:pt-30 w-full lg:px-6 px-4 py-2 flex flex-col  justify-center items-center gap-5 h-[800px] lg:h-auto rounded-b-2xl lg:rounded-none
                   '>
             <button className='mt-32 lg:mt-0 mx-auto text-[#001426] border border-[#001426] p-1 px-7 rounded-full font-semibold tracking-wide'>Subscriptions</button>
            <div id='left' className='w-full  text-center   lg:text-[#001032]   '>
             <h1 className=' text-4xl  mx-auto  lg:text-4xl lg:font-bold font-semibold lg:leading-11 leading-12 tracking-wide  lg:w-[60%] '>Grow Your Business by Partnering with India’s Fastest-Growing Startup Ecosystem</h1>
       
               
               <Link to="/login"><button className='  mt-7 lg:bg-[#001032] lg:text-white bg-white text-[#001032] p-2 px-10 rounded-sm text-lg drop-shadow-[0_6px_2px_rgba(0,0,0,0.2)] lg:drop-shadow-none '>Register</button></Link>
            </div>
       
            <div id='right' className='w-full  my-5 lg:px-10 '>
              <div className='h-60 lg:h-[600px] bg-[#D8D8D8] lg:rounded-sm rounded-2xl '>
               <img src={img} alt="Image" className='object-cover h-full w-full lg:hidden rounded-2xl shadow-lg'/>
               <img src={img1} alt="Image" className='object-cover h-[90%] w-[90%] hidden lg:block mx-auto rounded-2xl'/>
              </div>
            </div>
           </div>
  )
}

export default SubscriptionSec1
