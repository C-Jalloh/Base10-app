import { AppColors } from "@/constants/app-colors";
import React from "react";
import { StyleSheet, View, ViewStyle, TextStyle } from "react-native";
import AppText from "./AppText";

export type BadgeVariant = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "danger" 
  | "warning" 
  | "info"
  | "glass";

interface AppBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  style?: ViewStyle;
}

const AppBadge: React.FC<AppBadgeProps> = ({
  label,
  variant = "primary",
  size = "md",
  style,
}) => {
  const getVariantStyles = (): { container: ViewStyle; text: string } => {
    switch (variant) {
      case "secondary":
        return {
          container: { backgroundColor: AppColors.slate900, borderColor: AppColors.slate800, borderWidth: 1 },
          text: AppColors.slate400,
        };
      case "success":
        return {
          container: { backgroundColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.2)", borderWidth: 1 },
          text: AppColors.success,
        };
      case "danger":
        return {
          container: { backgroundColor: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.2)", borderWidth: 1 },
          text: AppColors.error,
        };
      case "warning":
        return {
          container: { backgroundColor: "rgba(245, 158, 11, 0.1)", borderColor: "rgba(245, 158, 11, 0.2)", borderWidth: 1 },
          text: AppColors.warning,
        };
      case "info":
        return {
          container: { backgroundColor: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.2)", borderWidth: 1 },
          text: "#3b82f6",
        };
      case "glass":
        return {
          container: { backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.1)", borderWidth: 1 },
          text: "#FFF",
        };
      default: // primary
        return {
          container: { backgroundColor: "rgba(16, 185, 129, 0.15)", borderColor: "rgba(16, 185, 129, 0.3)", borderWidth: 1 },
          text: AppColors.primary,
        };
    }
  };

  const { container, text } = getVariantStyles();

  return (
    <View style={[
      styles.container,
      container,
      size === "sm" ? styles.sm : styles.md,
      style
    ]}>
      <AppText 
        variant="tiny" 
        weight="bold" 
        style={{ color: text }}
      >
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  sm: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});

export default AppBadge;
