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

const PasswordSuccessSec = () => {
  return (
    <div>
          <div className="flex justify-between items-center lg:min-h-dvh  ">
            <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
             <div className="flex flex-col justify-between items-center gap-y-25">
               <div>
                <img src={logo} alt="Logo" className=" w-100 " />
              <p className=" text-[#001032] text-xl w-full  ">Allows you to get funding,</p>
              <p className=" text-[#001032] text-xl  ">resources and investor connect</p>
              </div>
              <div >
                <p className="  text-lg w-full  text-[#000000] relative top-45" >Terms, Privacy Disclosures Cookie Settings © norf.kD Technologies LLP</p>
              </div>
             </div>
            </div>
            <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-5 text-center  w-full">
               <div className="lg:bg-[#001032]  lg:p-3 w-full  lg:rounded-lg ">
            <Card className="w-full  lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:my-12 my-7" />
                </CardTitle>
                <CardDescription className=" mb-1 text-[#001032] text-lg lg:text-sm font-semibold  ">
                 Password has been reset successfully!
                </CardDescription>
                
                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
               <div className="w-50 h-50 mx-auto border-2 border-[#00142666] rounded-full my-20 lg:my-15">
                 <img src={paymentSuccess} alt="QR"/>
               </div>
               
              </CardContent>
              <CardFooter className="absolute bottom-5 w-full lg:static" >
               
                <Link to="/login" className="w-full"><Button  className="w-full bg-[#001032] ">
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

export default PasswordSuccessSec
