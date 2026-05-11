import React, { useState } from "react";
import TopBar from "./TopBar";
import Bottom from "./Bottom";

const RevenueSec = () => {
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);

  return (
    <div className="flex flex-col h-full bg-[#FDFDFF] overflow-hidden">
      <TopBar 
        deals={deals}
        onProjectSelect={(deal) => setSelectedDeal(deal)}
      />
      <Bottom 
        deals={deals}
        setDeals={setDeals}
        selectedDeal={selectedDeal}
        setSelectedDeal={setSelectedDeal}
      />
    </div>
  );
};

export default RevenueSec;
