import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "@/App";

const LogicSec1 = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/user/login`, {
        email,
        password,
      });

      if (response.data.message === "Login successful") {
        toast.success("Login successful!");
        // Redirect user after login
        navigate("/profile"); // apne project ka route
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
      }
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center   lg:min-h-dvh  ">
        <div id="left" className=" w-[40%] hidden lg:block mx-auto  ">
         <div className="flex flex-col justify-between items-center gap-y-25">
           <div>
            <img src={logo} alt="Logo" className=" w-100 " />
          <p className=" text-[#001032] text-xl w-full  ">Allows you to get funding,</p>
          <p className=" text-[#001032] text-xl   ">resources and investor connect</p>
          </div>
          <div >
            <p className="  text-lg w-full  text-[#000000] relative top-45" >Terms, Privacy Disclosures Cookie Settings © norf.kD Technologies LLP</p>
          </div>
         </div>
        </div>
        <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-5 text-center ">
          <div className="lg:bg-[#001032]   lg:p-3 w-full lg:rounded-lg  ">
            <Card className="w-full     mx-auto rounded-lg   lg:h-auto ">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:my-12 my-7" />
                </CardTitle>
                <CardDescription className=" text-[#001032] text-sm lg:text-sm font-semibold my-5 ">
                  Sign Up to explore the tools and resources of the portal
                </CardDescription>
                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2 ">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email or Phone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                    <div className="text-start text-xs text-[#00103280] leading-5 lg:leading-7 tracking-wide lg:w-[90%]">
                      <p>People who use our service may have uploaded your contact details and information to Instagram. Learn More</p>
                      <p className="lg:hidden mt-3">By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
                    </div>
                  </div>

                  <CardFooter className="flex-col gap-2 mt-4 absolute bottom-5 w-full lg:static">
                <Button type="submit" className="w-full bg-[#001032] my-2">
                  Log in
                </Button>
                <Link to="/selectPortal" className="w-full"><Button  className="w-full bg-[#001032]">
                  Sign up
                </Button></Link>
                <div className="fle w-full text-end">
                <Link
                  to="/passwordreset"
                  className="ml-auto inline-block text-sm underline-offset-4 font-semibold hover:underline w-full text-[#001032CC]  "
                >
                  Forgot password?
                </Link>
              </div>
              </CardFooter>
                </form>
              </CardContent>
              
              
            </Card>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  )
}

export default LogicSec1
