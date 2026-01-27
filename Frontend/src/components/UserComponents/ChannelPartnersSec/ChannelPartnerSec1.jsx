import React, { useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { BsBoxArrowInUpRight } from "react-icons/bs";

const ChannelPartnerSec1 = () => {
  const scrollRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const scrollWidth = scrollRef.current.scrollWidth;
    const clientWidth = scrollRef.current.clientWidth;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const cardData = [
    {
      heading: "AI Understands Your Brief",
      text: "The process felt human, even though it’s AI-driven. The brief understanding was spot-on, and the quality of connections was miles ahead of typical marketplaces. It’s built for people who value real work over noise.",
      line1: "Join once,",
      line2: "Let the ecosystem work for you",
    },
    {
      heading: "Get 3 Perfect Matches",
      text: "I used to spend hours sending proposals that went nowhere. Through this platform, I started getting real, qualified leads who were actually ready to move. The 90-day partnership helped me grow my client base and confidence.",
      line1: "Join once,",
      line2: "Let the ecosystem work for you",
    },
    {
      heading: "Human Support Throughout",
      text: "I used to spend hours sending proposals that went nowhere. Through this platform, I started getting real, qualified leads who were actually ready to move. The 90-day partnership helped me grow my client base and confidence.",
      line1: "Join once,",
      line2: "Let the ecosystem work for you",
    },
  ];

  return (
    <div className=" lg:mb-20 lg:mt-30 mt-4 lg:p-2.5 lg:border border-[#b5b3b3] bg-[#E5E5E5] rounded-4xl ">
      <div className="lg:border border-[#E5E5E5] lg:p-7 px-2 bg-white rounded-4xl lg:py-25 py-10">
        <div id="top" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="px-4">
              <h1 className="lg:text-6xl text-4xl font-medium text-[#001032] lg:mb-7 mb-2 mt-6 leading-tight">
                Register as <br /> channel partner
              </h1>

              <p className="text-[#001032] lg:mb-7 mb-5 lg:text-2xl lg:w-[80%]  text-md leading-6">
                Our experts in Artestor will support you and solve your queries
                in multiple domains:
              </p>

              <ul className="space-y-2 text-[#001032]">
                <div className="flex items-center gap-3">
                  <FaCircleCheck />
                  <h1 className="lg:text-xl text-md">Startups</h1>
                </div>
                <div className="flex items-center gap-3">
                  <FaCircleCheck />
                  <h1 className="lg:text-xl text-md">Service Professionals</h1>
                </div>
                <div className="flex items-center gap-3">
                  <FaCircleCheck />
                  <h1 className="lg:text-xl text-md">Investors</h1>
                </div>
                <div className="flex items-center gap-3">
                  <FaCircleCheck />
                  <h1 className="lg:text-xl text-md">Channel Partners</h1>
                </div>
              </ul>

              <p className="lg:mt-10 mt-6 text-[#001032] lg:text-2xl text-md tracking-wide lg:leading-8 lg:w-[87%] mb-10">
                Get the benefits of channel partners and connect with 50+
                investors and 500+ startups and 200+ service professionals
              </p>

              {/* boxes */}
              <div className="grid grid-cols-4 gap-3 mt-6 lg:w-[80%] mb-6 lg:mb-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="h-15 border border-gray-400 rounded-md"
                  />
                ))}
              </div>

              <div className="hidden lg:block">
                <p className="mt-6 text-md text-[#001032] flex items-center gap-1 ">
                  Looking for pricing and benefits
                  <span className="underline cursor-pointer flex items-center gap-1">
                    {" "}
                    Explore Auxiliaries{" "}
                    <BsBoxArrowInUpRight size={20} className="mt-2" />
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div
            id="form"
            className="p-2.5 border-3 rounded-xl border-[#E4E4E4]  shadow-[inset_0px_0px_4px_rgba(0,0,0,1)]"
          >
            <div className="bg-white rounded-xl border-3 border-[#E4E4E4] lg:p-10 px-3 py-5 shadow-[0px_0px_4px_rgba(0,0,0,1)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="p-3 lg:py-6 border rounded-lg"
                  placeholder="First name"
                />
                <input
                  className="p-3 lg:py-6 border rounded-lg"
                  placeholder="Last name"
                />
              </div>

              <input
                className="p-3 lg:py-6 border rounded-lg w-full mt-4"
                placeholder="Work email address"
              />
              <input
                className="p-3 lg:py-6 border rounded-lg w-full mt-4"
                placeholder="Company name"
              />
              <input
                className="p-3 lg:py-6 border rounded-lg w-full mt-4"
                placeholder="Website"
              />

              <div className="mt-6 border p-3 lg:py-6 flex items-center lg:gap-3 gap-1">
                <div className="w-[80%]">
                  <p className="text-[#002B31] tracking-wider leading-5 font-medium lg:text-md text-sm ">
                    Are you already registered as Service Professional?
                  </p>
                  <p className="text-[#1D2A29CC] tracking-wider leading-4 text-[10px] lg:text-sm">
                    Register yourself as service professional before applying to
                    be a channel partner
                  </p>
                </div>

                <div className="flex flex-col items-center lg:gap-4 gap-3 w-[20%]">
                  <label className="  text-gray-700 ">
                    <input type="radio" name="reg" /> Yes
                  </label>
                  <label className=" text-gray-700 ">
                    <input type="radio" name="reg" /> No
                  </label>
                </div>
              </div>

              {/* Terms */}
              <div className="lg:mt-20 mt-10 lg:mb-5 mb-10 text-[#1D2A29CC]">
                <p className="tracking-wide lg:leading-7 text-sm lg:text-md mb-2 lg:mb-0">
                  By clicking, you agree to our Term and Conditions to be a
                  channel partner.
                </p>
                <div className="flex lg:items-center items-start lg:gap-3 gap-1">
                  <input type="checkbox" className="mt-1 lg:mt-0" />
                  <span className=" tracking-wide text-sm lg:text-md">
                    I have read all the terms and conditions and I’m ready to be
                    a channel partner.
                  </span>
                </div>
              </div>

              <button className="mt-6 lg:mb-35 mb-20 bg-[#001032] text-white px-8 py-3 rounded-sm text-lg">
                Get Started
              </button>

              <p className="lg:text-[16px] text-[14px] text-[#1D2A29CC] ">
                Please note that this is an application to seek funding or other
                services for a new venture or business. By clicking "Get
                Started" you agree to Artestor’s Privacy Policy
              </p>
            </div>
          </div>
        </div>

        <div id="middle" className="lg:hidden  ">
          <h1 className=" text-xl text-[#001032] font-semibold px-5 my-10">
            Who can be the channel partner?
          </h1>

          <div className="shadow-xl border bg-white p-4 rounded-md mt-5 mx-3">
            <div className="bg-gray-200 w-full h-40 rounded-md"></div>

            <div>
              <p className="text-sm my-2">
                The process felt human, even though it’s AI-driven. The brief
                understanding was spot-on, The process felt human, even though
                it’s AI-
              </p>
              <div className="flex justify-between items-center mt-9 text-sm">
                <div>
                  <p>The process felt </p>
                  <p>human, even</p>
                </div>
                <button className="bg-[#001032] text-white px-4 py-2 rounded-sm">
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <hr className="my-6 mx-6 " />
          <div className="shadow-xl border bg-white p-4 rounded-md  mx-3">
            <div className="bg-gray-200 w-full h-40 rounded-md"></div>

            <div>
              <p className="text-sm my-2">
                The process felt human, even though it’s AI-driven. The brief
                understanding was spot-on, The process felt human, even though
                it’s AI-
              </p>
              <div className="flex justify-between items-center mt-9 text-sm">
                <div>
                  <p>The process felt </p>
                  <p>human, even</p>
                </div>
                <button className="bg-[#001032] text-white px-4 py-2 rounded-sm">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <hr className="my-6 mx-6 " />
          <div className="shadow-xl border bg-white p-4 rounded-md  mx-3">
            <div className="bg-gray-200 w-full h-40 rounded-md"></div>

            <div>
              <p className="text-sm my-2">
                The process felt human, even though it’s AI-driven. The brief
                understanding was spot-on, The process felt human, even though
                it’s AI-
              </p>
              <div className="flex justify-between items-center mt-9 text-sm">
                <div>
                  <p>The process felt </p>
                  <p>human, even</p>
                </div>
                <button className="bg-[#001032] text-white px-4 py-2 rounded-sm">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="bottom" className="lg:mt-30 lg:px-10 ">
          <h1 className="lg:hidden text-xl text-[#001032] font-semibold px-5 my-10">
            Experience to be remembered
          </h1>

          <div
            className="
    flex lg:grid
    lg:grid-cols-3 lg:items-stretch
    lg:gap-x-25
    gap-8
    mt-8 px-2
    overflow-x-auto lg:overflow-visible
    space-x-1 lg:space-x-0
    scrollbar-hide
    snap-x snap-mandatory
  "
            onScroll={handleScroll}
            ref={scrollRef}
          >
            {cardData.map((card, index) => (
              <div
                key={index}
                className="min-w-full lg:min-w-0  lg:px-0 snap-center h-full flex flex-col"
              >
                {/* HR — keep it here */}
                <hr className="border-t-[#00103299] mb-10 hidden lg:block" />

                <div
                  className="
            bg-white border border-gray-200 rounded-md 
            lg:p-6 p-3 
            flex flex-col justify-between
            mx-2 lg:mx-0
            shadow-[0_4px_30px_rgba(0,0,0,0.12)]
            h-full
          "
                >
                  <h1 className="text-[#001032] font-semibold mt-3 mb-7 lg:hidden">
                    {card.heading}
                  </h1>
                  <p className="text-[#001032] lg:pb-30 pb-5 lg:text-lg text-[14px] tracking-wide lg:leading-7">
                    {card.text}
                  </p>

                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <p className="text-[#001032] font-semibold text-sm lg:text-md">
                        {card.line1}
                      </p>
                      <p className="font-semibold text-[#001032] text-sm lg:text-md">
                        {card.line2}
                      </p>
                    </div>

                    <div className="h-15 w-0.5 bg-[#00000033] mx-1"></div>

                    <div className="lg:w-20 lg:h-20 w-18 h-18 lg:bg-[#001032] bg-[#00103233] rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 lg:hidden">
            {cardData.map((item, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  activeIndex === index ? "bg-gray-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelPartnerSec1;
