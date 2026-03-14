import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  question: string;
  onShowAnswer: () => void;
}

export default function FlashCard({ question, onShowAnswer }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(-SCREEN_WIDTH * 0.25);
  const btnOpacity = useSharedValue(0);
  const btnTranslateY = useSharedValue(32);

  useEffect(() => {
    const ease = Easing.out(Easing.cubic);
    cardOpacity.value = withTiming(1, { duration: 320, easing: ease });
    cardTranslateX.value = withTiming(0, { duration: 320, easing: ease });
    btnOpacity.value = withDelay(80, withTiming(1, { duration: 280, easing: ease }));
    btnTranslateY.value = withDelay(80, withTiming(0, { duration: 280, easing: ease }));
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateX: cardTranslateX.value }],
  }));

  const btnStyle = useAnimatedStyle(() => ({
    opacity: btnOpacity.value,
    transform: [{ translateY: btnTranslateY.value }],
  }));

  return (
    <>
      <Animated.View style={[styles.card, cardStyle]}>
        <Text style={styles.label}>{t('study.question_label')}</Text>
        <Text style={styles.question}>{question}</Text>
      </Animated.View>

      <Animated.View style={btnStyle}>
        <TouchableOpacity style={styles.flipBtn} onPress={onShowAnswer}>
          <Text style={styles.flipBtnText}>{t('study.show_answer')}</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: C.surface, borderRadius: 20, padding: 24, gap: 14,
      shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 16, elevation: 4,
    },
    label: { fontSize: 11, fontWeight: '800', color: C.textMuted, letterSpacing: 1.5 },
    question: { fontSize: 22, fontWeight: '700', color: C.text, lineHeight: 30 },
    flipBtn: { backgroundColor: C.primary, padding: 18, borderRadius: 16, alignItems: 'center' },
    flipBtnText: { color: C.white, fontSize: 18, fontWeight: '800' },
  });
}
