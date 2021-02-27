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
    flexGrow: 0,
    fontSize: 20,
    padding:10,
    borderWidth: 5,
    borderColor: "#5555aa"
  },
  Classes: {
    flexDirection: "row"
  },
  Buttons: {
    flexDirection: "row",
    padding: 8,
    justifyContent: "space-around"
  },
  TitleBlock: {
    //flexGrow: 1,
  },
  Sessions: {
    flexShrink: 1,
    maxHeight: "70%"
  }
});

export {Style};
