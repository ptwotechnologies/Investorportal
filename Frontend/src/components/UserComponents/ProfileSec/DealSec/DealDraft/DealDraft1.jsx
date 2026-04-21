import React, { useState } from 'react'
import TopSec from './TopSec'
import BottomSec from './BottomSec'

const DealDraft1 = () => {
  const [activeView, setActiveView] = useState('none'); // 'none', 'scope', 'addMilestone', 'editMilestone'
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  return (
    <div className='bg-white flex flex-col min-h-screen'>
      <TopSec />
      <BottomSec 
        activeView={activeView} 
        setActiveView={setActiveView} 
        selectedMilestone={selectedMilestone}
        setSelectedMilestone={setSelectedMilestone}
      />
    </div>
  )
}

export default DealDraft1
