import React, { useState } from "react";
import BottomSec from "./BottomSec";
import TopBar from "./TopBar";

const MilestoneSec = () => {
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [activeView, setActiveView] = useState("none"); // 'none', 'addMilestone'

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#FDFDFF] overflow-hidden">
      <TopBar
        deals={deals}
        onProjectSelect={(deal) => {
          setSelectedDeal(deal);
          setActiveView("addMilestone");
        }}
        onAddClick={() => setActiveView("addMilestone")}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
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
