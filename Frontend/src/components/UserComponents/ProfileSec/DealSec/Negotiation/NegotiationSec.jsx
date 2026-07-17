import React from "react";
import TopBar from "./TopBar";
import Bottom from "./Bottom";

const NegotiationSec = () => {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [rightPanelState, setRightPanelState] = React.useState("none"); // 'none', 'overview', 'scopeDetails', 'milestoneDetails', 'create'
  const [selectedMilestone, setSelectedMilestone] = React.useState(null);
  const [preselectedRequest, setPreselectedRequest] = React.useState(null);

  const handleProjectSelect = (req) => {
    setPreselectedRequest(req);
    setRightPanelState("create");
    setSelectedProject(null); // Deselect any active deal to show the create form
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full h-full overflow-hidden">
      <div id="top" className="shrink-0">
        <TopBar
          setRightPanelState={setRightPanelState}
          onProjectSelect={handleProjectSelect}
        />
      </div>

      <div id="bottom" className="flex-1 flex flex-col min-h-0 overflow-hidden">
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
  );
};

export default NegotiationSec;
