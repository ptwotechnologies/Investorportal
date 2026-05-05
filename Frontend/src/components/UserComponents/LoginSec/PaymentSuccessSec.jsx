import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "/coptenologo2.png";
import { Button } from "@/components/ui/button";
import paymentSuccess from "/paymentsuccess.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { serverUrl } from "@/App";
import { SpinnerButton } from "./StatusSpinner";
import { useRegistration } from "@/context/RegistrationContext";

const PaymentSuccessSec = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearRegistrationData } = useRegistration();
  const isFreePlan = location.state?.isFreePlan === true;

  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in localStorage");
      // Redirect to registration if no userId is found
      navigate("/registerportal");
    }
  }, [navigate]);

  const checkPaymentStatus = async () => {
    if (!userId) return;

    try {
      const res = await axios.post(`${serverUrl}/user/payment-status`, {
        userId,
      });
      console.log("API response:", res.data);

      const status = res.data?.paymentStatus?.toLowerCase() || "pending";
      // Removed security guards to prevent unwanted redirects
      
      setPaymentStatus(status);
      setLoading(status !== "approved");
    } catch (err) {
      console.error("Error fetching payment status:", err);
      setLoading(true);
      setPaymentStatus("pending");
    }
  };

  useEffect(() => {
    if (!userId || paymentStatus === "approved") return;
    // ⭐ Removed investor skip so investors check for admin approval too

    checkPaymentStatus();
    const interval = setInterval(() => {
      checkPaymentStatus();
    }, 360000);

    return () => clearInterval(interval);
  }, [userId, paymentStatus, role]); // ⭐ removed isFreePlan

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const roleinvest =
    role === "investor"
      ? "Thank you for joining as an investor!"
      : isFreePlan
        ? paymentStatus === "approved"
          ? "Your free account is now active!" 
          : "Your free account is being reviewed!"
        : paymentStatus === "approved"
          ? "Payment has been received successfully!"
          : "Payment verification is in progress...";

  const statusMessage =
    paymentStatus === "approved"
      ? "Your account is active. You can now log in."
      : role === "investor"
        ? "We are reviewing your details. Your account will be activated within 30 minutes. You'll receive a confirmation via email/WhatsApp once it's live."
        : isFreePlan
          ? "Your account is under review. You'll be notified via email/WhatsApp once it's activated." 
          : "We are reviewing your payment. Your account will be activated within 30 minutes. You'll receive a confirmation via email/WhatsApp once it's live.";

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
                Terms, Privacy Disclosures Cookie Settings © norf.kD
                Technologies Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>

        <div
          id="right"
          className="lg:w-[50%]  lg:px-10 lg:py-4 text-center w-full"
        >
          <div className="lg:bg-[#001032] lg:p-3 w-full lg:rounded-lg">
            <Card className="w-full lg:min-h-[600px] mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img
                    src={logo}
                    alt="Logo"
                    className="lg:w-45 w-45 mx-auto lg:my-10 my-7"
                  />
                </CardTitle>
                <CardDescription className="mb-1 text-[#001032] text-xs lg:text-sm ">
                  {roleinvest}
                  <p className="mt-2 lg:w-[80%]  mx-auto">{statusMessage}</p>
                  {loading && (
                    <p className="mt-2 text-yellow-500 ">Processing...</p>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {paymentStatus === "approved" ? (
                  <div className="w-30 h-30 lg:w-40 lg:h-40 mx-auto border-2 border-[#00142666] rounded-full my-16 mt-20 lg:my-12">
                    <img src={paymentSuccess} alt="QR" />
                  </div>
                ) : (
                  <div className="my-16 mt-20 lg:my-12">
                    <SpinnerButton />
                  </div>
                )}
              </CardContent>

              <CardFooter className="absolute bottom-5 w-full lg:static mt-32">
                
                {paymentStatus === "approved" ? (
                  <Link
                    to="/login"
                    className="w-full"
                    onClick={() => {
                      // ⭐ Clear all registration data and drafts
                      clearRegistrationData();
                      // Clear auth token so login page doesn't auto-redirect
                      localStorage.removeItem("token");
                    }}
                  >
                    <Button className="w-full bg-[#001032]">
                      Back to Login
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full bg-[#001032] opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Processing...
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessSec;
