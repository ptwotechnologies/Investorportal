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
  <div className=' text-white bg-[#B5B5B5] h-14 rounded-full p-1'>
    <DropdownMenuTrigger className='flex justify-center items-center gap-6 p-2 px-7 text-2xl rounded-full mb-10 bg-[#001426] '>
    <button>{activeTab}</button>
     <IoIosArrowDown  className='mt-2'/>
    </DropdownMenuTrigger>
  </div>
  <DropdownMenuContent className='mt-2 border border-[#000000] w-80 rounded-4xl p-3  flex flex-col justify-center items-center'>
     {tabs.map((tab) => (
           <div className=' text-white bg-[#B5B5B5] h-13 rounded-full p-1 my- w-55'>
             <DropdownMenuItem key={tab.id} onClick={() => setActiveTab(tab.id)} className="text-2xl  rounded-full text-center px-5  bg-[#001426] text-white flex items-center justify-between">
              {tab.label}
               <IoIosArrowDown  className='mt-2 text-white'/>
            </DropdownMenuItem>
           </div>
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
