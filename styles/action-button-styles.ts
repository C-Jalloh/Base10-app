import { AppColors } from '@/constants/app-colors';
import { StyleSheet } from 'react-native';

export const actionButtonStyles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    borderRadius: 12, // More modern, less rounded than 25
    paddingVertical: 14,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
  },
  buttonDisabled: {
    backgroundColor: AppColors.primaryDark,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700', // Bold as per headings preference
    fontFamily: 'MontserratBold',
    color: AppColors.textPrimary,
    letterSpacing: -0.32, // -0.02em tracking for 16px
  },
});
