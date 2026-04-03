import React from "react";
import { Link } from "react-router-dom";

const StartupSec1 = () => {
  return (
    <div
      className="pt-60 lg:pt-15 w-full lg:px-6 px-4 py-2 flex flex-col  justify-center items-center gap-5 h-[800px] lg:h-auto rounded-b-2xl lg:rounded-none
              bg-linear-to-b from-[#001032] from-40% via-blue-[#001032] at-130% to-[#003198] lg:bg-none text-white "
    >
      <h6 className="lg:hidden mx-auto border border-white px-4 py-1 rounded-full ">
        For Startup
      </h6>
      <div
        id="left"
        className="w-full text-center lg:text-start  lg:my-5 lg:text-[#001032]   lg:pt-3 "
      >
        <h1 className=" text-[38px] lg:text-4xl lg:font-bold font-semibold lg:leading-11 leading-15 tracking-wide lg:w-[80%] lg:hidden">
          Grow Your Startup <br /> with India’s <br />
          most Founder- Focused-Growth and Funding Ecosystem
        </h1>
        <Link to="/login">
          <button className="lg:hidden  mt-7 lg:bg-[#001032] lg:text-white bg-white text-[#001032] p-2 px-8 rounded-sm text-lg">
            Get Listed
          </button>
        </Link>
      </div>

      <div id="right" className="w-full my-5 lg:my-0 lg:w-[60%]">
        <div className="h-[250px] lg:h-[400px] bg-[#D8D8D8] lg:rounded-sm rounded-2xl flex justify-center items-end overflow-hidden shadow-md lg:shadow-none">
          {/* Image */}
          <img
            src="/startuppage1.png"
            alt=""
            className="w-full h-full border hidden lg:block "
          />
          <img
            src="/startuppage2.png"
            alt=""
            className="w-full h-full shadow-md border lg:hidden lg:rounded-sm "
          />

          {/* Button */}
         
        </div>
      </div>
      <div className="hidden lg:block text-center  w-[60%] ">
        <h1 className="  text-center text-3xl font-medium  leading-9  tracking-wide  text-[#001032]">
          Grow Your Startup with India’s most Founder- Focused-Focused Growth
          and Funding
          <br /> Ecosystem
        </h1>

         <Link to="/login">
            <button
              className=" hidden lg:block  
        bg-[#001032] text-white 
        p-3 px-15 rounded-sm text-lg
        mx-auto mt-3
        shadow-lg hover:shadow-2xl
        transition duration-200
      "
            >
              Get Listed
            </button>
          </Link>
      </div>
    </div>
  );
};

export default StartupSec1;
