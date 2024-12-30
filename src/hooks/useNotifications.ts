import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { initializeNotifications } from '../lib/notifications';

export const useNotifications = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Request notification permissions
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    // Initialize real-time notifications
    const cleanup = initializeNotifications(user.id);
    return cleanup;
  }, [user]);
};