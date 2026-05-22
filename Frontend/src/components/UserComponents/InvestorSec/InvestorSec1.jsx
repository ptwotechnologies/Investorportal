import React from "react";
import { Link } from "react-router-dom";


const InvestorSec1 = () => {
  return (
    <div
      className="pt-50 lg:pt-15 w-full lg:px-6 min-[1400px]:!pt-19 px-4 py-2 flex flex-col justify-center items-center gap-5 h-[680px] lg:h-auto rounded-b-2xl lg:rounded-none
                  bg-linear-to-b from-[#001032] from-40% via-blue-[#001032] at-130% to-[#003198] lg:bg-none text-white "
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col justify-center items-center gap-5">
        <h6 className="lg:hidden mx-auto  border border-white px-4 py-1 rounded-full mt-15">
          For Investors
        </h6>
        <div
          id="left"
          className="w-full text-center lg:text-start  lg:my-5 lg:text-[#001032]   lg:pt-3 "
        >
          <h1 className=" text-4xl lg:text-4xl lg:font-bold font-semibold lg:leading-11 leading-12 tracking-wide lg:w-[80%] lg:hidden">
            Discover <br /> Curated And High Quality Startups Screened Through a
            Founder-Focused Ecosystem{" "}
          </h1>
          <button className="lg:hidden  mt-7 lg:bg-[#001032] lg:text-white bg-white text-[#001032] p-2 lg:px-13 px-8 rounded-sm text-lg ">
            Get Listed
          </button>
        </div>

        <div id="right" className="w-full my-5 lg:my-0 lg:w-[80%] min-[1450px]:w-full">
          <div className="relative h-[250px] lg:!h-[400px] min-[1400px]:!h-[550px] bg-[#D8D8D8] lg:bg-[#FDFDFD] lg:rounded-sm rounded-2xl flex justify-center items-end overflow-hidden shadow-md lg:shadow-none border">
            {/* Image */}
            <div className="hidden lg:flex items-center justify-between w-full h-full">
            <img src="/investorImg11.png" alt="" className="w-1/2 h-full object-contain scale-120" />
            <img src="/investorImg22.png" alt="" className="w-1/2 h-full object-contain scale-120" />
           </div>
          
            <img
              src="/investorpage2.png"
              alt="Image"
              className="w-full h-full shadow-md rounded-2xl border lg:hidden"
            />
            {/* Desktop Button */}
            <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <Link to="/login">
                <button className="bg-[#001032] text-white p-2 px-12 rounded-md text-lg shadow-lg hover:shadow-2xl transition duration-200">
                  Get Listed
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:block text-center  w-[60%] my-4">
          <h1 className="  text-center text-3xl font-semibold  leading-9  tracking-wide  text-[#001032]">
            Discover Curated And High Quality Startups Screened Through a
            Founder-Focused Ecosystem
          </h1>

        </div>
      </div>
    </div>
  );
};

export default InvestorSec1;
