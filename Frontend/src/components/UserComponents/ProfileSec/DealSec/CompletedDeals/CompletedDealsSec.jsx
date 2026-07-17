import React from "react";
import TopBar from "./TopBar";
import Bottom from "./Bottom";

const CompletedDealsSec = () => {
  return (
    <div className="flex flex-col flex-1 min-h-0 w-full h-full bg-[#FDFDFF] overflow-hidden">
      <div id="top" className="shrink-0">
        <TopBar />
      </div>
      <div id="bottom" className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <Bottom />
      </div>
    </div>
  );
};

export default CompletedDealsSec;
