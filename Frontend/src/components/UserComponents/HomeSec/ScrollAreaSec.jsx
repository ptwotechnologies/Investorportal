import React from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import img1 from "/homeSec2Img1.png"
import { Link } from "react-router-dom"
import { IoArrowForwardCircleSharp } from "react-icons/io5";


const ScrollAreaSec = () => {
  return (
    <div>
        <ScrollArea className="w-full rounded-sm ">
                  <div className="flex w-max justify-center items-center">
                     <div className='flex justify-start items-center  px-3' >
                        <div className=' w-[15%] '>
                        <hr className='border-t border-gray-500 pb-8 w-[80%] '/>
                        <h3 className='text-md pb-2'>Startups</h3>
                        <img src={img1} alt="" className='rounded-sm w-[85%] h-[200px]' />
                         <Link to="/"><IoArrowForwardCircleSharp size={20} className='relative bottom-6 left-24  text-[#B5B6BA] border-2 border-white rounded-full' /></Link>
                        <p className=' text-sm leading-6 tracking-wider w-[90%] mb-10 font-extralight h-22'>You’re building something real and ready to scale</p>
                       
                     </div>
                      <div className=' w-[15%]'>
                        <hr className='border-t border-gray-500 pb-8 w-[80%] '/>
                        <h3 className='text-md pb-2'>Investors</h3>
                        <img src={img1} alt="" className='rounded-sm w-[85%] h-[200px]' />
                         <Link to="/"><IoArrowForwardCircleSharp size={20} className='relative bottom-6 left-24  text-[#B5B6BA] border-2 border-white rounded-full' /></Link>
                        <p className=' text-sm leading-6 tracking-wider w-[90%] mb-10 font-extralight h-22'>You seek refined, investment-ready startup in your space</p>
                     </div>
                      <div className=' w-[15%]'>
                        <hr className='border-t border-gray-500 pb-8 w-[80%] '/>
                        <h3 className='text-md pb-2'>Service Professionals</h3>
                        <img src={img1} alt="" className='rounded-sm w-[85%] h-[200px]' />
                         <Link to="/"><IoArrowForwardCircleSharp size={20} className='relative bottom-6 left-24  text-[#B5B6BA] border-2 border-white rounded-full' /></Link>
                        <p className=' text-sm leading-6 tracking-wider w-[90%] mb-10 font-extralight h-22'>You want genuine startup leads without paid ads</p>
                     </div>
                     </div>
       
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
    </div>
  )
}

export default ScrollAreaSec