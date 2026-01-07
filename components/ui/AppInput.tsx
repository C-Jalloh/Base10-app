import { AppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  Pressable,
  Animated,
} from "react-native";
import AppText from "./AppText";

interface AppInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  helperText?: string;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  keyboardType = "default",
  autoCapitalize = "none",
  containerStyle,
  inputStyle,
  helperText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const actualSecureTextEntry = secureTextEntry && !isPasswordVisible;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <AppText variant="label" color={isFocused ? AppColors.primary : AppColors.slate500} style={styles.label}>
          {label}
        </AppText>
      )}
      
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputFocused,
        error && styles.inputError,
      ]}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={isFocused ? AppColors.primary : AppColors.slate500} 
            style={styles.icon}
          />
        )}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={AppColors.slate600}
          secureTextEntry={actualSecureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, inputStyle]}
        />

        {secureTextEntry ? (
          <Pressable onPress={togglePasswordVisibility} style={styles.rightIcon}>
            <Ionicons 
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color={AppColors.slate500} 
            />
          </Pressable>
        ) : rightIcon ? (
          <Pressable onPress={onRightIconPress} style={styles.rightIcon}>
            <Ionicons name={rightIcon} size={20} color={AppColors.slate500} />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <AppText variant="tiny" weight="bold" color={AppColors.error} style={styles.errorText}>
          {error}
        </AppText>
      ) : helperText ? (
        <AppText variant="tiny" color={AppColors.slate500} style={styles.helperText}>
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.slate900,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AppColors.slate800,
    paddingHorizontal: 16,
    height: 56,
  },
  inputFocused: {
    borderColor: AppColors.primary,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  inputError: {
    borderColor: AppColors.error,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  rightIcon: {
    padding: 4,
  },
  errorText: {
    marginTop: 6,
    marginLeft: 4,
  },
  helperText: {
    marginTop: 6,
    marginLeft: 4,
  },
});

export default AppInput;
