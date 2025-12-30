import { AppColors } from "@/components/ui";
import { authApi } from "@/lib/api";
import AdminProfileScreen from "@/screens/admin/admin-profile-screen";
import ProfileScreen from "@/screens/profile/profile-screen";
import { ProfileData } from "@/types/profile";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";

const Screen = () => {
  const [user, setUser] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authApi.getProfile();
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

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
      {user?.role === 'ADMIN' ? <AdminProfileScreen /> : <ProfileScreen />}
    </SafeAreaView>
  );
};

export default Screen;
