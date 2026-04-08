import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Info, AlertCircle, CheckCircle, X, Shield, MessageSquare } from 'lucide-react';

const channelConfig = {
  system: {
    icon: <Shield className="text-indigo-400" size={18} />,
    borderColor: 'border-indigo-500/30'
  },
  chat: {
    icon: <MessageSquare className="text-emerald-400" size={18} />,
    borderColor: 'border-emerald-500/30'
  },
  admin: {
    icon: <AlertCircle className="text-rose-400" size={18} />,
    borderColor: 'border-rose-500/30'
  },
  default: {
    icon: <Bell className="text-slate-400" size={18} />,
    borderColor: 'border-slate-500/30'
  }
};

const typeIcons = {
  info: <Info className="text-blue-400" size={14} />,
  success: <CheckCircle className="text-emerald-400" size={14} />,
  error: <AlertCircle className="text-rose-400" size={14} />,
  warning: <Bell className="text-amber-400" size={14} />
};

export const NotificationToast = ({ id, message, channel, type, onClose }) => {
  const config = channelConfig[channel] || channelConfig.default;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px',
        pointerEvents: 'auto',
        marginBottom: '8px'
      }}
      className={config.borderColor}
    >
      <div className="flex-shrink-0">
        {config.icon}
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{channel}</span>
          {typeIcons[type]}
        </div>
        <p className="text-sm font-medium text-slate-200">{message}</p>
      </div>
      <button 
        onClick={() => onClose(id)}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
      >
        <X size={14} className="text-slate-500 hover:text-slate-300 transition-colors" />
      </button>
    </motion.div>
  );
};

export const NotificationContainer = ({ notifications, removeNotification }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      pointerEvents: 'none'
    }}>
      <AnimatePresence mode="popLayout">
        {notifications.map((n) => (
          <NotificationToast 
            key={n.id} 
            {...n} 
            onClose={removeNotification} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
