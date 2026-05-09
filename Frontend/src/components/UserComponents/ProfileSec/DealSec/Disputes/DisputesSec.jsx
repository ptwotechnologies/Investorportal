import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import Bottom from './Bottom'
import axios from 'axios'
import { serverUrl } from '@/App'

const DisputesSec = () => {
  const location = useLocation();
  const [isCreateMode, setIsCreateMode] = React.useState(location.state?.isCreateMode || false);
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (location.state?.isCreateMode) {
      setIsCreateMode(true);
    }
    fetchDeals();
  }, [location.state]);

  const fetchDeals = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/deals/my-deals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const validDeals = res.data.filter(d => 
        ["Active", "Documented", "Approved", "Completed"].includes(d.status)
      );
      setDeals(validDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  const handleProjectSelect = (deal) => {
    setSelectedDeal(deal);
    setIsCreateMode(true);
  };

  return (
    <div>
      <div id='top'>
        <TopBar 
          deals={deals} 
          onProjectSelect={handleProjectSelect} 
          onCreateClick={() => setIsCreateMode(true)} 
        />
      </div>

      <div id='bottom'>
        <Bottom 
          isCreateMode={isCreateMode} 
          setIsCreateMode={setIsCreateMode} 
          initialDealId={location.state?.dealId}
          initialMilestoneId={location.state?.milestoneId}
          deals={deals}
          selectedDeal={selectedDeal}
          setSelectedDeal={setSelectedDeal}
        />
      </div>
    </div>
  )
}

export default DisputesSec
