import React, { useState } from "react";
import TopBar from "./TopBar";
import Bottom from "./Bottom";

const DealPaymentSec = () => {
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#FDFDFF]">
      <TopBar deals={deals} onProjectSelect={(deal) => setSelectedDeal(deal)} />
      <Bottom
        deals={deals}
        setDeals={setDeals}
        selectedDeal={selectedDeal}
        setSelectedDeal={setSelectedDeal}
      />
    </div>
  );
};

export default DealPaymentSec;
