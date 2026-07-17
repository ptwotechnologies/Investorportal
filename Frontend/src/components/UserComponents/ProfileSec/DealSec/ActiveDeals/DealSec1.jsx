import React from "react";
import DealTopBar from "./DealTopBar";
import DealBottomSec from "./DealBottomSec";

const DealSec1 = () => {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [rightPanelState, setRightPanelState] = React.useState("none"); // 'none', 'overview', 'scopeDetails', 'milestoneDetails'
  const [selectedMilestone, setSelectedMilestone] = React.useState(null);

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full h-full overflow-hidden">
      <div id="top" className="shrink-0">
        <DealTopBar />
      </div>

      <div id="bottom" className="flex-1 min-h-0 flex flex-col overflow-hidden">
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

export default DealSec1;
