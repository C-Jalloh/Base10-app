import { AppColors } from "@/constants/app-colors";
import { useAuth } from "@/hooks/useAuth";
import AdminQuestionsScreen from "@/screens/admin/admin-questions-screen";
import { Redirect } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return null;

  if (!isAdmin) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.background,
      }}
    >
      <AdminQuestionsScreen />
    </SafeAreaView>
  );
};

export default Screen;
