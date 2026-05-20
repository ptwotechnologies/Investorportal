import React , { useState, useRef, useEffect } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const ServiceProfessionalSec8 = () => {
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
          paragraph:"Clients were better briefed, budgets were realistic, and we closed our first retainer within a week",
          name:"Emily Turner",
         company:"Developer ",
          companyName:"Freelancer",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
          rating: 5
      },
      {
          paragraph:"We scaled our consulting practice without hiring SDRs —Copteno did the discovery for us",
          name:"Jessica Smith",
          company:"Digital Marketer",
          companyName:"Agency Owner",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
          rating: 4.5
      },
      {
          paragraph:"Copteno helped us uncover the truth behind our runway, fix our messy numbers, and finally understand the real story we needed to show investors. It gave us clarity we didn’t even realize we were missing.",
           name:"Laura Johnson",
          company:"Growth Expert",
          companyName:"Specialist",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
          rating: 4
      },
          {
          paragraph:"Copteno helped us uncover the truth behind our runway, fix our messy numbers, and finally understand the real story we needed to show investors. It gave us clarity we didn’t even realize we were missing.",
           name:"Rachel Adams",
          company:"Product Designer",
          companyName:"Specialist",
          image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=200&h=200",
          rating: 5
      },
  
    ]

    const data = [...divElements, ...divElements]

    return (
      <div className='lg:my-25 mt-15 '>
        <div className="max-w-[1500px] mx-auto w-full  lg:px-0">
          <h1 className='text-5xl font-medium px-10 pb-10 text-[#001032]'>Trusted by professionals</h1>
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-scroll scrollbar-hide lg:ml-10">
              {data.map((item, index) => (
                <div key={index} className="w-full lg:w-[42%] h-[370px] shrink-0 snap-center p-4 lg:p-0 lg:py-4 mx-2">
                  <div className='flex flex-col lg:flex-row justify-between items-start w-full h-full gap-10 lg:gap-10 p-5 lg:p-7 border border-[#00103280] rounded-sm shadow-lg'>
                    <div className="flex flex-col justify-between h-full w-full lg:w-[60%]">
                      <p className='text-[#001032B5] text-md leading-8 tracking-wider'>{item.paragraph}</p>
                      <div className="flex gap-1 mt-5 lg:mb-2 items-center">
                        {[1, 2, 3, 4, 5].map((star) => {
                          if (item.rating >= star) {
                            return <FaStar key={star} className="text-[#001032]" size={20} />;
                          } else if (item.rating >= star - 0.5) {
                            return <FaStarHalfAlt key={star} className="text-[#001032]" size={20} />;
                          } else {
                            return <FaRegStar key={star} className="text-[#001032]" size={20} />;
                          }
                        })}
                      </div>
                    </div>
                    <div className='lg:hidden flex justify-between items-center gap-20 w-full'>
                      <div className=''>
                        <p className='text-sm pt-2 text-[#001032B5]'>{item.name}</p>
                        <p className='text-sm text-[#001032B5]'>{item.companyName}</p>
                        <p className='text-sm text-[#001032B5]'>growing early-stage teams</p>
                      </div>
                      <div className='flex justify-center items-center gap-5'>
                        <div className="border-l h-20 border-[#00000033]"></div>
                        <div className='w-[60px] h-[100px] bg-[#002A30] rounded-4xl overflow-hidden'>
                          <img src={item.image} alt="" className='w-full h-full object-cover rounded-4xl' />
                        </div>
                      </div>
                    </div>
                    <div className='hidden lg:block'>
                      <div className='w-[180px] h-[200px] bg-[#D9D9D9] rounded-sm overflow-hidden'>
                        <img src={item.image} alt="" className='w-full h-full object-cover rounded-sm' />
                      </div>
                      <p className='text-md pt-4 text-[#001032B5]'>{item.name}</p>
                      <p className='text-md text-[#001032B5]'>{item.company}</p>
                      <p className='text-md text-[#001032B5] pb-4'>{item.companyName}</p>
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

export default ServiceProfessionalSec8;
