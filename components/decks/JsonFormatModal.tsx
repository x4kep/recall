import { View, Text, Modal, TouchableOpacity, ScrollView, Share, StyleSheet } from 'react-native';
import { X, Share2 } from 'lucide-react-native';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

const JSON_TEMPLATE = `{
  "name": "Deck Name",
  "description": "Optional description",
  "cards": [
    {
      "question": "Your question here",
      "answer": "Your answer here",
      "why_important": "Why this matters (optional)",
      "simple_example": "A simple example or code snippet (optional)",
      "use_cases": [
        "First real-world use case",
        "Second real-world use case",
        "Third real-world use case"
      ],
      "difficulty": "easy"
    }
  ]
}`;

const DIFFICULTY_NOTE = `difficulty: "easy" | "medium" | "hard"`;

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function JsonFormatModal({ visible, onClose }: Props) {
  const C = useTheme();
  const styles = makeStyles(C);

  async function handleShare() {
    await Share.share({ message: JSON_TEMPLATE, title: 'Recall deck JSON format' });
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>JSON Format</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <X size={22} color={C.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Create a <Text style={styles.bold}>.json</Text> file with this structure and import it into Recall.
          </Text>

          <ScrollView style={styles.codeScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.codeBlock}>
              <Text style={styles.code}>{JSON_TEMPLATE}</Text>
            </View>
          </ScrollView>

          <View style={styles.notes}>
            <Text style={styles.noteLabel}>NOTES</Text>
            <Text style={styles.note}>• <Text style={styles.bold}>question</Text> and <Text style={styles.bold}>answer</Text> are required. All other fields optional.</Text>
            <Text style={styles.note}>• <Text style={styles.mono}>{DIFFICULTY_NOTE}</Text></Text>
            <Text style={styles.note}>• <Text style={styles.bold}>use_cases</Text> should have up to 3 items.</Text>
            <Text style={styles.note}>• Code in <Text style={styles.bold}>simple_example</Text> is auto-detected and syntax-highlighted.</Text>
          </View>

          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Share2 size={16} color={C.white} />
            <Text style={styles.shareBtnText}>Share Template</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    overlay: { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
    sheet: { backgroundColor: C.surfaceElevated, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 14, maxHeight: '88%' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '800', color: C.text },
    subtitle: { fontSize: 14, color: C.textSecondary, lineHeight: 20 },
    bold: { fontWeight: '700', color: C.text },
    codeScroll: { maxHeight: 260 },
    codeBlock: { backgroundColor: C.codeBlockBg, borderRadius: 12, padding: 16 },
    code: { fontFamily: 'monospace', fontSize: 12, color: '#A8FF78', lineHeight: 20 },
    notes: { gap: 6 },
    noteLabel: { fontSize: 10, fontWeight: '800', color: C.textMuted, letterSpacing: 1.5, marginBottom: 2 },
    note: { fontSize: 13, color: C.textSecondary, lineHeight: 20 },
    mono: { fontFamily: 'monospace', fontSize: 12, color: C.primary },
    shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: C.primary, padding: 14, borderRadius: 12 },
    shareBtnText: { color: C.white, fontWeight: '700', fontSize: 15 },
  });
}
