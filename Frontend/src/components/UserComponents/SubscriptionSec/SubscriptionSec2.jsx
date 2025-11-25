import React from 'react'

const SubscriptionSec2 = () => {
  return (
    <div className='lg:px-6 px-4 lg:my-25 my-14'>
        <div id='desktop' className='hidden lg:block px-10'>
             <div className='flex items-center justify-around  text-[#001032] text-xl'>
                <div className='border-2 border-[#002A30] py-4  rounded-full w-[15%] '>
                <h1 className='text-center'>Verified Client <br/> pipelines</h1>
             </div>
             <div className='h-21 w-0.5 bg-[#00103233]'></div>
              <div className='border-2 border-[#002A30] py-4  rounded-full w-[15%] '>
                <h1 className='text-center'>Admin-Controlled <br/> Payments</h1>
             </div>
             <div className='h-21 w-0.5 bg-[#00103233]'></div>
              <div className='border-2 border-[#002A30] py-4  rounded-full w-[15%] '>
                <h1 className='text-center'>Post-Sales <br/> Support</h1>
             </div>
             <div className='h-21 w-0.5 bg-[#00103233]'></div>
              <div className='border-2 border-[#002A30] py-4  rounded-full w-[15%] '>
                <h1 className='text-center'>Automated Client <br/> Matching</h1>
             </div>
             <div className='h-21 w-0.5 bg-[#00103233]'></div>
              <div className='border-2 border-[#002A30] py-4  rounded-full w-[15%] '>
                <h1 className='text-center'>Industry Experts <br/> Guidance</h1>
             </div>
             </div>
      
        </div>
        

        <div id='phone' className='lg:hidden'>
            <div className='grid  grid-cols-[1fr_auto_1fr] gap-2 gap-y-4 text-[#001032] place-items-center w-fit'>
                <div className='border-2 border-[#002A30] rounded-full p-2 px-4  text-center'>
                    <h1>Verified Client pipelines</h1>
                </div>

                <div className='h-15 w-0.5 bg-[#00103233] '></div>

                <div className='border-2 border-[#002A30] rounded-full p-2 px-4 text-center'>
                    <h1>Verified Client pipelines</h1>
                </div>

                <div className='border-t-2 border-[#00103233] w-17'>
                    <hr />
                </div>

                <div className='h-3 w-3 rounded-full border border-[#001032]'></div>

                <div>
                    <hr className='border-t-2 border-[#00103233] w-17' />
                </div>
               
               <div className='border-2 border-[#002A30] rounded-full p-2 px-4 text-center'>
                    <h1>Verified Client pipelines</h1>
                </div>

                <div className='h-15 w-0.5 bg-[#00103233]'></div>

                <div className='border-2 border-[#002A30] rounded-full p-2 px-4 text-center' >
                    <h1>Verified Client pipelines</h1>
                </div>

                 <div className="col-span-3 border-2 border-[#002A30] rounded-full p-2 mt-5 px-6 text-center">
      <h1>Verified Client <br/> pipelines</h1>
    </div>
            </div>


        </div>
    </div>
  )
}

export default SubscriptionSec2