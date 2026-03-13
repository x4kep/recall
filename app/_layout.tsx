import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { initDb } from '../lib/db';
import { useDeckStore } from '../store/deckStore';
import { Colors } from '../constants/colors';

export default function RootLayout() {
  const loadDecks = useDeckStore((s) => s.loadDecks);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initDb()
      .then(() => loadDecks())
      .finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
