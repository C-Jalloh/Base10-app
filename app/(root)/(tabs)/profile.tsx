import { AppColors } from "@/components/ui";
import ProfileScreen from "@/screens/profile/profile-screen";
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
      <ProfileScreen />
    </SafeAreaView>
  );
};

export default Screen;
