import { AppColors } from '@/constants/app-colors';
import { StyleSheet } from 'react-native';

export const textInputStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginVertical: 2,
  },
  label: {
    color: AppColors.textSecondary,
    fontSize: 14,
    fontFamily: 'MontserratMedium',
    marginBottom: 3,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: AppColors.slate800,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.slate700,
  },
  defaultBorder: {
    borderColor: AppColors.slate700,
  },
  errorBorder: {
    borderColor: AppColors.error,
  },
  iconContainer: {
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    borderTopRightRadius: 10,
    paddingRight: 12,
    paddingLeft: 8,
    paddingVertical: 10,
    fontFamily: 'MontserratMedium',
    fontSize: 14,
    backgroundColor: 'transparent',
    color: AppColors.textPrimary,
    textAlign: 'left',
  },
  iconPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    marginRight: 6,
  },
  errorText: {
    fontSize: 12,
    color: AppColors.error,
    fontFamily: 'MontserratRegular',
    marginTop: 4,
  },
});
