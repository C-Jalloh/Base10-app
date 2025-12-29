import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function AuthLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: '#121212' },
        }}
      >
        <Stack.Screen name='login' />
        <Stack.Screen name='register' />
        <Stack.Screen name='forgot-password' />
      </Stack>
      <StatusBar style='auto' />
    </>
  );
}
