import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, Upload, FileJson, Menu } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import JsonFormatModal from './JsonFormatModal';

interface Props {
  importing: boolean;
  onImport: () => void;
  onNew: () => void;
  onMenuPress: () => void;
}

export default function DecksHeader({ importing, onImport, onNew, onMenuPress }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);
  const [showFormat, setShowFormat] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuBtn}>
          <Menu size={24} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('decks.title')}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setShowFormat(true)}>
            <FileJson size={18} color={C.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.importBtn} onPress={onImport} disabled={importing}>
            <Upload size={15} color={C.textSecondary} />
            <Text style={styles.importBtnText}>{importing ? t('decks.loading') : t('decks.import')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.newBtn} onPress={onNew}>
            <Plus size={16} color={C.white} />
            <Text style={styles.newBtnText}>{t('decks.new')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <JsonFormatModal visible={showFormat} onClose={() => setShowFormat(false)} />
    </>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, gap: 12 },
    menuBtn: { padding: 4 },
    title: { fontSize: 28, fontWeight: '800', color: C.text },
    actions: { flexDirection: 'row', gap: 8, alignItems: 'center' },
    iconBtn: { padding: 8, borderRadius: 10, backgroundColor: C.surface, borderWidth: 1.5, borderColor: C.separator },
    importBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.surface, borderWidth: 1.5, borderColor: C.separator, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    importBtnText: { color: C.textSecondary, fontWeight: '600', fontSize: 14 },
    newBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
    newBtnText: { color: C.white, fontWeight: '700', fontSize: 15 },
  });
}
