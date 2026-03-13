import { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, Modal, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDeckStore, Deck } from '../../store/deckStore';
import { Colors } from '../../constants/colors';

export default function DecksScreen() {
  const { decks, createDeck, deleteDeck } = useDeckStore();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleCreate() {
    if (!name.trim()) return;
    createDeck(name.trim(), description.trim());
    setName('');
    setDescription('');
    setShowModal(false);
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Decks</Text>
        <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
          <Text style={styles.fabText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={decks}
        keyExtractor={(d) => d.id}
        contentContainerStyle={decks.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={<EmptyDecks onCreate={() => setShowModal(true)} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/deck/[id]', params: { id: item.id } })}
            onLongPress={() => handleDelete(item)}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.cardName}>{item.name}</Text>
              {item.description ? (
                <Text style={styles.cardDesc} numberOfLines={1}>{item.description}</Text>
              ) : null}
              <Text style={styles.cardMeta}>{item.card_count} cards · Confidence {item.avg_confidence.toFixed(1)}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}
      />

      {/* Create Deck Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>New Deck</Text>

            <TextInput
              style={styles.input}
              placeholder="Deck name *"
              placeholderTextColor={Colors.gray400}
              value={name}
              onChangeText={setName}
              autoFocus
            />
            <TextInput
              style={[styles.input, styles.inputMulti]}
              placeholder="Description (optional)"
              placeholderTextColor={Colors.gray400}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => { setShowModal(false); setName(''); setDescription(''); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.createBtn, !name.trim() && styles.createBtnDisabled]} onPress={handleCreate} disabled={!name.trim()}>
                <Text style={styles.createText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

function EmptyDecks({ onCreate }: { onCreate: () => void }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyEmoji}>📚</Text>
      <Text style={styles.emptyTitle}>No decks yet</Text>
      <Text style={styles.emptySubtext}>Create your first deck to start learning</Text>
      <TouchableOpacity style={styles.emptyBtn} onPress={onCreate}>
        <Text style={styles.emptyBtnText}>Create Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.black },
  fab: { backgroundColor: Colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  fabText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center' },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardLeft: { flex: 1 },
  cardName: { fontSize: 17, fontWeight: '700', color: Colors.black },
  cardDesc: { fontSize: 13, color: Colors.gray500, marginTop: 3 },
  cardMeta: { fontSize: 12, color: Colors.gray400, marginTop: 6 },
  chevron: { fontSize: 24, color: Colors.gray300, marginLeft: 8 },
  empty: { alignItems: 'center', gap: 10, paddingHorizontal: 40 },
  emptyEmoji: { fontSize: 56, marginBottom: 8 },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: Colors.black },
  emptySubtext: { fontSize: 15, color: Colors.gray500, textAlign: 'center' },
  emptyBtn: { marginTop: 16, backgroundColor: Colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14 },
  emptyBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: '#00000055', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 16,
  },
  modalTitle: { fontSize: 22, fontWeight: '800', color: Colors.black },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: Colors.black,
    backgroundColor: Colors.gray100,
  },
  inputMulti: { minHeight: 80, textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cancelBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: Colors.gray100, alignItems: 'center' },
  cancelText: { fontWeight: '600', color: Colors.gray600, fontSize: 16 },
  createBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: Colors.primary, alignItems: 'center' },
  createBtnDisabled: { opacity: 0.4 },
  createText: { fontWeight: '700', color: Colors.white, fontSize: 16 },
});
