import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react-native';
import SideDrawer from '../../components/ui/SideDrawer';
import DrawerContent from '../../components/settings/SettingsContent';
import { useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeColors } from '../../context/ThemeContext';
import { getDb } from '../../lib/db';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StudyLogRow {
  date: string;
  cards_reviewed: number;
  avg_rating: number;
}

interface DayData {
  cards_reviewed: number;
  avg_rating: number;
}

type LogMap = Record<string, DayData>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

function dotSizeForCards(count: number): 'none' | 'small' | 'medium' | 'large' {
  if (count === 0) return 'none';
  if (count <= 5) return 'small';
  if (count <= 15) return 'medium';
  return 'large';
}

function ratingStars(avg: number): string {
  const full = Math.round(avg);
  return '★'.repeat(full) + '☆'.repeat(Math.max(0, 5 - full));
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface DayCellProps {
  day: number | null;
  dateStr: string | null;
  data: DayData | undefined;
  isToday: boolean;
  isSelected: boolean;
  onPress: (dateStr: string, day: number) => void;
  C: ThemeColors;
  styles: ReturnType<typeof makeStyles>;
}

function DayCell({ day, dateStr, data, isToday, isSelected, onPress, C, styles }: DayCellProps) {
  if (day === null || dateStr === null) {
    return <View style={styles.dayCell} />;
  }

  const cards = data?.cards_reviewed ?? 0;
  const dotSize = dotSizeForCards(cards);

  const dotDimension =
    dotSize === 'none' ? 6 :
    dotSize === 'small' ? 18 :
    dotSize === 'medium' ? 26 :
    32;

  const dotColor =
    dotSize === 'none' ? C.inputBorder : C.primary;

  return (
    <TouchableOpacity
      style={[
        styles.dayCell,
        isSelected && { backgroundColor: C.primaryLight, borderRadius: 8 },
      ]}
      onPress={() => onPress(dateStr, day)}
      activeOpacity={0.7}
    >
      {isToday && (
        <View
          style={[
            styles.todayRing,
            { borderColor: C.primary },
          ]}
        />
      )}
      <View
        style={[
          styles.dot,
          {
            width: dotDimension,
            height: dotDimension,
            borderRadius: dotDimension / 2,
            backgroundColor: dotColor,
            opacity: dotSize === 'none' ? 0.3 : 0.85,
          },
        ]}
      />
      <Text
        style={[
          styles.dayNumber,
          { color: isToday ? C.primary : C.text },
          isToday && { fontWeight: '700' },
        ]}
      >
        {day}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function HistoryScreen() {
  const { t } = useTranslation();
  const C = useTheme();
  const styles = makeStyles(C);

  const today = todayString();
  const todayDate = new Date(today + 'T00:00:00');

  const [year, setYear] = useState(todayDate.getFullYear());
  const [month, setMonth] = useState(todayDate.getMonth());
  const [logMap, setLogMap] = useState<LogMap>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function loadData(y: number, m: number) {
    const db = getDb();
    const firstDay = `${y}-${String(m + 1).padStart(2, '0')}-01`;
    const lastDay = `${y}-${String(m + 1).padStart(2, '0')}-${getDaysInMonth(y, m)}`;
    const rows = db.getAllSync(
      'SELECT date, cards_reviewed, avg_rating FROM study_log WHERE date >= ? AND date <= ? ORDER BY date',
      [firstDay, lastDay]
    ) as StudyLogRow[];

    const map: LogMap = {};
    for (const row of rows) {
      map[row.date] = { cards_reviewed: row.cards_reviewed, avg_rating: row.avg_rating };
    }
    setLogMap(map);
  }

  useFocusEffect(
    useCallback(() => {
      loadData(year, month);
    }, [year, month])
  );

  useEffect(() => {
    loadData(year, month);
  }, [year, month]);

  function goToPrevMonth() {
    setSelectedDate(null);
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function goToNextMonth() {
    setSelectedDate(null);
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }

  function handleDayPress(dateStr: string) {
    setSelectedDate((prev) => (prev === dateStr ? null : dateStr));
  }

  // Build calendar grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDow = getFirstDayOfWeek(year, month);

  // Fill leading empty cells + day numbers
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const selectedData = selectedDate ? logMap[selectedDate] : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.menuBtn}>
            <Menu size={24} color={C.text} />
          </TouchableOpacity>
          <Text style={styles.title}>{t('history.title')}</Text>
        </View>

        {/* Calendar card */}
        <View style={styles.calendarCard}>

          {/* Month navigation */}
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={goToPrevMonth} style={styles.navBtn} activeOpacity={0.7}>
              <ChevronLeft size={22} color={C.text} />
            </TouchableOpacity>
            <Text style={styles.monthLabel}>
              {MONTH_NAMES[month]} {year}
            </Text>
            <TouchableOpacity onPress={goToNextMonth} style={styles.navBtn} activeOpacity={0.7}>
              <ChevronRight size={22} color={C.text} />
            </TouchableOpacity>
          </View>

          {/* Day-of-week headers */}
          <View style={styles.dowRow}>
            {DAYS_OF_WEEK.map((d) => (
              <Text key={d} style={styles.dowLabel}>{d}</Text>
            ))}
          </View>

          {/* Separator */}
          <View style={[styles.separator, { backgroundColor: C.separator }]} />

          {/* Week rows */}
          {weeks.map((week, wi) => (
            <View key={wi} style={styles.weekRow}>
              {week.map((day, di) => {
                const dateStr = day !== null ? formatDate(year, month, day) : null;
                return (
                  <DayCell
                    key={di}
                    day={day}
                    dateStr={dateStr}
                    data={dateStr ? logMap[dateStr] : undefined}
                    isToday={dateStr === today}
                    isSelected={dateStr === selectedDate}
                    onPress={handleDayPress}
                    C={C}
                    styles={styles}
                  />
                );
              })}
            </View>
          ))}

          {/* Legend */}
          <View style={[styles.separator, { backgroundColor: C.separator, marginTop: 12 }]} />
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { width: 6, height: 6, borderRadius: 3, backgroundColor: C.inputBorder, opacity: 0.4 }]} />
              <Text style={styles.legendLabel}>None</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { width: 14, height: 14, borderRadius: 7, backgroundColor: C.primary, opacity: 0.85 }]} />
              <Text style={styles.legendLabel}>1–5</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { width: 20, height: 20, borderRadius: 10, backgroundColor: C.primary, opacity: 0.85 }]} />
              <Text style={styles.legendLabel}>6–15</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { width: 26, height: 26, borderRadius: 13, backgroundColor: C.primary, opacity: 0.85 }]} />
              <Text style={styles.legendLabel}>15+</Text>
            </View>
          </View>
        </View>

        {/* Selected day summary */}
        {selectedDate !== null && (
          <View style={styles.summaryCard}>
            {selectedData ? (
              <>
                <Text style={styles.summaryDate}>{selectedDate}</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{t('history.cards_reviewed')}</Text>
                  <Text style={styles.summaryValue}>{selectedData.cards_reviewed}</Text>
                </View>
                <View style={[styles.separator, { backgroundColor: C.separator, marginVertical: 10 }]} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{t('history.avg_rating')}</Text>
                  <Text style={[styles.summaryStars, { color: C.primary }]}>
                    {ratingStars(selectedData.avg_rating)}{' '}
                    <Text style={styles.summaryValue}>({selectedData.avg_rating.toFixed(1)})</Text>
                  </Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.summaryDate}>{selectedDate}</Text>
                <Text style={styles.noActivity}>{t('history.no_activity')}</Text>
              </>
            )}
          </View>
        )}

        {selectedDate === null && (
          <Text style={styles.selectDayHint}>{t('history.select_day')}</Text>
        )}

      </ScrollView>

      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerContent onClose={() => setDrawerOpen(false)} />
      </SideDrawer>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

function makeStyles(C: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: C.background,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },

    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 20,
    },
    menuBtn: { padding: 4 },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: C.text,
    },

    // Calendar card
    calendarCard: {
      backgroundColor: C.surface,
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },

    // Month navigation
    monthNav: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    navBtn: {
      padding: 6,
      borderRadius: 8,
    },
    monthLabel: {
      fontSize: 17,
      fontWeight: '600',
      color: C.text,
    },

    // Day-of-week header
    dowRow: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    dowLabel: {
      flex: 1,
      textAlign: 'center',
      fontSize: 11,
      fontWeight: '600',
      color: C.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    separator: {
      height: 1,
      marginBottom: 6,
    },

    // Week row
    weekRow: {
      flexDirection: 'row',
      marginBottom: 4,
    },

    // Day cell
    dayCell: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      minHeight: 52,
    },
    todayRing: {
      position: 'absolute',
      top: 3,
      left: 3,
      right: 3,
      bottom: 3,
      borderRadius: 8,
      borderWidth: 1.5,
    },
    dot: {
      marginBottom: 3,
    },
    dayNumber: {
      fontSize: 12,
      fontWeight: '500',
      color: C.text,
    },

    // Legend
    legend: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      marginTop: 8,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    legendDot: {},
    legendLabel: {
      fontSize: 11,
      color: C.textMuted,
    },

    // Summary card
    summaryCard: {
      backgroundColor: C.surface,
      borderRadius: 16,
      padding: 20,
      marginTop: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    summaryDate: {
      fontSize: 13,
      fontWeight: '600',
      color: C.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 12,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summaryLabel: {
      fontSize: 15,
      color: C.textSecondary,
    },
    summaryValue: {
      fontSize: 15,
      fontWeight: '600',
      color: C.text,
    },
    summaryStars: {
      fontSize: 16,
    },
    noActivity: {
      fontSize: 15,
      color: C.textMuted,
      textAlign: 'center',
      marginTop: 4,
    },

    // Hint
    selectDayHint: {
      textAlign: 'center',
      color: C.textMuted,
      fontSize: 13,
      marginTop: 20,
    },
  });
}
