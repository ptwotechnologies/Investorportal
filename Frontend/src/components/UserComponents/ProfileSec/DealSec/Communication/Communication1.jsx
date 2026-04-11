import React, { useState } from 'react'
import TopSec from './TopSec'
import BottomSec from './BottomSec'

const Communication1 = () => {
     const [activeTab, setActiveTab] = useState("files");
    
  return (
    <div>
        <div>
            <TopSec activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>
        <div>
            <BottomSec activeTab={activeTab}/>
        </div>
      
    </div>
  )
}

export default Communication1
