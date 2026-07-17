import React, { useState } from "react";
import TopBar from "./TopBar";
import Bottom from "./Bottom";

const RevenueSec = () => {
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full h-full bg-[#FDFDFF] overflow-hidden">
      <div id="top" className="shrink-0">
        <TopBar deals={deals} onProjectSelect={(deal) => setSelectedDeal(deal)} />
      </div>
      <div id="bottom" className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <Bottom
          deals={deals}
          setDeals={setDeals}
          selectedDeal={selectedDeal}
          setSelectedDeal={setSelectedDeal}
        />
      </div>
    </div>
  );
};

export default RevenueSec;
