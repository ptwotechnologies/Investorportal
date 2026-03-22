import React from 'react'

const SubscriptionSec2 = () => {
  return (
    <div className='lg:px-6 px-4 lg:my-25 my-14'>
        <div id='desktop' className='hidden lg:block px-10'>
             <div className='flex items-center justify-around  text-[#001032] text-xl'>
                <div className='border-2 border-[#002A30] py-4  rounded-full w-[15%] h-23 flex items-center justify-center'>
                <h1 className='text-center'>Priority Deal
     <br/> Access</h1>
             </div>
             <div className='h-21 w-0.5 bg-[#00103233]'></div>
              <div className='border-2 border-[#002A30] py-4  rounded-full w-[15%] h-23 flex items-center justify-center'>
                <h1 className='text-center'>Verified Network</h1>
             </div>
             <div className='h-21 w-0.5 bg-[#00103233]'></div>
              <div className='border-2 border-[#002A30] py-4  rounded-full w-[15%] h-23 flex items-center justify-center'>
                <h1 className='text-center'>Performance
      <br/> Insights</h1>
             </div>
             <div className='h-21 w-0.5 bg-[#00103233]'></div>
              <div className='border-2 border-[#002A30] py-4  rounded-full w-[15%] h-23  flex items-center justify-center'>
                <h1 className='text-center'>AI Matchmaking</h1>
             </div>
             <div className='h-21 w-0.5 bg-[#00103233]'></div>
              <div className='border-2 border-[#002A30] py-4  rounded-full w-[15%] h-23 flex items-center justify-center'>
                <h1 className='text-center'>Dedicated
  <br/> Support</h1>
             </div>
             </div>
      
        </div>
        

        <div id='phone' className='lg:hidden'>
            <div className='grid  grid-cols-[1fr_auto_1fr] gap-2 gap-y-4 text-[#001032] place-items-center w-fit'>
                <div className='border-2 border-[#002A30] rounded-full p-2 px-4 text-center h-17 flex items-center justify-center'>
                    <h1>AI Matchmaking</h1>
                </div>

                <div className='h-15 w-0.5 bg-[#00103233] '></div>

                <div className='border-2 border-[#002A30] rounded-full p-2 px-4 text-center h-17  flex items-center justify-center'>
                    <h1>Verified Network</h1>
                </div>

                <div className='border-t-2 border-[#00103233] w-17'>
                    <hr />
                </div>

                <div className='h-3 w-3 rounded-full border border-[#001032]'></div>

                <div>
                    <hr className='border-t-2 border-[#00103233] w-17' />
                </div>
               
               <div className='border-2 border-[#002A30] rounded-full p-2 px-4 text-center h-17 flex items-center justify-center'>
                    <h1>Priority Deal Access</h1>
                </div>

                <div className='h-15 w-0.5 bg-[#00103233]'></div>

                <div className='border-2 border-[#002A30] rounded-full p-2 px-4 text-center h-17 flex items-center justify-center' >
                    <h1>Performance Insights</h1>
                </div>

                 <div className="col-span-3 mx-auto border-2 border-[#002A30] rounded-full p-2 mt-5 px-6 text-center h-17 flex items-center justify-center">
                    <h1>Dedicated Support</h1>
                </div>
            </div>


        </div>
    </div>
  )
}

export default SubscriptionSec2