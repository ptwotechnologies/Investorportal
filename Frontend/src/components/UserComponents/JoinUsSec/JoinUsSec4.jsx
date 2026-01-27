
import React , { useState, useRef } from 'react'

const JoinUsSec4 = () => {
  const scrollRef = useRef(null);
           const [activeIndex, setActiveIndex] = useState(0);
         
           const handleScroll = () => {
             const scrollWidth = scrollRef.current.scrollWidth;
             const clientWidth = scrollRef.current.clientWidth;
             const scrollLeft = scrollRef.current.scrollLeft;
             const index = Math.round(scrollLeft / clientWidth);
             setActiveIndex(index);
           };
         
           const divElements = [
             {
                 paragraph:"UI/UX designers and content creators who want clear briefs and decision-ready clients",
                company:"Design & Branding",
               
             },
             {
                 paragraph:"UI/UX designers and content creators who want clear briefs and decision-ready clients",
                company:"Design & Branding",
               
             },
             {
                 paragraph:"UI/UX designers and content creators who want clear briefs and decision-ready clients",
                company:"Design & Branding",
               
             },
                {
                 paragraph:"UI/UX designers and content creators who want clear briefs and decision-ready clients",
                company:"Design & Branding",
               
             },
         
           ]
  return (
     <div className='lg:mt-8 lg:px-10 mt-16 px-3' >
           <h1 className='text-[27px] lg:text-5xl text-[#001032] font-bold text-center lg:text-start'>Who is this platform for?</h1>
          <div className="relative">
           <div
             ref={scrollRef}
             onScroll={handleScroll}
             className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide lg:px-23 pt-8 gap-2 lg:gap-10 text-[#001032] ">
             {divElements.map((item, index) => (
               <div key={index} className="w-full  lg:w-[25%] h-fit  shrink-0 snap-center lg:p-4  lg:mx-2  shadow-2xl lg:shadow-none ">
                <div className=' w-full h-full gap-10  border border-[#00103280] 
                lg:rounded-2xl shadow-lg lg:p-3 p-4 '>
                   <p className=' text-sm leading-6 tracking-wider '>{item.paragraph}</p>
                 <div className=' flex justify-between items-center lg:mt-25 mt-28' >
                        <div className='font-semibold text-lg'>
                           <h1>{item.company}</h1>
                        </div>
                     <div className='flex justify-center items-center gap-5'>
                       <div className='w-0.5 h-10 bg-[#D9D9D9] '>
                     </div>
                       <div className='w-[50px] h-[50px]  rounded-full lg:bg-[#001032] bg-[#00000033]'>
                     </div>
                     
                     </div>
                </div>
                 </div>
               </div>
             ))}
           </div>
           <div className="flex justify-center mt-2">
             {divElements.map((item, index) => (
               <div
                 key={index}
                 className={`w-2 h-2 rounded-full mx-1 ${
                   activeIndex === index ? 'bg-gray-600' : 'bg-gray-300'
                 }`}
               />
             ))}
           </div>
         </div>
            <div className='lg:text-center mt-10 hidden lg:block '>
               <h1 className=' lg:bg-linear-to-r from-[#001032] lg:from-70% via-blue-[#001426] at-130% to-[#D8D8D8] 
               lg:text-white p-2 lg:px-4 w-fit lg:mx-auto rounded-3xl lg:text-sm text-lg'>
                   If your work fits any of these lanes and you want a quieter, more direct way to find serious clients, this portal is for you</h1>
                   <p className='text-[#001032] mt-3 font-medium p-2 lg:text-sm text-lg pb-15 lg:pb-0' >And if you’ve worked with startups before? That’s even better!</p>
            </div>
            
         </div>
  )
}

export default JoinUsSec4
