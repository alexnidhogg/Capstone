import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import { BaseButton } from "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import StudySessionsScreen from "../../StudySessions/StudySessionsScreen";
import {CreateStackNavigator} from '@react-navigation/stack';


const Header = ({title}, {navigator}) => {
  const Sessions = StudySessionsScreen();
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
Header.defaultProps = {
  title: 'Study Buddy',
};
const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue',
    shadowColor: "#000",
    shadowOffset:{
      width:2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius:3.84,
    elevation:5,
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'left'
  },
});
export default Header;
