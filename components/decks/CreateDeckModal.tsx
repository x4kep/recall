import { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

export default function CreateDeckModal({ visible, onClose, onSubmit }: Props) {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit() {
    if (!name.trim()) return;
    onSubmit(name.trim(), description.trim());
    reset();
  }

  function handleClose() {
    onClose();
    reset();
  }

  function reset() {
    setName('');
    setDescription('');
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{t('decks.new_deck')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('decks.deck_name_placeholder')}
            placeholderTextColor={C.textMuted}
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <TextInput
            style={[styles.input, styles.inputMulti]}
            placeholder={t('decks.description_placeholder')}
            placeholderTextColor={C.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
              <Text style={styles.cancelText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitBtn, !name.trim() && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={!name.trim()}
            >
              <Text style={styles.submitText}>{t('decks.create')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    overlay: { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
    sheet: { backgroundColor: C.surfaceElevated, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 16 },
    title: { fontSize: 22, fontWeight: '800', color: C.text },
    input: { borderWidth: 1.5, borderColor: C.inputBorder, borderRadius: 12, padding: 14, fontSize: 16, color: C.text, backgroundColor: C.inputBg },
    inputMulti: { minHeight: 80, textAlignVertical: 'top' },
    actions: { flexDirection: 'row', gap: 12, marginTop: 4 },
    cancelBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: C.inputBg, alignItems: 'center' },
    cancelText: { fontWeight: '600', color: C.textSecondary, fontSize: 16 },
    submitBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: C.primary, alignItems: 'center' },
    submitBtnDisabled: { opacity: 0.4 },
    submitText: { fontWeight: '700', color: C.white, fontSize: 16 },
  });
}
