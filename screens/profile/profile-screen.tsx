import { View, Text } from "react-native";
import React from "react";

const ProfileScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#333" }}>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;
