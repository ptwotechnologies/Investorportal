import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../../App";

const VerifyEmailLink = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [statusState, setStatusState] = useState({ type: "verifying", message: "" });
  
  const status = statusState.type;
  const message = statusState.message;

  useEffect(() => {
    const verify = async () => {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token") || searchParams.get("otp");

      console.log("DEBUG: Verifying with userId:", userId, "token:", token);

      if (!userId || !token) {
        setStatusState({ type: "error", message: "Invalid verification link." });
        return;
      }

      try {
        const response = await axios.post(`${serverUrl}/user/verify-email`, {
          userId,
          otp: token,
        });

        console.log("DEBUG: Verification response:", response.status);

        if (response.status === 200) {
          // Commented out to prevent auto-login during onboarding
          // localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("paymentStatus", response.data.paymentStatus || "not_paid");
          localStorage.setItem(
            "user",
            JSON.stringify({
              userId: response.data.userId,
              role: response.data.role,
              paymentStatus: response.data.paymentStatus || "not_paid",
            })
          );
          if (response.data.role) localStorage.setItem("role", response.data.role);
          if (response.data.serviceType) localStorage.setItem("serviceType", response.data.serviceType);

          setStatusState({ type: "success", message: "" });
          setTimeout(() => {
            navigate("/portaldetails", { 
              state: { 
                userId: response.data.userId, 
                role: response.data.role,
                serviceType: response.data.serviceType 
              } 
            });
          }, 2000);
        }
      } catch (err) {
        console.error("Verification failed", err);
        const errorMsg = err.response?.data?.message || "The verification link is invalid or has expired.";
        setStatusState({ type: "error", message: errorMsg });
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center">
        {status === "verifying" && (
          <>
            <div className="w-12 h-12 border-4 border-[#001032] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying Your Email</h2>
            <p className="text-gray-600">Please wait while we confirm your email address...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{color: '#22c55e'}}>Email Verified!</h2>
            <p className="text-gray-600">Your email has been successfully verified. Redirecting you to complete your profile...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{color: '#ef4444'}}>Verification Failed</h2>
            <p className="text-gray-600">{message || "The verification link is invalid or has expired."}</p>
            <button
              onClick={() => navigate("/registerportal")}
              className="mt-6 w-full bg-[#001032] text-white py-2 rounded-md hover:bg-opacity-90 transition"
            >
              Continue 
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailLink;
