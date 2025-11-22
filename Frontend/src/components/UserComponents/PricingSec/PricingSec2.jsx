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
    <div className="container mx-auto lg:p-10   ">
      <h1 className='text-4xl lg:text-5xl text-[#001032] font-semibold lg:mb-7 mb-2  px-4 lg:px-0 lg:mt-0'>Pricing Models</h1>
      <p className='text-2xl lg:text-5xl text-[#001032]  px-4 lg:px-0 lg:mb-30 mb-10'>Grow Your Business by Partnering with us</p>
      <div className=''>
        <div className="flex justify-center items-center flex-wrap gap-5 bg-[#B5B5B5] w-fit rounded-full  p-1 mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded font-medium lg:font-normal lg:text-2xl ${activeTab === tab.id ? 'bg-[#001426] text-white rounded-full p-2 px-10' : ' text-white hover:bg-gray-300 hover:rounded-full hover:p-2 hover:px-10'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      </div>
      <div className="mt-20 ">
        {tabContents[activeTab]}
      </div>
    </div>
   </>
  )
}

export default PricingSec2