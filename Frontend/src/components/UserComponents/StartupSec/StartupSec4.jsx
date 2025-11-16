import React , { useState, useRef } from 'react'

const StartupSec4 = () => {
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
          paragraph:"“Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals. Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals.”",
          designation:"Designation ",
         company:"Company.",
         color:"#002A30"
      },
      {
          paragraph:"“Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals. Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals.”",
          designation:"Designation ",
         company:"Company.",
          color:"#001032"
      },
      {
          paragraph:"“Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals. Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals.”",
          designation:"Designation ",
         company:"Company.",
          color:"#616B80"
      },
          {
          paragraph:"“Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals. Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead and back-office services, so you can focus on your deals.”",
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
            <div key={index} className="w-[42%] h-80  shrink-0 snap-center  p-4 mx-2 text-white ">
             <div className='flex flex-row  justify-center items-center w-full h-full gap-10  border border-[#00103280] 
             rounded-2xl shadow-lg' style={{backgroundColor: item.color}}>
               <div className='px-5'>
                 <p className=' text-sm leading-6 tracking-wider'>{item.paragraph}</p>
               <p className='text-sm pt-5 '>{item.designation}</p>
                  <p className='text-sm  '>{item.company}</p>
                  
               </div>
              <div className=' block' >
                  <div className='w-[180px] h-[285px] bg-[#D9D9D9] rounded-2xl'>
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

export default StartupSec4
