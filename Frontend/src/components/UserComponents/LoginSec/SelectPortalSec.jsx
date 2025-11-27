import React from 'react'
import logo from "/ArtesterLogo2.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";

const SelectPortalSec = () => {
  return (
    <div>
      <div className="flex justify-between items-center  h-screen">
        <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
                 <div className="flex flex-col justify-between items-center gap-y-25">
                   <div>
                    <img src={logo} alt="Logo" className=" w-100 " />
                  <p className=" text-[#001032] text-xl w-full  ">Allows you to get funding,</p>
                  <p className=" text-[#001032] text-xl ">resources and investor connect</p>
                  </div>
                  <div >
                    <p className="  text-lg w-full  text-[#000000] relative top-45" >Terms, Privacy Disclosures Cookie Settings © norf.KD Technologies LLP</p>
                  </div>
                 </div>
                </div>
        <div
          id="right"
          className="lg:w-[60%] lg:pl-20 lg:px-10 lg:py-2  h-screen"
        >
          <div className="bg-[#001032] h-screen lg:h-auto p-4 lg:p-3 w-full lg:rounded-lg ">
            <div className="bg-white h-full lg:h-auto rounded-md ">
              <div id="top" className="text-center">
                <img src={logo} alt="Logo" className=" lg:w-55  w-45 mx-auto lg:py-14 py-14" />
                <p className=" mb-20 lg:mb-10 px-5 lg:px-10 font-medium text-[#001032]">
                  Get the most benefits from our pool of possible clients for
                  you
                </p>
                <p className="text-[#001032] border border-[#00142666] mx-10 md:mx-40 lg:mx-50 text-xl font-semibold rounded-md mb-15 p-2">
                  Which side are you on?
                </p>
              </div>
              <div id="bottom " className="hidden lg:block">
                <div className="flex justify-center items-center gap-3 p-3 pb-13 text-white ">
                  <div className="bg-[#001032] rounded-sm p-3">
                    <div className="flex justify-start items-center py-5 gap-2 ">
                      <div className="bg-[#FFFFFF] w-10 h-10"></div>
                      <h1 className="text-lg font-semibold">Startup</h1>
                    </div>
                    <p className="text-sm leading-6 tracking-wide mb-5 ">
                      Start exploring, connect with others, get listed, build
                      your portfolio and go live
                    </p>
                    <div className="flex justify-end items-center gap-3">
                      <button className="text-lg flex justify-center items-center font-semibold mb-2 mt-5 bg-white  text-[#000000] p-1 px-2 rounded-sm">
                        {" "}
                        Get Started <IoIosArrowRoundForward size={25} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#002A30] rounded-sm p-3">
                    <div className="flex justify-start items-center py-5 gap-2 ">
                      <div className="bg-[#FFFFFF] w-10 h-10"></div>
                      <h1 className="text-lg font-semibold">Investor</h1>
                    </div>
                    <p className="text-sm leading-6 tracking-wide mb-5 ">
                      Start exploring, connect with others, get listed, build
                      your portfolio and go live
                    </p>
                    <div className="flex justify-end items-center gap-3">
                      <button className="text-lg flex justify-center items-center font-semibold mb-2 mt-5 bg-white  text-[#000000] p-1 px-2 rounded-sm">
                        {" "}
                        Get Started <IoIosArrowRoundForward size={25} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#001032] rounded-sm p-3">
                    <div className="flex justify-start items-center py-5 gap-2 ">
                      <div className="bg-[#FFFFFF] w-10 h-10"></div>
                      <h1 className="text-lg font-semibold">Service Professional</h1>
                    </div>
                    <p className="text-sm leading-6 tracking-wide mb-5 ">
                      Start exploring, connect with others, get listed, build
                      your portfolio and go live
                    </p>
                    <div className="flex justify-end items-center gap-3">
                      <button className="text-lg flex justify-center items-center font-semibold mb-2 mt-5 bg-white  text-[#000000] p-1 px-2 rounded-sm">
                        {" "}
                        Get Started <IoIosArrowRoundForward size={25} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:hidden ">
                <div className="  px-10">
                    <RadioGroup defaultValue="comfortable ">
                  <div className="flex items-center gap-8 mb-4">
                    <RadioGroupItem value="default" id="r1" className="border-2 border-[#001032]  "  />
                    <Label htmlFor="r1" className="text-xl">Start up</Label>
                  </div>
                  <div className="flex items-center gap-8 mb-4">
                    <RadioGroupItem value="comfortable" id="r2" className="border-2 border-[#001032] " />
                    <Label htmlFor="r2" className="text-xl">Investor</Label>
                  </div>
                  <div className="flex items-center gap-8 mb-4">
                    <RadioGroupItem value="compact" id="r3"className="border-2 border-[#001032] "  />
                    <Label htmlFor="r3" className="text-xl">Service professional</Label>
                  </div>
                </RadioGroup>
                </div>
                <div className="text-center ">
                  <Link ><button className="bg-[#001426] text-white w-[90%] p-2 rounded-md relative top-25 ">Continue</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectPortalSec
