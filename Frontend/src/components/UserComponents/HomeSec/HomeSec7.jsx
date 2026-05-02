import React from 'react'
import { Link } from 'react-router-dom'

const HomeSec7 = () => {
  return (
    <div className=' p-4 lg:p-15 lg:px-40 text-white text-center  bg-[#F9972A1A] '>
      <div className="max-w-[1500px] mx-auto w-full">
        <div className='bg-linear-to-b from-[#C1CFED] from-80% to-[#001032D9] w-full  p-8 lg:p-9 '>
          <div className='bg-[#001032] w-full '>
            <h1 className=' text-xl lg:text-5xl pt-7 lg:pt-15  tracking-wide'>Before you close this tab <br />
              picture next Monday</h1>
            <p className='lg:text-lg  text-md leading-7 tracking-wider w-[90%] lg:w-[89%] mx-auto pt-6 lg:pt-5 font-extralight'>Your product page — finally done. Legal sorted. Pitch deck polished. You’re connecting with real investors and founders.And you are finally able to connect with a real audience without spending lacs on ads and expensive services.</p>
            <p className='lg:text-lg  text-md p-2 pt-6 lg:pt-12 leading-6 tracking-wide font-extralight'>If that’s the kind of Monday you want, go ahead and set it up now.</p>
            <Link to="/login" > <button className='bg-white text-black  p-3 px-10 lg:px-20 my-7 rounded-sm'> GET IN</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSec7