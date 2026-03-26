import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "/coptenologo2.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SelectPortalSec = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center  lg:min-h-dvh">
        <div id="left" className=" w-[50%] hidden lg:block mx-auto ">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className=" w-100 " />
              <p className=" text-[#001032] text-xl w-full  ">
                Allows you to get funding,
              </p>
              <p className=" text-[#001032] text-xl ">
                resources and investor connect
              </p>
            </div>
            <div>
              <p className="  text-lg w-full  text-[#000000] relative top-45">
                Terms, Privacy Disclosures Cookie Settings © Copteno
                Technologies LLP
              </p>
            </div>
          </div>
        </div>
        <div id="right" className="lg:w-[50%]  lg:px-10 lg:py-2   w-full   ">
          <div className="lg:bg-[#001032]   lg:p-3 w-full lg:rounded-lg  ">
            <div className=" lg:h-auto  rounded-md bg-white ">
              <div id="top" className="text-center ">
                <img
                  src={logo}
                  alt="Logo"
                  className=" lg:w-55  w-45 mx-auto lg:py-16 py-14"
                />
                <p className=" mb-20 lg:mb-10 px-5 lg:px-10  text-[#001032]">
                  Get the most benefits from our pool of possible clients for
                  you
                </p>
                <p className="text-[#001032] border border-[#00142666] mx-10 md:mx-40 lg:mx-50 text-xl  rounded-md lg:mb-15 mb-10 p-2">
                  Which side are you on?
                </p>
              </div>
              <div id="bottom " className="hidden lg:block">
                <div className="flex justify-center items-center gap-3 p-3 pb-17 text-white ">
                  <div className="bg-[#001032CC] rounded-sm p-3">
                    <div className="flex justify-start items-center py-3 gap-2 ">
                      <div className="bg-[#FFFFFF] w-6 h-6"></div>
                      <h1 className="text-sm ">Startup</h1>
                    </div>
                    <p className="text-xs leading-5 tracking-wide mb-2 ">
                      Start exploring, connect with others, get listed, build
                      your portfolio and go live
                    </p>
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => {
                          localStorage.setItem("role", "startup");
                          navigate("/registerportal", {
                            state: { role: "startup" },
                          });
                        }}
                        className="text-sm flex justify-center items-center  mb-2 mt-3 bg-white text-[#000000] p-1 px-2 rounded-sm"
                      >
                        Get Started <IoIosArrowRoundForward size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#002A30CC] rounded-sm p-3">
                    <div className="flex justify-start items-center py-3 gap-2 ">
                      <div className="bg-[#FFFFFF] w-6 h-6"></div>
                      <h1 className="text-sm ">Investor</h1>
                    </div>
                    <p className="text-xs leading-5 tracking-wide mb-2 ">
                      Start exploring, connect with others, get listed, build
                      your portfolio and go live
                    </p>
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => {
                          localStorage.setItem("role", "investor");
                          navigate("/registerportal", {
                            state: { role: "investor" },
                          });
                        }}
                        className="text-sm flex justify-center items-center  mb-2 mt-3 bg-white text-[#000000] p-1 px-2 rounded-sm"
                      >
                        Get Started <IoIosArrowRoundForward size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#65677E] rounded-sm p-3">
                    <div className="flex justify-start items-center py-3 gap-2 ">
                      <div className="bg-[#FFFFFF] w-6 h-6"></div>
                      <h1 className="text-sm ">
                        Service Professional
                      </h1>
                    </div>
                    <p className="text-xs leading-5 tracking-wide mb-2 ">
                      Start exploring, connect with others, get listed, build
                      your portfolio and go live
                    </p>
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => {
                          localStorage.setItem("role", "service_professional");
                          navigate("/registerportal", {
                            state: { role: "service_professional" },
                          });
                        }}
                        className="text-sm flex justify-center items-center  mb-2 mt-3 bg-white text-[#000000] p-1 px-2 rounded-sm"
                      >
                        Get Started <IoIosArrowRoundForward size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:hidden ">
                <div className="  px-10">
                  <RadioGroup onValueChange={setRole}>
                    <div className="bg-[#001032CC] text-white px-5 py-2 mb-2 rounded-md">
                      <div className="flex items-center gap-5 ">
                        <RadioGroupItem
                          value="startup"
                          id="r1"
                          className="border-2 border-white"
                        />
                        <Label htmlFor="r1" className="text-lg">
                         Startup or Founder
                        </Label>
                      </div>
                    </div>

                    <div className="bg-[#002A30CC] text-white px-5 py-2 mb-2 rounded-md">
                      <div className="flex items-center gap-5 ">
                        <RadioGroupItem
                          value="investor"
                          id="r2"
                          className="border-2 border-white"
                        />
                        <Label htmlFor="r2" className="text-lg">
                          Angel Investor or VC
                        </Label>
                      </div>
                    </div>

                    <div className="bg-[#65677E] text-white px-5 py-2 mb-2 rounded-md">
                      <div className="flex items-center gap-5">
                        <RadioGroupItem
                          value="service_professional"
                          id="r3"
                          className="border-2 border-white"
                        />
                        <Label htmlFor="r3" className="text-lg">
                         Service professional
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <div className="text-center absolute bottom-5 w-full lg:stactic">
                  <button
                    className="bg-[#001426] text-white w-[90%] p-2 rounded-md"
                    onClick={() => {
                      localStorage.setItem("role", role);
                      if (!role) {
                        toast.error("Please select a role");
                        return;
                      }
                       localStorage.setItem("role", role);
                      navigate("/registerportal", { state: { role } });
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default SelectPortalSec;
