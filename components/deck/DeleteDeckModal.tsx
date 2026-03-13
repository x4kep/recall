import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { AlertTriangle, Trash2, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  visible: boolean;
  deckName: string;
  cardCount: number;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDeckModal({ visible, deckName, cardCount, onClose, onConfirm }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.iconWrap}>
            <AlertTriangle size={32} color={C.confidenceLow} />
          </View>
          <Text style={styles.title}>{t('deck.delete_deck_title')}</Text>
          <Text style={styles.msg}>
            <Text style={{ fontWeight: '700' }}>{deckName}</Text>
            {' '}{t('deck.delete_deck_msg', { name: '', count: cardCount }).trim()}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={16} color={C.textSecondary} />
              <Text style={styles.closeBtnText}>{t('common.close')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm}>
              <Trash2 size={16} color={C.white} />
              <Text style={styles.deleteBtnText}>{t('common.delete')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    overlay: { flex: 1, backgroundColor: C.overlay, justifyContent: 'center' },
    sheet: {
      backgroundColor: C.surfaceElevated,
      borderRadius: 24,
      padding: 28,
      marginHorizontal: 24,
      alignItems: 'center',
      gap: 12,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 24,
      elevation: 12,
    },
    iconWrap: {
      width: 64, height: 64, borderRadius: 32,
      backgroundColor: C.confidenceLow + '15',
      alignItems: 'center', justifyContent: 'center',
      marginBottom: 4,
    },
    title: { fontSize: 22, fontWeight: '900', color: C.text },
    msg: { fontSize: 15, color: C.textSecondary, textAlign: 'center', lineHeight: 22 },
    actions: { flexDirection: 'row', gap: 12, marginTop: 8, width: '100%' },
    closeBtn: {
      flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      gap: 6, padding: 14, borderRadius: 12, backgroundColor: C.inputBg,
    },
    closeBtnText: { fontWeight: '600', color: C.textSecondary, fontSize: 15 },
    deleteBtn: {
      flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      gap: 6, padding: 14, borderRadius: 12, backgroundColor: C.confidenceLow,
    },
    deleteBtnText: { fontWeight: '700', color: C.white, fontSize: 15 },
  });
}
