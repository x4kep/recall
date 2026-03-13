import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Brain } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import { Deck } from '../../store/deckStore';

interface Props {
  deck: Deck;
  hasCards: boolean;
  onStudy: () => void;
}

export default function DeckInfo({ deck, hasCards, onStudy }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  return (
    <>
      <View style={styles.info}>
        <Text style={styles.name}>{deck.name}</Text>
        {deck.description ? <Text style={styles.desc}>{deck.description}</Text> : null}
        <Text style={styles.meta}>{t('common.cards_count', { count: deck.card_count })}</Text>
      </View>

      {hasCards && (
        <TouchableOpacity style={styles.studyBtn} onPress={onStudy}>
          <Brain size={18} color={C.white} />
          <Text style={styles.studyBtnText}>{t('deck.study_now')}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    info: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    name: { fontSize: 26, fontWeight: '800', color: C.text },
    desc: { fontSize: 14, color: C.textSecondary, marginTop: 4 },
    meta: { fontSize: 13, color: C.textMuted, marginTop: 6 },
    studyBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginVertical: 12, backgroundColor: C.primary, padding: 14, borderRadius: 14 },
    studyBtnText: { color: C.white, fontWeight: '800', fontSize: 16 },
  });
}
