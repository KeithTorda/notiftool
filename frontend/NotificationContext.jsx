import React, { createContext, useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';

export const NotificationContext = createContext();

export const NotificationProvider = ({ socketUrl, children }) => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(socketUrl);
    setSocket(newSocket);

    newSocket.on('connect', () => setIsConnected(true));
    newSocket.on('disconnect', () => setIsConnected(false));

    newSocket.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev].slice(0, 10)); // Keep last 10
      
      // Auto-remove after 6 seconds
      setTimeout(() => {
        removeNotification(data.id);
      }, 6000);
    });

    return () => newSocket.close();
  }, [socketUrl]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const value = {
    notifications,
    isConnected,
    removeNotification,
    socket
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
