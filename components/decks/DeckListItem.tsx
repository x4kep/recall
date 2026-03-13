import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BookOpen, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import { Deck } from '../../store/deckStore';

interface Props {
  deck: Deck;
  onPress: () => void;
  onLongPress: () => void;
}

export default function DeckListItem({ deck, onPress, onLongPress }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={onPress} onLongPress={onLongPress}>
      <BookOpen size={20} color={C.primary} />
      <View style={styles.info}>
        <Text style={styles.name}>{deck.name}</Text>
        {deck.description ? <Text style={styles.desc} numberOfLines={1}>{deck.description}</Text> : null}
        <Text style={styles.meta}>{t('common.cards_count', { count: deck.card_count })}</Text>
      </View>
      <ChevronRight size={20} color={C.iconMuted} />
    </TouchableOpacity>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    item: {
      backgroundColor: C.surface, borderRadius: 16, padding: 16,
      flexDirection: 'row', alignItems: 'center', gap: 12,
      shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2,
    },
    info: { flex: 1 },
    name: { fontSize: 17, fontWeight: '700', color: C.text },
    desc: { fontSize: 13, color: C.textSecondary, marginTop: 3 },
    meta: { fontSize: 12, color: C.textMuted, marginTop: 6 },
  });
}
