import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PartyPopper } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  deckName: string;
  cardCount: number;
  avgRating: number;
  onDone: () => void;
}

export default function SessionSummary({ deckName, cardCount, avgRating, onDone }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <View style={styles.container}>
      <PartyPopper size={64} color={C.primary} />
      <Text style={styles.title}>{t('study.session_complete')}</Text>
      <Text style={styles.deck}>{deckName}</Text>
      <View style={styles.stats}>
        <Stat label={t('study.cards_reviewed')} value={cardCount.toString()} C={C} />
        <Stat label={t('study.avg_confidence')} value={avgRating.toFixed(1)} C={C} />
      </View>
      <TouchableOpacity style={styles.doneBtn} onPress={onDone}>
        <Text style={styles.doneBtnText}>{t('study.done')}</Text>
      </TouchableOpacity>
    </View>
  );
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
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 12 },
    title: { fontSize: 28, fontWeight: '900', color: C.text },
    deck: { fontSize: 16, color: C.textSecondary },
    stats: { flexDirection: 'row', gap: 32, marginTop: 16 },
    doneBtn: { marginTop: 24, backgroundColor: C.primary, paddingHorizontal: 40, paddingVertical: 16, borderRadius: 16 },
    doneBtnText: { color: C.white, fontSize: 18, fontWeight: '800' },
  });
}
