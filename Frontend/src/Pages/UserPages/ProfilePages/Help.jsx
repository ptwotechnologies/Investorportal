import Mobile from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Mobile'
import Sidebar from '@/components/UserComponents/ProfileSec/ProfileSec1.jsx/Sidebar'
import HelpSec from '@/components/UserComponents/ProfileSec/ProfileSec2.jsx/HelpSec'
import React, { useState } from 'react'

const Help = () => {
    const [isOpen, setIsOpen] = useState(true);
  return (
   <div className="lg:bg-gray-100 h-screen overflow-hidden">
      <div className="lg:flex h-full">
        {/* Sidebar */}
        <div className={`w-[20%] hidden lg:block ${isOpen ? 'w-[20%]' : 'w-[0%]'} transition-all duration-300`}>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden fixed top-0 z-50 w-full">
          <Mobile/>
        </div>

        {/* Main Section */}
        <div className={`lg:w-[80%] ${isOpen ? 'lg:w-[80%]' : 'lg:w-[350%]'} transition-all duration-300 mt-25 lg:mt-0 h-full overflow-hidden`}>
          <HelpSec />
        </div>
      </div>
    </div>
  )
}

export default Help
