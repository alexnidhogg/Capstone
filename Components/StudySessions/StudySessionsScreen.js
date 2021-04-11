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

const StudySessionsScreen = ({navigation}) => {

  function StudySessionLoad() {

    firestore().collection('StudySession').orderBy('StartDate').get().then(
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
              notification: "",
              sessionId: values.docs[x].id
            }
        }
        setraw(Sessions)
        setWaiting(false)
        if(courses != []) {
          UpdateStudySessionDisplay(currentTab)
        }

      }
    ).catch((error) => {
    });
  }

  function UpdateStudySessionDisplay(tab = 'ALL') {
    //alert(currentTab)
    if(tab == "ALL") {
      load(
        raw.map((item, key) => (
        <View style={Style.Session} key={key}>
          <TouchableWithoutFeedback
            onPress={() => {
              //alert(item.sessionId)
              navigation.navigate('ViewStudySession', {sessionId: item.sessionId, callback: onReturn})
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
      var rawReturn = []
      for (var i = 0; i < raw.length;i ++)
      {
        //alert(raw[i].course)
        if(raw[i].course == tab){
          const sessionId = raw[i].sessionId
          rawReturn[rawReturn.length] = <View style={Style.Session} key={rawReturn.length}>
            <TouchableWithoutFeedback
              onPress={() => {
                //alert(item.sessionId)
                navigation.navigate('ViewStudySession', {sessionId: sessionId, callback: onReturn})
              }}
              style={Style.Session}
            >
              <Text style={Style.SessionLeft}>{raw[i].startDate}</Text>
              <Text style={Style.SessionLeft}> - </Text>
              <Text style={Style.SessionLeft}>{raw[i].endDate}</Text>
              <Text style={Style.SessionRight}>{raw[i].notification}</Text>
            </TouchableWithoutFeedback>
          </View>
        }
      }
      load(rawReturn)
    }
  }

  function LoadCourses() {
    firestore().collection('Course').where('CourseId', 'in', courseLinks).get().then(
      (values) => {
        var CoursesRaw = [{
          CourseId: 'ALL',
          CourseName: 'All'
        }]
        for (var i = 0; i < values.docs.length; i++){
          CoursesRaw[i+1] = {
            CourseId: courseLinks[i],
            CourseName: values.docs[i].get('CourseName')
          }
        }
        setCourses(CoursesRaw)
        setWaiting(false)
      }
    )
  }

  function LoadCourseLinks() {
    firestore().collection('CourseRecord').where('UserId', '==', auth().currentUser.uid).get().then(
      (values) => {
        var CourseLinksRaw = []
        for (var i = 0; i < values.docs.length; i++){
          CourseLinksRaw[i] = values.docs[i].get('CourseId')
        }
        setCourseLinks(CourseLinksRaw)
        setWaiting(false)
      }
    )
  }

  const [SessionDisplay, load] = useState(<View/>)
  const [raw, setraw] = useState([]);
  const [needsLoad, setLoad] = useState(true)

  const [courseLinks, setCourseLinks] = useState([])
  const [loadedCourseLinks, setLoadedCourseLinks] = useState(false)

  const [courses, setCourses] = useState([])
  const [loadedCourses, setLoadedCourses] = useState(false)

  const [waiting, setWaiting] = useState(false)

  const [currentTab, setCurrentTab] = useState('ALL');


  if(!waiting){
    if(needsLoad) {
      setWaiting(true)
      setLoad(false)
      StudySessionLoad()
    } else if (!needsLoad && !loadedCourseLinks) {
      setWaiting(true)
      setLoadedCourseLinks(true)
      LoadCourseLinks()
    } else if (loadedCourseLinks && !loadedCourses) {
      setWaiting(true)
      setLoadedCourses(true)
      LoadCourses()
      UpdateStudySessionDisplay()
    }
  }

  const onReturn = () => {
    setLoad(true)
  }

  return (
      <View style={Style.TitleBlock}>
        <Text style={Style.Title}>
          Study Sessions
        </Text>

        <ScrollView style={Style.Classes} horizontal={true}>
          {
            courses.map((item, key) =>(
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
            ))
          }
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
