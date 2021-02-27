import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

const Style = StyleSheet.create({
  Title: {
    fontSize: 30,
    textAlign: "center",
    padding: 15
  },
  Session: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#9999aa"
  },
  SessionLeft: {
    padding: 5
  },
  SessionRight: {
    padding: 5,
    marginLeft: "auto",
    alignSelf: "stretch",
    textAlign: "right"
  },
  Class: {
    fontSize: 20,
    padding:10,
    borderWidth: 5,
    borderColor: "#5555aa"
  },
  Classes: {
    flexDirection: "row"
  },
  Buttons: {
    alignSelf: 'flex-end',
   // padding: 8
  },
  TitleBlock: {
   // flex: 3
  },
  SessionBlock: {
    //flex: 6
  },
  ButtonBlock: {
   // flex: 1
  }
});

export {Style};
