import React from 'react'
import DealTopBar from './DealTopBar'
import DealBottomSec from './DealBottomSec'

const DealSec1 = () => {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [rightPanelState, setRightPanelState] = React.useState('none'); // 'none', 'overview', 'scopeDetails', 'milestoneDetails'
  const [selectedMilestone, setSelectedMilestone] = React.useState(null);

  return (
    <div>
      <div id='top'>
         <DealTopBar/>
      </div>

      <div id='bottom'>
        <DealBottomSec 
          selectedProject={selectedProject} 
          setSelectedProject={setSelectedProject}
          rightPanelState={rightPanelState}
          setRightPanelState={setRightPanelState}
          selectedMilestone={selectedMilestone}
          setSelectedMilestone={setSelectedMilestone}
        />
      </div>
    </div>
  );
};

export default DealSec1
