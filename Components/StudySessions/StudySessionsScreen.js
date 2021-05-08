import {SafeAreaView, Text, View, Button, ScrollView, Modal} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import { Style } from './StudySessionsStyle'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import CreateStudySession from "./CreateStudySession";
import firestore from '@react-native-firebase/firestore'
import * as DateFix from '../DateFix/DateFix'
import auth from "@react-native-firebase/auth";
import { useFocusEffect } from '@react-navigation/native'
import model from './Model/StudySessionScreenModel'

const StudySessionsScreen = ({navigation}) => {

  function UpdateStudySessionDisplay(tab = 'ALL') {
    if(tab == "ALL") {
      setSessions(
        Model.studySessions.map((item, key) => (
        <View style={Style.Session} key={key}>
          <TouchableWithoutFeedback
            onPress={() => {
              let i = item.sessionId
              navigation.navigate('ViewStudySession', {sessionId: i, callback: onReturn})
            }}
            style={Style.Session}
          >
            <Text style={Style.SessionLeft}>{item.startDate}</Text>
            <Text style={Style.SessionLeft}> - </Text>
            <Text style={Style.SessionLeft}>{item.endDate}</Text>
            <Text style={Style.SessionRight}>{item.notification}</Text>
          </TouchableWithoutFeedback>
        </View>
        ))
      )
    } else {
      let rawReturn = []
      for (let i = 0; i < Model.studySessions.length;i ++)
      {
        if(Model.studySessions[i].course == tab){
          const sessionId = Model.studySessions[i].sessionId
          rawReturn[rawReturn.length] = <View style={Style.Session} key={rawReturn.length}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('ViewStudySession', {sessionId: sessionId, callback: onReturn})
              }}
              style={Style.Session}
            >
              <Text style={Style.SessionLeft}>{Model.studySessions[i].startDate}</Text>
              <Text style={Style.SessionLeft}> - </Text>
              <Text style={Style.SessionLeft}>{Model.studySessions[i].endDate}</Text>
              <Text style={Style.SessionRight}>{Model.studySessions[i].notification}</Text>
            </TouchableWithoutFeedback>
          </View>
        }
      }
      setSessions(rawReturn)
    }
  }

  function UpdateCourseDisplay() {
    setCourses(Model.courses.map((item, key) =>(
      <View key={key} style={Style.Class}>
        <TouchableWithoutFeedback
          onPress={() => {
            setCurrentTab(item.CourseId)
            UpdateStudySessionDisplay(item.CourseId)
          }}
          style={Style.Session}
        >
          <Text>{item.CourseName}</Text>
        </TouchableWithoutFeedback>
      </View>
    )))
  }

  const [Model, setModel] = useState(new model());

  const [Refresh, triggerRefresh] = useState(0)

  const [SessionDisplay, setSessions] = useState(<View/>)
  const [CourseDisplay, setCourses] = useState(<View/>)

  const [currentTab, setCurrentTab] = useState('ALL');

  Model.SetRefresh(triggerRefresh)
  Model.Load(Refresh)

  if(Model.updateDisplay) {
    Model.updateDisplay = false
    UpdateCourseDisplay()
    UpdateStudySessionDisplay()
  }

  const onReturn = () => {
    Model.studySessions = []
    Model.UpdateStudySessions = true;
    triggerRefresh(Refresh+1)
  }

  return (
      <View style={Style.TitleBlock}>
        <Text style={Style.Title}>
          Study Sessions
        </Text>

        <ScrollView style={Style.Classes} horizontal={true}>
          {CourseDisplay}
        </ScrollView>

        <ScrollView style={Style.Sessions}>
          {SessionDisplay}
        </ScrollView>
        <View style={Style.Bottom}>
          <View style={Style.Buttons}>
            <Button
              title="Create"
              style={Style.Buttons}
              onPress={() => {
                  navigation.navigate("CreateStudySession", {callback: onReturn})
                }
              }
            >
            </Button>

            <Button
              title="Back"
              style={Style.Buttons}
              onPress={() => navigation.goBack()}
            >
            </Button>
          </View>
        </View>
      </View>
  );
};

export default StudySessionsScreen;
