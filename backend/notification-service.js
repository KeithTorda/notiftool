import { Server } from 'socket.io';

class NotificationService {
  constructor() {
    this.io = null;
  }

  /**
   * Initialize Socket.io with a server instance
   * @param {http.Server} httpServer 
   * @param {Object} options Socket.io configuration options
   */
  init(httpServer, options = {}) {
    const defaultOptions = {
      cors: {
        origin: '*', // Adjust for production
        methods: ['GET', 'POST']
      }
    };
    
    this.io = new Server(httpServer, { ...defaultOptions, ...options });
    
    this.io.on('connection', (socket) => {
      console.log(`[NotificationToolkit] Client connected: ${socket.id}`);
      
      socket.on('disconnect', () => {
        console.log(`[NotificationToolkit] Client disconnected: ${socket.id}`);
      });
    });

    return this.io;
  }

  /**
   * Send a notification to all clients
   * @param {string} message The notification message
   * @param {string} channel 'system', 'chat', 'admin', etc.
   * @param {string} type 'info', 'success', 'warning', 'error'
   */
  notify(message, channel = 'system', type = 'info') {
    if (!this.io) {
      console.error('[NotificationToolkit] Service not initialized. Call init() first.');
      return false;
    }

    const payload = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      message,
      channel,
      type,
      timestamp: new Date().toISOString()
    };

    // Broadcast to the 'notification' event
    // Clients can filter by channel on the frontend
    this.io.emit('notification', payload);
    
    // Also emit to channel-specific events if selective listening is needed
    this.io.emit(`notification:${channel}`, payload);

    return true;
  }
}

// Singleton instance
const notificationService = new NotificationService();
export default notificationService;
