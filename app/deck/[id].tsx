import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, Modal, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDeckStore, Card } from '../../store/deckStore';
import { Colors } from '../../constants/colors';

const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
const DIFFICULTY_COLORS: Record<string, string> = {
  easy: Colors.easy,
  medium: Colors.medium,
  hard: Colors.hard,
};

export default function DeckScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { decks, getCards, createCard, deleteCard, toggleFavorite } = useDeckStore();
  const deck = decks.find((d) => d.id === id);
  const [cards, setCards] = useState<Card[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Card form state
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [whyImportant, setWhyImportant] = useState('');
  const [simpleExample, setSimpleExample] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  useEffect(() => {
    if (id) setCards(getCards(id));
  }, [id, deck?.card_count]);

  if (!deck) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Deck not found</Text>
      </SafeAreaView>
    );
  }

  function handleCreate() {
    if (!question.trim() || !answer.trim()) return;
    createCard(deck!.id, {
      question: question.trim(),
      answer: answer.trim(),
      why_important: whyImportant.trim(),
      simple_example: simpleExample.trim(),
      use_cases: [],
      difficulty,
    });
    setCards(getCards(deck!.id));
    resetForm();
    setShowModal(false);
  }

  function resetForm() {
    setQuestion('');
    setAnswer('');
    setWhyImportant('');
    setSimpleExample('');
    setDifficulty('medium');
  }

  function handleDeleteCard(card: Card) {
    Alert.alert('Delete Card', 'Delete this card?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => {
          deleteCard(card.id, deck!.id);
          setCards((prev) => prev.filter((c) => c.id !== card.id));
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowModal(true)}>
          <Text style={styles.addBtnText}>+ Card</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.deckHeader}>
        <Text style={styles.deckName}>{deck.name}</Text>
        {deck.description ? <Text style={styles.deckDesc}>{deck.description}</Text> : null}
        <Text style={styles.deckMeta}>{deck.card_count} cards</Text>
      </View>

      {/* Study button */}
      {cards.length > 0 && (
        <TouchableOpacity
          style={styles.studyBtn}
          onPress={() => router.push({ pathname: '/study/[id]', params: { id: deck.id } })}
        >
          <Text style={styles.studyBtnText}>Study Now →</Text>
        </TouchableOpacity>
      )}

      {/* Cards list */}
      <FlatList
        data={cards}
        keyExtractor={(c) => c.id}
        contentContainerStyle={cards.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🃏</Text>
            <Text style={styles.emptyText}>No cards yet</Text>
            <Text style={styles.emptySubtext}>Tap + Card to add your first card</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardItem}>
            <View style={styles.cardTop}>
              <View style={[styles.diffBadge, { backgroundColor: DIFFICULTY_COLORS[item.difficulty] + '22' }]}>
                <Text style={[styles.diffText, { color: DIFFICULTY_COLORS[item.difficulty] }]}>
                  {item.difficulty}
                </Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => {
                  toggleFavorite(item.id);
                  setCards((prev) => prev.map((c) => c.id === item.id ? { ...c, favorite: !c.favorite } : c));
                }}>
                  <Text style={styles.heart}>{item.favorite ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteCard(item)}>
                  <Text style={styles.deleteIcon}>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
            {item.why_important ? (
              <Text style={styles.context}>💡 {item.why_important}</Text>
            ) : null}
          </View>
        )}
      />

      {/* Add Card Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>New Card</Text>

            <TextInput style={styles.input} placeholder="Question *" placeholderTextColor={Colors.gray400}
              value={question} onChangeText={setQuestion} autoFocus />
            <TextInput style={[styles.input, styles.inputMulti]} placeholder="Answer *" placeholderTextColor={Colors.gray400}
              value={answer} onChangeText={setAnswer} multiline numberOfLines={3} />
            <TextInput style={styles.input} placeholder="Why it matters (optional)" placeholderTextColor={Colors.gray400}
              value={whyImportant} onChangeText={setWhyImportant} />
            <TextInput style={styles.input} placeholder="Simple example (optional)" placeholderTextColor={Colors.gray400}
              value={simpleExample} onChangeText={setSimpleExample} />

            {/* Difficulty picker */}
            <View style={styles.diffRow}>
              {DIFFICULTIES.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[styles.diffOption, difficulty === d && { backgroundColor: DIFFICULTY_COLORS[d], borderColor: DIFFICULTY_COLORS[d] }]}
                  onPress={() => setDifficulty(d)}
                >
                  <Text style={[styles.diffOptionText, difficulty === d && { color: Colors.white }]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => { setShowModal(false); resetForm(); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.createBtn, (!question.trim() || !answer.trim()) && styles.createBtnDisabled]}
                onPress={handleCreate}
                disabled={!question.trim() || !answer.trim()}
              >
                <Text style={styles.createText}>Add Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notFound: { textAlign: 'center', marginTop: 40, color: Colors.gray500, fontSize: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12 },
  backBtn: { padding: 4 },
  backText: { fontSize: 18, color: Colors.primary, fontWeight: '600' },
  addBtn: { backgroundColor: Colors.primary, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10 },
  addBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
  deckHeader: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  deckName: { fontSize: 26, fontWeight: '800', color: Colors.black },
  deckDesc: { fontSize: 14, color: Colors.gray500, marginTop: 4 },
  deckMeta: { fontSize: 13, color: Colors.gray400, marginTop: 6 },
  studyBtn: { marginHorizontal: 20, marginVertical: 12, backgroundColor: Colors.primary, padding: 14, borderRadius: 14, alignItems: 'center' },
  studyBtnText: { color: Colors.white, fontWeight: '800', fontSize: 16 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center' },
  empty: { alignItems: 'center', gap: 8, padding: 40 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { fontSize: 18, fontWeight: '600', color: Colors.gray700 },
  emptySubtext: { fontSize: 14, color: Colors.gray400, textAlign: 'center' },
  cardItem: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  diffBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  diffText: { fontSize: 12, fontWeight: '700', textTransform: 'capitalize' },
  cardActions: { flexDirection: 'row', gap: 12 },
  heart: { fontSize: 18 },
  deleteIcon: { fontSize: 16 },
  question: { fontSize: 16, fontWeight: '700', color: Colors.black },
  answer: { fontSize: 15, color: Colors.gray700 },
  context: { fontSize: 13, color: Colors.gray500, fontStyle: 'italic' },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: '#00000055', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: Colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 12 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: Colors.black },
  input: { borderWidth: 1.5, borderColor: Colors.gray200, borderRadius: 12, padding: 14, fontSize: 15, color: Colors.black, backgroundColor: Colors.gray100 },
  inputMulti: { minHeight: 80, textAlignVertical: 'top' },
  diffRow: { flexDirection: 'row', gap: 8 },
  diffOption: { flex: 1, padding: 10, borderRadius: 10, borderWidth: 1.5, borderColor: Colors.gray200, alignItems: 'center', backgroundColor: Colors.gray100 },
  diffOptionText: { fontSize: 14, fontWeight: '600', color: Colors.gray600, textTransform: 'capitalize' },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cancelBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: Colors.gray100, alignItems: 'center' },
  cancelText: { fontWeight: '600', color: Colors.gray600, fontSize: 16 },
  createBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: Colors.primary, alignItems: 'center' },
  createBtnDisabled: { opacity: 0.4 },
  createText: { fontWeight: '700', color: Colors.white, fontSize: 16 },
});
