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
         name:"Michael Stevens",
        company:"Product Designer",
        color:"#002A30",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=450"
     },
     {
         paragraph:"“Copteno cut our onboarding friction — clear scopes, upfront budgets, and founders who actually know what they want”",
         name:"Sarah Jenkins",
        company:"Growth Consultant",
         color:"#001032",
         image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=450"
     },
     {
         paragraph:"“The visibility into high-growth startups is unmatched. It’s the easiest way to build a quality portfolio as a specialist”",
         name:"Emily Parker",
        company:"Legal Advisor",
         color:"#002A30",
         image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=450"
     },
   ]
   return (
    <div className='mt-15'>
      <div className="max-w-[1500px] mx-auto w-full px-4 lg:!px-10 min-[1500px]:!px-0 my-25">
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide">
            {divElements.map((item, index) => (
              <div key={index} className="w-[85%] lg:w-[45%] h-auto shrink-0 snap-center p-4 lg:p-0 lg:py-4 mx-2 text-white">
                <div className='flex flex-row justify-between items-stretch w-full h-full gap-5 border border-[#00103280] rounded-2xl shadow-lg overflow-hidden' style={{ backgroundColor: item.color }}>
                  <div className='px-5 lg:px-10 py-8 flex flex-col justify-between'>
                    <p className='text-xl leading-8 tracking-wider pb-5'>{item.paragraph}</p>
                    <div>
                      <p className='text-lg font-semibold'>{item.name}</p>
                      <p className='text-lg opacity-80'>{item.company}</p>
                    </div>
                  </div>
                  <div className='hidden sm:block shrink-0'>
                    <div className='w-[180px] h-[300px] bg-[#D9D9D9]'>
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
   );
};

export default ServiceProfessionalSec4;