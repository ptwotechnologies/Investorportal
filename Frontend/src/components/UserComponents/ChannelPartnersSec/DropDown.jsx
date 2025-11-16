import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import DesigningContent from './DesigningContent';
import DevelopmentContent from './DevelopmentContent';
import LegalContent from './LegalContent';
import MarketingContent from './MarketingContent';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const DropDown = () => {

    const [activeTab, setActiveTab] = useState('Designing');

  

  const tabs = [
     { id: 'Designing', label: 'Designing' },
    { id: 'Development', label: 'Development' },
    { id: 'Marketing', label: 'Marketing' },
     { id: 'Legal', label: 'Legal' },
      { id: 'Consultancy', label: 'Consultancy' },
       { id: 'HR', label: 'HR' },
        { id: 'Advisory', label: 'Advisory' },
  ];

  const tabContents = {
    Designing: (
     <DesigningContent/>
    ),
    Development: (
      <DevelopmentContent/>
    ),
   Marketing: (
      <MarketingContent/>
    ),
    Legal:(
      <LegalContent/>
    )
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
