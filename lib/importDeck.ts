import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

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
      type: 'application/json',
      copyToCacheDirectory: true,
    });
  } catch {
    return { ok: false, error: 'Could not open file picker.' };
  }

  if (result.canceled || !result.assets?.[0]) {
    return { ok: false, error: 'cancelled' };
  }

  const file = result.assets[0];

  let raw: string;
  try {
    raw = await FileSystem.readAsStringAsync(file.uri);
  } catch {
    return { ok: false, error: 'Could not read the file.' };
  }

  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'Invalid JSON — make sure the file is valid JSON.' };
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
      return { ok: false, error: `Card ${i + 1} is missing "question" or "answer".` };
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

  return {
    ok: true,
    deck: {
      name: root.name,
      description: root.description ?? '',
      cards,
    },
  };
}
