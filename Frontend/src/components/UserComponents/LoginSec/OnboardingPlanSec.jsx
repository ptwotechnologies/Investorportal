import React from "react";
import logo from "/ArtesterLogo2.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import PlansSec from "./PlansSec";

const OnboardingPlanSec = () => {
  return (
    <div>
      <div className="flex justify-between items-center  h-screen">
        <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
                 <div className="flex flex-col justify-between items-center gap-y-25">
                   <div>
                    <img src={logo} alt="Logo" className=" w-100 " />
                  <p className=" text-[#001032] text-xl w-full  ">Allows you to get funding,</p>
                  <p className=" text-[#001032] text-xl   ">resources and investor connect</p>
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
          <div className="bg-[#001032] h-screen lg:h-auto p-4 lg:p-3 w-screen lg:w-auto lg:rounded-lg ">
            <div className="bg-white h-full lg:h-auto rounded-md ">
              <div id="top" className="text-center">
                <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:py-12 py-5" />
                
                <p className="text-[#001032] border-2 border-[#00142666] mx-5 hidden lg:block lg:mb-6  lg:mx-30 text-lg font-semibold rounded-md  p-2">
                  Choose the best suited onboarding plan for you
                </p>
              </div>
              <div id="bottom " className="">
               <div>
                <PlansSec/>
               </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPlanSec
