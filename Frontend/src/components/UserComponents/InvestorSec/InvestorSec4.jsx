import React , { useState, useRef } from 'react'

const InvestorSec4 = () => {
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
           paragraph:"Artestor streamlines how we review andassess early-stage opportunities. Theplatform filters noise, organizes data, and delivers founder profiles that are actually investor-ready. ",
           designation:"Fund Manager,  ",
          company:"Nandini Sharma",
          color:"#002A30"
       },
       {
           paragraph:"The due diligence clarity here is far better than open networks. Every startup we evaluate arrives structured, verified, and aligned with our investment thesis. Artestor reduces our overhead and makes screening rounds far more efficient",
           designation:"Shruti M,",
          company:" Venture Partner",
           color:"#001032"
       },
       {
           paragraph:"We rely on Artestor to identify strongfounders earlier. The platform presents traction, financials, and milestones in a format built for investors, not noise. It’s become a reliable source of quality deal flow and long-term opportunities ",
           designation:"Kalyani P, ",
          company:"Angel Investor",
           color:"#616B80"
       },
     ]

     
     return (
      <div className='mt-15  ' > 
 
      <div className="relative">
       <div
         ref={scrollRef}
         onScroll={handleScroll}
         className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide ">
         {divElements.map((item, index) => (
           <div key={index} className="w-[38%] h-auto  shrink-0 snap-center  p-3    mx-2 text-white  ">
            <div className='flex flex-row  justify-center items-start w-full  gap-10  border border-[#00103280] 
            rounded-2xl shadow-lg' style={{backgroundColor: item.color}}>
              <div className='px-5 h-90 flex flex-col justify-between py-3'>
                <p className=' text-md leading-8 tracking-wider  '>{item.paragraph}</p>
             <div>
               <p className='text-lg pt-5  '>{item.designation}</p>
                 <p className='text-lg '>{item.company}</p>
             </div>
                 
              </div>
             <div className=' block' >
                 <div className='w-[180px] h-90 bg-[#D9D9D9] rounded-2xl'>
                 </div>
            </div>
             </div>
           </div>
         ))}
       </div>
    
     </div>
       
     </div>
     )
}

export default InvestorSec4
