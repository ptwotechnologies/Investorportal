import React from 'react'
import { useEffect, useRef, useState } from "react"

const JoinUsSec3 = (props) => {
 const flow = (props && (props.direction || props.dir)) || "ltr"
  const isRTL = flow === "rtl"

  const items = [
    {
      title: "Unlock access to high-value opportunities across startups, impact projects, commerce, and institutional initiatives — all in one place.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      title: "Step inside a closed network of verified founders, investors, and enablers where real collaborations and deals actually happen.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      title: "Tap into four powerful ecosystems — incubation, NGO, eCommerce, and foundation — without switching platforms or missing connections.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      title: "Discover, connect, and act on opportunities faster. Everything you need to collaborate, invest, and grow is already inside.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400&h=400"
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
      
      // Direct assignment is more reliable across browsers in production
      container.scrollLeft += scrollSpeed;

      // Reset to start when we reach half, using a 1px buffer for sub-pixel rounding
      if (container.scrollLeft >= (container.scrollWidth / 2) - 1) {
        container.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);
  

  const divElements = [
    {
        paragraph:"Unlock access to high-value opportunities across startups, impact projects, commerce, and institutional initiatives — all in one place.",
        color:"#002A30",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=450"
    },
    {
        paragraph:"Step inside a closed network of verified founders, investors, and enablers where real collaborations and deals actually happen.",
        color:"#001032",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=300&h=450"
    },
    {
        paragraph: "Tap into four powerful ecosystems — incubation, NGO, eCommerce, and foundation — without switching platforms or missing connections.",
        color:"#616B80",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=300&h=450"
    },
    {
        paragraph:"Discover, connect, and act on opportunities faster. Everything you need to collaborate, invest, and grow is already inside.",
        color:"#2E5055",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=300&h=450"
    },
  ]

  return (
    <div className='lg:mt-17'>
      <div className="max-w-[1500px] mx-auto w-full px-4 lg:!px-10 min-[1500px]:!px-0">
        <div className='hidden lg:block'>
          <div className='grid grid-cols-2 w-full gap-5'>
            {divElements.map((item, index) => (
              <div key={index} className="p-4 text-white">
                <div className='flex flex-row justify-center items-start w-full h-full gap-10 border border-[#00103280] rounded-2xl shadow-lg' style={{ backgroundColor: item.color }}>
                  <div className='px-5'>
                    <p className='text-lg leading-8 tracking-wider mt-9'>{item.paragraph}</p>
                  </div>
                  <div className='block'>
                    <div className='w-[180px] h-[250px] bg-[#D9D9D9] rounded-2xl overflow-hidden'>
                      <img src={item.image} alt="" className='w-full h-full object-cover' />
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
              className="flex gap-4 overflow-x-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              {data.map((item, i) => (
                <article
                  key={i}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="snap-center shrink-0 w-full rounded-lg border text-card-foreground overflow-hidden bg-[#001032] flex flex-col justify-between"
                  aria-roledescription="slide"
                  aria-label={`Card ${i + 1} of ${items.length}`}
                >
                  <div className="bg-[#001032] text-primary-foreground p-4 rounded-b-none">
                    <p className="text-xl leading-9 pt-6 w-[80%] text-white">{item.title}</p>
                  </div>
                  <div className="p-4 border-t h-40 rounded-t-2xl bg-[#F2F4F7] overflow-hidden">
                    <img src={item.image} alt="" className='w-full h-full object-cover' />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default JoinUsSec3
