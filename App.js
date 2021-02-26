import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Header from './components /Header';
import ClassObject from './components /ClassObject';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const App = () => {
  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: 'lightgrey', height: hp('100%')}}>
        <Header />
        <ClassObject />
        <ClassObject />
        <ClassObject />
      </ScrollView>
    </SafeAreaView>
  );
};


export default App;
