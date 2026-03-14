import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Sun, Moon, Smartphone, Info } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, useThemeSettings, ThemeColors, ThemeMode } from '../../context/ThemeContext';

interface Props {
  onClose: () => void;
}

const THEME_OPTIONS: { mode: ThemeMode; labelKey: string; icon: typeof Sun }[] = [
  { mode: 'light', labelKey: 'settings.theme_light', icon: Sun },
  { mode: 'dark', labelKey: 'settings.theme_dark', icon: Moon },
  { mode: 'system', labelKey: 'settings.theme_system', icon: Smartphone },
];

export default function SettingsContent({ onClose }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const { themeMode, setThemeMode } = useThemeSettings();
  const styles = makeStyles(C);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings.title')}</Text>
        <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <X size={22} color={C.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{t('settings.appearance')}</Text>
        {THEME_OPTIONS.map(({ mode, labelKey, icon: Icon }) => {
          const active = themeMode === mode;
          return (
            <TouchableOpacity
              key={mode}
              style={[styles.option, active && styles.optionActive]}
              onPress={() => setThemeMode(mode)}
            >
              <Icon size={18} color={active ? C.primary : C.textSecondary} />
              <Text style={[styles.optionText, active && styles.optionTextActive]}>
                {t(labelKey)}
              </Text>
              {active && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{t('settings.about')}</Text>
        <View style={styles.aboutRow}>
          <Info size={16} color={C.textMuted} />
          <Text style={styles.aboutText}>Recall v1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.surfaceElevated },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 16 },
    title: { fontSize: 22, fontWeight: '800', color: C.text },
    section: { paddingHorizontal: 20, paddingBottom: 24, gap: 8 },
    sectionLabel: { fontSize: 11, fontWeight: '700', color: C.textMuted, letterSpacing: 1.5, marginBottom: 4 },
    option: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, backgroundColor: C.inputBg },
    optionActive: { backgroundColor: C.primaryLight },
    optionText: { flex: 1, fontSize: 15, fontWeight: '500', color: C.textSecondary },
    optionTextActive: { color: C.primary, fontWeight: '600' },
    activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.primary },
    aboutRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 12, backgroundColor: C.inputBg },
    aboutText: { fontSize: 14, color: C.textMuted },
  });
}
