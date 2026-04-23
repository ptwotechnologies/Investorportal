import React from "react";
import TopBar from "./TopBar";
import Bottom from "./Bottom";

const CompletedDealsSec = () => {
  return (
    <div className="flex flex-col h-full bg-[#FDFDFF] overflow-hidden">
      <TopBar />
      <Bottom />
    </div>
  );
};

export default CompletedDealsSec;
