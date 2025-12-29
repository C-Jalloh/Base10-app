import type { FC } from 'react';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import { deviceBehavior } from '@/utils/helpers';
import { textInputStyles } from '@/styles/textInput-styles';
import type { InputFieldProps } from '@/types/inputs';
import { TAppColors } from '@/constants/TAppColors';

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
  ...props
}) => {
  const [hidePassword] = useState(secureTextEntry);

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
                : textInputStyles.defaultBorder,
            ]}
          >
            <TextInput
              style={[textInputStyles.textInput, inputStyle]}
              secureTextEntry={hidePassword}
              placeholder={placeholder}
              autoCorrect={false}
              autoComplete='off'
              autoCapitalize='none'
              spellCheck={false}
              clearButtonMode='while-editing'
              placeholderTextColor={TAppColors.textColor}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TextInputField2;
