import '../lib/i18n';
import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { initDb } from '../lib/db';
import { useDeckStore } from '../store/deckStore';
import { ThemeProvider, lightColors, darkColors } from '../context/ThemeContext';

export default function RootLayout() {
  const loadDecks = useDeckStore((s) => s.loadDecks);
  const [ready, setReady] = useState(false);
  const scheme = useColorScheme();
  const C = scheme === 'dark' ? darkColors : lightColors;

  useEffect(() => {
    initDb()
      .then(() => loadDecks())
      .finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <View style={[styles.splash, { backgroundColor: C.primary }]}>
        <StatusBar style="light" />
        <View style={styles.logoRing}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    elevation: 12,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
