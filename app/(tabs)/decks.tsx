import { useState } from 'react';
import { FlatList, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useDeckStore, Deck } from '../../store/deckStore';
import { pickAndParseDeck, ImportedDeck } from '../../lib/importDeck';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import DecksHeader from '../../components/decks/DecksHeader';
import DeckListItem from '../../components/decks/DeckListItem';
import EmptyDecks from '../../components/decks/EmptyDecks';
import CreateDeckModal from '../../components/decks/CreateDeckModal';
import ImportPreviewModal from '../../components/decks/ImportPreviewModal';
import SideDrawer from '../../components/ui/SideDrawer';
import DrawerContent from '../../components/settings/SettingsContent';

export default function DecksScreen() {
  const { decks, createDeck, deleteDeck, importDeck } = useDeckStore();
  const router = useRouter();
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const [showCreate, setShowCreate] = useState(false);
  const [importPreview, setImportPreview] = useState<ImportedDeck | null>(null);
  const [importing, setImporting] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <DecksHeader
        importing={importing}
        onImport={handleImport}
        onNew={() => setShowCreate(true)}
        onMenuPress={() => setDrawerOpen(true)}
      />

      <FlatList
        data={decks}
        keyExtractor={(d) => d.id}
        contentContainerStyle={decks.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={
          <EmptyDecks onNew={() => setShowCreate(true)} onImport={handleImport} />
        }
        renderItem={({ item }) => (
          <DeckListItem
            deck={item}
            onPress={() => router.push({ pathname: '/deck/[id]', params: { id: item.id } })}
            onLongPress={() => handleDelete(item)}
          />
        )}
      />

      <CreateDeckModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={(name, description) => {
          createDeck(name, description);
          setShowCreate(false);
        }}
      />

      <ImportPreviewModal
        deck={importPreview}
        onClose={() => setImportPreview(null)}
        onConfirm={confirmImport}
      />

      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerContent onClose={() => setDrawerOpen(false)} />
      </SideDrawer>
    </SafeAreaView>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    listContent: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
    emptyContainer: { flex: 1, justifyContent: 'center' },
  });
}
