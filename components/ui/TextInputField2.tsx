import { AppColors } from '@/constants/app-colors';
import { textInputStyles } from '@/styles/textInput-styles';
import type { InputFieldProps } from '@/types/inputs';
import { deviceBehavior } from '@/utils/helpers';
import type { FC } from 'react';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const TextInputField2: FC<InputFieldProps> = ({
  inputStyle,
  label,
  labelStyle,
  iconStyle,
  borderStartStartRadius = 8,
  borderEndStartRadius = 8,
  borderStartEndRadius = 8,
  borderEndEndRadius = 8,
  secureTextEntry = false,
  containerStyle,
  placeholder,
  className,
  Icon,
  width = 30,
  height = 24,
  error,
  onFocus,
  onBlur,
  ...props
}) => {
  const [hidePassword] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <KeyboardAvoidingView behavior={deviceBehavior()}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={textInputStyles.wrapper}>
          {label && (
            <Text
              style={[
                textInputStyles.label,
                labelStyle,
                { fontSize: 16, marginBottom: 8 },
              ]}
            >
              {label}
            </Text>
          )}
          <View
            style={[
              textInputStyles.inputContainer,
              error
                ? textInputStyles.errorBorder
                : isFocused
                  ? { borderColor: AppColors.primary, borderWidth: 1.5 }
                  : textInputStyles.defaultBorder,
            ]}
          >
            {Icon && (
              <View style={[textInputStyles.iconContainer]}>
                <Icon
                  size={24}
                  color={isFocused ? AppColors.iconActive : AppColors.iconInactive}
                />
              </View>
            )}
            <TextInput
              style={[textInputStyles.textInput, inputStyle]}
              secureTextEntry={hidePassword}
              placeholder={placeholder}
              autoCorrect={false}
              autoComplete='off'
              autoCapitalize='none'
              spellCheck={false}
              clearButtonMode='while-editing'
              placeholderTextColor={AppColors.placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TextInputField2;
