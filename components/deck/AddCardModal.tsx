import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import AnimatedSheet from '../ui/AnimatedSheet';

const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
type Difficulty = typeof DIFFICULTIES[number];

interface CardForm {
  question: string;
  answer: string;
  whyImportant: string;
  simpleExample: string;
  difficulty: Difficulty;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (form: CardForm) => void;
}

export default function AddCardModal({ visible, onClose, onSubmit }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [whyImportant, setWhyImportant] = useState('');
  const [simpleExample, setSimpleExample] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const diffColors: Record<string, string> = { easy: C.easy, medium: C.medium, hard: C.hard };

  function reset() {
    setQuestion('');
    setAnswer('');
    setWhyImportant('');
    setSimpleExample('');
    setDifficulty('medium');
  }

  function handleSubmit() {
    if (!question.trim() || !answer.trim()) return;
    onSubmit({ question, answer, whyImportant, simpleExample, difficulty });
    reset();
  }

  function handleClose() {
    onClose();
    reset();
  }

  const canSubmit = question.trim().length > 0 && answer.trim().length > 0;

  return (
    <AnimatedSheet visible={visible} onClose={handleClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{t('deck.new_card')}</Text>

          <TextInput
            style={styles.input}
            placeholder={t('deck.question_placeholder')}
            placeholderTextColor={C.textMuted}
            value={question}
            onChangeText={setQuestion}
            autoFocus
          />
          <TextInput
            style={[styles.input, styles.inputMulti]}
            placeholder={t('deck.answer_placeholder')}
            placeholderTextColor={C.textMuted}
            value={answer}
            onChangeText={setAnswer}
            multiline
            numberOfLines={3}
          />
          <TextInput
            style={styles.input}
            placeholder={t('deck.why_placeholder')}
            placeholderTextColor={C.textMuted}
            value={whyImportant}
            onChangeText={setWhyImportant}
          />
          <TextInput
            style={styles.input}
            placeholder={t('deck.example_placeholder')}
            placeholderTextColor={C.textMuted}
            value={simpleExample}
            onChangeText={setSimpleExample}
          />

          <View style={styles.diffRow}>
            {DIFFICULTIES.map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.diffOption, difficulty === d && { backgroundColor: diffColors[d], borderColor: diffColors[d] }]}
                onPress={() => setDifficulty(d)}
              >
                <Text style={[styles.diffOptionText, difficulty === d && { color: C.white }]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
              <Text style={styles.cancelText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={!canSubmit}
            >
              <Text style={styles.submitText}>{t('deck.add_card')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </AnimatedSheet>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    sheet: { backgroundColor: C.surfaceElevated, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 12 },
    title: { fontSize: 22, fontWeight: '800', color: C.text },
    input: { borderWidth: 1.5, borderColor: C.inputBorder, borderRadius: 12, padding: 14, fontSize: 15, color: C.text, backgroundColor: C.inputBg },
    inputMulti: { minHeight: 80, textAlignVertical: 'top' },
    diffRow: { flexDirection: 'row', gap: 8 },
    diffOption: { flex: 1, padding: 10, borderRadius: 10, borderWidth: 1.5, borderColor: C.inputBorder, alignItems: 'center', backgroundColor: C.inputBg },
    diffOptionText: { fontSize: 14, fontWeight: '600', color: C.textSecondary, textTransform: 'capitalize' },
    actions: { flexDirection: 'row', gap: 12, marginTop: 4 },
    cancelBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: C.inputBg, alignItems: 'center' },
    cancelText: { fontWeight: '600', color: C.textSecondary, fontSize: 16 },
    submitBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: C.primary, alignItems: 'center' },
    submitBtnDisabled: { opacity: 0.4 },
    submitText: { fontWeight: '700', color: C.white, fontSize: 16 },
  });
}
