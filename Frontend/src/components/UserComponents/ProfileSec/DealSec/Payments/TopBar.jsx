import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePrivateConnectivity } from "react-icons/md";

const TopBar = () => {
  return (
     <div className='bg-white px-3 lg:px-6 py-6' >
                <div id='top' className='flex flex-col lg:flex-row items-start justify-between w-full '>
                    <div className='lg:w-[40%] w-full' > 
                        <h1 className='text-xl font-semibold'>Payments</h1>
                        <p className='text-sm'>Track transaction, escrow funds and releases.</p>
        
                    </div>
                    <div className='lg:flex items-center gap-4 hidden '>
                         <div className='flex items-center border border-[#D9D9D9] gap-2  rounded-md h-10 px-2'>
                            <CiSearch size={25}  />
                         <input type="text" name="" id="" placeholder='Search by deal, startup or professional' className=' outline-none w-80 ' />
                         <button className='px-4 border-l border-[#D9D9D9] h-full'>All Dates</button>
                         </div>
                      <div className='flex items-center gap-2 bg-[#9588E5] text-white p-2 px-3 rounded-md'>
                        
                        <button>Export CSV</button>
        
                      </div>
        
                    </div>

                    <div className='flex items-center gap-2  lg:hidden mt-4 w-full'>
                         <div className='flex items-center border border-[#D9D9D9] gap-2  rounded-md  px-2 w-full'>
                            <CiSearch size={25}  />
                         <input type="text" name="" id="" placeholder='Search ' className=' outline-none w-full ' />
                         <button className='px-1 py-2 border-l border-[#D9D9D9] h-full text-xs lg:text-[16px] w-22 '>All Dates</button>
                         </div>
                      <div className='flex items-center gap-2 bg-[#9588E5] text-white p-2 px-3 rounded-md text-xs lg:text-[16px] w-28 '>
                        
                        <button>Export CSV</button>
        
                      </div>
        
                    </div>
        
                </div>
        
        
                <div id='bottom' className='grid grid-cols-2 lg:flex items-center justify-around gap-4 lg:mt-10 mt-4 '>
                    <div className='bg-[#EDEFFD] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-2'>
                        <div className='flex items-center gap-2'>
                           <MdOutlinePrivateConnectivity size={25}/>
                           <h1 className='lg:text-[16px] text-xs'>Total Ongoing Value</h1>
                        </div>
                        <p className='mt-2 lg:text-3xl text-2xl font-bold'>21</p>
                        <div>
        
                        </div>
        
                    </div>
        
        
                   <div className='bg-[#F0E6FD] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-2'>
                        <div className='flex items-center gap-2'>
                           <MdOutlinePrivateConnectivity size={25} />
                           <h1 className='lg:text-[16px] text-xs'>Escrowed Funds</h1>
                        </div>
                        <p className='mt-2 lg:text-3xl text-2xl font-bold'>5</p>
                        <div>
        
                        </div>
        
                    </div>
                    <div className='bg-[#FCF3EC] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-2'>
                        <div className='flex items-center gap-2'>
                           <MdOutlinePrivateConnectivity size={25} />
                           <h1 className='lg:text-[16px] text-xs'>Pending Releases</h1>
                        </div>
                        <p className='mt-2 lg:text-3xl text-2xl font-bold'>2</p>
                        <div>
        
                        </div>
        
                    </div>
                    <div className='bg-[#ECF3F3] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-2'>
                        <div className='flex items-center gap-2 '>
                           <MdOutlinePrivateConnectivity size={25}/>
                           <h1 className='lg:text-[16px] text-xs'>Released This Month</h1>
                        </div>
                        <p className='mt-2 lg:text-3xl text-2xl font-bold'>325k</p>
                        <div>
        
                        </div>
        
                    </div>
        
                </div>
              
            </div>
  )
}

export default TopBar
