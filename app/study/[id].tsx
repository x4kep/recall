import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X, CheckCircle2, Lightbulb, Pin, PartyPopper } from 'lucide-react-native';
import { useDeckStore, Card } from '../../store/deckStore';
import { Colors } from '../../constants/colors';
import { applyReview } from '../../lib/sm2';
import { getDb } from '../../lib/db';

type Phase = 'question' | 'answer' | 'rate';

export default function StudyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { decks, getCards } = useDeckStore();
  const deck = decks.find((d) => d.id === id);

  const [queue, setQueue] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [rating, setRating] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<{ card: Card; rating: number }[]>([]);

  useEffect(() => {
    if (!id) return;
    const today = new Date().toISOString().split('T')[0];
    const all = getCards(id);
    const due = all.filter((c) => c.next_review_date <= today);
    setQueue(due.length > 0 ? due : all.slice(0, Math.min(all.length, 10)));
  }, [id]);

  if (!deck || queue.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <X size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.centered}>
          <CheckCircle2 size={64} color={Colors.confidenceHigh} />
          <Text style={styles.emptyTitle}>All caught up!</Text>
          <Text style={styles.emptySub}>No cards due right now.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (done) {
    const avg = results.reduce((s, r) => s + r.rating, 0) / results.length;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.summary}>
          <PartyPopper size={64} color={Colors.primary} />
          <Text style={styles.summaryTitle}>Session Complete!</Text>
          <Text style={styles.summaryDeck}>{deck.name}</Text>
          <View style={styles.summaryStats}>
            <Stat label="Cards reviewed" value={results.length.toString()} />
            <Stat label="Avg confidence" value={avg.toFixed(1)} />
          </View>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const card = queue[index];

  function handleRate(r: number) {
    setRating(r);
    const db = getDb();
    const updated = applyReview({
      interval: card.sm2_interval,
      easeFactor: card.sm2_ease_factor,
      repetitions: card.sm2_repetitions,
      nextReviewDate: card.next_review_date,
    }, r);
    db.runSync(
      `UPDATE cards SET sm2_interval=?, sm2_ease_factor=?, sm2_repetitions=?, next_review_date=?, confidence=?, updated_at=? WHERE id=?`,
      [updated.interval, updated.easeFactor, updated.repetitions, updated.nextReviewDate, r, new Date().toISOString(), card.id]
    );
    setResults((prev) => [...prev, { card, rating: r }]);

    setTimeout(() => {
      if (index + 1 >= queue.length) {
        setDone(true);
      } else {
        setIndex((i) => i + 1);
        setPhase('question');
        setRating(null);
      }
    }, 300);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={22} color={Colors.gray500} />
        </TouchableOpacity>
        <Text style={styles.progress}>{index + 1} / {queue.length}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(index / queue.length) * 100}%` as any }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.cardArea}>
        <View style={styles.flashcard}>
          <Text style={styles.cardLabel}>QUESTION</Text>
          <Text style={styles.cardQuestion}>{card.question}</Text>
        </View>

        {phase === 'answer' && (
          <View style={[styles.flashcard, styles.answerCard]}>
            <Text style={styles.cardLabel}>ANSWER</Text>
            <Text style={styles.cardAnswer}>{card.answer}</Text>

            {card.why_important ? (
              <View style={styles.context}>
                <View style={styles.contextHeader}>
                  <Lightbulb size={13} color={Colors.gray400} />
                  <Text style={styles.contextLabel}>Why it matters</Text>
                </View>
                <Text style={styles.contextText}>{card.why_important}</Text>
              </View>
            ) : null}

            {card.simple_example ? (
              <View style={styles.context}>
                <View style={styles.contextHeader}>
                  <Pin size={13} color={Colors.gray400} />
                  <Text style={styles.contextLabel}>Example</Text>
                </View>
                <Text style={styles.contextText}>{card.simple_example}</Text>
              </View>
            ) : null}
          </View>
        )}

        {phase === 'question' && (
          <TouchableOpacity style={styles.flipBtn} onPress={() => setPhase('answer')}>
            <Text style={styles.flipBtnText}>Show Answer</Text>
          </TouchableOpacity>
        )}

        {phase === 'answer' && !rating && (
          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>How well did you know it?</Text>
            <View style={styles.ratingGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
                <TouchableOpacity key={r} style={[styles.ratingBtn, { backgroundColor: ratingColor(r) }]} onPress={() => handleRate(r)}>
                  <Text style={styles.ratingBtnText}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function ratingColor(r: number): string {
  if (r <= 3) return Colors.confidenceLow;
  if (r <= 6) return Colors.confidenceMid;
  if (r <= 8) return Colors.confidenceHigh;
  return Colors.confidenceMax;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  backBtn: { padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyTitle: { fontSize: 24, fontWeight: '800', color: Colors.black },
  emptySub: { fontSize: 15, color: Colors.gray500 },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  progress: { fontSize: 13, color: Colors.gray500, textAlign: 'right', marginBottom: 6 },
  progressBar: { height: 4, backgroundColor: Colors.gray200, borderRadius: 4 },
  progressFill: { height: 4, backgroundColor: Colors.primary, borderRadius: 4 },
  cardArea: { padding: 20, gap: 16, paddingBottom: 40 },
  flashcard: {
    backgroundColor: Colors.white, borderRadius: 20, padding: 24, gap: 12,
    shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 16, elevation: 4,
  },
  answerCard: { borderLeftWidth: 4, borderLeftColor: Colors.primary },
  cardLabel: { fontSize: 11, fontWeight: '800', color: Colors.gray400, letterSpacing: 1.5 },
  cardQuestion: { fontSize: 22, fontWeight: '700', color: Colors.black, lineHeight: 30 },
  cardAnswer: { fontSize: 18, color: Colors.gray800, lineHeight: 26 },
  context: { gap: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: Colors.gray100 },
  contextHeader: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  contextLabel: { fontSize: 11, fontWeight: '700', color: Colors.gray400, letterSpacing: 0.5 },
  contextText: { fontSize: 14, color: Colors.gray600, lineHeight: 20 },
  flipBtn: { backgroundColor: Colors.primary, padding: 18, borderRadius: 16, alignItems: 'center' },
  flipBtnText: { color: Colors.white, fontSize: 18, fontWeight: '800' },
  ratingSection: { gap: 12 },
  ratingLabel: { fontSize: 15, fontWeight: '600', color: Colors.gray600, textAlign: 'center' },
  ratingGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  ratingBtn: { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  ratingBtnText: { color: Colors.white, fontSize: 18, fontWeight: '800' },
  summary: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 12 },
  summaryTitle: { fontSize: 28, fontWeight: '900', color: Colors.black },
  summaryDeck: { fontSize: 16, color: Colors.gray500 },
  summaryStats: { flexDirection: 'row', gap: 32, marginTop: 16 },
  stat: { alignItems: 'center', gap: 4 },
  statValue: { fontSize: 32, fontWeight: '900', color: Colors.primary },
  statLabel: { fontSize: 13, color: Colors.gray500 },
  doneBtn: { marginTop: 24, backgroundColor: Colors.primary, paddingHorizontal: 40, paddingVertical: 16, borderRadius: 16 },
  doneBtnText: { color: Colors.white, fontSize: 18, fontWeight: '800' },
});
