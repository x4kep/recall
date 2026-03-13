import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X, CheckCircle2, Lightbulb, ChevronDown, ChevronUp, Code, PartyPopper, Zap } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useDeckStore, Card } from '../../store/deckStore';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import { applyReview } from '../../lib/sm2';
import { getDb } from '../../lib/db';

type Phase = 'question' | 'answer' | 'rate';

function isCode(text: string): boolean {
  return /[{};=()<>]/.test(text) && (
    text.includes('=>') ||
    text.includes('function') ||
    text.includes('const ') ||
    text.includes('return ') ||
    text.includes('import ') ||
    text.includes('class ') ||
    text.startsWith('<') ||
    (text.includes('(') && text.includes(')') && text.includes('{'))
  );
}

export default function StudyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);
  const { decks, getCards } = useDeckStore();
  const deck = decks.find((d) => d.id === id);

  const [queue, setQueue] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [rating, setRating] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<{ card: Card; rating: number }[]>([]);
  const [exampleOpen, setExampleOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const today = new Date().toISOString().split('T')[0];
    const all = getCards(id);
    const due = all.filter((c) => c.next_review_date <= today);
    setQueue(due.length > 0 ? due : all.slice(0, Math.min(all.length, 10)));
  }, [id]);

  useEffect(() => { setExampleOpen(false); }, [index]);

  if (!deck || queue.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <X size={24} color={C.primary} />
        </TouchableOpacity>
        <View style={styles.centered}>
          <CheckCircle2 size={64} color={C.confidenceHigh} />
          <Text style={styles.emptyTitle}>{t('study.all_caught_up')}</Text>
          <Text style={styles.emptySub}>{t('study.no_due')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (done) {
    const avg = results.reduce((s, r) => s + r.rating, 0) / results.length;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.summary}>
          <PartyPopper size={64} color={C.primary} />
          <Text style={styles.summaryTitle}>{t('study.session_complete')}</Text>
          <Text style={styles.summaryDeck}>{deck.name}</Text>
          <View style={styles.summaryStats}>
            <Stat label={t('study.cards_reviewed')} value={results.length.toString()} C={C} />
            <Stat label={t('study.avg_confidence')} value={avg.toFixed(1)} C={C} />
          </View>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
            <Text style={styles.doneBtnText}>{t('study.done')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const card = queue[index];
  const useCases: string[] = Array.isArray(card.use_cases) ? card.use_cases : [];
  const exampleIsCode = card.simple_example ? isCode(card.simple_example) : false;

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
          <X size={22} color={C.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.progress}>{index + 1} / {queue.length}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(index / queue.length) * 100}%` as any }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.cardArea}>
        <View style={styles.flashcard}>
          <Text style={styles.cardLabel}>{t('study.question_label')}</Text>
          <Text style={styles.cardQuestion}>{card.question}</Text>
        </View>

        {phase === 'answer' && (
          <View style={[styles.flashcard, styles.answerCard]}>
            <Text style={styles.cardLabel}>{t('study.answer_label')}</Text>
            <Text style={styles.cardAnswer}>{card.answer}</Text>

            {card.why_important ? (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Lightbulb size={13} color={C.primary} />
                  <Text style={styles.sectionLabel}>{t('study.why_matters')}</Text>
                </View>
                <Text style={styles.sectionText}>{card.why_important}</Text>
              </View>
            ) : null}

            {useCases.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Zap size={13} color={C.confidenceMid} />
                  <Text style={styles.sectionLabel}>{t('study.use_cases')}</Text>
                </View>
                {useCases.map((uc, i) => (
                  <View key={i} style={styles.useCaseRow}>
                    <Text style={styles.useCaseDot}>›</Text>
                    <Text style={styles.useCaseText}>{uc}</Text>
                  </View>
                ))}
              </View>
            )}

            {card.simple_example ? (
              <View style={styles.section}>
                <TouchableOpacity
                  style={styles.exampleToggle}
                  onPress={() => setExampleOpen((o) => !o)}
                  activeOpacity={0.7}
                >
                  <View style={styles.sectionHeader}>
                    {exampleIsCode
                      ? <Code size={13} color={C.confidenceMax} />
                      : <ChevronDown size={13} color={C.textMuted} />
                    }
                    <Text style={styles.sectionLabel}>
                      {exampleIsCode ? t('study.code_example') : t('study.example')}
                    </Text>
                  </View>
                  {exampleOpen
                    ? <ChevronUp size={16} color={C.textMuted} />
                    : <ChevronDown size={16} color={C.textMuted} />
                  }
                </TouchableOpacity>

                {exampleOpen && (
                  exampleIsCode ? (
                    <View style={styles.codeBlock}>
                      <Text style={styles.codeText}>{card.simple_example}</Text>
                    </View>
                  ) : (
                    <Text style={styles.sectionText}>{card.simple_example}</Text>
                  )
                )}
              </View>
            ) : null}
          </View>
        )}

        {phase === 'question' && (
          <TouchableOpacity style={styles.flipBtn} onPress={() => setPhase('answer')}>
            <Text style={styles.flipBtnText}>{t('study.show_answer')}</Text>
          </TouchableOpacity>
        )}

        {phase === 'answer' && !rating && (
          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>{t('study.rating_label')}</Text>
            <View style={styles.ratingGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.ratingBtn, { backgroundColor: ratingColor(r, C) }]}
                  onPress={() => handleRate(r)}
                >
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

function ratingColor(r: number, C: ThemeColors): string {
  if (r <= 3) return C.confidenceLow;
  if (r <= 6) return C.confidenceMid;
  if (r <= 8) return C.confidenceHigh;
  return C.confidenceMax;
}

function Stat({ label, value, C }: { label: string; value: string; C: ThemeColors }) {
  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <Text style={{ fontSize: 32, fontWeight: '900', color: C.primary }}>{value}</Text>
      <Text style={{ fontSize: 13, color: C.textSecondary }}>{label}</Text>
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    backBtn: { padding: 20 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
    emptyTitle: { fontSize: 24, fontWeight: '800', color: C.text },
    emptySub: { fontSize: 15, color: C.textSecondary },
    header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
    progress: { fontSize: 13, color: C.textSecondary, textAlign: 'right', marginBottom: 6 },
    progressBar: { height: 4, backgroundColor: C.separator, borderRadius: 4 },
    progressFill: { height: 4, backgroundColor: C.primary, borderRadius: 4 },
    cardArea: { padding: 20, gap: 16, paddingBottom: 40 },
    flashcard: {
      backgroundColor: C.surface, borderRadius: 20, padding: 24, gap: 14,
      shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 16, elevation: 4,
    },
    answerCard: { borderLeftWidth: 4, borderLeftColor: C.primary },
    cardLabel: { fontSize: 11, fontWeight: '800', color: C.textMuted, letterSpacing: 1.5 },
    cardQuestion: { fontSize: 22, fontWeight: '700', color: C.text, lineHeight: 30 },
    cardAnswer: { fontSize: 18, color: C.textSecondary, lineHeight: 26 },
    section: { gap: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.separator },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    sectionLabel: { fontSize: 10, fontWeight: '800', color: C.textMuted, letterSpacing: 1.2 },
    sectionText: { fontSize: 14, color: C.textSecondary, lineHeight: 20 },
    useCaseRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
    useCaseDot: { fontSize: 16, color: C.confidenceMid, lineHeight: 20, fontWeight: '700' },
    useCaseText: { flex: 1, fontSize: 14, color: C.textSecondary, lineHeight: 20 },
    exampleToggle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    codeBlock: { backgroundColor: C.codeBlockBg, borderRadius: 10, padding: 14, marginTop: 4 },
    codeText: { fontFamily: 'monospace', fontSize: 13, color: '#A8FF78', lineHeight: 20 },
    flipBtn: { backgroundColor: C.primary, padding: 18, borderRadius: 16, alignItems: 'center' },
    flipBtnText: { color: C.white, fontSize: 18, fontWeight: '800' },
    ratingSection: { gap: 12 },
    ratingLabel: { fontSize: 15, fontWeight: '600', color: C.textSecondary, textAlign: 'center' },
    ratingGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
    ratingBtn: { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    ratingBtnText: { color: C.white, fontSize: 18, fontWeight: '800' },
    summary: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 12 },
    summaryTitle: { fontSize: 28, fontWeight: '900', color: C.text },
    summaryDeck: { fontSize: 16, color: C.textSecondary },
    summaryStats: { flexDirection: 'row', gap: 32, marginTop: 16 },
    doneBtn: { marginTop: 24, backgroundColor: C.primary, paddingHorizontal: 40, paddingVertical: 16, borderRadius: 16 },
    doneBtnText: { color: C.white, fontSize: 18, fontWeight: '800' },
  });
}
