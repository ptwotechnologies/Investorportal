import React from 'react'
import TopBar from './TopBar'
import Bottom from './Bottom'

const NegotiationSec = () => {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [rightPanelState, setRightPanelState] = React.useState('none'); // 'none', 'overview', 'scopeDetails', 'milestoneDetails'
  const [selectedMilestone, setSelectedMilestone] = React.useState(null);

  return (
    <div>
      <div id='top'>
         <TopBar setRightPanelState={setRightPanelState}/>
      </div>

      <div id='bottom'>
        <Bottom 
          selectedProject={selectedProject} 
          setSelectedProject={setSelectedProject}
          rightPanelState={rightPanelState}
          setRightPanelState={setRightPanelState}
          selectedMilestone={selectedMilestone}
          setSelectedMilestone={setSelectedMilestone}
        />

      </div>
    </div>
  )
}

export default NegotiationSec
