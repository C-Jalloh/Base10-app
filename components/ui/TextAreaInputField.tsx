import { AppColors } from '@/constants/app-colors';
import React, { useCallback, useState } from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  type TextInputContentSizeChangeEvent,
  type TextInputProps,
} from 'react-native';

import { deviceBehavior } from '@/utils/helpers';
import { Platform, StyleSheet } from 'react-native';
import { FieldError } from './FieldError';

type TextAreaInputProps = Omit<TextInputProps, 'multiline'> & {
  label?: string;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  minHeight?: number;
  showCount?: boolean;
  error?: string | null;
};

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  maxLength,
  minHeight = 100,
  showCount = true,
  error = null,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [height, setHeight] = useState<number>(minHeight);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const onContentSizeChange = useCallback(
    (e: TextInputContentSizeChangeEvent) => {
      const newHeight = Math.max(minHeight, e.nativeEvent.contentSize.height);
      setHeight(newHeight);
    },
    [minHeight],
  );

  return (
    <KeyboardAvoidingView behavior={deviceBehavior()}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          {label && <Text style={styles.label}>{label}</Text>}

          <TextInput
            {...rest}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={AppColors.placeholder}
            multiline
            maxLength={maxLength}
            onContentSizeChange={onContentSizeChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textAlignVertical='top'
            accessibilityLabel={label ?? 'Text area'}
            style={[
              styles.input,
              { height: Math.max(minHeight, height) },
              error ? styles.inputError : (isFocused ? styles.inputFocused : null),
              style,
            ]}
          />

          <View style={styles.footer}>
            {error && <FieldError message={error} />}

            {showCount && typeof maxLength === 'number' ? (
              <Text style={styles.countText}>
                {value?.length}/{maxLength}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginVertical: 8,
  },
  label: {
    marginBottom: 6,
    color: AppColors.textSecondary,
    fontSize: 14,
    fontFamily: 'MontserratSemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: AppColors.slate700,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    backgroundColor: AppColors.slate900,
    color: AppColors.textPrimary,
    fontFamily: 'MontserratMedium',
  },
  inputFocused: {
    borderColor: AppColors.primary,
    borderWidth: 1.5,
  },
  inputError: {
    borderColor: AppColors.error,
  },
  footer: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countText: {
    color: AppColors.textSecondary,
    fontSize: 12,
    fontFamily: 'MontserratMedium',
  },
});

export default TextAreaInput;
