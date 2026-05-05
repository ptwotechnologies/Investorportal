import React, { useState, useEffect, useRef } from "react";
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
import toast from "react-hot-toast";
import { useRegistration } from "@/context/RegistrationContext";

const RegisterPortalSec = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, updateFormData, verificationStatus, updateVerificationStatus } = useRegistration();

  // Role comes from Context or Location state
  const role = verificationStatus.role || location.state?.role || "investor";

  const investorTabs = ["Venture Capitalist", "Angel Investor", "Venture Firm"];
  const serviceTabs = ["Freelancer", "Company"];

  const defaultTab = role === "service_professional" ? serviceTabs[0] : investorTabs[0];
  const [activeTab, setActiveTab] = useState(formData.businessType || defaultTab);
  const isStartup = role === "startup";

  // ðŸ”¹ Local state for non-persisted/UI-only data
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ðŸ”¹ Destructure persisted data from Context
  const { 
    email, mobile, firstName, lastName, website, optionalWebsite, 
    firmName, companyName, businessType 
  } = formData;

  const { emailVerified, phoneVerified, userId } = verificationStatus;
  // Derive whether to show the success card
  const showSuccessCard = userId && !emailVerified;

  // ðŸ”¹ Helper to update context fields easily
  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  // ðŸ”¹ AUTO-RESUME: Check if user is already verified on mount
  useEffect(() => {
    const checkExistingVerification = async () => {
      const storedUserId = userId || localStorage.getItem("userId");
      if (!storedUserId) return;

      try {
        const response = await axios.post(`${serverUrl}/user/check-verification`, {
          userId: storedUserId
        });

        if (response.data.verified) {
          updateVerificationStatus({ 
            emailVerified: true, 
            userId: response.data.userId, 
            role: response.data.role, 
            serviceType: response.data.serviceType
          });
          // If already verified, jump to next step
          navigate("/portaldetails", { 
            state: { userId: storedUserId, role: response.data.role, serviceType: response.data.serviceType } 
          });
        }
      } catch (error) {
        console.error("Auto-resume check failed:", error);
      }
    };

    checkExistingVerification();
  }, []);



  useEffect(() => {
    let interval;
    if (showSuccessCard && userId && !emailVerified) {
      interval = setInterval(async () => {
        try {
          const response = await axios.post(`${serverUrl}/user/check-verification`, {
            userId: userId
          });

          if (response.data.verified) {
            const { token, userId: newUserId, role: newRole, serviceType: newServiceType, paymentStatus } = response.data;
            
            updateVerificationStatus({ 
              emailVerified: true,
              userId: newUserId,
              role: newRole,
              serviceType: newServiceType
            });
            
            localStorage.setItem("userId", newUserId);
            localStorage.setItem("paymentStatus", paymentStatus || "not_paid");
            
            toast.success("Email verified! Redirecting...");
            
            setTimeout(() => {
              navigate("/portaldetails", { 
                state: { userId: newUserId, role: newRole, serviceType: newServiceType } 
              });
            }, 2000);
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [showSuccessCard, userId, emailVerified, navigate]);

  const tabs = role === "service_professional" ? serviceTabs.map((t)=>({id:t,label:t})) : investorTabs.map((t) => ({ id: t, label: t }));

  // navigate moved to top


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

    // If already verified (went back), just go to next step
    if (emailVerified && phoneVerified && userId) {
      navigate("/portaldetails");
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

    setIsSubmitting(true);
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

      if (response.status === 201 || (response.status === 200 && response.data.isResuming)) {
        const signupUserId = response.data.userId;
        localStorage.setItem("userId", signupUserId);
        
        const updateData = { userId: signupUserId };
        if (response.data.isResuming) {
          updateData.emailVerified = true;
          updateData.phoneVerified = true; 
          toast.success("Welcome back! Continuing your registration...");
        } else {
          toast.success("Success! Please check your email for the verification link.");
        }
        
        updateVerificationStatus(updateData);

        // ⭐ Fix: Auto-navigate immediately on resume so user doesn't have to click twice
        if (response.data.isResuming) {
          const step = response.data.registrationStep;
          if (step === 3) {
            navigate("/onboardingplans");
          } else {
            navigate("/portaldetails");
          }
        }
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorMsg = error.response?.data?.message || "Failed to signup. Please try again.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
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
      if (cleanMobile.length < 10) {
        toast.error("Incomplete number. Please enter a 10-digit mobile number.");
        return;
      }
      if (cleanMobile.length !== 10) {
        toast.error("Please enter a valid 10-digit mobile number.");
        return;
      }

      setIsSendingOtp(true);
      const phoneNumber = "+91" + cleanMobile;

      await sendOtp(phoneNumber);
      setOtpSent(true);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

const handleVerifyOtp = async () => {
  try {
    const user = await verifyOtp(otp);

    console.log(user);

    updateVerificationStatus({ phoneVerified: true });

    toast.success("Phone number verified");

  } catch (error) {
    console.error(error);
    toast.error("Invalid OTP");
  }
};

  if (showSuccessCard) {
    return (
      <div className="flex justify-center items-center lg:min-h-screen p-4">
        <Card className="w-full max-w-md p-8 text-center shadow-lg">
          <div className={`w-20 h-20 ${emailVerified ? 'bg-green-50' : 'bg-blue-50'} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-500`}>
            {emailVerified ? (
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-[#001032]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          <h2 className="text-2xl font-bold text-[#001032] mb-4">
            {emailVerified ? "Email Verified!" : "Check your email"}
          </h2>
          <p className="text-gray-600 mb-8">
            {emailVerified 
              ? "Your email has been successfully verified. We're redirecting you now..." 
              : <>We've sent a verification link to <span className="font-semibold">{email}</span>. Please click the link in the email to activate your account.</>}
          </p>
          <div className="space-y-4">
            <Button 
              className="w-full bg-[#001032]"
              onClick={() => {
                if (emailVerified) {
                  navigate("/portaldetails");
                } else {
                  toast.error("Please verify your email first.");
                }
              }}
            >
              Continue
            </Button>
            
            {!emailVerified && (
              <p className="text-xs text-gray-400 mt-4">
                Didn't get the email? Check your spam folder or try signing up again.
              </p>
            )}
          </div>
        </Card>
      </div>
    );
  }

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
                Terms, Privacy Disclosures Cookie Settings Â© Copteno Technologies Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>

        <div id="right" className="lg:w-[50%] lg:px-10 text-center w-full min-h-screen flex flex-col">
          <div className="lg:bg-[#001032] lg:p-3 w-full lg:rounded-lg">
            <Card className="w-full lg:min-h-[650px] mx-auto rounded-lg flex flex-col relative pb-24 lg:pb-4">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55 w-40 mx-auto  my-3" />
                </CardTitle>
                <CardDescription className="mb-1 text-[#001032] text-sm lg:text-sm ">
                  Get the most benefits from our pool of possible clients for you
                </CardDescription>
                <CardAction></CardAction>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow">
                <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                       <Input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                      className="p-5  text-[#00103280]"
                    />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name (Optional)"
                      value={lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="p-5  text-[#00103280]"
                    />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email "
                      value={email}
                      onChange={(e) => handleChange("email", e.target.value)}
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
                        onChange={(e) => handleChange("mobile", e.target.value)}
                        required
                        disabled={phoneVerified}
                        className="p-5  text-[#00103280] flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={handleSendOtp} 
                        disabled={phoneVerified || isSendingOtp}
                        className="bg-[#001032] h-auto px-4"
                      >
                        {isSendingOtp ? "Sending..." : phoneVerified ? "Send OTP" : otpSent ? "Resend" : "Send OTP"}
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
                      <p className="text-green-600 text-sm  text-left"> Phone number verified</p>
                    )}

                    {/* Role-specific field: for startup show Company Name input, otherwise show dropdown */}
                    {isStartup ? (
                      <>
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Company Name"
                          value={companyName}
                          onChange={(e) => handleChange("companyName", e.target.value)}
                          required
                          className="p-5  text-[#00103280]"
                        />
                        <Input
                          id="website"
                          type="text"
                          placeholder="Website"
                          value={website}
                          onChange={(e) => handleChange("website", e.target.value)}
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
                                handleChange("businessType", tab.label);
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
                              onChange={(e) => handleChange("firmName", e.target.value)}
                              required
                              className="p-5  text-[#00103280]"
                            />
                            <Input
                              id="website"
                              type="text"
                              placeholder="Website"
                              value={website}
                              onChange={(e) => handleChange("website", e.target.value)}
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
                            onChange={(e) => handleChange("optionalWebsite", e.target.value)}
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
                              onChange={(e) => handleChange("companyName", e.target.value)}
                              required
                              className="p-5  text-[#00103280]"
                            />
                            <Input
                              id="website"
                              type="text"
                              placeholder="Website"
                              value={website}
                              onChange={(e) => handleChange("website", e.target.value)}
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
                            onChange={(e) => handleChange("optionalWebsite", e.target.value)}
                            className="p-5  text-[#00103280]"
                          />
                        )}
                      </>
                    )}

                   
                   
                  </div>
                  <CardFooter className="fixed bottom-0 left-0 w-full p-4 bg-white  lg:relative lg:bg-transparent  lg:p-0 lg:mt-auto lg:z-10">
                    <Button type="submit" className="w-full bg-[#001032]" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        "Continue"
                      )}
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
