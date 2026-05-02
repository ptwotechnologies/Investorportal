import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "@/App";

const DesigningContent = ({ isUpgradeFlow }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = React.useRef(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [userPlanAmount, setUserPlanAmount] = React.useState(0);

  React.useEffect(() => {
    if (isUpgradeFlow) {
      const fetchPlan = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${serverUrl}/user/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserPlanAmount(res.data.plan?.amount || 0);
        } catch (err) {
          console.error("Error fetching plan:", err);
        }
      };
      fetchPlan();
    }
  }, [isUpgradeFlow]);

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
      amount: 0,
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
      title: "Best for Early-Stage Startups",
      titleBg: "#BA1E1E",
      titleBg2: "#B77070",
      amount: 9999,
      amountduration: "(one-time)",
      amountDesc: "Where startups begin getting discovered by investors",
      planName: "Investor Gateway Plan",
      planDesc: "For early-stage startups entering the ecosystem",
      network1:"Investor Network",
      network2:"Full Access",
      network3:"Priority Support",
      sections: [
        {
          heading: "Core Access",
          features: [
            "Startup profile creation & visibility",
            "Access to unified dashboard",
            "Receive investor interest & connections",
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
          heading: "Investor Access",
          features: [
            "Startup listing visible to investor network",
            "Inclusion in investor discovery layer",
            "Opportunity to receive inbound investor interest",
            "Visibility during investor exploration",
            "Access to investor-focused ecosystem sections",
            "Increased chances of investor attention",
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
          features: ["Enhanced listing visibility across ecosystem", "Improved discoverability in investor & deals"],
        },
      ],

      buttonText: "Unlock Investor Access",
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
            "Better exposure to serious founders",
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

  const cardsToDisplay = React.useMemo(() => {
    if (!isUpgradeFlow) return cards;
    
    const currentAmount = Number(userPlanAmount) || 0;
    const currentIdx = cards.findIndex(c => (c.amount || 0) === currentAmount);
    
    if (currentIdx === -1) return [cards[0], cards[1]];
    return cards.slice(currentIdx, currentIdx + 2);
  }, [isUpgradeFlow, userPlanAmount]);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.scrollWidth / cardsToDisplay.length;
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
          className={`grid gap-4 lg:gap-8 w-full justify-center mx-auto ${
            cardsToDisplay.length === 1 ? 'grid-cols-1 max-w-md' : 
            cardsToDisplay.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-6xl' : 
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl'
          }`}
        >
          {cardsToDisplay.map((card, idx) => (
            <article
              key={idx}
              className="lg:w-full w-screen shrink-0 snap-center lg:mr-0 lg:p-6 text-card-foreground"
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
                    {isUpgradeFlow && (Number(card.amount) || 0) === Number(userPlanAmount)
                      ? (Number(userPlanAmount) === 0 ? "Current Plan (Free)" : "Current Plan")
                      : card.buttonText}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DesigningContent;
