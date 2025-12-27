# Maintenance Calendar - Dynamic Implementation

## Overview
The Maintenance Calendar is now fully dynamic and connected to the backend API. It displays maintenance requests with scheduled dates in an interactive calendar view.

## Features

### ✅ Dynamic Data Loading
- Fetches maintenance requests from the backend API
- Filters events by month and year
- Real-time data updates when navigating between months

### ✅ Interactive Calendar
- Navigate between months using arrow buttons
- Jump to today's date with the "Today" button
- Visual indicators for today's date
- Hover effects on calendar cells

### ✅ Event Display
- Events are color-coded based on status and priority:
  - **Blue**: In Progress
  - **Green**: Completed
  - **Red**: Critical Priority
  - **Cyan**: Scheduled
- Shows event time, subject, and equipment
- Tooltips with detailed information
- Click events for future expansion

### ✅ Error Handling
- Authentication error handling with automatic logout
- Network error handling with retry functionality
- Loading states with spinner animation
- User-friendly error messages

### ✅ Responsive Design
- Works on desktop and mobile devices
- Tailwind CSS styling with dark theme
- Accessible navigation and interactions

## API Endpoints

### Get Calendar Events
```
GET /api/analytics/calendar-events?year=2024&month=12
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "event_id",
    "subject": "HVAC System Maintenance",
    "date": "2024-12-15T10:00:00.000Z",
    "day": 15,
    "month": 11,
    "year": 2024,
    "time": "10:00 AM",
    "status": "scheduled",
    "priority": "Medium",
    "equipment": "Sample Equipment",
    "technician": "Test User",
    "team": "Sample Team"
  }
]
```

### Create Sample Events (for testing)
```
POST /api/analytics/create-sample-events
Authorization: Bearer <token>
```

## Usage Instructions

### 1. Start the Backend Server
```bash
cd server
npm start
```

### 2. Start the Frontend Client
```bash
cd client
npm run dev
```

### 3. Create Sample Data (Optional)
If you don't have existing maintenance requests, create sample data:
```bash
curl -X POST http://localhost:5000/api/analytics/create-sample-events \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Access the Calendar
Navigate to `/maintenance-calendar` in your application.

### 5. Test the Calendar
- Use the test script `test-calendar.js` in browser console
- Check for loading states, error handling, and event display
- Test navigation between months
- Verify today's date highlighting

## Troubleshooting

### Calendar Not Loading
1. Check if backend server is running on port 5000
2. Verify JWT token is valid in localStorage
3. Check browser console for API errors
4. Ensure MongoDB is connected

### No Events Displayed
1. Create sample events using the API endpoint
2. Check if maintenance requests have `scheduledDate` field
3. Verify date filtering logic in backend

### Authentication Errors
1. Log in again to refresh JWT token
2. Check token expiration
3. Verify auth middleware is working

### Navigation Issues
1. Check browser console for JavaScript errors
2. Verify React state updates correctly
3. Test month calculation logic

## Code Structure

### Frontend (`client/src/pages/MaintenanceCalendar.jsx`)
- `fetchCalendarEvents()`: API call with error handling
- `getDaysInMonth()`: Calendar grid calculation
- `renderCalendarDays()`: Event rendering logic
- `LegendItem`: Color legend component

### Backend (`server/controllers/analytics.controller.js`)
- `getCalendarEvents()`: Fetch and format events
- `createSampleEvents()`: Create test data

### Routes (`server/routes/analytics.routes.js`)
- `/calendar-events`: GET endpoint for events
- `/create-sample-events`: POST endpoint for test data

## Future Enhancements

### Event Details Modal
- Click events to show detailed information
- Edit maintenance requests from calendar
- Add new events directly from calendar

### Advanced Filtering
- Filter by technician, equipment, or priority
- Search functionality
- Multiple calendar views (week, day)

### Notifications
- Upcoming maintenance reminders
- Overdue task alerts
- Real-time updates via WebSocket

### Export Features
- Export calendar to PDF
- iCal integration
- Email notifications

## Testing

Run the included test script in browser console:
```javascript
// Load the test script
// Copy and paste the contents of test-calendar.js into console
```

This will verify:
- Calendar grid rendering
- Navigation buttons
- Legend display
- Loading/error states