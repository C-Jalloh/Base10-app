
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AIScreen from "@/screens/ai/ai-screen";

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
      <AIScreen />
    </SafeAreaView>
  );
};

export default Screen;
