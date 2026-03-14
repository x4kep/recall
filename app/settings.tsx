import { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Sun, Moon, Smartphone, Bell, BellOff } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, useThemeSettings, ThemeColors, ThemeMode } from '../context/ThemeContext';
import { useSettingsStore } from '../store/settingsStore';
import { requestNotificationPermission } from '../lib/notifications';

const THEME_OPTIONS: { mode: ThemeMode; labelKey: string; icon: typeof Sun }[] = [
  { mode: 'light', labelKey: 'settings.theme_light', icon: Sun },
  { mode: 'dark', labelKey: 'settings.theme_dark', icon: Moon },
  { mode: 'system', labelKey: 'settings.theme_system', icon: Smartphone },
];

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function SettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const C = useTheme();
  const { themeMode, setThemeMode } = useThemeSettings();
  const { notificationsEnabled, reminderHour, reminderMinute, setNotificationsEnabled, setReminderTime } = useSettingsStore();
  const styles = makeStyles(C);

  async function handleToggleNotifications(value: boolean) {
    if (value) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        Alert.alert(
          t('settings.notif_denied_title'),
          t('settings.notif_denied_msg')
        );
        return;
      }
    }
    await setNotificationsEnabled(value);
  }

  function formatHour(h: number) {
    const period = h < 12 ? 'AM' : 'PM';
    const display = h % 12 === 0 ? 12 : h % 12;
    return `${display}:00 ${period}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ChevronLeft size={24} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('settings.title')}</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Appearance */}
        <Text style={styles.sectionLabel}>{t('settings.appearance')}</Text>
        <View style={styles.card}>
          {THEME_OPTIONS.map(({ mode, labelKey, icon: Icon }, index) => {
            const active = themeMode === mode;
            return (
              <View key={mode}>
                {index > 0 && <View style={styles.separator} />}
                <TouchableOpacity style={styles.row} onPress={() => setThemeMode(mode)}>
                  <Icon size={18} color={active ? C.primary : C.textSecondary} />
                  <Text style={[styles.rowLabel, active && styles.rowLabelActive]}>{t(labelKey)}</Text>
                  {active && <View style={styles.activeDot} />}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Notifications */}
        <Text style={styles.sectionLabel}>{t('settings.notifications')}</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Bell size={18} color={notificationsEnabled ? C.primary : C.textSecondary} />
            <Text style={styles.rowLabel}>{t('settings.daily_reminder')}</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: C.inputBorder, true: C.primary }}
              thumbColor={C.white}
            />
          </View>

          {notificationsEnabled && (
            <>
              <View style={styles.separator} />
              <View style={styles.timeSection}>
                <Text style={styles.timeLabel}>{t('settings.reminder_time')}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timeRow}>
                  {HOURS.map((h) => (
                    <TouchableOpacity
                      key={h}
                      style={[styles.timeChip, reminderHour === h && styles.timeChipActive]}
                      onPress={() => setReminderTime(h, 0)}
                    >
                      <Text style={[styles.timeChipText, reminderHour === h && styles.timeChipTextActive]}>
                        {formatHour(h)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}
        </View>

        {/* About */}
        <Text style={styles.sectionLabel}>{t('settings.about')}</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Recall</Text>
            <Text style={styles.rowValue}>v1.0.0</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
    backBtn: { width: 32 },
    title: { fontSize: 18, fontWeight: '700', color: C.text },
    scroll: { padding: 20, gap: 8, paddingBottom: 40 },
    sectionLabel: { fontSize: 11, fontWeight: '700', color: C.textMuted, letterSpacing: 1.5, marginTop: 12, marginBottom: 4, marginLeft: 4 },
    card: { backgroundColor: C.surface, borderRadius: 16, overflow: 'hidden' },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
    rowLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: C.text },
    rowLabelActive: { color: C.primary, fontWeight: '600' },
    rowValue: { fontSize: 14, color: C.textMuted },
    activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.primary },
    separator: { height: 1, backgroundColor: C.separator, marginHorizontal: 16 },
    timeSection: { padding: 16, gap: 10 },
    timeLabel: { fontSize: 13, fontWeight: '600', color: C.textSecondary },
    timeRow: { flexDirection: 'row', gap: 8, paddingBottom: 4 },
    timeChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: C.inputBg, borderWidth: 1.5, borderColor: C.inputBorder },
    timeChipActive: { backgroundColor: C.primaryLight, borderColor: C.primary },
    timeChipText: { fontSize: 13, fontWeight: '500', color: C.textSecondary },
    timeChipTextActive: { color: C.primary, fontWeight: '700' },
  });
}
