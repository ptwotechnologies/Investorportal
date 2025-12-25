import NotificationSec from '@/components/UserComponents/ProfileSec/NotificationSec/NotificationSec'
import Mobile from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Mobile';
import Sidebar from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Sidebar';
import React, { useState } from 'react'


const Notification = () => {
 const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='bg-gray-100  overflow-hidden'>
    <div className='lg:flex '>
     
     <div >
      <NotificationSec/>
     </div>
    </div>
  </div>
  )
}

export default Notification
