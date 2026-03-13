import { create } from 'zustand';
import { getDb } from '../lib/db';
import { defaultSM2State } from '../lib/sm2';

export interface Deck {
  id: string;
  name: string;
  description: string;
  tags: string[];
  card_count: number;
  avg_confidence: number;
  created_at: string;
  updated_at: string;
}

export interface Card {
  id: string;
  deck_id: string;
  question: string;
  answer: string;
  why_important: string;
  simple_example: string;
  use_cases: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  confidence: number;
  favorite: boolean;
  tags: string[];
  sm2_interval: number;
  sm2_ease_factor: number;
  sm2_repetitions: number;
  next_review_date: string;
  created_at: string;
  updated_at: string;
}

interface DeckStore {
  decks: Deck[];
  loadDecks: () => void;
  createDeck: (name: string, description?: string) => Deck;
  deleteDeck: (id: string) => void;
  getCards: (deckId: string) => Card[];
  createCard: (deckId: string, data: Pick<Card, 'question' | 'answer' | 'why_important' | 'simple_example' | 'use_cases' | 'difficulty'>) => Card;
  deleteCard: (id: string, deckId: string) => void;
  toggleFavorite: (id: string) => void;
  getDueCount: () => number;
}

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function now(): string {
  return new Date().toISOString();
}

function rowToDeck(row: any): Deck {
  return {
    ...row,
    tags: JSON.parse(row.tags || '[]'),
  };
}

function rowToCard(row: any): Card {
  return {
    ...row,
    use_cases: JSON.parse(row.use_cases || '[]'),
    tags: JSON.parse(row.tags || '[]'),
    favorite: row.favorite === 1,
  };
}

export const useDeckStore = create<DeckStore>((set, get) => ({
  decks: [],

  loadDecks: () => {
    const db = getDb();
    const rows = db.getAllSync('SELECT * FROM decks ORDER BY updated_at DESC') as any[];
    set({ decks: rows.map(rowToDeck) });
  },

  createDeck: (name, description = '') => {
    const db = getDb();
    const deck: Deck = {
      id: uuid(),
      name,
      description,
      tags: [],
      card_count: 0,
      avg_confidence: 0,
      created_at: now(),
      updated_at: now(),
    };
    db.runSync(
      'INSERT INTO decks (id, name, description, tags, card_count, avg_confidence, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [deck.id, deck.name, deck.description, '[]', 0, 0, deck.created_at, deck.updated_at]
    );
    set((s) => ({ decks: [deck, ...s.decks] }));
    return deck;
  },

  deleteDeck: (id) => {
    const db = getDb();
    db.runSync('DELETE FROM decks WHERE id = ?', [id]);
    set((s) => ({ decks: s.decks.filter((d) => d.id !== id) }));
  },

  getCards: (deckId) => {
    const db = getDb();
    const rows = db.getAllSync('SELECT * FROM cards WHERE deck_id = ? ORDER BY created_at DESC', [deckId]) as any[];
    return rows.map(rowToCard);
  },

  createCard: (deckId, data) => {
    const db = getDb();
    const sm2 = defaultSM2State();
    const card: Card = {
      id: uuid(),
      deck_id: deckId,
      question: data.question,
      answer: data.answer,
      why_important: data.why_important,
      simple_example: data.simple_example,
      use_cases: data.use_cases,
      difficulty: data.difficulty,
      confidence: 0,
      favorite: false,
      tags: [],
      sm2_interval: sm2.interval,
      sm2_ease_factor: sm2.easeFactor,
      sm2_repetitions: sm2.repetitions,
      next_review_date: sm2.nextReviewDate,
      created_at: now(),
      updated_at: now(),
    };
    db.runSync(
      `INSERT INTO cards (id, deck_id, question, answer, why_important, simple_example, use_cases,
        difficulty, confidence, favorite, tags, sm2_interval, sm2_ease_factor, sm2_repetitions,
        next_review_date, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [card.id, card.deck_id, card.question, card.answer, card.why_important, card.simple_example,
        JSON.stringify(card.use_cases), card.difficulty, 0, 0, '[]', card.sm2_interval,
        card.sm2_ease_factor, card.sm2_repetitions, card.next_review_date, card.created_at, card.updated_at]
    );
    // Update deck card_count
    db.runSync('UPDATE decks SET card_count = card_count + 1, updated_at = ? WHERE id = ?', [now(), deckId]);
    set((s) => ({
      decks: s.decks.map((d) =>
        d.id === deckId ? { ...d, card_count: d.card_count + 1 } : d
      ),
    }));
    return card;
  },

  deleteCard: (id, deckId) => {
    const db = getDb();
    db.runSync('DELETE FROM cards WHERE id = ?', [id]);
    db.runSync('UPDATE decks SET card_count = card_count - 1, updated_at = ? WHERE id = ?', [now(), deckId]);
    set((s) => ({
      decks: s.decks.map((d) =>
        d.id === deckId ? { ...d, card_count: Math.max(0, d.card_count - 1) } : d
      ),
    }));
  },

  toggleFavorite: (id) => {
    const db = getDb();
    db.runSync('UPDATE cards SET favorite = NOT favorite, updated_at = ? WHERE id = ?', [now(), id]);
  },

  getDueCount: () => {
    try {
      const db = getDb();
      const today = new Date().toISOString().split('T')[0];
      const row = db.getFirstSync('SELECT COUNT(*) as count FROM cards WHERE next_review_date <= ?', [today]) as any;
      return row?.count ?? 0;
    } catch {
      return 0;
    }
  },
}));
