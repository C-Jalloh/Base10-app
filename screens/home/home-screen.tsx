import { AppColors, Logo } from "@/components/ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Logo showText size={48} />
      <Text style={styles.welcomeText}>Welcome to Base 10</Text>
      <Text style={styles.subtitle}>Your AI-powered learning companion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.background,
    padding: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: "MontserratBold",
    color: AppColors.textPrimary,
    marginTop: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
    color: AppColors.textSecondary,
    marginTop: 8,
    textAlign: "center",
  },
});

export default HomeScreen;
