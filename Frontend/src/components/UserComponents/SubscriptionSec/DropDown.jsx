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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DropDown = () => {

  const [activeTab, setActiveTab] = useState('Designing');
  const [isOpen, setIsOpen] = useState(false); // blur control

  const tabs = [
    { id: 'Designing', label: 'Designing' },
    { id: 'HR', label: 'HR' },
    { id: 'Legal', label: 'Legal' },
    { id: 'Advisory', label: 'Advisory' },
    { id: 'Marketing', label: 'Marketing' },
    { id: 'Consultancy', label: 'Consultancy' },
    { id: 'Development', label: 'Development' },
  ];

  const tabContents = {
    Designing: <DesigningContent />,
    Development: <DevelopmentContent />,
    Marketing: <MarketingContent />,
    Legal: <LegalContent />
  };

  return (
    <div className="w-full">

      <div className='flex justify-center'>
        <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>

          <div className='text-white bg-[#B5B5B5] h-14 rounded-full p-1'>
            <DropdownMenuTrigger className=' w-65 flex justify-between items-center  p-2 px-7 text-2xl rounded-full  bg-[#001426]'>
              <button>{activeTab}</button>
              <IoIosArrowDown className='mt-2' />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className=' w-65 bg-transparent border-none shadow-none flex flex-col justify-center items-center'>

            
            {tabs
              .filter(tab => tab.id !== activeTab)
              .map((tab) => (
                <div className='text-white bg-[#B5B5B5] h-13 rounded-full p-1 my-1 w-65'>
                  <DropdownMenuItem
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="text-2xl rounded-full text-center px-5 bg-[#001426] text-white flex items-center justify-between"
                  >
                    {tab.label}
                  </DropdownMenuItem>
                </div>
              ))
            }

          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content blur on open */}
      <div className={`mt-18 transition-all duration-300 ${isOpen ? 'blur-lg' : ''}`}>
        {tabContents[activeTab]}
      </div>

    </div>
  );
}

export default DropDown;
