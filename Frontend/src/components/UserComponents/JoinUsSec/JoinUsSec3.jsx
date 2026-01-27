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

   const data = [...items, ...items];

  const [active, setActive] = useState(0)
  const scrollRef = useRef(null);
  const cardsRef = useRef([])

   useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollSpeed = 0.5; // px per frame
    let animationId;

    const autoScroll = () => {
      if (!container) return;
      container.scrollBy({ left: scrollSpeed, behavior: "auto" });

      // reset to start when we reach half
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);
  

 

  const scrollTo = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
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

    <div className="lg:hidden mt-11">
        <section aria-label="Mobile carousel" className="md:hidden">
          <div
            ref={scrollRef}
            dir={isRTL ? "rtl" : "ltr"}
            className="flex gap-4 px-4 overflow-x-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            {data.map((item, i) => (
              <article
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="snap-center shrink-0 w-full rounded-lg border text-card-foreground overflow-hidden bg-[#001032]"
                aria-roledescription="slide"
                aria-label={`Card ${i + 1} of ${items.length}`}
              >
                <div className="bg-[#001032] text-primary-foreground p-4 rounded-b-none">
                  <p className="text-xl leading-9 pt-6 w-[80%]">{item.title}</p>
                  <p className="mt-4 text-md opacity-90">{item.byline}</p>
                  <p className="text-md opacity-90">{item.company}</p>
                </div>
                <div className="p-4 border-t h-40 rounded-t-2xl bg-[#F2F4F7]" />
              </article>
            ))}
          </div>

         
        </section>
      </div>
    </>
  )
}

export default JoinUsSec3
