import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BookOpen, ArrowRight, Inbox } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useDeckStore } from '../../store/deckStore';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

export default function HomeScreen() {
  const { decks, getDueCount } = useDeckStore();
  const dueCount = getDueCount();
  const router = useRouter();
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.greeting}>{t('home.greeting')}</Text>
          <Text style={styles.appName}>{t('home.app_name')}</Text>
        </View>

        <TouchableOpacity style={styles.dueBanner} activeOpacity={0.8}>
          <View>
            <Text style={styles.dueCount}>{dueCount}</Text>
            <Text style={styles.dueLabel}>{t('home.cards_due')}</Text>
          </View>
          <View style={styles.studyButton}>
            <Text style={styles.studyButtonText}>{t('home.study_all')}</Text>
            <ArrowRight size={16} color={C.white} />
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.your_decks')}</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/decks')}>
              <Text style={styles.seeAll}>{t('home.see_all')}</Text>
            </TouchableOpacity>
          </View>

          {decks.length === 0 ? (
            <View style={styles.emptyState}>
              <Inbox size={48} color={C.iconMuted} />
              <Text style={styles.emptyText}>{t('home.no_decks')}</Text>
              <Text style={styles.emptySubtext}>{t('home.no_decks_sub')}</Text>
            </View>
          ) : (
            decks.slice(0, 4).map((deck) => (
              <TouchableOpacity
                key={deck.id}
                style={styles.deckCard}
                activeOpacity={0.7}
                onPress={() => router.push({ pathname: '/deck/[id]', params: { id: deck.id } })}
              >
                <BookOpen size={20} color={C.primary} style={styles.deckIcon} />
                <View style={styles.deckInfo}>
                  <Text style={styles.deckName}>{deck.name}</Text>
                  <Text style={styles.deckMeta}>{t('common.cards_count', { count: deck.card_count })}</Text>
                </View>
                <ConfidenceBadge value={deck.avg_confidence} C={C} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ConfidenceBadge({ value, C }: { value: number; C: ThemeColors }) {
  const color =
    value >= 9 ? C.confidenceMax :
    value >= 7 ? C.confidenceHigh :
    value >= 4 ? C.confidenceMid :
    C.confidenceLow;

  return (
    <View style={{ borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: color + '22', borderColor: color }}>
      <Text style={{ fontSize: 14, fontWeight: '700', color }}>{value.toFixed(1)}</Text>
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    scroll: { padding: 20, paddingBottom: 40 },
    header: { marginBottom: 24 },
    greeting: { fontSize: 15, color: C.textSecondary },
    appName: { fontSize: 32, fontWeight: '800', color: C.text, marginTop: 2 },
    dueBanner: {
      backgroundColor: C.primary,
      borderRadius: 20,
      padding: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 32,
    },
    dueCount: { fontSize: 48, fontWeight: '900', color: C.white },
    dueLabel: { fontSize: 14, color: C.white + 'CC', marginTop: 2 },
    studyButton: {
      backgroundColor: C.white + '22',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    studyButtonText: { color: C.white, fontWeight: '700', fontSize: 14 },
    section: { gap: 12 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: C.text },
    seeAll: { fontSize: 14, color: C.primary, fontWeight: '600' },
    deckCard: {
      backgroundColor: C.surface,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 2,
    },
    deckIcon: { flexShrink: 0 },
    deckInfo: { flex: 1 },
    deckName: { fontSize: 16, fontWeight: '600', color: C.text },
    deckMeta: { fontSize: 13, color: C.textSecondary, marginTop: 4 },
    emptyState: { alignItems: 'center', paddingVertical: 40, gap: 12 },
    emptyText: { fontSize: 18, fontWeight: '600', color: C.textSecondary },
    emptySubtext: { fontSize: 14, color: C.textMuted, textAlign: 'center' },
  });
}
