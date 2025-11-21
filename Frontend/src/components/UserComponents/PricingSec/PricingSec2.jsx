import React, { useState } from 'react';
import StartupContent from "./StartupContent"
import ServiceContent from "./ServiceContent"

import DropDown from './DropDown';

const PricingSec2 = () => {

     const [activeTab, setActiveTab] = useState('Startups');

  

  const tabs = [
    { id: 'Startups', label: ' Startups ' },
    { id: 'ServiceProfessionals', label: 'Service Professionals' },
    
  ];

  const tabContents = {
    Startups: (
     <StartupContent/>
    ),
   ServiceProfessionals : (
     <ServiceContent/>
    ),
   
  };
  return (
    <>
    <div className="container mx-auto lg:p-10 mt-30  ">
      <h1 className='text-4xl lg:text-5xl text-[#001032] font-bold mb-7 pt-20 lg:pt-0 px-4 lg:px-0 lg:mt-0'>Pricing Models</h1>
      <p className='text-3xl lg:text-5xl text-[#001032] font-light px-4 lg:px-0 lg:mb-30 mb-10'>Grow Your Business by Partnering with us</p>
      <div className='hidden lg:block '>
        <div className="flex justify-center items-center flex-wrap gap-5 bg-[#B5B5B5] w-fit rounded-full  p-1 mx-auto">
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

export default PricingSec2