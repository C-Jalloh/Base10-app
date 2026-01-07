import { AppColors } from "@/constants/app-colors";
import { useAuth } from "@/hooks/useAuth";
import AdminProfileScreen from "@/screens/admin/admin-profile-screen";
import ProfileScreen from "@/screens/profile/profile-screen";
import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.background,
      }}
    >
      {isAdmin ? <AdminProfileScreen /> : <ProfileScreen />}
    </SafeAreaView>
  );
};

export default Screen;
