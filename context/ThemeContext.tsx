import { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

export interface ThemeColors {
  // Brand (same in both themes)
  primary: string;
  primaryDark: string;
  primaryLight: string;
  white: string;
  confidenceLow: string;
  confidenceMid: string;
  confidenceHigh: string;
  confidenceMax: string;
  easy: string;
  medium: string;
  hard: string;

  // Semantic (theme-aware)
  background: string;
  surface: string;
  surfaceElevated: string;
  inputBg: string;
  inputBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  iconMuted: string;
  separator: string;
  tabBarBg: string;
  tabBarBorder: string;
  overlay: string;
  codeBlockBg: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeSettings {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const brand = {
  primary: '#4F6EF7',
  primaryDark: '#3A55D4',
  white: '#FFFFFF',
  confidenceLow: '#EF4444',
  confidenceMid: '#F59E0B',
  confidenceHigh: '#22C55E',
  confidenceMax: '#14B8A6',
  easy: '#22C55E',
  medium: '#F59E0B',
  hard: '#EF4444',
};

export const lightColors: ThemeColors = {
  ...brand,
  primaryLight: '#E8ECFF',
  background: '#F8F9FF',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  inputBg: '#F5F5F5',
  inputBorder: '#E5E5E5',
  text: '#0A0A0A',
  textSecondary: '#737373',
  textMuted: '#A3A3A3',
  iconMuted: '#D4D4D4',
  separator: '#E5E5E5',
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#E5E5E5',
  overlay: '#00000055',
  codeBlockBg: '#1A1A2E',
};

export const darkColors: ThemeColors = {
  ...brand,
  primaryLight: '#1e2a5e',
  background: '#0F0F1A',
  surface: '#1A1A2E',
  surfaceElevated: '#252535',
  inputBg: '#1A1A2E',
  inputBorder: '#363650',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  iconMuted: '#475569',
  separator: '#252535',
  tabBarBg: '#1A1A2E',
  tabBarBorder: '#252535',
  overlay: '#00000088',
  codeBlockBg: '#0A0A16',
};

const ThemeContext = createContext<ThemeColors>(lightColors);
const ThemeSettingsContext = createContext<ThemeSettings>({
  themeMode: 'system',
  setThemeMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  const resolved = themeMode === 'system' ? system : themeMode;
  const colors = resolved === 'dark' ? darkColors : lightColors;

  return (
    <ThemeSettingsContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeContext.Provider value={colors}>
        {children}
      </ThemeContext.Provider>
    </ThemeSettingsContext.Provider>
  );
}

export function useTheme(): ThemeColors {
  return useContext(ThemeContext);
}

export function useThemeSettings(): ThemeSettings {
  return useContext(ThemeSettingsContext);
}
