import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePrivateConnectivity } from "react-icons/md";

const DealTopBar = () => {
  return (
    <div className='bg-white px-3 lg:px-6 py-6' >
        <div id='top' className='flex flex-col lg:flex-row items-start justify-between w-full '>
            <div className='lg:w-[40%] w-full' > 
                <h1 className='lg:text-xl  text-2xl font-semibold'>Active Deals</h1>
                <p className='lg:text-sm text-xs'>Manage all ongoing partnerships and work progress</p>

            </div>
            <div className='lg:flex items-center gap-4 hidden  '>
                 <div className='flex items-center border border-[#D9D9D9] gap-2  rounded-md h-11 px-2'>
                    <CiSearch size={25}  />
                 <input type="text" name="" id="" placeholder='Search by startup or professional ' className=' outline-none lg:w-80 ' />
                 <button className='px-4 border-l border-[#D9D9D9] h-full'>All Status</button>
                 </div>
              <div className='flex items-center gap-2 bg-[#7F6DD4] text-white p-2 px-3 rounded-md'>
                <FaPlus />
                <button>Create Deal</button>

              </div>

            </div>

             <div className='flex items-center gap-2 lg:hidden mt-4 w-full'>
                 <div className='flex items-center border border-[#D9D9D9] gap-2  rounded-md  px-1 w-full'>
                    <CiSearch size={25}  />
                 <input type="text" name="" id="" placeholder='Search  ' className=' outline-none w-full ' />
                 <button className='p-2 px-1 text-xs border-l border-[#D9D9D9] w-25 '>All Status</button>
                 </div>
              <div className='flex items-center gap-1 bg-[#7F6DD4] text-white p-2 rounded-md w-35'>
                <FaPlus />
                <button className='text-xs'>Create Deal</button>

              </div>

            </div>

        </div>


        <div id='bottom' className=' grid grid-cols-2 lg:flex items-center justify-around gap-4 mt-4 lg:mt-10 '>
            <div className='bg-[#EDF0FE] shadow-md p-2 rounded-md w-full py-3 px-2 lg:px-3'>
                <div className='flex items-center gap-2'>
                   <MdOutlinePrivateConnectivity size={25}/>
                   <h1 className='lg:text-md text-xs '>Active Deals</h1>
                </div>
                <p className='mt-2 text-2xl lg:text-3xl font-bold'>16</p>
                <div>

                </div>

            </div>


           <div className='bg-[#F2E7FC] shadow-md p-2 rounded-md w-full py-3 px-2 lg:px-3'>
                <div className='flex items-center gap-2'>
                   <MdOutlinePrivateConnectivity size={25} />
                   <h1 className='lg:text-md text-xs'>Total Ongoing Value</h1>
                </div>
                <p className='mt-2 text-2xl lg:text-3xl font-bold'>4</p>
                <div>

                </div>

            </div>
            <div className='bg-[#FDF4E3] shadow-md p-2 rounded-md w-full py-3 px-2 lg:px-3'>
                <div className='flex items-center gap-2'>
                   <MdOutlinePrivateConnectivity size={25} />
                   <h1 className='lg:text-md text-xs'>Pending Payments</h1>
                </div>
                <p className='mt-2 text-2xl lg:text-3xl font-bold'>3</p>
                <div>

                </div>

            </div>
            <div className='bg-[#FBEFFB] shadow-md p-2 rounded-md w-full py-3 px-2 lg:px-3'>
                <div className='flex items-center gap-2 '>
                   <MdOutlinePrivateConnectivity size={25}/>
                   <h1 className='lg:text-md text-xs'>Due this week</h1>
                </div>
                <p className='mt-2 text-2xl lg:text-3xl font-bold'>325k</p>
                <div>

                </div>

            </div>

        </div>
      
    </div>
  )
}

export default DealTopBar
