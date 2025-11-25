import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";

const LegalContent = () => {

    const cards = [
        {
          accent: "bg-[#001032]",
          title: "Onboarding Prices",
          blurb: "Best for funds under $3M",
          priceMain: "$3.5k + 0.75%",
          priceSub: "of fund size",
          notes: ["annualized cost"],
          meta: [
            { label: "Investments", value: "15" },
            { label: "State Regulatory Fees", value: "Variable" },
          ],
          features: ["Fund admin", "Legal fund formation"],
          footnote: "Pricing may vary with add-on services",
        },
        {
          accent: "bg-[#001032]",
          title: "Onboarding Prices",
          blurb: "Best for funds under $3M",
          priceMain: "$3.5k + 0.75%",
          priceSub: "of fund size",
          notes: ["annualized cost"],
          meta: [
            { label: "Investments", value: "15" },
            { label: "State Regulatory Fees", value: "Variable" },
          ],
          features: ["Fund admin", "Legal fund formation"],
          footnote: "Pricing may vary with add-on services",
        },
        {
          accent: "bg-[#001032]",
          title: "Onboarding Prices",
          blurb: "Best for funds under $3M",
          priceMain: "$3.5k + 0.75%",
          priceSub: "of fund size",
          notes: ["annualized cost"],
          meta: [
            { label: "Investments", value: "15" },
            { label: "State Regulatory Fees", value: "Variable" },
          ],
          features: ["Fund admin", "Legal fund formation"],
          footnote: "Pricing may vary with add-on services",
        },
      ]
  return (
    <section className="mx-auto w-full md:py-16">
                               
                       
                               <div className="lg:grid  lg:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
                                 {cards.map((card, idx) => (
                                   <article key={idx} className=" w-full  my-4 lg:my-0   lg:p-6 text-card-foreground">
                                     {/* accent bar */}
                                     <div className={`h-2 lg:h-1.5 w-full lg:w-[90%]   ${card.accent}`}  />
                       
                                     <div className="mt-8 lg:mt-4 space-y-1.5 px-3">
                                       <h3 className=" text-3xl lg:text-lg font-bold text-[#001032] pb-4 lg:pb-0">{card.title}</h3>
                                       <p className="text-sm leading-6 text-[#3C1D3A]">{card.blurb}</p>
                                     </div>
                       
                                     {/* price */}
                                     <div className="mt-10 lg:mt-6 text-[#3C1D3A] px-3">
                                       <p className="text-2xl font-semibold">
                                         {card.priceMain}{" "}
                                         <span className="align-baseline text-sm font-normal ">{card.priceSub}</span>
                                       </p>
                                       <div className="mt-2 space-y-1">
                                         {card.notes.map((n, i) => (
                                           <p key={i} className="text-xs ">
                                             {n}
                                           </p>
                                         ))}
                                       </div>
                       
                                       {/* meta rows */}
                                       <div className="mt-8 mb-10 lg:mb-0 lg:mt-4 space-y-1.5 text-[#3C1D3A] ">
                                         {card.meta.map((m, i) => (
                                           <p key={i} className="text-xs " aria-label={`${m.label}: ${m.value}`}>
                                             <span className="font-medium  ">{m.label}:</span> {m.value}
                                           </p>
                                         ))}
                                       </div>
                                     </div>
                       
                                     <hr className="my-6 border-border" />
                       
                                     {/* features */}
                                     <div className='px-3'>
                                       <p className="mb-6 lg:mb-3 text-sm font-medium">Features</p>
                                       <ul className="space-y-3 text-[#3C1D3A]">
                                         {card.features.map((f, i) => (
                                           <li key={i} className="flex items-start gap-2">
                                             <span aria-hidden="true" className="mt-0.5 inline-flex">
                                               <IoMdCheckmark className="h-4 w-4 text-primary" />
                                             </span>
                                             <span className="text-sm ">{f}</span>
                                           </li>
                                         ))}
                                         <li className="flex items-start gap-2 ">
                                           <span className="mt-0.5 inline-flex" aria-hidden="true">
                                             <CgAsterisk className="h-5 w-5 "/>
                                           </span>
                                           <span className="text-md leading-5 mb-8 lg:mb-0 ">{card.footnote}</span>
                                         </li>
                                       </ul>
                                     </div>
                       
                                     <div className="mt-6 px-3 text-center">
                                       <button
                                         type="button"
                                         className=" w-full lg:w-[90%] mt-7 h-10  rounded-sm bg-[#002A30] text-background text-md font-medium transition hover:opacity-90"
                                       >
                                         Get started
                                       </button>
                                     </div>
                                   </article>
                                 ))}
                               </div>
                             </section>
  )
}

export default LegalContent
