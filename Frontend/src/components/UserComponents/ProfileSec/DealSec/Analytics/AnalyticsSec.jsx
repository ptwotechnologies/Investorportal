import React from "react";
import AnalyticsTopBar from "./AnalyticsTopBar";
import AnalyticsBottomSec from "./AnalyticsBottomSec";

const AnalyticsSec = () => {
  return (
    <div className="flex flex-col flex-1 min-h-0 w-full h-full overflow-hidden">
      <div id="top" className="shrink-0">
        <AnalyticsTopBar />
      </div>

      <div id="bottom" className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <AnalyticsBottomSec />
      </div>
    </div>
  );
};

export default AnalyticsSec;
