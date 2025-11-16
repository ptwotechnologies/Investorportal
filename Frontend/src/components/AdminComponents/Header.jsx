import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Header = () => {

   
  const tabs = [
    { to: "/adminpanel", label: "Dashboard" },
    { to: "/registration", label: "Registrations" },
    { to: "/", label: "Requests" },
    { to: "/verification", label: "Verification" },
    { to: "/leads", label: "Connect" },
    { to: "/payments", label: "Payment" },
    { to: "/", label: "Notifications" },
  ];
  return (
     <div className="bg-gray-200 p-7 pb-4 pt-9 fixed w-full z-10">
      <div className="bg-white flex  items-center justify-between  p-3 px-5 rounded-3xl">
       <div className="">
          <div className="w-15 h-15 bg-[#001426] rounded-full flex items-center justify-center">
            <RiSearch2Line size={32} className="text-white" />
          </div>
        </div>



        <div className="border border-[#001426] rounded-4xl p-1 ">
         <ul className="flex items-center gap-6 text-[#001426] font-medium">
          {tabs.map((item)=>(
            <NavLink to={item.to} className={({ isActive }) => 
              `${isActive? "bg-[#001426] text-white p-2 px-6 rounded-4xl": "hover:bg-gray-200 hover:p-2  hover:rounded-4xl"}`
            }>
              <li className="text-lg ">{item.label}</li>
              </NavLink>
          ))}
         </ul>

        </div>



        <div>
          <div className="">
          <button className="flex items-center gap-4 bg-[#001426] text-white rounded-full p-2 pr-8">
          <div className="w-8 h-8 bg-[#d9d9d9] rounded-full"></div>
          <span className="font-medium">Hammad</span>
        </button>
        </div>

        </div>

      </div>
     </div>
  )
}

export default Header
