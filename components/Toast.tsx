import { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { CheckCircle2, XCircle } from 'lucide-react-native';
import { Colors } from '../constants/colors';

export type ToastType = 'success' | 'error';

interface Props {
  message: string;
  type: ToastType;
  visible: boolean;
  onHide: () => void;
}

export default function Toast({ message, type, visible, onHide }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: 20, duration: 250, useNativeDriver: true }),
        ]).start(() => onHide());
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const isSuccess = type === 'success';

  return (
    <Animated.View style={[styles.toast, isSuccess ? styles.success : styles.error, { opacity, transform: [{ translateY }] }]}>
      {isSuccess
        ? <CheckCircle2 size={18} color={Colors.white} />
        : <XCircle size={18} color={Colors.white} />
      }
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    zIndex: 999,
  },
  success: { backgroundColor: '#16a34a' },
  error: { backgroundColor: Colors.confidenceLow },
  message: { flex: 1, color: Colors.white, fontSize: 14, fontWeight: '600' },
});
