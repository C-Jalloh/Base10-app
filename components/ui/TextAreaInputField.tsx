import { AppColors } from '@/constants/app-colors';
import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  TextInput,
  type TextInputProps,
  type TextInputContentSizeChangeEvent,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import { StyleSheet, Platform } from 'react-native';
import { FieldError } from './FieldError';
import { deviceBehavior } from '@/utils/helpers';

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
  ...rest
}) => {
  const [height, setHeight] = useState<number>(minHeight);

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
            placeholderTextColor={AppColors.lightText}
            multiline
            maxLength={maxLength}
            onContentSizeChange={onContentSizeChange}
            textAlignVertical='top'
            accessibilityLabel={label ?? 'Text area'}
            style={[
              styles.input,
              { height: Math.max(minHeight, height) },
              error ? styles.inputError : null,
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
    color: AppColors.textColor,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: AppColors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    backgroundColor: AppColors.lightGray,
  },
  inputError: {
    borderColor: AppColors.redColor,
  },
  footer: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countText: {
    color: '#6b7280',
    fontSize: 12,
  },
});

export default TextAreaInput;
