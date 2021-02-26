/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';

import 'react-native-gesture-handler';
import MainMenuScreen from './Components/MainMenu/MainMenuScreen';
import StudySessionsScreen from './Components/StudySessions/StudySessionsScreen';
import { createStackNavigator } from "@react-navigation/stack";
import {SafeAreaView, Text, View, Button} from 'react-native';

/*
const NavigationController: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StackNavigator initialRouteName={StudySessionsScreen}>
        <
      </StackNavigator>
    </NavigationContainer>
  );
};*/

const Stack = createStackNavigator();

/*
const NavigationController: () => React$Node = () => {
  return (
    <NavigationController>
      <Stack.Navigator>
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="StudySessions" component={StudySessionsScreen} />
      </Stack.Navigator>
    </NavigationController>
  );
};*/

const NavigationController: () => React$Node = () => {
  return (
    <Nav.Navigator>
      <Nav.Screen name="MainMenu" component={MainMenuScreen}/>
      <Nav.Screen name="StudySessions" component={StudySessionsScreen}/>
    </Nav.Navigator>
  );
};

const Nav = createStackNavigator(
  /*{
    MainMenu: {screen: MainMenuScreen},
    StudySessions: {screen: StudySessionsScreen},
  },
  {
    initialRouteName: 'MainMenu',
  }*/
);

export default NavigationController;
