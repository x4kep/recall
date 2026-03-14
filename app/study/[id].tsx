import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDeckStore, Card } from '../../store/deckStore';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import { applyReview } from '../../lib/sm2';
import { getDb } from '../../lib/db';
import StudyHeader from '../../components/study/StudyHeader';
import FlashCard from '../../components/study/FlashCard';
import AnswerCard from '../../components/study/AnswerCard';
import RatingGrid from '../../components/study/RatingGrid';
import SessionSummary from '../../components/study/SessionSummary';
import AllCaughtUp from '../../components/study/AllCaughtUp';

type Phase = 'question' | 'answer';

export default function StudyScreen() {
  const { id, limit } = useLocalSearchParams<{ id: string; limit?: string }>();
  const sessionLimit = limit ? parseInt(limit, 10) : 0;
  const router = useRouter();
  const C = useTheme();
  const styles = makeStyles(C);
  const { decks, getCards, refreshDeckStats } = useDeckStore();
  const deck = decks.find((d) => d.id === id);

  const [queue, setQueue] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [rated, setRated] = useState(false);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<{ card: Card; rating: number }[]>([]);

  useEffect(() => {
    if (!id) return;
    const today = new Date().toISOString().split('T')[0];
    const all = getCards(id);

    // Priority sort: low confidence first, then low ease factor, then most overdue
    function priorityScore(c: Card): number {
      const confidencePriority = c.confidence === 0 ? 0 : c.confidence; // 0 = never rated, treat as urgent
      return confidencePriority * 1000 + c.sm2_ease_factor * 100 + (c.next_review_date <= today ? 0 : 1000000);
    }

    const due = all.filter((c) => c.next_review_date <= today);
    const notDue = all.filter((c) => c.next_review_date > today);
    const sorted = [
      ...due.sort((a, b) => priorityScore(a) - priorityScore(b)),
      ...notDue.sort((a, b) => priorityScore(a) - priorityScore(b)),
    ];

    const count = sessionLimit > 0 ? sessionLimit : sorted.length;
    setQueue(sorted.slice(0, count));
  }, [id, sessionLimit]);

  if (!deck || queue.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <AllCaughtUp onClose={() => router.back()} />
      </SafeAreaView>
    );
  }

  if (done) {
    const avg = results.reduce((s, r) => s + r.rating, 0) / results.length;
    return (
      <SafeAreaView style={styles.container}>
        <SessionSummary
          deckName={deck.name}
          cardCount={results.length}
          avgRating={avg}
          onDone={() => router.back()}
        />
      </SafeAreaView>
    );
  }

  const card = queue[index];

  function handleRate(r: number) {
    setRated(true);
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
        const today = new Date().toISOString().split('T')[0];
        const allResults = [...results, { card, rating: r }];
        const avgRating = allResults.reduce((s, rv) => s + rv.rating, 0) / allResults.length;
        const existing = db.getFirstSync(
          'SELECT id, cards_reviewed, avg_rating FROM study_log WHERE date=?',
          [today]
        ) as { id: string; cards_reviewed: number; avg_rating: number } | null;
        if (existing) {
          const newCount = existing.cards_reviewed + allResults.length;
          const newAvg =
            (existing.avg_rating * existing.cards_reviewed + avgRating * allResults.length) /
            newCount;
          db.runSync('UPDATE study_log SET cards_reviewed=?, avg_rating=? WHERE date=?', [
            newCount,
            newAvg,
            today,
          ]);
        } else {
          db.runSync(
            'INSERT INTO study_log (id, date, cards_reviewed, avg_rating) VALUES (?, ?, ?, ?)',
            [Math.random().toString(36).slice(2), today, allResults.length, avgRating]
          );
        }
        refreshDeckStats(id);
        setDone(true);
      } else {
        setIndex((i) => i + 1);
        setPhase('question');
        setRated(false);
      }
    }, 300);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StudyHeader
        current={index}
        total={queue.length}
        onClose={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.cardArea}>
        <FlashCard
          key={card.id}
          question={card.question}
          onShowAnswer={() => setPhase('answer')}
        />

        {phase === 'answer' && <AnswerCard card={card} />}

        {phase === 'answer' && !rated && (
          <RatingGrid onRate={handleRate} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    cardArea: { padding: 20, gap: 16, paddingBottom: 40 },
  });
}
