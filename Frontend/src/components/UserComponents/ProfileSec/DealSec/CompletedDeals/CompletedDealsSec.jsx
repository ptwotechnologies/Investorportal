import React from "react";
import TopBar from "./TopBar";
import Bottom from "./Bottom";

const CompletedDealsSec = () => {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#FDFDFF] overflow-hidden">
      <TopBar />
      <Bottom />
    </div>
  );
};

export default CompletedDealsSec;
