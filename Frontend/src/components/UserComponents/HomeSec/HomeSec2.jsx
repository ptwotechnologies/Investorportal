import React from "react";
import img1 from "/homeSec2Img1.png";
import img2 from "/homeSec2Img2.png";
import img3 from "/homeSec2Img3.png";
import ScrollAreaSec from "./ScrollAreaSec";
import { Link } from "react-router-dom";

const HomeSec2 = () => {
  return (
    <div className=" mt-12 lg:mt-25 bg-[#001032] lg:bg-[white] rounded-md">
      <div className="hidden lg:block">
        <div
        id="top"
        className="flex flex-col lg:flex-row lg:justify-center lg:bg-white bg-[#001032] rounded-2xl
  lg:items-center gap-20  p-5 font-medium leading-6 tracking-wider text-white lg:text-[#001032]
  overflow-x-hidden px-4 sm:px-6 md:px-10 "
      >
        <div className=" flex lg:flex-col gap-3 justify-center items-center">
          <div className="w-45 h-40 lg:w-25 lg:h-25 bg-[#DEDEDE] rounded-full  "></div>
          <p className="text-sm text-center  w-[80%] text-[#001032] ">
            Free Expert Guidance
          </p>
        </div>

        <div className=" flex lg:flex-col gap-3 justify-center items-center">
          <div className="w-45 h-40 lg:w-25 lg:h-25 bg-[#DEDEDE] rounded-full  "></div>
          <p className="text-sm text-center  w-[80%] text-[#001032] ">
            Connected Startup Community
          </p>
        </div>

        <div className=" flex lg:flex-col gap-3 justify-center items-center">
          <div className="w-45 h-40 lg:w-25 lg:h-25 bg-[#DEDEDE] rounded-full  "></div>
          <p className="text-sm text-center  w-[80%] text-[#001032] ">
            Access to Real Audiences
          </p>
        </div>

        <div className=" flex lg:flex-col gap-3 justify-center items-center">
          <div className="w-45 h-40 lg:w-25 lg:h-25 bg-[#DEDEDE] rounded-full  "></div>
          <p className="text-sm text-center  w-[80%] text-[#001032] ">
            Cross-Domain Collaboration
          </p>
        </div>

        <div className=" flex lg:flex-col gap-3 justify-center items-center">
          <div className="w-45 h-40 lg:w-25 lg:h-25 bg-[#DEDEDE] rounded-full  "></div>
          <p className="text-sm text-center  w-[80%] text-[#001032] ">
            100% Transparent Pricing
          </p>
        </div>
      </div>
      </div>

      <div>
  <div className="lg:hidden text-white grid grid-cols-3  gap-y-17 place-items-center p-4 px-12 pt-20">

    <div className="flex flex-col items-center">
      <div className="w-15 h-15 bg-[#DEDEDE] rounded-full"></div>
      <p className="text-md text-center w-35 mt-5 font-light">
        Free Expert Guidance
      </p>
    </div>
      
      <div>
          <div className="w-0.5 h-20 bg-[#FFFFFF33]"></div>
      </div>

    <div className="flex flex-col items-center">
      <div className="w-15 h-15 bg-[#DEDEDE] rounded-full"></div>
      <p className="text-md text-center w-35 mt-5 font-light">
        Connected Startup Community
      </p>
    </div>

    

    <div className="flex flex-col items-center">
      <div className="w-15 h-15 bg-[#DEDEDE] rounded-full"></div>
      <p className="text-md text-center w-35 mt-5 font-light">
        Access to Real Audiences
      </p>
    </div>

     <div>
          <div className="w-0.5 h-20 bg-[#FFFFFF33]"></div>
      </div>

    <div className="flex flex-col items-center">
      <div className="w-15 h-15 bg-[#DEDEDE] rounded-full"></div>
      <p className="text-md text-center w-35 mt-5 font-light">
        Cross-Domain Collaboration
      </p>
    </div>

    {/* Centered last item */}
    <div className="col-span-3 flex flex-col items-center">
      <div className="w-15 h-15 bg-[#DEDEDE] rounded-full"></div>
      <p className="text-md text-center mt-5 font-light">
        100% Transparent Pricing
      </p>
    </div>

  </div>
     </div>

         <hr  className="lg:hidden w-[80%] mx-auto my-10  border border-t border-[#FFFFFF33]"/>


      <div
        id="bottom"
        className="bg-[#001032] w-full text-white rounded-4xl lg:rounded-none mt-13 px-4"
      >
        <div className="">
          <h1 className="text-5xl font-semibold p-10  hidden lg:block ">Who is this portal for?</h1>
           <h1 className="text-[44px] font-semibold px-3 py-4 pb-10  w-full lg:hidden tracking-wider leading-10 ">Who is this  portal  for?</h1>
          <div className="hidden lg:block">
            <div className="flex justify-center items-center  mx-20  ">
            <div className=" w-[30%]">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Startups</h3>
             <Link to="/startup"> <div className="rounded-xl w-[90%] h-[400px] bg-gray-200">
                
                
              </div></Link>
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-15">
                You’re building something real and ready to scale{" "}
              </p>
            </div>
            <div className=" w-[30%]">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Investors</h3>
              <Link to="/investor"><div  className="rounded-xl w-[90%] h-[400px] bg-gray-200">
                
               
              </div></Link>
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-15">
                You seek refined, investment-ready startup in your space{" "}
              </p>
            </div>
            <div className=" w-[30%]">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Service Professionals</h3>
             <Link to="/serviceprofessional"> <div className="rounded-xl w-[90%] h-[400px] bg-gray-200">
               
                
              </div></Link>
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-15">
                You want genuine startup leads without paid ads
              </p>
            </div>

            <div className=" w-[30%]">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Channel Partners</h3>
             <Link to="/channelpartners"> <div className="rounded-xl w-[90%] h-[400px] bg-gray-200">
               
                
              </div></Link>
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-15">
                You want genuine startup leads without paid ads
              </p>
            </div>
          </div>
          </div>
        </div>

        <div className="lg:hidden">
          <ScrollAreaSec />
        </div>
      </div>
    </div>
  );
};

export default HomeSec2;
