import { Navigation } from 'react-native-navigation';
import { View, Text } from 'react-native';
import React from 'react';
import Login from './screens/Login'
import Main from './screens/Home'
import Menu from './screens/Menu'

export const registerScreens = () => {
  Navigation.registerComponent('goc.Login', () => Login);
  Navigation.registerComponent('goc.Main', () => Main);
  Navigation.registerComponent('goc.Menu', () => Menu);
};