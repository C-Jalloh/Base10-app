import { StyleSheet } from 'react-native';

export const textInputStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginVertical: 2,
  },
  label: {
    color: '#374151',
    fontSize: 14,
    fontFamily: 'MontserratMedium',
    marginBottom: 3,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#121212',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  defaultBorder: {
    borderColor: '#444',
  },
  errorBorder: {
    borderColor: '#ef4444',
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
    color: '#374151',
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
    color: '#ef4444',
    fontFamily: 'MontserratRegular',
    marginTop: 4,
  },
});
