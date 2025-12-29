import ActionButton from '@/components/ui/ActionButton';
import TextInputField from '@/components/ui/TextInputField';
import { AppColors } from '@/constants/app-colors';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import { Link } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    // TODO: Implement password reset logic
    Alert.alert(
      'Reset Password',
      'If an account with that email exists, a reset link has been sent.',
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
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
            textAlign: 'center',
          }}
        >
          Forgot Password
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: AppColors.lightGray,
            textAlign: 'center',
            marginBottom: 30,
            paddingHorizontal: 20,
          }}
        >
          Enter your email address and we&apos;ll send you a link to reset your
          password.
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
        <ActionButton
          text='Send Reset Link'
          isEnabled={!!email}
          onPress={handleResetPassword}
          backgroundColor={AppColors.foreground}
          color={AppColors.background}
        />
        <Link href='/login' style={{ marginTop: 20 }}>
          <Text
            style={{
              color: AppColors.foreground,
              textDecorationLine: 'underline',
            }}
          >
            Back to Login
          </Text>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
