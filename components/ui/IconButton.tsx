import { AppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  StyleSheet,
  Pressable,
  ViewStyle,
  Platform,
} from "react-native";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
  haptic?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = "ghost",
  size = "md",
  color,
  style,
  disabled = false,
  haptic = true,
}) => {
  const handlePress = () => {
    if (disabled) return;
    
    if (haptic && Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    onPress();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "filled":
        return {
          container: { backgroundColor: AppColors.primary },
          icon: "#FFF",
        };
      case "secondary":
        return {
          container: { backgroundColor: AppColors.slate900, borderWidth: 1, borderColor: AppColors.slate800 },
          icon: "#FFF",
        };
      case "outline":
        return {
          container: { backgroundColor: "transparent", borderWidth: 1, borderColor: AppColors.slate800 },
          icon: AppColors.slate400,
        };
      case "primary":
        return {
          container: { backgroundColor: "transparent" },
          icon: AppColors.primary,
        };
      case "ghost":
      default:
        return {
          container: { backgroundColor: "transparent" },
          icon: AppColors.slate400,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { container: 36, icon: 18 };
      case "lg":
        return { container: 52, icon: 24 };
      case "md":
      default:
        return { container: 44, icon: 22 };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        { 
          width: sizeStyles.container, 
          height: sizeStyles.container, 
          borderRadius: sizeStyles.container / 3 
        },
        variantStyles.container,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Ionicons
        name={icon}
        size={sizeStyles.icon}
        color={color || variantStyles.icon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  disabled: {
    opacity: 0.5,
  },
});

export default IconButton;
