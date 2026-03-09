import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePrivateConnectivity } from "react-icons/md";


const TopBar = () => {
   return (
       <div className='bg-white px-3 lg:px-6 py-6' >
           <div id='top' className='flex flex-col lg:flex-row items-start justify-between w-full '>
               <div className='lg:w-[40%] w-full' > 
                   <h1 className='text-xl font-semibold'>Negotiations</h1>
                   <p className='lg:text-sm text-xs'>Review and manage deal proposals before confirmation</p>
   
               </div>
               <div className='lg:flex items-center gap-4 hidden '>
                    <div className='flex items-center border border-[#D9D9D9] gap-2  rounded-md h-11 px-2'>
                       <CiSearch size={25}  />
                    <input type="text" name="" id="" placeholder='Search by startup or professional ' className=' outline-none w-80 ' />
                    <button className='px-4 border-l border-[#D9D9D9] h-full'>All Status</button>
                    </div>
                 <div className='flex items-center gap-2 bg-[#9A86E8] text-white p-2 px-3 rounded-md'>
                   <FaPlus />
                   <button>Create Proposal</button>
   
                 </div>
   
               </div>

               <div className='flex items-center gap-2 lg:hidden w-full mt-4'>
                    <div className='flex items-center border border-[#D9D9D9] gap-2  rounded-md  px-2 w-full'>
                       <CiSearch size={25}  />
                    <input type="text" name="" id="" placeholder='Search  ' className=' outline-none w-full ' />
                    <button className='px-1 py-2 border-l border-[#D9D9D9] h-full text-xs lg:text-[16px] w-25'>All Status</button>
                    </div>
                 <div className='flex items-center gap-1 bg-[#9A86E8] text-white p-2 px-2 rounded-md text-xs lg:text-[16px] w-45'>
                   <FaPlus />
                   <button>Create Proposal</button>
   
                 </div>
   
               </div>
   
           </div>
   
   
           <div id='bottom' className='grid grid-cols-2 lg:flex items-center justify-around gap-4 lg:mt-10 mt-4'>
               <div className='bg-[#F0E6FE] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-2'>
                   <div className='flex items-center gap-1'>
                      <MdOutlinePrivateConnectivity size={25}/>
                      <h1 className='lg:text-[16px] text-[10px] '>Open Proposals</h1>
                   </div>
                   <p className='mt-2 lg:text-3xl text-2xl font-bold'>16</p>
                   <div>
   
                   </div>
   
               </div>
   
   
              <div className='bg-[#EDEEFE] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-2'>
                   <div className='flex items-center gap-1'>
                      <MdOutlinePrivateConnectivity size={25} />
                      <h1 className='lg:text-[16px] text-[10px]'>Awaiting Your Response</h1>
                   </div>
                   <p className='mt-2 lg:text-3xl text-2xl font-bold'>4</p>
                   <div>
   
                   </div>
   
               </div>
               <div className='bg-[#FDEFE9] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-2'>
                   <div className='flex items-center gap-1'>
                      <MdOutlinePrivateConnectivity size={25} />
                      <h1 className='lg:text-[16px] text-[10px]'>Counter Offers</h1>
                   </div>
                   <p className='mt-2 lg:text-3xl text-2xl font-bold'>3</p>
                   <div>
   
                   </div>
   
               </div>
               <div className='bg-[#F9ECF9] shadow-md p-2 rounded-md w-full py-3 lg:px-3 px-2'>
                   <div className='flex items-center gap-1 '>
                      <MdOutlinePrivateConnectivity size={25}/>
                      <h1 className='lg:text-[16px] text-[10px]'>Expiring Soon</h1>
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
