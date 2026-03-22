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
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "@/App";


const NewPasswordSec = () => {
  const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const navigate = useNavigate();

const email = localStorage.getItem("resetEmail");


const resetPassword = async (e) => {

  e.preventDefault();

  if(newPassword !== confirmPassword){
    return toast.error("Passwords do not match");
  }

  try {

    const res = await axios.post(`${serverUrl}/user/resetPassword`, {
      email,
      newPassword
    });

    toast.success(res.data.message);

    navigate("/passwordsuccess");

  } catch (error) {

    toast.error(error.response?.data?.message || "Error");

  }

};


  return (
    <div>
      <div className="flex justify-between items-center  lg:min-h-dvh">
        <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className=" w-100 " />
              <p className=" text-[#001032] text-xl w-full  ">
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
          className="lg:w-[50%]   lg:px-10 lg:py-5 text-center   w-full"
        >
          <div className="lg:bg-[#001032] lg:p-3 w-full lg:rounded-lg ">
            <Card className="w-full lg:h-auto mx-auto rounded-lg lg:border border-none">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:my-12 my-7" />
                </CardTitle>
                <CardDescription className=" mb-1 text-[#001032]  lg:text-sm  ">
                  <p className="lg:text-lg text-[15px] mb-8">Set your new password and confirm the new password</p>
                   

                </CardDescription>

                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
                <form onSubmit={resetPassword}> 
                  <div className="flex flex-col gap-4 px-4 lg:px-0 lg:mb-4 mb-40">
                    <div className="grid gap-2 ">
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                        required
                        className="p-5  text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        required
                        className="p- text-[#00103280]"
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
                   <CardFooter className="absolute bottom-5 right-2 left-2 lg:static">
                
                  <Button type="submit" className="w-full bg-[#001032] lg:mt-24 ">
                   Reset your password
                  </Button>
           
              </CardFooter>
                </form>
              </CardContent>
             
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPasswordSec
