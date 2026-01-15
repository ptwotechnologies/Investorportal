import React, { useState } from "react";
import logo from "/ArtesterLogo2.png";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // or your custom API service

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

import { serverUrl } from "@/App";

const RegisterPortalSec = () => {
  const location = useLocation();
  // Role comes from SelectPortal; default to what was chosen or investor
  const role = location.state?.role || localStorage.getItem("role") || "investor";

  const investorTabs = ["Venture Capitalist", "Angel Investor", "Venture Firm"];
  const serviceTabs = ["Freelancer", "Company"];

  const defaultTab = role === "service_professional" ? serviceTabs[0] : investorTabs[0];
  const [activeTab, setActiveTab] = useState(defaultTab);
  const isStartup = role === "startup";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [website, setWebsite] = useState("");
  const [optionalWebsite, setOptionalWebsite] = useState("");
  const [firmName, setFirmName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState(activeTab);

  const tabs = role === "service_professional" ? serviceTabs.map((t)=>({id:t,label:t})) : investorTabs.map((t) => ({ id: t, label: t }));

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Role not found. Please go back and select a role.");
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Role-specific validations
    if (role === "investor") {
      if (businessType === "Venture Firm" && !firmName) {
        alert("Please enter your firm name");
        return;
      }
      
    }

    if (role === "service_professional") {
      if (businessType === "Company" && !companyName) {
        alert("Please enter your company name");
        return;
      }
     
    }

    if (role === "startup") {
      if (!companyName) {
        alert("Please enter your company name");
        return;
      }
      if (!website) {
        alert("Please enter a website");
        return;
      }
    }

    try {
      const businessDetails = {
        number: mobile,
        firstName,
        lastName,
        website,
        firmName: role === "investor" ? firmName || null : null,
        investorType: role === "investor" ? businessType : null,
        serviceType: role === "service_professional" ? businessType : null,
        companyName: role === "service_professional" || role === "startup" ? companyName || null : null,
        businessType,
      };

      const payload = {
        role,
        email,
        password,
        businessDetails,
      };

      const response = await axios.post(`${serverUrl}/user/signup`, payload);

      if (response.status === 201) {
        // Save userId to localStorage for later use
        localStorage.setItem("userId", response.data.userId);

        navigate("/portaldetails", { 
          state: { 
            userId: response.data.userId,
            role,
            investorType: role === "investor" ? businessType : null,
            firmName: role === "investor" ? firmName || null : null,
            serviceType: role === "service_professional" ? businessType : null,
            companyName: role === "service_professional" || role === "startup" ? companyName || null : null,
          } 
        });
      } else {
        console.error("Unexpected response:", response);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Axios Error: ", error);
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center lg:min-h-dvh">
        <div id="left" className="w-[40%] hidden lg:block mx-auto">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className="w-100" />
              <p className="text-[#001032] text-xl w-full">
                Allows you to get funding,
              </p>
              <p className="text-[#001032] text-xl">
                resources and investor connect
              </p>
            </div>
            <div>
              <p className="text-lg w-full text-[#000000] relative top-45">
                Terms, Privacy Disclosures Cookie Settings © Artestor Technologies LLP
              </p>
            </div>
          </div>
        </div>

        <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10  text-center w-full">
          <div className="lg:bg-[#001032] lg:p-3 w-full lg:rounded-lg">
            <Card className="w-full lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55 w-40 mx-auto  mb-1" />
                </CardTitle>
                <CardDescription className="mb-1 text-[#001032] text-sm lg:text-sm font-semibold">
                  Get the most benefits from our pool of possible clients for you
                </CardDescription>
                <CardAction></CardAction>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                       <Input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                     <Input
                      id="confirmpassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                    <Input
                      id="mobile"
                      type="text"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />

                    {/* Role-specific field: for startup show Company Name input, otherwise show dropdown */}
                    {isStartup ? (
                      <>
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Company Name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                          className="p-5 font-medium text-[#00103280]"
                        />
                        <Input
                          id="website"
                          type="text"
                          placeholder="Website"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          required
                          className="p-5 font-medium text-[#00103280]"
                        />
                      </>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="
                              w-full
                              bg-white
                              border border-[#0010321A]
                              rounded-md
                              h-12
                              px-5
                              flex justify-between items-center
                              text-[#00103280]
                              font-medium
                              cursor-pointer
                            "
                          >
                            {activeTab}
                            <IoIosArrowDown className="mt-0" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mt-2 w-full bg-white border border-[#001032] rounded-md shadow-sm">
                          {tabs.map((tab) => (
                            <DropdownMenuItem
                              key={tab.id}
                              onClick={() => {
                                setActiveTab(tab.label);
                                setBusinessType(tab.label);
                              }}
                              className="text-[#00103280] text-md px-5 py-2"
                            >
                              {tab.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )} 

                    {/* Role-specific inputs */}
                    {role === "investor" && (
                      <>
                        {activeTab === "Venture Firm" ? (
                          <>
                            <Input
                              id="firmName"
                              type="text"
                              placeholder="Firm Name"
                              value={firmName}
                              onChange={(e) => setFirmName(e.target.value)}
                              required
                              className="p-5 font-medium text-[#00103280]"
                            />
                            <Input
                              id="website"
                              type="text"
                              placeholder="Website"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              required
                              className="p-5 font-medium text-[#00103280]"
                            />
                          </>
                        ) : (
                          <Input
                            id="optionalWebsite"
                            type="text"
                            placeholder="Website (if any)"
                            value={optionalWebsite}
                            onChange={(e) => setOptionalWebsite(e.target.value)}
                            className="p-5 font-medium text-[#00103280]"
                          />
                        )}
                      </>
                    )}

                    {role === "service_professional" && (
                      <>
                        {activeTab === "Company" ? (
                          <>
                            <Input
                              id="companyName"
                              type="text"
                              placeholder="Company Name"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              required
                              className="p-5 font-medium text-[#00103280]"
                            />
                            <Input
                              id="website"
                              type="text"
                              placeholder="Website"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              required
                              className="p-5 font-medium text-[#00103280]"
                            />
                          </>
                        ) : (
                          <Input
                            id="optionalWebsite"
                            type="text"
                            placeholder="Website (if any)"
                            value={optionalWebsite}
                            onChange={(e) => setOptionalWebsite(e.target.value)}
                            className="p-5 font-medium text-[#00103280]"
                          />
                        )}
                      </>
                    )}

                   
                   
                  </div>

                  <CardFooter className="flex-col gap-2 lg:mt-5 mb-1 w-full px-0 mt-15">
                    <Button type="submit" className="w-full bg-[#001032]">
                      Continue
                    </Button>
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

export default RegisterPortalSec;
