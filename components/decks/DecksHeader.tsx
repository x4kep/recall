import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, Upload } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  importing: boolean;
  onImport: () => void;
  onNew: () => void;
}

export default function DecksHeader({ importing, onImport, onNew }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{t('decks.title')}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.importBtn} onPress={onImport} disabled={importing}>
          <Upload size={15} color={C.textSecondary} />
          <Text style={styles.importBtnText}>{importing ? t('decks.loading') : t('decks.import')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newBtn} onPress={onNew}>
          <Plus size={16} color={C.white} />
          <Text style={styles.newBtnText}>{t('decks.new')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
    title: { fontSize: 28, fontWeight: '800', color: C.text },
    actions: { flexDirection: 'row', gap: 8 },
    importBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.surface, borderWidth: 1.5, borderColor: C.separator, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    importBtnText: { color: C.textSecondary, fontWeight: '600', fontSize: 14 },
    newBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
    newBtnText: { color: C.white, fontWeight: '700', fontSize: 15 },
  });
}
