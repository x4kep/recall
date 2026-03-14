import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AnimatedSheet from '../ui/AnimatedSheet';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

const LIMITS = [5, 10, 20, 0] as const; // 0 = All
export type SessionLimit = typeof LIMITS[number];

interface Props {
  visible: boolean;
  deckName: string;
  cardCount: number;
  onClose: () => void;
  onStart: (limit: SessionLimit) => void;
}

export default function SessionSetupModal({ visible, deckName, cardCount, onClose, onStart }: Props) {
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <AnimatedSheet visible={visible} onClose={onClose}>
      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Text style={styles.title}>Start Session</Text>
        <Text style={styles.subtitle}>{deckName}</Text>

        <Text style={styles.sectionLabel}>HOW MANY CARDS?</Text>

        <View style={styles.pills}>
          {LIMITS.map((limit) => {
            const label = limit === 0 ? `All (${cardCount})` : String(limit);
            const disabled = limit !== 0 && limit > cardCount;
            return (
              <TouchableOpacity
                key={limit}
                style={[styles.pill, disabled && styles.pillDisabled]}
                onPress={() => !disabled && onStart(limit)}
                activeOpacity={disabled ? 1 : 0.7}
              >
                <Text style={[styles.pillText, disabled && styles.pillTextDisabled]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </AnimatedSheet>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    sheet: {
      backgroundColor: C.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 40,
      gap: 8,
    },
    handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: C.inputBorder,
      alignSelf: 'center',
      marginBottom: 12,
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: C.text,
    },
    subtitle: {
      fontSize: 14,
      color: C.textMuted,
      marginBottom: 8,
    },
    sectionLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: C.textMuted,
      letterSpacing: 1.4,
      marginTop: 8,
      marginBottom: 4,
    },
    pills: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 4,
    },
    pill: {
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 14,
      backgroundColor: C.primary,
      minWidth: 72,
      alignItems: 'center',
    },
    pillDisabled: {
      backgroundColor: C.inputBg,
    },
    pillText: {
      fontSize: 16,
      fontWeight: '700',
      color: C.white,
    },
    pillTextDisabled: {
      color: C.textMuted,
    },
  });
}
