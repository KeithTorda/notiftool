# Live Notification Toolkit 🚀

A modular, multi-channel real-time notification system for React and Node.js.

## 📁 Structure

```text
toolkit/
├── backend/
│   └── notification-service.js   # The heart of the backend
├── frontend/
│   ├── NotificationContext.jsx   # Context & Socket logic
│   ├── useNotification.js        # The hook your components use
│   └── components/
│       └── NotificationToast.jsx # The UI components
└── requirements.txt              # npm install guide
```

## 🚀 How to Integrate

### 1. Backend Integration

In your `server.js`:
```javascript
import http from 'http';
import notificationService from './toolkit/backend/notification-service.js';

const httpServer = http.createServer(app);

// Initialize with your server
notificationService.init(httpServer, {
  cors: { origin: 'http://localhost:5173' }
});

// Trigger from anywhere
notificationService.notify('Server Rebranded!', 'system', 'success');
notificationService.notify('New Message', 'chat', 'info');
```

### 2. Frontend Integration

In your `main.jsx` or `App.jsx`:
```javascript
import { NotificationProvider } from './toolkit/frontend/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider socketUrl="http://localhost:3001">
    <App />
  </NotificationProvider>
);
```

### 3. Usage in Components

```javascript
import { useNotification } from './toolkit/frontend/useNotification';
import { NotificationContainer } from './toolkit/frontend/components/NotificationToast';

function Dashboard() {
  const { notifications, removeNotification } = useNotification(); // All channels
  // OR const { notifications } = useNotification('chat'); // Just chat channel

  return (
    <div>
      <NotificationContainer 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
      <h1>My System</h1>
    </div>
  );
}
```

## 🎨 Channel Types
The toolkit supports the following channels out-of-the-box:
- `system`: Indigo theme, Shield icon.
- `chat`: Emerald theme, Message icon.
- `admin`: Rose theme, Alert icon.
- `default`: Slate theme, Bell icon.
