import { getDb } from './db';
import { useDeckStore } from '../store/deckStore';

const nodejsDeck = require('../assets/seed/nodejs.json');

export function seedIfEmpty(): void {
  const db = getDb();
  const row = db.getFirstSync('SELECT COUNT(*) as count FROM decks') as any;
  if (row?.count > 0) return;

  useDeckStore.getState().importDeck(nodejsDeck);
}
