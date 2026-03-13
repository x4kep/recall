import { Tabs } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray400,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.gray200,
          borderTopWidth: 1,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ color }) => <TabIcon label="🏠" color={color} /> }}
      />
      <Tabs.Screen
        name="decks"
        options={{ title: 'Decks', tabBarIcon: ({ color }) => <TabIcon label="📚" color={color} /> }}
      />
    </Tabs>
  );
}

function TabIcon({ label }: { label: string; color: string }) {
  return <>{label}</>;
}
