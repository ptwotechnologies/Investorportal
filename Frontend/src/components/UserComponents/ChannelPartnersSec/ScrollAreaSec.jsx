import React from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom"
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const ScrollAreaSec = ({ onRoleSelect }) => {
    return (
    <div>
     <ScrollArea className="w-full rounded-xl">
  <div className="flex  px-2">
    
    {/* Card 1 */}
    <div className="w-68 shrink-0  pr-3 text-[#001032] cursor-pointer" onClick={() => onRoleSelect("Startups")}>
      <hr className='border-t border-[#FFFFFF33] pb-4 w-[98%]'/>
      <h3 className='text-sm pb-2 '>Startups</h3>
      <div className='rounded-sm  h-70 bg-gray-200'> 
      
        </div>
     <IoArrowForwardCircleSharp size={32} className='relative bottom-10 left-55 text-[#B5B6BA] border-2 border-white rounded-full' />
      {/* <p className='text-xs leading-5 tracking-wide w-[90%] mb-10  font-extralight'>You’re building something real and ready to scale</p> */}
    </div>

    {/* Card 2 */}
    <div className="w-68  pr-3 shrink-0 text-[#001032] cursor-pointer" onClick={() => onRoleSelect("Investors")}>
      <hr className='border-t border-[#FFFFFF33] pb-4 w-[98%]'/>
      <h3 className='text-sm pb-2 '>Investors</h3>
      <div className='rounded-sm object-cover h-70 bg-gray-200'>  
             
       </div>
       <IoArrowForwardCircleSharp size={32} className='relative bottom-10 left-55 text-[#B5B6BA] border-2 border-white rounded-full' /> 
      
      {/* <p className='text-xs leading-5 tracking-wide w-[90%] mb-10 font-extralight'>You seek refined, investment-ready startup in your space</p> */}
    </div>

    {/* Card 3 */}
    <div className="w-68 pr-3 shrink-0 text-[#001032] cursor-pointer" onClick={() => onRoleSelect("Service Professionals")}>
      <hr className='border-t border-[#FFFFFF33] pb-4 w-[98%]'/>
      <h3 className='text-sm pb-2 '>Service Professionals</h3>
      <div className='rounded-sm object-cover  h-70 bg-gray-200'> 
         
                
          </div>
      <IoArrowForwardCircleSharp size={32} className='relative bottom-10 left-55 text-[#B5B6BA] border-2 border-white rounded-full' /> 
      {/* <p className='text-xs leading-5 tracking-wide w-[95%] mb-10  font-extralight'>You want genuine startup leads without paid ads</p> */}
    </div>

     {/* Card 4 */}
    {/* <div className="w-58 pr-3 shrink-0">
      <hr className='border-t border-[#FFFFFF33] pb-4 w-[98%]'/>
      <h3 className='text-sm pb-2 font-medium'>Channel Partners</h3>
      <Link to="/channelpartners"> <div className='rounded-sm object-cover  h-70 bg-gray-200'>   </div>
     <IoArrowForwardCircleSharp size={32} className='relative bottom-10 left-44 text-[#B5B6BA] border-2 border-white rounded-full' /></Link>
      <p className='text-xs leading-5 tracking-wide w-[80%] mb-10 relative bottom-6 font-extralight'>You want genuine startup leads without paid ads</p>
    </div> */}

  </div>

  <ScrollBar orientation="horizontal" />
</ScrollArea>

    </div>
  )
}

export default ScrollAreaSec
