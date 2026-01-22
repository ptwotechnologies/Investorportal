import React, { useState, useRef, useEffect } from 'react'

const HomeSec5 = () => {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const divElements = [
    {
      paragraph:
        "“Helps decode your runway, spotlight where cash burns, and show exactly how to extend it. Breaks down your numbers, shows you how long your runway actually is, and where you’re bleeding cash.”",
      lgPara:
        "Artestor helped us uncover the truth behind our runway, fix our messy numbers, and finally understand the real story we needed to show investors. It gave us clarity we didn’t even realize we were missing.",
      name: "Vivek T ",
      lgname: "Sanjay Kumar",
      company: "Elvehico ",
      company2: "Founder",
      companyName: "Early-stage product team",
    },
    {
      paragraph:
        "“With Artestor, we stopped guessing. Our financial madesense, our pitch felt stronger, and investors finally understood what we were building. It saved us weeks of confusion and endless revisions.",
      lgPara:
        "With Artestor, we stopped guessing. Our financial madesense, our pitch felt stronger, and investors finally understood what we were building. It saved us weeks of confusion and endless revisions.",
      name: "Vivek T ",
      lgname: "Niharika Sharma",
      company2: "TSAH",
      company: "TSAH ",
      companyName: "Founder",
    },
    {
      paragraph:
        "“Artestor helped us uncover the truth behind our runway, fix our messy numbers, and finally understand the real story we needed to show investors. It gave us clarity we didn’t even realize we were missing.",
      lgPara:
        "Artestor helped us uncover the truth behind our runway, fix our messy numbers, and finally understand the real story we needed to show investors. It gave us clarity we didn’t even realize we were missing.",
      name: "Vivek T ",
      lgname: "Niharika Sharma",
      company2: "Founder",
      company: "TSAH",
      companyName: "Startup",
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
              <div className="flex flex-col lg:flex-row justify-center items-start w-full h-full gap-15 lg:gap-8 px-7 lg:p-7 border border-[#00103280] rounded-sm shadow-lg">
                <p className="text-[#001032B2] text-md leading-8 tracking-wider lg:hidden py-2">
                  {item.paragraph}
                </p>
                <p className="text-[#001032B2] text-md leading-9 tracking-wider hidden lg:block">
                  {item.lgPara}
                </p>

                <div className="lg:hidden flex justify-between items-center gap-5 w-full py-3">
                  <div>
                    <p className="text-sm pt-2 text-[#001032B2]">
                      {item.name}
                    </p>
                    <p className="text-sm text-[#001032B5]">
                      {item.company2}
                    </p>
                    <p className="text-sm text-[#001032B5]">
                      Early-stage product team
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <div className="border-l h-20 border-[#00000033]"></div>
                    <div className="w-[60px] h-[100px] bg-[#001032] rounded-4xl"></div>
                  </div>
                </div>

                <div className="hidden lg:block mt-3">
                  <div className="w-[180px] h-[200px] bg-[#D9D9D9] rounded-sm"></div>
                  <p className="text-sm pt-2 text-[#001032B5]">
                    {item.lgname}
                  </p>
                  <p className="text-sm text-[#001032B5]">
                    {item.company}
                  </p>
                  <p className="text-sm text-[#001032B5]">
                    {item.companyName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  )
}

export default HomeSec5
