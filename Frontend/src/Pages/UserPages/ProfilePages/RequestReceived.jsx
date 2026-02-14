import Mobile from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Mobile'
import Sidebar from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Sidebar'
import RequestSec from '@/components/UserComponents/ProfileSec/RequestSec/RequestSec';
import RequestSec1 from '@/components/UserComponents/ProfileSec/RequestSec/RequestSec1';
import React, { useState } from 'react'


const RequestReceived = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='bg-gray-100 h-screen overflow-hidden'>
    <div className='lg:flex '>
      <div className={`w-[20%] hidden lg:block ${isOpen ? 'w-[20%]' : 'w-[0%]'} transition-all duration-300`}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
      <div className='lg:hidden fixed top-0 z-50 w-full '>
        <Mobile/>
      </div>
     <div className={`lg:w-[80%]  ${isOpen ? 'lg:w-[80%]' : 'lg:w-[350%]' } transition-all duration-300 mt-12 lg:mt-0`}>
      <RequestSec/>
     </div>
    </div>
  </div>
  )
}

export default RequestReceived
