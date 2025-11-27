import React from "react";
import logo from "/ArtesterLogo2.png";
import { Button } from "@/components/ui/button";
import qrImg from "/qr.jpg"
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
import { Link } from "react-router-dom";

const ScannerSec = () => {
  return (
   <div>
          <div className="flex justify-between items-center  ">
            <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
             <div className="flex flex-col justify-between items-center gap-y-25">
               <div>
                <img src={logo} alt="Logo" className=" w-100 " />
              <p className=" text-[#001032] text-xl w-full  ">Allows you to get funding,</p>
              <p className=" text-#001032] text-xl   ">resources and investor connect</p>
              </div>
              <div >
                <p className="  text-lg w-full  text-[#000000] relative top-45" >Terms, Privacy Disclosures Cookie Settings © norf.kD Technologies LLP</p>
              </div>
             </div>
            </div>
            <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-3 text-center h-screen">
               <div className="bg-[#001032] h-screen lg:h-auto p-5 lg:p-3 w-full  lg:rounded-lg ">
            <Card className="w-full h-full lg:h-auto mx-auto rounded-lg">
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
                 <img src={qrImg} alt="QR"/>
               </div>
               <p className="lg:text-xs text-xs text-[#001032B2] lg:w-[50%] w-[98%] mx-auto lg:my-1 my-6 font-medium tracking-wide leading-6">Scan the QR code and proceed with the payment as per the chosen plan</p>
              </CardContent>
              <CardFooter >
               
                <Link to="/selectPortal" className="w-full"><Button  className="w-full bg-[#001032] mt-7 lg:mt-0">
                  Continue
                </Button></Link>
                
              </CardFooter>
              
            </Card>
          </div>
            </div>
          </div>
          
        </div>
  )
}

export default ScannerSec
