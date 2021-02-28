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
    borderWidth: 1,
    borderColor: "#9999aa",
    width: '100%'
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
    flexDirection: "row",
    width: "auto"
  },
  Buttons: {
    flexDirection: "row",
    padding: 8,
    justifyContent: "space-around",
    //backgroundColor: "#449944",
  },
  TitleBlock: {
    flexGrow: 1
  },
  Sessions: {
    flexShrink: 1,
    maxHeight: "70%"
  },
  Description: {
    maxHeight: "30%"
  },
  NormalText: {
    padding: 5
  },
  DescriptionWithBorder: {
    maxHeight: "30%",
    borderWidth: 2,
    borderColor: "#888888"
  },
  Bottom: {
    justifyContent: "flex-end",
    flexDirection: "column",
    flexGrow: 100,
    //backgroundColor: "#dd8888"
  },
  NormalTextCentered: {
    padding: 5,
    textAlign: "center"
  },
  FormRow: {
    flexDirection: "row",
    alignContent: "center",
    padding: 5,
  },
  FormRowColumn: {
    padding: 5,
    flexGrow: 1,
  },
  FormLabel: {
    width: "25%",
    padding: 5,
  },
  Border: {
    borderWidth: 1,
    borderColor: "#999999",
    backgroundColor: "#FFFFFF"
  },
  BorderGrow: {
    borderWidth: 1,
    borderColor: "#999999",
    flexGrow: 1,
    backgroundColor: "#FFFFFF"
  },
  LabelBorder: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "#999999",
    padding: 5,
    backgroundColor: "#FFFFFF"
  }
});

export {Style};
