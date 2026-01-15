import React, { useEffect } from "react";
import logo from "/ArtesterLogo2.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PlansSec from "./PlansSec";

const OnboardingPlanSec = () => {

  const location = useLocation();
   const navigate = useNavigate();
const userId = location.state?.userId || localStorage.getItem("userId");

 const role =
    location.state?.role || localStorage.getItem("role");

  useEffect(() => {
    if (role === "investor") {
      navigate("/paymentsuccess", { replace: true }); 
    }
  }, [role, navigate]);

  if (role === "investor") return null;


  return (
    <div>
      <div className="flex justify-between items-center  lg:min-h-dvh">
        <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
                 <div className="flex flex-col justify-between items-center gap-y-25">
                   <div>
                    <img src={logo} alt="Logo" className=" w-100 " />
                  <p className=" text-[#001032] text-xl w-full  ">Allows you to get funding,</p>
                  <p className=" text-[#001032] text-xl   ">resources and investor connect</p>
                  </div>
                  <div >
                    <p className="  text-lg w-full  text-[#000000] relative top-45" >Terms, Privacy Disclosures Cookie Settings © Artestor Technologies LLP</p>
                  </div>
                 </div>
                </div>
        <div 
          id="right"
          className="lg:w-[60%] lg:pl- lg:px-2 lg:py-2  "
        >
          <div className="lg:bg-[#001032]  lg:p-3 w-screen lg:w-auto lg:rounded-lg ">
            <div className="bg-white  lg:h-auto rounded-md ">
              <div id="top" className="text-center">
                <img src={logo} alt="Logo" className="lg:w-55  w-45 mx-auto lg:py-6 py-8" />
                
                <p className="text-[#001032] border-2 border-[#00103280] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)] mx-5 hidden lg:block   lg:mx-50 text-lg font-semibold rounded-md  p-2">
                  Choose the best suited onboarding plan for you
                </p>
                <p className="text-[#001032] border-2 border-[#00103280]  shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)] mb-2 mx-4 lg:hidden text-lg font-semibold rounded-sm  p-2">
                  Choose the Onboarding Plan
                </p>
              </div>
              <div id="bottom " className=" w-full ">
               <div>
                <PlansSec userId={userId}/>
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
