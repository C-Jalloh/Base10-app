import { AppColors } from "@/constants/app-colors";
import { useAuth } from "@/hooks/useAuth";
import AIScreen from "@/screens/ai/ai-screen";
import { Redirect } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return null;

  if (isAdmin) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.background,
      }}
    >
      <AIScreen />
    </SafeAreaView>
  );
};

export default Screen;
