import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import Bottom from './Bottom'

const DisputesSec = () => {
  const location = useLocation();
  const [isCreateMode, setIsCreateMode] = React.useState(location.state?.isCreateMode || false);

  useEffect(() => {
    if (location.state?.isCreateMode) {
      setIsCreateMode(true);
    }
  }, [location.state]);

  return (
   <div>
      <div id='top'>
         <TopBar onCreateClick={() => setIsCreateMode(true)} />
      </div>

      <div id='bottom'>
        <Bottom 
          isCreateMode={isCreateMode} 
          setIsCreateMode={setIsCreateMode} 
          initialDealId={location.state?.dealId}
          initialMilestoneId={location.state?.milestoneId}
        />
      </div>
    </div>
  )
}

export default DisputesSec
