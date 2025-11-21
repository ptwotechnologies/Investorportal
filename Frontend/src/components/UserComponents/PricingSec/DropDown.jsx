import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import StartupContent from "./StartupContent";
import ServiceContent from "./ServiceContent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DropDown = () => {
const [activeTab, setActiveTab] = useState('Startups');

  

  const tabs = [
    { id: 'Startups', label: ' Startups ' },
    { id: 'ServiceProfessionals', label: 'Service Professionals' },
     
  ];

  const tabContents = {
    Startups: (
     <StartupContent/>
    ),
    ServiceProfessionals: (
      <ServiceContent/>
    ),
   
  };


  return (
    <div className=' w-full '>
        <div className='flex justify-center '>
            <DropdownMenu  >
  <div className=' text-white bg-[#B5B5B5] h-18 rounded-full p-2'>
    <DropdownMenuTrigger className='flex justify-center items-center gap-2 p-3 px-6 text-2xl rounded-full mb-10 bg-[#001426] '>
    <button>{activeTab}</button>
     <IoIosArrowDown  className='mt-2'/>
    </DropdownMenuTrigger>
  </div>
  <DropdownMenuContent className='mt-5'>
     {tabs.map((tab) => (
            <DropdownMenuItem key={tab.id} onClick={() => setActiveTab(tab.id)} className="text-2xl ">
              {tab.label}
            </DropdownMenuItem>
          ))}
  </DropdownMenuContent>
</DropdownMenu>
        </div>
       <div className="mt-18 ">
        {tabContents[activeTab]}
      </div>
    </div>
  )
}

export default DropDown
