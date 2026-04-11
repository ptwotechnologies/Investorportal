import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const DesigningContent = () => {
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
      navigate("/paymentsuccess", {
        state: { userId, planName, isFreePlan: true },
      });
      return;
    }

    // ✅ Paid plan - Direct to Razorpay (no backend API call)
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
      amountDesc: "Discover opportunities before unlocking full access",
      planName: "Explorer Access",
      planDesc: "Experience how the Copteno ecosystem works",
      network1: "Execution Network",
      network2: "Limited Access",
      network3: "Standard Support",
      sections: [
        {
          heading: "Core Access",
          features: [
            "Startup profile creation & guided onboarding",
            "Access to unified dashboard",
            "Ability to raise 1 structured requirement",
            "Requirement validation & activation support",
            "Access to managed matching system",
            "Curated responses from relevant professionals",
          ],
        },
        {
          heading: "Deal & Execution System",
          features: [
            "Initiate 1 deal flow",
            "Milestone-based execution tracking(limited)",
            "Negotiation interface(preview)",
            "Documentation handling(visibility)",
            "Payment workflow visibility",
            "Dispute resolution system",
          ],
        },
        {
          heading: "Opportunity Preview (Investor Layer)",
          features: [
            "See potential investor match count",
            "View limited investor categories",
            "Blurred preview of investor profiles",
            "Visibility into funding alignment indicators",
            "Limited access to investor-related sections",
            "Unlock investor visibility & connections",
            "X investors aligned with your profile",
          ],
        },
        {
          heading: "Trust Layer",
          features: [
            "Entry into verified execution ecosystem",
            "Platform-level quality control",
            "Support ticket system",
          ],
        },
        {
          heading: "Visibility Level",
          features: [
            "Requirement-based visibility within ecosystem",
            "Entry-level exposure to service professionals",
          ],
        },
      ],

      buttonText: "Start Exploring",
    },
    {
      title: "Most Affordable Plan",
      titleBg: "#BA1E1E",
      titleBg2: "#B77070",
      amount: 9999,
      amountduration: "/year",
      amountDesc: "Annual onboarding access",
      planName: "Foundation Plan",
      planDesc: "For early-stage startups entering the ecosystem",
      sections: [
        {
          heading: "Core Access",
          features: [
            "Startup profile creation & visibility",
            "Access to unified dashboard",
            "Send & receive investor connection request",
            "Raise service requirements",
            "Access verified service professionals",
            "Participate in deal workflows",
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
          heading: "Trust Layer",
          features: [
            "Verified professional ecosystem access",
            "Platform-level quality control",
            "Support ticket system",
          ],
        },
        {
          heading: "Visibility Level",
          features: ["Standard listing visibility", "Basic discoverability"],
        },
      ],

      buttonText: "Enter the Ecosystem",
    },
    {
      title: "Starter Growth Plan",
      titleBg: "#119BCD",
      titleBg2: "#61C9EF",
      amount: 19999,
      amountduration: "/year",
      amountDesc: "Enhanced visibility & positioning",
      amountButton: "Everything in Foundation +",
      planName: "Growth Plan",
      recommendedPlan: "(Recommended)",
      planDesc: "For startups aiming to get noticed & build momentum",
      sections: [
        {
          heading: "Visibility Boost",
          features: [
            "Priority listing over foundation users",
            "Higher ranking in investor discovery",
            "Increased exposure in search & listings",
            "Improved positioning in connection requests",
          ],
        },
        {
          heading: "Investor Advantage",
          features: [
            "Higher probability of profile views",
            "Better placement during investor browsing",
            "Enhanced connection acceptance chances",
          ],
        },
        {
          heading: "Performance Edge",
          features: [
            "Visibility-based prioritization across platform",
            "Faster interaction visibility in ecosystem",
          ],
        },
      ],
      bottomSection: [
        {
          bottomButton: " Get Discovered Faster",
          bottomPara:
            "Start appearing ahead of other startups and increase your chances of investor attention.",
        },
      ],

      buttonText: "Increase Your Visibility",
    },
    {
      title: "Founder Pro Plan",
      titleBg: "#FEC432",
      titleBg2: "#F2D795",
      amount: 49999,
      amountduration: "/year",
      amountDesc: "High visibility + strong positioning",
      amountButton: "Everything in Growth +",
      planName: "Scale Plan",
      planDesc: "For startups actively raising & closing deals",
      sections: [
        {
          heading: "Premium Positioning",
          features: [
            "Featured startup placement",
            "Premium credibility badge",
            "Highlighted presence across platform",
          ],
        },
        {
          heading: "Connection Priority",
          features: [
            "Higher priority in investor interactions",
            "Stronger placement in deal ecosystem",
            "Better exposure to serious stakeholders",
          ],
        },
        {
          heading: "Ecosystem Advantage",
          features: [
            "Increased visibility in high-intent sections",
            "Stronger brand perception within platform",
          ],
        },
      ],
      bottomSection: [
        {
          bottomButton: "Drive Real Traction",
          bottomPara:
            "Position your startup as a serious player and attract stronger investor interest",
        },
      ],

      buttonText: "Accelerate Your Growth",
    },
    {
      title: "Elite Founder Plan",
      titleBg: "#108349",
      titleBg2: "#49CE8B",
      amount: 99999,
      amountduration: "/year",
      amountDesc: "Top-tier positioning & visibility",
      amountButton: "Everything in Scale +",
      planName: "Elite Plan",
      planDesc: "For startups seeking maximum exposure & dominance",
      sections: [
        {
          heading: "Maximum Visibility",
          features: [
            "Top placement across platform",
            "Highest discovery priority",
            "Dominant presence in listings",
          ],
        },
        {
          heading: "Investor Exposure",
          features: [
            "Maximum visibility to investors",
            "Strongest positioning in connection ecosystem",
          ],
        },
        {
          heading: "Strategic Advantage",
          features: [
            "Priority across all interaction layers",
            "Early access to upcoming premium features",
          ],
        },
      ],
      bottomSection: [
        {
          bottomButton: "  Dominate Visibility",
          bottomPara:
            "Be among the first startups investors see and maximize your exposure across the platform",
        },
      ],

      buttonText: "Lead the Ecosystem",
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

                <div className="bg-[#0000001A] flex items-center text-[10px] lg:gap-4 pl-6 gap-2 px-2 py-1 rounded-sm mt-6 lg:mt-4">
                  <p className="">Investor Network</p>
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
                          <li key={i} className="flex items-start gap-2">
                            <IoMdCheckmark className="h-5 w-5 text-primary mt-1" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="lg:mt-auto mt-3">
                  {card.bottomSection?.map((bottom, index) => (
                    <div
                      key={index}
                      className="bg-[#FFF7D6] h-40 lg:h-50 shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-sm p-2 px-2"
                    >
                      <button className=" w-fit  text-start lg:text-[20px] text-sm rounded-sm bg-[#FFE4E6] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] px-4 py-1 mb-5 text-[#B42318] font-medium">
                        {bottom.bottomButton}
                      </button>
                      <p className="lg:text-[20px] ">{bottom.bottomPara}</p>
                    </div>
                  ))}
                </div>

                <div className=" lg:mt-1 pt-3 lg:pt-1 text-center">
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

          <div className="hidden lg:block mx-7">
            <hr className="mx-6   " />
            <div className="bg-white  border-2 border-[#00103280] mt-7 h-[94.5%]  rounded-sm  p-3    shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)]">
              <div id="top" className="flex justify-between items-center ">
                <div className="bg-[#5DD2E3] w-27 h-140 rounded-3xl"></div>
                <div className="bg-[#C2D3D5]  w-27 h-160 rounded-3xl"></div>
                <div className="bg-[#4A66A3]  w-27 h-150 rounded-3xl mt-20"></div>
              </div>
              <div id="bottom">
                <div className="bg-[#DBDBDB] w-full h-12 rounded-full mt-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DesigningContent;
