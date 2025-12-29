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

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // TODO: Implement register logic
    Alert.alert('Register', 'Registration functionality not implemented yet');
  };

  const isFormValid = !!(
    name &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword
  );

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
          }}
        >
          Register
        </Text>
        <TextInputField
          label='Name'
          placeholder='Enter your name'
          value={name}
          onChangeText={setName}
          autoCapitalize='words'
          labelStyle={{ color: AppColors.lightText }}
        />
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
        <TextInputField
          label='Confirm Password'
          placeholder='Confirm your password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          labelStyle={{ color: AppColors.lightText }}
        />
        <ActionButton
          text='Register'
          isEnabled={isFormValid}
          onPress={handleRegister}
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
            Already have an account? Login
          </Text>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
