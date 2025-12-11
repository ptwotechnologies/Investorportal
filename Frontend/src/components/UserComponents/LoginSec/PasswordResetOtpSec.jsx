import React from "react";
import logo from "/ArtesterLogo2.png";
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
import { Link } from "react-router-dom";
import InputOtpSec from "./InputOtpSec";

const PasswordResetOtpSec = () => {
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
                    Technologies LLP
                  </p>
                </div>
              </div>
            </div>
            <div
              id="right"
              className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-8 text-center  w-full"
            >
              <div className="lg:bg-[#001032]   lg:p-3 w-full  lg:rounded-lg ">
                <Card className="w-full  lg:h-auto mx-auto rounded-lg">
                  <CardHeader>
                    <CardTitle>
                      <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:my-12 my-10 mb-15" />
                    </CardTitle>
                    <CardDescription className=" mb-1 text-[#001032] text-lg lg:text-sm font-semibold  ">
                       <p className="lg:w-[80%]  mx-auto">Enter the five digit code received in the text or email</p>
    
                    </CardDescription>
    
                    <CardAction></CardAction>
                  </CardHeader>
                  <CardContent className="mx-auto mt-14 lg:mt-8 lg:mb-55 mb-64">
                    <InputOtpSec/>
                  </CardContent>
                  <CardFooter className="absolute bottom-5 w-full lg:static">
                    <Link to="/newpassword" className="w-full">
                      <Button className="w-full bg-[#001032] ">
                        Continue
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
  )
}

export default PasswordResetOtpSec
