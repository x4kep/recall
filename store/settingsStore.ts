import { create } from 'zustand';
import { scheduleStudyReminder, cancelStudyReminder } from '../lib/notifications';

interface SettingsState {
  notificationsEnabled: boolean;
  reminderHour: number;
  reminderMinute: number;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  setReminderTime: (hour: number, minute: number) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  notificationsEnabled: false,
  reminderHour: 9,
  reminderMinute: 0,

  setNotificationsEnabled: async (enabled) => {
    set({ notificationsEnabled: enabled });
    if (enabled) {
      const { reminderHour, reminderMinute } = get();
      await scheduleStudyReminder(reminderHour, reminderMinute);
    } else {
      await cancelStudyReminder();
    }
  },

  setReminderTime: async (hour, minute) => {
    set({ reminderHour: hour, reminderMinute: minute });
    if (get().notificationsEnabled) {
      await scheduleStudyReminder(hour, minute);
    }
  },
}));
