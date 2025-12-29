import RegisterScreen from '@/screens/auth/register-screen';
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
      <RegisterScreen />
    </SafeAreaView>
  );
};

export default Screen;
