import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  current: number;
  total: number;
  onClose: () => void;
}

export default function StudyHeader({ current, total, onClose }: Props) {
  const C = useTheme();
  const styles = makeStyles(C);
  const [barWidth, setBarWidth] = useState(0);
  const animWidth = useSharedValue(0);

  useEffect(() => {
    if (barWidth === 0) return;
    const target = total > 0 ? (current / total) * barWidth : 0;
    animWidth.value = withTiming(target, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
  }, [current, total, barWidth]);

  const fillStyle = useAnimatedStyle(() => ({
    width: animWidth.value,
  }));

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <X size={22} color={C.textSecondary} />
      </TouchableOpacity>
      <Text style={styles.counter}>{current + 1} / {total}</Text>
      <View style={styles.bar} onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}>
        <Animated.View style={[styles.fill, fillStyle]} />
      </View>
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
    counter: { fontSize: 13, color: C.textSecondary, textAlign: 'right', marginBottom: 6 },
    bar: { height: 4, backgroundColor: C.separator, borderRadius: 4 },
    fill: { height: 4, backgroundColor: C.primary, borderRadius: 4 },
  });
}
