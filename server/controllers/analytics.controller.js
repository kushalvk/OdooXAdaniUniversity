const getDashboardData = (req, res) => {
    try {
        // In a real application, you would fetch this data from a database
        // based on user's organization, date range, etc.
        const dashboardData = {
            totalRequests: 156,
            completedRequests: 128,
            inProgressRequests: 18,
            pendingRequests: 10,
            averageResponseTime: 2.4, // hours
            averageCompletionTime: 5.2, // hours
            criticalIssues: 5,
            equipmentHealth: 87, // percentage
            // Additional stats for breakdown sections
            responseTimeBreakdown: {
                average: 2.4,
                fastest: 0.5,
                 slowest: 8.2,
            },
            completionStats: {
                average: 5.2,
                completionRate: 82,
                onTimeCompletion: 92,
            },
            priorityDistribution: {
                critical: 5,
                high: 32,
                medium: 89,
                low: 30,
            },
            recentActivity: {
                thisWeek: {
                    completed: 45,
                    inProgress: 12,
                    vsLastWeek: '+15%',
                },
                thisMonth: {
                    completed: 156,
                    inProgress: 18,
                    vsLastMonth: '+8%',
                },
                equipmentStatus: {
                    healthy: 87,
                    criticalIssues: 5,
                    vsLastMonth: '+2%',
                },
            },
        };
        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error fetching dashboard data' });
    }
};

const getMaintenanceTrends = (req, res) => {
    try {
        // In a real application, dateRange and categoryFilter would be used
        // to query the database and aggregate data.
        const { dateRange, categoryFilter } = req.query;

        // Mock data based on the original component's mock data
        const monthlyTrendData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Completed',
                    data: [12, 15, 18, 14, 16, 20, 22, 19, 21, 18, 16, 14],
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                },
                {
                    label: 'In Progress',
                    data: [5, 7, 6, 8, 9, 7, 8, 6, 7, 5, 4, 3],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                },
                {
                    label: 'Pending',
                    data: [3, 2, 4, 3, 5, 4, 3, 2, 3, 4, 5, 6],
                    borderColor: 'rgb(234, 179, 8)',
                    backgroundColor: 'rgba(234, 179, 8, 0.1)',
                    tension: 0.4,
                },
            ],
        };

        const statusData = {
            labels: ['Completed', 'In Progress', 'Pending', 'Scrapped'],
            datasets: [
                {
                    label: 'Requests',
                    data: [128, 18, 10, 5],
                    backgroundColor: [
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(234, 179, 8, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                    ],
                    borderColor: [
                        'rgb(34, 197, 94)',
                        'rgb(59, 130, 246)',
                        'rgb(234, 179, 8)',
                        'rgb(239, 68, 68)',
                    ],
                    borderWidth: 2,
                },
            ],
        };

        const categoryData = {
            labels: ['Computers', 'HVAC', 'Electrical', 'Network', 'Office Equipment'],
            datasets: [
                {
                    label: 'Requests',
                    data: [45, 32, 28, 25, 26],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(234, 179, 8, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                    ],
                    borderColor: [
                        'rgb(59, 130, 246)',
                        'rgb(168, 85, 247)',
                        'rgb(234, 179, 8)',
                        'rgb(34, 197, 94)',
                        'rgb(239, 68, 68)',
                    ],
                    borderWidth: 2,
                },
            ],
        };

        const performanceData = {
            labels: ['Response Time (h)', 'Resolution Time (h)', 'First Contact (h)', 'SLA Compliance (%)'],
            datasets: [
                {
                    label: 'Current Month',
                    data: [2.4, 5.2, 1.8, 92],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 2,
                },
                {
                    label: 'Last Month',
                    data: [2.8, 5.8, 2.1, 88],
                    backgroundColor: 'rgba(168, 85, 247, 0.8)',
                    borderColor: 'rgb(168, 85, 247)',
                    borderWidth: 2,
                },
            ],
        };

        res.status(200).json({
            monthlyTrendData,
            statusData,
            categoryData,
            performanceData,
        });
    } catch (error) {
        console.error('Error fetching maintenance trends:', error);
        res.status(500).json({ message: 'Server error fetching maintenance trends' });
    }
};

module.exports = {
    getDashboardData,
    getMaintenanceTrends,
};
