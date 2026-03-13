import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDeckStore } from '../../store/deckStore';
import { Colors } from '../../constants/colors';

export default function HomeScreen() {
  const { decks, getDueCount } = useDeckStore();
  const dueCount = getDueCount();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.appName}>Recall</Text>
        </View>

        {/* Due cards banner */}
        <TouchableOpacity style={styles.dueBanner} activeOpacity={0.8}>
          <View>
            <Text style={styles.dueCount}>{dueCount}</Text>
            <Text style={styles.dueLabel}>cards due today</Text>
          </View>
          <View style={styles.studyButton}>
            <Text style={styles.studyButtonText}>Study All →</Text>
          </View>
        </TouchableOpacity>

        {/* Decks section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Decks</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/decks')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {decks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📭</Text>
              <Text style={styles.emptyText}>No decks yet</Text>
              <Text style={styles.emptySubtext}>Go to Decks to create your first deck</Text>
            </View>
          ) : (
            decks.slice(0, 4).map((deck) => (
              <TouchableOpacity
                key={deck.id}
                style={styles.deckCard}
                activeOpacity={0.7}
                onPress={() => router.push({ pathname: '/deck/[id]', params: { id: deck.id } })}
              >
                <View style={styles.deckInfo}>
                  <Text style={styles.deckName}>{deck.name}</Text>
                  <Text style={styles.deckMeta}>{deck.card_count} cards</Text>
                </View>
                <ConfidenceBadge value={deck.avg_confidence} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ConfidenceBadge({ value }: { value: number }) {
  const color =
    value >= 9 ? Colors.confidenceMax :
    value >= 7 ? Colors.confidenceHigh :
    value >= 4 ? Colors.confidenceMid :
    Colors.confidenceLow;

  return (
    <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{value.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 15, color: Colors.gray500 },
  appName: { fontSize: 32, fontWeight: '800', color: Colors.black, marginTop: 2 },
  dueBanner: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  dueCount: { fontSize: 48, fontWeight: '900', color: Colors.white },
  dueLabel: { fontSize: 14, color: Colors.white + 'CC', marginTop: 2 },
  studyButton: {
    backgroundColor: Colors.white + '22',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  studyButtonText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
  section: { gap: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: Colors.black },
  seeAll: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
  deckCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  deckInfo: { flex: 1 },
  deckName: { fontSize: 16, fontWeight: '600', color: Colors.black },
  deckMeta: { fontSize: 13, color: Colors.gray500, marginTop: 4 },
  badge: {
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 14, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyEmoji: { fontSize: 40 },
  emptyText: { fontSize: 18, fontWeight: '600', color: Colors.gray700 },
  emptySubtext: { fontSize: 14, color: Colors.gray400, textAlign: 'center' },
});
