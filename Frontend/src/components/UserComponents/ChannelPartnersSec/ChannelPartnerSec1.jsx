import React, { useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import axios from "axios";
import { serverUrl } from "../../../App";
import toast from "react-hot-toast";
import ChannelPartnerSec4 from "./ChannelPartnerSec4";


const ChannelPartnerSec1 = () => {
  const scrollRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    website: "",
    alreadyRegistered: false,
    termsAccepted: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "reg") {
      setFormData(prev => ({ ...prev, alreadyRegistered: value === "true" }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    if (!formData.alreadyRegistered) {
      toast.error("You must register as a Service Professional before applying to be a channel partner.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/channel-partner/submit`, formData);
      toast.success(response.data.message || "Application submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        website: "",
        alreadyRegistered: false,
        termsAccepted: false
      });
    } catch (error) {
      console.error("Submission error", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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
      text: "Instead of spending money on ads, pitching endlessly, or chasing unclear leads, plug into a system built for real, verified work. Together with a straightforward way to grow your practice with startups that are filtered and ready to move",
      line1: "Join once,",
      line2: "Let the ecosystem work for you",
    },
    {
      heading: "Get 3 Perfect Matches",
      text: "Instead of chasing random leads or wasting time on unqualified prospects, you receive a curated set of high-fit opportunities. Each match is aligned with your expertise and goals, helping you focus only on connections that have real potential to convert.",
      line1: "Join once,",
      line2: "Let the ecosystem work for you",
    },
    {
      heading: "Human Support Throughout",
      text: "Instead of figuring everything out alone or relying only on tools, you get consistent human guidance at every step. From onboarding to closing deals, experts support you with clarity, feedback, and real-world insight so you always move forward with confidence.",
      line1: "Join once,",
      line2: "Let the ecosystem work for you",
    },
  ];

  const images = [
    "/channelpartner1.png",
    "channelpartner2.png",
    "channelpartner14.png",
    "channelpartner4.png",
    "channelpartner5.png",
    "channelpartner6.png",
    "channelpartner7.png",
    "channelpartner10.png",
    "channelpartner9.png",
    "channelpartner8.png",
    "channelpartner11.png",
    "channelpartner12.png",
  ];

  return (
    <div className=" lg:mb-20 lg:mt-30 mt-4 lg:p-2.5 lg:border border-[#b5b3b3] bg-[#E5E5E5] rounded-4xl ">
      <div className="lg:border border-[#E5E5E5] lg:p-7 px-1 bg-white rounded-4xl lg:py-25 py-10">
        <div id="top" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="lg:px-4 px-2">
              <h1 className="lg:text-6xl text-4xl font-medium text-[#001032] lg:mb-7 mb-2 mt-6 leading-tight">
                Register as <br /> channel partner
              </h1>

              <p className="text-[#001032] lg:mb-7 mb-5 lg:text-2xl lg:w-[80%]  text-md leading-6">
                Our experts in Copteno will support you and solve your queries
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
              <div className="grid grid-cols-4 gap-2 lg:gap-3 mt-6 lg:w-[80%] mb-6 lg:mb-0">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="h-16 lg:h-20 rounded-md overflow-hidden border p-2 lg:p-4 flex items-center justify-center"
                  >
                    <img
                      src={img}
                      alt={`img-${i}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
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
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border-3 border-[#E4E4E4] lg:p-10 px-3 py-5 shadow-[0px_0px_4px_rgba(0,0,0,1)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-3 lg:py-6 border rounded-lg"
                  placeholder="First name"
                />
                <input
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-3 lg:py-6 border rounded-lg"
                  placeholder="Last name"
                />
              </div>

              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 lg:py-6 border rounded-lg w-full mt-4"
                placeholder="Work email address"
              />
              <input
                required
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="p-3 lg:py-6 border rounded-lg w-full mt-4"
                placeholder="Company name"
              />
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="p-3 lg:py-6 border rounded-lg w-full mt-4"
                placeholder="Website"
              />

              <div className="mt-6 border p-3 lg:py-6 flex items-center  justify-between lg:gap-3 gap-1 ">
                <div className="w-[80%]">
                  <p className="text-[#002B31] tracking-wider leading-5 font-medium lg:text-md text-sm ">
                    Are you already registered as Service Professional?
                  </p>
                  <p className="text-[#1D2A29CC] tracking-wider leading-4 text-[10px] lg:text-sm">
                    Register yourself as service professional before applying to
                    be a channel partner
                  </p>
                </div>

                <div className="flex flex-col items-start lg:gap-4 gap-3 lg:w-[10%] w-[15%] ml-3 ">
                  <label className="  text-gray-700 ">
                    <input type="radio" name="reg" value="true" checked={formData.alreadyRegistered === true} onChange={handleChange} /> Yes
                  </label>
                  <label className=" text-gray-700 ">
                    <input type="radio" name="reg" value="false" checked={formData.alreadyRegistered === false} onChange={handleChange} /> No
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
                  <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mt-1 lg:mt-0" />
                  <span className=" tracking-wide text-sm lg:text-md">
                    I have read all the terms and conditions and I’m ready to be
                    a channel partner.
                  </span>
                </div>
              </div>

              <button type="submit" disabled={loading} className="mt-6 lg:mb-35 mb-20 bg-[#001032] text-white px-8 py-3 rounded-sm text-lg">
                {loading ? "Submitting..." : "Get Started"}
              </button>

              <p className="lg:text-[16px] text-[14px] text-[#1D2A29CC] ">
                Please note that this is an application to seek funding or other
                services for a new venture or business. By clicking "Get
                Started" you agree to Copteno’s Privacy Policy
              </p>
            </form>
          </div>
        </div>

        <div id="middle" className="lg:hidden  ">
          <h1 className=" text-xl text-[#001032] font-semibold px-5 my-10">
            Who can be the channel partner?
          </h1>

          <div className="shadow-xl border bg-white p-4 rounded-md mt-5 mx-3">
            <div className="bg-gray-200 w-full h-50 rounded-md">
              <img src="/channelpartnerpage1.png" alt="" className="w-full h-full  rounded-md" />
            </div>

            <div>
              <p className="text-xs my-2">
                Bring your startup community into the investment ecosystem. Refer founders and ventures to the platform and earn partnership benefits.
              </p>
              <div className="flex justify-between items-center mt-5 text-xs">
                <div className="font-light">
                  <p>Co-working Spaces </p>
                  
                </div>
                <button className="bg-[#001032] text-white px-4 py-2 rounded-sm">
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <hr className="my-6 mx-6 " />
          <div className="shadow-xl border bg-white p-4 rounded-md  mx-3">
            <div className="bg-gray-200 w-full h-50 rounded-md">
              <img src="/channelpartnerpage2.png" alt="" className="w-full h-full  rounded-md" />
            </div>

            <div>
              <p className="text-xs my-2">
                Support your startups beyond mentorship by enabling funding access. Partner with us to connect your founders with investors.
              </p>
              <div className="flex justify-between items-center mt-5 text-xs">
                <div className="font-light">
                  <p>Incubation Centers</p>
                </div>
                <button className="bg-[#001032] text-white px-4 py-2 rounded-sm">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <hr className="my-6 mx-6 " />
          <div className="shadow-xl border bg-white p-4 rounded-md  mx-3">
            <div className="bg-gray-200 w-full h-50 rounded-md">
              <img src="/channelpartnerpage3.png" alt="" className="w-full h-full  rounded-md" />
            </div>

            <div>
              <p className="text-xs my-2">
                Turn your events into powerful funding gateways.If you host startup meetups, pitch events, or investor gatherings, you can partner with us.
              </p>
              <div className="flex justify-between items-center mt-5 text-xs">
                <div className="font-light">
                  <p>Business Event  Organizers </p>
                 
                </div>
                <button className="bg-[#001032] text-white px-4 py-2 rounded-sm">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="bottom" className="lg:mt-30 lg:px-10 ">
          <h1 className="lg:hidden text-xl text-[#001032] font-medium px-5 my-10">
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
                  <h1 className="text-[#001032]  mt-3 mb-7 lg:hidden">
                    {card.heading}
                  </h1>
                  <p className="text-[#001032] lg:pb-30 pb-5 lg:text-lg text-[14px] tracking-wide lg:leading-7">
                    {card.text}
                  </p>

                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <p className="text-[#001032]  text-sm lg:text-md">
                        {card.line1}
                      </p>
                      <p className=" text-[#001032] text-sm lg:text-md">
                        {card.line2}
                      </p>
                    </div>

                    <div className="h-15 w-0.5 bg-[#00000033] mx-1"></div>

                    <div className="lg:w-20 lg:h-20 w-18 h-18 lg:bg-[#001032] bg-[#00103233]  rounded-full"></div>
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

         <div>
          <ChannelPartnerSec4/>
        </div>
      </div>
    </div>
  );
};

export default ChannelPartnerSec1;
