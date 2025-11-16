import React, { useState } from 'react';
import logo from "/ArtesterLogo2.png";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Calendar2 from './Calendar2';

const RegisterPortalSec = () => {

   const [activeTab, setActiveTab] = useState('Business Type');

  

  const tabs = [
    { id: 'Manufacturing', label: ' Manufacturing ' },
    { id: 'Service', label: 'Service' },
     
  ];
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
                    <p className="  text-lg w-full  text-[#000000] relative top-10 left-30" >Terms, Privacy Disclosures Cookie Settings © norf.KD Technologies LLP</p>
                  </div>
                 </div>
                </div>
        <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-5 text-center h-screen  w-full">
          <div className="bg-[#001426] h-screen lg:h-auto p-5 lg:p-3 w-full  lg:rounded-lg ">
            <Card className="w-full h-full lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="w-35 h-30 lgw-50 lg:h-45 mx-auto" />
                </CardTitle>
                <CardDescription className=" mb-1 text-[#001032] text-lg lg:text-sm font-semibold ">
                  Get the most benefits from our pool of possible clients for you
                </CardDescription>
                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-3">
                    <div className="grid gap-2 ">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email or Phone"
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Mobile or Phone"
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Business Name"
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Business Email"
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Website"
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2 lg:hidden">
                     <div className=' w-full '>
                      <DropdownMenu className="bg-red-300 w-full" >
                              <div className="border border-[#0010321A] w-full px-3 p-2.5 rounded-md"  >
                                <DropdownMenuTrigger className='flex items-center gap-35 '>
                                <button className='text-[#00103280] font-medium   '>{activeTab}</button>
                                 <div className='w-[20%]  '>
                                  <IoIosArrowDown  className='mt-2  w-20 ' />
                                 </div>
                                </DropdownMenuTrigger>
                              </div>
                              <DropdownMenuContent className='mt-5'>
                                 {tabs.map((tab) => (
                                        <DropdownMenuItem key={tab.id} onClick={() => setActiveTab(tab.id)} className="text-xl text-[#00103280]">
                                          {tab.label}
                                        </DropdownMenuItem>
                                      ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                              
                          
                         </div>
                    </div>
                    <div className="grid gap-2 lg:hidden">
                      <Calendar2/>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2 mt-4">
               
                <Link to="/selectPortal" className="w-full"><Button  className="w-full bg-[#001426]">
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

export default RegisterPortalSec
