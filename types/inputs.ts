import { IconProps } from '@expo/vector-icons/build/createIconSet';
import type { Href } from 'expo-router';
import type { ComponentType, ReactNode } from 'react';
import type {
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  Falsy,
  RegisteredStyle,
  TextInputProps,
  TextStyle,
} from 'react-native';

export interface InputFieldProps extends TextInputProps {
  label?: string;
  Icon?: ComponentType<IconProps<any>>;
  iconProps?: {
    name: string;
    size?: number;
    color?: string;
  };
  width?: DimensionValue;
  height?: DimensionValue;
  secureTextEntry?: boolean;
  labelStyle?: TextStyle | Falsy | RegisteredStyle<TextStyle>;
  containerStyle?: TextStyle | Falsy | RegisteredStyle<TextStyle>;
  inputStyle?: TextStyle | Falsy | RegisteredStyle<TextStyle>;
  borderRadius?: string | AnimatableNumericValue;
  borderStartStartRadius?: string | AnimatableNumericValue;
  borderStartEndRadius?: string | AnimatableNumericValue;
  borderEndStartRadius?: string | AnimatableNumericValue;
  borderEndEndRadius?: string | AnimatableNumericValue;
  iconStyle?: string;
  className?: string;
  error?: string | undefined;
}

export interface SelectInputProps {
  title?: string;
  label?: string;
  value?: any;
  required?: boolean;
  key?: React.Key | null;
  selectedValue?: any | null;
  selectionColor?: ColorValue;
  onValueChange?: (itemValue: any | null, itemIndex: number) => void;

  prompt?: string;

  children: ReactNode;
}

export interface SelectInputIOSProps {
  title?: string;
  key?: React.Key | null;
  required?: boolean;
  selectedValue?: any;
  selectionColor?: ColorValue;
  onValueChange?: (itemValue: any, itemIndex: number) => void;

  children: ReactNode;
}
