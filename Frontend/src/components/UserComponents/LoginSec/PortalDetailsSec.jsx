import React, { useState, useEffect } from "react";
import logo from "/coptenologo2.png";
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
import toast from "react-hot-toast";
import { useRegistration } from "@/context/RegistrationContext";

const PortalDetailsSec = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, updateFormData, verificationStatus } = useRegistration();

  const userId = verificationStatus.userId;
  const role = verificationStatus.role || localStorage.getItem("role");
  const serviceType = verificationStatus.serviceType || localStorage.getItem("serviceType");

  // ðŸ”¹ Destructure persisted data from Context
  const { 
    linkedin, foundedOn, domain, domainDescription, referralCode,
    startupBusinessType, serviceBusinessType, uploadedUrl
  } = formData;

  const [logoFile, setLogoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // ðŸ”¹ Helper to update context fields easily
  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
  };


  // Maximum logo / file size in bytes (10MB)
  const MAX_LOGO_SIZE = 10 * 1024 * 1024;
  
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_LOGO_SIZE) {
      toast.error("File must be less than 10MB");
      e.target.value = "";
      return;
    }

    setLogoFile(file);
    handleChange("uploadedUrl", ""); 
    
    // Auto upload
    await uploadFileToCloud(null, file);
  };

  const uploadFileToCloud = async (e, directFile = null) => {
    if (e) e.preventDefault();
    const fileToUpload = directFile || logoFile;
    if (!fileToUpload) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("type", role === "startup" ? "pitchdeck" : "portal_profile");

    try {
      const res = await axios.post(`${serverUrl}/user/portal-upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      handleChange("uploadedUrl", res.data.fileUrl);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
    } finally {
      setIsUploading(false);
    }
  };
  
  // control which fields to show (investor, service professionals, startup)
  const showPortalFields = role === "investor" || role === "service_professional" || role === "startup";


  const domainOptions = ["Technology", "Legal & Compliance", "Marketing", "Designing", "Development", "Other"];
  const serviceBusinessOptions = ["Manufacturing", "Trading", "Service Based"];
  const startupBusinessOptions = ["Manufacturing", "Trading", "Service Based"];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userId) {
      toast.error("User ID missing! Please signup again.");
      return;
    }

    // Role-specific validations: investors, service_professional, and startup share portal fields
    if (showPortalFields) {
      // service_professional specific rules
      if (role === "service_professional") {
        if (serviceType === "Freelancer") {
          // Freelancers: only domain, referral and file are required/optional
          if (domain === "Select Domain" || domain === " Domain") {
           toast.error("Please select a domain");
            return;
          }
          if (domain === "Other" && !domainDescription) {
           toast.error("Please describe your domain");
            return;
          }
        } else if (serviceType === "Company") {
          // Companies: require foundedOn and business type (replace LinkedIn)
          if (!foundedOn) {
            toast.error("Please select founding date");
            return;
          }
          if (serviceBusinessType === "Select Business Type" || serviceBusinessType === " Business Type") {
            toast.error("Please select a business type");
            return;
          }
          if (domain === "Domain") {
           toast.error("Please select a domain");
            return;
          }
          if (domain === "Other" && !domainDescription) {
           toast.error("Please describe your domain");
            return;
          }
        } else {
          // fallback to previous behavior
          if (!linkedin) {
           toast.error("LinkedIn profile is required");
            return;
          }
          if (domain === "Select Domain" || domain === " Domain") {
           toast.error("Please select a domain");
            return;
          }
          if (domain === "Other" && !domainDescription) {
           toast.error("Please describe your domain");
            return;
          }
        }
      } else if (role === "startup") {
        if (!foundedOn) {
         toast.error("Please select founding date");
          return;
        }
        if (startupBusinessType === "Select Business Type" || startupBusinessType === " Business Type") {
         toast.error("Please select a business type");
          return;
        }
        if (domain === "Select Domain" || domain === " Domain") {
         toast.error("Please select a domain");
          return;
        }
        if (domain === "Other" && !domainDescription) {
         toast.error("Please describe your domain");
          return;
        }
      } else {
        // investor and others keep previous behavior
        if (!linkedin) {
         toast.error("LinkedIn profile is required");
          return;
        }
      }

      if (logoFile && logoFile.size > MAX_LOGO_SIZE) {
        toast.error("File must be less than 10MB");
        return;
      }
    } else {
      // Generic required checks for other roles (avoid undefined vars)
      if (!linkedin) {
        toast.error("All fields are required!");
        return;
      }
    }

    try {
      const linkedinProfileArr = (() => {
        // Freelancers and service companies don't use LinkedIn field here
        if (role === "service_professional") return [];
        if (role === "startup") return [];
        return linkedin ? [linkedin] : [];
      })();

      const additionalDetails = {
        linkedinProfile: linkedinProfileArr,
        foundedon: foundedOn instanceof Date ? foundedOn.toISOString().split("T")[0] : (foundedOn ? foundedOn.split("T")[0] : null),
        domain: (domain === "Select Domain" || domain === " Domain") ? null : domain,
        domainDescription: domain === "Other" ? domainDescription : null,
        referralCode: referralCode || null,
        profileFileName: role === "startup" ? null : (logoFile ? logoFile.name : null),
        pitchDeckFileName: role === "startup" ? (logoFile ? logoFile.name : null) : null,
        profileUrl: role === "startup" ? "" : uploadedUrl, // ðŸ”¹ Added for R2
        pitchDeckUrl: role === "startup" ? uploadedUrl : "", // ðŸ”¹ Added for R2
        startupBusinessType: role === "startup" ? (startupBusinessType === "Select Business Type" || startupBusinessType === " Business Type" ? null : startupBusinessType) : null,
        serviceBusinessType: role === "service_professional" && serviceType === "Company" ? (serviceBusinessType === "Select Business Type" || serviceBusinessType === " Business Type" ? null : serviceBusinessType) : null,
      };

      const payload = {
        userId,
        additionalDetails,
        registrationStep: 2,
      };

      console.log("DEBUG [FRONTEND]: Submitting details for userId:", userId);
      console.log("DEBUG [FRONTEND]: Full URL:", `${serverUrl}/user/additional-details`);
      const response = await axios.put(`${serverUrl}/user/additional-details`, payload);

      if (response.status === 200) {
        navigate("/onboardingplans", { state: { userId } });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFileUpload = (label, subText = "(Max 10MB)", acceptTypes = "image/*,application/pdf") => (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="w-full">
        <input
          id={`logoInput_${label.replace(/\s+/g, '')}`}
          type="file"
          accept={acceptTypes}
          onChange={handleFileSelect}
          className="hidden"
        />
        {!logoFile ? (
          <label htmlFor={`logoInput_${label.replace(/\s+/g, '')}`} className="cursor-pointer inline-flex flex-col items-center gap-2 px-3 py-3 w-full border  rounded-md hover:bg-gray-50 transition-colors">
            <img src={logoIcon} alt="Upload" className="w-12 h-12 object-contain my-3" />
            <span className="text-sm text-[#00103280]">{label}</span>
          </label>
        ) : (
          <div className="relative inline-flex flex-col items-center justify-center gap-2 px-3 py-4 pb-12 w-full border border-blue-200 bg-blue-50/50 rounded-md">
            <button 
              type="button" 
              onClick={(e) => { 
                e.preventDefault(); 
                setLogoFile(null); 
                handleChange("uploadedUrl", ""); 
                document.getElementById(`logoInput_${label.replace(/\s+/g, '')}`).value = ''; 
              }} 
              className="absolute top-2 right-2 text-white bg-red-400 hover:bg-red-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-sm cursor-pointer z-10"
              title="Remove File"
            >
              X
            </button>
            <img 
              src={logoFile.type.includes("image") ? URL.createObjectURL(logoFile) : logoIcon} 
              alt="preview" 
              className="w-16 h-16 object-cover rounded border-2 border-white shadow-sm" 
            />
            <p className="text-xs text-center text-[#00103280] break-words w-full px-4">{logoFile.name}</p>

            {isUploading && (
              <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-white/80 px-2 py-1 rounded shadow-sm">
                <div className="w-3 h-3 border-2 border-[#001032] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-medium text-[#001032]">Uploading...</span>
              </div>
            )}
          </div>
        )}
      </div>
      <label className="text-center text-xs text-gray-600 whitespace-pre-wrap">{subText}</label>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center lg:min-h-dvh">
        
        {/* LEFT SIDE */}
        <div id="left" className="w-[50%] hidden lg:block mx-auto">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className="w-100" />
              <p className="text-[#001032] text-xl w-full">Allows you to get funding,</p>
              <p className="text-[#001032] text-xl">resources and investor connect</p>
            </div>
            <div>
              <p className="text-lg w-full text-[#000000] relative top-45">
                Terms, Privacy Disclosures Cookie Settings Â© Copteno Technologies Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div id="right" className="lg:w-[50%] lg:px-10 lg:py-2 text-center w-full min-h-screen flex flex-col">
          <div className="lg:bg-[#001032] lg:p-3 w-full lg:rounded-lg">
            
            <Card className="w-full lg:min-h-[650px] mx-auto rounded-lg flex flex-col relative pb-24 lg:pb-4">
              
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-50 w-45 mx-auto my-4" />
                </CardTitle>
                <CardDescription className="mb-1 text-[#001032] text-md lg:text-sm ">
                  Get the most benefits from our pool of possible clients for you
                </CardDescription>
              </CardHeader>

              {/* FORM START */}
              <CardContent className="flex flex-col flex-grow">
                <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-between">
                  <div className="flex flex-col gap-3">

                    {showPortalFields ? (
                      <>
                        {role === "service_professional" ? (
                          serviceType === "Freelancer" ? (
                            <>
                              {/* DOMAIN for Freelancer */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="w-full bg-white border border-[#0010321A] rounded-md px-4 py-2.5 flex justify-between items-center text-[#00103280] cursor-pointer">
                                    {domain}
                                    <IoIosArrowDown className="mt-1" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-2 w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-md shadow-sm">
                                  {domainOptions.map((item) => (
                                    <DropdownMenuItem key={item} onClick={() => handleChange("domain", item)}>
                                      {item}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>

                              {/* Domain Description for Freelancer if Other is selected */}
                              {domain === "Other" && (
                                <Input
                                  type="text"
                                  placeholder="Describe your domain"
                                  value={domainDescription}
                                  onChange={(e) => handleChange("domainDescription", e.target.value)}
                                  className="p-5  text-[#00103280]"
                                  required
                                />
                              )}

                              {/* Referral */}
                              <Input
                                type="text"
                                placeholder="Referral Code (optional)"
                                value={referralCode}
                                onChange={(e) => handleChange("referralCode", e.target.value)}
                                className="p-5  text-[#00103280]"
                              />

                              {/* Profile upload for Freelancer */}
                              {renderFileUpload("Profile Upload", "Upload your business profile\nBusiness profile must be in pdf format. (Max 10MB)", "application/pdf")}
                            </>
                          ) : serviceType === "Company" ? (
                            <>
                              {/* Company: founding date */}
                              <div>
                                <Calendar2 initialDate={foundedOn} onChange={(date) => handleChange("foundedOn", date)} />
                              </div>

                              {/* Company business type instead of LinkedIn */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="w-full bg-white border border-[#0010321A] rounded-md px-4 py-2.5 flex justify-between items-center text-[#00103280]  cursor-pointer">
                                    {serviceBusinessType}
                                    <IoIosArrowDown className="mt-1" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-2 w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-md shadow-sm">
                                  {serviceBusinessOptions.map((item) => (
                                    <DropdownMenuItem key={item} onClick={() => handleChange("serviceBusinessType", item)}>
                                      {item}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>

                              {/* DOMAIN */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="w-full bg-white border border-[#0010321A] rounded-md px-4 py-2.5 flex justify-between items-center text-[#00103280]  cursor-pointer">
                                    {domain}
                                    <IoIosArrowDown className="mt-1" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-2 w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-md shadow-sm">
                                  {domainOptions.map((item) => (
                                    <DropdownMenuItem key={item} onClick={() => handleChange("domain", item)}>
                                      {item}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>

                              {/* Domain Description if Other is selected */}
                              {domain === "Other" && (
                                <Input
                                  type="text"
                                  placeholder="Describe your domain"
                                  value={domainDescription}
                                  onChange={(e) => handleChange("domainDescription", e.target.value)}
                                  className="p-5  text-[#00103280]"
                                  required
                                />
                              )}

                              {/* Referral */}
                              <Input
                                type="text"
                                placeholder="Referral Code (optional)"
                                value={referralCode}
                                onChange={(e) => handleChange("referralCode", e.target.value)}
                                className="p-5  text-[#00103280]"
                              />

                              {/* Profile upload */}
                              {renderFileUpload("Profile Upload", "Upload your business profile\nBusiness profile must be in pdf format. (Max 10MB)", "application/pdf")}
                            </>
                          ) : (
                            <>
                              <Input
                                type="text"
                                placeholder="LinkedIn Profile"
                                value={linkedin}
                                onChange={(e) => handleChange("linkedin", e.target.value)}
                                className="p-5  text-[#00103280]"
                                required
                              />
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="w-full bg-white border border-[#0010321A] rounded-md px-4 py-2.5 flex justify-between items-center text-[#00103280]  cursor-pointer">
                                    {domain}
                                    <IoIosArrowDown className="mt-1" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-2 w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-md shadow-sm">
                                  {domainOptions.map((item) => (
                                    <DropdownMenuItem key={item} onClick={() => handleChange("domain", item)}>
                                      {item}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                              {domain === "Other" && (
                                <Input
                                  type="text"
                                  placeholder="Describe your domain"
                                  value={domainDescription}
                                  onChange={(e) => handleChange("domainDescription", e.target.value)}
                                  className="p-5  text-[#00103280]"
                                  required
                                />
                              )}
                              <Input
                                type="text"
                                placeholder="Referral Code (optional)"
                                value={referralCode}
                                onChange={(e) => handleChange("referralCode", e.target.value)}
                                className="p-5  text-[#00103280]"
                              />
                              {renderFileUpload("Profile Upload", "Upload your business profile\nBusiness profile must be in pdf format. (Max 10MB)", "application/pdf")}
                            </>
                          )
                        ) : role === "startup" ? (
                          <>
                            <div>
                              <Calendar2 initialDate={foundedOn} onChange={(date) => handleChange("foundedOn", date)} />
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="w-full bg-white border border-[#0010321A] rounded-md px-4 py-2.5 flex justify-between items-center text-[#00103280]  cursor-pointer">
                                  {startupBusinessType}
                                  <IoIosArrowDown className="mt-1" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="mt-2 w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-md shadow-sm ">
                                {startupBusinessOptions.map((item) => (
                                  <DropdownMenuItem key={item} onClick={() => handleChange("startupBusinessType", item)}>
                                    {item}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="w-full bg-white border border-[#0010321A] rounded-md px-4 py-2.5 flex justify-between items-center text-[#00103280]  cursor-pointer">
                                  {domain}
                                  <IoIosArrowDown className="mt-1" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="mt-2 w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-md shadow-sm">
                                {domainOptions.map((item) => (
                                  <DropdownMenuItem key={item} onClick={() => handleChange("domain", item)}>
                                    {item}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>

                            {domain === "Other" && (
                              <Input
                                type="text"
                                placeholder="Describe your domain"
                                value={domainDescription}
                                onChange={(e) => handleChange("domainDescription", e.target.value)}
                                className="p-5 text-[#00103280]"
                                required
                              />
                            )}

                            <Input
                              type="text"
                              placeholder="Referral Code (optional)"
                              value={referralCode}
                              onChange={(e) => handleChange("referralCode", e.target.value)}
                              className="p-5  text-[#00103280]"
                            />

                            {renderFileUpload("Pitchdeck Upload", "Upload your Pitch Deck\nPitch Deck must be in pdf format. (Max 10MB)", "application/pdf")}
                          </>
                        ) : (
                          <>
                            <Input
                              type="text"
                              placeholder="LinkedIn Profile"
                              value={linkedin}
                              onChange={(e) => handleChange("linkedin", e.target.value)}
                              className="p-5  text-[#00103280]"
                              required
                            />
                            <Input
                              type="text"
                              placeholder="Referral Code (optional)"
                              value={referralCode}
                              onChange={(e) => handleChange("referralCode", e.target.value)}
                              className="p-5  text-[#00103280]"
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                      </>
                    )}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <CardFooter className="fixed bottom-0 left-0 w-full p-4 bg-white  lg:relative lg:bg-transparent lg:border-t-0 lg:p-0 lg:mt-auto lg:z-10">
                    <Button 
                      type="submit" 
                      className="w-full bg-[#001032]" 
                      disabled={isUploading || (role !== "investor" && !uploadedUrl) || isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4   rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : isUploading ? (
                        "Uploading File..."
                      ) : (role !== "investor" && !uploadedUrl) ? (
                        " Continue"
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

export default PortalDetailsSec;
