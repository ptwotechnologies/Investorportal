import React from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import img1 from "/homeSec2Img1.png"
import { Link } from "react-router-dom"
import { IoArrowForwardCircleSharp } from "react-icons/io5";


const ScrollAreaSec = () => {
  return (
    <div>
     <ScrollArea className="w-full rounded-xl">
  <div className="flex  px-2">
    
    {/* Card 1 */}
    <div className="w-58 shrink-0  pr-3">
      <hr className='border-t border-[#FFFFFF33] pb-4 w-[98%]'/>
      <h3 className='text-sm pb-2 font-medium'>Startups</h3>
     <Link to="/startup"> <div className='rounded-sm  h-70 bg-gray-200'>   </div>
      <IoArrowForwardCircleSharp size={32} className='relative bottom-10 left-44 text-[#B5B6BA] border-2 border-white rounded-full' /></Link>
      <p className='text-xs leading-5 tracking-wide w-[80%] mb-10 relative bottom-6 font-extralight'>You’re building something real and ready to scale</p>
    </div>

    {/* Card 2 */}
    <div className="w-58  pr-3 shrink-0">
      <hr className='border-t border-[#FFFFFF33] pb-4 w-[98%]'/>
      <h3 className='text-sm pb-2 font-medium'>Investors</h3>
     <Link to="/investor"> <div className='rounded-sm object-cover h-70 bg-gray-200'>   </div>
      <IoArrowForwardCircleSharp size={32} className='relative bottom-10 left-44 text-[#B5B6BA] border-2 border-white rounded-full' /></Link>
      <p className='text-xs leading-5 tracking-wide w-[80%] mb-10 relative bottom-6 font-extralight'>You seek refined, investment-ready startup in your space</p>
    </div>

    {/* Card 3 */}
    <div className="w-58 pr-3 shrink-0">
      <hr className='border-t border-[#FFFFFF33] pb-4 w-[98%]'/>
      <h3 className='text-sm pb-2 font-medium'>Service Professionals</h3>
      <Link to="/serviceprofessional"> <div className='rounded-sm object-cover  h-70 bg-gray-200'>   </div>
     <IoArrowForwardCircleSharp size={32} className='relative bottom-10 left-44 text-[#B5B6BA] border-2 border-white rounded-full' /></Link>
      <p className='text-xs leading-5 tracking-wide w-[80%] mb-10 relative bottom-6 font-extralight'>You want genuine startup leads without paid ads</p>
    </div>

     {/* Card 4 */}
    <div className="w-58 pr-3 shrink-0">
      <hr className='border-t border-[#FFFFFF33] pb-4 w-[98%]'/>
      <h3 className='text-sm pb-2 font-medium'>Channel Partners</h3>
      <Link to="/channelpartners"> <div className='rounded-sm object-cover  h-70 bg-gray-200'>   </div>
     <IoArrowForwardCircleSharp size={32} className='relative bottom-10 left-44 text-[#B5B6BA] border-2 border-white rounded-full' /></Link>
      <p className='text-xs leading-5 tracking-wide w-[80%] mb-10 relative bottom-6 font-extralight'>You want genuine startup leads without paid ads</p>
    </div>

  </div>

  <ScrollBar orientation="horizontal" />
</ScrollArea>


    </div>
  )
}

export default ScrollAreaSec