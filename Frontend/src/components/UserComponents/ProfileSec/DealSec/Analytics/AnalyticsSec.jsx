import React from 'react'
import AnalyticsTopBar from './AnalyticsTopBar'
import AnalyticsBottomSec from './AnalyticsBottomSec'

const AnalyticsSec = () => {
  return (
    <div>
      <div id='top'>
         <AnalyticsTopBar/>
      </div>

      <div id='bottom'>
        <AnalyticsBottomSec />
      </div>
    </div>
  );
};

export default AnalyticsSec
