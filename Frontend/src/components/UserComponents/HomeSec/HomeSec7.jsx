import React from 'react'
import { Link } from 'react-router-dom'

const HomeSec7 = () => {
  return (
     <div className=' p-8 lg:p-15 lg:px-35 text-white text-center  bg-[#F9972A1A] '>
     <div className='bg-linear-to-b from-[#C1CFED] from-80% to-[#001032D9] w-full  p-8 lg:p-10'>
        <div className='bg-[#001032] w-full '>
            <h1 className=' text-xl lg:text-5xl pt-7 lg:pt-15 font-semibold tracking-wide'>Before you close this tab <br/>
            picture next Monday</h1>
            <p className='text-lg leading-8 tracking-wider w-[90%] lg:w-[87%] mx-auto pt-6 lg:pt-10 font-extralight'>Your product page — finally done. Legal sorted. Pitch deck polished. You’re connecting with real investors and founders.And you are finally able to connect with a real audience without spending lacs on ads and expensive services.</p>
             <p className='text-lg p-2 pt-6 lg:pt-10 leading-6 tracking-wide font-extralight'>If that’s the kind of Monday you want, go ahead and set it up now.</p>
              <Link to="/login" > <button className='bg-white text-black font-bold p-3 px-10 lg:px-20 lg:mt-10 mt-10 my-15 rounded-sm'> GET IN</button></Link>
        </div>

     </div>
    </div>
  )
}

export default HomeSec7