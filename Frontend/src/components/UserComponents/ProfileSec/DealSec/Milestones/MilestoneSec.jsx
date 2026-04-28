import React, { useState } from 'react'
import BottomSec from './BottomSec'
import TopBar from './TopBar'

const MilestoneSec = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [activeView, setActiveView] = useState('none'); // 'none', 'addMilestone'

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFF]">
      <div id='top'>
         <TopBar 
            onAddClick={() => setActiveView('addMilestone')} 
          />
      </div>

      <div id='bottom' className="flex-1 overflow-hidden">
        <BottomSec 
          selectedMilestone={selectedMilestone} 
          setSelectedMilestone={setSelectedMilestone} 
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>
    </div>
  )
}

export default MilestoneSec
