import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import { ImportedDeck } from '../../lib/importDeck';

interface Props {
  deck: ImportedDeck | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ImportPreviewModal({ deck, onClose, onConfirm }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <Modal visible={!!deck} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('decks.import_deck')}</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <X size={22} color={C.textSecondary} />
            </TouchableOpacity>
          </View>

          {deck && (
            <>
              <View style={styles.info}>
                <Text style={styles.deckName}>{deck.name}</Text>
                {deck.description ? <Text style={styles.deckDesc}>{deck.description}</Text> : null}
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{t('common.cards_count', { count: deck.cards.length })}</Text>
                </View>
              </View>

              <Text style={styles.sectionLabel}>{t('decks.preview_label')}</Text>

              <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {deck.cards.slice(0, 3).map((c, i) => (
                  <View key={i} style={styles.previewCard}>
                    <Text style={styles.previewQ} numberOfLines={2}>{t('decks.preview_q')} {c.question}</Text>
                    <Text style={styles.previewA} numberOfLines={2}>{t('decks.preview_a')} {c.answer}</Text>
                  </View>
                ))}
                {deck.cards.length > 3 && (
                  <Text style={styles.more}>{t('decks.more_cards', { count: deck.cards.length - 3 })}</Text>
                )}
              </ScrollView>
            </>
          )}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmText}>{t('decks.import')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    overlay: { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
    sheet: { backgroundColor: C.surfaceElevated, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 16, maxHeight: '80%' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '800', color: C.text },
    info: { backgroundColor: C.primaryLight, borderRadius: 14, padding: 16, gap: 6 },
    deckName: { fontSize: 18, fontWeight: '800', color: C.text },
    deckDesc: { fontSize: 14, color: C.textSecondary },
    badge: { alignSelf: 'flex-start', backgroundColor: C.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 4 },
    badgeText: { color: C.white, fontWeight: '700', fontSize: 13 },
    sectionLabel: { fontSize: 11, fontWeight: '700', color: C.textMuted, letterSpacing: 1.5 },
    scroll: { maxHeight: 200 },
    previewCard: { backgroundColor: C.inputBg, borderRadius: 12, padding: 12, gap: 6, marginBottom: 8 },
    previewQ: { fontSize: 14, fontWeight: '600', color: C.text },
    previewA: { fontSize: 13, color: C.textSecondary },
    more: { fontSize: 13, color: C.textMuted, textAlign: 'center', paddingVertical: 8 },
    actions: { flexDirection: 'row', gap: 12, marginTop: 4 },
    cancelBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: C.inputBg, alignItems: 'center' },
    cancelText: { fontWeight: '600', color: C.textSecondary, fontSize: 16 },
    confirmBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: C.primary, alignItems: 'center' },
    confirmText: { fontWeight: '700', color: C.white, fontSize: 16 },
  });
}
