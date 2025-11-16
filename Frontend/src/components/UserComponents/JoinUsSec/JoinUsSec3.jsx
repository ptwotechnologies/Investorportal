import React from 'react'
import { useEffect, useRef, useState } from "react"

const JoinUsSec3 = (props) => {
 const flow = (props && (props.direction || props.dir)) || "ltr"
  const isRTL = flow === "rtl"

  const items = [
    {
      title:
        "Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead",
      byline: "Designation,",
      company:"Company"
    },
    {
      title:
        "Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead",
      byline: "Designation,",
      company:"Company"
    },
    {
      title:
        "Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead",
      byline: "Designation,",
      company:"Company"
    },
    {
      title:
        "Raise capital, close deals, and manage your portfolio — all from a single platform. AngelList handles all overhead",
      byline: "Designation,",
      company:"Company"
    },
  ]

  const [active, setActive] = useState(0)
  const trackRef = useRef(null)
  const cardsRef = useRef([])

  // Observe which card is most visible to update dots
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cards = cardsRef.current.filter(Boolean)
    if (!cards.length) return

    const io = new IntersectionObserver(
      (entries) => {
        // pick the entry with the greatest intersectionRatio
        let top = entries[0]
        for (const e of entries) {
          if (e.intersectionRatio > top.intersectionRatio) top = e
        }
        const idx = cards.findIndex((el) => el === top.target)
        if (idx !== -1) setActive(idx)
      },
      {
        root: track,
        threshold: [0.4, 0.6, 0.8],
      },
    )

    cards.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const first = cardsRef.current[0]
    if (first) {
      first.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" })
    }
  }, [flow])

  const scrollTo = (index) => {
    const card = cardsRef.current[index]
    if (!card) return
    card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }


       

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
    <>
    <div className='hidden lg:block'>
        <div className=' mt-17 p-10 grid grid-cols-2 w-full gap-5 '>
         {divElements.map((item, index) => (
             <div key={index} className="  p-4 mx-2 text-white ">
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
    </div>

    <div className='lg:hidden mt-11'>
       <section aria-label="Mobile carousel" className="md:hidden">
      <div
        ref={trackRef}
        dir={isRTL ? "rtl" : "ltr"}
        className="
          flex gap-4 px-4
          overflow-x-auto scroll-smooth
          snap-x snap-mandatory
        "
        style={{ scrollbarWidth: "thin" }}
      >
        {items.map((item, i) => (
          <article
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="
              snap-center shrink-0
              w-full 
              rounded-lg border text-card-foreground
              overflow-hidden
              bg-[#001032]
            "
            aria-roledescription="slide"
            aria-label={`Card ${i + 1} of ${items.length}`}
          >
            <div className="bg-[#001032] text-primary-foreground p-4 rounded-b-none">
              <p className="text-xl leading-9 pt-6 w-[80%]">{item.title}</p>
              <p className="mt-4 text-md opacity-90">{item.byline}</p>
               <p className=" text-md opacity-90 ">{item.company}</p>
            </div>
            <div className=" p-4 border-t h-40 rounded-t-2xl bg-[#F2F4F7]" />
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Carousel pagination">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            role="tab"
            aria-selected={active === i}
            aria-label={`Go to slide ${i + 1}`}
            className={`
              h-2 w-2 rounded-full transition-colors
              ${active === i ? "bg-foreground" : "bg-muted-foreground/40"}
            `}
          />
        ))}
      </div>
    </section>
    </div>
    </>
  )
}

export default JoinUsSec3
