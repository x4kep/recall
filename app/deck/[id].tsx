import { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CreditCard } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useDeckStore, Card } from '../../store/deckStore';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import Toast, { ToastType } from '../../components/Toast';
import DeckHeader from '../../components/deck/DeckHeader';
import DeckInfo from '../../components/deck/DeckInfo';
import CardItem from '../../components/deck/CardItem';
import AddCardModal from '../../components/deck/AddCardModal';
import DeleteDeckModal from '../../components/deck/DeleteDeckModal';
import SessionSetupModal, { SessionLimit } from '../../components/study/SessionSetupModal';

export default function DeckScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const { decks, getCards, createCard, deleteCard, toggleFavorite, deleteDeck } = useDeckStore();
  const deck = decks.find((d) => d.id === id);

  const [cards, setCards] = useState<Card[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSessionSetup, setShowSessionSetup] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
    message: '', type: 'success', visible: false,
  });

  useEffect(() => {
    if (id) setCards(getCards(id));
  }, [id, deck?.card_count]);

  if (!deck) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>{t('deck.not_found')}</Text>
      </SafeAreaView>
    );
  }

  function handleAddCard(form: { question: string; answer: string; whyImportant: string; simpleExample: string; difficulty: 'easy' | 'medium' | 'hard' }) {
    createCard(deck!.id, {
      question: form.question.trim(),
      answer: form.answer.trim(),
      why_important: form.whyImportant.trim(),
      simple_example: form.simpleExample.trim(),
      use_cases: [],
      difficulty: form.difficulty,
    });
    setCards(getCards(deck!.id));
    setShowAddModal(false);
  }

  function handleDeleteCard(card: Card) {
    Alert.alert(t('deck.delete_card_title'), t('deck.delete_card_msg'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'), style: 'destructive',
        onPress: () => {
          deleteCard(card.id, deck!.id);
          setCards((prev) => prev.filter((c) => c.id !== card.id));
        },
      },
    ]);
  }

  function handleToggleFavorite(card: Card) {
    toggleFavorite(card.id);
    setCards((prev) => prev.map((c) => c.id === card.id ? { ...c, favorite: !c.favorite } : c));
  }

  function handleDeleteDeck() {
    try {
      deleteDeck(deck!.id);
      setShowDeleteModal(false);
      setToast({ message: t('deck.deleted_success', { name: deck!.name }), type: 'success', visible: true });
      setTimeout(() => router.back(), 1200);
    } catch {
      setShowDeleteModal(false);
      setToast({ message: t('deck.deleted_error'), type: 'error', visible: true });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <DeckHeader
        onBack={() => router.back()}
        onDelete={() => setShowDeleteModal(true)}
        onAddCard={() => setShowAddModal(true)}
      />

      <DeckInfo
        deck={deck}
        hasCards={cards.length > 0}
        onStudy={() => setShowSessionSetup(true)}
      />

      <FlatList
        data={cards}
        keyExtractor={(c) => c.id}
        contentContainerStyle={cards.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <CreditCard size={48} color={C.iconMuted} />
            <Text style={styles.emptyText}>{t('deck.no_cards')}</Text>
            <Text style={styles.emptySubtext}>{t('deck.no_cards_sub')}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CardItem
            card={item}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteCard}
          />
        )}
      />

      <AddCardModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCard}
      />

      <DeleteDeckModal
        visible={showDeleteModal}
        deckName={deck.name}
        cardCount={deck.card_count}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteDeck}
      />

      <SessionSetupModal
        visible={showSessionSetup}
        deckName={deck.name}
        cardCount={cards.length}
        onClose={() => setShowSessionSetup(false)}
        onStart={(limit: SessionLimit) => {
          setShowSessionSetup(false);
          router.push({ pathname: '/study/[id]', params: { id: deck.id, limit: String(limit) } });
        }}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </SafeAreaView>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    notFound: { textAlign: 'center', marginTop: 40, color: C.textSecondary, fontSize: 16 },
    listContent: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
    emptyContainer: { flex: 1, justifyContent: 'center' },
    empty: { alignItems: 'center', gap: 10, padding: 40 },
    emptyText: { fontSize: 18, fontWeight: '600', color: C.textSecondary },
    emptySubtext: { fontSize: 14, color: C.textMuted, textAlign: 'center' },
  });
}
