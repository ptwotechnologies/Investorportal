import React from "react";
import { Link } from "react-router-dom";


const InvestorSec1 = () => {
  return (
    <div
      className="pt-55 lg:pt-15 w-full lg:px-6 px-4 py-2 flex flex-col  justify-center items-center gap-5 h-[680px] lg:h-auto rounded-b-2xl lg:rounded-none
                  bg-linear-to-b from-[#001032] from-40% via-blue-[#001032] at-130% to-[#003198] lg:bg-none text-white "
    >
      <h6 className="lg:hidden mx-auto  border border-white px-4 py-1 rounded-full">
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

      <div id="right" className="w-full my-5 lg:w-[60%]">
        <div className="relative h-[250px] lg:h-[400px] bg-[#D8D8D8] lg:rounded-sm rounded-2xl flex justify-center items-end overflow-hidden shadow-md lg:shadow-none">
          {/* Image */}
          <img
            src="/investorpage1.png"
            alt="Image"
            className="w-full h-full  rounded-2xl lg:rounded-none border hidden lg:block "
          />
         
          <img
            src="/investorpage2.png"
            alt="Image"
            className="w-full h-full shadow-md rounded-2xl  border lg:hidden"
          />

          
          
        </div>
      </div>
      <div className="hidden lg:block text-center  w-[60%]">
        <h1 className="  text-center text-3xl font-semibold  leading-9  tracking-wide  text-[#001032]">
          Discover Curated And High Quality Startups Screened Through a
          Founder-Focused Ecosystem
        </h1>

        <Link to="/login"><button
            className="
        hidden lg:block 
       mx-auto mt-3
        bg-[#001032] text-white 
        p-3 px-15 rounded-sm text-lg

        shadow-lg hover:shadow-2xl
        transition duration-200
      "
          >
            Get Listed
          </button></Link>
      </div>
    </div>
  );
};

export default InvestorSec1;
