import React, { useEffect } from 'react';
import { router } from 'expo-router';

const Screen = () => {
  const [isLoggedIn] = React.useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }, [, isLoggedIn]);

  return null;
};

export default Screen;
