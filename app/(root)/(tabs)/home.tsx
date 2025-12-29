import { AppColors } from "@/components/ui";
import HomeScreen from "@/screens/home/home-screen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.background,
      }}
    >
      <HomeScreen />
    </SafeAreaView>
  );
};

export default Screen;
