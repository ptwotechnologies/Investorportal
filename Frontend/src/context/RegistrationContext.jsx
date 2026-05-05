import React, { createContext, useContext, useState, useEffect } from "react";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  // 🔹 Global Registration State
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("registration_draft");
    const data = saved ? JSON.parse(saved) : {
      email: "",
      mobile: "",
      firstName: "",
      lastName: "",
      firmName: "",
      companyName: "",
      website: "",
      linkedin: "",
      domain: " Domain",
      domainDescription: "",
      referralCode: "",
      startupBusinessType: " Business Type",
      serviceBusinessType: " Business Type",
      uploadedUrl: "",
      foundedOn: null,
    };

    // ⭐ Fix: If the saved data has 'Marketing' or other domain options in the business type field, reset it to the placeholder
    const domainOptions = ["Technology", "Legal & Compliance", "Marketing", "Designing", "Development", "Other"];
    if (domainOptions.includes(data.startupBusinessType)) data.startupBusinessType = " Business Type";
    if (domainOptions.includes(data.serviceBusinessType)) data.serviceBusinessType = " Business Type";
    
    return data;
  });

  const [verificationStatus, setVerificationStatus] = useState(() => {
    const saved = localStorage.getItem("verification_status");
    return saved ? JSON.parse(saved) : {
      emailVerified: false,
      phoneVerified: false,
      userId: null,
      role: null,
      serviceType: null,
    };
  });

  // 🔹 Persist to localStorage on any change
  useEffect(() => {
    localStorage.setItem("registration_draft", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("verification_status", JSON.stringify(verificationStatus));
  }, [verificationStatus]);

  // 🔹 Helpers to update state
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const updateVerificationStatus = (newStatus) => {
    setVerificationStatus((prev) => ({ ...prev, ...newStatus }));
  };

  const clearRegistrationData = () => {
    setFormData({
      email: "",
      mobile: "",
      firstName: "",
      lastName: "",
      firmName: "",
      companyName: "",
      website: "",
      linkedin: "",
      domain: " Domain",
      domainDescription: "",
      referralCode: "",
      startupBusinessType: " Business Type",
      serviceBusinessType: " Business Type",
      uploadedUrl: "",
      foundedOn: null,
    });
    setVerificationStatus({
      emailVerified: false,
      phoneVerified: false,
      userId: null,
      role: null,
      serviceType: null,
    });
    localStorage.removeItem("registration_draft");
    localStorage.removeItem("verification_status");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("serviceType");
    localStorage.removeItem("details_email");
    localStorage.removeItem("details_mobile");
    localStorage.removeItem("details_firstName");
    localStorage.removeItem("details_lastName");
    localStorage.removeItem("details_firmName");
    localStorage.removeItem("details_companyName");
    localStorage.removeItem("details_website");
  };

  return (
    <RegistrationContext.Provider value={{ 
      formData, 
      updateFormData, 
      verificationStatus, 
      updateVerificationStatus,
      clearRegistrationData 
    }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
};
