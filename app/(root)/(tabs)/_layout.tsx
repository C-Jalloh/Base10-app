import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { AppColors } from "@/constants/app-colors";
import { useAuth } from "@/hooks/useAuth";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const { isAdmin, loading } = useAuth();

  if (loading) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: AppColors.background,
          borderTopColor: AppColors.slate800,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.iconInactive,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: isAdmin ? "Admin Home" : "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name={isAdmin ? "shield-checkmark" : "home"} size={24} color={color} />
          ),
        }}
      />
      
      {/* Student Only Tabs */}
      <Tabs.Screen
        name="class-room"
        options={{
          title: "Classrooms",
          href: isAdmin ? null : undefined,
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: "AI Tutor",
          href: isAdmin ? null : undefined,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="robot" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          href: isAdmin ? null : undefined,
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmarks" size={24} color={color} />
          ),
        }}
      />

      {/* Admin Only Tabs */}
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="questions"
        options={{
          title: "Questions",
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="library" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Reports",
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name={isAdmin ? "person-circle" : "person"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
