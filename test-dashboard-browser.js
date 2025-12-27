// Dashboard Browser Test Script
// Copy and paste this into the browser console when on the dashboard page

console.log('🧪 Testing Dynamic Dashboard...\n');

// Test 1: Check if dashboard data is loaded
const dashboardContainer = document.querySelector('[class*="min-h-screen"]');
if (dashboardContainer) {
  console.log('✅ Dashboard container found');
} else {
  console.log('❌ Dashboard container not found');
  console.log('   Make sure you are on the dashboard page');
}

// Test 2: Check for loading states
const loadingElement = document.querySelector('.animate-spin');
const errorElement = document.querySelector('.bg-red-900');

if (loadingElement) {
  console.log('⏳ Dashboard is loading...');
} else if (errorElement) {
  console.log('❌ Error state detected - check authentication or server');
} else {
  console.log('✅ No loading or error states (dashboard loaded successfully)');
}

// Test 3: Check statistics cards
const statCards = document.querySelectorAll('[class*="grid-cols-1 md:grid-cols-3"], [class*="grid-cols-1 md:grid-cols-4"]');
if (statCards.length > 0) {
  console.log('✅ Statistics cards found');

  // Check if cards have dynamic data (not static text)
  const cards = document.querySelectorAll('[class*="text-3xl font-bold"]');
  let dynamicDataCount = 0;
  cards.forEach(card => {
    const text = card.textContent.trim();
    if (!isNaN(text) && text !== '') {
      dynamicDataCount++;
    }
  });

  if (dynamicDataCount > 0) {
    console.log(`✅ Dynamic data detected in ${dynamicDataCount} statistics cards`);
  } else {
    console.log('⚠️  Statistics cards may still have static data');
  }
} else {
  console.log('❌ Statistics cards not found');
}

// Test 4: Check maintenance table
const table = document.querySelector('table');
if (table) {
  console.log('✅ Maintenance requests table found');

  const rows = table.querySelectorAll('tbody tr');
  if (rows.length > 0) {
    console.log(`✅ Table has ${rows.length} data rows`);

    // Check if rows are clickable
    const clickableRows = Array.from(rows).filter(row =>
      row.style.cursor === 'pointer' ||
      row.classList.contains('cursor-pointer') ||
      row.onclick
    );

    if (clickableRows.length > 0) {
      console.log('✅ Table rows are clickable (navigation enabled)');
    } else {
      console.log('⚠️  Table rows may not be clickable');
    }
  } else {
    console.log('⚠️  Table has no data rows');
  }
} else {
  console.log('❌ Maintenance requests table not found');
}

// Test 5: Check search functionality
const searchInput = document.querySelector('input[placeholder*="Search"]');
if (searchInput) {
  console.log('✅ Search input found');

  // Test search functionality
  const originalValue = searchInput.value;
  searchInput.value = 'test';
  searchInput.dispatchEvent(new Event('input', { bubbles: true }));

  setTimeout(() => {
    searchInput.value = originalValue;
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    console.log('✅ Search functionality tested');
  }, 100);
} else {
  console.log('❌ Search input not found');
}

// Test 6: Check upcoming maintenance section
const upcomingSection = document.querySelector('h2');
const hasUpcoming = Array.from(document.querySelectorAll('h2')).some(h2 =>
  h2.textContent.includes('Upcoming') || h2.textContent.includes('Next 7 Days')
);

if (hasUpcoming) {
  console.log('✅ Upcoming maintenance section found');
} else {
  console.log('⚠️  Upcoming maintenance section not found (may be empty)');
}

// Test 7: Check navigation buttons
const navButtons = document.querySelectorAll('button');
const newButton = Array.from(navButtons).find(btn =>
  btn.textContent.includes('New') || btn.textContent.includes('Request')
);

if (newButton) {
  console.log('✅ "New Request" button found');
} else {
  console.log('❌ "New Request" button not found');
}

console.log('\n🎯 Dashboard test completed!');
console.log('📋 Summary: Check the results above for any issues.');
console.log('🔧 If you see errors, check:');
console.log('   1. Backend server is running');
console.log('   2. You are logged in with valid credentials');
console.log('   3. Network connectivity to localhost:5000');
console.log('   4. Browser console for JavaScript errors');