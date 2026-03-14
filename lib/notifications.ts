import { Platform } from 'react-native';

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const Notifications = await import('expo-notifications');
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('reminders', {
        name: 'Study Reminders',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

export async function scheduleStudyReminder(hour: number, minute: number): Promise<void> {
  try {
    const Notifications = await import('expo-notifications');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    await cancelStudyReminder();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time to study!',
        body: 'Open Recall and review your cards for today.',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  } catch {
    // expo-notifications not available in Expo Go
  }
}

export async function cancelStudyReminder(): Promise<void> {
  try {
    const Notifications = await import('expo-notifications');
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // expo-notifications not available in Expo Go
  }
}
