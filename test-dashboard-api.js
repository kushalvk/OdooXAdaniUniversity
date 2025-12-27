// Dashboard API Test Script
// Run this with Node.js to test the dashboard endpoints

const fetch = require('node-fetch');

async function testDashboardAPI() {
  const baseURL = 'http://localhost:5000/api';

  console.log('🧪 Testing Dashboard API...\n');

  try {
    // Test 1: Create sample events first (if needed)
    console.log('1. Creating sample events for testing...');
    const createResponse = await fetch(`${baseURL}/analytics/create-sample-events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Note: You'll need to add a valid JWT token here
        // 'Authorization': 'Bearer YOUR_JWT_TOKEN'
      }
    });

    if (createResponse.ok) {
      const createData = await createResponse.json();
      console.log('✅ Sample events created:', createData.events, 'events\n');
    } else {
      console.log('⚠️  Could not create sample events (may already exist or auth required)\n');
    }

    // Test 2: Fetch dashboard data
    console.log('2. Fetching dashboard data...');
    const dashboardResponse = await fetch(`${baseURL}/analytics/dashboard-data`, {
      headers: {
        'Content-Type': 'application/json',
        // Note: You'll need to add a valid JWT token here
        // 'Authorization': 'Bearer YOUR_JWT_TOKEN'
      }
    });

    if (dashboardResponse.ok) {
      const dashboardData = await dashboardResponse.json();
      console.log('✅ Dashboard data fetched successfully');

      // Display statistics
      console.log('\n📊 Statistics:');
      const stats = dashboardData.statistics;
      console.log(`   Total Requests: ${stats.totalRequests || 0}`);
      console.log(`   Pending Requests: ${stats.pendingRequests || 0}`);
      console.log(`   In Progress: ${stats.inProgressRequests || 0}`);
      console.log(`   Completed: ${stats.completedRequests || 0}`);
      console.log(`   Completed Today: ${stats.completedToday || 0}`);
      console.log(`   Overdue Requests: ${stats.overdueRequests || 0}`);
      console.log(`   Total Equipment: ${stats.totalEquipment || 0}`);
      console.log(`   Equipment Health: ${stats.equipmentHealth || 0}%`);
      console.log(`   Total Technicians: ${stats.totalTechnicians || 0}`);
      console.log(`   Active Technicians: ${stats.activeTechnicians || 0}`);
      console.log(`   Technician Utilization: ${stats.technicianUtilization || 0}%`);
      console.log(`   Avg Response Time: ${stats.avgResponseTime || 0}h`);

      // Display upcoming maintenance
      if (dashboardData.upcomingMaintenance && dashboardData.upcomingMaintenance.length > 0) {
        console.log('\n📅 Upcoming Maintenance (Next 7 days):');
        dashboardData.upcomingMaintenance.forEach((item, index) => {
          console.log(`   ${index + 1}. ${item.subject} - ${item.equipment?.name || 'N/A'} (${new Date(item.scheduledDate).toLocaleDateString()})`);
        });
      }

      // Display recent requests
      if (dashboardData.recentRequests && dashboardData.recentRequests.length > 0) {
        console.log('\n📋 Recent Maintenance Requests:');
        dashboardData.recentRequests.slice(0, 3).forEach((item, index) => {
          console.log(`   ${index + 1}. ${item.subject} - ${item.status} (${new Date(item.createdAt).toLocaleDateString()})`);
        });
        if (dashboardData.recentRequests.length > 3) {
          console.log(`   ... and ${dashboardData.recentRequests.length - 3} more`);
        }
      }

      console.log('\n✅ Dashboard API test completed successfully!');
    } else {
      console.log('❌ Failed to fetch dashboard data:', dashboardResponse.status, dashboardResponse.statusText);
      console.log('   Make sure you have a valid JWT token and the server is running');
    }

  } catch (error) {
    console.error('❌ Dashboard API Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure the backend server is running on port 5000');
    console.log('2. Check MongoDB connection');
    console.log('3. Add a valid JWT token to the Authorization header');
    console.log('4. Verify the API routes are registered in app.js');
  }
}

// For manual testing, you can also test with curl:
// curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/analytics/dashboard-data

if (require.main === module) {
  testDashboardAPI();
}

module.exports = { testDashboardAPI };