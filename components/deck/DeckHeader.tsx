import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  onBack: () => void;
  onDelete: () => void;
  onAddCard: () => void;
}

export default function DeckHeader({ onBack, onDelete, onAddCard }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <ChevronLeft size={24} color={C.primary} />
        <Text style={styles.backText}>{t('common.back')}</Text>
      </TouchableOpacity>
      <View style={styles.right}>
        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Trash2 size={18} color={C.confidenceLow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={onAddCard}>
          <Plus size={15} color={C.white} />
          <Text style={styles.addBtnText}>{t('deck.add_card_btn')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12 },
    backBtn: { flexDirection: 'row', alignItems: 'center', gap: 2, padding: 4 },
    backText: { fontSize: 16, color: C.primary, fontWeight: '600' },
    right: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    deleteBtn: { padding: 8, borderRadius: 10, backgroundColor: C.confidenceLow + '15', borderWidth: 1.5, borderColor: C.confidenceLow + '30' },
    addBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: C.primary, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10 },
    addBtnText: { color: C.white, fontWeight: '700', fontSize: 14 },
  });
}
