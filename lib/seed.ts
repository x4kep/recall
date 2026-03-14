import { getDb } from './db';
import { useDeckStore } from '../store/deckStore';
import { nodejsDeck } from './seedData';

export function seedIfEmpty(): void {
  const db = getDb();
  const row = db.getFirstSync('SELECT COUNT(*) as count FROM decks') as any;
  if (row?.count > 0) return;

  useDeckStore.getState().importDeck(nodejsDeck);
}
