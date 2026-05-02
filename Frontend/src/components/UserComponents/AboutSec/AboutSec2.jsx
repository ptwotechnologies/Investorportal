import React from 'react'

function AboutSec2() {
  return (
    <div className='lg:bg-[#001032] bg-[#00103247] text-[#000000] lg:text-[white] lg:mt-30 mt-15 lg:rounded-4xl lg:p-10 pb-3'>
      <div className="max-w-[1500px] mx-auto w-full px-4 lg:px-0">
        <div className='flex flex-col lg:flex-row justify-between items-center gap-28'>
          <div id='left' className=' lg:w-[60%] '>
            <div className='w-10 h-10 bg-[#001032]  ml-5 mt-5 lg:hidden'>
            </div>
            <h1 className='lg:hidden text-[#001032] font-medium text-2xl m-5 my-4'>Our Mission</h1>
            <button className=' lg:bg-[#FFFFFF]  lg:text-[#001032] bg-[#001032] text-[#FFFFFF]  lg:font-medium text-3xl lg:leading-9 leading-8 tracking-wider lg:w-[70%] text-start p-5 lg:mb-14 lg:rounded-lg '>
              A mission to simplify growth for every startup</button>
            <p className='lg:text-xl text-md leading-8 tracking-wide lg:py-5 p-5 lg:font-light'>Our mission is to bring everything that helps a startup grow into one space, while connecting the right people with the right support at the right time.</p>
            <p className='text-md lg:text-xl leading-8 tracking-wider lg:py-7 lg:p-5 px-5 lg:font-light'>We created this portal to make the startup journey less overwhelming and more focused.</p>
            <p className='text-md lg:text-xl leading-8 tracking-wider lg:p-5 p-3 px-5 lg:font-light'>Most founders start with big ideas but end up spending most of their time navigating scattered services, chasing investors, and solving problems that shouldn’t be this hard in the first place.</p>
          </div>
          <div id='right' className=' w-[40%] hidden lg:block  '>
            <div className='w-[90%] h-[380px] bg-[#D8D8D8] rounded-4xl ml-5 mt-5'>
              <img src="/aboutpage2.png" alt="" className='w-full h-full rounded-4xl ' />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-5 h-5 rounded-full relative top-4 left-[90%] hidden lg:block ">
      </div>
    </div>
  )
}

export default AboutSec2