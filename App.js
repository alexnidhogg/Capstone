/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';
import * as Navigation from '@react-navigation/native';
import MainMenuScreen from "./Components/MainMenu/MainMenuScreen";
import StudySessionsScreen from "./Components/StudySessions/StudySessionsScreen";

const NavigationController: () => React$Node = () => {
  return (
    <Navigation.NavigationContainer>
      <Navigation.Stack.Navigator initialRouteName="MainMenuScreen">
        <Navigation.Stack.Screen
          name="Main Menu"
          component={MainMenuScreen}
          options={{title: 'Main Menu'}}
        />
        <Navigation.Stack.Screen
          name="Study Sessions"
          component={StudySessionsScreen}
        />
      </Navigation.Stack.Navigator>
    </Navigation.NavigationContainer>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default NavigationController;
