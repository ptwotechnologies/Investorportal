import React from "react";
import logo from "/coptenologo2.png";
import { Button } from "@/components/ui/button";
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
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "@/App";
import InputOtpSec from "./InputOtpSec";
import { verifyOtp as verifyFirebaseOtp } from "@/lib/phoneAuth";

const PasswordResetOtpSec = () => {
  const [otp, setOtp] = useState("");
const navigate = useNavigate();
const location = useLocation();

const email = localStorage.getItem("resetEmail");
const phone = location.state?.phone;
const isPhone = !!phone;

useEffect(() => {
  if (!email && !phone) {
    navigate("/passwordreset");
  }
}, [email, phone, navigate]);

const verifyOtp = async () => {
  if (!otp || otp.length < 6) {
    return toast.error("Please enter a valid 6-digit code");
  }

  try {
    if (isPhone) {
      await verifyFirebaseOtp(otp);
      toast.success("Phone verified successfully");
      navigate("/newpassword", { state: { phone } });
    } else {
      const res = await axios.post(`${serverUrl}/user/verifyOtp`, {
        email,
        otp
      });
      toast.success(res.data.message);
      navigate("/newpassword");
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Invalid or expired OTP");
  }
};

  return (
    <div>
          <div className="flex justify-between items-center lg:min-h-dvh  ">
            <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
              <div className="flex flex-col justify-between items-center gap-y-25">
                <div>
                  <img src={logo} alt="Logo" className=" w-100 " />
                  <p className=" text-[#001032] text-xl w-full  ">
                    Allows you to get funding,
                  </p>
                  <p className=" text-[#001032] text-xl    ">
                    resources and investor connect
                  </p>
                </div>
                <div>
                  <p className="  text-lg w-full  text-[#000000] relative top-45">
                    Terms, Privacy Disclosures Cookie Settings © norf.kD
                    Technologies Pvt. Ltd.
                  </p>
                </div>
              </div>
            </div>
            <div
              id="right"
              className="lg:w-[50%] lg:px-10 lg:py-8 text-center  w-full "
            >
              <div className="lg:bg-[#001032]   lg:p-3 w-full  lg:rounded-lg ">
                <Card className="w-full  lg:h-auto mx-auto rounded-lg">
                  <CardHeader>
                    <CardTitle>
                      <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:my-12 my-10 mb-15" />
                    </CardTitle>
                    <CardDescription className=" mb-1 text-[#001032] text-sm  ">
                       <p className="lg:w-[80%]  mx-auto">Enter the five digit code received in the text or email</p>
    
                    </CardDescription>
    
                    <CardAction></CardAction>
                  </CardHeader>
                  <CardContent className="mx-auto mt-14 lg:mt-8 lg:mb-55 mb-64">
                    <InputOtpSec otp={otp} setOtp={setOtp}/>
                  </CardContent>
                  <CardFooter className="absolute bottom-5 w-full lg:static">
                  
                      <Button className="w-full bg-[#001032] " onClick={verifyOtp}>
                        Continue
                      </Button>
                 
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
          <Toaster/>
        </div>
  )
}

export default PasswordResetOtpSec
