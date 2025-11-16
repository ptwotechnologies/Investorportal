import React from 'react'
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

const NewPasswordSec = () => {
  return (
    <div>
      <div className="flex justify-between items-center  ">
        <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className=" w-100 " />
              <p className=" text-[#001426] text-xl w-full relative bottom-25 left-17 ">
                Allows you to get funding,
              </p>
              <p className=" text-[#001426] text-xl relative bottom-25 left-17   ">
                resources and investor connect
              </p>
            </div>
            <div>
              <p className="  text-lg w-full  text-[#000000] relative top-10 left-30">
                Terms, Privacy Disclosures Cookie Settings © norf.kD
                Technologies LLP
              </p>
            </div>
          </div>
        </div>
        <div
          id="right"
          className="lg:w-[47%]  lg:pl-20 lg:px-10 lg:py-5 text-center h-screen  w-full"
        >
          <div className="bg-[#001426] h-screen lg:h-auto p-5 lg:p-3 w-full  lg:rounded-lg ">
            <Card className="w-full h-full lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="w-50 h-45 mx-auto" />
                </CardTitle>
                <CardDescription className=" mb-1 text-[#001032] text-lg lg:text-sm font-semibold  ">
                  <p className="lg:text-lg text-xl mb-8">Set your new password and confirm the new password</p>
                   

                </CardDescription>

                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-4">
                    <div className="grid gap-2 ">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter new password"
                        required
                        className="p-5 font-normal text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Confirm new password"
                        required
                        className="p-5 font-normal text-[#00103280]"
                      />
                    </div>
                    <div className="text-start text-[9px] text-[#00103280] leading-4 lg:leading-6 racking-wide  px-2">
                      <p>Password must be strong and contain alphanumeric(123abc), one uppercase letter and one special character(@,#,$)</p>
                      <p className="mt-4 lg:mt-0">By clicking, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
                      <div className="flex items-center gap-2 mt-4 lg:mt-1">
                     <div className="w-4 aspect-square border-2 border-[#00103233] "></div>
                         <p>Log out from all the devices</p>
                        </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Link to="/selectPortal" className="w-full ">
                  <Button className="w-full bg-[#001426] lg:mt-24 mt-35">
                   Reset your password
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

export default NewPasswordSec
