import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from 'react-router-dom'

function NavbarSheet() {
  return (
    <div>
      <div className=" hidden lg:block text-lg">
        <Link to="/login"><button className="mr-4 underline p-2 px-5 cursor-pointer hover:scale-105 duration-300 ease-in-out">
          Sign in
        </button></Link>
        <Link to="/login"><button className="bg-[#002A30] text-white p-2 px-5 cursor-pointer rounded-sm hover:bg-white hover:text-[#002A30] 
        hover:border hover:border-[#002A30] duration-300 ease-in-out">
          Sign up
        </button></Link>
      </div>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <GiHamburgerMenu size={35} className="text-white" />
          </SheetTrigger>
          <SheetContent className="w-full ">
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <div>
                <h1 className="text-xl font-semibold mb-10 text-[#002A30]">
                  Satlok Foundation
                </h1>
                <hr/>

                <div className="text-lg text-[#002A30]">
                  <ul>
                    <li className="p-6  group relative duration-300 ease-in-out  hover:bg-[#002A30] hover:text-white hover:rounded-sm">
                      <div className="flex justify-between items-center">
                          <p> Auxiliaries</p>
                          <IoIosArrowRoundForward  size={25}/>
                      </div>
                      
                      <div className="bg-gray-100  p-4 absolute  left-auto right-0 w-full mt-6  rounded-md hidden group-hover:block duration-300 ease-in-out ">
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
                    <hr/>
                    <li className="p-6  duration-300 ease-in-out  hover:bg-[#002A30] hover:text-white hover:rounded-sm ">
                      <Link to="/">NGO/NPO</Link>
                    </li>
                    <hr/>
                    <li className="p-6  group duration-300 ease-in-out  relative hover:bg-[#002A30] hover:text-white hover:rounded-sm">
                     <div className="flex justify-between items-center">
                          <p> Resources</p>
                          <IoIosArrowRoundForward  size={25}/>
                      </div>
                      
                      <div className="bg-gray-100  p-4 absolute  left-auto right-0 w-full mt-6 rounded-md hidden group-hover:block duration-300 ease-in-out ">
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
                    <hr/>
                  </ul>
                </div>


                <div className="w-full flex flex-col justify-center items-center gap-4 mt-10 absolute bottom-4  pr-8 text-xl">
                  <button className="border border-[#002A30] w-full text-[#002A30] rounded-sm p-2
                  hover:bg-[#002A30] hover:text-white">Sign in</button>
                  <button className="bg-[#002A30] w-full text-white  rounded-sm p-2 
                  hover:bg-white hover:text-[#002A30] hover:border hover:border-[#002A30] duration-300 ease-in-out">Sign up</button>
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default NavbarSheet
