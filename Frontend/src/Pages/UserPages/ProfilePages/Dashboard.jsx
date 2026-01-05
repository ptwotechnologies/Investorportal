import Mobile from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Mobile';
import Sidebar from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Sidebar';
import DashboardSec from '@/components/UserComponents/ProfileSec/UserDashboard/DashboardSec'
import React, { useState } from 'react'

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
     <div className='bg-gray-100'>
    <div className='lg:flex '>
      <div className={`w-[20%] hidden lg:block ${isOpen ? 'w-[20%]' : 'w-[0%]'} transition-all duration-300`}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
      <div className='lg:hidden fixed top-0 z-50 w-full '>
        <Mobile/>
      </div>
     <div className={`lg:w-[80%]  ${isOpen ? 'lg:w-[82%]' : 'lg:w-[350%]' } transition-all duration-300 mt-18 pt-1 lg:mt-0`}>
       <DashboardSec/>
     </div>
    </div>
  </div> 
  )
}

export default Dashboard
