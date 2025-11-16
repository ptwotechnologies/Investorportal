import React from "react";
import logo from "/ArtesterLogo2.png";
import { Button } from "@/components/ui/button";
import paymentSuccess from "/paymentsuccess.png"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const PaymentSuccessSec = () => {
  return (
    <div>
          <div className="flex justify-between items-center  ">
            <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
             <div className="flex flex-col justify-between items-center gap-y-25">
               <div>
                <img src={logo} alt="Logo" className=" w-100 " />
              <p className=" text-[#001426] text-xl w-full relative bottom-25 left-17 ">Allows you to get funding,</p>
              <p className=" text-[#001426] text-xl relative bottom-25 left-17   ">resources and investor connect</p>
              </div>
              <div >
                <p className="  text-lg w-full  text-[#000000] relative top-10 left-30" >Terms, Privacy Disclosures Cookie Settings © norf.kD Technologies LLP</p>
              </div>
             </div>
            </div>
            <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-5 text-center h-screen  w-full">
               <div className="bg-[#001426] h-screen lg:h-auto p-5 lg:p-3 w-full  lg:rounded-lg ">
            <Card className="w-full h-full lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="w-50 h-45 mx-auto" />
                </CardTitle>
                <CardDescription className=" mb-1 text-[#001032] text-lg lg:text-sm font-semibold  ">
                 Payment has been received successfully!
                </CardDescription>
                
                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
               <div className="w-50 h-50 mx-auto border-2 border-[#00142666] rounded-full my-20 lg:my-15">
                 <img src={paymentSuccess} alt="QR"/>
               </div>
               
              </CardContent>
              <CardFooter >
               
                <Link to="/selectPortal" className="w-full"><Button  className="w-full bg-[#001426] mt-5  mb-10 lg:mt-0 lg:mb-0">
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

export default PaymentSuccessSec
