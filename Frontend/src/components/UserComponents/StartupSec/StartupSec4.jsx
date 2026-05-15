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
          paragraph:"Copteno turned our scattershot outreach into a clear fundraising path. We tightened our story, found the right leads, and closed our first term sheet — faster than we expected.",
          name:"Niharika Sharma",
         company:"Cofounder, Elvehico",
         color:"#002A30",
         image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=450"
      },
      {
          paragraph:"Before Copteno we pitched everywhere and got nowhere. Here we met investors who actually understood our metrics and moved the conversation forward.",
          name:"Shravani",
         company:"Co-founder, Smriti Adventures",
         color:"#001032",
         image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=450"
      },
      {
          paragraph:"“Raise capital, close deals, and manage your portfolio — all from a single platform. Copteno Technologies handles all overhead and back-office services.”",
          name:"Arjun Malik",
         company:"Founder, tefo.RE",
          color:"#616B80",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=450"
      }, 
    ]
    return (
      <div className='mt-15' >
        <div className="max-w-[1500px] mx-auto w-full  lg:!px-10 min-[1500px]:!px-0 my-25">
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide ">
              {divElements.map((item, index) => (
                <div key={index} className="w-[85%] lg:w-[45%] shrink-0 snap-center p-4 lg:p-0 lg:py-4 mx-2 text-white">
                  <div className='flex flex-row justify-between items-stretch w-full h-full gap-5 border border-[#00103280] rounded-2xl shadow-lg overflow-hidden' style={{backgroundColor: item.color}}>
                    <div className='px-5 lg:px-10 py-8 flex flex-col justify-between'>
                      <p className='text-xl leading-8 tracking-wider pb-5'>{item.paragraph}</p>
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

export default StartupSec4
