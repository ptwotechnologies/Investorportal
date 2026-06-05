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

    const handleRefresh = () => fetchDeals();
    window.addEventListener("spModeChanged", handleRefresh);
    window.addEventListener("sidebar-refresh", handleRefresh);
    return () => {
      window.removeEventListener("spModeChanged", handleRefresh);
      window.removeEventListener("sidebar-refresh", handleRefresh);
    };
  }, [location.state]);

  const fetchDeals = async () => {
    try {
      const spMode = localStorage.getItem("spMode")?.toLowerCase() || "provider";
      const res = await axios.get(`${serverUrl}/api/deals/my-deals?spMode=${spMode}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      let allDeals = res.data;
      const userStr = localStorage.getItem("user");
      const userData = userStr ? JSON.parse(userStr) : null;
      const currentUserId = userData?._id || userData?.id;
      const actualRole = localStorage.getItem("role")?.toLowerCase() || userData?.role?.toLowerCase() || "";
      
      if (currentUserId && String(actualRole).includes("professional")) {
        if (spMode === "buyer") {
          allDeals = allDeals.filter(d => String(d.startupId?._id || d.startupId) === String(currentUserId));
        } else {
          allDeals = allDeals.filter(d => String(d.professionalId?._id || d.professionalId) === String(currentUserId));
        }
      }

      const validDeals = allDeals.filter(d => 
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
