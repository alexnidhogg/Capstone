import {SafeAreaView, Text, View, Button, ScrollView, Modal} from 'react-native';
import * as React from 'react';
import { Style } from './StudySessionsStyle'
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import * as DateFix from "../DateFix/DateFix";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Shorten from "../DateFix/Shorten";

const StudySessionsScreen = ({route, navigation}) => {

  const { sessionId , callback } = route.params;

  const [session, load] = useState({
    startDate: " ",
    endDate: " ",
    courseId: " ",
    courseName: " ",
    organizer: " ",
    sessionId: " ",
    userId: " "
  })

  if(session.courseId == " ")
  {
    firestore().collection('StudySession').doc(sessionId).get().then(
      (values) => {

        let session_raw =
          {
            startDate: DateFix.ConvertGoogleToMonthDate(values.get('StartDate'))
              + " " + DateFix.ConvertGoogleToTime(values.get('StartDate')),
            endDate: DateFix.ConvertGoogleToMonthDate(values.get('EndDate')) + " " + DateFix.ConvertGoogleToTime(values.get('EndDate')),
            description: values.get('Description'),
            courseName: " ",
            courseId: values.get('ClassId'),
            organizer: " ",
            notification: "",
            sessionId: values.id,
            userId: values.get('OrganizerID')
          }
        load(session_raw)

      }
    ).catch((error) => {
      alert(error)
    });
  }
  else if (session.userId != " " && session.organizer == " ")
  {
    firestore().collection('Users').where('UserId','==', session.userId).get().then(
      (values) => {
        //alert(values.docs[0])
        let session_raw =
          {
            startDate: session.startDate,
            endDate: session.endDate,
            description: session.description,
            courseName: " ",
            courseId: session.courseId,
            organizer: values.docs[0].get('FirstName') + " " + values.docs[0].get('LastName'),
            notification: "",
            sessionId: session.sessionId,
            userId: session.userId
          }
        load(session_raw)
      }
    ).catch((error) => {
      alert(error)
    });
  }
  else if (session.courseId != " " && session.courseName == " ")
  {
    //alert(session.courseId)

    firestore().collection('Course').where('CourseId', '==', session.courseId).get().then(
      (values) => {
        let session_raw =
          {
            startDate: session.startDate,
            endDate: session.endDate,
            description: session.description,
            courseName: values.docs[0].get('CourseName'),
            courseId: session.courseId,
            organizer: session.organizer,
            notification: "",
            sessionId: session.sessionId,
            userId: session.userId
          }
        load(session_raw)
      }
    )
  }

  return (
    <View style={Style.TitleBlock}>
      <Text style={Style.Title}>
        {session.courseName} session at {session.startDate} to {session.endDate}.
      </Text>
      <Text style={Style.NormalText}>
        Organized By: {session.organizer}
      </Text>
      <ScrollView style={Style.Description}>
        <Text style={Style.NormalText}>
          {session.description}
        </Text>
      </ScrollView>
      <Text style={Style.NormalText}>
        Current Attendees
      </Text>
      <ScrollView style={Style.DescriptionWithBorder}>
        {
          Attendees.map((item, key) => (
            <Text key={key} style={Style.SessionLeft}>{item.name}</Text>
          ))
        }
      </ScrollView>
      <View style={Style.Bottom}>
        <View style={Style.Buttons}>
          <Button title="Join" style={Style.Buttons}>

          </Button>

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
  )
}

class DateTime {
  constructor(date, time){
    this.date = date;
    this.time = time;
  }
}
class User {
  constructor(name){
    this.name = name;
  }
}

let Topic = "Math";
let StartTime = new DateTime("April 2", "2:00 pm");
let EndTime = new DateTime("April 2", "4:00 pm");
var Description = "We're going to be going over the material for the unit 2 test. Everything from Chapters 2-5 will be covered. "
let Attendees = [];
Attendees[Attendees.length] = new User("John Smith");
Attendees[Attendees.length] = new User("Will Bo");
Attendees[Attendees.length] = new User("Marshall Mathers");
Attendees[Attendees.length] = new User("Slim Shady");
for(var i = 1; i<5; i++){
  Description = Description + Description
  Attendees[Attendees.length] = new User("John Smith");
  Attendees[Attendees.length] = new User("Will Bo");
  Attendees[Attendees.length] = new User("Marshall Mathers");
  Attendees[Attendees.length] = new User("Slim Shady");
}

let Organizer = new User("Jimbo Baggins");

export default StudySessionsScreen;
