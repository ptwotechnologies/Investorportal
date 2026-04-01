import React, { useRef, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";
import { Link } from "react-router-dom";

function ServiceProfessionalSec9() {
  const cards = [
    {
      title: "Value Focused",
      titleBg: "#BA1E1E",
      titleBg2: "#B77070",
      amount: 9999,
      amountduration: "/year",
      amountDesc: "Annual onboarding access",
      planName: "Access Plan",
      planDesc: "For professionals entering structured deal flow",
      sections: [
        {
          heading: "Core Access",
          features: [
            "Professional profile creation & visibility",
            "Access to unified dashboard",
            "Receive service requests from startups",
            "Send & accept connection requests",
            "Participate in complete deal workflows",
          ],
        },

        {
          heading: "Deal & Execution System",
          features: [
            "Active deals management",
            "Milestone-based execution tracking",
            "Negotiation interface",
            "Documentation handling",
            "Payment workflow visibility",
            "Dispute resolution system",
          ],
        },
        {
          heading: "Revenue Opportunity",
          features: [
            "Eligible for Channel Partner model",
            {
              title: "Earn:",
              subPoints: [
                "20% on startup onboarding",
                "20% on business plan conversions",
              ],
            },
            "Build additional income streams beyond services",
          ],
        },
        {
          heading: "Trust Layer",
          features: [
            "Verified startup ecosystem access",
            "Platform-level quality control",
            "Support ticket system",
          ],
        },
        {
          heading: "Visibility Level",
          features: [
            "Standard listing visibility",
            "Basic discoverability in service listings",
          ],
        },
      ],

      buttonText: "Start Receiving Opportunities",
    },
    {
      title: "Outcome Driven",
      titleBg: "#119BCD",
      titleBg2: "#61C9EF",
      amount: 19999,
      amountduration: "/year",
      amountDesc: "Visibility + deal flow enhancement",
      amountButton: "Everything in Access +",
      planName: "Growth Plan",
      recommendedPlan: "(Recommended)",
      planDesc: "For professionals seeking consistent deal flow",
      sections: [
        {
          heading: "Visibility Boost",
          features: [
            "Priority in startup service requests",
            "Higher ranking in service listings",
            "Increased exposure across platform",
            "Improved positioning in search",
          ],
        },
        {
          heading: "Deal Advantage",
          features: [
            "Increased chances of being selected",
            "Better exposure to active & high-intent startups",
            "Faster interaction visibility",
          ],
        },
        {
          heading: "Revenue Scaling",
          features: [
            "Increased deal participation opportunities",
            "Stronger potential for recurring client flow",
          ],
        },
      ],
      middleButton1: "Higher visibility",
      middleButton2: "More Onboarding",
      middleButton3: "More Commission",
      bottomSection: [
        {
          bottomButton: "  Increase Your Deal Flow",
          bottomPara:
            "Get more service requests, higher visibility, and increase your chances of closing deals",
        },
      ],

      buttonText: "Increase Your Deal Flow",
    },
    {
      title: "Authority & Scale",
      titleBg: "#FEC432",
      titleBg2: "#F2D795",
      amount: 49999,
      amountduration: "/year",
      amountDesc: "High visibility + authority positioning",
      amountButton: "Everything in Growth +",
      planName: "Authority Plan",
      planDesc: "For professionals building premium positioning",
      sections: [
        {
          heading: "Premium Positioning",
          features: [
            "Featured placement in professional listings",
            "Authority badge (credibility signal)",
            "Highlighted presence across platform",
          ],
        },
        {
          heading: "High-Value Access",
          features: [
            "Priority in high-ticket startup deals",
            "Better exposure to serious founders",
            "Stronger placement in deal ecosystem",
          ],
        },
        {
          heading: "Brand Advantage",
          features: [
            "Increased trust & perceived expertise",
            "Position as preferred ecosystem partner",
            "Stronger brand visibility within network",
          ],
        },
        {
          heading: "Revenue Expansion",
          features: [
            "Higher conversion chances from requests",
            "Increased channel partner earnings potential",
            "Access to higher-value opportunities",
          ],
        },
      ],
      bottomSection: [
        {
          bottomButton: "Attract High-Value Clients",
          bottomPara:
            "Position yourself as a trusted expert and get access to serious, high-intent startups",
        },
      ],

      buttonText: "Establish Your Authority",
    },
  ];

  // ⭐ Scroll tracking
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;

    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto w-full lg:px-6 py-10 md:py-16 ">
        <header className="lg:mb-8 mb-4 px-4 md:mb-12">
          <h1 className="hidden lg:block text-[#001032] text-3xl font-medium tracking-tight md:text-5xl">
            Start your journey
          </h1>
          <h1 className=" lg:hidden text-[#001032] text-3xl mt-6 font-medium tracking-tight md:text-5xl">
            Onboarding Plans
          </h1>
        </header>

        {/* ⭐ Scrollable Cards with Tracking */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="grid gap-2 lg:gap-2  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full"
        >
          {cards.map((card, idx) => (
            <>
              <article
                key={idx}
                className="lg:w-auto w-screen shrink-0 snap-center  lg:mr-0 lg:p-6 text-card-foreground"
              >
                <hr className="mx-4 relative lg:bottom-5" />
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
                      {card.planDesc}
                    </p>
                  </div>

                  <div className="text-[#3C1D3A]">
                    <p className="lg:text-2xl text-3xl font-bold tracking-wide lg:mt-3">
                      Rs {card.amount}
                      <span className="font-normal text-xl lg:text-md">
                        {card.amountduration}
                      </span>
                    </p>
                    <p className="text-sm ">{card.amountDesc}</p>
                  </div>

                  <div className="bg-[#0000001A] flex items-center text-xs lg:gap-4 pl-6 gap-2 px-2 py-1 rounded-sm mt-6 lg:mt-4">
                   <p className="">Deal Flow Access</p>
                      <div className="h-6 w-0.5 bg-[#8282825C]"></div>
                      <p>Annual Plan</p>
                      <div className="h-6 w-0.5 bg-[#8282825C]"></div>
                      <p>Priority Support</p>
                  </div>

                  <hr className="mt-4" />

                  {/* Features */}
                  <div className="mt-3 lg:mt-2 text-[#3C1D3A] flex-1">
                    <h1 className="text-sm">What’s included?</h1>
                    {card.sections?.map((section, index) => (
                      <div key={index}>
                        <p className="my-5 lg:my-2 lg:text-[10px] text-sm font-medium bg-[#0000001A] px-2 py-1 rounded-sm">
                          {section.heading}
                        </p>

                        <ul className="space-y-1 text-[#3C1D3A] text-xs lg:text-[10px]">
                          {section.features.map((f, i) => (
                            <li key={i} className="flex flex-col gap-1">
                              {/* 🔹 Agar normal string hai */}
                              {typeof f === "string" && (
                                <div className="flex items-start gap-2">
                                  <IoMdCheckmark className="h-5 w-5 text-primary mt-1" />
                                  <span>{f}</span>
                                </div>
                              )}

                              {/* 🔹 Agar object hai (nested points) */}
                              {typeof f === "object" && (
                                <div className="flex flex-col gap-">
                                  <div className="flex items-start gap-2">
                                    <IoMdCheckmark className="h-5 w-5 text-primary mt-1" />
                                    <span className="">{f.title}</span>
                                  </div>

                                  <ul className="ml-10  list-disc text-[11px] lg:text-[9px]">
                                    {f.subPoints.map((sub, idx) => (
                                      <li key={idx}>{sub}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {card.bottomSection && card.bottomSection.length > 0 && (
                    <div className="lg:mt-auto mt-4">
                      {card.bottomSection.map((bottom, index) => (
                        <>
                          {card.middleButton1 && (
                            <div className="flex flex-col items-start border border-[#000000] rounded-sm mb-2 lg:gap-5 gap-4 p-3 px-4">
                              <button className="bg-[#FDFDFD] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] lg:w-56 w-46 p-1 text-xs lg:text-sm rounded-sm">
                                {card.middleButton1}
                              </button>
                              <button className="bg-[#FDFDFD] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] lg:w-56 w-46 p-1 text-xs lg:text-sm rounded-sm lg:ml-30 ml-25">
                                {card.middleButton2}
                              </button>
                              <button className="bg-[#FDFDFD] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] lg:w-56 w-46 p-1 text-xs lg:text-sm rounded-sm">
                                {card.middleButton3}
                              </button>
                            </div>
                          )}
                          <div
                            key={index}
                            className="bg-[#FFF7D6] h-40 lg:h-50 shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-sm p-2 px-2"
                          >
                            <button className="w-fit text-start lg:text-[20px] text-sm rounded-sm bg-[#FFE4E6] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] px-4 py-1 mb-5 text-[#B42318] font-medium">
                              {bottom.bottomButton}
                            </button>
                            <p className="lg:text-[20px]">
                              {bottom.bottomPara}
                            </p>
                          </div>
                        </>
                      ))}
                    </div>
                  )}

                  <div className=" mt-2  lg:mt-1 lg:pt-1 text-center">
                    <Link to="/login">
                      <button
                        className="
                     w-full
                    
                    p-2 lg:p-1
                    mx-auto 
                    rounded-sm bg-[#002A30] 
                    text-background text-md 
                   
                    hover:opacity-90
                  "
                      >
                        {card.buttonText}
                      </button>
                    </Link>
                  </div>
                </div>
                <hr className="mx-4 lg:relative top-5 hidden lg:block" />
              </article>
            </>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ServiceProfessionalSec9;
