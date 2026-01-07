import { AppColors } from "@/constants/app-colors";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabItem = ({ 
  route, 
  isFocused, 
  options, 
  onPress, 
  onLongPress 
}: { 
  route: any, 
  isFocused: boolean, 
  options: any, 
  onPress: () => void, 
  onLongPress: () => void 
}) => {
  const animatedActive = useSharedValue(0);

  useEffect(() => {
    animatedActive.value = withSpring(isFocused ? 1 : 0, {
      stiffness: 150,
      damping: 20,
      mass: 1,
    });
  }, [isFocused, animatedActive]);

  const animatedFlexStyle = useAnimatedStyle(() => {
    return {
      flex: 1 + animatedActive.value * 2.5,
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedActive.value,
        [0, 1],
        ["transparent", AppColors.primary + "15"]
      ),
      paddingHorizontal: animatedActive.value * 20,
      borderRadius: 24,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      width: interpolate(animatedActive.value, [0, 1], [44, 150], 'clamp'),
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedActive.value,
      maxWidth: animatedActive.value * 120,
      marginLeft: animatedActive.value * 8,
      transform: [{ translateX: (1 - animatedActive.value) * -10 }],
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: 1 + animatedActive.value * 0.1 }],
    };
  });

  const iconColor = isFocused ? AppColors.primary : AppColors.slate500;

  return (
    <Animated.View style={[styles.tabItemContainer, animatedFlexStyle]}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.touchable}
      >
        <Animated.View style={containerStyle}>
          <Animated.View style={iconStyle}>
            {options.tabBarIcon && options.tabBarIcon({ color: iconColor, focused: isFocused, size: 24 })}
          </Animated.View>
          <Animated.View style={[labelStyle, { overflow: 'hidden' }]}>
            <Text 
              numberOfLines={1}
              style={[
                styles.label, 
                { color: AppColors.primary }
              ]}
            >
              {options.title || route.name}
            </Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

interface CustomTabBarProps extends BottomTabBarProps {
  role?: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'MODERATOR';
}

export const CustomTabBar = ({ state, descriptors, navigation, role }: CustomTabBarProps) => {
  const insets = useSafeAreaInsets();

  // Define which tabs are visible for each role
  const TEACHER_TABS = ['home', 'teacher-classrooms', 'teacher-ai', 'teacher-assignments', 'profile'];
  const STUDENT_TABS = ['home', 'class-room', 'ai', 'practice', 'profile'];
  const ADMIN_TABS = ['home', 'users', 'questions', 'activity', 'profile'];
  const MODERATOR_TABS = ['home', 'moderator-reports', 'moderator-bank', 'moderator-cards', 'profile'];

  // Filter out routes based on the role
  const visibleRoutes = state.routes.filter((route) => {
    const { options } = descriptors[route.key];
    
    // First check if href is explicitly null (Expo Router standard)
    if ((options as any).href === null) return false;

    // Then apply role-based filtering as a secondary safety measure
    if (role === 'TEACHER') return TEACHER_TABS.includes(route.name);
    if (role === 'STUDENT') return STUDENT_TABS.includes(route.name);
    if (role === 'ADMIN') return ADMIN_TABS.includes(route.name);
    if (role === 'MODERATOR') return MODERATOR_TABS.includes(route.name);
    
    return true;
  });

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom || 15 }]}>
      <View style={styles.content}>
        {visibleRoutes.map((route) => {
          const { options } = descriptors[route.key];
          const isFocused = state.routes[state.index].key === route.key;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              options={options}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: AppColors.background,
    borderTopWidth: 1,
    borderTopColor: AppColors.slate900,
    paddingTop: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  tabItemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: "800",
  },
});
