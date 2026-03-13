import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Lightbulb, Zap, Code, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import { Card } from '../../store/deckStore';

function isCode(text: string): boolean {
  return /[{};=()<>]/.test(text) && (
    text.includes('=>') ||
    text.includes('function') ||
    text.includes('const ') ||
    text.includes('return ') ||
    text.includes('import ') ||
    text.includes('class ') ||
    text.startsWith('<') ||
    (text.includes('(') && text.includes(')') && text.includes('{'))
  );
}

interface Props {
  card: Card;
}

export default function AnswerCard({ card }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const [exampleOpen, setExampleOpen] = useState(false);
  const useCases: string[] = Array.isArray(card.use_cases) ? card.use_cases : [];
  const exampleIsCode = card.simple_example ? isCode(card.simple_example) : false;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{t('study.answer_label')}</Text>
      <Text style={styles.answer}>{card.answer}</Text>

      {card.why_important ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lightbulb size={13} color={C.primary} />
            <Text style={styles.sectionLabel}>{t('study.why_matters')}</Text>
          </View>
          <Text style={styles.sectionText}>{card.why_important}</Text>
        </View>
      ) : null}

      {useCases.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={13} color={C.confidenceMid} />
            <Text style={styles.sectionLabel}>{t('study.use_cases')}</Text>
          </View>
          {useCases.map((uc, i) => (
            <View key={i} style={styles.useCaseRow}>
              <Text style={styles.useCaseDot}>›</Text>
              <Text style={styles.useCaseText}>{uc}</Text>
            </View>
          ))}
        </View>
      )}

      {card.simple_example ? (
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.exampleToggle}
            onPress={() => setExampleOpen((o) => !o)}
            activeOpacity={0.7}
          >
            <View style={styles.sectionHeader}>
              {exampleIsCode
                ? <Code size={13} color={C.confidenceMax} />
                : <ChevronDown size={13} color={C.textMuted} />
              }
              <Text style={styles.sectionLabel}>
                {exampleIsCode ? t('study.code_example') : t('study.example')}
              </Text>
            </View>
            {exampleOpen
              ? <ChevronUp size={16} color={C.textMuted} />
              : <ChevronDown size={16} color={C.textMuted} />
            }
          </TouchableOpacity>

          {exampleOpen && (
            exampleIsCode ? (
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{card.simple_example}</Text>
              </View>
            ) : (
              <Text style={styles.sectionText}>{card.simple_example}</Text>
            )
          )}
        </View>
      ) : null}
    </View>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: C.surface, borderRadius: 20, padding: 24, gap: 14,
      borderLeftWidth: 4, borderLeftColor: C.primary,
      shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 16, elevation: 4,
    },
    label: { fontSize: 11, fontWeight: '800', color: C.textMuted, letterSpacing: 1.5 },
    answer: { fontSize: 18, color: C.textSecondary, lineHeight: 26 },
    section: { gap: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.separator },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    sectionLabel: { fontSize: 10, fontWeight: '800', color: C.textMuted, letterSpacing: 1.2 },
    sectionText: { fontSize: 14, color: C.textSecondary, lineHeight: 20 },
    useCaseRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
    useCaseDot: { fontSize: 16, color: C.confidenceMid, lineHeight: 20, fontWeight: '700' },
    useCaseText: { flex: 1, fontSize: 14, color: C.textSecondary, lineHeight: 20 },
    exampleToggle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    codeBlock: { backgroundColor: C.codeBlockBg, borderRadius: 10, padding: 14, marginTop: 4 },
    codeText: { fontFamily: 'monospace', fontSize: 13, color: '#A8FF78', lineHeight: 20 },
  });
}
