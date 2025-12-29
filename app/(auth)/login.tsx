import { AppColors } from "@/constants/app-colors";
import LoginScreen from "@/screens/auth/login-screen";
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
      <LoginScreen />
    </SafeAreaView>
  );
};

export default Screen;
