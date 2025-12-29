import { AppColors } from '@/constants/app-colors';
import { textInputStyles } from '@/styles/textInput-styles';
import type { InputFieldProps } from '@/types/inputs';
import { deviceBehavior } from '@/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { FieldError } from './FieldError';

const TextInputField: FC<InputFieldProps> = ({
  inputStyle,
  label,
  labelStyle,
  iconStyle,
  secureTextEntry = false,
  containerStyle,
  className,
  borderStartStartRadius = 8,
  borderEndStartRadius = 8,
  borderStartEndRadius = 8,
  borderEndEndRadius = 8,
  Icon,
  iconProps,
  width = 18,
  height = 18,
  error,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <KeyboardAvoidingView behavior={deviceBehavior()}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={textInputStyles.wrapper}>
          {label && (
            <Text style={[textInputStyles.label, labelStyle]}>{label}</Text>
          )}
          <View
            style={[
              textInputStyles.inputContainer,
              error
                ? textInputStyles.errorBorder
                : textInputStyles.defaultBorder,
              {
                marginBottom: 12,
                marginTop: 6,
                borderStartStartRadius,
                borderStartEndRadius,
                borderEndStartRadius,
                borderEndEndRadius,
              },
            ]}
          >
            {Icon && iconProps && (
              <View style={[textInputStyles.iconContainer]}>
                <Icon size={24} {...iconProps} />
              </View>
            )}
            <TextInput
              style={[
                textInputStyles.textInput,
                inputStyle,
                { borderBottomRightRadius: 10 },
              ]}
              secureTextEntry={hidePassword}
              autoCorrect={false}
              autoComplete='off'
              autoCapitalize='none'
              spellCheck={false}
              clearButtonMode='while-editing'
              placeholderTextColor={AppColors.gray500}
              {...props}
            />
            {secureTextEntry && (
              <Pressable
                style={textInputStyles.iconPressable}
                onPress={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? (
                  <Ionicons name='eye' size={20} color={AppColors.gray500}  />
                ) : (
                  <Ionicons name='eye-off' size={20} color={AppColors.gray500} />
                )}
              </Pressable>
            )}
          </View>
          {error && <FieldError message={error} />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TextInputField;
