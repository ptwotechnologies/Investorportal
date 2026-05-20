import React , { useState, useRef, useEffect } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const JoinUsSec7 = () => {
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
                paragraph:"Joining the investor portal completely changed how we access opportunities. What used to take months now happens through one connected ecosystem.",
                name:"Oliver Thompson",
               company:"Early-Stage Founder",
               image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200&h=200",
               rating: 4.5
            },
            {
                paragraph:"This isn’t just a platform—it’s where serious collaborations happen. The quality of connections here is something you won’t find outside.",
                name:"Chloe Bennett",
                company:"Investor",
                image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200&h=200",
                rating: 5
            },
            {
                paragraph:"I didn’t realize how many opportunities I was missing until I joined. Everything—startups, investors, and partnerships—is already inside.",
                 name:"Nathan Hayes",
                company:"Startup Founder",
                image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=200",
                rating: 4
            },
            {
                paragraph:"“Breaks down your numbers, shows you how long your runway actually is, and where you’re bleeding cash. It helps you find the right growth path quickly.”",
                 name:"Sophia Martinez",
                company:"Fintech Founder",
                image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&q=80&w=200&h=200",
                rating: 4.5
            },
        
          ]
        
          const data = [...divElements, ...divElements]
  return (
    <div className='my-10 lg:my-25'>
      <div className="max-w-[1500px] mx-auto w-full px-4 lg:!px-10 min-[1500px]:!px-0">
        <div className="relative"> 
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-scroll scrollbar-hide"
          >
            {data.map((item, index) => (
              <div key={index} className="w-full lg:w-[42%] h-[350px] shrink-0 snap-center p-4 mx-2">
                <div className='flex flex-col lg:flex-row justify-between items-start w-full h-full gap-10 lg:gap-10 p-5 lg:p-7 border border-[#00103280] rounded-sm shadow-lg overflow-hidden bg-white'>
                  <div className="flex flex-col justify-between h-full w-full lg:w-[60%]">
                    <p className='text-[#001032B5] text-sm leading-6 tracking-wider'>{item.paragraph}</p>
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
                  
                  {/* Mobile Profile View */}
                  <div className='lg:hidden flex justify-between items-center gap-10 w-full border-t pt-4 border-[#0010321a]'>
                    <div className=''>
                      <p className='text-sm font-semibold text-[#001032]'>{item.name}</p>
                      <p className='text-xs text-[#001032B5]'>{item.company}</p>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                      <div className="border-l h-12 border-[#00000033]"></div>
                      <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
                        <img src={item.image} alt="" className='w-full h-full object-cover' />
                      </div>
                    </div>
                  </div>

                  {/* Desktop Profile View */}
                  <div className='hidden lg:block shrink-0'>
                    <div className='w-[180px] h-[200px] bg-[#D9D9D9] rounded-sm overflow-hidden'>
                      <img src={item.image} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className="mt-3">
                      <p className='text-sm font-semibold text-[#001032]'>{item.name}</p>
                      <p className='text-xs text-[#001032B5]'>{item.company}</p>
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

export default JoinUsSec7
