import { AppColors } from '@/constants/app-colors';
import ForgotPasswordScreen from '@/screens/auth/forgot-password-screen';
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
      <ForgotPasswordScreen />
    </SafeAreaView>
  );
};

export default Screen;
