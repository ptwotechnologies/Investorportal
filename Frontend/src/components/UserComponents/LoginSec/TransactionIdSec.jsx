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

const TransactionIdSec = () => {
  return (
    <div>
         <div>
      <div className="flex justify-between items-center  ">
        <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className=" w-100 " />
              <p className=" text-[#001032] text-xl w-full ">
                Allows you to get funding,
              </p>
              <p className=" text-[#001032] text-xl   ">
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
          className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-5 text-center h-screen  w-full"
        >
          <div className="bg-[#001032] h-screen lg:h-auto p-5 lg:p-3 w-full  lg:rounded-lg ">
            <Card className="w-full h-full lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:my-20 my-15" />
                </CardTitle>
                <CardDescription className="  text-[#001032] text-lg lg:text-sm font-semibold mt-8 ">
                 
                   <p className="lg:w-[80%]  mx-auto">Confirm the payment by adding transaction detail</p>

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
                      placeholder="Enter transaction ID or UTR number"
                      required
                      className="lg:p-5 font-medium text-[#00103280]"
                    />
                  </div>
                </div>
              </form>
              </CardContent>
              <CardFooter>
                <Link to="/selectPortal" className="w-full">
                  <Button className="w-full bg-[#001032] mt-5 lg:mt-0">
                    Continue
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TransactionIdSec