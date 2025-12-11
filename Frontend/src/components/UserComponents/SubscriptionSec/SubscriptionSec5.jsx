import React from 'react'
import { Link } from 'react-router-dom'

const SubscriptionSec5 = () => {
  return (
    <div className=' p-4 lg:p-15 lg:px-35 text-white text-center  bg-[#F9972A1A] mt-6'>
     <div className='bg-linear-to-b from-[#C1CFED] from-90% to-[#001032D9] w-full  p-8 lg:p-10'>
        <div className='bg-white text-[#001032] w-full '>
            <h1 className=' text-xl lg:text-5xl pt-7 lg:pt-15 font-semibold tracking-wide'>Before you close this tab <br/>
            picture next Monday</h1>
            <p className='lg:text-lg  text-md leading-8 tracking-wider w-[90%] lg:w-[87%] mx-auto pt-6 lg:pt-10 font-extralight'>A designer finally polishes the landing page you’ve been delaying. That legal fix you’ve been avoiding? It’s sorted now</p>
             <p className='lg:text-lg  text-md p-2  leading-6 tracking-wide font-extralight'>And you are finally able to connect with a real audience without spending  on ads and expensive services.</p>
             <p className='lg:text-lg  text-md leading-8 tracking-wider w-[90%] lg:w-[87%] mx-auto pt-6 lg:pt-10 font-extralight' >If that’s the kind of Monday you want, go ahead and set it up now.</p>
              <Link to="/login" > <button className='bg-white text-black font-bold p-3 px-10 lg:px-20 lg:mt-10 mt-10 my-15 rounded-sm shadow-md border border-[#001032]'> Register</button></Link>
        </div>

     </div>
    </div>
  )
}

export default SubscriptionSec5
