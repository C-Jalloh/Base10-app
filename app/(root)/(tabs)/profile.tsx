import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileScreen from "@/screens/profile/profile-screen";

const Screen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <ProfileScreen />
    </SafeAreaView>
  );
};

export default Screen;
