/**
 * @format
 */

import {AppRegistry} from 'react-native';
import NavigationController from './App';
import StudySessionsScreen from './Components/StudySessions/StudySessionsScreen';
import MainMenuScreen from './Components/MainMenu/MainMenuScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => NavigationController);
AppRegistry.registerComponent(appName, () => StudySessionsScreen);
AppRegistry.registerComponent(appName, () => MainMenuScreen);
