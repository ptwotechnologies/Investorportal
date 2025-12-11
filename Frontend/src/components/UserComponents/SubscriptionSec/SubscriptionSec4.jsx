import React, { useEffect, useState } from 'react';
import MarketingContent from './MarketingContent';
import DevelopmentContent from './DevelopmentContent';
import DesigningContent from './DesigningContent';
import LegalContent from './LegalContent';
import DropDown from './DropDown';



const SubscriptionSec4 = ({ urlTab }) => {


  const TAB_IDS = ['Designing', 'Development', 'Marketing', 'Legal', 'Consultancy', 'HR', 'Advisory'];

  const normalizeTab = (raw) => {
    if (!raw) return null;
    const cleaned = String(raw).trim();
    const match = TAB_IDS.find((t) => t.toLowerCase() === cleaned.toLowerCase());
    return match ?? cleaned;
  };

  const [activeTab, setActiveTab] = useState(normalizeTab(urlTab) || 'Designing');

  useEffect(() => {
    const nt = normalizeTab(urlTab);
    if (nt && nt !== activeTab) setActiveTab(nt);
  }, [urlTab]);

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
  Designing: <DesigningContent />,
  Development: <DevelopmentContent />,
  Marketing: <MarketingContent />,
  Legal: <LegalContent />,
  HR: <div>HR Plans Content</div>,
  Advisory: <div>Advisory Plans Content</div>,
  Consultancy: <div>Consultancy Plans Content</div>,
};
  return (
     <>
    <div className="container mx-auto lg:p-10 mt-10 ">
      <h1 className='text-3xl lg:text-5xl text-[#001032] font-semibold lg:mb-5 mb-2 lg:pt-0 px-4 lg:px-5 mt-20 lg:mt-0'>Subscription Models</h1>
      <p className='text-2xl lg:text-5xl text-[#001032] font-light px-4 lg:px-5 lg:mb-25 mb-10'>Grow Your Business by Partnering with us</p>
      <div className='hidden lg:block px-5'>
        <div className="flex justify-between items-center flex-wrap  bg-[#B5B5B5] rounded-full  p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded text-2xl ${activeTab === tab.id ? 'bg-[#001426] text-white rounded-full p-2 px-10' : ' text-white hover:bg-gray-300 hover:rounded-full hover:p-2 hover:px-10'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      </div>

      <div className='lg:hidden '>
        <DropDown/>
      </div>
      <div className="hidden lg:block ">
        {tabContents[activeTab]}
      </div>
    </div>
   </>
  )
}

export default SubscriptionSec4
