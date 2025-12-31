import { AppColors } from "@/constants/app-colors";
import { useAuth } from "@/hooks/useAuth";
import AdminHomeScreen from "@/screens/admin/admin-home-screen";
import HomeScreen from "@/screens/home/home-screen";
import TeacherHomeScreen from "@/screens/teacher/teacher-home-screen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = () => {
  const { isAdmin, isTeacher, loading } = useAuth();

  if (loading) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.background,
      }}
    >
      {isAdmin ? (
        <AdminHomeScreen />
      ) : isTeacher ? (
        <TeacherHomeScreen />
      ) : (
        <HomeScreen />
      )}
    </SafeAreaView>
  );
};

export default Screen;
