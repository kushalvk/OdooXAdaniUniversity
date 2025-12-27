// API Test Script for Maintenance Calendar
// Run this with Node.js to test the backend endpoints

const fetch = require('node-fetch');

async function testCalendarAPI() {
  const baseURL = 'http://localhost:5000/api';

  console.log('🧪 Testing Maintenance Calendar API...\n');

  try {
    // Test 1: Create sample events
    console.log('1. Creating sample events...');
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
      console.log('⚠️  Could not create sample events (may already exist)\n');
    }

    // Test 2: Fetch calendar events
    console.log('2. Fetching calendar events...');
    const eventsResponse = await fetch(`${baseURL}/analytics/calendar-events?year=2024&month=12`, {
      headers: {
        'Content-Type': 'application/json',
        // Note: You'll need to add a valid JWT token here
        // 'Authorization': 'Bearer YOUR_JWT_TOKEN'
      }
    });

    if (eventsResponse.ok) {
      const events = await eventsResponse.json();
      console.log('✅ Calendar events fetched:', events.length, 'events');

      if (events.length > 0) {
        console.log('Sample event:', {
          subject: events[0].subject,
          date: events[0].date,
          time: events[0].time,
          status: events[0].status,
          equipment: events[0].equipment
        });
      }
      console.log('');
    } else {
      console.log('❌ Failed to fetch calendar events:', eventsResponse.status, eventsResponse.statusText);
      console.log('');
    }

  } catch (error) {
    console.error('❌ API Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure the backend server is running on port 5000');
    console.log('2. Check MongoDB connection');
    console.log('3. Add a valid JWT token to the Authorization header');
    console.log('4. Verify the API routes are registered in app.js');
  }
}

// For manual testing, you can also test with curl:
// curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/analytics/calendar-events?year=2024&month=12

if (require.main === module) {
  testCalendarAPI();
}

module.exports = { testCalendarAPI };