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
      amount: 3500,   // ⭐ Add amount for API
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
      amount: 5000,
      accent: "bg-[#BA1E1E]",
      title: "Onboarding Prices",
      blurb: "Best for funds under $5M",
      priceMain: "$5k + 1%",
      priceSub: "of fund size",
      notes: ["annualized cost"],
      meta: [
        { label: "Investments", value: "25" },
        { label: "State Regulatory Fees", value: "Variable" },
      ],
      features: ["Fund admin", "Legal compliance"],
      footnote: "Pricing may vary with add-on services",
    },
    {
      amount: 7000,
      accent: "bg-[#BA1E1E]",
      title: "Onboarding Prices",
      blurb: "Best for growing funds",
      priceMain: "$7k + 1.2%",
      priceSub: "of fund size",
      notes: ["annualized cost"],
      meta: [
        { label: "Investments", value: "35" },
        { label: "State Regulatory Fees", value: "Variable" },
      ],
      features: ["Advanced reporting", "Fund admin"],
      footnote: "Pricing may vary with add-on services",
    },
    {
      amount: 10000,
      accent: "bg-[#BA1E1E]",
      title: "Onboarding Prices",
      blurb: "Best for large funds",
      priceMain: "$10k + 1.5%",
      priceSub: "of fund size",
      notes: ["annualized cost"],
      meta: [
        { label: "Investments", value: "50+" },
        { label: "State Regulatory Fees", value: "Variable" },
      ],
      features: ["Full suite admin", "Legal + compliance"],
      footnote: "Pricing may vary with add-on services",
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
    <main className="bg-background text-foreground">
      <section className="mx-auto w-full lg:px-2 lg:py-7">

        <div
          ref={scrollRef}
          className="
            grid gap-10 lg:gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
            
            w-full
          "
        >
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="
                w-full
                lg:w-auto
                shrink-0 lg:shrink 
                snap-center 
                lg:mr-0 lg:p-1 
                text-card-foreground
              "
            >
             

              <div className="bg-[#6E5C3B] p-2 lg:p-1 ">
               <div className="bg-white py-3">
                 <div className=" lg:mt-1 space-y-1.5 text-center">
                <h3 className="text-3xl lg:text-sm font-bold text-[#001032] pb-4 lg:pb-0">
                  {card.title}
                </h3>
                <p className="lg:text-xs text-md tracking-wide text-[#3C1D3A] mx-auto w-[85%]">
                  {card.blurb}
                </p>
              </div>

              <div className="mt-5 lg:mt-2 text-[#3C1D3A] px-6 lg:px-5">
                <p className="lg:text-xs text-2xl">
                  {card.priceMain}{" "}
                  <span className="lg:text-xs text-sm font-normal">
                    {card.priceSub}
                  </span>
                </p>

                {card.notes.map((n, i) => (
                  <p key={i} className="lg:text-xs text-md">
                    {n}
                  </p>
                ))}

                <div className="mt-8 mb-10 lg:mb-0 lg:mt-2">
                  {card.meta.map((m, i) => (
                    <p key={i} className="lg:text-xs text-md">
                      <span className="font-medium">{m.label}: </span>{m.value}
                    </p>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              <div className="px-6 lg:px-5">
                <p className="mb-6 lg:mb-3 lg:text-xs text-md font-medium">Features</p>

                <ul className="space-y-1 text-[#3C1D3A]">
                  {card.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <IoMdCheckmark className="h-5 w-5 text-primary mt-1" />
                      <span className="lg:text-xs text-md">{f}</span>
                    </li>
                  ))}

                  <li className="flex items-start gap-2 mt-6 lg:mt-0">
                    <CgAsterisk className="h-6 w-6 mt-1" />
                    <span className="lg:text-xs text-md leading-5">
                      {card.footnote}
                    </span>
                  </li>
                </ul>
              </div>

              <hr />

              {/* ⭐ ONLY BACKEND CONNECTED — DESIGN SAME */}
              <div className="px-2 text-center">
                <button
                  className="
                    w-[95%] lg:w-full
                    mt-2 lg:mt-3
                    p-2 lg:p-1
                    mx-auto 
                    rounded-sm bg-[#001032] 
                    text-background text-md 
                    font-medium
                    hover:opacity-90
                  "
                  onClick={() => handlePlanSelect(card.amount)}
                >
                  Select
                </button>
              </div>
               </div>
              </div>
            </article>
          ))}
        </div>

      
      </section>
    </main>
  );
};

export default PlansSec;
