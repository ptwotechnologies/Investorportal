import React, { useState } from 'react'
import BottomSec from './BottomSec'
import TopBar from './TopBar'

const MilestoneSec = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [activeView, setActiveView] = useState('none'); // 'none', 'addMilestone'

  return (
    <div >
      <div id='top'>
         <TopBar 
            onAddClick={() => setActiveView('addMilestone')} 
          />
      </div>

      <div id='bottom' >
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
