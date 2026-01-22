import React , { useState, useRef } from 'react'

const ServiceProfessionalSec4 = () => {
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
         paragraph:"“We started getting briefs that fit our niche within days. No more chasing, just meaningful work and timely payments”",
         name:"Designation ",
        company:"Product Designer",
        color:"#002A30"
     },
     {
         paragraph:"“Artestor cut our onboarding friction — clear scopes, upfront budgets, and founders who actually know what they want”",
         name:"Sharanya ",
        company:"Growth Consultant",
         color:"#001032"
     },
     {
         paragraph:"“Artestor cut our onboarding friction — clear scopes, upfront budgets, and founders who actually know what they want”",
         name:"Sharanya ",
        company:"Growth Consultant",
         color:"#001032"
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
           <div key={index} className="w-[38%] h-auto  shrink-0 snap-center  p-4    mx-2 text-white  ">
            <div className='flex flex-row  justify-center items-start w-full h-full gap-10  border border-[#00103280] 
            rounded-2xl shadow-lg' style={{backgroundColor: item.color}}>
              <div className='px-5'>
                <p className=' text-xl leading-8 tracking-wider pb-5 pt-8 '>{item.paragraph}</p>
              <p className='text-lg pt-5 '>{item.name}</p>
                 <p className='text-lg pb-3 '>{item.company}</p>
                 
              </div>
             <div className=' block' >
                 <div className='w-[180px] h-[300px] bg-[#D9D9D9] rounded-2xl'>
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

export default ServiceProfessionalSec4