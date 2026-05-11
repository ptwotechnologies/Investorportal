import React from 'react'
import TopBar from './TopBar'
import Bottom from './Bottom'

const NegotiationSec = () => {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [rightPanelState, setRightPanelState] = React.useState('none'); // 'none', 'overview', 'scopeDetails', 'milestoneDetails', 'create'
  const [selectedMilestone, setSelectedMilestone] = React.useState(null);
  const [preselectedRequest, setPreselectedRequest] = React.useState(null);

  const handleProjectSelect = (req) => {
    setPreselectedRequest(req);
    setRightPanelState('create');
    setSelectedProject(null); // Deselect any active deal to show the create form
  };

  return (
    <div>
      <div id='top'>
         <TopBar setRightPanelState={setRightPanelState} onProjectSelect={handleProjectSelect}/>
      </div>

      <div id='bottom'>
        <Bottom 
          selectedProject={selectedProject} 
          setSelectedProject={setSelectedProject}
          rightPanelState={rightPanelState}
          setRightPanelState={setRightPanelState}
          selectedMilestone={selectedMilestone}
          setSelectedMilestone={setSelectedMilestone}
          preselectedRequest={preselectedRequest}
          setPreselectedRequest={setPreselectedRequest}
        />
      </div>
    </div>
  )
}

export default NegotiationSec
