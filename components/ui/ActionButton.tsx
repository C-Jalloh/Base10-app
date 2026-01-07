import { AppColors } from '@/constants/app-colors';
import { actionButtonStyles } from '@/styles/action-button-styles';
import { getDeviceDimensions } from '@/utils/helpers';
import React, { useEffect, useRef } from 'react';
import type {
    ColorValue,
    DimensionValue,
    GestureResponderEvent,
} from 'react-native';
import { Animated, Text, TouchableOpacity } from 'react-native';

const { width: SCREEN_WIDTH } = getDeviceDimensions();
const ActionButton = ({
  isEnabled,
  onPress,
  text,
  width,
  backgroundColor = AppColors.primary,
  color = AppColors.textPrimary,
  children,
}: {
  isEnabled: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  text?: string;
  width?: DimensionValue;
  backgroundColor?: ColorValue;
  color?: ColorValue;
  children?: React.ReactNode;
}) => {
  const animatedButtonOpacity = useRef(new Animated.Value(0.5)).current;
  const animatedButtonScale = useRef(new Animated.Value(1)).current;

  // Use the color prop directly
  const textColor = color;

  useEffect(() => {
    if (isEnabled) {
      Animated.parallel([
        Animated.timing(animatedButtonOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(animatedButtonScale, {
          toValue: 1.05,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedButtonOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(animatedButtonScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isEnabled, animatedButtonOpacity, animatedButtonScale]);

  return (
    <Animated.View
      style={[
        actionButtonStyles.buttonContainer,
        {
          width: width ?? '100%',
          opacity: animatedButtonOpacity,
          transform: [{ scale: animatedButtonScale }],
        },
      ]}
      pointerEvents='box-none'
    >
      <TouchableOpacity
        activeOpacity={0.9}
        delayPressIn={0}
        delayPressOut={0}
        delayLongPress={500}
        style={[
          actionButtonStyles.button,
          {
            backgroundColor,
            width: width ?? SCREEN_WIDTH * 0.8,
          },
          !isEnabled && actionButtonStyles.buttonDisabled,
        ]}
        onPress={onPress}
        disabled={!isEnabled}
      >
        {children ? (
          children
        ) : (
          <Text style={{ ...actionButtonStyles.buttonText, color: textColor }}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ActionButton;
