import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "@/App";
import logo from "/coptenologo2.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId || localStorage.getItem("userId");
  const role = location.state?.role || localStorage.getItem("role") || "investor";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!userId) {
      navigate("/registerportal");
    }
  }, [userId, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus move
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${serverUrl}/user/verify-email`, {
        userId,
        otp: otpValue,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        // Navigate based on role extra details needed
        navigate("/portaldetails", { state: { userId, role } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setResending(true);
    try {
      await axios.post(`${serverUrl}/user/resend-otp`, { userId });
      setTimer(60);
      toast.success("Verification code resent to your email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle>
            <img src={logo} alt="Logo" className="w-40 mx-auto mb-4" />
            Verify Your Email
          </CardTitle>
          <CardDescription>
            We've sent a 6-digit verification code to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify}>
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border rounded-md focus:border-[#001032] focus:ring-1 focus:ring-[#001032] outline-none"
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <Button type="submit" className="w-full bg-[#001032]" disabled={loading}>
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={timer > 0 || resending}
              className={`font-semibold ${timer > 0 ? "text-gray-400" : "text-[#001032] hover:underline"}`}
            >
              {resending ? "Resending..." : timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
            </button>
          </p>
        </CardFooter>
      </Card>
      <Toaster/>
    </div>
  );
};

export default EmailVerification;
