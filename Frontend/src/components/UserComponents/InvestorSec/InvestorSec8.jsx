import React , { useState, useRef, useEffect } from 'react'

const InvestorSec8 = () => {
  const scrollRef = useRef(null);
      const [activeIndex, setActiveIndex] = useState(0);
    
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
     
       const handleScroll = () => {
         const container = scrollRef.current
         const index = Math.round(
           container.scrollLeft / container.clientWidth
         )
         setActiveIndex(index % divElements.length)
       }
     
      const divElements = [
        {
            paragraph:"Artestor helped streamline our funnel. We met founders who were clear, prepared, and genuinely ready for investment talks",
            name:"Tapan Verma  ",
           company:"Kapinort ventures",
        },
        {
            paragraph:"The quality of deal flow is impressive. We saved weeks of filtering and focused on startups with real traction and direction",
            name:"Sanjay Kumar ",
            company:"Kapinort Ventures",
        },
        {
            paragraph:"The quality of deal flow is impressive. We saved weeks of filtering and focused on startups with real traction and direction",
             name:"Vivek T ",
            company:"Company Name ",
            companyName:"Startup"
        },
    
      ]

       const data = [...divElements, ...divElements]

      return (
         <div className='mt-15  ' >
  
       <div className="relative">
        <h1 className='text-5xl font-semibold px-10 pb-10 text-[#001032]'>Trusted by investors</h1>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-scroll  scrollbar-hide lg:ml-10">
          {data.map((item, index) => (
            <div key={index} className="w-full lg:w-[42%]   shrink-0 snap-center  p-4 mx-2 ">
             <div className='flex flex-col lg:flex-row  justify-center items-start w-full h-full gap-10 lg:gap-10 p-5 lg:p-7 border border-[#00103280] 
             rounded-sm shadow-lg'>
               <p className='text-[#001032B5] text-md leading-8 tracking-wider'>{item.paragraph}</p>
              <div className='lg:hidden flex justify-between items-center gap-20  w-full'>
                  <div className=' '>
                    <p className='text-sm pt-2 text-[#001032B5]'>{item.name}</p>
                  <p className='text-sm  text-[#001032B5]'>{item.companyName}</p>
                  <p className='text-sm  text-[#001032B5]'>growing early-stage teams</p>
                  </div>
                  <div className='flex justify-center items-center gap-5 '>
                     <div className="border-l h-20 border-[#00000033]  "></div>
                  <div className='w-[60px] h-[100px] bg-[#002A30] rounded-4xl'>
                  </div>
                  </div>
             </div>
              <div className='hidden lg:block' >
                  <div className='w-[180px] h-[200px] bg-[#D9D9D9] rounded-sm'>
                  </div>
                  <p className='text-md pt-4 text-[#001032B5]'>{item.name}</p>
                  <p className='text-md  text-[#001032B5]'>{item.company}</p>
                  <p className='text-md text-[#001032B5] pb-4'>{item.companyName}</p>
             </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
        
      </div>
      )
}

export default InvestorSec8
