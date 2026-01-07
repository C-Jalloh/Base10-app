import { AppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Pressable,
  View,
  ViewStyle,
  TextStyle,
  Platform,
} from "react-native";

export type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "outline" 
  | "ghost" 
  | "danger" 
  | "success"
  | "warning";

export type ButtonSize = "sm" | "md" | "lg";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  haptic?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  haptic = true,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    
    if (haptic && Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    onPress();
  };

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle; icon: string } => {
    switch (variant) {
      case "secondary":
        return {
          container: { backgroundColor: AppColors.slate900, borderWidth: 1, borderColor: AppColors.slate800 },
          text: { color: "#FFF" },
          icon: "#FFF",
        };
      case "outline":
        return {
          container: { backgroundColor: "transparent", borderWidth: 1, borderColor: AppColors.primary },
          text: { color: AppColors.primary },
          icon: AppColors.primary,
        };
      case "ghost":
        return {
          container: { backgroundColor: "transparent" },
          text: { color: AppColors.slate400 },
          icon: AppColors.slate400,
        };
      case "danger":
        return {
          container: { backgroundColor: AppColors.error },
          text: { color: "#FFF" },
          icon: "#FFF",
        };
      case "success":
        return {
          container: { backgroundColor: AppColors.success },
          text: { color: "#FFF" },
          icon: "#FFF",
        };
      case "warning":
        return {
          container: { backgroundColor: AppColors.warning },
          text: { color: AppColors.background },
          icon: AppColors.background,
        };
      case "primary":
      default:
        return {
          container: { backgroundColor: AppColors.primary },
          text: { color: "#FFF" },
          icon: "#FFF",
        };
    }
  };

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle; icon: number } => {
    switch (size) {
      case "sm":
        return {
          container: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 },
          text: { fontSize: 12, fontWeight: "700" },
          icon: 16,
        };
      case "lg":
        return {
          container: { paddingVertical: 16, paddingHorizontal: 28, borderRadius: 18 },
          text: { fontSize: 16, fontWeight: "900" },
          icon: 20,
        };
      case "md":
      default:
        return {
          container: { paddingVertical: 12, paddingHorizontal: 22, borderRadius: 14 },
          text: { fontSize: 14, fontWeight: "800" },
          icon: 18,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.baseButton,
        variantStyles.container,
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && !disabled && !loading && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color as string} size="small" />
      ) : (
        <View style={[styles.content, iconPosition === "right" && styles.contentReverse]}>
          {icon && (
            <Ionicons
              name={icon}
              size={sizeStyles.icon}
              color={variantStyles.icon as any}
              style={iconPosition === "left" ? styles.leftIcon : styles.rightIcon}
            />
          )}
          <Text style={[styles.baseText, variantStyles.text, sizeStyles.text, textStyle]}>
            {title.toUpperCase()}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentReverse: {
    flexDirection: "row-reverse",
  },
  baseText: {
    letterSpacing: 0.5,
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default AppButton;
