import React, { useState, useEffect } from "react";
import logo from "/coptenologo2.png";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; 
import { sendOtp, verifyOtp } from "@/lib/phoneAuth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

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
import toast, { Toaster } from "react-hot-toast";

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
  const [otp, setOtp] = useState("");
const [otpSent, setOtpSent] = useState(false);
const [phoneVerified, setPhoneVerified] = useState(false);

  const tabs = role === "service_professional" ? serviceTabs.map((t)=>({id:t,label:t})) : investorTabs.map((t) => ({ id: t, label: t }));

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneVerified) {
      toast.error("Please verify your phone number first.");
      return;
    }

    if (!role) {
      toast.error("Role not found. Please go back and select a role.");
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Role-specific validations
    if (role === "investor") {
      if (businessType === "Venture Firm" && !firmName) {
        toast.error("Please enter your firm name");
        return;
      }
      
    }

    if (role === "service_professional") {
      if (businessType === "Company" && !companyName) {
        toast.error("Please enter your company name");
        return;
      }
     
    }

    if (role === "startup") {
      if (!companyName) {
        toast.error("Please enter your company name");
        return;
      }
      if (!website) {
      toast.error("Please enter a website");
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

        navigate("/emailverification", { 
          state: { 
            userId: response.data.userId,
            role,
          } 
        });
      } else {
        console.error("Unexpected response:", response);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Axios Error: ", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  const handleSendOtp = async () => {
    try {
      // Remove all non-digit characters
      let cleanMobile = mobile.replace(/\D/g, "");

      // If user typed 91 at the start of a 12-digit number, treat it as the country code
      if (cleanMobile.length === 12 && cleanMobile.startsWith("91")) {
        cleanMobile = cleanMobile.substring(2);
      }

      // Basic validation: must be a 10-digit number
      if (cleanMobile.length !== 10) {
        toast.error("Please enter a valid 10-digit mobile number.");
        return;
      }

      const phoneNumber = "+91" + cleanMobile;

      await sendOtp(phoneNumber);
      setOtpSent(true);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

const handleVerifyOtp = async () => {
  try {

    const user = await verifyOtp(otp);

    console.log(user);

    setPhoneVerified(true);

    toast.success("Phone number verified");

  } catch (error) {
    console.error(error);
    toast.error("Invalid OTP");
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
                Terms, Privacy Disclosures Cookie Settings © Copteno Technologies Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>

        <div id="right" className="lg:w-[50%]  lg:px-10  text-center w-full">
          <div className="lg:bg-[#001032] lg:p-3 w-full lg:rounded-lg">
            <Card className="w-full lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55 w-40 mx-auto  my-3" />
                </CardTitle>
                <CardDescription className="mb-1 text-[#001032] text-sm lg:text-sm ">
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
                      className="p-5  text-[#00103280]"
                    />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="p-5  text-[#00103280]"
                    />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="p-5  text-[#00103280]"
                    />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="p-5  text-[#00103280]"
                    />
                     <Input
                      id="confirmpassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="p-5  text-[#00103280]"
                    />
                    <div className="flex gap-2">
                       <Input
                        id="mobile"
                        type="text"
                        placeholder="Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        disabled={phoneVerified}
                        className="p-5  text-[#00103280] flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={handleSendOtp} 
                        disabled={otpSent || phoneVerified}
                        className="bg-[#001032] h-auto px-4"
                      >
                        {otpSent ? "Sent" : "Send OTP"}
                      </Button>
                    </div>

                    {/* Recaptcha Container - Must be in the DOM and visible for the badge */}
                    <div id="recaptcha-container"></div>

                    {otpSent && !phoneVerified && (
                      <div className="flex flex-col items-center gap-3 p-2 border border-[#0010321A] rounded-md">
                        <p className="text-sm  text-[#001032]">Enter OTP</p>
                        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                        <Button 
                          type="button" 
                          onClick={handleVerifyOtp} 
                          className="w-full bg-[#001032]"
                        >
                          Verify OTP
                        </Button>
                      </div>
                    )}

                    {phoneVerified && (
                      <p className="text-green-600 text-sm  text-left">✓ Phone number verified</p>
                    )}

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
                          className="p-5  text-[#00103280]"
                        />
                        <Input
                          id="website"
                          type="text"
                          placeholder="Website"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          required
                          className="p-5  text-[#00103280]"
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
                              className="p-5  text-[#00103280]"
                            />
                            <Input
                              id="website"
                              type="text"
                              placeholder="Website"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              required
                              className="p-5  text-[#00103280]"
                            />
                          </>
                        ) : (
                          <Input
                            id="optionalWebsite"
                            type="text"
                            placeholder="Website (if any)"
                            value={optionalWebsite}
                            onChange={(e) => setOptionalWebsite(e.target.value)}
                            className="p-5  text-[#00103280]"
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
                              className="p-5  text-[#00103280]"
                            />
                            <Input
                              id="website"
                              type="text"
                              placeholder="Website"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              required
                              className="p-5  text-[#00103280]"
                            />
                          </>
                        ) : (
                          <Input
                            id="optionalWebsite"
                            type="text"
                            placeholder="Website (if any)"
                            value={optionalWebsite}
                            onChange={(e) => setOptionalWebsite(e.target.value)}
                            className="p-5  text-[#00103280]"
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
      <Toaster/>
    </div>
  );
};

export default RegisterPortalSec;
