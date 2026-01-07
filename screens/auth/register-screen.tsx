import { ActionButton, AppColors, Logo, TextInputField } from '@/components/ui';
import { authApi } from '@/lib/api';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    match: false,
  });

  useEffect(() => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      match: password === confirmPassword && password !== '',
    });
  }, [password, confirmPassword]);

  const handleRegister = async () => {
    if (!name || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (!passwordValidation.length || !passwordValidation.uppercase || !passwordValidation.number) {
      Alert.alert('Error', 'Password does not meet requirements');
      return;
    }
    if (!passwordValidation.match) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      await authApi.register({
        full_name: name,
        email,
        phone_number: phone,
        password
      });
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/login') }
      ]);
    } catch (err: any) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = !!(
    name &&
    phone &&
    passwordValidation.length &&
    passwordValidation.uppercase &&
    passwordValidation.number &&
    passwordValidation.match
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: AppColors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Background Decorative Elements */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 120, // Significant padding at bottom to allow scrolling past the keyboard
          paddingTop: 40,
        }}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.headerContainer}>
          <Logo size={56} centered />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Fill in the form to get started</Text>
        </View>

        <TextInputField
          label='Full Name'
          placeholder='John Doe'
          value={name}
          onChangeText={setName}
          autoCapitalize='words'
          Icon={Ionicons}
          iconProps={{ name: 'person' }}
        />

        <View style={{ height: 12 }} />

        <TextInputField
          label='Phone'
          placeholder='+220...'
          value={phone}
          onChangeText={setPhone}
          keyboardType='phone-pad'
          Icon={Ionicons}
          iconProps={{ name: 'call' }}
        />

        <View style={{ height: 12 }} />

        <TextInputField
          label='Email (Optional)'
          placeholder='john@example.com'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
          Icon={Ionicons}
          iconProps={{ name: 'mail' }}
        />

        <View style={{ height: 12 }} />

        <TextInputField
          label='Password'
          placeholder='••••••••'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          Icon={Ionicons}
          iconProps={{ name: 'lock-closed' }}
        />

        <View style={{ height: 12 }} />

        <TextInputField
          label='Confirm Password'
          placeholder='••••••••'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          Icon={Ionicons}
          iconProps={{ name: 'shield-checkmark', color: AppColors.slate400 }}
        />

        {/* Password Validator */}
        <View style={styles.validatorContainer}>
          <ValidatorItem label="8+ Characters" active={passwordValidation.length} />
          <ValidatorItem label="Uppercase" active={passwordValidation.uppercase} />
          <ValidatorItem label="Number" active={passwordValidation.number} />
          <ValidatorItem label="Match" active={passwordValidation.match} />
        </View>

        <ActionButton
          text='Create Account'
          isEnabled={isFormValid && !loading}
          onPress={handleRegister}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href='/login'>
            <Text style={styles.linkText}>Sign in here</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const ValidatorItem = ({ label, active }: { label: string; active: boolean }) => (
  <View style={styles.validatorItem}>
    <View style={[styles.validatorDot, { backgroundColor: active ? AppColors.primary : AppColors.slate600 }]} />
    <Text style={[styles.validatorText, { color: active ? AppColors.primary : AppColors.slate600 }]}>{label}</Text>
  </View>
);

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
    backgroundColor: '#3B82F6',
    opacity: 0.05,
  },
  headerContainer: {
    marginBottom: 32,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'MontserratBold',
    color: AppColors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'MontserratMedium',
    color: AppColors.textSecondary,
  },
  validatorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  validatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  validatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  validatorText: {
    fontSize: 10,
    fontFamily: 'MontserratBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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

export default RegisterScreen;
