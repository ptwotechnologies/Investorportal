import React, { useRef, useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "@/App";
import toast, { Toaster } from "react-hot-toast";

const ServiceProfessionalPlanSec = ({ userId }) => {
  const navigate = useNavigate();
  const resolvedUserId = userId || localStorage.getItem("userId");

  const cards = [
     {
      title: "Entry Access",
      titleBg: "#BA1E1E",
      titleBg2: "#B77070",
      // amount: 9999,
      amountduration: "Free",
      amountDesc: "Create your presence and discover client opportunities",
      planName: "Explorer Access",
      planDesc: "Receive relevant client opportunities and start engaging instantly",
      network1:"Opportunity Network",
      network2:"Limited Access",
      network3:"Standard Support",
      sections: [
        {
          heading: "Core Access",
          features: [
            "Profile creation & guided visibility",
            "Access to unified dashboard",
            "Receive curated service requirements",
            "Visibility into relevant startup needs",
            "Access to managed matching system",
            "Participate in limited deal workflows",
          ],
        },
        {
          heading: "Deal & Execution System",
          features: [
            "Accept 1 client opportunity",
            "Milestone-based execution tracking",
            "Negotiation interface",
            "Documentation handling",
            "Payment workflow visibility",
            "Dispute resolution system",
          ],
        },
         {
          heading: "Opportunity Access",
          features: [
            "Receive up to 3–5 relevant client requests",
            "View detailed requirement previews",
            "Visibility into startup requirements",
            "Access to active opportunity sections",
            "Unlock full plan to convert more opportunities",
          ],
        },
        {
          heading: "Trust Layer",
          features: [
            "Entry into verified professional ecosystem",
            "Platform-level quality control",
            "Standard support ticket system",
          ],
        },
        {
          heading: "Visibility Level",
          features: ["Entry-level visibility to startups", "Basic discoverability within ecosystem"],
        },
      ],

      buttonText: "Start Exploring",
    },
    {
      title: "Most Popular Plan",
      titleBg: "#BA1E1E",
      titleBg2: "#B77070",
      amount: 9999,
      amountduration: "(one-time) ",
      amountDesc: "Recoverable with just 1–2 client conversions",
      planName: "Professional Plan",
      planDesc: "For professionals ready to unlock consistent client opportunities",
       network1:"Deal Flow Access",
      network2:"Full Access",
      network3:"Priority Support",
      sections: [
        {
          heading: "Core Access",
          features: [
            "Profile creation & enhanced visibility",
            "Access to unified dashboard",
            "Receive curated client requests from startups",
            "Send & accept connection requests",
            "Participate in complete deal workflows",
          ],
        },

        {
          heading: "Deal & Execution System",
          features: [
            "Active deals management across clients",
            "Milestone-based execution tracking",
            "Negotiation interface access",
            "Documentation handling",
            "Payment workflow visibility",
            "Dispute resolution system",
          ],
        },
        {
          heading: "Opportunity Access",
          features: [
            "Receive more frequent & relevant client requests",
            "Full access to detailed requirement insights",
            "Increased visibility in startup discovery",
            "Access to active opportunity sections",
            "Priority access to incoming requests",
            "Higher chances of client conversion",
          ],
        },
        {
          heading: "Trust Layer",
          features: [
            "Verified startup ecosystem access",
            "Platform-level quality control",
            "Priority support ticket system",
          ],
        },
        {
          heading: "Visibility Level",
          features: [
            "Enhanced listing visibility across platform",
            "Improved discoverability in service listings",
          ],
        },
      ],

      buttonText: "Start Getting Clients",
    },
    // {
    //   title: "Outcome Driven",
    //   titleBg: "#119BCD",
    //   titleBg2: "#61C9EF",
    //   amount: 19999,
    //   amountduration: "/year",
    //   amountDesc: "Visibility + deal flow enhancement",
    //   amountButton: "Everything in Access +",
    //   planName: "Growth Plan",
    //   recommendedPlan: "(Recommended)",
    //   planDesc: "For professionals seeking consistent deal flow",
    //   sections: [
    //     {
    //       heading: "Visibility Boost",
    //       features: [
    //         "Priority in startup service requests",
    //         "Higher ranking in service listings",
    //         "Increased exposure across platform",
    //         "Improved positioning in search",
    //       ],
    //     },
    //     {
    //       heading: "Deal Advantage",
    //       features: [
    //         "Increased chances of being selected",
    //         "Better exposure to active & high-intent startups",
    //         "Faster interaction visibility",
    //       ],
    //     },
    //     {
    //       heading: "Revenue Scaling",
    //       features: [
    //         "Increased deal participation opportunities",
    //         "Stronger potential for recurring client flow",
    //       ],
    //     },
    //   ],
    //   middleButton1: "Higher visibility",
    //   middleButton2: "More Onboarding",
    //   middleButton3: "More Commission",
    //   bottomSection: [
    //     {
    //       bottomButton: "  Increase Your Deal Flow",
    //       bottomPara:
    //         "Get more service requests, higher visibility, and increase your chances of closing deals",
    //     },
    //   ],

    //   buttonText: "Increase Your Deal Flow",
    // },
    // {
    //   title: "Authority & Scale",
    //   titleBg: "#FEC432",
    //   titleBg2: "#F2D795",
    //   amount: 49999,
    //   amountduration: "/year",
    //   amountDesc: "High visibility + authority positioning",
    //   amountButton: "Everything in Growth +",
    //   planName: "Authority Plan",
    //   planDesc: "For professionals building premium positioning",
    //   sections: [
    //     {
    //       heading: "Premium Positioning",
    //       features: [
    //         "Featured placement in professional listings",
    //         "Authority badge (credibility signal)",
    //         "Highlighted presence across platform",
    //       ],
    //     },
    //     {
    //       heading: "High-Value Access",
    //       features: [
    //         "Priority in high-ticket startup deals",
    //         "Better exposure to serious founders",
    //         "Stronger placement in deal ecosystem",
    //       ],
    //     },
    //     {
    //       heading: "Brand Advantage",
    //       features: [
    //         "Increased trust & perceived expertise",
    //         "Position as preferred ecosystem partner",
    //         "Stronger brand visibility within network"
    //       ],
    //     },
    //     {
    //       heading: "Revenue Expansion",
    //       features: [
    //         "Higher conversion chances from requests",
    //         "Increased channel partner earnings potential",
    //         "Access to higher-value opportunities"
    //       ],
    //     },
    //   ],
    //   bottomSection: [
    //     {
    //       bottomButton: "Attract High-Value Clients",
    //       bottomPara:
    //         "Position yourself as a trusted expert and get access to serious, high-intent startups",
    //     },
    //   ],

    //   buttonText: "Establish Your Authority",
    // },
  ];

  // ⭐ API Call
  const [submittingPlan, setSubmittingPlan] = useState(null);
  const handlePlanSelect = async (amount, planName) => {
  if (!resolvedUserId) {
    toast.error("User ID missing!");
    return;
  }

  const isFreePlan = !amount || amount === 0;
  setSubmittingPlan(planName);

  try {
    // ⭐ Always call API — free plan gets auto-approved on backend
    const payload = { userId: resolvedUserId, plan: { amount: amount || 0, planName } };
    const res = await axios.put(`${serverUrl}/user/plan`, payload);

    if (res.status === 200) {
      if (isFreePlan) {
        // ⭐ Free plan — go directly to success, no scanner/payment needed
        navigate("/paymentsuccess", { state: { userId: resolvedUserId, planName, isFreePlan: true } });
      } else {
        navigate("/scanner", { state: { userId: resolvedUserId, amount, planName } });
      }
    }
  } catch (error) {
    console.error("Plan API Error:", error);
    toast.error(error.response?.data?.message || "Server error");
  } finally {
    setSubmittingPlan(null);
  }
};

  // ⭐ Scroll logic untouched
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    const onScroll = () => {
      const cardWidth = el.clientWidth;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(index);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  

  return (
    <main className="bg-background text-foreground ">
      <section className="mx-auto w-full lg:px-4  lg:py-7">
        <div className="lg:h-[62vh] lg:overflow-y-auto scrollbar-hide">
          <div
            ref={scrollRef}
            className="
                grid gap-2 lg:gap-2  grid-cols-1 md:grid-cols-2 lg:grid-cols-2
                
                w-full
              "
          >
            {cards.map((card, idx) => (
              <>
                <article
                  key={idx}
                  className="
                    w-full
                    lg:w-auto
                    shrink-0 lg:shrink 
                    snap-center 
                    lg:mr-0  
                    text-card-foreground
                    lg:h-full
                    py-1
                    
                  "
                >
                  <div className="bg-white py-5 lg:py-3 border-2 border-[#00103280] m-2 lg:m-1 rounded-sm px-4 lg:px-4 lg:h-full flex flex-col  shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)]">
                    <div className=" lg:mt-1 space-y-1.5 ">
                      <div
                        style={{
                          background: `linear-gradient(90deg, ${card.titleBg} 75%, ${card.titleBg2} 100%)`,
                        }}
                        className="text-white  py-1  rounded-sm  px-6 mb-4 lg:mb-3 lg:text-xs w-fit text-center"
                      >
                        {card.title}
                      </div>

                      <div className="pb-4 lg:pb-0">
                        <h3 className="text-3xl lg:text-xl font-semibold text-[#001032] ">
                          {card.planName}{" "}
                          <span className="text-[17px] font-semibold">
                            {card.recommendedPlan}
                          </span>
                        </h3>
                        <p className="text-xs lg:text-[10px] text-[#3C1D3A]">
                          {card.planDesc}
                        </p>
                      </div>
                      <div className="text-[#3C1D3A]">
                        <p className="lg:text-2xl text-3xl font-bold tracking-wide  ">
                          {card.amount ? `Rs ${card.amount}` : "Free"}
                          <span className="font-normal text-xl lg:text-[15px] ml-2">
                            {card.amount ? card.amountduration : ""}
                          </span>
                        </p>
                        <p className="text-sm lg:text-[10px]">
                          {card.amountDesc}
                        </p>
                        {card.amountButton && (
                          <>
                            <button className="bg-linear-to-r from-[#BA1E1E] from-70% to-[#B77070] w-full py-1 text-start px-2 text-sm text-white rounded-sm my-4">
                              {card.amountButton}
                            </button>
                            <hr />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="bg-[#0000001A] flex items-center justify-center text-[12px] lg:text-[10px] gap-2 px-2 py-1 rounded-sm mt-4 lg:mt-4">
                      <p className="">{card.network1}</p>
                      <div className="h-6 w-0.5 bg-[#8282825C]"></div>
                      <p>{card.network2}</p>
                      <div className="h-6 w-0.5 bg-[#8282825C]"></div>
                      <p>{card.network3}</p>
                    </div>
                    <hr className="mt-4" />

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

                    <div className="lg:mt-auto mt-3">
                      {card.bottomSection?.map((bottom, index) => (
                        <>
                          {card.middleButton1 && (
                            <div className="flex flex-col items-start border border-[#000000] rounded-sm mb-2 gap-4 p-3 px-4">
                              <button className="bg-[#FDFDFD] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] lg:w-36 w-46 p-1 text-xs rounded-sm">
                                {card.middleButton1}
                              </button>
                              <button className="bg-[#FDFDFD] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] lg:w-36 w-46 p-1 text-xs rounded-sm ml-20">
                                {card.middleButton2}
                              </button>
                              <button className="bg-[#FDFDFD] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] lg:w-36 w-46 p-1 text-xs rounded-sm">
                                {card.middleButton3}
                              </button>
                            </div>
                          )}
                          <div
                            key={index}
                            className="bg-[#FFF7D6] h-40  shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-sm p-2 px-2"
                          >
                            <button className=" w-fit  text-start text-sm rounded-sm bg-[#FFE4E6] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] px-4 py-1 mb-5 text-[#B42318] font-medium">
                              {bottom.bottomButton}
                            </button>
                            <p className="lg:text-[14px] ">
                              {bottom.bottomPara}
                            </p>
                          </div>
                        </>
                      ))}
                    </div>

                    {/* ⭐ ONLY BACKEND CONNECTED — DESIGN SAME */}
                    <div className=" mt-2  lg:mt-1 lg:pt-1 text-center">
                      <button
                        className="
                         w-full
                        
                        p-2 lg:p-1
                        mx-auto 
                        rounded-sm bg-[#002A30] 
                        text-background text-md 
                       
                        hover:opacity-90
                        disabled:opacity-70 disabled:cursor-not-allowed
                      "
                        onClick={() =>
                          handlePlanSelect(card.amount, card.planName)
                        }
                        disabled={submittingPlan !== null}
                      >
                        {submittingPlan === card.planName ? (
                          <div className="flex items-center justify-center gap-2">
                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                             Processing...
                          </div>
                        ) : (
                          card.buttonText
                        )}
                      </button>
                    </div>
                  </div>
                </article>
                <hr className="lg:hidden mx-6" />
              </>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceProfessionalPlanSec;
