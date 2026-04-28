import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import TopSec from './TopSec'
import BottomSec from './BottomSec'

const DealDraft1 = () => {
  const [activeView, setActiveView] = useState('none'); // 'none', 'scope', 'addMilestone', 'editMilestone'
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const location = useLocation();
  const { requestId, professionalId } = location.state || {};

  return (
    <div className='bg-white flex flex-col min-h-screen'>
      <TopSec />
      <BottomSec 
        activeView={activeView} 
        setActiveView={setActiveView} 
        selectedMilestone={selectedMilestone}
        setSelectedMilestone={setSelectedMilestone}
        requestId={requestId}
        professionalId={professionalId}
      />
    </div>
  )
}

export default DealDraft1
