import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import ConsultancyContent from './ConsultancyContent';
import HrContent from './HrContent';
import AdvisoryContent from './AdvisoryContent';

const DropDown = () => {

  const [searchParams] = useSearchParams();
  const urlTab = searchParams.get('tab');

  const TAB_IDS = ['Designing', 'Development', 'Marketing', 'Legal', 'Consultancy', 'HR', 'Advisory'];
  const normalizeTab = (raw) => {
    if (!raw) return null;
    const cleaned = String(raw).trim();
    const match = TAB_IDS.find((t) => t.toLowerCase() === cleaned.toLowerCase());
    return match ?? cleaned;
  };

  const [activeTab, setActiveTab] = useState(normalizeTab(urlTab) || 'HR');

  useEffect(() => {
    const nt = normalizeTab(urlTab);
    if (nt && nt !== activeTab) setActiveTab(nt);
  }, [urlTab]);
  const [isOpen, setIsOpen] = useState(false); // blur control

  const tabs = [
    
    { id: 'HR', label: 'HR' },
    { id: 'Legal', label: 'Legal' },
    { id: 'Advisory', label: 'Advisory' },
    { id: 'Marketing', label: 'Marketing' },
    { id: 'Designing', label: 'Designing' },
    { id: 'Consultancy', label: 'Consultancy' },
    { id: 'Development', label: 'Development' },
  ];

  const tabContents = {
    Designing: <DesigningContent />,
    Development: <DevelopmentContent />,
    Marketing: <MarketingContent />,
    Legal: <LegalContent />,
     Consultancy: <ConsultancyContent />,
  HR: <HrContent />,
  Advisory: <AdvisoryContent />,
  };

  return (
    <div className="w-full relative ">
       {isOpen && (
      <div className="fixed inset-0 z-40 backdrop-blur-lg bg-black/10" />
    )}

      <div className='flex justify-center relative z-50'>
        <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>

          <div className='text-white border border-black h-14 rounded-full p-1'>
            <DropdownMenuTrigger className=' w-65 p-0 rounded-full text-center'>
              <button className='w-65 flex justify-center gap-3 items-center p-2 px-7 text-2xl rounded-full bg-[#001426]'>
                <span>{activeTab}</span>
                <IoIosArrowDown className='mt-2' />
              </button>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className=' w-65 bg-transparent border-none shadow-none flex flex-col justify-center items-center'>

            
            {tabs
              .filter(tab => tab.id !== activeTab)
              .map((tab) => (
                <div className='text-white border border-black h-13 rounded-full p-1 my-1 w-65'>
                  <DropdownMenuItem
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="text-2xl rounded-full text-center px-5  bg-[#001426] text-white flex items-center justify-center"
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
      <div className="mt-18">
        {tabContents[activeTab]}
      </div>

    </div>
  );
}

export default DropDown;
