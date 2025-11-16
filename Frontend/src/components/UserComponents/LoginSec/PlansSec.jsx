import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";

const PlansSec = () => {

     const cards = [
      {
        accent: "bg-[#BA1E1E]",
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
        accent: "bg-[#BA1E1E]",
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
        accent: "bg-[#BA1E1E]",
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
        accent: "bg-[#BA1E1E]",
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
     <main className="bg-background text-foreground">
            <section className="mx-auto w-full   lg:px-2 lg:py-7  ">
              
              <div className="lg:grid   lg:gap-1 md:grid-cols-2 lg:grid-cols-4 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {cards.map((card, idx) => (
                  <article key={idx} className=" lg:w-auto w-screen  shrink-0 lg:shrink snap-center  lg:mr-0 lg:p-1 text-card-foreground">
                    {/* accent bar */}
                    <div className={`h-2.5 lg:h-1 w-full   ${card.accent}`}  />
      
                    <div className="mt-3 lg:mt-1 space-y-1.5 ">
                      <h3 className=" text-3xl lg:text-sm font-bold text-[#001032] pb-4 lg:pb-0 text-center ">{card.title}</h3>
                      <p className="lg:text-xs text-md tracking-wide w-[70%] text-[#3C1D3A] pl-12  lg:pl-5">{card.blurb}</p>
                    </div>
      
                    {/* price */}
                    <div className="mt-5 lg:mt-2 text-[#3C1D3A] pl-12  lg:pl-5">
                      <p className="lg:text-xs text-2xl">
                        {card.priceMain}{" "}
                        <span className="align-baseline lg:text-xs text-sm font-normal ">{card.priceSub}</span>
                      </p>
                      <div className=" space-y-1">
                        {card.notes.map((n, i) => (
                          <p key={i} className="lg:text-xs text-md ">
                            {n}
                          </p>
                        ))}
                      </div>
      
                      {/* meta rows */}
                      <div className="mt-8 mb-10 lg:mb-0 lg:mt-2 space-y-1.5 text-[#3C1D3A] ">
                        {card.meta.map((m, i) => (
                          <p key={i} className="lg:text-xs text-md " aria-label={`${m.label}: ${m.value}`}>
                            <span className="font-medium  ">{m.label}:</span> {m.value}
                          </p>
                        ))}
                      </div>
                    </div>
      
                    <hr className="my-4 border-border" />
      
                    {/* features */}
                    <div className='pl-12  lg:pl-5'>
                      <p className="mb-6 lg:mb-3 lg:text-xs text-md font-medium">Features</p>
                      <ul className="space-y-1 text-[#3C1D3A]">
                        {card.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">

                            <span aria-hidden="true" className="mt-0.5 inline-flex">
                              <IoMdCheckmark className="h-5 w-5 text-primary" />
                            </span>
                            <span className="lg:text-xs text-md ">{f}</span>
                            
                          </li>
                          
                        ))}
                        <li className="flex items-start gap-2 mt-6 lg:mt-0">
                          <span className="mt-0.5 inline-flex" aria-hidden="true">
                            <CgAsterisk className="h-6 w-6 "/>
                          </span>
                          <span className="lg:text-xs text-md leading-5 mb-8 lg:mb-0 ">{card.footnote}</span>
                        </li>
                      </ul>
                    </div>
                          <hr className=" border-border" />
                    <div className="  px-2 text-center ">
                      <button
                        type="button"
                        className=" lg:w-full px-32 lg:px-0 lg:mt-3 mt-8 p-2 lg:p-1 mx-auto  rounded-sm bg-[#001426] text-background text-md font-medium transition hover:opacity-90"
                      >
                        Continue
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>
  )
}

export default PlansSec
