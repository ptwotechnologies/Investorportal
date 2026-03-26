import React from 'react'
import { IoMdCheckmark } from "react-icons/io";

const SubscriptionPlan = () => {
     const cards = [
            {
              title: "Entry Level Plan",
              titleBg: "#D3D3D3",
              titleBg2: "#D3D3D3",
              amount: 2999,
              amountduration: "/month",
              planName: "Foundation",
              plandesc:"For early-stage founders & businesses ",
              heading1: "Setup & Structuring",
              heading2: "Legal & Compliance Clarity",
              heading3: "Business & Execution Readiness",
             heading4: "Investment Readiness Layer",
              features: [
                "Business structure clarity (aligned for funding readiness)",
                "Business structure clarity (aligned for funding readiness)",
                "Core legal document templates (NDA, agreements)",
              ],
              features2: [
                "Core legal document templates (NDA, agreements)",
                "1 agreement review with actionable feedback",
                "GST process understanding + readiness tracking",
                "Startup compliance roadmap (MCA, filings)",
                "Monthly compliance guidance (2 actions tracked)"
              ],
              features3: [
                "Basic business model clarity & validation",
                "Initial product direction (what to build – MVP thinking)",
                "Early-stage market & audience understanding",
              ],
              features4: [
                "Understanding investor expectations before funding",
                "Basic due diligence checklist for early-stage startups",
                "Identification of gaps blocking investor conversations",
              ],
            bottomText:"Guidance for up to 2 legal documents",
            buttonText2:"Required before connecting with investors on the platform",
              buttonText: "Apply for Foundation",
              buttonBg: "#D3D3D3",
              buttonBg2: "#D3D3D3",
              textcolor: "#000000",
            },


        
            {
              title: "Most Chosen Plan",
              titleBg: "#D3D3D3",
              titleBg2: "#D3D3D3",
              amount:  3999 ,
              amountduration: "/month",
              planName: "Scale(Most Chosen)",
              plandesc:"  Best for Investor Readiness Strongly recommended before investor access",
              heading1: "Operational Legal Structuring",
              heading2: "Compliance Control",
              heading3: "Business & Execution Readiness (CORE)",
             heading4: "Investment Readiness Layer",
              features: [
                "4 expert consultations / month",
                "2 agreements structured & reviewed",
                "Vendor, client & employment contract frameworks"
              ],
              features2: [
                "GST, labour & regulatory compliance guidance + review",
                "DPIIT Startup India process support",
                "Ongoing compliance tracking",
                "4 compliance actions guided / month"
              ],
              features3: [
                "Product requirement clarity (MVP scope & features) ",
                "Market positioning & target audience definition",
                "Business model alignment for growth",
                "Go-to-market direction & early growth strategy",
              ],
              features4: [
                "Term sheet understanding & review",
                "Due diligence checklist & preparation",
                "Startup documentation structuring",
              ],
               bottomText:"Guidance for up to 5 legal documents Most startups choose this before approaching investors",
               buttonText2:"Prepared to execute development, marketing & growth services effectively",
              buttonText: "Apply for Foundation",
              buttonBg: "#EDADE1",
              buttonBg2: "#F783FE",
              textcolor: "#FFFFFF",
            },

        
            {
              title: "For serious Founders",
              titleBg: "#D3D3D3",
              titleBg2: "#D3D3D3",
              amount:  4999 ,
              amountduration: "/month",
              planName: "Command",
              plandesc:"For funded startups & high-growth businesses",
              heading1: "Dedicated Legal Engine",
              heading2: "Full Compliance Ownership",
              heading3: "Business, Product & Growth Control",
             heading4: "Investor & Risk Control",
              features: [
                "Unlimited expert consultations",
                "Agreements drafted & executed (priority)",
                "Dedicated legal advisor"
              ],
              features2: [
                "GST, MCA, labour & tax compliance execution support",
                "Company law & regulatory coordination",
                "Monthly compliance oversight",
              ],
              features3: [
                "Product & scaling strategy alignment",
                "Growth & marketing direction guidance",
                "Cross-functional execution clarity",
              ],
              features4: [
                "Due diligence readiness & support",
                "Contract negotiation assistance",
                "Legal notices drafting & response",
              ],
               bottomText:"Unlimited priority legal support",
               buttonText2:"Operate without legal bottlenecks",
              buttonText: "Apply for Foundation",
              buttonBg: "#D3D3D3",
              buttonBg2: "#D3D3D3",
              textcolor: "#000000",
            },
          ];
        
          const [currentIndex, setCurrentIndex] = React.useState(0);
          const scrollRef = React.useRef(null);
        
          const handleScroll = () => {
            const container = scrollRef.current;
            if (!container) return;
        
            const cardWidth = container.scrollWidth / cards.length;
            const index = Math.round(container.scrollLeft / cardWidth);
            setCurrentIndex(index);
          };

  return (
     <main className="bg-background text-foreground">
             <section className="mx-auto w-full lg:px-6">
               <div
                 ref={scrollRef}
                 onScroll={handleScroll}
                 className="grid gap-2 lg:gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full items-stretch"
               >
                 {cards.map((card, idx) => (
                   <article
                     key={idx}
                     className="lg:w-auto w-screen shrink-0 snap-center lg:mr-0 lg:p-6 text-card-foreground flex flex-col "
                   >
                      <hr className='mx-8 lg:relative lg:bottom-5'/>

                     {/* Card wrapper — flex col, full height */}
                     <div className="my-4 mx-2 lg:m-1 rounded-sm flex flex-col flex-1">

                       {/* Top gradient header */}
                       <div
                         style={{
                           background: `linear-gradient(180deg, ${card.titleBg} 20%, ${card.titleBg2} 100%)`,
                         }}
                         className="py-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.75)] rounded-sm mx-4 lg:mx-6 bg-white z-10 text-center"
                       >
                         <div className="lg:mt-1 space-y-1.5">
                           <div className="text-[#000000] bg-[#FFFFFF] py-1 rounded-sm w-fit px-4 mb-2 lg:text-xs mx-auto shadow-[inset_0px_4px_12px_rgba(0,0,0,0.5)]">
                             {card.title}
                           </div>
                         </div>

                         <div className="lg:pb-0">
                           <h3 className={`text-3xl lg:text-2xl font-semibold text-[#001032] $bg-{card.}`}>
                             {card.planName}
                           </h3>
                           <p className="text-xs text-[#3C1D3A] w-[60%] mx-auto">
                             {card.plandesc}
                           </p>
                         </div>

                         <div className="text-[#3C1D3A]">
                           <p className="lg:text-2xl text-3xl font-bold tracking-wide mt-2 mb-1">
                             Rs {card.amount}
                             <span className="font-normal text-xl lg:text-md">
                               {card.amountduration}
                             </span>
                           </p>
                           <p className="text-sm">Program Fee</p>
                         </div>
                       </div>

                       {/* Body — grows to fill remaining height */}
                       <div className="border border-[#00103280] px-4 lg:px-6 py-5 lg:py-6 relative bottom-15 rounded-sm flex flex-col flex-1">
                         <div className="bg-[#0000001A] flex items-center text-[11px] lg:gap-4 pl-6 gap-2 px-2 py-1 rounded-sm mt-15">
                           <p>Expert Access</p>
                           <div className="h-6 w-0.5 bg-[#8282825C]"></div>
                           <p>Structured Support</p>
                           <div className="h-6 w-0.5 bg-[#8282825C]"></div>
                           <p>Defined Scope</p>
                         </div>

                         <hr className="mt-4" />

                         {/* Features — grows to push button to bottom */}
                         <div className="mt-3 lg:mt-2 text-[#3C1D3A] flex-1">
                           <h1 className="text-sm lg:text-lg">What's included?</h1>

                           <div>
                             <p className="my-3 text-sm font-medium bg-[#0000001A] px-2 py-1 rounded-sm">
                               {card.heading1}
                             </p>
                             <ul className="space-y-1 text-[#3C1D3A] text-[11px]">
                               {card.features.map((f, i) => (
                                 <li key={i} className="flex items-start gap-2">
                                   <IoMdCheckmark className="h-4 w-4 text-primary mt-1" />
                                   <span className="lg:text-xs text-md">{f}</span>
                                 </li>
                               ))}
                             </ul>
                           </div>

                           <div>
                             <p className="my-5 lg:my-2 text-sm font-medium bg-[#0000001A] px-2 py-1 rounded-sm">
                               {card.heading2}
                             </p>
                             <ul className="space-y-1 text-[#3C1D3A] text-[11px]">
                               {card.features2.map((f, i) => (
                                 <li key={i} className="flex items-start gap-2">
                                   <IoMdCheckmark className="h-4 w-4 text-primary mt-1" />
                                   <span className="lg:text-xs text-md">{f}</span>
                                 </li>
                               ))}
                             </ul>
                           </div>

                           <div>
                             <p className="my-5 lg:my-2 text-sm font-medium bg-[#0000001A] px-2 py-1 rounded-sm">
                               {card.heading3}
                             </p>
                             <ul className="space-y-1 text-[#3C1D3A] text-[11px]">
                               {card.features3.map((f, i) => (
                                 <li key={i} className="flex items-start gap-2">
                                   <IoMdCheckmark className="h-4 w-4 text-primary mt-1" />
                                   <span className="lg:text-xs text-md">{f}</span>
                                 </li>
                               ))}
                             </ul>
                           </div>

                           <div>
                             <p className="my-5 lg:my-2 text-sm font-medium bg-[#0000001A] px-2 py-1 rounded-sm">
                               {card.heading4}
                             </p>
                             <ul className="space-y-1 text-[#3C1D3A] text-[11px]">
                               {card.features4.map((f, i) => (
                                 <li key={i} className="flex items-start gap-2">
                                   <IoMdCheckmark className="h-4 w-4 text-primary mt-1" />
                                   <span className="lg:text-xs text-md">{f}</span>
                                 </li>
                               ))}
                             </ul>
                           </div>
                         </div>

                         {/* Bottom section pinned to bottom */}
                         <div className="mt-auto pt-6 text-center">
                           <p className='my-1 text-xs'>{card.bottomText}</p>
                           <button className='text-[10px] bg-linear-to-r from-[#BA1E1E] to-[#B77070] p-2 w-full rounded-sm text-white'>
                             {card.buttonText2}
                           </button>
                           <button
                             style={{
                               background: `linear-gradient(90deg, ${card.buttonBg} 5%, ${card.buttonBg2} 100%)`,
                               color: card.textcolor,
                             }}
                             className="w-full mt-2 lg:mt-3 p-2 lg:p-1 mx-auto rounded-sm bg-[#002A30] text-background text-md shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)] hover:opacity-90"
                           >
                             {card.buttonText}
                           </button>
                         </div>
                       </div>
                     </div>
                   </article>
                 ))}
               </div>
             </section>
           </main>
  )
}

export default SubscriptionPlan