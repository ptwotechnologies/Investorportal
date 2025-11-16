import React from 'react'
import { Link } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const NavbarDesk = () => {
  return (
     <div className="bg-[#001032] text-white rounded-4xl p-2 group-hover:block text-lg ">
      <ul className="flex justify-center items-center gap-24 px-7 ">
        <li className="p-2 px-6 group relative duration-300 ease-in-out  hover:bg-white hover:text-[#001426] hover:rounded-4xl">
          <div className="flex items-center gap-1.5">
            <p className="flex items-center"> Auxiliaries</p>
            <div className="relative">
               <SlArrowDown size={10} className=" mt-1 absolute top-1/2 -translate-y-1/2 left-0 group-hover:opacity-0 transition-opacity duration-300" />
              <SlArrowUp size={10} className=" mt-1 absolute top-1/2 -translate-y-1/2 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          <div className="bg-gray-100  p-4 absolute  left-auto mt-4 rounded-md hidden group-hover:block duration-300 ease-in-out ">
            <div className="flex flex-col w-40 ">
              <Link
                className="text-black p-1  hover:text-[#F4C12D] hover:font-medium duration-300 ease-in-out "
                to="/"
              >
                Services
              </Link>
            </div>
          </div>
        </li>
        <li className="p-2 px-6 duration-300 ease-in-out  hover:bg-white hover:text-[#001426] hover:rounded-4xl ">
          <Link to="/">NGO/NPO</Link>
        </li>
        <li className="p-2 px-6 group duration-300 ease-in-out  relative hover:bg-white hover:text-[#001426] hover:rounded-4xl">
          <div className="flex items-center gap-1.5">
            <p className="flex items-center">Resources</p>
            <div className="relative">
               <SlArrowDown size={10} className=" mt-1 absolute top-1/2 -translate-y-1/2 left-0 group-hover:opacity-0 transition-opacity duration-300" />
              <SlArrowUp size={10} className=" mt-1 absolute top-1/2 -translate-y-1/2 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          <div className="bg-gray-100  p-4 absolute  left-auto mt-4 rounded-md hidden group-hover:block duration-300 ease-in-out ">
            <div className="flex flex-col w-40 ">
              <Link
                className="text-black p-1  hover:text-[#F4C12D] hover:font-medium duration-300 ease-in-out  "
                to="/"
              >
                About Us
              </Link>
              <Link
                className="text-black p-1  hover:text-[#F4C12D] hover:font-medium duration-300 ease-in-out "
                to="/"
              >
                Join With Us
              </Link>
              <Link
                className="text-black p-1  hover:text-[#F4C12D] hover:font-medium duration-300 ease-in-out  "
                to="/"
              >
                Blogs
              </Link>
              <Link
                className="text-black p-1  hover:text-[#F4C12D] hover:font-medium duration-300 ease-in-out "
                to="/"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default NavbarDesk