import React , { useState, useRef, useEffect } from 'react'

const InvestorSec6 = () => {
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
             paragraph:"Investors seeking refined deal flow with founders who understand traction, numbers, and timelines",
             
            company:"Angel Investors",
           
         },
         {
             paragraph:"Micro-funds looking for structured pipeline access and investment-ready startups aligned to their thesis.",
            
             company:"Micro VCs",
           
         },
         {
             paragraph:"Firms evaluating founders with clear reporting, validated metrics, and transparent documentation.",
            
             company:"Venture Funds",
           
         },
            {
             paragraph:"Domain experts who want selective, high-quality, early-stage exposure without unnecessary noise.",
            
             company:"Strategic Investors",
           
         },
     
       ]

       const cards = [...divElements, ...divElements];

        useEffect(() => {
               const container = scrollRef.current
               if (!container) return
           
               let animationId
           
               const autoScroll = () => {
                 container.scrollLeft += 0.5
           
                 if (container.scrollLeft >= container.scrollWidth / 2) {
                   container.scrollLeft = 0
                 }
           
                 animationId = requestAnimationFrame(autoScroll)
               }
           
               animationId = requestAnimationFrame(autoScroll)
           
               return () => cancelAnimationFrame(animationId)
             }, [])

       return (
         <div className='lg:mt-8 lg:px-10 mt-16 px-3' >
        <h1 className='text-2xl lg:text-5xl text-[#001032] font-medium text-center lg:text-start'>Who is this platform for?</h1>
       <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-scroll scrollbar-hide lg:px-10 pt-8 gap-4 lg:gap-5 text-[#001032] ">
          {cards.map((item, index) => (
            <div key={index} className="w-full  lg:w-[30%] h-fit  shrink-0  lg:p-4  lg:mx-2   lg:shadow-none ">
             <div className=' w-full  lg:gap-10  border border-[#00103280] 
             lg:rounded-2xl shadow-lg rounded-sm lg:p-3  px-7 h-full min-h-[280px] flex flex-col justify-between'>
                <p className=' py-5 lg:py-0 text-[#001032B2] text-md lg:leading-9 tracking-wider leading-8 '>{item.paragraph}</p>
              <div className=' flex justify-between items-center ' >
                     <div className=' lg:text-xl text-md py-5 lg:py-0'>
                        <h1 className='text-md text-[#001032B2]'>{item.company}</h1>
                     </div>
                  <div className='flex justify-center items-center gap-3 '>
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
        
      </div>
         <div className='lg:text-center mt-10 '>
            <h1 className=' lg:bg-linear-to-r from-[#001032] lg:from-70% via-blue-[#001426] at-130% to-[#D8D8D8] 
            lg:text-white p-2 lg:px-10 w-fit lg:mx-auto rounded-3xl lg:text-sm text-lg hidden lg:block'>
                If your investment goals align with curated, high-quality opportunities, this portal is built for you.</h1>
                <h1 className=' lg:bg-linear-to-r from-[#001032] lg:from-70% via-blue-[#001426] at-130% to-[#D8D8D8] 
            lg:text-white p-2 lg:px-10 w-fit lg:mx-auto rounded-3xl lg:text-sm text-lg lg:hidden'>
                If your investment approach fits any of these lanes and you prefer clearer, higher-quality deal flow, this platform is built for you.

</h1>
                <p className='text-[#001032] mt-3  p-2 lg:text-md text-lg pb-15 lg:pb-0 hidden lg:block w-[40%] mx-auto' >And if you already invest in early-stage teams, you’ll find even stronger alignment here.</p>
                <p className='text-[#001032] mt-3  p-2 lg:text-md text-lg  pb-6 lg:hidden' >And if you’ve already invested in startups before — that makes your experience even more valuable here.</p>
         </div>
         <hr className='lg:hidden bg-[#00000033] '/>
      </div>
       )
}

export default InvestorSec6
