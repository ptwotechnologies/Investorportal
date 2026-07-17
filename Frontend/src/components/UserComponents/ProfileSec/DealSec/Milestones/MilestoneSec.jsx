import React, { useState } from "react";
import BottomSec from "./BottomSec";
import TopBar from "./TopBar";

const MilestoneSec = () => {
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [activeView, setActiveView] = useState("none"); // 'none', 'addMilestone'

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full h-full bg-[#FDFDFF] overflow-hidden">
      <div id="top" className="shrink-0">
        <TopBar
          deals={deals}
          onProjectSelect={(deal) => {
            setSelectedDeal(deal);
            setActiveView("addMilestone");
          }}
          onAddClick={() => setActiveView("addMilestone")}
        />
      </div>

      <div id="bottom" className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <BottomSec
          deals={deals}
          setDeals={setDeals}
          selectedDeal={selectedDeal}
          setSelectedDeal={setSelectedDeal}
          selectedMilestone={selectedMilestone}
          setSelectedMilestone={setSelectedMilestone}
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>
    </div>
  );
};

export default MilestoneSec;
