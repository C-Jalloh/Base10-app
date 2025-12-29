import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "@/screens/home/home-screen";

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
      <HomeScreen />
    </SafeAreaView>
  );
};

export default Screen;
