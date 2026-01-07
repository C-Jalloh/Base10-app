import { AppColors } from '@/constants/app-colors';
import RegisterScreen from '@/screens/auth/register-screen';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Screen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.background,
      }}
    >
      <RegisterScreen />
    </SafeAreaView>
  );
};

export default Screen;
