import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <X size={22} color={C.textSecondary} />
      </TouchableOpacity>
      <Text style={styles.counter}>{current + 1} / {total}</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progress}%` as any }]} />
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
