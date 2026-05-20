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
           paragraph:"Copteno streamlines how we review and assess early-stage opportunities. The platform filters noise, organizes data, and delivers founder profiles that are actually investor-ready.",
           name:"Laura Bennett",
          company:"Fund Manager",
          color:"#002A30",
          image: "https://images.unsplash.com/photo-1573162915955-6a8ba9d2fe20?auto=format&fit=crop&q=80&w=300&h=450"
       },
       {
           paragraph:"The due diligence clarity here is far better than open networks. Every startup we evaluate arrives structured, verified, and aligned with our investment thesis. Copteno reduces our overhead.",
           name:"Jessica Chen",
          company:"Venture Partner",
           color:"#001032",
           image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300&h=450"
       },
       {
           paragraph:"We rely on Copteno to identify strong founders earlier. The platform presents traction, financials, and milestones in a format built for investors, not noise. It’s become a reliable source of deal flow.",
           name:"Amanda Richards",
          company:"Angel Investor",
           color:"#616B80",
           image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=300&h=450"
       },
     ]
   
     
     return (
      <div className='lg:my-25 mt-15' > 
        <div className="max-w-[1500px] mx-auto w-full  lg:!px-10 min-[1500px]:!px-0">
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide ">
              {divElements.map((item, index) => (
                <div key={index} className="w-[85%] lg:w-[45%] shrink-0 snap-center p-3 mx-2 text-white  ">
                  <div className='flex flex-row justify-between items-stretch w-full h-full gap-5 border border-[#00103280] rounded-2xl shadow-lg overflow-hidden' style={{backgroundColor: item.color}}>
                    <div className='px-5 lg:px-10 py-8 flex flex-col justify-between'>
                      <p className='text-lg lg:text-xl leading-8 tracking-wider'>{item.paragraph}</p>
                      <div>
                        <p className='text-lg font-semibold'>{item.name}</p>
                        <p className='text-lg opacity-80'>{item.company}</p>
                      </div>
                    </div>
                    <div className='hidden sm:block shrink-0'>
                      <div className='w-[180px] h-full bg-[#D9D9D9]'>
                        <img src={item.image} alt="" className='w-full h-full object-cover' />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
     )
}

export default InvestorSec4
