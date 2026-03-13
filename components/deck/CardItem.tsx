import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, Trash2, Lightbulb } from 'lucide-react-native';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import { Card } from '../../store/deckStore';

interface Props {
  card: Card;
  onToggleFavorite: (card: Card) => void;
  onDelete: (card: Card) => void;
}

const DIFFICULTY_COLORS = (C: ThemeColors): Record<string, string> => ({
  easy: C.easy,
  medium: C.medium,
  hard: C.hard,
});

export default function CardItem({ card, onToggleFavorite, onDelete }: Props) {
  const C = useTheme();
  const styles = makeStyles(C);
  const diffColors = DIFFICULTY_COLORS(C);
  const diffColor = diffColors[card.difficulty];

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={[styles.diffBadge, { backgroundColor: diffColor + '22' }]}>
          <Text style={[styles.diffText, { color: diffColor }]}>{card.difficulty}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onToggleFavorite(card)}>
            <Heart
              size={20}
              color={card.favorite ? C.confidenceLow : C.iconMuted}
              fill={card.favorite ? C.confidenceLow : 'none'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(card)}>
            <Trash2 size={18} color={C.textMuted} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.question}>{card.question}</Text>
      <Text style={styles.answer}>{card.answer}</Text>
      {card.why_important ? (
        <View style={styles.contextRow}>
          <Lightbulb size={13} color={C.textMuted} />
          <Text style={styles.context}>{card.why_important}</Text>
        </View>
      ) : null}
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: C.surface, borderRadius: 16, padding: 16, gap: 8,
      shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2,
    },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    diffBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
    diffText: { fontSize: 12, fontWeight: '700', textTransform: 'capitalize' },
    actions: { flexDirection: 'row', gap: 14, alignItems: 'center' },
    question: { fontSize: 16, fontWeight: '700', color: C.text },
    answer: { fontSize: 15, color: C.textSecondary },
    contextRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
    context: { flex: 1, fontSize: 13, color: C.textMuted, fontStyle: 'italic' },
  });
}
