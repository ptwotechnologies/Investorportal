import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StartupContent from "./StartupContent"
import ServiceContent from "./ServiceContent"

import DropDown from './DropDown';

const PricingSec2 = () => {
  const location = useLocation();
  const isUpgradeFlow = location.state?.isUpgradeFlow;
  const userRole = location.state?.role;

  const [activeTab, setActiveTab] = useState(() => {
    if (isUpgradeFlow && userRole) {
      return userRole === 'startup' ? 'Startups' : 'ServiceProfessionals';
    }
    return 'Startups';
  });

  const tabs = [
    { id: 'Startups', label: ' Startups ' },
    { id: 'ServiceProfessionals', label: 'Service Professionals' },
  ];

  const tabContents = {
    Startups: (
     <StartupContent isUpgradeFlow={isUpgradeFlow} />
    ),
   ServiceProfessionals : (
     <ServiceContent isUpgradeFlow={isUpgradeFlow} />
    ),
   
  };
  return (
    <>
    <div className="container mx-auto lg:p-10">
      {!isUpgradeFlow && (
        <h1 className='text-4xl lg:text-5xl text-[#001032] font-medium lg:mb-7 mb-2 px-4 lg:px-0 lg:mt-3'>
          Pricing Models
        </h1>
      )}
      
      {!isUpgradeFlow && (
        <p className='text-2xl lg:text-5xl text-[#001032] px-4 lg:px-0'>Choose the model which suits your business</p>
      )}

      {isUpgradeFlow ? (
        <div className="flex justify-start items-center relative lg:right-134 right-21 top-7 lg:top-10 flex-wrap  w-fit rounded-full p-1 mx-auto">
          <div className="text-[#001032] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.75)] px-8 py-2 text-xl lg:text-2xl font-semibold rounded-full text-center">
            {activeTab === 'Startups' ? 'Startup Plan' : 'Service Professional Plan'}
          </div> 
        </div>
      ) : (
        <div className="">
          <div className="flex justify-start items-center relative lg:right-114 right-6 top-12 lg:top-10 flex-wrap border border-[#001032] w-fit rounded-full p-1 mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`lg:px-10 py-2 px-5 rounded lg:text-2xl ${
                  activeTab === tab.id
                    ? "bg-[#001032] text-white rounded-full p-2 px-5 lgpx-10"
                    : " text-[#001032] hover:bg-[#001032] hover:text-white hover:rounded-full "
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={isUpgradeFlow ? "mt-10" : "mt-20"}>
        {tabContents[activeTab]}
      </div>
    </div>
   </>
  )
}

export default PricingSec2