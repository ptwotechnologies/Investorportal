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
                  <p className=" text-[#001426] text-xl w-full relative bottom-25 left-17 ">Allows you to get funding,</p>
                  <p className=" text-[#001426] text-xl relative bottom-25 left-17   ">resources and investor connect</p>
                  </div>
                  <div >
                    <p className="  text-lg w-full  text-[#000000] relative top-10 left-20" >Terms, Privacy Disclosures Cookie Settings © norf.KD Technologies LLP</p>
                  </div>
                 </div>
                </div>
        <div
          id="right"
          className="lg:w-[60%] lg:pl-20 lg:px-10 lg:py-2  h-screen"
        >
          <div className="bg-[#001426] h-screen lg:h-auto p-4 lg:p-3 w-screen lg:w-auto lg:rounded-lg ">
            <div className="bg-white h-full lg:h-auto rounded-md ">
              <div id="top" className="text-center">
                <img src={logo} alt="Logo" className=" w-50 h-45 mx-auto " />
                
                <p className="text-[#001032] border-2 border-[#00142666] mx-5 hidden lg:block  lg:mx-30 text-lg font-semibold rounded-md  p-2">
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
