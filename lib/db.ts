import * as SQLite from 'expo-sqlite';

let _db: SQLite.SQLiteDatabase | null = null;

export function getDb(): SQLite.SQLiteDatabase {
  if (!_db) {
    _db = SQLite.openDatabaseSync('recall.db');
  }
  return _db;
}

export async function initDb(): Promise<void> {
  const db = getDb();

  db.execSync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS decks (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      tags TEXT DEFAULT '[]',
      card_count INTEGER DEFAULT 0,
      avg_confidence REAL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      deck_id TEXT NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      why_important TEXT DEFAULT '',
      simple_example TEXT DEFAULT '',
      use_cases TEXT DEFAULT '[]',
      difficulty TEXT DEFAULT 'medium',
      confidence INTEGER DEFAULT 0,
      favorite INTEGER DEFAULT 0,
      tags TEXT DEFAULT '[]',
      sm2_interval INTEGER DEFAULT 1,
      sm2_ease_factor REAL DEFAULT 2.5,
      sm2_repetitions INTEGER DEFAULT 0,
      next_review_date TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_cards_deck_id ON cards(deck_id);
    CREATE INDEX IF NOT EXISTS idx_cards_next_review ON cards(next_review_date);
  `);
}
