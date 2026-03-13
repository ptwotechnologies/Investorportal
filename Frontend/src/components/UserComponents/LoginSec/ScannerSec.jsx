import React, { useState } from "react";
import logo from "/ArtesterLogo2.png";
import { Button } from "@/components/ui/button";
import qrImg from "/qr.jpg";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "@/App";
import axios from "axios";
import toast from "react-hot-toast";

// Provide a load script utility
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const ScannerSec = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkoutHandler = async () => {
    setLoading(true);
    
    // 1. load razorpay script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }


    try {
      const userId = localStorage.getItem("userId"); // signup se store kiya hua
      if (!userId) {
     toast.error("User not found. Please signup first.");
     setLoading(false);
     return;
  }
      // 2. create order

      const result = await axios.post(
        `${serverUrl}/api/payment/checkout`, 
        { amount: 100 ,
          userId: userId
        },
        
      );

      if (!result.data.success) {
        toast.error("Failed to initiate payment. Please try again.");
        setLoading(false);
        return;
      }

      const { amount, id: order_id, currency } = result.data.order;

      // 3. Initiate payment
      const options = {
        key: result.data.key_id, // Safely fetching Key ID from the backend API directly
        amount: amount.toString(),
        currency: currency,
        name: "Artestor Technologies",
        description: "Test Transaction",
        image: logo, // Use our logo
        order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          // 4. Verify Payment after success
          const data = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyRes = await axios.post(
              `${serverUrl}/api/payment/paymentverification`, 
              data,
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            
            if (verifyRes.data.success) {
               toast.success("Payment verified successfully!");
               navigate("/transactionId");
            } else {
               toast.error("Payment verification failed.", { duration: 4000 });
            }
          } catch(err) {
            console.error("Verification Error:", err);
            toast.error(err.response?.data?.message || "Error verifying payment. Please contact support.", { duration: 4000 });
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Artestor Office",
        },
        theme: {
          color: "#001032",
        },
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response){
        console.error("Payment Failed:", response.error);
        toast.error(response.error.description || "Payment failed or was cancelled.", { duration: 4000 });
      });

      paymentObject.open();

    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong while initiating payment. Please try again.", { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center lg:min-h-dvh  ">
        <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className=" w-100 " />
              <p className=" text-[#001032] text-xl w-full  ">Allows you to get funding,</p>
              <p className=" text-#001032] text-xl   ">resources and investor connect</p>
            </div>
            <div>
              <p className="  text-lg w-full  text-[#000000] relative top-45">Terms, Privacy Disclosures Cookie Settings © Artestor Technologies LLP</p>
            </div>
          </div>
        </div>
        <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-3 text-center">
          <div className="lg:bg-[#001032] lg:p-3 w-full  lg:rounded-lg ">
            <Card className="w-full  lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:my-12 my-7" />
                </CardTitle>
                <CardDescription className=" mb-1 text-[#001032] text-lg lg:text-sm font-semibold hidden lg:block ">
                  Complete the payment by scanning the QR code below
                </CardDescription>
                <CardDescription className=" mb-1 text-[#001032] text-xl   lg:hidden font-bold">
                  Complete the payment
                </CardDescription>
                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
                <div className="w-70 h-70 mx-auto border-2 border-[#00142666]">
                  <img src={qrImg} alt="QR" />
                </div>
                <p className="lg:text-xs text-xs text-[#001032B2] lg:w-[50%] w-[98%] mx-auto lg:my-1 my-6 font-medium tracking-wide leading-6">Scan the QR code and proceed with the payment as per the chosen plan</p>
              </CardContent>
              <CardFooter className="absolute bottom-5 w-full lg:static">
                <Button 
                  className="w-full bg-[#001032]" 
                  onClick={checkoutHandler}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Continue"}
                </Button>
              </CardFooter>

            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerSec;
