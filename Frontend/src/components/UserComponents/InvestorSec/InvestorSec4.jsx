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
           paragraph:"“Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals. ",
           designation:"Designation ",
          company:"Company.",
          color:"#002A30"
       },
       {
           paragraph:"“Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals. Raise capital, close deals, ",
           designation:"Designation ",
          company:"Company.",
           color:"#001032"
       },
       {
           paragraph:"“Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals. Raise capital, ",
           designation:"Designation ",
          company:"Company.",
           color:"#616B80"
       },
           {
           paragraph:"“Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, ",
           designation:"Designation ",
          company:"Company.",
           color:"#2E5055"
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
           <div key={index} className="w-[58%] h-auto  shrink-0 snap-center  p-4 px-10   mx-2 text-white  ">
            <div className='flex flex-row  justify-center items-start w-full  gap-10  border border-[#00103280] 
            rounded-2xl shadow-lg' style={{backgroundColor: item.color}}>
              <div className='px-5'>
                <p className=' text-xl leading-8 tracking-wider py-12 '>{item.paragraph}</p>
              <p className='text-lg pt-5 '>{item.name}</p>
                 <p className='text-lg  '>{item.company}</p>
                 
              </div>
             <div className=' block' >
                 <div className='w-[180px] h-[300px] bg-[#D9D9D9] rounded-2xl'>
                 </div>
            </div>
             </div>
           </div>
         ))}
       </div>
       <div className="flex justify-center mt-4">
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
       
     </div>
     )
}

export default InvestorSec4
