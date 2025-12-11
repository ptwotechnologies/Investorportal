import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "/ArtesterLogo2.png";
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
import { Link } from "react-router-dom";
import { serverUrl } from "@/App";

const PaymentSuccessSec = () => {
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in localStorage");
    }
  }, []);

  
  const checkPaymentStatus = async () => {
    if (!userId) return; 

    try {
      const res = await axios.post(`${serverUrl}/user/payment-status`, { userId });
      console.log("API response:", res.data);

      const status = res.data?.paymentStatus?.toLowerCase() || "pending";
      setPaymentStatus(status);
      setLoading(status !== "approved");
    } catch (err) {
      console.error("Error fetching payment status:", err);
      setLoading(true);
      setPaymentStatus("pending");
    }
  };

  
  useEffect(() => {
    if (userId) {
      checkPaymentStatus();
      const interval = setInterval(checkPaymentStatus, 60000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  
  const statusMessage =
    paymentStatus === "approved"
      ? "Payment approved! You can continue."
      : "We are reviewing your details. Please wait until it gets approved.";

  return (
    <div>
      <div className="flex justify-between items-center lg:min-h-dvh">
        <div id="left" className="w-[40%] hidden lg:block mx-auto">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className="w-100" />
              <p className="text-[#001032] text-xl w-full">Allows you to get funding,</p>
              <p className="text-[#001032] text-xl">resources and investor connect</p>
            </div>
            <div>
              <p className="text-lg w-full text-[#000000] relative top-45">
                Terms, Privacy Disclosures Cookie Settings © norf.kD Technologies LLP
              </p>
            </div>
          </div>
        </div>

        <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-5 text-center w-full">
          <div className="lg:bg-[#001032] lg:p-3 w-full lg:rounded-lg">
            <Card className="w-full lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55 w-45 mx-auto lg:my-12 my-7" />
                </CardTitle>
                <CardDescription className="mb-1 text-[#001032] text-lg lg:text-sm font-semibold">
                  Payment has been received successfully!
                  <p className="mt-2">{statusMessage}</p>
                  {loading && <p className="mt-2 text-yellow-500 font-bold">Processing...</p>}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="w-50 h-50 mx-auto border-2 border-[#00142666] rounded-full my-10 lg:my-12">
                  <img src={paymentSuccess} alt="QR" />
                </div>
              </CardContent>

              <CardFooter className="absolute bottom-5 w-full lg:static">
                {paymentStatus === "approved" ? (
                  <Link to="/login" className="w-full">
                    <Button className="w-full bg-[#001032]">Continue</Button>
                  </Link>
                ) : (
                  <Button className="w-full bg-[#001032] opacity-50 cursor-not-allowed" disabled>
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
