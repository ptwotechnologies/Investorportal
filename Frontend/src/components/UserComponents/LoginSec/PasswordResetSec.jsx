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

const PasswordResetSec = () => {
  return (
   <div>
      <div className="flex justify-between items-center lg:min-h-dvh   ">
        <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className=" w-100 " />
              <p className=" text-[#001032] text-xl w-full  ">
                Allows you to get funding,
              </p>
              <p className=" text-[#001032] text-xl  ">
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
          className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-5 text-center  w-full"
        >
          <div className="lg:bg-[#001032] lg:p-3 w-full  lg:rounded-lg ">
            <Card className="w-full  lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:my-13 my-10 mb-15" />
                </CardTitle>
                <CardDescription className=" mb-1 text-[#001032] text-lg lg:text-sm font-semibold  ">
                  <p className="text-lg mb-8">Trouble logging in?</p>
                   <p className="lg:w-[80%] text-sm  mx-auto">Enter your email or phone and we'll send you a link or code to get back into your account.</p>

                </CardDescription>

                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
                <form>
                <div className="flex flex-col gap-6 px-6 lg:mb-48 mb-60">
                  <div className="grid gap-2 ">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email or Phone"
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                  </div>
                </div>
              </form>
              </CardContent>
              <CardFooter className="absolute bottom-5 w-full lg:static">
                <Link to="/passwordresetotp" className="w-full">
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

export default PasswordResetSec
