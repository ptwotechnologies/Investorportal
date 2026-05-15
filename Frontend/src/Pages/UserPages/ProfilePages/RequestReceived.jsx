import Mobile from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Mobile'
import Sidebar from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Sidebar'
import RequestSec from '@/components/UserComponents/ProfileSec/RequestSec/RequestSec';
import RequestSec1 from '@/components/UserComponents/ProfileSec/RequestSec/RequestSec1';
import React, { useState } from 'react'


const RequestReceived = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='max-w-[1600px] mx-auto w-full'>
        <div className='lg:flex'>
          {/* Sidebar placeholder matches actual sidebar width */}
          <div className={`${isOpen ? 'w-[18.5rem]' : 'w-16'} hidden lg:block transition-all duration-300 shrink-0`}>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
          </div>
          <div className='lg:hidden fixed top-0 z-50 w-full left-0'>
            <Mobile/>
          </div>
          <div className='flex-1 transition-all duration-300 mt-12 lg:mt-0'>
            <RequestSec/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestReceived
