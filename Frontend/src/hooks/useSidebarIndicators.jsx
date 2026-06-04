import { useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '@/App';

export const useSidebarIndicators = () => {
  const [indicators, setIndicators] = useState({
    requests: { hasUnread: false, count: 0 },
    connect: { hasUnread: false, count: 0 },
    serviceDeal: {
      hasUnread: false,
      count: 0,
      activeDealsCount: 0,
      negotiationsCount: 0,
      completedCount: 0,
      disputesCount: 0,
    },
    communication: { hasUnread: false, count: 0 }
  });

  const fetchIndicators = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get(`${serverUrl}/user/indicators?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data) {
        setIndicators(res.data);
      }
    } catch (error) {
      console.error('Error fetching sidebar indicators:', error);
    }
  };

  useEffect(() => {
    fetchIndicators();

    // Setup an interval to periodically fetch indicators (every 30 seconds)
    // or rely on a global event listener triggered by other actions
    const intervalId = setInterval(fetchIndicators, 30000);

    // Also listen for specific manual refreshes if any actions require immediate update
    const handleRefresh = () => fetchIndicators();
    window.addEventListener('sidebar-refresh', handleRefresh);
    window.addEventListener('spModeChanged', handleRefresh);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('sidebar-refresh', handleRefresh);
      window.removeEventListener('spModeChanged', handleRefresh);
    };
  }, []);

  return { indicators, fetchIndicators };
};
