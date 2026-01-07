import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { CustomTabBar } from "@/components/navigation/CustomTabBar";
import { AppColors } from "@/constants/app-colors";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const { isAdmin, isTeacher, isModerator, loading } = useAuth();

  if (loading) return null;

  const isStudent = !isAdmin && !isTeacher && !isModerator;

  return (
    <Tabs
      tabBar={(props) => {
        if (isTeacher) return <CustomTabBar {...props} role="TEACHER" />;
        if (isModerator) return <CustomTabBar {...props} role="MODERATOR" />;
        if (isAdmin) return <CustomTabBar {...props} role="ADMIN" />;
        return <CustomTabBar {...props} role="STUDENT" />;
      }}
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
          title: isAdmin ? "Admin Home" : (isTeacher ? "Teacher Home" : (isModerator ? "Mod Home" : "Dashboard")),
          tabBarIcon: ({ color }) => (
            <Ionicons name={isAdmin ? "shield-checkmark" : (isTeacher ? "school" : (isModerator ? "shield-half" : "grid"))} size={24} color={color} />
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

      {/* Moderator Only Tabs */}
      <Tabs.Screen
        name="moderator-home"
        options={{
          title: "Home",
          href: isModerator ? "/(root)/(tabs)/moderator-home" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="moderator-reports"
        options={{
          title: "Reports",
          href: isModerator ? "/(root)/(tabs)/moderator-reports" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="flag-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="moderator-bank"
        options={{
          title: "Bank",
          href: isModerator ? "/(root)/(tabs)/moderator-bank" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="library-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="moderator-cards"
        options={{
          title: "Cards",
          href: isModerator ? "/(root)/(tabs)/moderator-cards" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="copy-outline" size={24} color={color} />
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
            <Ionicons name={isAdmin ? "person-circle" : (isTeacher ? "person-circle-outline" : (isModerator ? "person-outline" : "person"))} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
