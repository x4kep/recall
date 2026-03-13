import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

export interface ImportedCard {
  question: string;
  answer: string;
  why_important?: string;
  simple_example?: string;
  use_cases?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface ImportedDeck {
  name: string;
  description?: string;
  cards: ImportedCard[];
}

export type ImportResult =
  | { ok: true; deck: ImportedDeck }
  | { ok: false; error: string };

export async function pickAndParseDeck(): Promise<ImportResult> {
  let result;
  try {
    result = await DocumentPicker.getDocumentAsync({
      // Accept any file on Android — MIME type matching is unreliable
      type: Platform.OS === 'android' ? '*/*' : 'application/json',
      copyToCacheDirectory: true,
    });
  } catch (e: any) {
    return { ok: false, error: 'Could not open file picker.' };
  }

  if (result.canceled || !result.assets?.[0]) {
    return { ok: false, error: 'cancelled' };
  }

  const file = result.assets[0];

  // Verify it looks like a JSON file by name
  if (file.name && !file.name.toLowerCase().endsWith('.json')) {
    return { ok: false, error: `Please select a .json file (selected: ${file.name})` };
  }

  let raw: string;
  try {
    raw = await FileSystem.readAsStringAsync(file.uri, { encoding: 'utf8' as any });
  } catch (e: any) {
    return { ok: false, error: `Could not read the file: ${e?.message ?? 'unknown error'}` };
  }

  // Strip BOM if present
  if (raw.charCodeAt(0) === 0xFEFF) {
    raw = raw.slice(1);
  }

  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch (e: any) {
    return { ok: false, error: `Invalid JSON: ${e?.message ?? 'parse error'}` };
  }

  // Support two formats:
  // Format A: { name, description, cards: [...] }
  // Format B: { deck: { name, description }, cards: [...] }
  const root = parsed.deck ?? parsed;

  if (!root.name || typeof root.name !== 'string') {
    return { ok: false, error: 'Missing "name" field in JSON.' };
  }

  if (!Array.isArray(root.cards) || root.cards.length === 0) {
    return { ok: false, error: 'No cards found. Make sure your JSON has a "cards" array.' };
  }

  const cards: ImportedCard[] = [];
  for (let i = 0; i < root.cards.length; i++) {
    const c = root.cards[i];
    if (!c.question || !c.answer) {
      // Skip incomplete cards instead of failing the whole import
      continue;
    }
    cards.push({
      question: String(c.question),
      answer: String(c.answer),
      why_important: c.why_important ? String(c.why_important) : '',
      simple_example: c.simple_example ? String(c.simple_example) : '',
      use_cases: Array.isArray(c.use_cases) ? c.use_cases.map(String) : [],
      difficulty: ['easy', 'medium', 'hard'].includes(c.difficulty) ? c.difficulty : 'medium',
    });
  }

  if (cards.length === 0) {
    return { ok: false, error: 'No valid cards found. Each card needs a "question" and "answer".' };
  }

  return {
    ok: true,
    deck: {
      name: root.name,
      description: root.description ?? '',
      cards,
    },
  };
}
