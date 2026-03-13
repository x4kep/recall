import { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, Modal, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, Upload, BookOpen, ChevronRight, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useDeckStore, Deck } from '../../store/deckStore';
import { pickAndParseDeck, ImportedDeck } from '../../lib/importDeck';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

export default function DecksScreen() {
  const { decks, createDeck, deleteDeck, importDeck } = useDeckStore();
  const router = useRouter();
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [importPreview, setImportPreview] = useState<ImportedDeck | null>(null);
  const [importing, setImporting] = useState(false);

  function handleCreate() {
    if (!name.trim()) return;
    createDeck(name.trim(), description.trim());
    setName('');
    setDescription('');
    setShowCreate(false);
  }

  function handleDelete(deck: Deck) {
    Alert.alert(
      t('decks.delete_deck_title'),
      t('decks.delete_deck_msg', { name: deck.name }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('common.delete'), style: 'destructive', onPress: () => deleteDeck(deck.id) },
      ]
    );
  }

  async function handleImport() {
    setImporting(true);
    const result = await pickAndParseDeck();
    setImporting(false);
    if (!result.ok) {
      if (result.error !== 'cancelled') Alert.alert(t('decks.import_deck'), result.error);
      return;
    }
    setImportPreview(result.deck);
  }

  function confirmImport() {
    if (!importPreview) return;
    const deck = importDeck(importPreview);
    setImportPreview(null);
    router.push({ pathname: '/deck/[id]', params: { id: deck.id } });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('decks.title')}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.importBtn} onPress={handleImport} disabled={importing}>
            <Upload size={15} color={C.textSecondary} />
            <Text style={styles.importBtnText}>{importing ? t('decks.loading') : t('decks.import')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fab} onPress={() => setShowCreate(true)}>
            <Plus size={16} color={C.white} />
            <Text style={styles.fabText}>{t('decks.new')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={decks}
        keyExtractor={(d) => d.id}
        contentContainerStyle={decks.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={<EmptyDecks onCreate={() => setShowCreate(true)} onImport={handleImport} C={C} styles={styles} t={t} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/deck/[id]', params: { id: item.id } })}
            onLongPress={() => handleDelete(item)}
          >
            <BookOpen size={20} color={C.primary} />
            <View style={styles.cardLeft}>
              <Text style={styles.cardName}>{item.name}</Text>
              {item.description ? (
                <Text style={styles.cardDesc} numberOfLines={1}>{item.description}</Text>
              ) : null}
              <Text style={styles.cardMeta}>{t('common.cards_count', { count: item.card_count })}</Text>
            </View>
            <ChevronRight size={20} color={C.iconMuted} />
          </TouchableOpacity>
        )}
      />

      {/* Create Deck Modal */}
      <Modal visible={showCreate} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>{t('decks.new_deck')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('decks.deck_name_placeholder')}
              placeholderTextColor={C.textMuted}
              value={name}
              onChangeText={setName}
              autoFocus
            />
            <TextInput
              style={[styles.input, styles.inputMulti]}
              placeholder={t('decks.description_placeholder')}
              placeholderTextColor={C.textMuted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => { setShowCreate(false); setName(''); setDescription(''); }}>
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.createBtn, !name.trim() && styles.createBtnDisabled]}
                onPress={handleCreate}
                disabled={!name.trim()}
              >
                <Text style={styles.createText}>{t('decks.create')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Import Preview Modal */}
      <Modal visible={!!importPreview} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, styles.previewSheet]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('decks.import_deck')}</Text>
              <TouchableOpacity onPress={() => setImportPreview(null)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <X size={22} color={C.textSecondary} />
              </TouchableOpacity>
            </View>
            {importPreview && (
              <>
                <View style={styles.previewInfo}>
                  <Text style={styles.previewName}>{importPreview.name}</Text>
                  {importPreview.description ? (
                    <Text style={styles.previewDesc}>{importPreview.description}</Text>
                  ) : null}
                  <View style={styles.previewBadge}>
                    <Text style={styles.previewBadgeText}>{t('common.cards_count', { count: importPreview.cards.length })}</Text>
                  </View>
                </View>
                <Text style={styles.previewSectionLabel}>{t('decks.preview_label')}</Text>
                <ScrollView style={styles.previewScroll} showsVerticalScrollIndicator={false}>
                  {importPreview.cards.slice(0, 3).map((c, i) => (
                    <View key={i} style={styles.previewCard}>
                      <Text style={styles.previewQ} numberOfLines={2}>{t('decks.preview_q')} {c.question}</Text>
                      <Text style={styles.previewA} numberOfLines={2}>{t('decks.preview_a')} {c.answer}</Text>
                    </View>
                  ))}
                  {importPreview.cards.length > 3 && (
                    <Text style={styles.previewMore}>{t('decks.more_cards', { count: importPreview.cards.length - 3 })}</Text>
                  )}
                </ScrollView>
              </>
            )}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setImportPreview(null)}>
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createBtn} onPress={confirmImport}>
                <Text style={styles.createText}>{t('decks.import')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function EmptyDecks({ onCreate, onImport, C, styles, t }: {
  onCreate: () => void;
  onImport: () => void;
  C: ThemeColors;
  styles: ReturnType<typeof makeStyles>;
  t: (key: string) => string;
}) {
  return (
    <View style={styles.empty}>
      <BookOpen size={56} color={C.iconMuted} />
      <Text style={styles.emptyTitle}>{t('decks.no_decks')}</Text>
      <Text style={styles.emptySubtext}>{t('decks.no_decks_sub')}</Text>
      <TouchableOpacity style={styles.emptyBtn} onPress={onCreate}>
        <Plus size={18} color={C.white} />
        <Text style={styles.emptyBtnText}>{t('decks.create_deck')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.emptyImportBtn} onPress={onImport}>
        <Upload size={15} color={C.primary} />
        <Text style={styles.emptyImportText}>{t('decks.import_json')}</Text>
      </TouchableOpacity>
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
    title: { fontSize: 28, fontWeight: '800', color: C.text },
    headerActions: { flexDirection: 'row', gap: 8 },
    importBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.surface, borderWidth: 1.5, borderColor: C.separator, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    importBtnText: { color: C.textSecondary, fontWeight: '600', fontSize: 14 },
    fab: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
    fabText: { color: C.white, fontWeight: '700', fontSize: 15 },
    listContent: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
    emptyContainer: { flex: 1, justifyContent: 'center' },
    card: {
      backgroundColor: C.surface, borderRadius: 16, padding: 16,
      flexDirection: 'row', alignItems: 'center', gap: 12,
      shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2,
    },
    cardLeft: { flex: 1 },
    cardName: { fontSize: 17, fontWeight: '700', color: C.text },
    cardDesc: { fontSize: 13, color: C.textSecondary, marginTop: 3 },
    cardMeta: { fontSize: 12, color: C.textMuted, marginTop: 6 },
    empty: { alignItems: 'center', gap: 12, paddingHorizontal: 40 },
    emptyTitle: { fontSize: 22, fontWeight: '700', color: C.text },
    emptySubtext: { fontSize: 15, color: C.textSecondary, textAlign: 'center' },
    emptyBtn: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14 },
    emptyBtnText: { color: C.white, fontWeight: '700', fontSize: 16 },
    emptyImportBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 24, paddingVertical: 10 },
    emptyImportText: { color: C.primary, fontWeight: '600', fontSize: 15 },
    modalOverlay: { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
    modalSheet: { backgroundColor: C.surfaceElevated, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 16 },
    previewSheet: { maxHeight: '80%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    modalTitle: { fontSize: 22, fontWeight: '800', color: C.text },
    input: { borderWidth: 1.5, borderColor: C.inputBorder, borderRadius: 12, padding: 14, fontSize: 16, color: C.text, backgroundColor: C.inputBg },
    inputMulti: { minHeight: 80, textAlignVertical: 'top' },
    modalActions: { flexDirection: 'row', gap: 12, marginTop: 4 },
    cancelBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: C.inputBg, alignItems: 'center' },
    cancelText: { fontWeight: '600', color: C.textSecondary, fontSize: 16 },
    createBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: C.primary, alignItems: 'center' },
    createBtnDisabled: { opacity: 0.4 },
    createText: { fontWeight: '700', color: C.white, fontSize: 16 },
    previewInfo: { backgroundColor: C.primaryLight, borderRadius: 14, padding: 16, gap: 6 },
    previewName: { fontSize: 18, fontWeight: '800', color: C.text },
    previewDesc: { fontSize: 14, color: C.textSecondary },
    previewBadge: { alignSelf: 'flex-start', backgroundColor: C.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 4 },
    previewBadgeText: { color: C.white, fontWeight: '700', fontSize: 13 },
    previewSectionLabel: { fontSize: 11, fontWeight: '700', color: C.textMuted, letterSpacing: 1.5 },
    previewScroll: { maxHeight: 200 },
    previewCard: { backgroundColor: C.inputBg, borderRadius: 12, padding: 12, gap: 6, marginBottom: 8 },
    previewQ: { fontSize: 14, fontWeight: '600', color: C.text },
    previewA: { fontSize: 13, color: C.textSecondary },
    previewMore: { fontSize: 13, color: C.textMuted, textAlign: 'center', paddingVertical: 8 },
  });
}
