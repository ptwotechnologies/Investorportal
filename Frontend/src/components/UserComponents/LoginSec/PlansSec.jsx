import React, { useRef, useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "@/App";

const PlansSec = ({ userId }) => {
  const navigate = useNavigate();

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
        "Connecting with Investors",
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
      planName: "Elite Plan",
      heading1: "Support & Guidance + All in Pro Plan &",
      heading2: "Network & Growth",
      features: [
        "2 Consultation sessions per month",
        "Access to the verified service professinals",
      ],
      features2: [
        "Access to the Communities",
        "Enrollment in Business Incubation",
        "Access to the Multiple Portals",
      ],
      buttonText: "Start with Elite",
    },
  ];

  // ⭐ API Call
  const handlePlanSelect = async (amount) => {
    if (!userId) {
      alert("User ID missing!");
      return;
    }

    try {
      const payload = {
        userId,
        plan: { amount },
      };

      const res = await axios.put(`${serverUrl}/user/plan`, payload);

      if (res.status === 200) {
        navigate("/scanner", { state: { userId } });
      }
    } catch (error) {
      console.error("Plan API Error:", error);
      alert(error.response?.data?.message || "Server error");
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
      <section className="mx-auto w-full lg:px-2  lg:py-7">
       <div className="lg:h-[62vh] lg:overflow-y-auto scrollbar-hide">
         <div
          ref={scrollRef}
          className="
            grid gap-2 lg:gap-2  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
            
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
                <div className="bg-white py-5 lg:py-3 border-2 border-[#00103280] m-4 lg:m-1 rounded-sm px-4 lg:px-2 lg:h-full flex flex-col  shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)]">
                  <div className=" lg:mt-1 space-y-1.5 ">
                    <div
                      style={{
                        background: `linear-gradient(90deg, ${card.titleBg} 75%, ${card.titleBg2} 100%)`,
                      }}
                      className="text-white  py-1  rounded-sm w-fit px-4 lg:px-2 mb-4 lg:mb-3 lg:text-xs"
                    >
                      {card.title}
                    </div>

                    <div className="pb-4 lg:pb-0">
                      <h3 className="text-3xl lg:text-lg font-semibold text-[#001032] ">
                        {card.planName}
                      </h3>
                      <p className="text-sm lg:text-[10px] text-[#3C1D3A]">
                        For early-stage founders & businesses{" "}
                      </p>
                    </div>
                    <div className="text-[#3C1D3A]">
                      <p className="lg:text-lg text-3xl font-bold tracking-wide  ">
                        Rs {card.amount}
                        <span className="font-normal text-xl lg:text-md">
                          {card.amountduration}
                        </span>
                      </p>
                      <p className="text-sm lg:text-[10px]">Annual onboarding fee</p>
                    </div>
                  </div>
                  <div className="bg-[#0000001A] flex items-center text-xs lg:text-[9px] gap-2 px-2 py-1 rounded-sm mt-6 lg:mt-4">
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

                  <div className="mt-3 lg:mt-2 text-[#3C1D3A] ">
                    <h1 className="text-sm">What’s included?</h1>
                    <div>
                      <p className="my-3 lg:text-[10px] text-sm text-md font-medium bg-[#0000001A] px-2 py-1 rounded-sm">
                        {card.heading1}
                      </p>
                      <ul className="space-y-1 text-[#3C1D3A] text-sm lg:text-[10px]">
                        {card.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 ">
                            <IoMdCheckmark className="h-5 w-5 text-primary mt-1" />
                            <span className="lg:text-xs text-md">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="my-5 lg:my-2 lg:text-[10px] text-sm text-md font-medium bg-[#0000001A] px-2 py-1 rounded-sm">
                        {card.heading2}
                      </p>
                      <ul className="space-y-1 text-[#3C1D3A] text-sm  lg:text-[10px]">
                        {card.features2.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <IoMdCheckmark className="h-5 w-5 text-primary mt-1" />
                            <span className="lg:text-xs text-md">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ⭐ ONLY BACKEND CONNECTED — DESIGN SAME */}
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
                      onClick={() => handlePlanSelect(card.amount)}
                    >
                      {card.buttonText}
                    </button>
                  </div>
                </div>
              </article>
              <hr className="lg:hidden mx-6" />
            </>
          ))}

         <div className="hidden lg:block">
           <div className="bg-white  border-2 border-[#00103280]  lg:mt-2 rounded-sm  p-3 h-[72vh] w-[37vw] ml-1 px-7 shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)]">
           <div id="top" className="flex justify-between items-center ">
            <div className="bg-[#5DD2E3] w-37 h-60 rounded-3xl">

            </div>
            <div className="bg-[#C2D3D5]  w-37 h-80 rounded-3xl">

            </div>
            <div className="bg-[#4A66A3]  w-37 h-70 rounded-3xl mt-20">

            </div>


           </div>
           <div id="bottom">
               <div className="bg-[#DBDBDB] w-full h-8 rounded-full mt-25">

               </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </section>
    </main>
  );
};

export default PlansSec;
