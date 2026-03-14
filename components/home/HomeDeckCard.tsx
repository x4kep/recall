import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { BookOpen } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import { Deck } from '../../store/deckStore';

interface Props {
  deck: Deck;
  onPress: () => void;
  index?: number;
}

export default function HomeDeckCard({ deck, onPress, index = 0 }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  useEffect(() => {
    const delay = index * 60;
    opacity.value = withDelay(delay, withTiming(1, { duration: 280 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 280 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const confidenceColor =
    deck.avg_confidence >= 9 ? C.confidenceMax :
    deck.avg_confidence >= 7 ? C.confidenceHigh :
    deck.avg_confidence >= 4 ? C.confidenceMid :
    C.confidenceLow;

  return (
    <Animated.View style={[styles.card, animStyle]}>
      <Pressable
        onPressIn={() => { scale.value = withTiming(0.97, { duration: 100 }); }}
        onPressOut={() => { scale.value = withTiming(1, { duration: 150 }); }}
        onPress={onPress}
        style={styles.pressable}
      >
        <BookOpen size={20} color={C.primary} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.name}>{deck.name}</Text>
          <Text style={styles.meta}>{t('common.cards_count', { count: deck.card_count })}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: confidenceColor + '22', borderColor: confidenceColor }]}>
          <Text style={[styles.badgeText, { color: confidenceColor }]}>{deck.avg_confidence.toFixed(1)}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: C.surface,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 2,
    },
    pressable: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderRadius: 16,
    },
    icon: { flexShrink: 0 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: '600', color: C.text },
    meta: { fontSize: 13, color: C.textSecondary, marginTop: 4 },
    badge: { borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 10, paddingVertical: 4 },
    badgeText: { fontSize: 14, fontWeight: '700' },
  });
}
