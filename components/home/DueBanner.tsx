import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { ArrowRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  dueCount: number;
  onPress: () => void;
}

export default function DueBanner({ dueCount, onPress }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    translateY.value = withTiming(0, { duration: 350 });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <TouchableOpacity style={styles.banner} activeOpacity={0.8} onPress={onPress}>
        <View>
          <Text style={styles.count}>{dueCount}</Text>
          <Text style={styles.label}>{t('home.cards_due')}</Text>
        </View>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{t('home.study_all')}</Text>
          <ArrowRight size={16} color={C.white} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    banner: {
      backgroundColor: C.primary,
      borderRadius: 20,
      padding: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 32,
    },
    count: { fontSize: 48, fontWeight: '900', color: C.white },
    label: { fontSize: 14, color: C.white + 'CC', marginTop: 2 },
    btn: {
      backgroundColor: C.white + '22',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    btnText: { color: C.white, fontWeight: '700', fontSize: 14 },
  });
}
