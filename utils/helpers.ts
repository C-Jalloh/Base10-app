import { Dimensions, Platform } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const isIphone = () => {
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV;
};

export const isIPad = () => {
  return Platform.OS === 'ios' && Platform.isPad;
};

export const deviceBehavior = () => {
  return Platform.OS === 'ios' ? 'padding' : 'height';
};

export const getiPhoneModel = () => {
  if (Platform.OS !== 'ios' || Platform.isPad) {
    return 'not-iphone';
  }

  switch (SCREEN_HEIGHT) {
    case 568:
      return 'iphone-5-se';
    case 667:
      return 'iphone-6-8';
    case 736:
      return 'iphone-plus';
    default:
      return 'modern-iphone';
  }
};

export const getDeviceDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};
