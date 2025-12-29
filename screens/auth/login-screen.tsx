import { ActionButton, AppColors, Logo, TextInputField } from '@/components/ui';
import { authApi } from '@/lib/api';
import { deviceBehavior } from '@/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter email/phone and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await authApi.login(username, password);
      console.log('Login successful:', response.data.user.full_name);
      
      // In a real app, we would save the token here
      // For now, we just navigate to the home screen
      router.replace('/(root)/(tabs)/home');
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', backgroundColor: AppColors.background }}
      behavior={deviceBehavior()}
    >
      {/* Background Decorative Elements */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.headerContainer}>
          <Logo size={56} centered />
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Enter your details to continue</Text>
        </View>

        <TextInputField
          label='Email or Phone'
          placeholder='Email or Phone Number'
          value={username}
          onChangeText={setUsername}
          keyboardType='email-address'
          autoCapitalize='none'
          Icon={Ionicons}
          iconProps={{ name: 'mail', color: AppColors.slate400 }}
          error={error}
        />
        
        <View style={{ height: 12 }} />

        <TextInputField
          label='Password'
          placeholder='••••••••'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          Icon={Ionicons}
          iconProps={{ name: 'lock-closed', color: AppColors.slate400 }}
        />

        <View style={styles.forgotPasswordContainer}>
          <Link href='/forgot-password'>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Link>
        </View>

        <ActionButton
          text={loading ? 'Signing In...' : 'Sign In'}
          isEnabled={!!username && !!password && !loading}
          onPress={handleLogin}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account? </Text>
          <Link href='/register'>
            <Text style={styles.linkText}>Create an account</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bgCircle1: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: AppColors.primary,
    opacity: 0.05,
  },
  bgCircle2: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#3B82F6', // blue-500 equivalent
    opacity: 0.05,
  },
  headerContainer: {
    marginBottom: 40,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontFamily: 'MontserratBold',
    color: AppColors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'MontserratMedium',
    color: AppColors.textSecondary,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: -8,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: AppColors.primary,
    fontFamily: 'MontserratBold',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    color: AppColors.textSecondary,
    fontFamily: 'MontserratMedium',
    fontSize: 14,
  },
  linkText: {
    color: AppColors.primary,
    fontFamily: 'MontserratBold',
    fontSize: 14,
  },
});

export default LoginScreen;
