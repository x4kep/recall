import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Menu } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useDeckStore } from '../../store/deckStore';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import DueBanner from '../../components/home/DueBanner';
import HomeDeckCard from '../../components/home/HomeDeckCard';
import EmptyHome from '../../components/home/EmptyHome';
import SideDrawer from '../../components/ui/SideDrawer';
import SettingsContent from '../../components/settings/SettingsContent';

export default function HomeScreen() {
  const { decks, getDueCount } = useDeckStore();
  const dueCount = getDueCount();
  const router = useRouter();
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{t('home.greeting')}</Text>
            <Text style={styles.appName}>{t('home.app_name')}</Text>
          </View>
          <TouchableOpacity onPress={() => setDrawerOpen(true)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Menu size={26} color={C.text} />
          </TouchableOpacity>
        </View>

        <DueBanner dueCount={dueCount} onPress={() => {}} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.your_decks')}</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/decks')}>
              <Text style={styles.seeAll}>{t('home.see_all')}</Text>
            </TouchableOpacity>
          </View>

          {decks.length === 0 ? (
            <EmptyHome />
          ) : (
            decks.slice(0, 4).map((deck) => (
              <HomeDeckCard
                key={deck.id}
                deck={deck}
                onPress={() => router.push({ pathname: '/deck/[id]', params: { id: deck.id } })}
              />
            ))
          )}
        </View>
      </ScrollView>

      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <SettingsContent onClose={() => setDrawerOpen(false)} />
      </SideDrawer>
    </SafeAreaView>
  );
}

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    scroll: { padding: 20, paddingBottom: 40 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
    greeting: { fontSize: 15, color: C.textSecondary },
    appName: { fontSize: 32, fontWeight: '800', color: C.text, marginTop: 2 },
    section: { gap: 12 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: C.text },
    seeAll: { fontSize: 14, color: C.primary, fontWeight: '600' },
  });
}
