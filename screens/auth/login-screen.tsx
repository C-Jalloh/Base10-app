import ActionButton from '@/components/ui/ActionButton';
import TextInputField from '@/components/ui/TextInputField';
import { AppColors } from '@/constants/app-colors';
import { deviceBehavior } from '@/utils/helpers';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { Link } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    // TODO: Implement login logic
    Alert.alert('Login', 'Login functionality not implemented yet');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%' }}
      behavior={deviceBehavior()}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 16,
          backgroundColor: AppColors.background,
        }}
        keyboardShouldPersistTaps='handled'
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: AppColors.lightText,
            marginBottom: 40,
          }}
        >
          Login
        </Text>
        <TextInputField
          label='Email'
          placeholder='Enter your email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
          labelStyle={{ color: AppColors.lightText }}
        />
        <TextInputField
          label='Password'
          placeholder='Enter your password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          labelStyle={{ color: AppColors.lightText }}
        />
        <ActionButton
          text='Login'
          isEnabled={!!email && !!password}
          onPress={handleLogin}
          backgroundColor={AppColors.foreground}
          color={AppColors.background}
        />
        <Link href='/forgot-password' style={{ marginTop: 20 }}>
          <Text
            style={{
              color: AppColors.lightGray,
              textDecorationLine: 'underline',
            }}
          >
            Forgot Password?
          </Text>
        </Link>
        <Link href='/register' style={{ marginTop: 10 }}>
          <Text
            style={{
              color: AppColors.foreground,
              textDecorationLine: 'underline',
            }}
          >
            Don&apos;t have an account? Register
          </Text>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
