const MaintenanceRequest = require('../models/MaintenanceRequest');

// @desc    Get calendar events (maintenance requests with scheduled dates)
// @route   GET /api/analytics/calendar-events
// @access  Private
const getCalendarEvents = async (req, res) => {
  try {
    const { month, year } = req.query;

    // If month and year are provided, filter by that month
    let filter = { scheduledDate: { $exists: true, $ne: null } };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1); // month is 1-indexed in query
      const endDate = new Date(year, month, 1); // end of the month
      filter.scheduledDate = {
        ...filter.scheduledDate,
        $gte: startDate,
        $lt: endDate
      };
    }

    const events = await MaintenanceRequest.find(filter)
      .populate('createdBy', 'firstName lastName')
      .populate('equipment', 'name')
      .populate('team', 'teamName')
      .populate('technician', 'firstName lastName')
      .sort({ scheduledDate: 1 });

    // Format events for calendar display
    const formattedEvents = events.map(event => ({
      id: event._id,
      subject: event.subject,
      date: event.scheduledDate,
      day: event.scheduledDate.getDate(),
      month: event.scheduledDate.getMonth(),
      year: event.scheduledDate.getFullYear(),
      time: event.scheduledDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      status: event.status || 'scheduled',
      priority: event.priority,
      category: event.category,
      maintenanceType: event.maintenanceType,
      equipment: event.equipment?.name || 'Unknown Equipment',
      technician: event.technician ? `${event.technician.firstName} ${event.technician.lastName}` : 'Unassigned',
      team: event.team?.teamName || 'Unknown Team',
      durationHours: event.durationHours,
      notes: event.notes
    }));

    res.json(formattedEvents);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/analytics/dashboard-data
// @access  Private
const getDashboardData = async (req, res) => {
  try {
    const MaintenanceRequest = require('../models/MaintenanceRequest');
    const Equipment = require('../models/Equipment');
    const User = require('../models/User');
    const MaintenanceTeam = require('../models/MaintenanceTeam');

    // Get maintenance request statistics
    const totalRequests = await MaintenanceRequest.countDocuments();
    const pendingRequests = await MaintenanceRequest.countDocuments({ status: 'pending' });
    const inProgressRequests = await MaintenanceRequest.countDocuments({ status: 'in-progress' });
    const completedRequests = await MaintenanceRequest.countDocuments({ status: 'completed' });

    // Get today's completed requests
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const completedToday = await MaintenanceRequest.countDocuments({
      status: 'completed',
      updatedAt: { $gte: today, $lt: tomorrow }
    });

    // Get overdue requests (pending requests older than 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const overdueRequests = await MaintenanceRequest.countDocuments({
      status: 'pending',
      createdAt: { $lt: weekAgo }
    });

    // Get equipment statistics
    const totalEquipment = await Equipment.countDocuments();
    const activeEquipment = await Equipment.countDocuments({ status: 'Active' });
    const underRepairEquipment = await Equipment.countDocuments({ status: 'Under Repair' });
    const scrappedEquipment = await Equipment.countDocuments({ status: 'Scrapped' });

    // Calculate equipment health (mock calculation - in real app, this would be based on maintenance history)
    const equipmentHealth = Math.round((activeEquipment / totalEquipment) * 100) || 0;

    // Get technician statistics
    const totalTechnicians = await User.countDocuments({ role: 'technician' }) || await User.countDocuments();
    const activeTechnicians = await MaintenanceRequest.distinct('technician', {
      status: { $in: ['in-progress', 'pending'] }
    }).then(techs => techs.filter(tech => tech).length);

    // Calculate technician utilization (mock calculation)
    const technicianUtilization = totalTechnicians > 0 ? Math.round((activeTechnicians / totalTechnicians) * 100) : 0;

    // Calculate average response time (mock calculation - in hours)
    const avgResponseTime = 2.4; // This would be calculated from actual data

    // Get upcoming scheduled maintenance (next 7 days)
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const upcomingMaintenance = await MaintenanceRequest.find({
      scheduledDate: {
        $gte: today,
        $lte: nextWeek
      }
    })
    .populate('equipment', 'name')
    .populate('technician', 'firstName lastName')
    .populate('createdBy', 'firstName lastName')
    .sort({ scheduledDate: 1 })
    .limit(5);

    // Get recent maintenance requests (last 10)
    const recentRequests = await MaintenanceRequest.find()
      .populate('createdBy', 'firstName lastName')
      .populate('technician', 'firstName lastName')
      .populate('equipment', 'name')
      .populate('team', 'teamName')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      statistics: {
        totalRequests,
        pendingRequests,
        inProgressRequests,
        completedRequests,
        completedToday,
        overdueRequests,
        totalEquipment,
        activeEquipment,
        underRepairEquipment,
        scrappedEquipment,
        equipmentHealth,
        totalTechnicians,
        activeTechnicians,
        technicianUtilization,
        avgResponseTime
      },
      upcomingMaintenance,
      recentRequests
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get maintenance trends data
// @route   GET /api/analytics/maintenance-trends
// @access  Private
const getMaintenanceTrends = async (req, res) => {
  try {
    // This would typically aggregate data for charts
    // For now, return mock data
    res.json({
      monthlyTrends: [
        { month: 'Jan', requests: 12 },
        { month: 'Feb', requests: 19 },
        { month: 'Mar', requests: 15 },
        { month: 'Apr', requests: 25 },
        { month: 'May', requests: 22 },
        { month: 'Jun', requests: 30 }
      ],
      categoryBreakdown: [
        { category: 'Electrical', count: 15 },
        { category: 'HVAC', count: 12 },
        { category: 'Plumbing', count: 8 },
        { category: 'Mechanical', count: 20 }
      ]
    });
  } catch (error) {
    console.error('Error fetching maintenance trends:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create sample calendar events for testing
// @route   POST /api/analytics/create-sample-events
// @access  Private
const createSampleEvents = async (req, res) => {
  try {
    const MaintenanceRequest = require('../models/MaintenanceRequest');
    const User = require('../models/User');
    const Equipment = require('../models/Equipment');
    const MaintenanceTeam = require('../models/MaintenanceTeam');

    // Get some existing data or create sample data
    let user = await User.findOne();
    if (!user) {
      user = new User({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123'
      });
      await user.save();
    }

    let equipment = await Equipment.findOne();
    if (!equipment) {
      equipment = new Equipment({
        name: 'Sample Equipment',
        category: 'Computer',
        serialNumber: 'TEST-001'
      });
      await equipment.save();
    }

    let team = await MaintenanceTeam.findOne();
    if (!team) {
      team = new MaintenanceTeam({
        teamName: 'Sample Team',
        teamMembers: [user._id]
      });
      await team.save();
    }

    // Create sample maintenance requests with scheduled dates
    const sampleEvents = [
      {
        subject: 'HVAC System Maintenance',
        createdBy: user._id,
        equipment: equipment._id,
        category: 'HVAC',
        maintenanceType: 'Preventive',
        team: team._id,
        technician: user._id,
        scheduledDate: new Date(2024, 11, 15, 10, 0), // Dec 15, 2024, 10:00 AM
        durationHours: 2,
        priority: 'Medium',
        status: 'scheduled',
        notes: 'Regular HVAC maintenance check'
      },
      {
        subject: 'Electrical Panel Inspection',
        createdBy: user._id,
        equipment: equipment._id,
        category: 'Electrical',
        maintenanceType: 'Preventive',
        team: team._id,
        technician: user._id,
        scheduledDate: new Date(2024, 11, 20, 14, 30), // Dec 20, 2024, 2:30 PM
        durationHours: 1.5,
        priority: 'High',
        status: 'scheduled',
        notes: 'Monthly electrical inspection'
      },
      {
        subject: 'Server Room Cooling Check',
        createdBy: user._id,
        equipment: equipment._id,
        category: 'HVAC',
        maintenanceType: 'Corrective',
        team: team._id,
        technician: user._id,
        scheduledDate: new Date(2024, 11, 25, 9, 0), // Dec 25, 2024, 9:00 AM
        durationHours: 3,
        priority: 'Critical',
        status: 'in-progress',
        notes: 'Urgent cooling system repair'
      }
    ];

    const createdEvents = await MaintenanceRequest.insertMany(sampleEvents);

    res.json({
      message: 'Sample events created successfully',
      events: createdEvents.length,
      data: createdEvents
    });
  } catch (error) {
    console.error('Error creating sample events:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getCalendarEvents,
  getDashboardData,
  getMaintenanceTrends,
  createSampleEvents
};