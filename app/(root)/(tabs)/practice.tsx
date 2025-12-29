import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PracticeScreen from "@/screens/practice/practice-screen";

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
      <PracticeScreen />
    </SafeAreaView>
  );
};

export default Screen;
