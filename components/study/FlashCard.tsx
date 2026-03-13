import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  question: string;
  onShowAnswer: () => void;
}

export default function FlashCard({ question, onShowAnswer }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.label}>{t('study.question_label')}</Text>
        <Text style={styles.question}>{question}</Text>
      </View>

      <TouchableOpacity style={styles.flipBtn} onPress={onShowAnswer}>
        <Text style={styles.flipBtnText}>{t('study.show_answer')}</Text>
      </TouchableOpacity>
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
