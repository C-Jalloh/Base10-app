/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
import { AppColors } from './app-colors';

const tintColorLight = AppColors.primary;
const tintColorDark = AppColors.primary;

export const Colors = {
  light: {
    text: '#0F172A', // --text-primary
    background: '#FFFFFF', // --bg-primary
    tint: AppColors.primary,
    icon: '#475569', // --text-secondary
    tabIconDefault: '#475569',
    tabIconSelected: AppColors.primary,
    secondaryBackground: '#F8FAFC', // --bg-secondary
    tertiaryBackground: '#F1F5F9', // --bg-tertiary
    border: '#E2E8F0', // --border-color
  },
  dark: {
    text: '#F8FAFC', // --text-primary
    background: '#0F172A', // --bg-primary
    tint: AppColors.primary,
    icon: '#94A3B8', // --text-secondary
    tabIconDefault: '#94A3B8',
    tabIconSelected: AppColors.primary,
    secondaryBackground: '#020617', // --bg-secondary
    tertiaryBackground: '#1E293B', // --bg-tertiary
    border: '#1E293B', // --border-color
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
