import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { TfiList } from "react-icons/tfi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewRequest from "./NewRequest";
import RightRaised from "./RightRaised";
import RaisedTabSec from "./RaisedTabSec";
import ReceivedTabSec from "./ReceivedTabSec";
import RightNewRequest from "./RightNewRequest";
import axios from "axios";
import { serverUrl } from "@/App";

const RequestSec = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [raisedRequests, setRaisedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [mobileView, setMobileView] = useState("left");

  // Fetch requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRaisedRequests(res.data);
        
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, []);

  // Handle creating a new request
  const handleCreateRequest = (newRequest) => {
    setRaisedRequests((prev) => [newRequest, ...prev]);
    
    setMobileView("right");
  };

  // Define width configurations for different tabs
  const getCardWidths = () => {
    switch (activeTab) {
      case "newRequest":
        return { left: "w-full md:w-[60%]", right: "w-full md:w-[40%]" };
      case "received":
        return { left: "w-full md:w-[40%]", right: "w-full md:w-[60%]" };
      case "raised":
        return { left: "w-full md:w-[40%]", right: "w-full md:w-[60%]" };
      case "all":
      default:
        return { left: "w-full md:w-[40%]", right: "w-full md:w-[60%]" };
    }
  };

  const widths = getCardWidths();

  return (
    <div className="lg:bg-gray-100 lg:mx-4">
      <div className="bg-gray-100 w-full mx-auto pt-4">
        <div className="hidden md:flex bg-white border border-gray-400 shadow-md rounded-lg lg:px-10 mb-4 justify-between items-center">
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

        <div className="flex gap-4">
          {/* Left Card */}
          <div
            className={`${widths.left} ${mobileView === "right" ? "hidden md:block" : "block"} flex flex-col gap-2 transition-all duration-300`}
          >
            <div className="border border-gray-400 bg-white rounded-md shadow-md lg:px-4 lg:pt-4 p-2 h-[88vh] overflow-hidden">
              <Tabs
                value={activeTab}
                onValueChange={(value) => {
                  setActiveTab(value);
                  if (value === "newRequest") {
                    setMobileView("left"); // Stay on left for mobile when clicking New Request
                  }
                }}
                className="w-full"
              >
                {/* Search and New Request Button */}
                <div className="flex items-center gap-2 w-full mb-3">
                  <button
                    onClick={() => {
                      setActiveTab("newRequest");
                      setMobileView("left");
                    }}
                    className="bg-[#1F9E61] lg:py-2 p-1.5 rounded-lg text-white lg:w-[28%] w-[30%] text-sm lg:text-[16px] hover:bg-[#188c54] transition-colors"
                  >
                    New Request
                  </button>

                  <div className="flex items-center justify-between gap-2 border-2 border-[#D9D9D9] lg:w-[82%] w-[70%] lg:p-2 p-1 px-2 rounded-lg">
                    <input
                      type="text"
                      className="w-full outline-none"
                      placeholder="Search requests"
                    />
                    <TfiList
                      size={24}
                      className="text-gray-500 bg-white cursor-pointer"
                    />
                  </div>
                </div>

                {/* Tabs List */}
                <TabsList className="w-full bg-transparent gap-2 mb-3 h-auto p-0">
                  <TabsTrigger
                    value="all"
                    className="px-6 py-1 border border-[#D9D9D9] rounded-lg flex-1 text-sm lg:text-[16px] data-[state=active]:text-white data-[state=active]:bg-[#1F9E61]"
                  >
                    All
                  </TabsTrigger>

                  <TabsTrigger
                    value="received"
                    className="px-5 py-1 rounded-lg border border-[#D9D9D9] flex-1 text-sm lg:text-[16px] data-[state=active]:text-white data-[state=active]:bg-[#1F9E61]"
                  >
                    Received
                    <span className="bg-[#B42A2C] text-white text-xs rounded-full px-1.5 py-0.5 mx-1">
                      2
                    </span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="raised"
                    className="px-5 py-1 rounded-lg border border-[#D9D9D9] flex-1 text-sm lg:text-[16px] data-[state=active]:text-white data-[state=active]:bg-[#1F9E61]"
                  >
                    Raised
                  </TabsTrigger>
                </TabsList>

                {/* Tabs Content */}
                <div className="overflow-y-auto h-[calc(88vh-140px)] scrollbar-hide">
                  <TabsContent value="newRequest" className="mt-0">
                    <NewRequest onCreateRequest={handleCreateRequest} />
                  </TabsContent>

                  <TabsContent value="all" className="mt-0">
                    <div className="">
                      <ReceivedTabSec />
                      <RaisedTabSec
                        requests={raisedRequests}
                        setSelectedRequest={setSelectedRequest}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="received" className="mt-0">
                    <ReceivedTabSec />
                  </TabsContent>

                  <TabsContent value="raised" className="mt-0">
                    <RaisedTabSec
                      requests={raisedRequests}
                      setSelectedRequest={setSelectedRequest}
                      selectedRequest={selectedRequest}
                      setMobileView={setMobileView}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Right Card */}
          <div
            className={`${widths.right.replace("hidden md:block", "hidden md:flex")} ${mobileView === "right" ? "flex" : "hidden md:flex"} h-[88vh] scrollbar-hide overflow-y-auto bg-white rounded-md border border-gray-400 shadow-md transition-all duration-300`}
          >
            {activeTab === "newRequest" && (
              <RightNewRequest
                raisedRequests={raisedRequests}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
                setMobileView={setMobileView}
              />
            )}

            {activeTab === "all" && (
              <RightRaised
                requests={raisedRequests}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
                setMobileView={setMobileView}
              />
            )}

            {activeTab === "received" && (
              <RightRaised
                requests={raisedRequests}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
              />
            )}

            {activeTab === "raised" && (
              <RightRaised
                requests={raisedRequests}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSec;
