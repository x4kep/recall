import { View, Text, StyleSheet } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

export default function EmptyHome() {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <View style={styles.container}>
      <Inbox size={48} color={C.iconMuted} />
      <Text style={styles.text}>{t('home.no_decks')}</Text>
      <Text style={styles.subtext}>{t('home.no_decks_sub')}</Text>
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { alignItems: 'center', paddingVertical: 40, gap: 12 },
    text: { fontSize: 18, fontWeight: '600', color: C.textSecondary },
    subtext: { fontSize: 14, color: C.textMuted, textAlign: 'center' },
  });
}
