import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePrivateConnectivity } from "react-icons/md";

const TopBar = () => {
  return (
     <div className='bg-white px-6 py-6' >
         <div id='top' className='flex items-start justify-between w-full '>
             <div className='w-[40%] ' > 
                 <h1 className='text-xl font-semibold'>Disputes</h1>
                 <p className='text-sm'>Manage and resolve conflicts between deal participants</p>
 
             </div>
             <div className='flex items-center gap-4  '>
                  <div className='flex items-center border border-[#D9D9D9] gap-2  rounded-md h-11 px-2'>
                     <CiSearch size={25}  />
                  <input type="text" name="" id="" placeholder='Search by deal or party ' className=' outline-none w-60 ' />
                  <button className='px-3 border-l border-[#D9D9D9] h-full'>All Status</button>
                  <button className='px-4 border-l border-[#D9D9D9] h-full'>Newest</button>
                  </div>
               <div className='flex items-center gap-2 bg-[#C65869] text-white p-2 px-3 rounded-md'>
                 <FaPlus />
                 <button>Rate Dispute</button>
 
               </div>
 
             </div>
 
         </div>
 
 
         <div id='bottom' className='flex items-center justify-around gap-4 mt-10 '>
             <div className='bg-[#FBEDEF] shadow-md p-2 rounded-md w-full py-3 px-3'>
                 <div className='flex items-center gap-2'>
                    <MdOutlinePrivateConnectivity size={25}/>
                    <h1 className='text-md '>Open Cases</h1>
                 </div>
                 <p className='mt-2 text-3xl font-bold'>16</p>
                 <div>
 
                 </div>
 
             </div>
 
 
            <div className='bg-[#EDE8FD] shadow-md p-2 rounded-md w-full py-3 px-3'>
                 <div className='flex items-center gap-2'>
                    <MdOutlinePrivateConnectivity size={25} />
                    <h1 className='text-md'>Under Review</h1>
                 </div>
                 <p className='mt-2 text-3xl font-bold'>4</p>
                 <div>
 
                 </div>
 
             </div>
             <div className='bg-[#F6E8F9] shadow-md p-2 rounded-md w-full py-3 px-3'>
                 <div className='flex items-center gap-2'>
                    <MdOutlinePrivateConnectivity size={25} />
                    <h1 className='text-md'>Escalated</h1>
                 </div>
                 <p className='mt-2 text-3xl font-bold'>3</p>
                 <div>
 
                 </div>
 
             </div>
             <div className='bg-[#EDF0F5] shadow-md p-2 rounded-md w-full py-3 px-3'>
                 <div className='flex items-center gap-2 '>
                    <MdOutlinePrivateConnectivity size={25}/>
                    <h1 className='text-md'>Resolved</h1>
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
