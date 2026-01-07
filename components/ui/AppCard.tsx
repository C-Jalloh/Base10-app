import { AppColors } from "@/constants/app-colors";
import * as Haptics from "expo-haptics";
import React from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import AppText from "./AppText";

interface AppCardProps {
  children: React.ReactNode;
  variant?: "elevated" | "outline" | "flat" | "glass";
  padding?: number;
  onPress?: () => void;
  style?: ViewStyle;
  haptic?: boolean;
}

const CardHeader: React.FC<{ title: string; subtitle?: string; style?: ViewStyle }> = ({
  title,
  subtitle,
  style,
}) => (
  <View style={[styles.header, style]}>
    <AppText variant="h3">{title}</AppText>
    {subtitle && (
      <AppText variant="caption" color={AppColors.slate500}>
        {subtitle}
      </AppText>
    )}
  </View>
);

const CardContent: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({
  children,
  style,
}) => <View style={[styles.content, style]}>{children}</View>;

const CardFooter: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({
  children,
  style,
}) => <View style={[styles.footer, style]}>{children}</View>;

const CardCover: React.FC<{ source: ImageSourcePropType; height?: number }> = ({
  source,
  height = 180,
}) => <Image source={source} style={[styles.cover, { height }]} resizeMode="cover" />;

const AppCardComponent: React.FC<AppCardProps> = ({
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
          backgroundColor: AppColors.slate800,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 24,
          elevation: 12,
          borderWidth: 1,
          borderColor: AppColors.slate700,
        };
      case "flat":
        return {
          backgroundColor: AppColors.slate900,
          borderWidth: 1,
          borderColor: AppColors.slate800,
        };
      case "glass":
        return {
          backgroundColor: "rgba(30, 41, 59, 0.7)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.15)",
        };
      default: // outline
        return {
          backgroundColor: AppColors.surfaceDark,
          borderColor: AppColors.slate700, // Lightened the border for higher visibility
        };
    }
  };

  const Component = onPress ? Pressable : View;

  // We check if children are modular or just plain content
  const isModular = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && (child.type === CardCover || child.type === CardHeader)
  );

  return (
    <Component
      onPress={onPress ? handlePress : undefined}
      style={({ pressed }: any) => [
        styles.card,
        getVariantStyles(),
        onPress && pressed && styles.pressed,
        style,
        { borderWidth: 1 }, // Ensure border is always applied
        !isModular && { padding },
      ]}
    >
      {children}
    </Component>
  );
};

// Compound component pattern
export const AppCard = Object.assign(AppCardComponent, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Cover: CardCover,
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    padding: 20,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: AppColors.slate900,
  },
  cover: {
    width: "100%",
  },
});

export default AppCard;
