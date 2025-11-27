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

const PortalDetailsSec = () => {

    const [activeTab, setActiveTab] = useState('Reason for joining the portal');
    
      
    
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
                  <p className=" text-[#001032] text-xl w-full">Allows you to get funding,</p>
                  <p className=" text-[#001032] text-xl  ">resources and investor connect</p>
                  </div>
                  <div >
                    <p className="  text-lg w-full  text-[#000000] relative top-45" >Terms, Privacy Disclosures Cookie Settings © norf.KD Technologies LLP</p>
                  </div>
                 </div>
                </div>
        <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-2 text-center h-screen  w-full">
          <div className="bg-[#001032] h-screen lg:h-auto p-5 lg:p-3 w-full  lg:rounded-lg ">
            <Card className="w-full h-full lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:my-12 my-7" />
                </CardTitle>
                <CardDescription className=" mb-1 text-[#001032] text-md lg:text-sm font-semibold ">
                  Get the most benefits from our pool of possible clients for you
                </CardDescription>
                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-3">
                    <div className="grid gap-2 ">
                     <div className=' w-full hidden lg:block'>
                      <DropdownMenu className="bg-red-300 w-full" >
                              <div className="border border-[#0010321A] w-full px-3 p-2.5 rounded-md"  >
                                <DropdownMenuTrigger className='flex  w-full justify-between items-center  '>
                                <button className='text-[#00103280] font-medium  '>{activeTab}</button>
                                 <div className=' lg:w-[10%] w-[17%] '>
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
                    <div className="grid gap-2  ">
                        <div className='hidden lg:block'>
                             <Calendar2/>
                        </div>
                     
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="text"
                        type="text"
                        placeholder="Pitch Deck Upload"
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="text"
                        type="text"
                        placeholder="Profile Upload"
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="text"
                        type="text"
                        placeholder="Linkedin Profile"
                        required
                        className="p-5 font-medium text-[#00103280]"
                      />
                    </div>
                      <div className="grid gap-2 ">
                     <div className=' w-full '>
                      <DropdownMenu className="bg-red-300 w-full" >
                              <div className="border border-[#0010321A] w-full px-3 p-2.5 rounded-md"  >
                                <DropdownMenuTrigger className='flex  w-full  items-center  '>
                                <button className='text-[#00103280] font-medium  '>{activeTab}</button>
                                 <div className=' lg:w-[10%] w-[10%]'>
                                  <IoIosArrowDown  className='mt-2  w-20 mr-1' />
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
                    
                    
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2 mt-4">
               
                <Link to="/selectPortal" className="w-full"><Button  className="w-full bg-[#001032] relative top-35 lg:top-0">
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

export default PortalDetailsSec
