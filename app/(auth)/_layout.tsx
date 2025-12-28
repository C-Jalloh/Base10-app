
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function AuthLayout() {

  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{  title: 'Auth' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
