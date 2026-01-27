import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";

const DesigningContent = () => {

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = React.useRef(null);

 const cards = [
      {
        title: "Most Affordable Plan",
        titleBg: "#BA1E1E",
        titleBg2: "#B77070",
        amount: 2999,
        amountduration: "/year",
        planName: "Basic Plan",
        heading1: "Support & Guidance",
        heading2: "Network & Growth",
        features: [
          "2 Consultation sessions per month",
          "Access to the verified service professinals",
        ],
        features2: [
          "Access to the other portals",
          "Fund raising updates",
          "Connecting with investors",
        ],
        buttonText: "Start with Basic",
      },
      {
        title: "Starter Growth Plan",
        titleBg: "#119BCD",
        titleBg2: "#61C9EF",
        amount: 9999,
        amountduration: "/year",
        planName: "Growth Plan",
        heading1: "Support & Guidance + All in Basic Plan &",
        heading2: "Network & Growth",
        features: [
          "2 Consultation sessions per month",
          "Assistance with Pitch Deck",
        ],
        features2: [
          "Channel Partners Support",
          "Funding Support",
          "Pitching the investors",
        ],
        buttonText: "Start with Growth",
      },
      {
        title: "Founder Pro Plan",
        titleBg: "#FEC432",
        titleBg2: "#F2D795",
        amount: 19999,
        amountduration: "/year",
        planName: "Pro Plan",
        heading1: "Support & Guidance + All in Growth Plan &",
        heading2: "Network & Growth",
        features: [
          "2 Consultation sessions per month",
          "Assistance with Financial Projections",
        ],
        features2: [
          "Refined & Approved Startups and Investors",
          "Meet with Investors",
          "Business Strategies & Advisory",
        ],
        buttonText: "Start with Pro",
      },
      {
        title: "Elite Founder Plan",
        titleBg: "#108349",
        titleBg2: "#49CE8B",
        amount: 49999,
        amountduration: "/year",
        planName: "Pro Plan",
        heading1: "Support & Guidance + All in Pro Plan &",
        heading2: "Network & Growth",
        features: [
          "2 Consultation sessions per month",
          "Access to the verified service professinals",
        ],
        features2: [
          "Access to the Communities",
          "Enrollment in Business Incubation",
          "Access to the Multiple Portals ",
        ],
        buttonText: "Start with Elite",
      },
    ];
  

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.scrollWidth / cards.length;
    const index = Math.round(container.scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  return (
   <main className="bg-background text-foreground">
             <section className="mx-auto w-full lg:px-6  ">
       
               {/* ⭐ Scrollable Cards with Tracking */}
               <div
                 ref={scrollRef}
                 onScroll={handleScroll}
                 className="grid gap-2 lg:gap-2  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full "
               >
                 {cards.map((card, idx) => ( 
                   <article
                     key={idx}
                     className="lg:w-auto w-screen shrink-0 snap-center   lg:mr-0 lg:p-6 text-card-foreground"
                   >
                    <hr className='mx-4 lg:relative lg:bottom-5'/>
                   <div className="bg-white py-5 lg:py-6 lg:pb-8 border-2 border-[#00103280] my-4 mx-2 lg:m-1 rounded-sm px-4 lg:px-6 lg:h-full flex flex-col  shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)]">
                      <div className="lg:mt-1 space-y-1.5">
                      <div
                             style={{
                               background: `linear-gradient(90deg, ${card.titleBg} 75%, ${card.titleBg2} 100%)`,
                             }}
                             className="text-white  py-1  rounded-sm w-fit px-4 lg:px-2 mb-4 lg:mb-3 lg:text-xs"
                           >
                             {card.title}
                           </div>
                     </div>
       
                     {/* Price */}
                     <div className="pb-4 lg:pb-0">
                             <h3 className="text-3xl lg:text-2xl font-semibold text-[#001032] ">
                               {card.planName}
                             </h3>
                             <p className="text-sm  text-[#3C1D3A]">
                               For early-stage founders & businesses{" "}
                             </p>
                           </div>
       
                           <div className="text-[#3C1D3A]">
                             <p className="lg:text-2xl text-3xl font-bold tracking-wide lg:mt-3">
                               Rs {card.amount}
                               <span className="font-normal text-xl lg:text-md">
                                 {card.amountduration}
                               </span>
                             </p>
                             <p className="text-sm ">Annual onboarding fee</p>
                           </div>
       
                           <div className="bg-[#0000001A] flex items-center text-xs lg:gap-4 pl-6 gap-2 px-2 py-1 rounded-sm mt-6 lg:mt-4">
                           <p className="font-bold">
                             15 <span className="font-normal">connects</span>
                           </p>
                           <div className="h-6 w-0.5 bg-[#8282825C]"></div>
                           <p>
                             Annual Fee: <span className="font-bold">Fixed </span>
                           </p>
                           <div className="h-6 w-0.5 bg-[#8282825C]"></div>
                           <p>Support included</p>
                         </div>
       
                     <hr className="mt-4" />
       
                     {/* Features */}
                       <div className="mt-3 lg:mt-2 text-[#3C1D3A] ">
                                         <h1 className="text-sm lg:text-lg">What’s included?</h1>
                                         <div>
                                           <p className="my-3  text-sm text-md font-medium bg-[#0000001A] px-2 py-1 rounded-sm">
                                             {card.heading1}
                                           </p>
                                           <ul className="space-y-1 text-[#3C1D3A] text-sm ">
                                             {card.features.map((f, i) => (
                                               <li key={i} className="flex items-start gap-2 ">
                                                 <IoMdCheckmark className="h-5 w-5 text-primary mt-1" />
                                                 <span className="lg:text-xs text-md">{f}</span>
                                               </li>
                                             ))}
                                           </ul>
                                         </div>
                     
                                         <div>
                                           <p className="my-5 lg:my-2  text-sm text-md font-medium bg-[#0000001A] px-2 py-1 rounded-sm">
                                             {card.heading2}
                                           </p>
                                           <ul className="space-y-1 text-[#3C1D3A] text-sm  ">
                                             {card.features2.map((f, i) => (
                                               <li key={i} className="flex items-start gap-2">
                                                 <IoMdCheckmark className="h-5 w-5 text-primary mt-1" />
                                                 <span className="lg:text-xs text-md">{f}</span>
                                               </li>
                                             ))}
                                           </ul>
                                         </div>
                                       </div>
       
                    <div className="mt-3   lg:mt-auto pt-3 lg:pt-1 text-center">
                           <button
                             className="
                            w-full
                           mt-2 lg:mt-3
                           p-2 lg:p-1
                           mx-auto 
                           rounded-sm bg-[#002A30] 
                           text-background text-md 
                          
                           hover:opacity-90
                         "
                            
                           >
                             {card.buttonText}
                           </button>
                         </div>
                   </div>
                    
                   </article>
                 ))}
                  
    <div className="hidden lg:block col-span-2 mx-6">
                   <hr className='mx-6   '/>
              <div className="bg-white  border-2 border-[#00103280] mt-6 h-[92.5%]  rounded-sm  p-3   px-20 shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)]">
              <div id="top" className="flex justify-between items-center ">
               <div className="bg-[#5DD2E3] w-47 h-70 rounded-3xl">
   
               </div>
               <div className="bg-[#C2D3D5]  w-47 h-90 rounded-3xl">
   
               </div>
               <div className="bg-[#4A66A3]  w-47 h-80 rounded-3xl mt-20">
   
               </div>
   
   
              </div>
              <div id="bottom">
                  <div className="bg-[#DBDBDB] w-full h-12 rounded-full mt-20">
   
                  </div>
              </div>
             </div>
            </div>
                  
               </div>
       
        
              
       
             </section>
           </main>
  );
};

export default DesigningContent;
