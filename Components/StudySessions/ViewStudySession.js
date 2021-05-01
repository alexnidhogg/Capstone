import {SafeAreaView, Text, View, Button, ScrollView, Modal} from 'react-native';
import * as React from 'react';
import { Style } from './StudySessionsStyle'
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import * as DateFix from "../DateFix/DateFix";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Shorten from "../DateFix/Shorten";
import auth from "@react-native-firebase/auth";
import model from "./Model/ViewStudySessionModel"

const StudySessionsScreen = ({route, navigation}) => {

  const { sessionId , callback } = route.params;

  const [Refresh, triggerRefresh] = useState(0)

  const [Model, updateModel] = useState(new model(sessionId))

  //console.log("Before: ", Model)

  Model.SetRefresh(triggerRefresh)
  Model.Load(Refresh)

  //console.log("After:  ", Model)

  function DisplayFunc() {
    if(Model.refreshDisplay) {
      return <View style={Style.TitleBlock}>
        <Text style={Style.Title}>
          {Model.courseName} session at {Model.startDate} to {Model.endDate}.
        </Text>
        <Text style={Style.NormalText}>
          Organized By: {Model.organizerName}
        </Text>
        <ScrollView style={Style.Description}>
          <Text style={Style.NormalText}>
            {Model.description}
          </Text>
        </ScrollView>
        <Text style={Style.NormalText}>
          Current Attendees
        </Text>
        <ScrollView style={Style.DescriptionWithBorder}>
          {
            Model.attendeesName.map((item, key) => (
              <Text key={key} style={Style.SessionLeft}>{item.name}</Text>
            ))
          }
        </ScrollView>
        <View style={Style.Bottom}>
          <View style={Style.Buttons}>
            {
              leftButton()
            }
            <Button
              title="Back"
              style={Style.Buttons}
              onPress={() => {
                callback()
                navigation.goBack()
              }}
            >

            </Button>
          </View>
        </View>
      </View>
    }
    else
    {
      return <View>
        <Text>
          Loading...
        </Text>
      </View>
    }
  }

  function leftButton() {
    if(Model.startDate == null)
    {
      return
    }
    if(Model.organizerId == auth().currentUser.uid)
    {
      return <Button title="Cancel" style={Style.Buttons}> </Button>
    }
    else
    {
      for (let i = 0; i < Model.attendeesId.length; i++) {
        if(Model.attendeesId = auth().currentUser.uid)
        {
          if(Model.startDate.getHours() < Date().getHours())
          {
            return <Button title="Join Live Session" style={Style.Buttons}> </Button>
          }
          else if (Model.startDate.getMinutes() < Date().getMinutes() && Model.startDate.getHours() == Date().getHours())
          {
            return <Button title="Join Live Session" style={Style.Buttons}> </Button>
          }
          return <Button title="Drop Out" style={Style.Buttons}> </Button>
        }
      }
      return <Button title="Join" style={Style.Buttons}> </Button>
    }
  }

  return (
    DisplayFunc()
  )
}

export default StudySessionsScreen;
