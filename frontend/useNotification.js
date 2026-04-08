import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

export const useNotification = (channelFilter = null) => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  const { notifications, isConnected, removeNotification, socket } = context;

  // Filter notifications if a channel is provided
  const filteredNotifications = channelFilter
    ? notifications.filter((n) => n.channel === channelFilter)
    : notifications;

  /**
   * Manually trigger a notification (Request to backend)
   * Note: This usually happens via your API, but provided for utility.
   */
  const trigger = async (message, channel = 'system', type = 'info') => {
    // You can implement an API call here if your backend exposes an endpoint
    console.log(`[Toolkit] Triggering ${type} on channel ${channel}: ${message}`);
  };

  return {
    notifications: filteredNotifications,
    allNotifications: notifications,
    isConnected,
    removeNotification,
    trigger,
    socket
  };
};
