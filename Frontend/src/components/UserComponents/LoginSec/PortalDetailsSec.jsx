import React, { useState, useEffect } from "react";
import logo from "/ArtesterLogo2.png";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoIcon from "/pitchdeckLogo.png";

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
  // Role from registration (can be investor or service_professional)
  const role = location.state?.role || localStorage.getItem("role");
  const [investorType, setInvestorType] = useState(location.state?.investorType || null);
  const [firmNameFromPrev, setFirmNameFromPrev] = useState(location.state?.firmName || "");
  const [serviceType, setServiceType] = useState(location.state?.serviceType || null);
  const [companyNameFromPrev, setCompanyNameFromPrev] = useState(location.state?.companyName || "");

  // Form values
  const [pitchDeck, setPitchDeck] = useState("");
  const [profile, setProfile] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [foundedOn, setFoundedOn] = useState(null);
  const [designation, setDesignation] = useState("");
  const [domain, setDomain] = useState(" Domain");
  const [referralCode, setReferralCode] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  // Startup-specific business type selection (shown instead of LinkedIn)
  const [startupBusinessType, setStartupBusinessType] = useState(" Business Type");
  const startupBusinessOptions = ["Manufacturing", "Trading", "Service Based"];
  // Maximum logo / file size in bytes (2MB)
  const MAX_LOGO_SIZE = 2 * 1024 * 1024;
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return setLogoFile(null);
    if (file.size > MAX_LOGO_SIZE) {
      alert("File must be less than 2MB");
      e.target.value = "";
      setLogoFile(null);
      return;
    }
    setLogoFile(file);
  };
  // control which fields to show (investor, service professionals, startup)
  const showPortalFields = role === "investor" || role === "service_professional" || role === "startup";


  // (Non-investor fields removed — this flow is investor-only for now)  
  const domainOptions = ["Technology", "Legal & Compliance", "Marketing", "Designing", "Development", "Other"];

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

    // Role-specific validations: investors, service_professional, and startup share portal fields
    if (showPortalFields) {
      if (!foundedOn) {
        alert("Please select founding date");
        return;
      }
      // For startup we don't require LinkedIn; instead require startup business type
      if (role !== "startup" && !linkedin) {
        alert("LinkedIn profile is required");
        return;
      }
      if (role === "startup" && startupBusinessType === "Select Business Type") {
        alert("Please select a business type");
        return;
      }
      if (domain === "Select Domain") {
        alert("Please select a domain");
        return;
      }
      if (investorType === "Venture Firm" && !designation) {
        alert("Please enter your designation");
        return;
      }
      if (serviceType === "Company" && !companyNameFromPrev) {
        alert("Company name missing from registration");
        return;
      }
      if (logoFile && logoFile.size > MAX_LOGO_SIZE) {
        alert("File must be less than 2MB");
        return;
      }
    } else {
      // Generic required checks for other roles (avoid undefined vars)
      if (!pitchDeck || !profile || !linkedin) {
        alert("All fields are required!");
        return;
      }
    }

    try {
      const additionalDetails = {
        linkedinProfile: [linkedin],
        foundedon: foundedOn ? foundedOn.toISOString().split("T")[0] : null,
        domain: domain === "Select Domain" ? null : domain,
        referralCode: referralCode || null,
        designation: investorType === "Venture Firm" ? designation || null : null,
        profileFileName: role === "startup" ? null : (logoFile ? logoFile.name : null),
        pitchDeckFileName: role === "startup" ? (logoFile ? logoFile.name : null) : null,
        startupBusinessType: role === "startup" ? (startupBusinessType === "Select Business Type" ? null : startupBusinessType) : null,
        firmName: firmNameFromPrev || null,
        companyName: companyNameFromPrev || null,
      };

    const payload = {
        userId,
        additionalDetails,
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
                Terms, Privacy Disclosures Cookie Settings © Artestor Technologies LLP
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
                  <img src={logo} alt="Logo" className="lg:w-50 w-45 mx-auto my-3" />
                </CardTitle>
                <CardDescription className="mb-1 text-[#001032] text-md lg:text-sm font-semibold">
                  Get the most benefits from our pool of possible clients for you
                </CardDescription>
              </CardHeader>

              {/* FORM START */}
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3">

                       {/* Designation for Venture Firm */}
                        {investorType === "Venture Firm" && (
                          <Input
                            type="text"
                            placeholder="Designation"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="p-5 font-medium text-[#00103280]"
                            required
                          />
                        )}

                    {showPortalFields ? (
                      <>
                        {/* INVESTOR & SERVICE_PROFESSIONAL: Founding date */}
                        <div>
                            <Calendar2 onChange={(date) => setFoundedOn(date)} />
                        </div>

                        {/* LINKEDIN for investors & service_professionals, BUSINESS TYPE dropdown for startups */}
                        {role === "startup" ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="w-full bg-white border border-[#0010321A] rounded-md px-4 py-2.5 flex justify-between items-center text-[#00103280] font-medium cursor-pointer">
                                {startupBusinessType}
                                <IoIosArrowDown className="mt-1" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-2 w-full bg-white rounded-md shadow-sm">
                              {startupBusinessOptions.map((item) => (
                                <DropdownMenuItem key={item} onClick={() => setStartupBusinessType(item)}>
                                  {item}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Input
                            type="text"
                            placeholder="LinkedIn Profile"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            className="p-5 font-medium text-[#00103280]"
                            required
                          />
                        )}

                        {/* Show firm/company name if passed from registration */}
                        {role === "investor" && firmNameFromPrev ? (
                          <Input
                            type="text"
                            placeholder="Firm Name"
                            value={firmNameFromPrev}
                            readOnly
                            className="p-5 font-medium text-[#00103280] bg-gray-50"
                          />
                        ) : null}
                       

                        {/* DOMAIN */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-full bg-white border border-[#0010321A] rounded-md px-4 py-2.5 flex justify-between items-center text-[#00103280] font-medium cursor-pointer">
                              {domain}
                              <IoIosArrowDown className="mt-1" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="mt-2 w-full bg-white rounded-md shadow-sm">
                            {domainOptions.map((item) => (
                              <DropdownMenuItem key={item} onClick={() => setDomain(item)}>
                                {item}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Referral */}
                        <Input
                          type="text"
                          placeholder="Referral Code (optional)"
                          value={referralCode}
                          onChange={(e) => setReferralCode(e.target.value)}
                          className="p-5 font-medium text-[#00103280]"
                        />

                        {/* Profile / Pitchdeck upload (optional) */}
                        <div className="flex flex-col gap-2 items-center justify-center ">
                          
                          <div className="w-full ">
                            <input
                              id="logoInput"
                              type="file"
                              accept="image/*,application/pdf"
                              onChange={handleLogoChange}
                              className="hidden "
                            />
                            <label htmlFor="logoInput" className="cursor-pointer inline-flex flex-col items-center gap-2 px-3 py-3  w-full border  rounded-md">
                              <img src={logoIcon} alt="Upload" className="w-19 h-19 object-contain" />
                              <span className="text-sm text-[#00103280]"> {role === "startup" ? "Pitchdeck Upload" : "Profile  Upload"} </span>
                            </label>
                            {logoFile && (
                              <div className="flex items-center gap-2">
                                <img src={URL.createObjectURL(logoFile)} alt="preview" className="w-10 h-10 object-cover rounded" />
                                <p className="text-sm text-[#00103280]">{logoFile.name}</p>
                              </div>
                            )}
                          </div>
                          <label className="text-left text-xs font-medium text-gray-600">(Max 2MB)</label>
                        </div>

                       
                        
                      </>
                    ) : (
                      <>
                       
                        
                      </>
                    )}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <CardFooter className="flex-col gap-2 lg:mt-4 w-full px-0 mt-15">
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
