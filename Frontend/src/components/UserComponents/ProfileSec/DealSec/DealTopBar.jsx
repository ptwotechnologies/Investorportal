import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePrivateConnectivity } from "react-icons/md";

const DealTopBar = () => {
  return (
    <div className='bg-white px-6 py-6' >
        <div id='top' className='flex items-start justify-between w-full '>
            <div className='w-[40%] ' > 
                <h1 className='text-xl font-semibold'>Active Deals</h1>
                <p className='text-sm'>Manage all ongoing projects and work progress</p>

            </div>
            <div className='flex items-center gap-4  '>
                 <div className='flex items-center border border-[#D9D9D9] gap-2  rounded-md h-12 px-2'>
                    <CiSearch size={25}  />
                 <input type="text" name="" id="" placeholder='Search by projects, milestones or startups' className=' outline-none w-80 ' />
                 <button className='px-4 border-l border-[#D9D9D9] h-full'>All Status</button>
                 </div>
              <div className='flex items-center gap-2 bg-[#293456] text-white p-2 px-3 rounded-md'>
                <FaPlus />
                <button>Create Deal</button>

              </div>

            </div>

        </div>


        <div id='bottom' className='flex items-center justify-around gap-4 mt-10 '>
            <div className='bg-[#D8E1F0] shadow-md p-2 rounded-md w-full py-3 px-3'>
                <div className='flex items-center gap-2'>
                   <MdOutlinePrivateConnectivity size={25}/>
                   <h1 className='text-md'>Active Deals</h1>
                </div>
                <p className='mt-2 text-3xl font-bold'>16</p>
                <div>

                </div>

            </div>


           <div className='bg-[#E2DAF3] shadow-md p-2 rounded-md w-full py-3 px-3'>
                <div className='flex items-center gap-2'>
                   <MdOutlinePrivateConnectivity size={25} />
                   <h1 className='text-md'>Total Ongoing Value</h1>
                </div>
                <p className='mt-2 text-3xl font-bold'>4</p>
                <div>

                </div>

            </div>
            <div className='bg-[#EFDBD9] shadow-md p-2 rounded-md w-full py-3 px-3'>
                <div className='flex items-center gap-2'>
                   <MdOutlinePrivateConnectivity size={25} />
                   <h1 className='text-md'>Pending Payments</h1>
                </div>
                <p className='mt-2 text-3xl font-bold'>3</p>
                <div>

                </div>

            </div>
            <div className='bg-[#D7EBE4] shadow-md p-2 rounded-md w-full py-3 px-3'>
                <div className='flex items-center gap-2 '>
                   <MdOutlinePrivateConnectivity size={25}/>
                   <h1 className='text-md'>Due this week</h1>
                </div>
                <p className='mt-2 text-3xl font-bold'>325k</p>
                <div>

                </div>

            </div>

        </div>
      
    </div>
  )
}

export default DealTopBar
