import React, { useState, useRef, useEffect } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const HomeSec5 = () => {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const divElements = [
    {
      paragraph:
        "“Helps decode your runway, spotlight where cash burns, and show exactly how to extend it. Breaks down your numbers, shows you how long your runway actually is, and where you’re bleeding cash.”",
      lgPara:
        "Copteno helped us uncover the truth behind our runway, fix our messy numbers, and finally understand the real story we needed to show investors. It gave us clarity we didn’t even realize we were missing.",
      name: "Michael Stevens",
      position: "Co-Founder",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4
    },
    {
      paragraph:
        "“With Copteno, we stopped guessing. Our financial madesense, our pitch felt stronger, and investors finally understood what we were building. It saved us weeks of confusion and endless revisions.",
      lgPara:
        "With Copteno, we stopped guessing. Our financial madesense, our pitch felt stronger, and investors finally understood what we were building. It saved us weeks of confusion and endless revisions.",
      name: "Sarah Jenkins",
      position: "Founder",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4.5
    },
    {
      paragraph:
        "“Copteno helped us uncover the truth behind our runway, fix our messy numbers, and finally understand the real story we needed to show investors. It gave us clarity we didn’t even realize we were missing.",
      lgPara:
        "Before Copteno, our financial story felt scattered. With its insights, we streamlined our data, identified key gaps, and built a much stronger narrative for investors. It became an essential part of our decision-making process.",
      name: "David Peterson",
      position: "Early-stage Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
  ]
 
  const data = [...divElements, ...divElements]

  // ✅ smooth endless auto scroll
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

  return (
    <div className="mt-15">
      <div className="max-w-[1500px] mx-auto w-full lg:px-5">
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-scroll scrollbar-hide"
          >
            {data.map((item, index) => (
              <div
                key={index}
                className="w-full lg:w-[42%] shrink-0 p-4 mx-2"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start w-full h-full gap-6 lg:gap-8 px-7 lg:p-7 border border-[#00103280] rounded-sm shadow-lg">
                  
                  <div className="flex flex-col justify-between h-full w-full lg:w-[60%]">
                    <p className="text-[#001032B2] text-md leading-8 tracking-wider lg:hidden py-2">
                      {item.paragraph}
                    </p>
                    <p className="text-[#001032B2] text-md leading-9 tracking-wider hidden lg:block">
                      {item.lgPara}
                    </p>

                    <div className="hidden lg:flex gap-1 mt-5 lg:mb-2 items-center">
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

                  <div className="lg:hidden flex justify-between items-center gap-5 w-full py-3">
                    <div>
                      <p className="text-sm pt-2 text-[#001032B2]">
                        {item.name}
                      </p>
                      <p className="text-sm text-[#001032B5]">
                        {item.position}
                      </p>
                      <div className="flex gap-1 mt-2 items-center">
                        {[1, 2, 3, 4, 5].map((star) => {
                          if (item.rating >= star) {
                            return <FaStar key={star} className="text-[#001032]" size={14} />;
                          } else if (item.rating >= star - 0.5) {
                            return <FaStarHalfAlt key={star} className="text-[#001032]" size={14} />;
                          } else {
                            return <FaRegStar key={star} className="text-[#001032]" size={14} />;
                          }
                        })}
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                      <div className="border-l h-20 border-[#00000033]"></div>
                      <div className="w-[60px] h-[100px]  rounded-4xl bg-[#00000040]">
                        
                        <img src={item.image} alt="" className='w-full h-full object-cover rounded-4xl'/>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block mt-3">
                    <div className="w-[180px] h-[250px] bg-[#D9D9D9] rounded-sm">
                      <img src={item.image} alt="" className='w-full h-full object-cover rounded-sm'/>

                    </div>
                    <p className="text-sm pt-2 text-[#001032B5]">
                      {item.name}
                    </p>
                    <p className="text-sm text-[#001032B5]">
                      {item.position}
                    </p>
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

export default HomeSec5
