import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { CustomTabBar } from "@/components/navigation/CustomTabBar";
import { AppColors } from "@/constants/app-colors";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const { isAdmin, isTeacher, loading } = useAuth();

  if (loading) return null;

  const isStudent = !isAdmin && !isTeacher;

  return (
    <Tabs
      tabBar={isTeacher ? (props) => <CustomTabBar {...props} role="TEACHER" /> : undefined}
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
          title: isAdmin ? "Admin Home" : (isTeacher ? "Teacher Home" : "Dashboard"),
          tabBarIcon: ({ color }) => (
            <Ionicons name={isAdmin ? "shield-checkmark" : (isTeacher ? "school" : "grid")} size={24} color={color} />
          ),
        }}
      />
      
      {/* Student Only Tabs */}
      <Tabs.Screen
        name="class-room"
        options={{
          title: "Classrooms",
          href: isStudent ? "/(root)/(tabs)/class-room" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: "AI Tutor",
          href: isStudent ? "/(root)/(tabs)/ai" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          href: isStudent ? "/(root)/(tabs)/practice" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="flask-outline" size={24} color={color} />
          ),
        }}
      />

      {/* Teacher Only Tabs */}
      <Tabs.Screen
        name="teacher-classrooms"
        options={{
          title: "My Classes",
          href: isTeacher ? "/(root)/(tabs)/teacher-classrooms" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="teacher-ai"
        options={{
          title: "AI Assistant",
          href: isTeacher ? "/(root)/(tabs)/teacher-ai" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="sparkles-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="teacher-assignments"
        options={{
          title: "Assignments",
          href: isTeacher ? "/(root)/(tabs)/teacher-assignments" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={24} color={color} />
          ),
        }}
      />

      {/* Admin Only Tabs */}
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          href: isAdmin ? "/(root)/(tabs)/users" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="questions"
        options={{
          title: "Questions",
          href: isAdmin ? "/(root)/(tabs)/questions" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="library" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Reports",
          href: isAdmin ? "/(root)/(tabs)/activity" : null,
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
            <Ionicons name={isAdmin ? "person-circle" : (isTeacher ? "person-circle-outline" : "person")} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
