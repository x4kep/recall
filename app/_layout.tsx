import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { initDb } from '../lib/db';
import { useDeckStore } from '../store/deckStore';

export default function RootLayout() {
  const loadDecks = useDeckStore((s) => s.loadDecks);

  useEffect(() => {
    initDb().then(() => loadDecks());
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
