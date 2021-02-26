import * as React from 'react';
import 'react-native-gesture-handler';
import MainMenuScreen from './Components/MainMenu/MainMenuScreen';
import StudySessionsScreen from './Components/StudySessions/StudySessionsScreen';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const NavigationController = () => {
  return (
    <NavigationContainer>
      <Nav.Navigator initialRouteName="StudySessions">
        <Nav.Screen name="MainMenu" component={MainMenuScreen}/>
        <Nav.Screen name="StudySessions" component={StudySessionsScreen}/>
      </Nav.Navigator>
    </NavigationContainer>
  );
};

const Nav = createStackNavigator();

export default NavigationController;
