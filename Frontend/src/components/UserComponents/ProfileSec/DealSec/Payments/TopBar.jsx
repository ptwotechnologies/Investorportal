import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePrivateConnectivity } from "react-icons/md";

const TopBar = () => {
  return (
     <div className='bg-white px-6 py-6' >
                <div id='top' className='flex items-start justify-between w-full '>
                    <div className='w-[40%] ' > 
                        <h1 className='text-xl font-semibold'>Payments</h1>
                        <p className='text-sm'>Track transaction, escrow funds and releases.</p>
        
                    </div>
                    <div className='flex items-center gap-4  '>
                         <div className='flex items-center border border-[#D9D9D9] gap-2  rounded-md h-10 px-2'>
                            <CiSearch size={25}  />
                         <input type="text" name="" id="" placeholder='Search by deal, startup or professional' className=' outline-none w-80 ' />
                         <button className='px-4 border-l border-[#D9D9D9] h-full'>All Dates</button>
                         </div>
                      <div className='flex items-center gap-2 bg-[#9588E5] text-white p-2 px-3 rounded-md'>
                        
                        <button>Export CSV</button>
        
                      </div>
        
                    </div>
        
                </div>
        
        
                <div id='bottom' className='flex items-center justify-around gap-4 mt-10 '>
                    <div className='bg-[#EDEFFD] shadow-md p-2 rounded-md w-full py-3 px-3'>
                        <div className='flex items-center gap-2'>
                           <MdOutlinePrivateConnectivity size={25}/>
                           <h1 className='text-md'>Total Ongoing Value</h1>
                        </div>
                        <p className='mt-2 text-3xl font-bold'>21</p>
                        <div>
        
                        </div>
        
                    </div>
        
        
                   <div className='bg-[#F0E6FD] shadow-md p-2 rounded-md w-full py-3 px-3'>
                        <div className='flex items-center gap-2'>
                           <MdOutlinePrivateConnectivity size={25} />
                           <h1 className='text-md'>Escrowed Funds</h1>
                        </div>
                        <p className='mt-2 text-3xl font-bold'>5</p>
                        <div>
        
                        </div>
        
                    </div>
                    <div className='bg-[#FCF3EC] shadow-md p-2 rounded-md w-full py-3 px-3'>
                        <div className='flex items-center gap-2'>
                           <MdOutlinePrivateConnectivity size={25} />
                           <h1 className='text-md'>Pending Releases</h1>
                        </div>
                        <p className='mt-2 text-3xl font-bold'>2</p>
                        <div>
        
                        </div>
        
                    </div>
                    <div className='bg-[#ECF3F3] shadow-md p-2 rounded-md w-full py-3 px-3'>
                        <div className='flex items-center gap-2 '>
                           <MdOutlinePrivateConnectivity size={25}/>
                           <h1 className='text-md'>Released This Month</h1>
                        </div>
                        <p className='mt-2 text-3xl font-bold'>325k</p>
                        <div>
        
                        </div>
        
                    </div>
        
                </div>
              
            </div>
  )
}

export default TopBar
