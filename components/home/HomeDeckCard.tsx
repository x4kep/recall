import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import { Deck } from '../../store/deckStore';

interface Props {
  deck: Deck;
  onPress: () => void;
}

export default function HomeDeckCard({ deck, onPress }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const confidenceColor =
    deck.avg_confidence >= 9 ? C.confidenceMax :
    deck.avg_confidence >= 7 ? C.confidenceHigh :
    deck.avg_confidence >= 4 ? C.confidenceMid :
    C.confidenceLow;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <BookOpen size={20} color={C.primary} style={styles.icon} />
      <View style={styles.info}>
        <Text style={styles.name}>{deck.name}</Text>
        <Text style={styles.meta}>{t('common.cards_count', { count: deck.card_count })}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: confidenceColor + '22', borderColor: confidenceColor }]}>
        <Text style={[styles.badgeText, { color: confidenceColor }]}>{deck.avg_confidence.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    card: {
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
    icon: { flexShrink: 0 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: '600', color: C.text },
    meta: { fontSize: 13, color: C.textSecondary, marginTop: 4 },
    badge: { borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 10, paddingVertical: 4 },
    badgeText: { fontSize: 14, fontWeight: '700' },
  });
}
