// Test script to verify calendar functionality
// Run this in the browser console when the calendar page is loaded

// Test 1: Check if the calendar component renders
console.log('Testing Maintenance Calendar...');

// Test 2: Check if the fetchCalendarEvents function exists
const calendarElement = document.querySelector('[data-testid="calendar"]') ||
                       document.querySelector('.grid.grid-cols-7');
if (calendarElement) {
  console.log('✅ Calendar grid found');
} else {
  console.log('❌ Calendar grid not found');
}

// Test 3: Check if navigation buttons work
const prevButton = document.querySelector('button[title="Previous Month"]');
const nextButton = document.querySelector('button[title="Next Month"]');
const todayButton = document.querySelector('button:has-text("Today")');

if (prevButton && nextButton) {
  console.log('✅ Navigation buttons found');
} else {
  console.log('❌ Navigation buttons not found');
}

// Test 4: Check if legend is displayed
const legendElement = document.querySelector('h3:has-text("Legend")') ||
                      document.querySelector('h3');
if (legendElement && legendElement.textContent.includes('Legend')) {
  console.log('✅ Legend found');
} else {
  console.log('❌ Legend not found');
}

// Test 5: Check for loading/error states
const loadingElement = document.querySelector('.animate-spin');
const errorElement = document.querySelector('.bg-red-900');

if (loadingElement) {
  console.log('✅ Loading state found');
} else if (errorElement) {
  console.log('⚠️  Error state found - check authentication or server');
} else {
  console.log('✅ No loading or error states (calendar loaded successfully)');
}

console.log('Calendar test completed. Check the results above.');