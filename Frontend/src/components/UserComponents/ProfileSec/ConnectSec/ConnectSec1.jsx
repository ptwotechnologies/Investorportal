import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";

const ConnectSec1 = () => {
  const leftPartCol1 = [
    { data: "An experienced entrepreneur and business professional." },
    { data: "An experienced entrepreneur and business professional." },
    { data: "An experienced entrepreneur and business professional." },
  ];

  const leftPartCol2 = [
    { data: "An experienced entrepreneur and business professional." },
    { data: "An experienced entrepreneur and business professional." },
    { data: "An experienced entrepreneur and business professional." },
    { data: "An experienced entrepreneur and business professional." },
    { data: "An experienced entrepreneur and business professional." },
    { data: "An experienced entrepreneur and business professional." },
    { data: "An experienced entrepreneur and business professional." },
  ];

  const requestOptions = [
    { id: 1, label: "Connect with Admin" },
    { id: 2, label: "Require Advisory Service" },
    { id: 3, label: "Require Legal Service" },
    { id: 4, label: "Require CXO Service" },
    { id: 5, label: "Require Compliance Service" },
    { id: 6, label: "Require HR Service" },
    { id: 7, label: "Require Development Service" },
    { id: 8, label: "Require Finance Service" },
    { id: 9, label: "Require Design Service" },
    { id: 10, label: "Require Funding Solutions" },
    { id: 11, label: "Require Marketing Service" },
    { id: 12, label: "Connect with Investors" },
    { id: 13, label: "Require Consultation Service" },
    { id: 14, label: "Connect with Incubators" },
  ];

  const getVisibleOptions = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return requestOptions.slice(0, 7);
    }
    return requestOptions;
  };

  const [visibleOptions, setVisibleOptions] = useState(getVisibleOptions());

  useEffect(() => {
    const handleResize = () => setVisibleOptions(getVisibleOptions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:flex  lg:bg-gray-100 lg:pl-4 lg:pr-4 lg:pb-6">
      <div className=" bg-gray-100 h-[85vh]  w-full  mx-auto  pt-4">
        <div className="hidden md:flex bg-white border border-gray-400 shadow-md rounded-lg px-10 mb-4 justify-between items-center">
          <h1 className="text-md font-semibold text-gray-800">
            Welcome, Startup India Pvt. Ltd.
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
            <FaUser
              className="text-gray-600 border border-gray-600 p-1 rounded-full"
              size={24}
            />
            <span className="font-semibold text-gray-800">
              Switch to professional
            </span>
          </button>
        </div>

        <div className="flex gap-4 items-stretch">
          <div className="flex flex-col  bg-white border border-gray-400 p-4  rounded-md shadow-md  w-full md:w-[50%]  lg:h-[88vh]  gap-2">
            <div>
              <input
                type="text"
                placeholder="Search"
                className="border border-[#D9D9D9] p-2 rounded-lg w-full"
              />
            </div>
            <div>
              <button className="bg-[#001032] text-white px-4 py-1 rounded-lg lg:w-30 w-25 ">
                All
              </button>
              <button className=" px-4 py-1 rounded-lg border border-[#D9D9D9] lg:w-30 w-25">
                Received
              </button>
              <button className="  px-4 py-1 rounded-lg border border-[#D9D9D9] lg:w-30 w-25">
                Sent
              </button>
            </div>

            {/* Column 2 */}
            <div className=" flex flex-col gap-3 w-full max-h-140 scrollbar-hide overflow-y-auto ">
              {leftPartCol2.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border border-gray-600 rounded-lg  bg-white shadow-md hover:shadow-md transition-all"
                >
                  <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-600 shrink-0 flex items-center justify-center"></div>
                  <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
                  <div className="flex items-center justify-between pr-2 lg:pr-0 ">
                    <div className="my-3">
                      <h1 className="text-[#001032] font-semibold text-sm">
                        Akshay Dogra
                      </h1>
                      <p className="text-[#001032]  text-xs">
                        Grow Your Business by Partnering with India’s
                        Fastest-Growing Startup Ecosystem
                      </p>
                      <p className="text-[#001032]  text-[10px]">
                        New Delhi, Delhi
                      </p>
                    </div>
                    <div className="lg:relative lg:left-8 ">
                      <button className="bg-[#001032] text-white lg:w-30 w-20 py-1 my-1 text-sm  rounded-full">
                        Connect
                      </button>
                      <button className="bg-[#B1AAAA] text-white lg:w-30 w-20 py-1 my-1 text-sm rounded-full ">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Right Card (exact UI, untouched CSS) */}
          <div className="hidden lg:flex w-[50%] h-[88vh] scrollbar-hide overflow-x-auto">
            <div className="bg-white border border-gray-300 shadow-md rounded-2xl  flex flex-col justify-between w-full h-full">
              {/* Header image section */}
              <div className="relative h-40 border border-gray-300 mt-40"></div>

              {/* Profile photo overlap */}
              <div className="relative px-4 -mt-12">
                <div className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-md bg-white"></div>

                <div className="mt-6 px-4 ">
                  <h2 className="text-gray-900 text-lg font-semibold">
                    Akshay Dogra
                  </h2>
                  <p className="text-sm text-gray-800 mt-1 leading-tight ">
                    Grow Your Business by Partnering with <br />
                    India’s Fastest-Growing Startup Ecosystem
                  </p>

                  <p className="text-sm text-gray-700 font-medium mt-2 ">
                    New Delhi, Delhi, India
                  </p>
                </div>
              </div>

              {/* About Section */}
              <div
                id="about"
                className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-4  mt-3  "
              >
                <div className="flex justify-between items-center mt-2 mb-1 px-4">
                  <h1 className="text-[#001032]  font-semibold text-md lg:text-xl">
                    About
                  </h1>
                </div>
                <div className=" py-2 leading- text-sm lg:tracking-wider tracking-wide  lg:pr-0 h-auto">
                  <div className="px-4">
                    <p
                      className={`text-sm dynamic-text transition-all duration-300 
                    "lg:line-clamp-3 line-clamp-4" : ""}
                 `}
                    >
                      An experienced entrepreneur and business professional who
                      consistently delivers high-quality and result-focused
                      marketing campaign, customer experience and design
                      valuable content for go-to-market, launch, start-up, brand
                      building, event and community engagement. Dedicated
                      results and omni channel product marketing, brand and
                      community development. See more...
                    </p>
                  </div>
                </div>

                <div className="flex flex-col  gap-1 p-2  mx-4 my-4 border-2 border-[#D9D9D9] rounded-xl  text-[#001032]">
                  <div className="flex items-center gap-2 ">
                    <IoDiamondOutline size={22} />
                    <h1 className=" w-[40%]   text-md  lg:text-xl font-semibold  ">
                      Top Skills
                    </h1>
                  </div>

                  <p className="lg:text-sm text-xs leading-4  flex items-center lg:leading-7 lg:w-[90%] pl-8">
                    hhguugku
                  </p>
                </div>
              </div>


              {/* Services */}
                <div
                      id="services"
                      className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-4 lg:m-2 my-2 py-2 "
                    >
                      <div className="flex justify-between items-center mt-3 mb-1">
                        <h1 className="text-[#001032]  px-4 font-semibold text-md lg:text-xl">
                          Services
                        </h1>
                   
                      </div>
                      <div className=" px-4 lg:py-2 py-1 mb-6 relative">
                       
                          <div className="relative">
                            <p
                              className={`text-sm font-medium leading-6 lg:leading-7 lg:pr-3 overflow-hidden transition-all duration-300
                   "line-clamp-3 lg:line-clamp-1" : "line-clamp-none"}
                `}
                            >
                              Strategic Planning • Marketing Strategy • Customer Service • Pricing Strategy • Training • Team Building • Research Skills • Market Research See more...
                            </p>
              
                           
                          </div>
                        
                      </div>
              
                    
                    </div>


                  

                  {/* Experience */}
                  <div
                          id="experience"
                          className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2  my-2"
                        >
                          <div className="flex justify-between items-center lg:my-6 mt-3 mb-2">
                            <h1 className="text-[#001032] lg:px-9 px-4 font-semibold text-md lg:text-xl">
                              Experience
                            </h1>
                            <div className="flex items-center">
                              {/* Add Experience Button */}
                              
                              
                            </div>
                          </div>
                          <div className="lg:pl-10 pl-4 pb-5 mt-6">
                            
                  
                                  
                                    <div  className="mb-4 border-b pb-3">
                                      <div className="flex justify-between items-start">
                                       
                                          <div className="w-full">
                                            <h1 className="font-semibold pt-1 text-md lg:text-xl">
                                             Founder3
                                            </h1>
                                            <p className="text-sm font-medium">dcdh</p>
                                            <p className="text-sm">
                                              START DATE
                                            </p>
                                            <p className="text-sm">Location</p>
                  
                                            <div className="relative mt-2">
                                           
                  
                                              
                                            </div>
                                          </div>
                                        
                  
                                     
                                      </div>
                                    </div>
                                  
                                
                  
                           
                          
                          </div>
                  
                          
                        </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectSec1;
