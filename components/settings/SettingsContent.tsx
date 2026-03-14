import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  onClose: () => void;
}

export default function DrawerContent({ onClose }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const router = useRouter();
  const styles = makeStyles(C);

  function handleSettings() {
    onClose();
    router.push('/settings');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>{t('home.app_name')}</Text>
        <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <X size={22} color={C.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.nav}>
        <TouchableOpacity style={styles.navItem} onPress={handleSettings}>
          <Settings size={20} color={C.textSecondary} />
          <Text style={styles.navLabel}>{t('settings.title')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.surfaceElevated },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 16, marginBottom: 8 },
    appName: { fontSize: 22, fontWeight: '800', color: C.text },
    nav: { paddingHorizontal: 12, gap: 4 },
    navItem: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 12 },
    navLabel: { fontSize: 16, fontWeight: '600', color: C.text },
  });
}
