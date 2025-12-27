const API_BASE_URL = '/api/analytics';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const fetchDashboardData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard-data`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch dashboard data');
    }
    return await res.json();
  } catch (error) {
    console.error('Error in fetchDashboardData:', error);
    throw error;
  }
};

export const fetchMaintenanceTrends = async (dateRange, categoryFilter) => {
  try {
    const params = new URLSearchParams();
    if (dateRange) params.append('dateRange', dateRange);
    if (categoryFilter) params.append('categoryFilter', categoryFilter);

    const res = await fetch(`${API_BASE_URL}/maintenance-trends?${params.toString()}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch maintenance trends');
    }
    return await res.json();
  } catch (error) {
    console.error('Error in fetchMaintenanceTrends:', error);
    throw error;
  }
};

