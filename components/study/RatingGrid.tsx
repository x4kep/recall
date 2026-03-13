import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  onRate: (rating: number) => void;
}

function ratingColor(r: number, C: ThemeColors): string {
  if (r <= 3) return C.confidenceLow;
  if (r <= 6) return C.confidenceMid;
  if (r <= 8) return C.confidenceHigh;
  return C.confidenceMax;
}

export default function RatingGrid({ onRate }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('study.rating_label')}</Text>
      <View style={styles.grid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.btn, { backgroundColor: ratingColor(r, C) }]}
            onPress={() => onRate(r)}
          >
            <Text style={styles.btnText}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { gap: 12 },
    label: { fontSize: 15, fontWeight: '600', color: C.textSecondary, textAlign: 'center' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
    btn: { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    btnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  });
}
