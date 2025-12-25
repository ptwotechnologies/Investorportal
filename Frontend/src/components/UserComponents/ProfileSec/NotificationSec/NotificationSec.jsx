import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { TfiList } from "react-icons/tfi";
import { HiMiniLink } from "react-icons/hi2";
import { BsSendFill } from "react-icons/bs";

const NotificationSec = () => {

    const [selectedRequest, setSelectedRequest] = useState(null);

  const leftPart = [
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
     {
      data: "An experienced entrepreneur and business professional.",
    },
     {
      data: "An experienced entrepreneur and business professional.",
    },
     {
      data: "An experienced entrepreneur and business professional.",
    },
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

  // Slice logic: show 7 cards only on small screens
  const getVisibleOptions = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return requestOptions.slice(0, 7);
    }
    return requestOptions;
  };

  const [visibleOptions, setVisibleOptions] = useState(getVisibleOptions());

  // Update on resize dynamically
  React.useEffect(() => {
    const handleResize = () => setVisibleOptions(getVisibleOptions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
   <div className="md:flex  lg:bg-gray-100  w-[70%] lg:pl-4 lg:pr-4 lg:pb-6">
             
             
                  <div className="flex flex-col  justify-between  items-center ">
            <div className="border px-6 py-3 pb-20 flex flex-col gap-6 bg-white border-gray-300 shadow-md rounded-lg w-full h-full">
              {/* Left content starts here */}
              <div className="flex flex-col gap-3 text-sm text-gray-800 w-full">
                {/* Name */}
                <h2 className="text-lg font-semibold">Notification</h2>
              </div>

              {/* ✅ Mobile Right Part */}
              <div className="flex-flex-col gap-2 max-h-120 overflow-y-auto scrollbar-hide">
                {leftPart.map((item, index) => (
                  <div
                    key={index}
                    className={`border-2 p-4 lg:my-2 my-3 flex items-center gap-4 border-gray-500 rounded-lg w-full md:w-[60%]
                                  ${
                                    index % 2 !== 0
                                      ? "flex-row-reverse"
                                      : "flex-row"
                                  } flex`}
                  >
                    <div className="shrink-0 w-20 h-20 rounded-full border-2 border-gray-500 shadow-md flex items-center justify-center"></div>
                    <p className="flex-1 text-gray-700 ">{item.data}</p>
                  </div>
                ))}
              </div>
              <button className="w-full md:w-[20%] md:ml-36 bg-[#001426] rounded-lg px-4 py-2    text-white">
                View More
              </button>
            </div>
            {/* Left content ends here */}
          </div>
       
                
               
              
             
           </div>
  )
}

export default NotificationSec
