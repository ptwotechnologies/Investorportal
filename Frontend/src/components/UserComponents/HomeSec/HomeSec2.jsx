import React from "react";
import img1 from "/homeSec2Img1.png";
import img2 from "/homeSec2Img2.png";
import img3 from "/homeSec2Img3.png";
import ScrollAreaSec from "./ScrollAreaSec";

const HomeSec2 = () => {
  return (
    <div className=" mt-12 lg:mt-25 bg-[#001426] lg:bg-[white] rounded-md">
      <div className="hidden lg:block">
        <div
        id="top"
        className="flex flex-col lg:flex-row lg:justify-center lg:bg-white bg-[#001426] rounded-2xl
  lg:items-center gap-25  p-5 font-medium leading-6 tracking-wider text-white lg:text-[#001032]
  overflow-x-hidden px-4 sm:px-6 md:px-10 "
      >
        <div className=" flex lg:flex-col gap-3 justify-center items-center">
          <div className="w-45 h-40 lg:w-30 lg:h-30 bg-[#DEDEDE] rounded-full  "></div>
          <p className="text-sm text-center ">
            Free Expert Guidance
          </p>
        </div>

        <div className=" flex lg:flex-col gap-1 lg:gap-3 justify-end items-center">
          <div className="w-45 h-40 lg:w-30 lg:h-30 bg-[#DEDEDE] rounded-full "></div>
          <p className="text-sm text-center ">
           Real Audience Access
          </p>
        </div>

        <div className=" flex lg:flex-col gap-3 justify-center items-center">
          <div className="w-45 h-40 lg:w-30 lg:h-30 bg-[#DEDEDE] rounded-full "></div>
          <p className="text-sm text-center ">
           Cross-Industry Community
          </p>
        </div>

        <div className="lg:flex-col gap-3 justify-center items-center ">
          <div className="w-45 h-40 lg:w-30 lg:h-30 bg-[#DEDEDE] rounded-full "></div>
          <p className="text-sm text-center ">
           Real Audience Access
          </p>
        </div>

        <div className="lg:flex-col gap-3 justify-center items-center">
          <div className="w-45 h-40 lg:w-30 lg:h-30 bg-[#DEDEDE] rounded-full "></div>
          <p className="text-sm text-center">
           No Hidden Fees
          </p>
        </div>
      </div>
      </div>

      <div>
  <div className="lg:hidden text-white grid grid-cols-3  gap-y-20 place-items-center p-4 pt-20">

    <div className="flex flex-col items-center">
      <div className="w-15 h-15 bg-[#DEDEDE] rounded-full"></div>
      <p className="text-sm text-center w-30 mt-5">
        Free Expert Guidance
      </p>
    </div>
      
      <div>
          <div className="w-0.5 h-22 bg-[#FFFFFF33]"></div>
      </div>

    <div className="flex flex-col items-center">
      <div className="w-15 h-15 bg-[#DEDEDE] rounded-full"></div>
      <p className="text-sm text-center w-30 mt-5">
        Connected Startup Community
      </p>
    </div>

    

    <div className="flex flex-col items-center">
      <div className="w-15 h-15 bg-[#DEDEDE] rounded-full"></div>
      <p className="text-sm text-center w-30 mt-5">
        Access to Real Audiences
      </p>
    </div>

     <div>
          <div className="w-0.5 h-22 bg-[#FFFFFF33]"></div>
      </div>

    <div className="flex flex-col items-center">
      <div className="w-15 h-15 bg-[#DEDEDE] rounded-full"></div>
      <p className="text-sm text-center w-30 mt-5">
        Cross-Domain Collaboration
      </p>
    </div>

    {/* Centered last item */}
    <div className="col-span-3 flex flex-col items-center">
      <div className="w-15 h-15 bg-[#DEDEDE] rounded-full"></div>
      <p className="text-sm text-center mt-5 ">
        100% Transparent Pricing
      </p>
    </div>

  </div>
     </div>

         <hr  className="lg:hidden w-[80%] mx-auto my-10  border border-t border-[#FFFFFF33]"/>


      <div
        id="bottom"
        className="bg-[#001426] w-full text-white rounded-4xl mt-13 "
      >
        <div className="">
          <h1 className="text-4xl font-bold p-12  hidden lg:block ">Who is this portal for?</h1>
           <h1 className="text-4xl font-bold  p-4 pb-10  w-[60%] lg:hidden tracking-wider ">Who is this portal for?</h1>
          <div className="hidden lg:block">
            <div className="flex justify-center items-center gap-5 mx-20  ">
            <div className=" w-[30%]">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Startups</h3>
              <img
                src={img1}
                alt=""
                className="rounded-2xl w-[90%] h-[400px]"
              />
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-10">
                You’re building a startup that solves a real-world problem{" "}
              </p>
            </div>
            <div className=" w-[30%]">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Investors</h3>
              <img
                src={img2}
                alt=""
                className="rounded-2xl w-[90%] h-[400px]"
              />
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-10">
                You want incubated startups curated to your domain{" "}
              </p>
            </div>
            <div className=" w-[30%]">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Service Professionals</h3>
              <img
                src={img3}
                alt=""
                className="rounded-2xl w-[90%] h-[400px]"
              />
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-17">
                You want startups curated to your domain
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
