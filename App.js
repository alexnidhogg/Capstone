import * as React from 'react';
import 'react-native-gesture-handler';
import MainMenuScreen from './Components/MainMenu/MainMenuScreen';
import StudySessionsScreen from './Components/StudySessions/StudySessionsScreen';
import GradesScreen from './Components/Grades/GradesScreen';
import LoginScreen from './Components/Login/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ViewStudySession from "./Components/StudySessions/ViewStudySession";
import CreateStudySession from "./Components/StudySessions/CreateStudySession";

const NavigationController = () => {
  return (
    <NavigationContainer>
      <Nav.Navigator initialRouteName="Login">
        <Nav.Screen
          name="MainMenu"
          component={MainMenuScreen}
          options={{
            headerStyle: {
              backgroundColor: 'slateblue',
            },
          }}></Nav.Screen>
        <Nav.Screen name={"Login"} component={LoginScreen} />
        <Nav.Screen name="StudySessions" component={StudySessionsScreen} />
        <Nav.Screen name="Grades" component={GradesScreen} />
        <Nav.Screen name="ViewStudySession" component={ViewStudySession} />
        <Nav.Screen name="CreateStudySession" component={CreateStudySession} />
      </Nav.Navigator>
    </NavigationContainer>
  );
};

const Nav = createStackNavigator();

export default NavigationController;
