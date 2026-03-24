import React, { useState, useRef, useEffect } from "react";

const JoinUsSec4 = () => {
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
      paragraph:
        "Founders shaping their first version, validating their idea, and defining the right direction for product and funding",
      company: "Early Stage",
    },
    {
      paragraph:
        "Teams preparing their investment story, strengthening traction signals, and building credibility for outreach",
      company: "Pre-seed to Seed",
    },
    {
      paragraph:
        "Boutique agencies seeking founders with stage-fit budgets, repeatable scopes, and clear expectations",
      company: "Agencies",
    },
    {
      paragraph:
        "Platform partners tools and services that complement founder’s needs, integrations and partnerships welcome",
      company: "Partners",
    },
  ];

  const cards = [...divElements, ...divElements];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId;

    const autoScroll = () => {
      container.scrollLeft += 0.5;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="lg:mt-8 lg:px-10 mt-16 px-3">
      <h1 className="text-2xl lg:text-5xl text-[#001032] font-medium text-center lg:text-start">
        Who is this platform for?
      </h1>
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-scroll scrollbar-hide lg:px-10  pt-8 gap-4 lg:gap-5 text-[#001032] "
        >
          {cards.map((item, index) => (
            <div
              key={index}
              className="w-full  lg:w-[30%] h-fit  shrink-0 lg:p-4  lg:mx-2  "
            >
              <div
                className=" w-full h-full lg:gap-10  border border-[#00103280] 
             lg:rounded-2xl lg:shadow-lg lg:p-3 p-5 px-7   rounded-sm shadow-lg"
              >
                <p className="  text-[#001032B2] text-md lg:leading-9  leading-8 tracking-wider">
                  {item.paragraph}
                </p>
                
                <div className=" flex justify-between items-center lg:mt-20 mt-10">
                  <div className=" lg:text-xl ">
                    <h1 className="text-md text-[#001032B2]">{item.company}</h1>
                  </div>
                  
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-0.5 h-10 bg-[#D9D9D9] "></div>
                    <div className="w-[50px] h-[50px]  rounded-full lg:bg-[#001032] bg-[#00000033]"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:text-center mt-10 ">
        <h1
          className=" lg:bg-linear-to-r from-[#001032] lg:from-70% via-blue-[#001426] at-130% to-[#D8D8D8] 
            lg:text-white p-2 lg:px-10 w-fit lg:mx-auto rounded-3xl lg:text-sm text-lg hidden lg:block"
        >
          If your work fits any of these lanes and you want a quieter, more direct way to find serious clients, this portal is for you
        </h1>
       
        <p className="text-[#001032] mt-3  p-2 lg:text-md text-lg pb-15 lg:pb-0 hidden lg:block">
          And if you’ve worked with startups before? That’s even better!
        </p>
        
      </div>
      
    </div>
  );
};

export default JoinUsSec4;
