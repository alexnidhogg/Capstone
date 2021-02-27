import * as React from 'react';
import 'react-native-gesture-handler';
import MainMenuScreen from './Components/MainMenu/MainMenuScreen';
import StudySessionsScreen from './Components/StudySessions/StudySessionsScreen';
import GradesScreen from './Components/Grades/GradesScreen'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const NavigationController = () => {
  return (
    <NavigationContainer>
      <Nav.Navigator initialRouteName="MainMenu">
        <Nav.Screen
          name="MainMenu"
          component={MainMenuScreen}
          options={{
            headerStyle: {
              backgroundColor: 'slateblue',
            },
          }}></Nav.Screen>
        <Nav.Screen name="StudySessions" component={StudySessionsScreen} />
        <Nav.Screen name="Grades" component={GradesScreen} />
      </Nav.Navigator>
    </NavigationContainer>
  );
};

const Nav = createStackNavigator();

export default NavigationController;
