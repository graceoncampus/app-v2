import { Navigation } from 'react-native-navigation';
import { View, Text } from 'react-native';
import React from 'react';

const FirstTabScreen = () => (
    <View><Text>First</Text></View>
)

const Drawer = () => (
    <View><Text>Second</Text></View>
)

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('example.Drawer', () => Drawer);
}