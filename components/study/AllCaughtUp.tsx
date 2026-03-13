import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  onClose: () => void;
}

export default function AllCaughtUp({ onClose }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <CheckCircle2 size={24} color={C.primary} />
      </TouchableOpacity>
      <View style={styles.container}>
        <CheckCircle2 size={64} color={C.confidenceHigh} />
        <Text style={styles.title}>{t('study.all_caught_up')}</Text>
        <Text style={styles.sub}>{t('study.no_due')}</Text>
      </View>
    </>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    closeBtn: { padding: 20 },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
    title: { fontSize: 24, fontWeight: '800', color: C.text },
    sub: { fontSize: 15, color: C.textSecondary },
  });
}
