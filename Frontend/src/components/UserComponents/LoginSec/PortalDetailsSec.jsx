import React, { useState, useEffect } from "react";
import logo from "/ArtesterLogo2.png";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Calendar2 from "./Calendar2";
import { serverUrl } from "@/App";

const PortalDetailsSec = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(location.state?.userId || null);

  // Form values
  const [pitchDeck, setPitchDeck] = useState("");
  const [profile, setProfile] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [foundedOn, setFoundedOn] = useState(null);

  // Two separate dropdowns
  const [businessType, setBusinessType] = useState("Select Business Type");
  const [reasonForJoining, setReasonForJoining] = useState("Select Reason");

  // Dummy dropdown options
  const businessOptions = ["Manufacturing", "Service", "Trading"];
  const reasonOptions = ["Funding", "Networking", "Business Growth"];

  // Retrieve userId from localStorage if missing
  useEffect(() => {
    if (!userId) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) setUserId(storedUserId);
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID missing! Please signup again.");
      return;
    }

    if (!foundedOn) {
      alert("Please select founding date");
      return;
    }

    if (
      !pitchDeck ||
      !profile ||
      !linkedin ||
      businessType === "Select Business Type" ||
      reasonForJoining === "Select Reason"
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const payload = {
        userId,
        additionalDetails: {
          pitchDeckUpload: pitchDeck,
          profileUpload: profile,
          linkedinProfile: [linkedin],
          reason: [reasonForJoining],
          businessType: businessType,
          foundedon: foundedOn.toISOString().split("T")[0],
        },
        registrationStep: 2,
      };

      const response = await axios.put(`${serverUrl}/user/additional-details`, payload);

      if (response.status === 200) {
        navigate("/onboardingplans", { state: { userId } });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center lg:min-h-dvh">
        
        {/* LEFT SIDE */}
        <div id="left" className="w-[40%] hidden lg:block mx-auto">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className="w-100" />
              <p className="text-[#001032] text-xl w-full">Allows you to get funding,</p>
              <p className="text-[#001032] text-xl">resources and investor connect</p>
            </div>
            <div>
              <p className="text-lg w-full text-[#000000] relative top-45">
                Terms, Privacy Disclosures Cookie Settings © norf.KD Technologies LLP
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-2 text-center w-full">
          <div className="lg:bg-[#001032] lg:p-3 w-full lg:rounded-lg">
            
            <Card className="w-full lg:h-auto mx-auto rounded-lg">
              
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55 w-45 mx-auto lg:my-12 my-7" />
                </CardTitle>
                <CardDescription className="mb-1 text-[#001032] text-md lg:text-sm font-semibold">
                  Get the most benefits from our pool of possible clients for you
                </CardDescription>
              </CardHeader>

              {/* FORM START */}
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3">

                    {/* BUSINESS TYPE DROPDOWN */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-full bg-white border border-[#0010321A] rounded-md px-4 py-2.5 flex justify-between items-center text-[#00103280] font-medium cursor-pointer">
                          {businessType}
                          <IoIosArrowDown className="mt-1" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="mt-2 w-full bg-white rounded-md shadow-sm">
                        {businessOptions.map((item) => (
                          <DropdownMenuItem key={item} onClick={() => setBusinessType(item)}>
                            {item}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* DATE PICKER */}
                    <Calendar2 onChange={(date) => setFoundedOn(date)} />

                    {/* PITCH DECK */}
                    <Input
                      type="text"
                      placeholder="Pitch Deck Upload"
                      value={pitchDeck}
                      onChange={(e) => setPitchDeck(e.target.value)}
                      className="p-5 font-medium text-[#00103280]"
                      required
                    />

                    {/* PROFILE UPLOAD */}
                    <Input
                      type="text"
                      placeholder="Profile Upload"
                      value={profile}
                      onChange={(e) => setProfile(e.target.value)}
                      className="p-5 font-medium text-[#00103280]"
                      required
                    />

                    {/* LINKEDIN */}
                    <Input
                      type="text"
                      placeholder="LinkedIn Profile"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="p-5 font-medium text-[#00103280]"
                      required
                    />

                    {/* REASON FOR JOINING DROPDOWN */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-full bg-white border border-[#0010321A] rounded-md px-4 py-2.5 flex justify-between items-center text-[#00103280] font-medium cursor-pointer">
                          {reasonForJoining}
                          <IoIosArrowDown className="mt-1" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="mt-2 w-full bg-white rounded-md shadow-sm">
                        {reasonOptions.map((item) => (
                          <DropdownMenuItem key={item} onClick={() => setReasonForJoining(item)}>
                            {item}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <CardFooter className="flex-col gap-2 mt-4 w-full">
                    <Button type="submit" className="w-full bg-[#001032]">Continue</Button>
                  </CardFooter>
                </form>
              </CardContent>

            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PortalDetailsSec;
