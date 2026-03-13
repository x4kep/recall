import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BookOpen, Plus, Upload } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  onNew: () => void;
  onImport: () => void;
}

export default function EmptyDecks({ onNew, onImport }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <View style={styles.container}>
      <BookOpen size={56} color={C.iconMuted} />
      <Text style={styles.title}>{t('decks.no_decks')}</Text>
      <Text style={styles.subtext}>{t('decks.no_decks_sub')}</Text>
      <TouchableOpacity style={styles.newBtn} onPress={onNew}>
        <Plus size={18} color={C.white} />
        <Text style={styles.newBtnText}>{t('decks.create_deck')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.importBtn} onPress={onImport}>
        <Upload size={15} color={C.primary} />
        <Text style={styles.importBtnText}>{t('decks.import_json')}</Text>
      </TouchableOpacity>
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { alignItems: 'center', gap: 12, paddingHorizontal: 40 },
    title: { fontSize: 22, fontWeight: '700', color: C.text },
    subtext: { fontSize: 15, color: C.textSecondary, textAlign: 'center' },
    newBtn: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14 },
    newBtnText: { color: C.white, fontWeight: '700', fontSize: 16 },
    importBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 24, paddingVertical: 10 },
    importBtnText: { color: C.primary, fontWeight: '600', fontSize: 15 },
  });
}
