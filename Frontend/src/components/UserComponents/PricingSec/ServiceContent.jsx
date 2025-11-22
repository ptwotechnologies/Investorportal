import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";

const DevelopmentContent = () => {

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = React.useRef(null);

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
  ];

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.scrollWidth / cards.length;
    const index = Math.round(container.scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  return (
    <section className="mx-auto w-full md:py-16">

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="lg:grid lg:gap-5 grid-cols-1 lg:grid-cols-3 lg:w-full mx-auto flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {cards.map((card, idx) => (
          <article key={idx} className="w-full my-4 lg:my-0 lg:p-6 text-card-foreground shrink-0 lg:shrink snap-center">
            
            <div className={`h-2 lg:h-1.5 w-full lg:w-[90%] ${card.accent}`} />

            <div className="mt-8 lg:mt-4 space-y-1.5 px-3">
              <h3 className="text-3xl lg:text-lg font-bold text-[#001032] pb-4 lg:pb-0">{card.title}</h3>
              <p className="text-sm leading-6 text-[#3C1D3A]">{card.blurb}</p>
            </div>

            <div className="mt-10 lg:mt-6 text-[#3C1D3A] px-3">
              <p className="text-2xl font-semibold">
                {card.priceMain}{" "}
                <span className="align-baseline text-sm font-normal">{card.priceSub}</span>
              </p>

              <div className="mt-2 space-y-1">
                {card.notes.map((n, i) => (
                  <p key={i} className="text-xs">{n}</p>
                ))}
              </div>

              <div className="mt-8 mb-10 lg:mb-0 lg:mt-4 space-y-1.5 text-[#3C1D3A]">
                {card.meta.map((m, i) => (
                  <p key={i} className="text-xs">
                    <span className="font-medium">{m.label}:</span> {m.value}
                  </p>
                ))}
              </div>
            </div>

            <hr className="my-6 border-border" />

            <div className="px-3">
              <p className="mb-6 lg:mb-3 text-sm font-medium">Features</p>
              <ul className="space-y-3 text-[#3C1D3A]">
                {card.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex">
                      <IoMdCheckmark className="h-4 w-4 text-primary" />
                    </span>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex">
                    <CgAsterisk className="h-5 w-5" />
                  </span>
                  <span className="text-md leading-5 mb-8 lg:mb-0">{card.footnote}</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 px-3 text-center">
              <button
                type="button"
                className="w-full lg:w-[90%] mt-7 h-10 rounded-sm bg-[#001032] text-background text-md font-medium transition hover:opacity-90"
              >
                Get started
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Scroll Dots */}
      <div className="flex justify-center mt-4 gap-2 lg:hidden">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              currentIndex === i ? "bg-[#001032]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default DevelopmentContent;
