import { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, Modal, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, Upload, BookOpen, ChevronRight } from 'lucide-react-native';
import { useDeckStore, Deck } from '../../store/deckStore';
import { pickAndParseDeck, ImportedDeck } from '../../lib/importDeck';
import { Colors } from '../../constants/colors';

export default function DecksScreen() {
  const { decks, createDeck, deleteDeck, importDeck } = useDeckStore();
  const router = useRouter();

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
      'Delete Deck',
      `Delete "${deck.name}" and all its cards?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteDeck(deck.id) },
      ]
    );
  }

  async function handleImport() {
    setImporting(true);
    const result = await pickAndParseDeck();
    setImporting(false);
    if (!result.ok) {
      if (result.error !== 'cancelled') Alert.alert('Import failed', result.error);
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
        <Text style={styles.title}>Decks</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.importBtn} onPress={handleImport} disabled={importing}>
            <Upload size={15} color={Colors.gray700} />
            <Text style={styles.importBtnText}>{importing ? 'Loading…' : 'Import'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fab} onPress={() => setShowCreate(true)}>
            <Plus size={16} color={Colors.white} />
            <Text style={styles.fabText}>New</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={decks}
        keyExtractor={(d) => d.id}
        contentContainerStyle={decks.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={<EmptyDecks onCreate={() => setShowCreate(true)} onImport={handleImport} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/deck/[id]', params: { id: item.id } })}
            onLongPress={() => handleDelete(item)}
          >
            <BookOpen size={20} color={Colors.primary} />
            <View style={styles.cardLeft}>
              <Text style={styles.cardName}>{item.name}</Text>
              {item.description ? (
                <Text style={styles.cardDesc} numberOfLines={1}>{item.description}</Text>
              ) : null}
              <Text style={styles.cardMeta}>{item.card_count} cards</Text>
            </View>
            <ChevronRight size={20} color={Colors.gray300} />
          </TouchableOpacity>
        )}
      />

      {/* Create Deck Modal */}
      <Modal visible={showCreate} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>New Deck</Text>
            <TextInput style={styles.input} placeholder="Deck name *" placeholderTextColor={Colors.gray400}
              value={name} onChangeText={setName} autoFocus />
            <TextInput style={[styles.input, styles.inputMulti]} placeholder="Description (optional)"
              placeholderTextColor={Colors.gray400} value={description} onChangeText={setDescription}
              multiline numberOfLines={3} />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => { setShowCreate(false); setName(''); setDescription(''); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.createBtn, !name.trim() && styles.createBtnDisabled]}
                onPress={handleCreate} disabled={!name.trim()}>
                <Text style={styles.createText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Import Preview Modal */}
      <Modal visible={!!importPreview} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, styles.previewSheet]}>
            <Text style={styles.modalTitle}>Import Deck</Text>
            {importPreview && (
              <>
                <View style={styles.previewInfo}>
                  <Text style={styles.previewName}>{importPreview.name}</Text>
                  {importPreview.description ? (
                    <Text style={styles.previewDesc}>{importPreview.description}</Text>
                  ) : null}
                  <View style={styles.previewBadge}>
                    <Text style={styles.previewBadgeText}>{importPreview.cards.length} cards</Text>
                  </View>
                </View>
                <Text style={styles.previewSectionLabel}>PREVIEW (FIRST 3 CARDS)</Text>
                <ScrollView style={styles.previewScroll} showsVerticalScrollIndicator={false}>
                  {importPreview.cards.slice(0, 3).map((c, i) => (
                    <View key={i} style={styles.previewCard}>
                      <Text style={styles.previewQ} numberOfLines={2}>Q: {c.question}</Text>
                      <Text style={styles.previewA} numberOfLines={2}>A: {c.answer}</Text>
                    </View>
                  ))}
                  {importPreview.cards.length > 3 && (
                    <Text style={styles.previewMore}>+ {importPreview.cards.length - 3} more cards</Text>
                  )}
                </ScrollView>
              </>
            )}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setImportPreview(null)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createBtn} onPress={confirmImport}>
                <Text style={styles.createText}>Import</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function EmptyDecks({ onCreate, onImport }: { onCreate: () => void; onImport: () => void }) {
  return (
    <View style={styles.empty}>
      <BookOpen size={56} color={Colors.gray300} />
      <Text style={styles.emptyTitle}>No decks yet</Text>
      <Text style={styles.emptySubtext}>Create a deck manually or import a JSON file</Text>
      <TouchableOpacity style={styles.emptyBtn} onPress={onCreate}>
        <Plus size={18} color={Colors.white} />
        <Text style={styles.emptyBtnText}>Create Deck</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.emptyImportBtn} onPress={onImport}>
        <Upload size={15} color={Colors.primary} />
        <Text style={styles.emptyImportText}>Import from JSON</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.black },
  headerActions: { flexDirection: 'row', gap: 8 },
  importBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.gray100, borderWidth: 1.5, borderColor: Colors.gray200, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  importBtnText: { color: Colors.gray700, fontWeight: '600', fontSize: 14 },
  fab: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  fabText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center' },
  card: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2,
  },
  cardLeft: { flex: 1 },
  cardName: { fontSize: 17, fontWeight: '700', color: Colors.black },
  cardDesc: { fontSize: 13, color: Colors.gray500, marginTop: 3 },
  cardMeta: { fontSize: 12, color: Colors.gray400, marginTop: 6 },
  empty: { alignItems: 'center', gap: 12, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: Colors.black },
  emptySubtext: { fontSize: 15, color: Colors.gray500, textAlign: 'center' },
  emptyBtn: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14 },
  emptyBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  emptyImportBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 24, paddingVertical: 10 },
  emptyImportText: { color: Colors.primary, fontWeight: '600', fontSize: 15 },
  modalOverlay: { flex: 1, backgroundColor: '#00000055', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: Colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 16 },
  previewSheet: { maxHeight: '80%' },
  modalTitle: { fontSize: 22, fontWeight: '800', color: Colors.black },
  input: { borderWidth: 1.5, borderColor: Colors.gray200, borderRadius: 12, padding: 14, fontSize: 16, color: Colors.black, backgroundColor: Colors.gray100 },
  inputMulti: { minHeight: 80, textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cancelBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: Colors.gray100, alignItems: 'center' },
  cancelText: { fontWeight: '600', color: Colors.gray600, fontSize: 16 },
  createBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: Colors.primary, alignItems: 'center' },
  createBtnDisabled: { opacity: 0.4 },
  createText: { fontWeight: '700', color: Colors.white, fontSize: 16 },
  previewInfo: { backgroundColor: Colors.primaryLight, borderRadius: 14, padding: 16, gap: 6 },
  previewName: { fontSize: 18, fontWeight: '800', color: Colors.black },
  previewDesc: { fontSize: 14, color: Colors.gray600 },
  previewBadge: { alignSelf: 'flex-start', backgroundColor: Colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 4 },
  previewBadgeText: { color: Colors.white, fontWeight: '700', fontSize: 13 },
  previewSectionLabel: { fontSize: 11, fontWeight: '700', color: Colors.gray400, letterSpacing: 1.5 },
  previewScroll: { maxHeight: 200 },
  previewCard: { backgroundColor: Colors.gray100, borderRadius: 12, padding: 12, gap: 6, marginBottom: 8 },
  previewQ: { fontSize: 14, fontWeight: '600', color: Colors.black },
  previewA: { fontSize: 13, color: Colors.gray600 },
  previewMore: { fontSize: 13, color: Colors.gray400, textAlign: 'center', paddingVertical: 8 },
});
