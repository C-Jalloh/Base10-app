
import { AppColors } from '@/constants/app-colors';
import React from 'react';
import { Text, Animated, StyleSheet } from 'react-native';

type FieldErrorProps = {
  message?: string;
};

export const FieldError: React.FC<FieldErrorProps> = ({ message }) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(-4)).current;

  React.useEffect(() => {
    if (message) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -4,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [message, opacity, translateY]);

  if (!message) return null;

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }]}>
      <Text style={styles.errorText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: AppColors.redColor,
    fontSize: 14,
  },
});
