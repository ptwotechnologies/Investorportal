import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "@/App";
import { Loader2 } from "lucide-react";

const VerifyEmailLink = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    const verify = async () => {
      const userId = searchParams.get("userId");
      const otp = searchParams.get("otp");

      if (!userId || !otp) {
        setStatus("error");
        return;
      }

      try {
        const response = await axios.post(`${serverUrl}/user/verify-email`, {
          userId,
          otp,
        });

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", userId);
          setStatus("success");
          setTimeout(() => {
            navigate("/portaldetails", { state: { userId } });
          }, 2000);
        }
      } catch (err) {
        console.error("Verification failed", err);
        setStatus("error");
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center">
        {status === "verifying" && (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-[#001032] mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verifying Your Email</h2>
            <p className="text-gray-600">Please wait while we confirm your email address...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
            <p className="text-gray-600">Your email has been successfully verified. Redirecting you to complete your profile...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-gray-600">The verification link is invalid or has expired.</p>
            <button
              onClick={() => navigate("/registerportal")}
              className="mt-6 w-full bg-[#001032] text-white py-2 rounded-md hover:bg-opacity-90 transition"
            >
              Back to Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailLink;
