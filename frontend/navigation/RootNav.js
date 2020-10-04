import React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import RootBottomNavigator from './RootBottomNavigator';
import { navigationRef } from '../RootNavigation';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

export default () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <RootBottomNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
