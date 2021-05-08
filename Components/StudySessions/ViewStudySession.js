import {SafeAreaView, Text, View, Button, ScrollView, Modal} from 'react-native';
import * as React from 'react';
import { Style } from './StudySessionsStyle'
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import * as DateFix from "../DateFix/DateFix";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Shorten from "../DateFix/Shorten";
import auth from "@react-native-firebase/auth";
import model from "./Model/ViewStudySessionModel";

const StudySessionsScreen = ({route, navigation}) => {

  const { sessionId , callback } = route.params;

  const [Refresh, triggerRefresh] = useState(0)

  const [Model, updateModel] = useState(new model(sessionId))

  //console.log("Before: ", Model)

  Model.SetRefresh(triggerRefresh)
  Model.Load(Refresh)

  //console.log("After:  ", Model)

  function JoinStudySession()
  {
    firestore().collection('StudySessionAttendee').add({
      StudySessionId: sessionId,
      UserId: auth().currentUser.uid
    }).then((value) => {
      alert("Study Session Joined!")
      Model.loadAttendees = true;
      triggerRefresh(Refresh+1)
    })
  }

  function AttendStudySession()
  {
    navigation.navigate('StudySessionChat', {sessionId: sessionId})
  }

  function LeaveStudySession()
  {
    firestore().collection('StudySessionAttendee').where('UserId', '==', auth().currentUser.uid).where('StudySessionId', '==', sessionId).get().then(
      (values) => {
        firestore().collection('StudySessionAttendee').doc(values.docs[0].ref.id).delete().then(
          values => {
            Model.loadAttendees = true;
            Model.attendeesName = []
            Model.attendeesId = []
            alert("Study Session Dropped!")
            triggerRefresh(Refresh+1)
          }
        )
      }
    )
  }

  function DeleteStudySession()
  {
    console.log('Delete')
    firestore().collection('StudySessionAttendee').where('StudySessionId', '==', sessionId).get().then(
      values => {
        console.log('Delete call Made')
        if(values.docs.length > 0) {
          for (let i = 0; i < values.docs.length; i++) {
            firestore().collection('StudySessionAttendee').doc(values.docs[i].ref.id).delete().then(
              values => {
                //do nothing
              }
            )
          }
        }
        firestore().collection('StudySession').where('StudySessionId', '==', sessionId).get().then(
          values => {
            console.log('Deleting session')
            firestore().collection('StudySession').doc(values.docs[0].ref.id).delete().then(
              values => {
                console.log('Deleted session')
                callback()
                navigation.goBack()
              }
            )
          }
        )
      }
    )
  }

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
              <Text key={key} style={Style.SessionLeft}>{item}</Text>
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

    let cur_Date = new Date()

    if(Model.startDateRaw == undefined)
    {
      return
    }

    let start_Date = Model.startDateRaw.toDate()
    let end_Date = Model.endDateRaw.toDate()

    console.log(cur_Date, " ", cur_Date.getFullYear(), " ", cur_Date.getMonth(), " ", cur_Date.getDate(), " ", cur_Date.getHours(), " ", cur_Date.getMinutes())
    console.log(start_Date, " ", start_Date.getFullYear(), " ", start_Date.getMonth(), " ", start_Date.getDate(), " ", start_Date.getHours(), " ", start_Date.getMinutes())
    console.log(end_Date, " ", end_Date.getFullYear(), " ", end_Date.getMonth(), " ", end_Date.getDate(), " ", end_Date.getHours(), " ", end_Date.getMinutes())

    if(Model.organizerId == auth().currentUser.uid)
    {
      console.log("user = organizer")
      if(cur_Date.getDate() == start_Date.getDate() && cur_Date.getMonth() == start_Date.getMonth() && cur_Date.getFullYear() == start_Date.getFullYear())
      {
        console.log("date = start date")
        if(start_Date.getHours() < cur_Date.getHours())
        {
          console.log("hours before")
          return <Button title="Join Live Session" style={Style.Buttons} onPress={() => {AttendStudySession()}}> </Button>
        }
        else if(start_Date.getMinutes() <= cur_Date.getMinutes() && start_Date.getHours() == cur_Date.getHours())
        {
          console.log("minutes before")
          return <Button title="Join Live Session" style={Style.Buttons} onPress={() => {AttendStudySession()}}> </Button>
        }
      }
      console.log("not yet")
      return <Button title="Cancel" style={Style.Buttons} onPress={() => {DeleteStudySession()}}> </Button>
    }
    else
    {
      console.log("user != organizer")
      for (let i = 0; i < Model.attendeesId.length; i++) {
        console.log("loop for attendee")
        if(Model.attendeesId[i] == auth().currentUser.uid)
        {
          if(cur_Date.getDate() == start_Date.getDate() && cur_Date.getMonth() == start_Date.getMonth() && cur_Date.getFullYear() == start_Date.getFullYear()) {
            console.log("date = start date")
            if (start_Date.getHours() < cur_Date.getHours()) {
              console.log("hours before")
              return <Button title="Join Live Session" style={Style.Buttons} onPress={() => {JoinStudySession()}}> </Button>
            }
            else if (start_Date.getMinutes() < cur_Date.getMinutes() && start_Date.getHours() == cur_Date.getHours()) {
              console.log("minutes before")
              return <Button title="Join Live Session" style={Style.Buttons} onPress={() => {JoinStudySession()}}> </Button>
            }
          }
          console.log("not yet")
          return <Button title="Drop Out" style={Style.Buttons} onPress={() => {LeaveStudySession()}}> </Button>
        }
      }
      console.log("not member")
      return <Button title="Join" style={Style.Buttons} onPress={() => {JoinStudySession()}}> </Button>
    }
  }

  console.log(Model.attendeesId)
  console.log(Model.attendeesName)

  return (
    DisplayFunc()
  )
}

export default StudySessionsScreen;
