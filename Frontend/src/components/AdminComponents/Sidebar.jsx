import React from 'react'

const Sidebar = () => {
  return (
    <div className='h-[78vh] w-52 bg-white rounded-2xl px-2 py-5 text-white font-medium text-lg fixed'>
      <div className='bg-[#C4C4C4] py-2  text-center rounded-3xl '>
       <h1>Startup</h1>
      </div>
      <div className='bg-[#001426] py-2  text-center rounded-3xl my-3'>
        <h1>Investor</h1>
      </div>
      <div className='bg-[#001426] py-2  text-center rounded-3xl '>
        <h1>
          Service Professional
        </h1>
      </div>
    </div>
  )
}

export default Sidebar
