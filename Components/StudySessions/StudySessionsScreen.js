import {SafeAreaView, Text, View, Button, ScrollView, Modal} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import { Style } from './StudySessionsStyle'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import CreateStudySession from "./CreateStudySession";
import firestore from '@react-native-firebase/firestore'
import * as DateFix from '../DateFix/DateFix'

const StudySessionsScreen = ({navigation}) => {

  function StudySessionLoad() {

    firestore().collection('StudySession').get().then(
      (values) => {
        var Sessions = []
        for(var x = 0; x < values.docs.length; x++){
          let startDate = values.docs[x].get('StartDate')
          let endDate = values.docs[x].get('EndDate')
          Sessions[x] =
            {
              startDate: DateFix.ConvertGoogleToMonthDate(startDate) + " " + DateFix.ConvertGoogleToTime(startDate),
              endDate: DateFix.ConvertGoogleToMonthDate(endDate) + " " + DateFix.ConvertGoogleToTime(endDate),
              course: values.docs[x].get('ClassId').toString(),
              notification: ""
            }
        }
        load(
          Sessions.map((item, key) => (
            <View style={Style.Session} key={key}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('ViewStudySession')}
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
      }
    ).catch((error) => {
    });
  }

  const [loaded, load] = useState(<View/>)
  const [tab, changeTab] = useState("none")

  StudySessionLoad()

  return (
      <View style={Style.TitleBlock}>
        <Text style={Style.Title}>
          Study Sessions
        </Text>

        <ScrollView style={Style.Classes} horizontal={true}>
          {
            Topics.map((item, key) =>(
              <View key={key} style={Style.Class}>
                <Text>{item}</Text>
              </View>
            ))
          }
        </ScrollView>

        <ScrollView style={Style.Sessions}>
          {loaded}
        </ScrollView>
        <View style={Style.Bottom}>
          <View style={Style.Buttons}>
            <Button
              title="Create"
              style={Style.Buttons}
              onPress={() => navigation.navigate("CreateStudySession")}
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

let Topics = [];
Topics[Topics.length] = "Math";
Topics[Topics.length] = "English";
Topics[Topics.length] = "Science";
Topics[Topics.length] = "Gym";

class StudySession {
  constructor(StartDate, EndDate, Topic, Notification){
    this.StartDate = StartDate;
    this.EndDate = EndDate;
    this.Topic = Topic;
    this.Notification = Notification;
  }
}

export default StudySessionsScreen;
