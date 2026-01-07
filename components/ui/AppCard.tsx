import { AppColors } from "@/constants/app-colors";
import React from "react";
import { StyleSheet, View, ViewStyle, Pressable } from "react-native";
import * as Haptics from "expo-haptics";

interface AppCardProps {
  children: React.ReactNode;
  variant?: "elevated" | "outline" | "flat" | "glass";
  padding?: number;
  onPress?: () => void;
  style?: ViewStyle;
  haptic?: boolean;
}

const AppCard: React.FC<AppCardProps> = ({
  children,
  variant = "outline",
  padding = 20,
  onPress,
  style,
  haptic = true,
}) => {
  const handlePress = () => {
    if (onPress) {
      if (haptic) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPress();
    }
  };

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case "elevated":
        return {
          backgroundColor: AppColors.slate950,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10,
        };
      case "flat":
        return {
          backgroundColor: AppColors.slate950,
        };
      case "glass":
        return {
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.05)",
        };
      default: // outline
        return {
          backgroundColor: AppColors.slate950,
          borderWidth: 1,
          borderColor: AppColors.slate900,
        };
    }
  };

  const Component = onPress ? Pressable : View;

  return (
    <Component
      onPress={onPress ? handlePress : undefined}
      style={({ pressed }: any) => [
        styles.card,
        getVariantStyles(),
        { padding },
        onPress && pressed && styles.pressed,
        style,
      ]}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});

export default AppCard;
