import { AppColors } from '@/constants/app-colors';
import { StyleSheet } from 'react-native';

export const actionButtonStyles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    borderRadius: 25,

    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: AppColors.foreground,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'System',
  },
});
