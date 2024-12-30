import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from './supabase';

let notificationChannel: RealtimeChannel;

export const initializeNotifications = (userId: string) => {
  notificationChannel = supabase.channel(`notifications:${userId}`);

  notificationChannel
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'matches',
      filter: `tutor_id=eq.${userId}`,
    }, handleNewMatch)
    .subscribe();

  return () => {
    notificationChannel.unsubscribe();
  };
};

const handleNewMatch = async (payload: any) => {
  const { new: match } = payload;
  
  // Create browser notification if supported
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('New Tutoring Request', {
      body: 'You have a new tutoring request waiting for your response.',
    });
  }

  // Dispatch custom event for UI updates
  window.dispatchEvent(
    new CustomEvent('newMatch', { detail: match })
  );
};