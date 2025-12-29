import ForgotPasswordScreen from '@/screens/auth/forgot-password-screen';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Screen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
      }}
    >
      <ForgotPasswordScreen />
    </SafeAreaView>
  );
};

export default Screen;
