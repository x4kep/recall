import { useEffect, useState, useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { initDb } from '../lib/db';
import { useDeckStore } from '../store/deckStore';
import { Colors } from '../constants/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loadDecks = useDeckStore((s) => s.loadDecks);
  const [ready, setReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    initDb()
      .then(() => loadDecks())
      .finally(async () => {
        await SplashScreen.hideAsync();
        setReady(true);
      });
  }, []);

  useEffect(() => {
    if (ready) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [ready]);

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
      {!ready && (
        <Animated.View style={[styles.splash, { opacity: fadeAnim }]}>
          <View style={styles.logoRing}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  logoRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
