import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, AlertTriangle, Wrench } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Mock notifications for demonstration
  useEffect(() => {
    // Simulate receiving notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'maintenance',
        title: 'New Maintenance Request',
        message: 'Equipment #EQ-001 requires immediate attention',
        timestamp: new Date(),
        read: false,
        urgent: true
      },
      {
        id: 2,
        type: 'overdue',
        title: 'Overdue Task',
        message: 'Maintenance request #MR-005 is overdue',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        urgent: true
      },
      {
        id: 3,
        type: 'completed',
        title: 'Task Completed',
        message: 'Maintenance request #MR-003 has been completed',
        timestamp: new Date(Date.now() - 7200000),
        read: true,
        urgent: false
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-blue-400" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      default:
        return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            <p className="text-sm text-gray-400">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="divide-y divide-slate-700">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-slate-700/50 transition-colors ${
                    !notification.read ? 'bg-slate-700/30' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-300">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex space-x-1">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 hover:bg-slate-600 rounded"
                          title="Mark as read"
                        >
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="p-1 hover:bg-slate-600 rounded"
                        title="Remove"
                      >
                        <X className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-slate-700">
              <button
                onClick={() => setNotifications([])}
                className="w-full text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;