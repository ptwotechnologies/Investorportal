import AnalyticsSec from '@/components/UserComponents/ProfileSec/DealSec/Analytics/AnalyticsSec';
import Mobile from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Mobile';
import Sidebar from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Sidebar';
import React, { useState } from 'react'

const Analytics = () => {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='bg-gray-100 h-[calc(100dvh-60px)] lg:h-screen lg:relative fixed inset-0 flex flex-col overflow-hidden'>
      <div className='max-w-[1600px] mx-auto w-full flex-1 flex flex-col min-h-0'>
        <div className='flex flex-col lg:flex-row flex-1 min-h-0'>
          {/* Sidebar placeholder matches actual sidebar width */}
          <div className={`${isOpen ? 'w-[18.5rem]' : 'w-16'} hidden lg:block transition-all duration-300 shrink-0`}>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
          </div>
          <div className='lg:hidden fixed top-0 z-50 w-full left-0'>
            <Mobile/>
          </div>
          <div className='flex-1 flex flex-col min-h-0 transition-all duration-300 mt-13 lg:mt-0 px-0 xl:px-4'>
            <AnalyticsSec/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
