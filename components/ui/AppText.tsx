import { AppColors } from "@/constants/app-colors";
import React from "react";
import { StyleSheet, Text, TextStyle, TextProps } from "react-native";

export type TextVariant = 
  | "h1" 
  | "h2" 
  | "h3" 
  | "body" 
  | "bodySmall" 
  | "caption" 
  | "label"
  | "tiny";

export type TextWeight = "light" | "regular" | "medium" | "semibold" | "bold" | "black";

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

const AppText: React.FC<AppTextProps> = ({
  variant = "body",
  weight,
  color,
  align = "left",
  children,
  style,
  ...props
}) => {
  const getVariantStyles = (): TextStyle => {
    switch (variant) {
      case "h1":
        return { fontSize: 32, fontWeight: weight ? undefined : "900", letterSpacing: -0.5 };
      case "h2":
        return { fontSize: 24, fontWeight: weight ? undefined : "900", letterSpacing: -0.5 };
      case "h3":
        return { fontSize: 20, fontWeight: weight ? undefined : "900", letterSpacing: -0.5 };
      case "body":
        return { fontSize: 16, fontWeight: weight ? undefined : "500", lineHeight: 24 };
      case "bodySmall":
        return { fontSize: 14, fontWeight: weight ? undefined : "500", lineHeight: 20 };
      case "caption":
        return { fontSize: 12, fontWeight: weight ? undefined : "600", color: AppColors.slate400 };
      case "label":
        return { fontSize: 10, fontWeight: weight ? undefined : "900", letterSpacing: 1, textTransform: "uppercase" };
      case "tiny":
        return { fontSize: 9, fontWeight: weight ? undefined : "800", letterSpacing: 0.5 };
      default:
        return {};
    }
  };

  const getWeightFontFamily = (): string => {
    const targetWeight = weight || (variant.startsWith("h") ? "bold" : "medium");
    
    switch (targetWeight) {
      case "light": return "MontserratLight";
      case "regular": return "MontserratRegular";
      case "medium": return "MontserratMedium";
      case "semibold": return "MontserratSemiBold";
      case "bold": return "MontserratBold";
      case "black": return "MontserratBold"; // Using Bold for black if Black font is not loaded
      default: return "MontserratMedium";
    }
  };

  return (
    <Text
      style={[
        styles.base,
        getVariantStyles(),
        { 
          fontFamily: getWeightFontFamily(),
          color: color || AppColors.slate50,
          textAlign: align 
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});

export default AppText;
