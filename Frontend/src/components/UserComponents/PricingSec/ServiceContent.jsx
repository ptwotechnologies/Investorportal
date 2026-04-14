import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DevelopmentContent = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = React.useRef(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handlePlanSelect = (amount, planName) => {
    // ✅ Agar user login nahi hai
    if (!userId) {
      navigate("/login");
      return;
    }

    // ✅ Free plan
    if (!amount || amount === 0) {
      toast.success("You are already logged in");
      navigate("/dashboard");
      return;
    }

    // ✅ Paid plan - Direct to Razorpay
    navigate("/scanner", {
      state: { userId, amount, planName },
    });
  };

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
          className="grid gap-2 lg:gap-2  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full"
        >
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="lg:w-auto w-screen shrink-0 snap-center  lg:mr-0 lg:p-6 text-card-foreground"
            >
              <hr className="mx-4 lg:relative lg:bottom-5" />
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
                  <p className="text-sm  text-[#3C1D3A]">{card.planDesc}</p>
                </div>

                <div className="text-[#3C1D3A]">
                  <p className="lg:text-2xl text-3xl font-bold tracking-wide lg:mt-3">
                    {card.amount ? `Rs ${card.amount}` : "Free"}
                    <span className="font-normal text-xl lg:text-md">
                      {card.amount ? card.amountduration : ""}
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
                              <button className="bg-[#FDFDFD] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] lg:w-56 w-46 p-1 text-xs lg:text-sm rounded-sm lg:ml-23 ml-25">
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

                <div className="  lg:mt-1 pt-3 lg:pt-1 text-center">
                  <button
                    onClick={() =>
                      handlePlanSelect(card.amount, card.planName)
                    }
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
                </div>
              </div>
            </article>
          ))}

          {/* <div className="hidden lg:block col-span-2 mx-6">
            <hr className="mx-6   " />
            <div className="bg-white  border-2 border-[#00103280] mt-7 h-[95.5%]  rounded-sm  p-3   px-20 shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)]">
              <div id="top" className="flex justify-between items-center ">
                <div className="bg-[#5DD2E3] w-47 h-140 rounded-3xl"></div>
                <div className="bg-[#C2D3D5]  w-47 h-160 rounded-3xl"></div>
                <div className="bg-[#4A66A3]  w-47 h-150 rounded-3xl mt-20"></div>
              </div>
              <div id="bottom">
                <div className="bg-[#DBDBDB] w-full h-12 rounded-full mt-40"></div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </main>
  );
};

export default DevelopmentContent;
