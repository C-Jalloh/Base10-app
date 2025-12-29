import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ClassRoomScreen from "@/screens/class-room/class-room-screen";

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
      <ClassRoomScreen />
    </SafeAreaView>
  );
};

export default Screen;
